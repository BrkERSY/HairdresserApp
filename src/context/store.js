import {createContext} from 'react';

export const initialState = {
  userOK: false,
  isLoading: false,
  settings: {},
  staffInfo: '',
  currentRoute: 'AnasayfaTab',
};

export default Context = createContext(initialState);
