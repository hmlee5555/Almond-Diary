import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
    Pressable, StatusBar
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";


export default function Write({navigation}) {

    // hook으로 현재 textinput 내용 여기에 저장
    const [diary, setDiary] = useState(0);
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

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.top}>
                        <View style={{alignSelf: 'left', marginLeft: '10%',}}>
                            <Text style={styles.textquestion}>오늘 하루는 어땠나요...?</Text>
                        </View>
                        <TextInput
                            multiline={true}
                            style={styles.textInput}
                            onChangeText={text => setDiary(text)} // textinput의 내용 diary에 저장
                            placeholder="최대 200자"
                        />
                    </View>
                </TouchableWithoutFeedback>


                <View style={styles.bottom}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('명언 선택', {passedDiary: diary})
                        }}
                        style={({pressed}) => [
                            {backgroundColor: pressed ? '#2E535D' : '#254C48'},
                            styles.specialPressable,
                        ]}>
                        <View style={styles.specialInnerBorder}>
                            <Text style={styles.textButtonSpecial}>일기 저장하기</Text>
                        </View>
                    </Pressable>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '20%',
        marginBottom: '7%',
    },
    top: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        height: 70,
        borderRadius: 15,

        justifyContent: 'space-around',
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
    pressable: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    specialPressable: {
        width: '81%',
        height: '65%',
        margin: '5%',
        borderRadius: 13,
        justifyContent: 'space-around',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.49,
        elevation: 6,
    },
    specialInnerBorder:{
        width: '95%',
        height: '80%',
        margin: '5%',
        borderRadius: 7,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: '#f1d0b6',
        borderWidth: 2.5,
    },
    textInput: {
        height: '80%',
        width: '80%',
        padding: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f1d0b6',

        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6.49,
        elevation: 6,
    },
    textquestion: {
        color: '#F1D0B6',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'NanumMyeongjo_400Regular',
    },
    textButtonSpecial: {
        color: '#f1d0b6',
        fontSize: 20,
        fontFamily: 'NanumMyeongjo_700Bold',
    }

});
