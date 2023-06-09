import { NextFunction, Request, Response } from 'express';

export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default function errorMiddleware(
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .json({ message });
}