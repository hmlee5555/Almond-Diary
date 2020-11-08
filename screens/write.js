import React from 'react';
import {StyleSheet, Text, TextInput, Button, Alert, View, SafeAreaView, Keyboard, TouchableWithoutFeedback} from 'react-native';

export default function Write() {
    return (

        <SafeAreaView style={{flex:1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex:8,
                    backgroundColor:'#eee',
                    alignItems: 'center',
                    justifyContent: 'center'}}>
                    <TextInput
                        multiline = {true}
                        style={styles.textInput}
                        //onChangeText={text => onChangeText(text)}
                        placeholder="Input Text here"
                    />
                </View>
            </TouchableWithoutFeedback>


            <View style={{flex:2, backgroundColor:'#eee', justifyContent: 'center'}}>

                <Button
                    title="일기 제출하기"
                    onPress={() => Alert.alert('Submit Button pressed')}
                />

            </View>

        </SafeAreaView>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput: {
        height: '90%',
        width: '80%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
