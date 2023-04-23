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
  Text,
  TextInput,
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

import {pR, pRF, gR, storeStringAS, getStringAS} from '../functions.js';

import LinearGradient from 'react-native-linear-gradient';

import Toast from 'react-native-simple-toast';

import RNBootSplash from 'react-native-bootsplash';

import * as Animatable from 'react-native-animatable';

import KeyboardListener from 'react-native-keyboard-listener';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default App = ({navigation, route}) => {
  const [btnIsLoading, setBtnIsLoading] = useState();
  const [smsGir, setSmsGir] = useState(false);
  const [androidSign, setAndroidSign] = useState('');

  const {state, dispatch} = useContext(Context);

  const [eMail, setEmail] = useState('burak.ersy061@gmail.com');

  const [parola, setParola] = useState('71001');

  const [scrollUzat, setScrollUzat] = useState(false);

  const scrollListReftop = useRef(null);

  useEffect(() => {
    otoLogin();
  }, []);

  async function otoLogin() {
    let storeeMail = await getStringAS('eMail');

    if (storeeMail !== null) {
      setEmail(storeeMail);
      login(
        {eMail: storeeMail, setBtnIsLoading, setSmsGir, androidSign},
        dispatch,
        true,
      );
    } else {
      RNBootSplash.hide({fade: true});
    }
  }

  async function login() {
    //
    //dispatch({type: 'USER_OK'});
    //

    setBtnIsLoading(true);

    let body = {
      eMail: eMail,
      parola: parola,
    };

    let loginReq = await pR(body, definitions.webServis + '/login.php').then(
      data => data,
    );

    console.log('loginReq', loginReq);

    if (loginReq?.result == 1) {
      dispatch({type: 'STAFF_INFO', payload: loginReq});
      dispatch({type: 'TOKEN', payload: loginReq.token});

      await storeStringAS('eMail', eMail);

      dispatch({type: 'USER_OK'});
    } else {
      Toast.show(loginReq.veri);
      RNBootSplash.hide({fade: true});
    }
    setBtnIsLoading(false);
  }

  var genelRenk = '#244161';

  return (
    <ScrollView
      ref={scrollListReftop}
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
      }}>
      <StatusBar
        hidden={false}
        translucent={true}
        backgroundColor={'#fff'}
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

      <View
        style={{
          flex: 1,
          width: '95%',
          alignSelf: 'center',
          backgroundColor: '#fff',
        }}>
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
              borderRadius: 30,
              borderColor: genelRenk,
              borderWidth: 1,
              color: '#555',
              textAlign: 'center',
            }}
            value={eMail}
            onChangeText={v => {
              setEmail(v);
            }}
            placeholder={'E-Mail'}
            placeholderTextColor={'#ccc'}
          />

          <TextInput
            style={{
              fontSize: 20,
              height: 53,
              borderRadius: 30,
              borderColor: genelRenk,
              borderWidth: 1,
              color: '#555',
              textAlign: 'center',
              marginTop: 15,
            }}
            value={parola}
            secureTextEntry={true}
            defaultCountry="TR"
            onChangeText={v => {
              setParola(v);
            }}
            placeholder={'Parola'}
            placeholderTextColor={'#ccc'}
          />

          <Box p={0} alignItems={'center'} mt={10}>
            <TouchableOpacity
              disabled={btnIsLoading}
              activeOpacity={0.8}
              style={{width: '100%'}}
              onPress={() => {
                login();
              }}>
              <LinearGradient
                angle={180}
                useAngle={true}
                colors={['#244161', '#244161']}
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
    color: '#fff',
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
