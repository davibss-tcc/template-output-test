class JointInfo {
  private _minimum?: number;
  private _maximum?: number;
  private _additionalProperties?: Map<string, any>;

  constructor(input: {
    minimum?: number;
    maximum?: number;
    additionalProperties?: Map<string, any>;
  }) {
    this._minimum = input.minimum;
    this._maximum = input.maximum;
    this._additionalProperties = input.additionalProperties;
  }

  get minimum(): number | undefined {
    return this._minimum;
  }
  set minimum(minimum: number | undefined) {
    this._minimum = minimum;
  }

  get maximum(): number | undefined {
    return this._maximum;
  }
  set maximum(maximum: number | undefined) {
    this._maximum = maximum;
  }

  get additionalProperties(): Map<string, any> | undefined {
    return this._additionalProperties;
  }
  set additionalProperties(additionalProperties: Map<string, any> | undefined) {
    this._additionalProperties = additionalProperties;
  }

  public marshal(): string {
    let json = '{';
    if (this.minimum !== undefined) {
      json += `"minimum": ${
        typeof this.minimum === 'number' || typeof this.minimum === 'boolean'
          ? this.minimum
          : JSON.stringify(this.minimum)
      },`;
    }
    if (this.maximum !== undefined) {
      json += `"maximum": ${
        typeof this.maximum === 'number' || typeof this.maximum === 'boolean'
          ? this.maximum
          : JSON.stringify(this.maximum)
      },`;
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

  public static unmarshal(json: string | object): JointInfo {
    const obj = typeof json === 'object' ? json : JSON.parse(json);
    const instance = new JointInfo({} as any);

    if (obj['minimum'] !== undefined) {
      instance.minimum = obj['minimum'];
    }
    if (obj['maximum'] !== undefined) {
      instance.maximum = obj['maximum'];
    }

    if (instance.additionalProperties === undefined) {
      instance.additionalProperties = new Map();
    }
    for (const [key, value] of Object.entries(obj).filter(([key]) => {
      return !['minimum', 'maximum', 'additionalProperties'].includes(key);
    })) {
      instance.additionalProperties.set(key, value as any);
    }

    return instance;
  }
}
export default JointInfo;
