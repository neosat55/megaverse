import { UniverseObject } from './ifaces.js';

export const result = <T>(status: boolean, data?: T, message?: string) => {
  return {
    ok: status,
    data,
    message,
  };
};

export const sleep = (t: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), t);
  });
};

export const toMegaverse = (str: string): UniverseObject => {
  if (str === 'POLYANET') {
    return 'POLYANET';
  } else if (str.indexOf('SOLOON') > -1) {
    return 'SOLOON';
  } else if (str.indexOf('COMETH') > -1) {
    return 'COMETH';
  }

  return null;
};

export const takeProp = (str: string): string => {
  const idx = str.indexOf('_');

  return str.slice(0, idx).toLowerCase();
};
