import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';



export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send('Authentication required');
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).send('Invalid token');
  }
};

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const startTime = Date.now();
    res.on('finish', () => {
      const elapsedTime = Date.now() - startTime;
      console.log(
        `${req.method} ${req.originalUrl} [${res.statusCode}] - ${elapsedTime} ms`
      );
    });
    next();
  };

type ErrorWithStatus = Error & { status?: number };
export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || 500;
  res.status(status);
  res.json({
    error: {
      message: err.message,
      status,
    },
  });
};


