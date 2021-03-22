
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { List, ListItem, Body, Content, Header, Title, Left, Button, Container, Right } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt, faSignOutAlt, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { configureGoogleSignIn, getCurrentUser, signIn, signOut } from '../calendar/google-auth';
export default class CounterApp extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      type: '',
      loggedIn: false,
      accessToken: '',
      viewButton: false,
      show:false
    }
  };

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

  ShowButtonForm = (value) => {
    this.setState({
      viewButton: !this.state.viewButton,
      type: value,
       show:!this.state.show,
    });
    console.log(this.state.type)
  };
  calendarForm() {
    if (this.state.viewButton) {
      return (
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          

            <TouchableOpacity
              style={styles.create}
              onPress={() => {
               

                this.passvalue()
                this.setState({viewButton:false,show:false})
             

              }}>
              <Text style={styles.createtext}>Show Content </Text>
            </TouchableOpacity>

          </View>

        </View>
      )
    }
  }
  passvalue() {
    { this.state.type == "ambitious" && this.props.navigation.navigate('Eventlist', { opinion: 'ambitious' }) }
    { this.state.type == "kind" && this.props.navigation.navigate('Eventlist', { opinion: 'kind' }) }
    {this.state.type == "brave" && this.props.navigation.navigate('Eventlist', { opinion: 'brave' })}
    {this.state.type == "optimistic" && this.props.navigation.navigate('Eventlist', { opinion: 'optimistic' })}
  }
  render() {

    return (
      <Container>
        <Content>
          <Header >
            {
              this.state.loggedIn == false ?
                <Right>
                  <View >

                    <TouchableOpacity
                      // style={styles.signIn}
                      onPress={() => { this.handleSignIn() }} >
                      <View style={styles.view}>
                        <FontAwesomeIcon icon={faSignInAlt} style={styles.loginicon} size={20} />

                        <Text style={styles.loginText}>Login</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Right>
                :
                <Right>
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
                </Right>
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
            <View style={styles.container}>

              <View style={styles.btnContainer}>

                <View style={styles.btnContainerMiddle}>
                  <LinearGradient
                    colors={this.state.show == true && this.state.type=='brave' ? [ '#CB356B','#BD3F32']:['#9d50bb', '#6e48aa']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={[
                      styles.button,
                      { position: 'absolute', left: -100, top: 150 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.ShowButtonForm('brave')
                        // this.props.navigation.navigate('Eventlist', { opinion: 'brave' }) 
                      }}
                    >
                      <Text style={styles.buttonText}> Brave</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    colors={this.state.show == true && this.state.type=='ambitious' ? [ '#CB356B','#BD3F32']:['#9d50bb', '#6e48aa']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={[styles.button, { top: 60 }]}
                  >
                    <TouchableOpacity
                   
                      onPress={() => {
                        this.ShowButtonForm('ambitious')
                      }}
                    >
                      <Text style={styles.buttonText}>Ambitious</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    colors={this.state.show == true && this.state.type=='kind' ? [ '#CB356B','#BD3F32']:['#9d50bb', '#6e48aa']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={[styles.button, { position: 'absolute', left: 100, top: 150 }]}      >

                    <TouchableOpacity
                      onPress={() => {
                        this.ShowButtonForm('kind')
                      }}>
                      <Text style={styles.buttonText}>kind</Text>
                    </TouchableOpacity>
                  </LinearGradient>
              
                  <LinearGradient
                    colors={this.state.show == true && this.state.type=='optimistic' ? [ '#CB356B','#BD3F32']:['#9d50bb', '#6e48aa']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={[
                      styles.button,
                      { position: 'absolute', top: 240 },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.ShowButtonForm('optimistic')
                      }}
                    >
                      <Text style={styles.buttonText}>Optimistic</Text>
                    </TouchableOpacity>
                  </LinearGradient>


                </View>
                {this.calendarForm()}
              </View>
            
            </View>}

        </Content>
      </Container>




    );
  }
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:50
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: 'grey',
    padding: 8,
    width: 400,
    height: 600,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red',


  },
  btnContainerMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 250
  },
  button: {
    margin: 40,
    width: 90,
    height: 90,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replybutton: {
    margin: 10,
    width: 220,
    height: 220,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    padding: 15,
    margin: 1,
    width: 150,
    fontSize: 16,
    alignItems: 'center'
  },
  Text: {
    textAlign: 'center',
    color: '#4C64FF',
    padding: 15,
    marginLeft: 1,
    marginRight: 1,
    width: 180,
    fontSize: 16
  },
  //header
  view: { flexDirection: 'row' },
  loginicon: { color: 'white', marginTop: 3 },
  loginText: { fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5 },
  logoutIcon: { color: 'white', marginTop: 3, marginLeft: 10 },
  logoutText: { fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5, fontSize: 20, marginRight: 10 },
  text: { fontSize: 20, fontWeight: "bold" },
  //content button
  create: {
    backgroundColor: '#66023c',
    marginBottom: 20,
    alignItems: 'center',
    // margin: 20,
    width: 200, height: 60, borderRadius: 5
  },
  createtext: {
    fontSize: 24,
    color: 'white',
    fontWeight: "bold", marginTop: 15
  },
  //ambitious 
  ambitous:{
   
      margin: 40,
      width: 90,
      height: 90,
      borderRadius: 90,
      justifyContent: 'center',
      alignItems: 'center',
      top:60,
      backgroundColor:'red'
    
  },
  Pressambitous:{
   
    margin: 40,
    width: 90,
    height: 90,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    top:60,
    backgroundColor:'black'
  
}
});
