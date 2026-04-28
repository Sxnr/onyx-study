import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../db';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;

    // 1. Validar que no falten datos
    if (!nombre || !email || !password) {
      res.status(400).json({ error: 'Todos los campos son obligatorios' });
      return;
    }

    // 2. Verificar si el correo ya está registrado en la BD
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'El email ya está en uso' });
      return;
    }

    // 3. Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Crear el usuario en la base de datos
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        contrasena_hasheada: hashedPassword, // Guardamos el hash, NUNCA el texto original
      },
    });

    // 5. Responder al frontend (sin devolver la contraseña)
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error en registerUser:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Validar que no falten datos
    if (!email || !password) {
      res.status(400).json({ error: 'Email y contraseña son obligatorios' });
      return;
    }

    // 2. Buscar al usuario en la base de datos
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas' }); // No le decimos si falló el email o la pass por seguridad
      return;
    }

    // 3. Comparar la contraseña ingresada con la encriptada en la BD
    const isPasswordValid = await bcrypt.compare(password, user.contrasena_hasheada);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    // 4. Generar el Token de Sesión (JWT)
    // Usamos el ID y el nivel del usuario como datos dentro del token
    const token = jwt.sign(
      { userId: user.id, nivel: user.nivel },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' } // El token durará 7 días
    );

    // 5. Responder al frontend con el pase VIP
    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        nivel: user.nivel
      }
    });

  } catch (error) {
    console.error('Error en loginUser:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};