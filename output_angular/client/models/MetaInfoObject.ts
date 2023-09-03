import MetaInfoSignal from './MetaInfoSignal';
import JointInfo from './JointInfo';
class MetaInfoObject {
  private _signal: MetaInfoSignal;
  private _reservedName?: string;
  private _joints?: (JointInfo | any)[];
  private _additionalProperties?: Map<string, any>;

  constructor(input: {
    signal: MetaInfoSignal;
    reservedName?: string;
    joints?: (JointInfo | any)[];
    additionalProperties?: Map<string, any>;
  }) {
    this._signal = input.signal;
    this._reservedName = input.reservedName;
    this._joints = input.joints;
    this._additionalProperties = input.additionalProperties;
  }

  get signal(): MetaInfoSignal {
    return this._signal;
  }
  set signal(signal: MetaInfoSignal) {
    this._signal = signal;
  }

  get reservedName(): string | undefined {
    return this._reservedName;
  }
  set reservedName(reservedName: string | undefined) {
    this._reservedName = reservedName;
  }

  get joints(): (JointInfo | any)[] | undefined {
    return this._joints;
  }
  set joints(joints: (JointInfo | any)[] | undefined) {
    this._joints = joints;
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
    if (this.reservedName !== undefined) {
      json += `"name": ${
        typeof this.reservedName === 'number' ||
        typeof this.reservedName === 'boolean'
          ? this.reservedName
          : JSON.stringify(this.reservedName)
      },`;
    }
    if (this.joints !== undefined) {
      let jointsJsonValues: any[] = [];
      for (const unionItem of this.joints) {
        if (unionItem instanceof JointInfo) {
          jointsJsonValues.push(unionItem.marshal());
        } else {
          jointsJsonValues.push(
            typeof unionItem === 'number' || typeof unionItem === 'boolean'
              ? unionItem
              : JSON.stringify(unionItem)
          );
        }
      }
      json += `"joints": [${jointsJsonValues.join(',')}],`;
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

  public static unmarshal(json: string | object): MetaInfoObject {
    const obj = typeof json === 'object' ? json : JSON.parse(json);
    const instance = new MetaInfoObject({} as any);

    if (obj['signal'] !== undefined) {
      instance.signal = obj['signal'];
    }
    if (obj['name'] !== undefined) {
      instance.reservedName = obj['name'];
    }
    if (obj['joints'] !== undefined) {
      instance.joints = obj['joints'];
    }

    if (instance.additionalProperties === undefined) {
      instance.additionalProperties = new Map();
    }
    for (const [key, value] of Object.entries(obj).filter(([key]) => {
      return ![
        'signal',
        'reservedName',
        'joints',
        'additionalProperties',
      ].includes(key);
    })) {
      instance.additionalProperties.set(key, value as any);
    }

    return instance;
  }
}
export default MetaInfoObject;
