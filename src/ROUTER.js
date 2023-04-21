import React, {useEffect, useReducer, useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {reducer} from './context/reducer';
import Context, {initialState} from './context/store';

import {
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';

import Splash from './pages/Splash';

import Login from './pages/Login';

import Anasayfa from './pages/Anasayfa';

import RandevuAl from './pages/RandevuAl';

import {Image, Text, Divider, Box, Center} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {storeStringAS, getStringAS} from './functions.js';

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#254162',
        height: 60,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopWidth: 0,
        marginTop: -10,
        paddingBottom: 5,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          console.log(options);
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (label == 'X') {
          return null;
        } else {
          return (
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                key={'T' + index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{flex: 1, alignItems: 'center'}}>
                {
                  <Icon
                    size={18}
                    name={
                      label == 'Anasayfa'
                        ? 'home'
                        : label == 'Randevu Al'
                        ? 'plus-circle'
                        : 'rocket'
                    }
                    color={isFocused ? '#3AB9D6' : '#fff'}
                  />
                }
                <Text
                  style={{color: isFocused ? '#3AB9D6' : '#fff', fontSize: 10}}>
                  {label}
                </Text>
              </TouchableOpacity>

              {isFocused ? (
                <View>
                  <View
                    style={{
                      elevation: 10,
                      backgroundColor: '#3A5471',
                      width: 70,
                      height: 25,
                      borderRadius: 50,
                      marginBottom: -35,
                    }}></View>
                  {Platform.OS == 'ios' && (
                    <View
                      style={{
                        marginBottom: -35,
                        marginTop: 17.5,
                        width: 70,
                        height: 20,
                        backgroundColor: '#244161', //#244161
                      }}></View>
                  )}
                </View>
              ) : null}
            </View>
          );
        }
      })}
    </View>
  );
}

const AnasayfaStack = createNativeStackNavigator();
const AnasayfaStackScreen = props => (
  <AnasayfaStack.Navigator>
    <AnasayfaStack.Screen
      name="Anasayfa"
      component={Anasayfa}
      options={{
        headerShown: false,
      }}
    />
  </AnasayfaStack.Navigator>
);

const RandevuAlStack = createNativeStackNavigator();
const RandevuAlStackScreen = props => (
  <RandevuAlStack.Navigator>
    <RandevuAlStack.Screen
      name="RandevuAl"
      component={RandevuAl}
      options={{
        title: 'Randevu Al',
        headerShown: false,
      }}
    />
  </RandevuAlStack.Navigator>
);

//------------------------------------------------------

const Tabs = createBottomTabNavigator();

const Main = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#244161',
        paddingTop: 0,
        overflow: 'hidden',
      }}>
      <Tabs.Navigator
        tabBar={props => <MyTabBar {...props} />}
        name="TabNavigator"
        initialRouteName="Anasayfa"
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen
          name="AnasayfaTab"
          title="Anasayfa"
          icon="home"
          component={AnasayfaStackScreen}
          options={{title: 'Anasayfa'}}
        />

        <Tabs.Screen
          name="RandevuAlTab"
          butonsuz
          title="Randevu Al"
          component={RandevuAlStackScreen}
          options={{title: 'Randevu Al'}}
        />
      </Tabs.Navigator>
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator();
const DrawerScreen = ({navigation, route}) => (
  <Drawer.Navigator
    initialRouteName="Main"
    drawerContent={props => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        width: 250,
      },
    }}>
    <Drawer.Screen name="Main" component={Main} />
  </Drawer.Navigator>
);

function CustomDrawerContent(props) {
  const {state, dispatch} = useContext(Context);

  console.log(
    'CustomDrawerContent props',
    props.state.routes[0]?.state?.routeNames[
      props.state?.routes[0]?.state.index
    ],
  );

  let currentRoute =
    props.state.routes[0]?.state?.routeNames[
      props.state?.routes[0]?.state.index
    ];

  return (
    <Box style={{flex: 1}}>
      <Box flex={0.9} bgColor={'#30294D'}>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Image
            style={{width: 80, height: 80, borderRadius: 40}}
            source={
              state.staffInfo.profilResmi == null
                ? require('./res/Drawer/avatar2.png')
                : {
                    uri: 'data:image/png;base64,' + state.staffInfo.profilResmi,
                  }
            }
          />

          <Text style={{color: 'white', marginTop: 10}}>
            {state.staffInfo.adSoyad}
          </Text>
        </View>
        <View style={{height: 30}}></View>
      </Box>

      <Box
        flex={0.1}
        style={{justifyContent: 'flex-end', paddingBottom: 15}}
        bgColor={'#30294D'}>
        <TouchableOpacity
          onPress={async () => {
            await storeStringAS('telNo', '');

            let storeTelNo = await getStringAS('telNo');
            console.log('storeTelNo3', storeTelNo);

            dispatch({type: 'USER_NO'});
          }}
          style={{padding: 20, paddingTop: 12, paddingBottom: 12}}>
          <View
            style={{
              flexDirection: 'row',

              borderBottomWidth: 0.0,
            }}>
            <View style={{justifyContent: 'center'}}>
              <Image
                style={{width: 18, height: 18}}
                //  resizeMode={'center'}
                source={require('./res/Drawer/cikisYap.png')}
              />
            </View>
            <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Text style={{color: 'white'}}>Çıkış Yap</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{title: 'Giriş', headerShown: false}}
    />
  </AuthStack.Navigator>
);

const RootStack = createNativeStackNavigator();
const RootStackScreen = ({userOK}) => (
  <RootStack.Navigator screenOptions={{headerShown: false}}>
    {
      <RootStack.Screen
        name={userOK ? 'App' : 'Auth'}
        component={userOK ? DrawerScreen : AuthStackScreen}
        options={{
          animationEnabled: true,
        }}
      />
    }
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(false); // true

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Context.Provider value={{state, dispatch}}>
      <NavigationContainer>
        <RootStackScreen userOK={state.userOK} />
      </NavigationContainer>
    </Context.Provider>
  );
};
