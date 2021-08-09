import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache, Store } from "cache-manager";
import { Redis } from "cache-manager-ioredis";

interface RedisStore extends Store {
  getClient(): Redis.Commands;
}

//It's our class for connect with Redis store in any place
@Injectable()
export class RedisAdapter {
  private client: Redis.Commands;

  constructor(@Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.client = (<RedisStore>cacheManager.store).getClient();
  }

  getClient() {
    return this.client
  }

}