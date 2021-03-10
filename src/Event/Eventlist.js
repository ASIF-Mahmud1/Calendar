import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';
import { event } from '../../sample/data/Event'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faSignInAlt, faSignOutAlt, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default class extends React.Component {

    render() {
        return (
            <Container>
                <Content>
                    <Header />
                    {
                        event.map((singleEvent, index) => {

                            return (

                                <List key={index}>
                                    <ListItem selected>
                                        <Left>
                                            <View style={{ flexDirection: "column" }}>
                                                    <Label style={{ color: "red" }}>{singleEvent.title}</Label>

                                                <Text style={{ color: "black" }}>{singleEvent.summary}</Text>
                                                <View style={{ flexDirection: 'row',marginTop:10 }}>
                                                    <Button   success style={{  width: 60,marginRight:10 }}><Text style={{ color:'white', margin: 10 }}>Brave</Text></Button>
                                                    <Button  success  style={{ width: 60 }}><Text style={{ color :'white',margin: 10 }}>kind</Text></Button>

                                                </View>
                                                <View style={{ flexDirection: 'row',marginTop:10 }}>
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
                                            <Button transparent style=
                                                {{ width: 50, marginBottom: 140 }}>
                                                <FontAwesomeIcon icon={faCalendarPlus} style={{ color:'#00008b' }} size={24} />

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
