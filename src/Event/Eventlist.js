import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';
import { event,newEvents } from '../../sample/data/Event'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { listCalendar, createEvent, listEvents, createCalendar } from '../calendar/google-calendar.api'
import { configureGoogleSignIn, getCurrentUser, signIn, signOut } from '../calendar/google-auth'
import moment from 'moment'
import {getTagFrequencyTable, recommendEvents} from '../RuleEngine/api-rule-engine'
import EventCategory from './EventCategory'
export default class extends React.Component {
    state = {
        loggedIn: false,
        accessToken: '',
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
            //   // alert(JSON.stringify(table))
               console.log(table)
            this.setState({ accessToken: response.success.accessToken, loggedIn: true,  allEvents: event})
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
    removelist = (singleEvent, index) => { //remove  event from list
        console.log("removelist", singleEvent)
        event.splice(index, 1)
        this.setState({ event })
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
       alert(JSON.stringify(tagWithProbability))
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
                                        style={{ marginTop: 15, marginLeft: 250 }}
                                        onPress={() => { this.handleSignIn() }} >
                                        <View style={{ flexDirection: 'row' }}>
                                            <FontAwesomeIcon icon={faSignInAlt} style={{ color: 'white', marginTop: 5 }} size={20} />

                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5 }}>Login</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ marginTop: 10, width: 100, marginLeft: 250 }} >
                                    <TouchableOpacity
                                        onPress={() => { this.handleSignOut() }}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'white', marginTop: 5, marginLeft: 10 }} size={20} />

                                            <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5, fontSize: 20, marginRight: 10 }}>Logout</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                        }


                    </Header>
                    {
                        this.state.loggedIn == false ?
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>You need to LogIn</Text>
                            </View>
                            :
                            <View>

                            </View>
                    }

                  
                    {this.state.loggedIn &&
                      <>
                        <EventCategory  featuredEvent={true} allEvents={state.featuredEvents }  handleOpinion={ this.handleOpinion} handleCreateEvent={this.handleCreateEvent}  removelist={this.removelist} />
                        <EventCategory featuredEvent={false} allEvents={state.allEvents }  handleOpinion={ this.handleOpinion} handleCreateEvent={this.handleCreateEvent}  removelist={this.removelist}/>
                     </>     
                    }
                </Content>
            </Container>
        )
    }

}
