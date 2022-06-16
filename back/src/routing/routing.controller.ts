import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateRoutingDto } from './dto/create-routing.dto';
import { RoutingService } from './routing.service';

@Controller('routing')
export class RoutingController {
  constructor(private readonly routingService: RoutingService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createRoutingDto: CreateRoutingDto) {
    return this.routingService.create(createRoutingDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.routingService.findOne(id);
  }
}
