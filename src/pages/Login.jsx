import React, {useContext, useState, useEffect, useRef} from 'react';
import {definitions} from '../definitions.json';

import {
  Platform,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  View,
  Alert,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollViewBase,
  StatusBar,
  Text,  TextInput,
} from 'react-native';

import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  Image,
  Center,
  Spinner,
  Modal,
  Body,

} from 'native-base';

import {pRF, gR, storeStringAS, getStringAS} from '../functions.js';

import LinearGradient from 'react-native-linear-gradient';

import Toast from 'react-native-simple-toast';

import RNBootSplash from 'react-native-bootsplash';

import * as Animatable from 'react-native-animatable';

import KeyboardListener from 'react-native-keyboard-listener';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

async function login(p, dispatch, autoLogin) {

  //
  dispatch({type: 'USER_OK'});
  //
  
  console.log('LOGİN P.TELNO', p.telNo);

  if (autoLogin) {
    tN = p.telNo;
  } else {
    tN = p.telNo.split('+9')[1];
  }

  p.setBtnIsLoading(true);

  const form0 = new FormData();
  form0.append('PlayerID', fbToken);
  form0.append('TelefonNo', tN);
  const PlayerIDReq = await pRF(form0, definitions.NotificationToken);

  const form = new FormData();
  form.append('TelefonNo', tN);
  const loginReq = await pRF(form, definitions.LoginURL);

  if (loginReq?.musteriID > 0) {
    dispatch({type: 'STAFF_INFO', payload: loginReq});

    dispatch({type: 'TOKEN', payload: loginReq.token});

    await storeStringAS('telNo', tN);
    dispatch({type: 'USER_OK'});
  } else {
    Toast.show('Kullanıcı adı veya şifre yanlış');
    RNBootSplash.hide({fade: true});
  }

  p.setBtnIsLoading(false);
}

export default App = ({navigation, route}) => {
  const [btnIsLoading, setBtnIsLoading] = useState();
  const [smsGir, setSmsGir] = useState(false);
  const [androidSign, setAndroidSign] = useState('');

  const {state, dispatch} = useContext(Context);

  const [telNo, setTelNo] = useState(__DEV__ ? '' : '');

  const [scrollUzat, setScrollUzat] = useState(false);

  const scrollListReftop = useRef(null);

  useEffect(() => {
    otoLogin();
  }, []);

  async function otoLogin() {
    let storeTelNo = await getStringAS('telNo');

    if (storeTelNo !== null) {
      setTelNo(storeTelNo);
      login(
        {telNo: storeTelNo, setBtnIsLoading, setSmsGir, androidSign},
        dispatch,
        true,
      );
    } else {
      RNBootSplash.hide({fade: true});
    }
  }

  return (
    <ScrollView
      ref={scrollListReftop}
      style={{flex: 1, height: '100%', width: '100%', backgroundColor:'white'}}>
      <StatusBar
        hidden={false}
        translucent={true}
        backgroundColor={'white'}
        barStyle="dark-content"
      />

      <KeyboardListener
        onWillShow={() => {
          if (Platform.OS === 'ios') {
            setScrollUzat(true);

            setTimeout(() => {
              scrollListReftop.current.scrollTo({
                x: 0,
                y: hp('21%'),
                animated: true,
              });
            }, 0);
          }
        }}
        onWillHide={() => {
          if (Platform.OS === 'ios') {
            setScrollUzat(false);

            scrollListReftop.current.scrollTo({
              x: 0,
              y: 0,
              animated: false,
            });
          }
        }}
        onDidShow={() => {
          if (Platform.OS === 'android') {
            setScrollUzat(true);

            setTimeout(() => {
              scrollListReftop.current.scrollTo({
                x: 0,
                y: hp('15%'),
                animated: true,
              });
            }, 0);
          }
        }}
        onDidHide={() => {
          if (Platform.OS === 'android') {
            setScrollUzat(false);

            scrollListReftop.current.scrollTo({
              x: 0,
              y: 0,
              animated: false,
            });
          }
        }}
      />

   
        <View style={{flex: 1, width: '95%', alignSelf: 'center', backgroundColor:'white'}}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animatable.View
              animation="fadeIn"
              delay={Platform.OS == 'ios' ? 300 : 0}
              style={{
                opacity: 0,
              }}>
              <Image
                source={require('../res/Login/hdaLogo.png')} 
                style={{
                  alignSelf: 'center',
              
                  marginTop: hp('15%'),
                }}
              />
            </Animatable.View>
          </TouchableWithoutFeedback>

          <Text
            style={{
              fontSize: hp('4%'),
              marginTop: hp('15%'),
              alignSelf: 'center',
              color: '#47404E',
            }}>
            Hoş Geldiniz
          </Text>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: hp('5%'),
            }}>
            <TextInput
              style={{
                fontSize: 20,
                height: 53,
                borderRadius: 16,
                borderColor: '#6441A5',
                borderWidth: 1,
                color: '#555',
                textAlign: 'center',
              }}
              value={telNo}
              defaultCountry="TR"
              onChange={setTelNo}
              onSubmitEditing={() => {
                login(
                  {telNo, setBtnIsLoading, setSmsGir, androidSign},
                  dispatch,
                );
              }}
              placeholder={'Telefon No..'}
              placeholderTextColor={'#ccc'}
              maxLength={14}
            />

            <Box p={0} alignItems={'center'} mt={10}>
              <TouchableOpacity
                disabled={btnIsLoading}
                activeOpacity={0.8}
                style={{width: '100%'}}
                onPress={() => {
                  login(
                    {telNo, setBtnIsLoading, setSmsGir, androidSign},
                    dispatch,
                  );
                }}>
                <LinearGradient
                  angle={90}
                  useAngle={true}
                  colors={['#6441A5', '#2A0845']}
                  style={styles.linearGradient}>
                  {btnIsLoading ? (
                    <Spinner color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Giriş</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Box>
          </View>
        </View>
    

      {scrollUzat && <View style={{height: 100}}></View>}
    </ScrollView>
  );
};

var styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

  box: {
    width: 300,
    height: 45,
    marginVertical: 15,
    borderColor: 'red',
    borderWidth: 1,
  },

  container: {
    alignItems: 'center',

    height: 65,

    width: 200,

    borderWidth: 1,
    borderColor: '#6441A5',
    borderRadius: 10,
  },
});
