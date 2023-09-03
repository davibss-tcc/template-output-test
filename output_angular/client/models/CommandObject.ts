import CommandSignal from './CommandSignal';
import Client from './Client';
class CommandObject {
  private _signal: CommandSignal;
  private _client?: Client;
  private _error?: boolean;
  private _point?: (number | any)[];
  private _trajectory?: ((number | any)[] | any)[];
  private _additionalProperties?: Map<string, any>;

  constructor(input: {
    signal: CommandSignal;
    client?: Client;
    error?: boolean;
    point?: (number | any)[];
    trajectory?: ((number | any)[] | any)[];
    additionalProperties?: Map<string, any>;
  }) {
    this._signal = input.signal;
    this._client = input.client;
    this._error = input.error;
    this._point = input.point;
    this._trajectory = input.trajectory;
    this._additionalProperties = input.additionalProperties;
  }

  get signal(): CommandSignal {
    return this._signal;
  }
  set signal(signal: CommandSignal) {
    this._signal = signal;
  }

  get client(): Client | undefined {
    return this._client;
  }
  set client(client: Client | undefined) {
    this._client = client;
  }

  get error(): boolean | undefined {
    return this._error;
  }
  set error(error: boolean | undefined) {
    this._error = error;
  }

  get point(): (number | any)[] | undefined {
    return this._point;
  }
  set point(point: (number | any)[] | undefined) {
    this._point = point;
  }

  get trajectory(): ((number | any)[] | any)[] | undefined {
    return this._trajectory;
  }
  set trajectory(trajectory: ((number | any)[] | any)[] | undefined) {
    this._trajectory = trajectory;
  }

  get additionalProperties(): Map<string, any> | undefined {
    return this._additionalProperties;
  }
  set additionalProperties(additionalProperties: Map<string, any> | undefined) {
    this._additionalProperties = additionalProperties;
  }

  public marshal(): string {
    let json = '{';
    if (this.signal !== undefined) {
      json += `"signal": ${
        typeof this.signal === 'number' || typeof this.signal === 'boolean'
          ? this.signal
          : JSON.stringify(this.signal)
      },`;
    }
    if (this.client !== undefined) {
      json += `"client": ${this.client.marshal()},`;
    }
    if (this.error !== undefined) {
      json += `"error": ${
        typeof this.error === 'number' || typeof this.error === 'boolean'
          ? this.error
          : JSON.stringify(this.error)
      },`;
    }
    if (this.point !== undefined) {
      let pointJsonValues: any[] = [];
      for (const unionItem of this.point) {
        pointJsonValues.push(
          typeof unionItem === 'number' || typeof unionItem === 'boolean'
            ? unionItem
            : JSON.stringify(unionItem)
        );
      }
      json += `"point": [${pointJsonValues.join(',')}],`;
    }
    if (this.trajectory !== undefined) {
      let trajectoryJsonValues: any[] = [];
      for (const unionItem of this.trajectory) {
        trajectoryJsonValues.push(
          typeof unionItem === 'number' || typeof unionItem === 'boolean'
            ? unionItem
            : JSON.stringify(unionItem)
        );
      }
      json += `"trajectory": [${trajectoryJsonValues.join(',')}],`;
    }
    if (this.additionalProperties !== undefined) {
      for (const [key, value] of this.additionalProperties.entries()) {
        //Only unwrap those who are not already a property in the JSON object
        if (Object.keys(this).includes(String(key))) continue;
        json += `"${key}": ${
          typeof value === 'number' || typeof value === 'boolean'
            ? value
            : JSON.stringify(value)
        },`;
      }
    }

    //Remove potential last comma
    return `${
      json.charAt(json.length - 1) === ','
        ? json.slice(0, json.length - 1)
        : json
    }}`;
  }

  public static unmarshal(json: string | object): CommandObject {
    const obj = typeof json === 'object' ? json : JSON.parse(json);
    const instance = new CommandObject({} as any);

    if (obj['signal'] !== undefined) {
      instance.signal = obj['signal'];
    }
    if (obj['client'] !== undefined) {
      instance.client = Client.unmarshal(obj['client']);
    }
    if (obj['error'] !== undefined) {
      instance.error = obj['error'];
    }
    if (obj['point'] !== undefined) {
      instance.point = obj['point'];
    }
    if (obj['trajectory'] !== undefined) {
      instance.trajectory = obj['trajectory'];
    }

    if (instance.additionalProperties === undefined) {
      instance.additionalProperties = new Map();
    }
    for (const [key, value] of Object.entries(obj).filter(([key]) => {
      return ![
        'signal',
        'client',
        'error',
        'point',
        'trajectory',
        'additionalProperties',
      ].includes(key);
    })) {
      instance.additionalProperties.set(key, value as any);
    }

    return instance;
  }
}
export default CommandObject;
