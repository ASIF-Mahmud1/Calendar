import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';
export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world opinion!</Text>
        <Button block success onPress={() => { this.props.navigation.navigate('Eventlist') }}>
                            <Text>Eventlist</Text>
                        </Button>
      </View>
    );
  }
}