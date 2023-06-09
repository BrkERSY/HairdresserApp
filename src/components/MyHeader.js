import React, {useContext, useState, useEffect} from 'react';
import {View, Button, TouchableOpacity, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Actionsheet, Spinner, Input, Box} from 'native-base';

import Context, {initialState} from '../context/store';

export default MyHeader = props => {
  let {navigation, isHome, title} = props;

  const {state, dispatch} = useContext(Context);

  return (
    <Box
      style={{
        flexDirection: 'row',
        height: 60,
        backgroundColor: 'white',
        //borderBottomWidth: 1,
        borderBottomColor: '#ff5c2c',
        padding: 15,
      }}>
      <View style={{justifyContent: 'center', flex: 1}}>
        {isHome ? (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Icon color="#ff5c2c" size={16} name="bars" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon color="white" size={16} name="arrow-left" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{color: 'white'}}>{title}</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          flex: 1,
        }}></View>
    </Box>
  );
};
