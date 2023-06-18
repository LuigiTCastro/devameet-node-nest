import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './dtos/joinroom.dto';
import { UpdateUserPositionDto } from './dtos/updateposition.dto';
import { ToglMuteDto } from './dtos/toglMute.dto';


type ActiveSocketsType = { // ...
  room: string;
  id: string;
  userId: string;
}

@WebSocketGateway({ cors: true }) // 'Cors' beacause independent of the front endpoint used, it can connect to this WS.
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly roomService: RoomService) { }

  @WebSocketServer() wss: Server // Works to send to everyone, not just from client to client.
  // This code snippet inject a WS server instance in the 'wss' class property, allowing the access and the use of WS server easily.
  // @WebSocketServer() marca a propriedade wss como um ponto de injeção do servidor WebSocket.
  // 'wss: Server' is the declaration of the wss property from Server type.
  // 'Server' represents the WS server (servidor).

  private logger = new Logger(RoomGateway.name);
  private activeSockets: ActiveSocketsType[] = []; // Creates an empty array of ActiveSocketsType.
  // Also works to inform everyone who is connected.

  afterInit(server: any) {
    this.logger.log('Gateway initialized.');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.debug(`Client: ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    this.logger.debug(`Client: ${client.id} disconnected`);
  }

  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload: JoinRoomDto) {
    const { userId, link } = payload;

    const existingOnSockets = this.activeSockets.find(socket => {
      socket.room === link && socket.id === client.id
    })

    // If the client does not yet exist in the activeSockets array, then it will be registered in this moment.
    if (!existingOnSockets) {
      this.activeSockets.push({ room: link, id: client.id, userId });

      // create dto
      const dto = {
        x: 2, // Default
        y: 2, // Default
        orientation: 'down' // Default
      } as UpdateUserPositionDto

      // update user
      await this.roomService.updateUserPosition(client.id, dto);

      // list users
      const users = await this.roomService.listUsersPositionByLink(dto.link)

      // to emit (??)
      this.wss.emit(`${link}-updates-users-list`, {
        users
      });

      // broadcast (??)
      client.broadcast.emit(`${link}-adds-user`, {
        user: client.id
      });
    }
    // broadcast: transmissao.

    // If the client already exists in the activeSockets array, then when entering the room, just the below message is returned. 
    this.logger.debug(`Socket client: ${client.id} starts to join room ${link}`);

  }


  @SubscribeMessage('move')
  async handleMove(client: Socket, payload: UpdateUserPositionDto) {
    // get objects from payload
    const { link, userId, x, y, orientation } = payload;

    // debug
    this.logger.debug(`Socket client ${client.id} starts to join room ${link}`);

    // create dto
    const dto = {
      link,
      userId,
      x,
      y,
      orientation
    } as UpdateUserPositionDto

    // update user
    await this.roomService.updateUserPosition(client.id, dto);

    // list users
    const users = await this.roomService.listUsersPositionByLink(link);

    // to emit
    this.wss.emit(`${link}-updates-users-list`, {
      users
    });
  }


  @SubscribeMessage('togl-mute-user')
  async handleToglMute(payload: ToglMuteDto) {
    // get objects from payload
    const { link } = payload;
    // update with payload
    await this.roomService.updateUserMuted(payload);
    // list
    const users = await this.roomService.listUsersPositionByLink(link);
    // emit
    this.wss.emit(`${link}-updates-user-list`, {
      users
    });
  }




  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   console.log('message:', payload);
  //   return 'Hello world!';
  // }




}