/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Calendar from './src/calendar/Calendar';
import Eventlist from './src/Event/Eventlist';
import Stack from './src/Event/index'
AppRegistry.registerComponent(appName, () => Stack);
