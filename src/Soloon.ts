import { IMegaverseObject } from './ifaces.js';
import { sendCreateRequest, sendDeleteRequest } from './services.js';

export class Soloon implements IMegaverseObject {
  constructor(
    private readonly row: number,
    private readonly column: number,
    private readonly color: string,
  ) {}

  public create(godId: string) {
    const soloon = {
      candidateId: godId,
      row: this.row,
      column: this.column,
      color: this.color,
    };

    return sendCreateRequest(soloon, 'soloons');
  }

  async delete(godId: string) {
    const soloon = {
      candidateId: godId,
      row: this.row,
      column: this.column,
    };

    return sendDeleteRequest(soloon, 'soloons');
  }

  toString() {
    return `Soloon(${this.row}, ${this.column}, ${this.color})`;
  }
}
