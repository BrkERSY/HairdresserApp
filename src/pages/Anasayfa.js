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
  Text,
  TouchableOpacty,
} from 'react-native';
import {Select} from 'native-base';

import Context from '../context/store';

import MyHeader from '../components/MyHeader';

import {pR, gR} from '../functions.js';

import {definitions} from '../definitions.json';

import moment from 'moment';

import RNBootSplash from 'react-native-bootsplash';

const Dashboard = ({navigation, route}) => {
  const {state, dispatch} = useContext(Context);
  const [seciliBayiID, setSeciliBayiID] = useState(-1);
  const [tumBayilerData, setTumBayilerData] = useState([]);
  const [hizmetlerData, setHizmetlerData] = useState([]);
  const [seciliHizmetID, setSeciliHizmetID] = useState(-1);

  async function getBayiler() {
    let body = {};

    let tumBayilerReq = await pR(
      body,
      definitions.webServis + '/anasayfaTumBayiler.php',
    ).then(data => data);

    console.log('tumBayilerReq', tumBayilerReq);

    setTumBayilerData(tumBayilerReq?.veri);
  }

  async function getHizmetler(bayiID) {
    let body = {
      seciliBayiID: bayiID,
    };

    let hizmetlerReq = await pR(
      body,
      definitions.webServis + '/hizmetler.php',
    ).then(data => data);

    console.log('HizmetlerReq', hizmetlerReq);

    setHizmetlerData(hizmetlerReq?.veri);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});

    RNBootSplash.hide({fade: true});

    getBayiler();

    console.log('state.staffInfo', state.staffInfo);
    if (parseInt(state.staffInfo.secili_bayi_id) > 0) {
      getHizmetler(state.staffInfo.secili_bayi_id);
      setSeciliBayiID(state.staffInfo.secili_bayi_id);
    }

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView flex={1}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <MyHeader navigation={navigation} isHome={true} title={''} />

      <View style={{flex: 1}}>
        <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
          <Select
            placeholder="Bayi Seçiniz"
            selectedValue={seciliBayiID}
            width={'100%'}
            onValueChange={itemValue => {
              setSeciliBayiID(itemValue);
              getHizmetler(itemValue);
            }}>
            {tumBayilerData.map((item, index) => {
              return <Select.Item label={item.adSoyad} value={item.id} />;
            })}
          </Select>
        </View>

        <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            {hizmetlerData?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSeciliHizmetID(item.id);
                  }}
                  activeOpacity={0.7}
                  style={{
                    flex: 0.3,
                    borderWidth: 1,
                    borderRadius: 6,
                    padding: 5,
                    borderColor: '#ddd',
                    height: 50,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      seciliHizmetID == item.id ? 'orange' : 'transparent',
                  }}>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight:
                          seciliHizmetID == item.id ? 'bold' : 'normal',
                      }}>
                      {item.baslik}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

export default Dashboard;
