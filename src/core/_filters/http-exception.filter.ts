
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | any , host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let message =  Array.isArray(exception.response.message) ? exception.response.message[0] : exception.response.message
    
    if(message.includes("JSON")){
        message = "Invalid JSON payload passed."
    }
    const errorResponse : any = {
        message: message,
        status: "error",
        data: exception.response.data || null,
    }

    
    response
      .status(status)
      .json(errorResponse);
  }



}