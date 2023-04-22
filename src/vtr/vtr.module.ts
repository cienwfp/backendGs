import { Module } from '@nestjs/common';
import { VtrService } from './vtr.service';
import { VtrController } from './vtr.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VtrController],
  providers: [VtrService]
})
export class VtrModule { }
