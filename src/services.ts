import { result } from './utils.js';
import { Result } from './ifaces.js';

const PHASE = Number(process.env.PHASE) || 2;
const API_PATH = 'https://challenge.crossmint.io/api';

type ApiTypes = 'polyanets' | 'soloons' | 'comeths';

export const sendCreateRequest = async (
  body: object,
  what: ApiTypes,
): Promise<Result<void>> => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  const res = await fetch(`${API_PATH}/${what}`, {
    method: 'POST',
    body: JSON.stringify({ ...body, phase: PHASE }),
    headers,
  });

  if (res.status !== 200) {
    return result(false, null, res.statusText);
  }

  return result(true, null);
};

export const sendDeleteRequest = async (
  body: object,
  what: ApiTypes,
): Promise<Result<void>> => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  const res = await fetch(`${API_PATH}/${what}`, {
    method: 'DELETE',
    body: JSON.stringify({ ...body, phase: PHASE }),
    headers,
  });

  if (res.status !== 200) {
    return result(false, null, res.statusText);
  }

  return result(true, null);
};

export const loadGoal = async (
  candidateId: string,
): Promise<Result<{ goal: string[][] }>> => {
  const res = await fetch(`${API_PATH}/map/${candidateId}/goal`);

  if (res.status !== 200) {
    return result(false, null, res.statusText);
  }

  const json = await res.json();

  return result(true, json);
};

export const loadCurrentMap = async (
  candidateId: string,
): Promise<Result<{ map: { content: any[][] } }>> => {
  const res = await fetch(`${API_PATH}/map/${candidateId}/goal`);

  if (res.status !== 200) {
    return result(false, null, res.statusText);
  }

  const json = await res.json();

  return result(true, json);
};
