import { Logger } from '@nestjs/common';
import { OnGatewayDisconnect, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'node:tls';
import { Socket } from 'socket.io';
import randomLogin from 'src/utils/genNickName';

@WebSocketGateway({ namespace: 'chat', cors: {origin: '*'} })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{

  private readonly logger = new Logger(ChatGateway.name);
  private connected = new Map<string, string>();
  @WebSocketServer() server;
  
  handleConnection(client: Socket) {
    const name = randomLogin();
    this.connected.set(client.id, name);

    client.emit('message', { msg: `Welcome to chat, ${name}` });
    client.emit('activeUSers', Array.from(this.connected.values()));
    client.broadcast.emit('message', { msg: `${name} connected to chat`});
    client.broadcast.emit('userConnected', name))

    this.logger.log(`${name} connected`);
  }

  handleDisconnect(client: Socket) {
    const name = this.connected.get(client.id);
    this.connected.delete(client.id);

    client.broadcast.emit('message', { msg: `${name} connected to chat`});
    client.broadcast.emit('userDisconnected', name)

    this.logger.log(`${name} disconnected`);
  }


  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): WsResponse<string> {
    const name = this.connected.get(client.id)
    // this.server.emit('message', {msg: payload, user: name, time: new Date()});
    return { event: 'hello', data: 'world'}
  }
}
