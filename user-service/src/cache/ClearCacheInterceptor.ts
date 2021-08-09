import { CACHE_MANAGER, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Cache } from "cache-manager";

@Injectable()
export class ClearCacheInterceptor implements NestInterceptor {

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<Observable<any>> {

    return next
      .handle()
      .pipe(
        tap(() => this.cacheManager.reset()),
      );
  }
}