import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet,Image } from 'react-native';
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt, faSignOutAlt, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment'
export default function SingleEvent(props) {

    return (
        <Content>
           
            {
                props.allEvents.map((singleEvent, index) => {

                    return (

                        <List key={index}>
                            <ListItem selected >
                                <Left>
                                    <View >

                                        <View style={styles.view}>

                                            <Image style={styles.image} source={singleEvent.image} />
                                          
                                            <View style={styles.titleView}>
                                                {
                                                    props.featuredEvent &&
                                                    <Text style={styles.featuredEvent}>Reccomended For You! </Text>
                                                }
                                                
                                                <Label style={styles.title}>{singleEvent.title}</Label>
                                                <Text style={styles.dateTime}>
                                                    {moment(singleEvent.startTime.dateTime).format("Do MMM")},
                                                    {moment(singleEvent.startTime.dateTime).format(' h:mma ')}to
                                                    {moment(singleEvent.endTime.dateTime).format(' h:mma')}
                                                </Text>
                                               
                                            </View>


                                        </View>


                                        <View style={styles.description}>

                                      

                                            <Text style={styles.summary}>{singleEvent.summary}</Text>
                                            <View style={styles.opinion}>
                                                <Button
                                                    style={ singleEvent["userOpinion"] == "brave" ? styles.PressbraveButton : styles.braveButton}
                                                    onPress={() => { 
                                                     props.handleOpinion(singleEvent,"brave"); 
                                                     props.changeValue(props.featuredEvent,"userOpinion","brave",index)
                                                     }}
                                                >
                                                    <Text style={styles.BraveText}>Brave</Text>
                                                </Button>
                                                <Button
                                                    style={singleEvent["userOpinion"]  == "ambitious" ? styles.PressAmbitiousButton : styles.AmbitiousButton}
                                                    onPress={() => { 
                                                        props.handleOpinion(singleEvent,"ambitious")
                                                        props.changeValue(props.featuredEvent,"userOpinion","ambitious",index)
                                                     }}
                                                >
                                                    <Text style={styles.AmbitiousText}>Ambitious</Text>
                                                </Button>

                                            </View>
                                            <View style={styles.status}>
                                                <Button transparent style={styles.likeButton}onPress={() => {
                                                        props.changeValue(props.featuredEvent,"liked","like",index)
                                                        // props.chooseIndex(singleEvent,index,"like")
                                                    }}>
                                                    <FontAwesomeIcon icon={faThumbsUp} style={singleEvent['liked'] == "like" ?styles.Presslike:styles.like} size={26} />

                                                </Button>
                                                <Button transparent style={styles.dislikeButton}onPress={() => {
                                                        props.changeValue(props.featuredEvent,"liked","dislike",index)
                                                        //  this.chooseIndex(singleEvent,index)

                                                    }}>
                                                    <FontAwesomeIcon icon={faThumbsDown} style={ singleEvent['liked']== "dislike" ?styles.Pressdislike:styles.dislike} size={26} />

                                                </Button>

                                            </View>


                                        </View>
                                    </View>
                                </Left>


                                <Right>
                                    {singleEvent.iconshow == true &&
                                        <Button transparent style={styles.calendarButton}
                                            onPress={() => {
                                                props.handleCreateEvent(singleEvent),
                                                props.changeIcon(index, singleEvent)


                                            }} >
                                            <FontAwesomeIcon icon={faCalendarPlus} style={styles.Calendaricon} size={38} />


                                        </Button>}
                                        {singleEvent.iconshow == false &&
                                        <FontAwesomeIcon icon={faCalendarCheck} style={styles.CalendarCheckIocn} size={40} />

                                    }
                                </Right>

                            </ListItem>
                            <View style={styles.divider} />

                        </List>

                    )
                })
            }
        </Content>
    )
}
const styles = StyleSheet.create({
    HeaderButton:{ marginTop: 10, width: 100, marginLeft: 250 },
    signIn:{ marginTop: 15, marginLeft: 250 },
    loginicon:{ color: 'white', marginTop: 5 },
    loginText:{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5 },
    logoutIcon:{ color: 'white', marginTop: 5, marginLeft: 10 },
    logoutText:{ fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5, fontSize: 20, marginRight: 10 },
    text:{ fontSize: 20, fontWeight: "bold" },
   // listView CSS
    image: {
        resizeMode: "cover",
        height: 120,
        width: 100,
        marginTop: 10
    },
    view:{ flexDirection: 'row' },
    titleView:{ flexDirection: 'column', marginLeft: 10, marginTop: 16 },
    title:{ color: "red", fontWeight: 'bold', fontSize: 20, width: 220 },
    dateTime:{ color: "red", fontSize: 18 },
    description:{ flexDirection: "column" },
    summary:{ color: "black", marginTop: 10, fontSize: 16, width: 350 },
    opinion:{ flexDirection: 'row', marginTop: 10 },
    braveButton: { width: "30%", backgroundColor: "#dd9d2b", marginRight: 20 },
    PressbraveButton: { width: "30%", backgroundColor: "#dd9d2b", borderColor: 'grey', marginRight: 20, borderWidth: 3 },
    BraveText:{ color: 'white', margin: 24, fontSize: 18 },
    AmbitiousButton: { width: "36%", backgroundColor: "#2f96e3" },
    PressAmbitiousButton: { width: "36%", backgroundColor: "#2f96e3", borderColor: 'grey', borderWidth: 3 },
    AmbitiousText:{ color: 'white', margin: 18, fontSize: 18 },
    status:{ flexDirection: 'row', marginTop: 10 },
    likeButton:{ marginLeft: 30 },
    dislikeButton:{ marginLeft: 80 },
    like: { color: '#D3D3D3' },
    Presslike: { color: 'black' },
    dislike: { color: '#D3D3D3', marginTop: 10 },
    Pressdislike: { color: 'black', marginTop: 10 },
    Calendaricon:{ color: '#00008b', marginLeft: 20 },
    calendarButton:{ width: 50, marginBottom: 300 },
    CalendarCheckIocn:{ color: '#3ddc84', marginBottom: 300, marginLeft: 25 },
    divider: {
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
        width: "95%",
        alignSelf: "center",
        opacity: 0.6

    },
    featuredEvent:{
        color: "green",
        fontWeight:"bold"
    }

});
