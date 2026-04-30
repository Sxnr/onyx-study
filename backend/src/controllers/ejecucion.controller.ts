import { Request, Response } from 'express';
import axios from 'axios';

const JDOODLE_LANGUAGES: Record<string, { language: string, versionIndex: string }> = {
  java: { language: 'java', versionIndex: '4' }, 
  javascript: { language: 'nodejs', versionIndex: '4' },
  python: { language: 'python3', versionIndex: '4' }, 
  cpp: { language: 'cpp17', versionIndex: '1' }, 
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

    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: codigo,
      language: jdoodleConfig.language,
      versionIndex: jdoodleConfig.versionIndex
    });

    res.json({ output: response.data.output, memory: response.data.memory, cpuTime: response.data.cpuTime });
  } catch (error: any) {
    console.error('Error ejecutando código en JDoodle:', error);
    res.status(500).json({ error: 'Fallo al contactar el motor de compilación.' });
  }
};

// NUEVA FUNCIÓN: IA Lite Explicadora de Errores
export const explicarErrorIA = async (req: Request, res: Response): Promise<void> => {
  const { errorText, lenguaje } = req.body;
  let explicacion = "Revisa la sintaxis en la línea que indica el error. Algo no cuadra con la estructura del lenguaje.";
  const lowerError = errorText.toLowerCase();

  // Patrones de IA Lite
  if (lenguaje === 'java') {
    if (lowerError.includes('nullpointerexception')) explicacion = "Intentaste usar una variable u objeto que está vacío (es 'null'). ¡Asegúrate de inicializarlo primero!";
    else if (lowerError.includes('arrayindexoutofboundsexception')) explicacion = "Te saliste de los límites del Array. Trataste de acceder a una posición que no existe.";
    else if (lowerError.includes('expected \';\'')) explicacion = "¡Ups! Te faltó un punto y coma (;) al final de una línea.";
    else if (lowerError.includes('cannot find symbol')) explicacion = "Estás usando una variable o método que no ha sido declarado, o lo escribiste mal.";
  } 
  else if (lenguaje === 'python') {
    if (lowerError.includes('indentationerror')) explicacion = "Python es estricto con los espacios. Revisa la sangría (indentación) de esa línea.";
    else if (lowerError.includes('nameerror')) explicacion = "Estás intentando usar una variable o función que no existe. ¿Quizás la escribiste mal?";
    else if (lowerError.includes('syntaxerror')) explicacion = "Hay un error gramatical. Revisa si te falta cerrar un paréntesis, comillas o dos puntos (:) al final.";
  }
  else if (lenguaje === 'javascript') {
    if (lowerError.includes('referenceerror')) explicacion = "Estás llamando a una variable que no ha sido definida en este contexto (scope).";
    else if (lowerError.includes('typeerror')) explicacion = "Intentaste hacer una operación inválida para ese tipo de dato (ej. llamar como función a algo que es un string).";
  }
  else if (lenguaje === 'cpp') {
    if (lowerError.includes('was not declared in this scope')) explicacion = "Usaste una variable sin declararla antes, o te faltó un #include arriba.";
    else if (lowerError.includes('expected \';\' before')) explicacion = "Falta un punto y coma (;) justo antes de donde indica el error.";
  }

  res.json({ explicacion });
};