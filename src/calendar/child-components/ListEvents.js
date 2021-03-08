import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment'
import { List, ListItem, Left, Body } from 'native-base';

export default function ListEvents(props) {

  return (
    props.allEvents.length > 0 &&
    <ScrollView>
      <TouchableOpacity
        disabled={true}
        style={styles.signIn}
      >
        <Text style={styles.title}>Events</Text>
      </TouchableOpacity>
      {
        props.allEvents.map((singleEvent, index) => {
          let status
          if (singleEvent.attendees) {
            const data = singleEvent.attendees
            data.map((singledata, i) => {
              if (singledata.self) {
                status = singledata.responseStatus
              }
            })

          }
          return (
            <List key={index}>
              <ListItem avatar>
                <Left style={{ width: 50, brorderWidth: 1 }} >

                  <Text style={{
                    fontSize: 20,
                    color: '#6B6B6B',
                    fontWeight: "bold",
                  }}>
                    {moment(singleEvent.start.dateTime).format("Do MMM ")}

                  </Text>
                </Left>
                <Body>
                  <Text style={styles.text} >
                    {singleEvent.summary}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: "#6B6B6B" }}>EventSatus:</Text>
                    <Text style={{ fontSize: 14 }}>{status}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: "#6B6B6B" }}>Creator:</Text>
                    <Text style={{ fontSize: 14 }}>{singleEvent.creator.email}</Text>
                  </View>
                </Body>
              </ListItem>
            </List>
          )
        })
      }
    </ScrollView >
  )
}
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#6B6B6B',
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: "bold"
  },
  signIn: {
    backgroundColor: '#71DEA3',
    alignItems: 'center',
    marginVertical: "10%",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    marginVertical: "5%",
  },
});