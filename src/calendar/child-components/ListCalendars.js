import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button
} from 'react-native';
export default function ListCalendars(props) {

   const  handleOnPress=async(calendarId)=>{
    const {handleListEvents}= props
    handleListEvents(calendarId)
    }
    return (
        props.calendars.length>0 &&
        <ScrollView>
             <Text style={styles.title}>List Calendars </Text>
        {
            props.calendars.map((calendar,index)=>{
                return(
                    <View key={index} style={{flexDirection:"column"}}> 
                      {/* <Text>{index} {calendar['id']}  </Text> */}
                      <TouchableOpacity onPress={()=>{handleOnPress(calendar['id'])}}>
                         <Text style={styles.text}>  {calendar['summary']} </Text>
                      </TouchableOpacity>

                    </View>
                )
            })
        }
    </ScrollView>  
    )
  }

  const styles = StyleSheet.create({
    text:{
        fontSize:18,
        color:'#6B6B6B',
        fontWeight:"bold",
    },
    title:{
        fontSize:20,
        color:'black',
    },

  });