import { Request, Response } from 'express';
import axios from 'axios';

// Mapeo de lenguajes de Monaco a los códigos que exige JDoodle
const JDOODLE_LANGUAGES: Record<string, { language: string, versionIndex: string }> = {
  java: { language: 'java', versionIndex: '4' }, // Java 17
  javascript: { language: 'nodejs', versionIndex: '4' },
  python: { language: 'python3', versionIndex: '4' }, // Python 3
  cpp: { language: 'cpp17', versionIndex: '1' }, // C++ 17
  dart: { language: 'dart', versionIndex: '0' }
};

export const ejecutarCodigo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { codigo, lenguaje } = req.body;

    const jdoodleConfig = JDOODLE_LANGUAGES[lenguaje];
    if (!jdoodleConfig) {
      res.status(400).json({ error: 'Lenguaje no soportado por el motor de ejecución.' });
      return;
    }

    // Petición a la API de JDoodle
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: codigo,
      language: jdoodleConfig.language,
      versionIndex: jdoodleConfig.versionIndex
    });

    // JDoodle devuelve 'output' con el resultado o los errores de compilación
    res.json({ output: response.data.output, memory: response.data.memory, cpuTime: response.data.cpuTime });
  } catch (error: any) {
    console.error('Error ejecutando código en JDoodle:', error);
    res.status(500).json({ error: 'Fallo al contactar el motor de compilación.' });
  }
};