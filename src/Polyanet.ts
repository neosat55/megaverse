import { IMegaverseObject } from './ifaces.js';
import { sendCreateRequest, sendDeleteRequest } from './services.js';

export class Polyanet implements IMegaverseObject {
  constructor(
    private readonly row: number,
    private readonly column: number,
  ) {}

  public create(godId: string) {
    const polyanet = {
      candidateId: godId,
      row: this.row,
      column: this.column,
    };

    return sendCreateRequest(polyanet, 'polyanets');
  }

  public delete(godId: string) {
    const polyanet = {
      candidateId: godId,
      row: this.row,
      column: this.column,
    };

    return sendDeleteRequest(polyanet, 'polyanets');
  }

  toString() {
    return `Polyanet(${this.row}, ${this.column})`;
  }
}
