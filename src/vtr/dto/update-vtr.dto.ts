import { PartialType } from '@nestjs/swagger';
import { CreateVtrDto } from './create-vtr.dto';

export class UpdateVtrDto extends PartialType(CreateVtrDto) { }
