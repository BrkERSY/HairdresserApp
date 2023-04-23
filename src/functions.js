import AsyncStorage from '@react-native-async-storage/async-storage';

export const gR = async url => {
  const ApiUrl = url;
  try {
    const data = await fetch(ApiUrl, {
      method: 'GET',
      headers: {},
    }).then(resp => resp.json());
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const pR = async (body, url) => {
  console.log('pR');

  const ApiUrl = url;
  try {
    const data = await fetch(ApiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(resp => resp.json());
    return data;
  } catch (error) {
    console.log('pRF hata oluştu:', error);
    return false;
  }
};

export const storeStringAS = async (key, value) => {
  try {
    await AsyncStorage.setItem('@' + key, value);
  } catch (e) {}
};

export const currencyFormat = num => {
  const sonuc = Number.parseFloat(num).toLocaleString(
    'tr-TR',
    {
      currency: 'TRY',
      style: 'currency',
    } || 0,
  );

  return sonuc;
};

export const getStringAS = async key => {
  try {
    const value = await AsyncStorage.getItem('@' + key);
    if (value !== null) {
    }
    return value;
  } catch (e) {}
};
