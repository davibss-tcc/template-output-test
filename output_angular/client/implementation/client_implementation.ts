import { metainfoService } from '../services/metainfo-mqtt-service';
import { EDScorbot_commandsService } from '../services/EDScorbot_commands-mqtt-service';
import { EDScorbot_movedService } from '../services/EDScorbot_moved-mqtt-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientImplementationService {
  private metainfoService: metainfoService;
  private EDScorbot_commandsService: EDScorbot_commandsService;
  private EDScorbot_movedService: EDScorbot_movedService;

  constructor() {
    this.subscribeToAllServices();
  }

  subscribeToAllServices() {
    this.metainfoService.subscribeAll();
    this.EDScorbot_commandsService.subscribeAll();
    this.EDScorbot_movedService.subscribeAll();
  }

  unsubscribeToAllServices() {
    this.metainfoService.unsubscribeAll();
    this.EDScorbot_commandsService.unsubscribeAll();
    this.EDScorbot_movedService.unsubscribeAll();
  }
}
