/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Calendar from './src/calendar/Calendar';
import Eventlist from './src/Event/Eventlist';
AppRegistry.registerComponent(appName, () => Eventlist);
