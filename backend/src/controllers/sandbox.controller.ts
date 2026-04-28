import { Request, Response } from 'express';
import axios from 'axios';

// Diccionario de mapeo de lenguajes y versiones soportadas por JDoodle API
const LANGUAGE_MAP: Record<string, { lang: string, versionIndex: string }> = {
  'javascript': { lang: 'nodejs', versionIndex: '4' }, // Node.js 17.x
  'java':       { lang: 'java', versionIndex: '4' },   // JDK 17
  'python':     { lang: 'python3', versionIndex: '4' },// Python 3.9
  'cpp':        { lang: 'cpp', versionIndex: '5' },    // C++ 17
};

export const ejecutarCodigo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, sourceCode } = req.body;

    if (!language || !sourceCode) {
      res.status(400).json({ error: 'Falta el parámetro language o sourceCode en el body.' });
      return;
    }

    const config = LANGUAGE_MAP[language.toLowerCase()];
    if (!config) {
      res.status(400).json({ error: 'Lenguaje no soportado en el entorno actual.' });
      return;
    }

    // Estructuración del payload según la documentación de JDoodle v1
    const options = {
      method: 'POST',
      url: 'https://api.jdoodle.com/v1/execute',
      headers: { 
        'Content-Type': 'application/json' 
      },
      data: {
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
        script: sourceCode,
        language: config.lang,
        versionIndex: config.versionIndex
      },
    };

    const response = await axios.request(options);
    const { output, error } = response.data;

    // Retorno del output procesado al cliente
    res.status(200).json({
      message: 'Ejecución compilada exitosamente',
      language,
      output: output ? output.trim() : '',
      status: error ? 'Failed' : 'Passed',
    });

  } catch (err: any) {
    // Extraemos el error real que nos manda la API de JDoodle
    const errorReal = err.response?.data || err.message;
    console.error('[Sandbox Controller] Error de compilación remota:', errorReal);
    
    // Lo enviamos a PowerShell para poder leerlo
    res.status(500).json({ 
      error: 'Excepción de red al contactar al motor de ejecución de código.',
      detalle: errorReal 
    });
  }
};