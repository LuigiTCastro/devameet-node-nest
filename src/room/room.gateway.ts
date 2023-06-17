import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true }) // 'Cors' beacause independent of the front endpoint used, it can connect to this WS.

export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly roomService: RoomService) { }


  afterInit(server: any) {
    this.logger.log('Gateway initialized.');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.debug(`Client: ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    this.logger.debug(`Client: ${client.id} disconnected`);
  }

  private logger = new Logger(RoomGateway.name);




  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   console.log('message:', payload);
  //   return 'Hello world!';
  // }




}