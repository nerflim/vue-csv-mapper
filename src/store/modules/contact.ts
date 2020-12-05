/* eslint-disable @typescript-eslint/camelcase */
import { getContacts } from '@/services/contact';

export interface ContactItem {
  id: number;
  team_id: number;
  name: string;
  phone: string;
  email: string;
  sticky_phone_number_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
  sort: string;
  sortBy: 'asc' | 'desc' | '';
  from: number;
  to: number;
  data: ContactItem[];
}

interface ContactState {
  contacts: Contact;
  loading: boolean;
}

interface ContactModel {
  namespaced: true;
  state: ContactState;
  mutations: any;
  actions: any;
}

const contact: ContactModel = {
  namespaced: true,
  state: {
    contacts: {
      total: 0,
      page: 0,
      pageSize: 3,
      pageCount: 0,
      sort: '',
      sortBy: '',
      from: 0,
      to: 0,
      data: []
    },
    loading: false
  },
  mutations: {
    setContacts(state: ContactState, payload: any) {
      state.contacts = {
        ...state.contacts,
        total: payload.total,
        page: payload.current_page,
        pageCount: payload.last_page,
        from: payload.from,
        to: payload.to,
        data: payload.data
      };
    },
    setLoading(state: ContactState, payload: boolean) {
      state.loading = payload;
    }
  },
  actions: {
    async getContactsAsync({ commit }: any, payload: any) {
      commit('setLoading', true);
      try {
        const data = await getContacts(payload);
        commit('setContacts', data);
        console.log('CONTACTS', data);
      } catch (err) {
        console.log(err);
      }
      commit('setLoading', false);
    }
  }
};

export default contact;
