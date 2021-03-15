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
        opinion:'',
        type: '',
        indexValue:'',
        like:false
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
    changeIcon = (index, singleEvent) => { //change  calendar icon
        event.map((e, i) => {
            if (index == i) {
                singleEvent.iconshow = false
                this.setState({ singleEvent })
            }
        })
    }
    // chooseIndex = (singleEvent, index) => {
       
    //     event.map((e, i) => {
    //         if (index == i) {
    //             singleEvent.status = true
    //             this.setState({ singleEvent })
               
               
    //         }
    //     })

    // }
    changeOpnioin = (value) => {// brave or ambitious
        
        this.setState({
            opinion: value,
                })

    }
    changeValue = (value) => {//like or dislike
        
        this.setState({
            type: value,
            
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
                        event.map((singleEvent, index) => {

                            return (

                                <List key={index}>
                                    <ListItem selected >
                                        <Left>
                                            <View >

                                                <View style={styles.view}>

                                                    <Image style={styles.image} source={singleEvent.image} />
                                                  
                                                    <View style={styles.titleView}>
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
                                                            style={ this.state.opinion == "brave" ? styles.PressbraveButton : styles.braveButton}


                                                            onPress={() => {
                                                                this.changeOpnioin("brave")
                                                               
                                                            }}
                                                        >
                                                            <Text style={styles.BraveText}>Brave</Text>
                                                        </Button>
                                                        <Button
                                                            style={this.state.opinion == "ambitious" ? styles.PressAmbitiousButton : styles.AmbitiousButton}

                                                            onPress={() => {
                                                                this.changeOpnioin("ambitious")
                                                            }}
                                                        >
                                                            <Text style={styles.AmbitiousText}>Ambitious</Text>
                                                        </Button>

                                                    </View>
                                                    <View style={styles.status}>
                                                        <Button transparent style={styles.likeButton}onPress={() => {
                                                                this.changeValue("like")
                                                                 this.chooseIndex(singleEvent,index,"like")
                                                            }}>
                                                            <FontAwesomeIcon icon={faThumbsUp} style={this.state.type == "like" ?styles.Presslike:styles.like} size={26} />

                                                        </Button>
                                                        <Button transparent style={styles.dislikeButton}onPress={() => {
                                                                this.changeValue("dislike")
                                                                //  this.chooseIndex(singleEvent,index)

                                                            }}>
                                                            <FontAwesomeIcon icon={faThumbsDown} style={ this.state.type == "dislike" ?styles.Pressdislike:styles.dislike} size={26} />

                                                        </Button>

                                                    </View>


                                                </View>
                                            </View>
                                        </Left>


                                        <Right>
                                            {singleEvent.iconshow == true &&
                                                <Button transparent style={styles.calendarButton}
                                                    onPress={() => {
                                                        this.handleCreateEvent(singleEvent),
                                                            this.changeIcon(index, singleEvent)


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