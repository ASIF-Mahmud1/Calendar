import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
export default function SingleEvent(props) {

    return (
        <Content>
            {
                props.featuredEvent ? <Text>Featured Event</Text> : <Text>Generic Event</Text>
            }
            {
                props.allEvents.map((singleEvent, index) => {

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
                                            <Button success style={{ width: 90, marginRight: 20 }} onPress={() => { props.handleOpinion(singleEvent,"brave") }} ><Text style={{ color: 'white', margin: 24 }} >Brave</Text></Button>
                                            <Button success style={{ width: 90 }} onPress={() => { props.handleOpinion(singleEvent,"ambitious") }} ><Text style={{ color: 'white', margin: 10 }}  >Ambitious</Text></Button>

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
                                        onPress={() => {
                                            props.handleCreateEvent(singleEvent), props.removelist(singleEvent, index)
                                        }} >


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
    )
}


