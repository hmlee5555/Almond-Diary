import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Pressable, Image, StatusBar} from 'react-native';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';
import {LinearGradient} from "expo-linear-gradient";

export default class Cal extends React.Component {
    state = {
        current_date: '로드 전',    // 현재 선택된 날짜 selected표시 위함
        current_year: new Date().getFullYear(),
        current_month: new Date().getMonth() + 1,     //POST용 현재 month

        diary_exists: 0,    //현재 날짜 일기 존재하는지
        diary_dates: [],    //일기 있는 날짜 array(int) ex) [9,17,18,19]

        //react-native-calendars dot marking 날짜들
        markedDates: {}
    }


    async componentDidMount() {
        //url로 보낼 str 생성
        let year = this.state.current_year.toString()
        let month = this.state.current_month.toString()
        if (month.length == 1) {
            month = '0' + month // '9' 같은것들 '09'로 교체
        }
        const url = 'http://ec2-52-79-106-55.ap-northeast-2.compute.amazonaws.com:3000/api/diary?year=' + year + '&month=' + month // 최종 url(나중에 교체)
        //console.log(url)

        axios.get(url)
            .then((response) => {

                let tempMarkedDates = [] // '2020-11-24'의 형태 만들기 위해 생성
                let newDiaryDates = []  // diary_dates대체용: int값 저장

                for (const i in response.data) {
                    tempMarkedDates.push(response.data[i].day)
                }
                console.log(month + '월에 조회된 날짜들: ' + tempMarkedDates) // 'day'로 조회하면 됨.

                let datePrefix = year + '-' + month // ex) '2020-11'

                // datestring 생성 및 newDiaryDates init
                for (const i in tempMarkedDates) {
                    newDiaryDates.push(parseInt(tempMarkedDates[i])) // newDiaryDates init (int값 날짜들)
                    if (tempMarkedDates[i]<10) {// 만약 date가 한글자라면? ex)'9'
                        tempMarkedDates[i] = datePrefix + '-0' + tempMarkedDates[i]
                    } else {
                        tempMarkedDates[i] = datePrefix + '-' + tempMarkedDates[i]
                    }
                }
                //console.log(tempMarkedDates)

                // dot marking 설정
                let newMarkedDates = {}
                for (const i in tempMarkedDates) {
                    newMarkedDates[tempMarkedDates[i]] = {marked: true}
                }

                //현재 state에 반영
                this.setState(prevState => ({
                    diary_dates: prevState.diary_dates = newDiaryDates,
                    markedDates: prevState.markedDates = newMarkedDates,
                }))

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    //날짜 누를때마다 실행
    daySelected(day) {

        // console.log('selected day', day)

        // 선택된 날짜가 diary_dates에 존재하는지 확인
        let new_diary_exits = 0
        if (this.state.diary_dates.includes(day.day)) {
            new_diary_exits = 1 //있다면 1로 설정
        }

        this.setState({
            current_date: day.dateString,   //현재 날짜 hightlight하시 위해 업뎃
            diary_exists: new_diary_exits,  // 현재 날짜 일기 존재 여부 업뎃
        });
    }


    renderButton() {
        if (this.state.diary_exists == 0) {
            return (
                <View style={styles.bottom}>
                    <Text style={styles.textsaying}>일기가 있는 날을 선택해 주세요.</Text>
                </View>
            );
        }else{
            return (
                <View style={styles.bottom}>
                    <Pressable
                        onPress={() => {
                            this.props.navigation.navigate('일기 보기', {passedDateStr: this.state.current_date})
                        }}
                        style={({pressed}) => [
                            {backgroundColor: pressed ? '#bc9f8c' : '#F1D0B6'},
                            styles.button,
                        ]}>
                        <Image style={{
                            height: 50,
                            width: 50,
                            marginVertical: '6%',
                            opacity: 0.9,
                        }}
                               source={require('../assets/almondicon_green.png')}
                        />
                        <Text style={styles.buttontext}>일기 보기</Text>
                    </Pressable>

                </View>
            );
        }
    }

    render() {
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

                    <Calendar
                        theme={{
                            calendarBackground: 'rgba(0, 0, 0, 0)',
                            textSectionTitleColor: '#F1D0B6',
                            // textSectionTitleDisabledColor: '#d9c8c3',
                            selectedDayBackgroundColor: '#CCABA0',
                            selectedDayTextColor: '#16322b',
                            todayTextColor: '#5fffe7',
                            dayTextColor: '#CCABA0',
                            textDisabledColor: '#5f8579',
                            dotColor: '#F1D0B6',
                            selectedDotColor: '#ffffff',
                            arrowColor: '#F1D0B6',
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: '#F1D0B6',
                            // indicatorColor: '#F1D0B6',
                            textDayFontWeight: '600',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',

                        }}
                        // Initially visible month. Default = Date()
                        current={Date()}
                        // Handler which gets executed on day press.
                        onDayPress={(day) => {
                            this.daySelected(day)
                        }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy년 MM월'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => {
                            //console.log('month changed', month)
                            this.state.current_month = month.month
                            this.state.current_year = month.year
                            this.componentDidMount() // month바귈때마다 get요청 -> 달력리스트 받
                        }}
                        // Enable the option to swipe between months. Default = false
                        enableSwipeMonths={true}
                        markedDates={{
                            ...this.state.markedDates, // dot marking
                            [this.state.current_date]: {selected: true, disableTouchEvent: true} // 현재 date selected표
                        }}
                    />

                    {this.renderButton()}

                </SafeAreaView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '20%',
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        width: '80%',
        margin: '5%',
        borderRadius: 5,

        flexDirection: 'row',
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

    buttontext: {
        color: '#254C48',
        fontSize: 23,
        fontWeight: '900',
        fontFamily: 'NanumMyeongjo_700Bold',

        textShadowColor: 'rgba(0, 0, 0, 0.00)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    textsaying: {
        color: '#CCABA0',
        fontSize: 20,
        fontWeight: '200',
        fontFamily: 'NanumMyeongjo_400Regular',

    }

});