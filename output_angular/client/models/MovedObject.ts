import Client from './Client';
class MovedObject {
  private _client?: Client;
  private _error?: boolean;
  private _content?: (number | any)[];
  private _additionalProperties?: Map<string, any>;

  constructor(input: {
    client?: Client;
    error?: boolean;
    content?: (number | any)[];
    additionalProperties?: Map<string, any>;
  }) {
    this._client = input.client;
    this._error = input.error;
    this._content = input.content;
    this._additionalProperties = input.additionalProperties;
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

  get content(): (number | any)[] | undefined {
    return this._content;
  }
  set content(content: (number | any)[] | undefined) {
    this._content = content;
  }

  get additionalProperties(): Map<string, any> | undefined {
    return this._additionalProperties;
  }
  set additionalProperties(additionalProperties: Map<string, any> | undefined) {
    this._additionalProperties = additionalProperties;
  }

  public marshal(): string {
    let json = '{';
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
    if (this.content !== undefined) {
      let contentJsonValues: any[] = [];
      for (const unionItem of this.content) {
        contentJsonValues.push(
          typeof unionItem === 'number' || typeof unionItem === 'boolean'
            ? unionItem
            : JSON.stringify(unionItem)
        );
      }
      json += `"content": [${contentJsonValues.join(',')}],`;
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

  public static unmarshal(json: string | object): MovedObject {
    const obj = typeof json === 'object' ? json : JSON.parse(json);
    const instance = new MovedObject({} as any);

    if (obj['client'] !== undefined) {
      instance.client = Client.unmarshal(obj['client']);
    }
    if (obj['error'] !== undefined) {
      instance.error = obj['error'];
    }
    if (obj['content'] !== undefined) {
      instance.content = obj['content'];
    }

    if (instance.additionalProperties === undefined) {
      instance.additionalProperties = new Map();
    }
    for (const [key, value] of Object.entries(obj).filter(([key]) => {
      return !['client', 'error', 'content', 'additionalProperties'].includes(
        key
      );
    })) {
      instance.additionalProperties.set(key, value as any);
    }

    return instance;
  }
}
export default MovedObject;
