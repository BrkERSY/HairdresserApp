import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Linking,
  StatusBar,
  Platform,
} from 'react-native';
import {
  Actionsheet,
  Button,
  Spinner,
  Input,
  Text,
  Box,
  Progress,
  VStack,
} from 'native-base';

import Context from '../context/store';

import MyHeader from '../components/MyHeader';

import {pRF, gR} from '../functions.js';

import {definitions} from '../definitions.json';

import moment from 'moment';

import RNBootSplash from 'react-native-bootsplash';

const RandevuAl = ({navigation, route}) => {
  const {state, dispatch} = useContext(Context);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView flex={1}>
      <StatusBar barStyle="light-content" backgroundColor="#254162" />
      <MyHeader navigation={navigation} isHome={true} title={''} />

      <Box flex={1} bgColor={'#292B4D'}>
        Randevu Al
      </Box>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

export default RandevuAl;
