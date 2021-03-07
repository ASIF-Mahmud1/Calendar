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
import {configureGoogleSignIn, getCurrentUser, signIn, signOut} from './google-auth'
import {listCalendar, createEvent, listEvents} from './google-calendar.api'
import {event} from '../../sample/data/Event'
import ListEvents from './child-components/ListEvents'
import ListCalendars from './child-components/ListCalendars'
import {getIBMToken} from '.././utils/ibm-auth'
import {predictEmailTag} from '.././utils/ibm-predict-api'
export default class extends React.Component {
    state ={
        loggedIn: false,
        accessToken: '',
        calendars:[],
        allEvents:[],
    }

    componentDidMount= async()=>{
        configureGoogleSignIn()
        let response = await getCurrentUser();
        if(response.success)
        {
            this.setState({accessToken: response.success.accessToken, loggedIn: true})
        }
        else 
        {
            this.setState({loggedIn:false})
        }
    }
    handleSignOut= async()=>{
        let response= await signOut()
        if(response.success)
        {
            this.setState({loggedIn:false})
        }
    }

    handleSignIn= async()=>{
        let response= await signIn()
        if(response.success)
        {
            this.setState({loggedIn:true, accessToken: response.success.accessToken})
        }
    }
    listAllCalendar=async()=>{
        const {accessToken} =this.state
        let result= await listCalendar(accessToken)
        this.setState({calendars: result.items})
        console.log(result)
    } 
    handleCreateEvent = async()=>{
        const {accessToken} =this.state
        const calendarId= "asif01050105@gmail.com"
        let result = await createEvent(accessToken,calendarId,event)
        console.log("Event response ", result)
    }
    handleListEvents = async(calendarId)=>{
        const {accessToken} =this.state
      //  const calendarId= "asif01050105@gmail.com"
       calendarId = calendarId.replace("#", "%23")
        let result = await listEvents(accessToken,calendarId)
       this.setState({allEvents: result.items? result.items: []})
        console.log("List Events response ", result)
    }  

    handleIBMToken =async()=>{
       let response =await getIBMToken("dfsd")
       let result= await predictEmailTag(response.access_token)
       alert(JSON.stringify(result))
    }
    render()
    {
        return(
            <View>
                <Text>
                    Calendar Component
                </Text>
                <ScrollView>
                       <TouchableOpacity 
                          style= {styles.signIn}   
                          onPress={()=>{this.handleIBMToken() }} >
                            <Text style= {styles.text}>Get IBM Token</Text>
                       </TouchableOpacity>
                {
                    this.state.loggedIn ==false ? 
                    <TouchableOpacity 
                    style= {styles.signIn}   
                    onPress={()=>{this.handleSignIn() }} >
                          <Text style= {styles.text}>Login</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity 
                  style= {styles.signOut}   
                  onPress={()=>{this.handleSignOut() }}
                  >
                    <Text style= {styles.text}>Logout</Text>
                </TouchableOpacity>
                }
                {
                    this.state.loggedIn && 
                    <>
                      <TouchableOpacity 
                          style= {styles.signIn}   
                          onPress={()=>{this.listAllCalendar() }} >
                            <Text style= {styles.text}>Get All Calendars</Text>
                       </TouchableOpacity>
                      <ListCalendars calendars ={this.state.calendars} handleListEvents={this.handleListEvents} />
                     

                     {/* <TouchableOpacity 
                        style= {styles.signIn}   
                        onPress={()=>{this.handleListEvents("en.bd%23holiday@group.v.calendar.google.com") }} >
                            <Text style= {styles.text}>Get All Events</Text>
                     </TouchableOpacity> */}
                     <ListEvents allEvents = {this.state.allEvents}/>

                     <TouchableOpacity 
                        style= {styles.createEvent}   
                        onPress={()=>{this.handleCreateEvent() }} >
                            <Text style= {styles.text}>Create New Event</Text>
                     </TouchableOpacity>
                    </>
                    
                }
            </ScrollView>

              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text:{
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
   signOut: {
    backgroundColor: '#D91010',   
    alignItems:'center',
    marginVertical:"10%",
    paddingVertical:"5%",
    paddingHorizontal: "5%",
    marginVertical: "5%",
   },
   createEvent:{
    backgroundColor: '#841584',
    alignItems:'center',
    marginVertical:"10%",
    paddingVertical:"5%",
    paddingHorizontal: "5%",
    marginVertical: "5%",
},
  });