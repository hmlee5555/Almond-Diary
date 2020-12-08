import React from 'react';
import {StyleSheet, Text, View, StatusBar, SafeAreaView, Pressable, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';


export default function Home({navigation}) {

    return (

        <LinearGradient
            // Background Linear Gradient
            colors={['#193531', '#264F58']}
            // colors={['#623A41', '#B1827E']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: '100%',
            }}
        >
            <StatusBar barStyle={'light-content'}/>

            <SafeAreaView style={styles.container}>

                <View style={styles.top}>

                    <Text style={styles.logo1}>Al<Text style={styles.logo2}>mond Diary</Text></Text>

                </View>
                <View style={styles.bottom}>

                    <Pressable
                        onPress={() => {
                            navigation.navigate('일기 작성')
                        }}
                        style={({pressed}) => [
                            {backgroundColor: pressed ? '#bc9f8c' : '#F1D0B6'},
                            styles.button,
                        ]}>
                        <View style={styles.specialInnerBorder}>
                            <Image style={{
                                height: 43,
                                width: 43,
                                opacity: 0.9,
                            }}
                                   source={require('../assets/edit_green.png')}
                            />
                            <Text style={styles.buttontext}>일기 쓰기</Text>
                        </View>

                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('달력')
                        }}
                        style={({pressed}) => [
                            {backgroundColor: pressed ? '#bc9f8c' : '#F1D0B6'},
                            styles.button,
                        ]}>
                        <View style={styles.specialInnerBorder}>
                            <Image style={{
                                height: 43,
                                width: 43,
                                opacity: 0.9,
                            }}
                                   source={require('../assets/calendar_green.png')}
                            />
                            <Text style={styles.buttontext}>달력 보기</Text>
                        </View>
                    </Pressable>

                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: '7%',
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        height: '30%',
        margin: '5%',
        borderRadius: 5,

        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6.49,
        elevation: 6,
    },

    specialInnerBorder: {
        width: '95%',
        height: '87%',
        margin: '5%',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: '#254C48',
        borderWidth: 2.5,
    },
    buttontext: {
        color: '#254C48',
        fontSize: 20,
        fontWeight: '500',
        // fontFamily: 'NanumMyeongjo_700Bold',

        textShadowColor: 'rgba(0, 0, 0, 0.00)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    logo1: {
        color: '#F1D0B6',
        fontSize: 45,
        fontWeight: '700',
        textShadowColor: 'rgba(0, 0, 0, 0.150)',
        textShadowOffset: {width: 4, height: 3},
        textShadowRadius: 5
    },
    logo2: {
        color: '#CCABA0',
    },
});