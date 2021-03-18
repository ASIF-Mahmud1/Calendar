// import React, { Component } from 'react';
// import { Text, View } from 'react-native';
// import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';
// export default class HelloWorldApp extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Hello, world opinion!</Text>
//         <Button block success onPress={() => { this.props.navigation.navigate('Eventlist') }}>
//                             <Text>Eventlist</Text>
//                         </Button>
//       </View>
//     );
//   }
// }
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { List, ListItem, Body, Content, Header, Title, Left, Button, Container } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';

export default class CounterApp extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      type: ''
    }
  };

 
  
  toggleMe(value) {
    this.setState({
      type: value
    })
  }
  render() {

    return (
      <Container>
        <Content>
          <Header/>
        {/* <View style={styles.container}> */}
      
      <View style={styles.btnContainer}>

        <View style={styles.btnContainerMiddle}>
          <LinearGradient
            colors={['#9d50bb', '#6e48aa']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            // style={{ height: 48, width: 200, alignItems: 'center', justifyContent: 'center', width: 200}}
            style={[
              styles.button,
              { position: 'absolute', left: -100, top: 150 },
            ]}
          >
            <TouchableOpacity
              onPress={() => {  }}
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
              onPress={() => {  }}
            >
              <Text style={styles.buttonText}>Ambitious</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#9d50bb', '#6e48aa']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={[styles.button, { position: 'absolute', left: 100, top: 150 }]}      >

            <TouchableOpacity
              onPress={() => { this.toggleMe("response3") }}>
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
              { position: 'absolute',  top: 240 },
            ]}>
            <TouchableOpacity
              onPress={() => {  }}
            >
              <Text style={styles.buttonText}>Optimistic</Text>
            </TouchableOpacity>
          </LinearGradient>
         

        </View>
      </View>
    {/* </View> */}

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
    justifyContent:'center',
    // backgroundColor:'red',
     marginLeft:20,
    // marginRight:20,
    marginTop:50

  },
  btnContainerMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:250
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
   margin:1,
    width: 150,
    fontSize: 16,
    alignItems:'center'
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
