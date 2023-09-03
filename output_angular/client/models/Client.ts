class Client {
  private _id?: string;
  private _additionalProperties?: Map<string, any>;

  constructor(input: { id?: string; additionalProperties?: Map<string, any> }) {
    this._id = input.id;
    this._additionalProperties = input.additionalProperties;
  }

  get id(): string | undefined {
    return this._id;
  }
  set id(id: string | undefined) {
    this._id = id;
  }

  get additionalProperties(): Map<string, any> | undefined {
    return this._additionalProperties;
  }
  set additionalProperties(additionalProperties: Map<string, any> | undefined) {
    this._additionalProperties = additionalProperties;
  }

  public marshal(): string {
    let json = '{';
    if (this.id !== undefined) {
      json += `"id": ${
        typeof this.id === 'number' || typeof this.id === 'boolean'
          ? this.id
          : JSON.stringify(this.id)
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

  public static unmarshal(json: string | object): Client {
    const obj = typeof json === 'object' ? json : JSON.parse(json);
    const instance = new Client({} as any);

    if (obj['id'] !== undefined) {
      instance.id = obj['id'];
    }

    if (instance.additionalProperties === undefined) {
      instance.additionalProperties = new Map();
    }
    for (const [key, value] of Object.entries(obj).filter(([key]) => {
      return !['id', 'additionalProperties'].includes(key);
    })) {
      instance.additionalProperties.set(key, value as any);
    }

    return instance;
  }
}
export default Client;
