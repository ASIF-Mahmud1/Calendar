import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';
import { event } from '../../sample/data/Event'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { listCalendar, createEvent, listEvents, createCalendar } from '../calendar/google-calendar.api'
import { configureGoogleSignIn, getCurrentUser, signIn, signOut } from '../calendar/google-auth'

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
        console.log("enter")
        let response = await signIn()
        if (response.success) {
            this.setState({ loggedIn: true, accessToken: response.success.accessToken })
        }
    }
    handleCreateEvent = async (singleEvent) => {
        console.log(singleEvent)
        const { accessToken } = this.state
        const calendarId = "9jafcfgfbo0vj1p38sr0utpd5g@group.calendar.google.com"
        const event = {
            'summary': singleEvent.title,
            "end": {
                "dateTime": "2021-02-04T09:00:00.000Z",
                "timeZone": "BST" // 'America/Los_Angeles'
            },
            "start": {
                "dateTime": "2021-02-04T07:00:00.000Z",
                "timeZone": "BST" // 'America/Los_Angeles'
            },
            'description': singleEvent.summary
        }
        console.log("event", event)
        let result = await createEvent(accessToken, calendarId, event)
        console.log("Event response ", result)
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
                    

                    {  this.state.loggedIn &&
                        event.map((singleEvent, index) => {

                            return (

                                <List key={index}>
                                    <ListItem selected>
                                        <Left>
                                            <View style={{ flexDirection: "column" }}>
                                                <Label style={{ color: "red" }}>{singleEvent.title}</Label>

                                                <Text style={{ color: "black" }}>{singleEvent.summary}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <Button success style={{ width: 90, marginRight: 20 }}><Text style={{ color: 'white', margin: 24 }}>Brave</Text></Button>
                                                    <Button success style={{ width: 90 }}><Text style={{ color: 'white', margin: 10 }}>Ambitious</Text></Button>

                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <Button transparent style={{ marginLeft: 20 }}>
                                                        {/* <Text style={{color:"white",margin:10}}>Like</Text> */}
                                                        <FontAwesomeIcon icon={faThumbsUp} style={{ color: '#00008b', }} size={26} />

                                                    </Button>
                                                    <Button transparent style={{ marginLeft: 40 }}>
                                                        <FontAwesomeIcon icon={faThumbsDown} style={{ color: '#00008b', marginTop: 10 }} size={26} />

                                                        {/* <Text style={{color:"white",margin:7}}>DisLike</Text> */}
                                                    </Button>

                                                </View>


                                            </View>


                                        </Left>

                                        <Right>
                                            <Button transparent style={{ width: 50, marginBottom: 140 }}
                                                onPress={() => { this.handleCreateEvent(singleEvent) }} >


                                                <FontAwesomeIcon icon={faCalendarPlus} style={{ color: '#00008b' }} size={24} />

                                                {/* <Text style={{margin:10,color:"white"}}>Add</Text> */}
                                            </Button>
                                        </Right>

                                    </ListItem>
                                </List>
                            )
                        })
                    }
                </Content>
            </Container>
            // <View
            //   style={{
            //     flex: 1,
            //     justifyContent: "center",
            //     alignItems: "center"
            //   }}>
            //   <Text>Hello world</Text>
            // </View>
        )
    }

}
