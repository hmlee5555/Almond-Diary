import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image, StatusBar} from 'react-native';
import axios from "axios";
import {LinearGradient} from "expo-linear-gradient";


export default class ViewDiary extends React.Component {

    state = {
        diary: '',
        saying: '',
        author: '',
    }

    async componentDidMount(){
        const dateStr = this.props.route.params.passedDateStr; // '2020-11-28'
        //get보낼 url주소
        const url = "http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/diary/" + dateStr
        console.log(url)

        axios.get(url)
            .then((response) => {
                console.log(response)
                let newDiary = response.data[0].content //저장된 일기
                let newSaying = response.data[0].saying_content
                let newAuthor = response.data[0].saying_author// 홍선이가 저자도 줘야함
                console.log(newSaying)

                this.setState(prevState => ({
                    diary: prevState.diary = newDiary,
                    saying: prevState.saying = newSaying,
                    author: prevState.author = newAuthor,
                }))
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    renderSaying(){
        if (this.state.saying != null){
            return (
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.textsaying}>
                        {this.state.saying}
                    </Text>
                    <Text style={styles.textauthor}>
                        {this.state.author}
                    </Text>
                </View>
            );
        }else{
            return(
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.textauthor}>
                        저장된 명언이 없습니다.
                    </Text>
                </View>
            );
        }
    }

    render(){
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
                        <Image style={{
                            height: 70,
                            width: 70,
                            margin: '5%',
                            opacity: 0.9,
                        }}
                               source={require('../assets/almond.png')}
                        />
                        <Text style={styles.textsaying}>{this.props.route.params.passedDateStr}의 일기</Text>
                    </View>

                    <View style={styles.bottom}>
                        <Text style={styles.textdiary}>
                            {this.state.diary}
                        </Text>
                        <View style={{alignItems: 'center'}}>
                            {this.renderSaying()}
                        </View>

                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '20%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    top: {
        flex: 1,
        alignItems: 'center',
    },
    bottom: {
        flex: 5,
        marginHorizontal: '7%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    textdiary: {
        color: '#F1D0B6',
        fontSize: 20,
        fontWeight: '600',
    },
    textsaying: {
        color: '#CCABA0',
        fontSize: 22,
        fontWeight: '200',
        fontFamily: 'NanumMyeongjo_400Regular',
        textAlign: 'center',

    },
    textauthor: {
        marginTop: 23,
        color: '#CCABA0',
        fontSize: 17,
        fontFamily: 'NanumMyeongjo_400Regular',
        textAlign: 'center',

    },


});
