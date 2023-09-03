import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subject, Subscription } from 'rxjs';
import { CommandObject } from '../models';
import { secure_mqttMosquittoEnvironment } from '../environments/environment.secure-mqtt.mosquitto';

@Injectable({
  providedIn: 'root',
})
export class EDScorbot_commandsService {
  private _mqttService: MqttService;
  private client: any;

  private subscriptionEDScorbot_commands: Subscription | undefined;

  private MQTT_SERVICE_OPTIONS = {
    hostname: secure_mqttMosquittoEnvironment.broker.hostname,
    port: secure_mqttMosquittoEnvironment.broker.port,
    clean: secure_mqttMosquittoEnvironment.broker.clean,
    connectTimeout: secure_mqttMosquittoEnvironment.broker.connectTimeout,
    reconnectPeriod: secure_mqttMosquittoEnvironment.broker.reconnectPeriod,
    clientId: 'Angular client' + new Date().toLocaleString(),
  };

  constructor() {
    this._mqttService = new MqttService(this.MQTT_SERVICE_OPTIONS);
    this.client = this._mqttService;
  }

  createConnection() {
    try {
      this.client?.connect();
    } catch (error) {
      console.log('mqtt.connect error', error);
    }
    this.client?.onConnect.subscribe(() => {
      console.log('Connection succeeded!');
    });
    this.client?.onError.subscribe((error: any) => {
      console.log('Connection failed', error);
    });
    this.client?.onMessage.subscribe((packet: any) => {
      console.log(
        `Received message ${packet.payload} from topic ${packet.topic}`
      );
    });
  }

  subscribeAll() {
    this.subscribeEDScorbot_commands(() => {});
  }

  unsubscribeAll() {
    this.unsubscribeEDScorbot_commands();
  }

  subscribeEDScorbot_commands(
    callback: (message: IMqttMessage) => void,
    options?: { topic?: string }
  ) {
    const topicName = options?.topic ?? 'EDScorbot/commands';

    this.subscriptionEDScorbot_commands = this.client
      ?.observe(topicName, { qos: 0 })
      .subscribe(callback);
  }

  unsubscribeEDScorbot_commands() {
    this.subscriptionEDScorbot_commands?.unsubscribe();
  }

  unsafePublishEDScorbot_commands(
    payload: CommandObject,
    options?: { topic?: string }
  ) {
    const topicName = options?.topic ?? 'EDScorbot/commands';
    const stringfiedPayload = JSON.stringify(payload);

    this.client.unsafePublish(topicName, stringfiedPayload, { qos: 0 });
  }
}
