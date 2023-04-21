import AsyncStorage from '@react-native-async-storage/async-storage';

export const pR = async (body, url) => {
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
    console.log(error);
    return false;
  }
};

export const gR = async (url, token) => {
  const ApiUrl = url;
  try {
    const data = await fetch(ApiUrl, {
      method: 'GET',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    }).then(resp => resp.json());
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const pRF = async (body, url, token, mp = false, method = 'POST') => {
  const ApiUrl = url;
  const headers = {
    Authorization: token ? `Bearer ${token}` : '',
  };

  if (mp) {
    //headers['Content-Type'] = 'multipart/form-data';
  }
  try {
    const data = await fetch(ApiUrl, {
      method: method,
      headers,
      body: body,
    }).then(resp => resp.json());
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const storeStringAS = async (key, value) => {
  try {
    await AsyncStorage.setItem('@' + key, value);
  } catch (e) {
    // saving error
  }
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

  let sonuc2 = sonuc.split('₺');

  return sonuc2[1];
};

export const getStringAS = async key => {
  try {
    const value = await AsyncStorage.getItem('@' + key);
    if (value !== null) {
      // value previously stored
    }
    return value;
  } catch (e) {
    // error reading value
  }
};
