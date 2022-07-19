import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';
import Customer from './Customer';
import Staff from './staff';
import Tasks from './Tasks';
import Chat from './Chat';
import Waitlists from './Waitlists';
import Schedule from './Schedule';
import Appointment from './Appointment';
import Common from './Common';
import User from './User';


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  users:User,
  customer: Customer,
  staff: Staff,
  chat:Chat,
  tasks: Tasks,
  waitlists: Waitlists,
  schedule: Schedule,
  appointment: Appointment,
  commonData: Common,
});

export default reducers;
