import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Eventlist from './Eventlist'
import OpninoinList from './OpninoinList'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarPlus, faThumbsDown, faThumbsUp, faSignInAlt, faSignOutAlt, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { List, ListItem, Left, Body, Content, Header, Container, Label, Button, Right } from 'native-base';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="OpninoinList" component={OpninoinList}options={{headerShown:false}} />
        <Stack.Screen name="Eventlist" component={Eventlist} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 
