import { Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  intercept(
    context: import('@nestjs/common').ExecutionContext,
    next: import('@nestjs/common').CallHandler<any>,
  ): import('rxjs').Observable<any> | Promise<import('rxjs').Observable<any>> {
    return next.handle().pipe(map(response => ({ message : response.message || "server response successful" , status: "success", data: response.data || response.data })));
  }
}
