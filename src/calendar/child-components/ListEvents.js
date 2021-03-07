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
export default function ListEvents(props) {
    return (
       props.allEvents.length>0 &&
    <ScrollView>
       
       <TouchableOpacity 
       disabled={true}
        style= {styles.signIn}   
         >
            <Text style= {styles.title}>Events</Text>
      </TouchableOpacity>
                 
       {
         props.allEvents.map((singleEvent,index)=>{
           return (
             <Text key={index} style={styles.text} > {index+1+ " "}{singleEvent.summary}  </Text>
           )
         })
       }
    </ScrollView>
    )
  }
  //  {(new Date (singleEvent.created)).toDateString()} 
  
  const styles = StyleSheet.create({
    text:{
        fontSize:18,
        color:'#6B6B6B',
        fontWeight:"bold",
    },
    title:{
      fontSize:20,
      color:'white',
      fontWeight:"bold"
    },
    signIn:{
      backgroundColor: '#71DEA3',
      alignItems:'center',
      marginVertical:"10%",
      paddingVertical:"5%",
      paddingHorizontal: "5%",
      marginVertical: "5%",
  },
  });