import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Eventlist from './Eventlist'
import OpninoinList from './OpninoinList'
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="OpninoinList" component={OpninoinList} />
        <Stack.Screen name="Eventlist" component={Eventlist} />
        {/* <Stack.Screen name="Prescription" component={Prescription} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 
