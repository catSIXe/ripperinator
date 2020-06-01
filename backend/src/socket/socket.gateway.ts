import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import * as OBS from 'obs-websocket-js'
import RipperinoSlave from './RipperinoSlave';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
    // users: number = 0;
    public slaves: Map<string, RipperinoSlave> = new Map<string, RipperinoSlave>();

    async handleConnection(client: Socket) {
        client.id = client.handshake.headers['x-real-ip']
        console.log(client.id, 'connected')
        //console.log(client.handshake.headers['x-real-ip'])
        this.slaves.set(client.id, new RipperinoSlave(client))
        console.log('Connecting to OBS')
        // this.server.emit('users', this.users);
    }

    async handleDisconnect(client: Socket) {
        console.log(client.id, 'disconnected')
        //this.server.emit('users', this.users);
    }

    /*@SubscribeMessage('chat')
    async onChat(client, message) {
        client.broadcast.emit('chat', message);
    }*/
    @SubscribeMessage('title')
    async onTitle(client, message) {
        console.log(client.id, 'title', message) //client.broadcast.emit('chat', message);
        this.slaves.get(client.id).onTitle(message)
    }
    @SubscribeMessage('time')
    async onTime(client, message) {
        console.log(client.id, 'time', message)
        this.slaves.get(client.id).onTime(message)
    }
    
    @SubscribeMessage('start')
    async onStart(client, message) {
        this.slaves.get(client.id).onStart(message)
    }
    @SubscribeMessage('resume')
    async onResume(client, message) {
        this.slaves.get(client.id).onResume(message)
    }
    @SubscribeMessage('paused')
    async onPaused(client, message) {
        this.slaves.get(client.id).onPaused(message)
    }
    @SubscribeMessage('ended')
    async onEnded(client, message) {
        this.slaves.get(client.id).onEnded(message)
    }
}