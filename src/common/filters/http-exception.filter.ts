import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

function extraerMensajeTecnicoLimpio(mensaje: string): string {
  if (!mensaje) return '';

  // Divide el mensaje en líneas y limpia espacios
  const lineas = mensaje.split('\n').map(linea => linea.trim());

  // Palabras clave típicas para errores técnicos
  const palabrasClave = ['Argument', 'Invalid', 'Error', 'Exception', 'Failed'];

  // Filtra sólo las líneas que contengan alguna palabra clave
  const lineasRelevantes = lineas.filter(linea =>
    palabrasClave.some(palabra => linea.includes(palabra)),
  );

  if (lineasRelevantes.length > 0) {
    // Devuelve las primeras 2 líneas relevantes unidas por espacio
    return lineasRelevantes.slice(0, 2).join(' ');
  }

  // Si no encuentra líneas relevantes, devuelve los primeros 300 caracteres
  return mensaje.length > 300 ? mensaje.slice(0, 300) + '...' : mensaje;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    let mensajeTecnico = '';

    if (exception instanceof HttpException) {
      if (typeof message === 'string') {
        mensajeTecnico = message;
      } else if (typeof message === 'object' && message !== null) {
        if ('message' in message) {
          if (Array.isArray((message as any).message)) {
            mensajeTecnico = (message as any).message.join(', ');
          } else {
            mensajeTecnico = (message as any).message;
          }
        } else if ('error' in message) {
          mensajeTecnico = (message as any).error;
        } else {
          mensajeTecnico = JSON.stringify(message);
        }
      } else {
        mensajeTecnico = String(message);
      }
    } else if (exception instanceof Error) {
      mensajeTecnico = exception.message;
    } else {
      mensajeTecnico = JSON.stringify(exception);
    }

    // Limpiamos el mensaje técnico para mostrar sólo lo relevante y legible
    mensajeTecnico = extraerMensajeTecnicoLimpio(mensajeTecnico);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: typeof message === 'string' ? message : JSON.stringify(message),
      mensajeTecnico,
    });
  }
}
