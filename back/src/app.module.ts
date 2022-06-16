import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { initializeFirebase } from './firebase.config';
import { RoutingModule } from './routing/routing.module';
import { SharedModule } from './shared/shared.module';

dotenv.config();
initializeFirebase();

@Module({
  imports: [RoutingModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
