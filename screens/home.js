import React from 'react';
import {StyleSheet, Text, View,Button, SafeAreaView} from 'react-native';


export default function Home({ navigation }){

    return (
        <SafeAreaView>
            <Text>Home Screen</Text>
            <Button title='일기 쓰기' onPress={() => {
                navigation.navigate('Write')}} />
            <Button title='달력 보기' onPress={() => {
                navigation.navigate('Calendar')}} />
        </SafeAreaView>
    )
}
