import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';
import { event } from '../../sample/data/Event'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { listCalendar, createEvent, listEvents, createCalendar } from '../calendar/google-calendar.api'
import { configureGoogleSignIn, getCurrentUser, signIn, signOut } from '../calendar/google-auth'
import moment from 'moment'
export default class extends React.Component {
    state = {
        loggedIn: false,
        accessToken: '',


    }
    componentDidMount = async () => {
        configureGoogleSignIn()
        let response = await getCurrentUser();
        if (response.success) {
            this.setState({ accessToken: response.success.accessToken, loggedIn: true })
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
    removelist = (index, singleEvent) => { //remove  event from list
        event.map((e, i) => {
            if (index == i) {
                console.log(singleEvent.iconshow)
                singleEvent.iconshow = false
                this.setState({ singleEvent })
                console.log(singleEvent.iconshow)
            }
        })
    }
    render() {
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
                        event.map((singleEvent, index) => {

                            return (

                                <List key={index}>
                                    <ListItem selected>
                                        <Left>
                                            <View style={{ flexDirection: "column" }}>
                                                <Label style={{ color: "red" }}>{singleEvent.title}</Label>
                                                <Text style={{ color: "red" }}>
                                                    {moment(singleEvent.startTime.dateTime).format("Do MMM ")}
                                                    {moment(singleEvent.startTime.dateTime).format('h:mm a')}-
                                                    {moment(singleEvent.endTime.dateTime).format('h:mm a')}
                                                </Text>

                                                <Text style={{ color: "black" }}>{singleEvent.summary}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <Button success style={{ width: 90, marginRight: 20 }}><Text style={{ color: 'white', margin: 24 }}>Brave</Text></Button>
                                                    <Button success style={{ width: 90 }}><Text style={{ color: 'white', margin: 10 }}>Ambitious</Text></Button>

                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <Button transparent style={{ marginLeft: 20 }}>
                                                        <FontAwesomeIcon icon={faThumbsUp} style={{ color: '#00008b', }} size={26} />

                                                    </Button>
                                                    <Button transparent style={{ marginLeft: 40 }}>
                                                        <FontAwesomeIcon icon={faThumbsDown} style={{ color: '#00008b', marginTop: 10 }} size={26} />

                                                    </Button>

                                                </View>


                                            </View>


                                        </Left>

                                        <Right>
                                            <Button transparent style={{ width: 50, marginBottom: 140 }}
                                                onPress={() => {
                                                    // this.handleCreateEvent(singleEvent), 
                                                    this.removelist(index, singleEvent)


                                                }} >
                                                {singleEvent.iconshow == true &&
                                                    <FontAwesomeIcon icon={faCalendarPlus} style={{ color: '#00008b' }} size={24} />
                                                }


                                            </Button>
                                            {singleEvent.iconshow == false &&
                                                <View>
                                                    <Text style={{ margin: 10, color: "red" }}>Add</Text>

                                                </View>
                                            }
                                        </Right>

                                    </ListItem>
                                </List>
                            )
                        })
                    }
                </Content>
            </Container>
        )
    }

}
