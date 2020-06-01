import { Controller, Get } from '@nestjs/common';
import { SocketGateway } from 'src/socket/socket.gateway';
import RipperinoSlave from 'src/socket/RipperinoSlave';

@Controller('api/rips')
export class RipsController {
  constructor(private readonly socketGateway: SocketGateway) {}

  @Get()
  getAllSlaves(): object[] {
    return Array.from(this.socketGateway.slaves.values()).map(slave => slave.getPublicStrucure());
  }
}
