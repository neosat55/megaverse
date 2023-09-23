export type UniverseObject = 'POLYANET' | 'SOLOON' | 'COMETH';

export interface IMegaverseObject {
  create(godId: string): Promise<Result<void>>;
  delete(godId: string): Promise<Result<void>>;
}

export interface Result<T> {
  ok: boolean;
  data: T;
  message?: string;
}
