import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator } from "@react-navigation/stack";
import {createAppContainer} from "react-navigation";
import Home from '../screens/home';
import Write from '../screens/write';
import Cal from '../screens/calendar';
import ViewDiary from "../screens/viewdiary";

//react-navigation 설치함
const {Navigator,Screen} = createStackNavigator();

const HomeNavigator = () => (
    <Navigator headerMode="float">
        <Screen name="Home" component={Home} />
        <Screen name="Write" component={Write} />
        <Screen name="Calendar" component={Cal} />
        <Screen name="ViewDiary" component={ViewDiary}/>

    </Navigator>
);

//이 homestack이 app.js에서 사용됨
export const HomeStack = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);
