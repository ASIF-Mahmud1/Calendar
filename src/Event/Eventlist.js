import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';
import { event } from '../../sample/data/Event'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt, faSignOutAlt, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
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
    removelist = (index, singleEvent) => { //change  calendar icon
        event.map((e, i) => {
            if (index == i) {
                // console.log(singleEvent.iconshow)
                singleEvent.iconshow = false
                this.setState({ singleEvent })
                // console.log(singleEvent.iconshow)
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
                                    <ListItem avatar >
                                        <Left>
                                            <View style={{width:"90%"}}> 

                                                <View style={{ flexDirection: "row" }}>

                                                    <Image style={styles.image} source={singleEvent.image} />
                                                    {/* <Left> */}
                                                        <View style={{ flexDirection: 'column', marginLeft: 10,marginTop:20,width:"60%" }}>
                                                            <Label style={{ color: "red", }}>{singleEvent.title}</Label>
                                                            <Text style={{ color: "red" }}>
                                                                {moment(singleEvent.startTime.dateTime).format("Do MMM ")}
                                                                {moment(singleEvent.startTime.dateTime).format('h:mm a')}-
                                                                {moment(singleEvent.endTime.dateTime).format('h:mm a')}
                                                            </Text>
                                                        </View>

                                                    {/* </Left> */}
                                                    {/* <Right>
                                                        {singleEvent.iconshow == true &&
                                                            <Button transparent style={{ width: 50 }}
                                                                onPress={() => {
                                                                    this.handleCreateEvent(singleEvent),
                                                                        this.removelist(index, singleEvent)
                                                                }} >
                                                                <FontAwesomeIcon icon={faCalendarPlus} style={{ color: '#00008b' }} size={24} />


                                                            </Button>}
                                                        {singleEvent.iconshow == false &&
                                                            <FontAwesomeIcon icon={faCalendarCheck} style={{ color: '#00008b', marginRight: 25 }} size={24} />

                                                        }
                                                    </Right> */}

                                                </View>


                                                <View style={{ flexDirection: "column" }}>



                                                    <Text style={{ color: "black",marginTop:10 }}>{singleEvent.summary}</Text>
                                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                        <Button success style={{ width: "30%", marginRight: 20 }}><Text style={{ color: 'white', margin: 24 }}>Brave</Text></Button>
                                                        <Button success style={{ width: "32%" }}><Text style={{ color: 'white', margin: 10 }}>Ambitious</Text></Button>

                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                        <Button transparent style={{ marginLeft: 30 }}>
                                                            <FontAwesomeIcon icon={faThumbsUp} style={{ color: '#00008b', }} size={26} />

                                                        </Button>
                                                        <Button transparent style={{ marginLeft: 80 }}>
                                                            <FontAwesomeIcon icon={faThumbsDown} style={{ color: '#00008b', marginTop: 10 }} size={26} />

                                                        </Button>

                                                    </View>


                                                </View>
                                            </View>
                                        </Left>


                                        <Right>
                                            {singleEvent.iconshow == true &&
                                                <Button transparent style={{ width: 50, marginBottom: 140 }}
                                                    onPress={() => {
                                                        this.handleCreateEvent(singleEvent),
                                                            this.removelist(index, singleEvent)


                                                    }} >
                                                    <FontAwesomeIcon icon={faCalendarPlus} style={{ color: '#00008b' }} size={24} />


                                                </Button>}
                                            {singleEvent.iconshow == false &&
                                                <FontAwesomeIcon icon={faCalendarCheck} style={{ color: '#00008b', marginBottom: 140, marginRight: 25 }} size={24} />

                                            }
                                        </Right>

                                    </ListItem>
                                    <View style={styles.divider} />

                                </List>

                            )
                        })
                    }

                </Content>
            </Container>
        )
    }


}
const styles = StyleSheet.create({
    image: {
        resizeMode: "cover",
        height: 100,
        width: 100
    },
    divider: {
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
        width: "95%",
        alignSelf: "center",
        opacity: 0.6

    },

});