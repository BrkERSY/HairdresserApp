import React, {useEffect} from 'react';
import ROUTER from './src/ROUTER';
import 'react-native-gesture-handler';

import {LogBox, AppState, Platform} from 'react-native';

import {NativeBaseProvider, extendTheme} from 'native-base';

const newColorTheme = {
  brand: {
    800: '#7c83db',
    700: '#b3bef6',
  },
  fire: {1: 'firebrick'},
};

const theme = extendTheme({colors: newColorTheme});

LogBox.ignoreAllLogs();

function App() {

  return (
    <NativeBaseProvider theme={theme}>
      <ROUTER />
    </NativeBaseProvider>
  );
}
export default App;
