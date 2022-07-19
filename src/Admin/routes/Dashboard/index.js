import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userSignOut } from '../../appRedux/actions/Auth';
// import { getWaitlists }  from '../../appRedux/actions/Waitlists';
import {FaClock} from 'react-icons/fa'
import {FaCalendar} from 'react-icons/fa'
import {FaUsers} from 'react-icons/fa'
import {FaUserTie} from 'react-icons/fa'
import {FaTasks} from 'react-icons/fa'
import {FaClipboardList} from 'react-icons/fa'
// import {
//   getWaitlists,
//   addWaitlist,
//   updateWaitlist,
//   deleteWaitlist,
//   addToWaitlistFromServed,
// } from '../../appRedux/actions/Waitlists';
// import {
//   getCustomers,
//   addCustomer,
//   updateCustomer,
//   deleteCustomer,
//   addWaitlists,
// } from '../../appRedux/actions/Customer';
// import {
//   getField,
//   getResourceData,
// } from '../../appRedux/actions/Settings'

// import {
//   getResourceData,
//   addResource,
//   updateResource,
//   updateResourceAvailable,
//   deleteResource,
//   getServiceData,
// } from '../../appRedux/actions/Settings';

// import { getBookingData, addBookingData, updateBookingData, deleteBookingData } from '../../appRedux/actions/Schedule';

// import { getTasks, addTask, updateTask, deleteTask, changeTaskProgress } from '../../appRedux/actions/Tasks';

import {
  getUsers,
  // addusers,
  // updateCustomer,
  // deleteusers,
  // addWaitlists,
} from '../../appRedux/actions/User';

const Dashboard = (props) => {
  const {
    user,
    waitlists,
    schedule,
    customer,
    tasks,
    users,
    settings,
    getUsers,
    getTasks,
    getBookingData,
    getWaitlists,
    addWaitlist,
    updateWaitlist,
    deleteWaitlist,
    addToWaitlistFromServed
  } = props;


  var waitlistCount = 0;
  var CustomerCount = 0;
  var ScheduleCount = 0;
  var taskCount = 0;
  var usersCount = 0;
  var resourceCount = 0;
  if(waitlists.waitlistData != null){
    waitlistCount = waitlists.waitlistData.length;
  }
  if(customer.customerData != null){
    CustomerCount = customer.customerData.length;
  }
  if(schedule.bookingData != null){
    ScheduleCount = schedule.bookingData.length;
  }
  if(tasks.taskdata != null){
    taskCount = tasks.taskdata.length;
    console.log(tasks.taskdata);
  }
  if(users.userData != null){
    usersCount = users.userData.length;
    console.log(users.userData);
  }
  if(settings.resourceData != null){
    resourceCount = settings.resourceData.length;
    console.log(settings.resourceData);
  }

  useEffect(() => {
    initialData();
  }, []);

  const initialData = async () => {
      // await props.getField(user.id);
    // await props.getField(user.id);
    // await props.getResourceData(user.id);
    // await props.getWaitlists(user.id);
    // await props.getTasks(user.id);
    // await props.getusers(user.id);
    // await getBookingData(user.id);
  };

  return (
    <>
      <div className="main">
        <div className="d-flex">
          <div className="card text-center dash-card " style={{backgroundColor:"#003366"}}>
            <div className="card-body">
             <FaClock className="dicons"/>
              <h2 className="card-title">Waitlist</h2>
              <p className="card-text"> Total {waitlistCount} </p>
            </div>
          </div>
          <div className="card text-center dash-card" style={{backgroundColor:"#003366"}}>
            <div className="card-body ">
              <FaCalendar className="dicons"/>
              <h2 className="card-title">Schedule</h2>
              <p className="card-text"> Total {ScheduleCount}</p>
            </div>
          </div>
          <div className="card text-center dash-card" style={{backgroundColor:"#003366"}}>
            <div className="card-body ">
              <FaUsers className="dicons"/>
              <h2 className="card-title">Customer</h2>
              <p className="card-text"> Total {CustomerCount} </p>
            </div>
          </div>
        </div>
        <div className="d-flex">

        <div className="card text-center dash-card" style={{backgroundColor:"#003366"}}>
            <div className="card-body ">
              <FaUserTie className="dicons"/>
              <h2 className="card-title">Users</h2>
              <p className="card-text"> Total {usersCount} </p>
            </div>
          </div>
          <div className="card text-center dash-card" style={{backgroundColor:"#003366"}}>
            <div className="card-body ">
              <FaTasks className="dicons"/>
              <h2 className="card-title">Task</h2>
              <p className="card-text"> Total {taskCount} </p>
            </div>
          </div>
          <div className="card text-center dash-card" style={{backgroundColor:"#003366"}}>
            <div className="card-body ">
              <FaClipboardList className="dicons"/>
              <h2 className="card-title">Resource</h2>
              <p className="card-text"> Total {resourceCount}</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, waitlists , schedule, customer, tasks, users, settings}) => {
  const { token, user } = auth;
  return { token, user, waitlists, schedule, customer, tasks, users, settings };
};

export default connect(mapStateToProps,
  {
    getUsers
  //  userSignOut,
  //  getResourceData,
  //  getWaitlists,
  //  addWaitlist,
  //  updateWaitlist,
  //  deleteWaitlist,
  //  addToWaitlistFromServed,
  //  getField,
  //  getCustomers,
  //  addCustomer,
  //  updateCustomer,
  //  deleteCustomer,
  //  addWaitlists,
  //  getBookingData,
  //  addBookingData,
  //  updateBookingData,
  //  deleteBookingData,
  //  getTasks,
  //  addTask,
  //  updateTask,
  //  deleteTask,
  //  changeTaskProgress,
  //  getusers,
  //  addusers,
  //  updateCustomer,
  //  deleteusers,
  //  addWaitlists,
  }
  )(Dashboard);
