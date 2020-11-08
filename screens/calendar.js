import React from 'react';
import {StyleSheet, Text, View,FlatList,TouchableHighlight, SafeAreaView} from 'react-native';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';


export default class Cal extends React.Component{
    state = {
        dataList: [],
        current_date: '로드 전',    // 현재 선택된 날짜 selected표시 위함
        markedDates: {          //dot marking 날짜들 : 나중에 일기 있는 날짜만 setstate로 업뎃
            '2020-11-16': {marked: true},
            '2020-11-17': {marked: true},
            '2020-11-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2020-11-19': {disabled: true, disableTouchEvent: true}
        }
    }

    //예전에 데이터 보여쥴려고 하던거
    // showDataList() {
    //     return (
    //         <View>
    //             <Text>Calendar2</Text>
    //
    //             {/*{console.log("Asdfdsafa")}*/}
    //             {/*{console.log(jsonList)}*/}
    //             {/*{console.log(this.state.dataList)}*/}
    //
    //             {this.state.dataList.map(detail => {
    //                 return (<Text>{detail.title}</Text>);
    //             })}
    //
    //         </View>
    //     );
    // }

    async componentDidMount(){
        axios.get("http://crudsanic-prod.eba-crxahffp.ap-northeast-2.elasticbeanstalk.com/api/v1/posts?categoryId=1")
            .then((response) => {
            this.setState(prevState => ({
                dataList: prevState.dataList = response.data.posts
            }))
        });
    }

    //날짜 누를때마다 실행
    daySelected(day){
        {console.log('selected day', day)}

        this.setState({
            current_date: day.dateString    //현재 날짜 hightlight하시 위해 업뎃
        });
    }

    // flatlist 사이사이 separator 표시
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>

                <Calendar
                    // Initially visible month. Default = Date()
                    current={Date()}
                    // Handler which gets executed on day press.
                    onDayPress={(day) => this.daySelected(day)}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy년 MM월'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={true}
                    markedDates={{
                        ...this.state.markedDates, // dot marking
                        [this.state.current_date]: {selected: true, disableTouchEvent: true} // 현재 date selected표
                    }}
                />

                {/*예전에 데이터 get보여줄려고 하던거*/}
                {/*{this.showDataList(this.state.dataList)}*/}



                <FlatList style={styles.liststyle}
                    data={this.state.dataList}  //get으로 불러온 데이터

                    //flatList 맨 위/맨 아래 표시할것
                    ListHeaderComponent={<Text>{this.state.current_date}</Text>}
                    ListFooterComponent={<></>}

                    renderItem={({item, index, separators}) => (
                        <TouchableHighlight
                            //각 list element 클릭 시 viewDiary 페이지로 이동
                            onPress={() => {
                                this.props.navigation.navigate('ViewDiary')
                            }}
                            //누르면 하얀색뜸
                            underlayColor='white'
                        >

                            <View style={styles.diaryelement}>
                                {/*불러온 list의 각 title 표시 */}
                                <Text>제목: {item.title}</Text>
                                <Text>내용: {item.content}</Text>
                                <Text>생성 시각: {item.created_at}</Text>


                            </View>

                        </TouchableHighlight>
                    )}
                          // 각 element 사이사이 separartor 표시
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    // FlatList 스타일
    liststyle: {
      backgroundColor: '#EEFFFF'
    },

    //각 list element
    diaryelement: {
        margin: 10,
    }

});