import { IMegaverseObject } from './ifaces.js';
import { sendCreateRequest, sendDeleteRequest } from './services.js';

export class Cometh implements IMegaverseObject {
  constructor(
    private readonly row: number,
    private readonly column: number,
    private readonly direction: string,
  ) {}

  async create(godId: string) {
    const cometh = {
      candidateId: godId,
      row: this.row,
      column: this.column,
      direction: this.direction,
    };

    return sendCreateRequest(cometh, 'comeths');
  }

  async delete(godId: string) {
    const cometh = {
      candidateId: godId,
      row: this.row,
      column: this.column,
    };

    return sendDeleteRequest(cometh, 'comeths');
  }

  toString() {
    return `Cometh(${this.row}, ${this.column}, ${this.direction})`;
  }
}
