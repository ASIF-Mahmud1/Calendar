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
import { configureGoogleSignIn, getCurrentUser, signIn, signOut } from '../calendar/google-auth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt, faSignOutAlt, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

export default class CounterApp extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      loggedIn: false,
      accessToken: '',
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
                    colors={['#9d50bb', '#6e48aa']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={[
                      styles.button,
                      { position: 'absolute', left: -100, top: 150 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate('Eventlist') }}
                    >
                      <Text style={styles.buttonText}> Brave</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    colors={['#9d50bb', '#6e48aa']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={[styles.button, { top: 60 }]}
                  >
                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate('Eventlist') }}
                    >
                      <Text style={styles.buttonText}>Ambitious</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    colors={['#9d50bb', '#6e48aa']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={[styles.button, { position: 'absolute', left: 100, top: 150 }]}      >

                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate('Eventlist') }}>
                      <Text style={styles.buttonText}>kind</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  {/* </View> */}

                  {/* <View style={styles.btnContainerMiddle}> */}
                  <LinearGradient
                    colors={['#9d50bb', '#6e48aa']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={[
                      styles.button,
                      { position: 'absolute', top: 240 },
                    ]}>
                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate('Eventlist') }}
                    >
                      <Text style={styles.buttonText}>Optimistic</Text>
                    </TouchableOpacity>
                  </LinearGradient>


                </View>
              </View>
            </View>}

        </Content>
      </Container>




    );
  }
};

const styles = StyleSheet.create({
  view: { flexDirection: 'row' },
  loginicon: { color: 'white', marginTop: 3 },
  loginText: { fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5 },
  logoutIcon: { color: 'white', marginTop: 3, marginLeft: 10 },
  logoutText: { fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5, fontSize: 20, marginRight: 10 },
  text: { fontSize: 20, fontWeight: "bold" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop:50
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
});
