import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/home';
import Write from '../screens/write';
import Cal from '../screens/calendar';
import ViewDiary from "../screens/viewdiary";
import LoadingScreen from "../screens/loading";


//react-navigation 설치함
const {Navigator,Screen} = createStackNavigator();
const HomeNavigator = () => (
    <Navigator headerMode="float">
        <Screen name="Home" component={Home} options={{
                headerShown: false
            }}/>
        <Screen name="일기 작성" component={Write} options={{
            headerTransparent: true,
            headerTintColor: '#CCABA0',
        }}/>
        <Screen name="달력" component={Cal} options={{
            headerTransparent: true,
            headerTintColor: '#CCABA0',
        }}/>
        <Screen name="일기 보기" component={ViewDiary} options={{
            headerTransparent: true,
            headerTintColor: '#CCABA0',
        }}/>
        <Screen name="명언 선택" component={LoadingScreen} options={{
            headerShown: false
        }}/>

    </Navigator>
);

//이 homestack이 app.js에서 사용됨
export const HomeStack = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);

