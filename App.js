import React from 'react';
import {HomeStack} from './routes/HomeStack';
import {
  useFonts,
  NanumMyeongjo_400Regular,
  NanumMyeongjo_700Bold,
  NanumMyeongjo_800ExtraBold
} from '@expo-google-fonts/nanum-myeongjo'

export default function App() {
  let [fontsLoaded] = useFonts({
    NanumMyeongjo_400Regular,
    NanumMyeongjo_700Bold,
    NanumMyeongjo_800ExtraBold,
  });

  return (
      <HomeStack />
  );
}
