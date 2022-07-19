import React from 'react';
import { Badge } from 'antd';

import ViewDashboardOutline from '@2fd/ant-design-icons/lib/ViewDashboardOutline';
import AccountGroupOutline from '@2fd/ant-design-icons/lib/AccountGroupOutline';
import CalendarAccountOutline from '@2fd/ant-design-icons/lib/CalendarAccountOutline';
import ClockTimeFiveOutline from '@2fd/ant-design-icons/lib/ClockTimeFiveOutline';
import ClipboardListOutline from '@2fd/ant-design-icons/lib/ClipboardListOutline';
import CogOutline from '@2fd/ant-design-icons/lib/CogOutline';
import Chat from '@2fd/ant-design-icons/lib/Chat';

// export const menuData = [
//   {
//     key: 'dashboard',
//     name: 'Dashboard',
//     pathname: '/dashboard',
//     icon: <ViewDashboardOutline style={{ fontSize: 24 }} />,
//     childs: []
//   }, {
//     key: 'waitlist',
//     name: 'Waitlist',
//     pathname: '/waitlist',
//     icon: <Badge count={1} size={"small"} style={{ backgroundColor: '#08f' }} overflowCount={9}><ClockTimeFiveOutline style={{ fontSize: 24 }} /></Badge>,
//     badge: false,
//     childs: []
//   }, {
//     key: 'schedule',
//     name: 'Schedule',
//     pathname: '/schedule',
//     icon: <Badge count={11} size={"small"} style={{ backgroundColor: '#08f' }} overflowCount={9}><CalendarAccountOutline style={{ fontSize: 24 }} /></Badge>,
//     badge: false,
//     childs: []
//   }, {
//     key: 'customers',
//     name: 'Customers',
//     pathname: '/customers',
//     icon: <Badge count={11} size={"small"} style={{ backgroundColor: '#08f' }} overflowCount={9}><AccountGroupOutline style={{ fontSize: 24 }} /></Badge>,
//     badge: false,
//     childs: []
//   }, {
//     key: 'tasks',
//     name: 'Tasks',
//     pathname: '/tasks',
//     icon: <Badge count={11} size={"small"} style={{ backgroundColor: '#08f' }} overflowCount={9}><ClipboardListOutline style={{ fontSize: 24 }} /></Badge>,
//     badge: true,
//     childs: []
//   }, {
//     key: 'settings',
//     name: 'Settings',
//     pathname: '/settings',
//     icon: <CogOutline style={{ fontSize: 24 }} />,
//     badge: false,
//     childs: []
//   }
// ]

export const menuData = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    pathname: '/dashboard',
    icon: <ViewDashboardOutline style={{ fontSize: 24 }} />,
    childs: [],
  },
  {
    key: 'waitlist',
    name: 'Waitlist',
    pathname: '/waitlist',
    icon: <ClockTimeFiveOutline style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
  {
    key: 'schedule',
    name: 'Schedule',
    pathname: '/schedule',
    icon: <CalendarAccountOutline style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
  {
    key: 'customers',
    name: 'Customers',
    pathname: '/customers',
    icon: <AccountGroupOutline style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
  {
    key: 'staff',
    name: 'Staff',
    pathname: '/staff',
    icon: <AccountGroupOutline style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
  {
    key: 'tasks',
    name: 'Tasks',
    pathname: '/tasks',
    icon: <ClipboardListOutline style={{ fontSize: 24 }} />,
    badge: true,
    childs: [],
  },
  {
    key: 'resources',
    name: 'Resources',
    pathname: '/resources',
    icon: <ClipboardListOutline style={{ fontSize: 24 }} />,
    badge: true,
    childs: [],
  },
  {
    key: 'resources-schedule',
    name: 'Resources Schedule',
    pathname: '/resources-schedule',
    icon: <ClipboardListOutline style={{ fontSize: 24 }} />,
    badge: true,
    childs: [],
  },
  {
    key: 'settings',
    name: 'Settings',
    pathname: '/settings',
    icon: <CogOutline style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
  {
    key: 'chat',
    name: 'Chat',
    pathname: '/Chat',
    icon: <Chat style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
];
