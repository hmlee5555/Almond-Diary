import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    SafeAreaView,
    Pressable, StatusBar
} from 'react-native';
import axios from "axios";
import {LinearGradient} from "expo-linear-gradient";


export default class LoadingScreen extends React.Component {

    state = {
        datestr: '',
        current_index: 0, // sayingArr에서 표시할 것 index. 다음/이전 버튼 누르면 바뀜
        index_limit: 2,
        reached_three: false,
        reached_six: false,
        idArr: [-1, -1, -1, -1, -1, -1],
        sayingArr: ['로딩중...', '명언2', '명언3','명언4', '명언5', '명언6'],
        authorArr: ['격언을 가져오는 중입니다', '저자2', '저자3','저자4', '저자5', '저자6'],
        loaded: false,
    }

    async componentDidMount() {
        const diary = this.props.route.params.passedDiary; // 넘겨받은 일기

        //datestr 생성, 저장
        let today = new Date()
        let year = today.getFullYear().toString()
        let month = (today.getMonth() + 1).toString()
        let day = today.getDate().toString()
        if (month.length == 1) {
            month = '0' + month
        }
        if (day.length == 1) {
            day = '0' + day
        }
        const datestr = year + '-' + month + '-' + day
        this.setState({
            datestr: datestr,
        });

        console.log(datestr)

        axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/create_diary", {
            date: datestr,
            content: diary,
        })
            .then((response) => {
                console.log(response.data);
                let newAuthorArr = []
                let newIdArr = []
                let newSayingArr = []
                for (const i in response.data) {
                    newIdArr.push(response.data[i].saying_id)
                    newAuthorArr.push(response.data[i].saying_author)
                    newSayingArr.push(response.data[i].saying_content)
                }
                this.setState({
                    idArr: newIdArr,
                    sayingArr: newSayingArr,
                    authorArr: newAuthorArr,
                    loaded: true,
                });

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    //'이전'버튼
    renderLeftButton() {
        if (this.state.current_index != 0) {
            return (
                <Pressable
                    onPress={() => {
                        this.setState({current_index: this.state.current_index - 1,});
                    }}
                    style={({pressed}) => [
                        {backgroundColor: pressed ? '#b39d88' : '#f1d0b6',},
                        styles.pressable,
                    ]}>
                    <Text style={styles.textauthor}>이전 명언</Text>
                </Pressable>
            );
        } else {
            return (
                <View style={styles.pressabledisabled}>
                    <Text style={styles.textauthor}>이전 명언</Text>
                </View>
            );
        }
    }

    //'다음'버튼
    renderRightButton() {
        if (this.state.current_index != this.state.index_limit && this.state.loaded) {
            return (
                <Pressable
                    onPress={() => {
                        const newindex = this.state.current_index + 1;
                        this.setState({current_index: newindex});
                        if (!this.state.reached_three && newindex == 2){
                            this.setState({reached_three: true});
                        }
                        if (!this.state.reached_six && newindex == 5){
                            this.setState({reached_six: true});
                        }
                    }}
                    style={({pressed}) => [
                        {backgroundColor: pressed ? '#b39d88' : '#f1d0b6',},
                        styles.pressable,
                    ]}>
                    <Text style={styles.textauthor}>다음 명언</Text>
                </Pressable>
            );
        } else {
            return (
                <View style={styles.pressabledisabled}>
                    <Text style={styles.textauthor}>다음 명언</Text>
                </View>
            );
        }
    }

    saveSaying(){
        console.log('date: ' + this.state.datestr)
        console.log('saying_id: ' + this.state.idArr)

        axios.all([
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[0],
                pass: ((this.state.current_index == 0) ? 1 : 0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[1],
                pass: ((this.state.current_index == 1) ? 1 : 0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[2],
                pass: ((this.state.current_index == 2) ? 1 : 0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[3],
                pass: ((this.state.current_index == 3) ? 1 : 0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[4],
                pass: ((this.state.current_index == 4) ? 1 : 0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[5],
                pass: ((this.state.current_index == 5) ? 1 : 0),
            })
        ])
            .then(axios.spread((...responses) => {
                // output of req.
                console.log(responses[0])
                console.log(responses[1])
                console.log(responses[2])
                console.log(responses[3])
                console.log(responses[4])
                console.log(responses[5])
            }))
            .catch(function (error) {
                console.log(error);
            });

        this.props.navigation.navigate('Home')
    }

    dontSave(){
        console.log('date: ' + this.state.datestr)
        console.log('saying_id: ' + this.state.idArr)

        axios.all([
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[0],
                pass: (0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[1],
                pass: (0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[2],
                pass: (0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[3],
                pass: (0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[4],
                pass: (0),
            }),
            axios.post("http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/rating", {
                date: this.state.datestr,
                saying_id: this.state.idArr[5],
                pass: (0),
            })
        ])
            .then(axios.spread((...responses) => {
                // output of req.
                console.log(responses[0])
                console.log(responses[1])
                console.log(responses[2])
                console.log(responses[3])
                console.log(responses[4])
                console.log(responses[5])
            }))
            .catch(function (error) {
                console.log(error);
            });

        this.props.navigation.navigate('Home')
    }

    renderLoadMoreButton() {
        if (this.state.index_limit == 2 && this.state.reached_three) {
            return (
                <Pressable
                    onPress={() => {
                        this.setState({
                            index_limit: 5,
                            current_index: 3,
                        });
                    }}
                    style={({pressed}) => [
                        {backgroundColor: pressed ? '#2E535D' : '#254C48'},
                        styles.pressableMore,
                    ]}>
                    <Text style={styles.textButtonMore}>명언 더 받기</Text>
                </Pressable>
            );
        }else if(this.state.index_limit == 5 && this.state.reached_six){

            return(
                <Pressable
                    onPress={() => {
                        this.dontSave()
                    }}
                    style={({pressed}) => [
                        {backgroundColor: pressed ? '#2E535D' : '#254C48'},
                        styles.pressableMore,
                    ]}>
                    <Text style={styles.textButtonMore}>저장하지 않고 나가기</Text>
                </Pressable>
            );
        }
    }
    renderSaveButton() {
        if (this.state.loaded) {
            return (
                <Pressable
                    onPress={() => {
                        this.saveSaying()
                    }}
                    style={({pressed}) => [
                        {backgroundColor: pressed ? '#2E535D' : '#254C48'},
                        styles.specialPressable,
                    ]}>
                    <View style={styles.specialInnerBorder}>
                        <Text style={styles.textButtonSpecial}>이 명언을 일기와 함께 저장</Text>
                    </View>
                </Pressable>
            );
        }else{

            // return(
            //
            // );
        }
    }



    render() {
        return (
            <LinearGradient
                // Background Linear Gradient
                colors={['#193531', '#264f58']}
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
                        <View style={styles.loading}>
                            <Image style={{
                                height: 80,
                                width: 80,
                                opacity: 0.9,
                            }}
                                   source={require('../assets/almond.png')}
                            />
                            <View>
                                <Text style={styles.textquestion}>가장 마음에 드는 명언을 선택해 주세요.</Text>
                                <Text style={styles.textquestion}>선택된 명언은 일기와 함께 저장됩니다.</Text>
                            </View>
                        </View>
                        <View style={styles.sayingContainer}>
                            <Text style={styles.textsaying}>{this.state.sayingArr[this.state.current_index]}</Text>
                            <Text style={styles.textauthor}>{this.state.authorArr[this.state.current_index]}</Text>
                        </View>
                    </View>


                    <View style={styles.bottom}>
                        <View style={styles.buttonContainer}>
                            {/*이전버튼 */}
                            {this.renderLeftButton()}
                            {/*다음버튼 */}
                            {this.renderRightButton()}
                        </View>
                        <View style={styles.buttonContainer}>
                            {this.renderLoadMoreButton()}
                        </View>
                        <View style={styles.buttonContainer}>

                            {/*저장하기 버튼 */}
                            {this.renderSaveButton()}
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
        // marginTop: '20%',
        marginBottom: '7%',
    },
    top: {
        flex: 4,
    },
    bottom: {
        flex: 3,
        alignItems: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    sayingContainer: {
        flex: 1,
        margin: '3%',
        paddingHorizontal: '5%',
        borderRadius: 10,
        backgroundColor: '#f1d0b6',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    buttonContainer: {
        flex: 1,
        margin: '3%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    pressable: {
        width: '45%',
        height: '70%',
        marginHorizontal: '5%',
        borderRadius: 15,
        justifyContent: 'space-around',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.49,
        elevation: 6,
    },
    pressabledisabled: {
        width: '45%',
        height: '70%',
        marginHorizontal: '5%',
        borderRadius: 15,
        backgroundColor: '#264F58',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    pressableMore: {
        // width: '45%',
        // height: '70%',
        padding: '5%',
        borderRadius: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    specialPressable: {
        width: '90%',
        height: '83%',
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
    textquestion: {
        color: '#d2b7a4',
        fontSize: 20,
        fontWeight: '300',
    },
    textsaying: {
        color: '#16322B',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'NanumMyeongjo_700Bold',
    },
    textauthor: {
        color: '#16322B',
        fontSize: 15,
        fontFamily: 'NanumMyeongjo_700Bold',
    },
    textButtonMore: {
        color: '#a59a8d',
        fontSize: 18,
        fontFamily: 'NanumMyeongjo_700Bold',
    },
    textButtonSpecial: {
        color: '#f1d0b6',
        fontSize: 20,
        fontFamily: 'NanumMyeongjo_700Bold',
    }

});
