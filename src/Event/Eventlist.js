import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';
import { event, newEvents  } from '../../sample/data/Event'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt, faSignOutAlt, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { listCalendar, createEvent, listEvents, createCalendar } from '../calendar/google-calendar.api'
import { configureGoogleSignIn, getCurrentUser, signIn, signOut } from '../calendar/google-auth'
import moment from 'moment'
import {getTagFrequencyTable, recommendEvents} from '../RuleEngine/api-rule-engine'
import EventCategory from './EventCategory'
export default class extends React.Component {
    state = {
        loggedIn: false,
        accessToken: '',
        opinion:'',
        type: '',
        indexValue:'',
        like:false,

        allEvents:[],
        featuredEvents:[] ,
        userProfile: {
            userId: 1,
            eventsAddedToCalendar: [  
            //   { 
            //     eventId: 1,
            //     opinion:[ 'brave' ],
            //     liked: true
            //   },
            //   {
            //     eventId:3,
            //     opinion:["brave", "ambitious"],
            //     liked: true
            //   }
            ]
          }
    }
    componentDidMount = async () => {
        configureGoogleSignIn()
        let response = await getCurrentUser();
        if (response.success) {
            let table= getTagFrequencyTable(this.state.userProfile)
            //alert(JSON.stringify(table))
            console.log(table)
            this.setState({ accessToken: response.success.accessToken, loggedIn: true,  allEvents: event},()=>{
                const  allEvents= this.state.allEvents
                allEvents.map((event)=>{
                    event['liked']=null,
                    event['userOpinion']= null
                })
            })
        }
        else {
            this.setState({ loggedIn: false })
        }
    }
    handleSignOut = async () => {
        let response = await signOut()
        if (response.success) {
            this.setState({ loggedIn: false })
        }
    }

    handleSignIn = async () => {
        let response = await signIn()
        if (response.success) {
            this.setState({ loggedIn: true, accessToken: response.success.accessToken })
        }
    }
    handleCreateEvent = async (singleEvent) => {
        const { accessToken } = this.state
        const calendarId = "9jafcfgfbo0vj1p38sr0utpd5g@group.calendar.google.com"//add you calendarId
        const event = {
            'summary': singleEvent.title,
            "end": singleEvent.endTime,
            "start": singleEvent.startTime,
            'description': singleEvent.summary
        }
        let result = await createEvent(accessToken, calendarId, event)
        console.log("Event response ", result)
    }
    changeIcon = (index, singleEvent) => { //change  calendar icon
        event.map((e, i) => {
            if (index == i) {
                singleEvent.iconshow = false
                this.setState({ singleEvent })
            }
        })
    }
    chooseIndex = (singleEvent, index) => {
       
        event.map((e, i) => {
            if (index == i) {
                singleEvent.status = true
                this.setState({ singleEvent })
               
               
            }
        })

    }

    changeValue = (featuredEvent,params, value,index) => {//like or dislike
        let  events=[]
        if(featuredEvent)
        {
            events=  this.state.featuredEvents
            events[index][params]=value
            this.setState({featuredEvents: events})  
        }
        else 
        {
            events=  this.state.allEvents
            events[index][params]=value
            this.setState({allEvents: events})  
        }

    }

    handleOpinion=(singleEvent, userOpinion)=>{
        const {state}= this
        const eventInfo={
            eventId: singleEvent['eventId'],
            opinion:[ userOpinion],
            liked: true
          }
       const userProfile= state.userProfile
       const featuredEvent= state.featuredEvents
   //    featuredEvent.push(singleEvent)
       userProfile['eventsAddedToCalendar'].push(eventInfo)
       this.setState({userProfile:userProfile},()=>{
       console.log( this.state.userProfile['eventsAddedToCalendar']  )
       let tagWithProbability= getTagFrequencyTable(this.state.userProfile)
       const featuredEvents= recommendEvents(newEvents, tagWithProbability)
       this.setState({featuredEvents:featuredEvents})
       console.log("featuredEvent", featuredEvents)
      // alert(JSON.stringify(tagWithProbability))
    })

    }

    render() {
        const {state}= this
        return (
            <Container>
                <Content>
                    <Header>
                        {
                            this.state.loggedIn == false ?
                                <View >
                                    <TouchableOpacity
                                        style={styles.signIn}
                                        onPress={() => { this.handleSignIn() }} >
                                        <View style={styles.view}>
                                            <FontAwesomeIcon icon={faSignInAlt} style={styles.loginicon} size={20} />

                                            <Text style={styles.loginText}>Login</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.HeaderButton} >
                                    <TouchableOpacity
                                        onPress={() => { this.handleSignOut() }}
                                    >
                                        <View style={styles.view}>
                                            <FontAwesomeIcon icon={faSignOutAlt} style={styles.logoutIcon} size={20} />

                                            <Text style={styles.logoutText}>Logout</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                        }


                    </Header>
                    {
                        this.state.loggedIn == false ?
                            <View>
                                <Text style={styles.text}>You need to LogIn</Text>
                            </View>
                            :
                            <View>

                            </View>
                    }


                    {this.state.loggedIn &&
                     <>
                     <EventCategory  featuredEvent={true}  allEvents={state.featuredEvents }  handleOpinion={ this.handleOpinion} handleCreateEvent={this.handleCreateEvent}  changeIcon={this.changeIcon}  chooseIndex ={this.chooseIndex} opinion={this.state.opinion} type ={this.state.type}  changeValue ={this.changeValue} />
                     <EventCategory  featuredEvent={false} allEvents={state.allEvents }  handleOpinion={ this.handleOpinion} handleCreateEvent={this.handleCreateEvent}  changeIcon={this.changeIcon} chooseIndex ={this.chooseIndex} opinion={this.state.opinion} type ={this.state.type}  changeValue ={this.changeValue}  />
                     </> 
                    }

                </Content>
            </Container>
        )
    }


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

});