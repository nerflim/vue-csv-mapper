import { httpClient } from '@/services/httpClient';

const BASE_PATH = '/contacts';

export const getContacts = (payload: any): Promise<any> =>
  httpClient
    .get(`${BASE_PATH}`, {
      params: payload
    })
    .then(({ data }) => data);

export const importContacts = (payload: any): Promise<any> =>
  httpClient.post(`${BASE_PATH}/import`, payload).then(({ data }) => data);

export const deleteContacts = (): Promise<any> =>
  httpClient.delete(`${BASE_PATH}/delete`).then(({ data }) => data);
