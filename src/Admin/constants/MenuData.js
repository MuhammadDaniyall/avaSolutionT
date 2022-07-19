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
    pathname: '/admin/dashboard',
    icon: <ViewDashboardOutline style={{ fontSize: 24 }} />,
    childs: [],
  },
  {
    key: 'users',
    name: 'Users',
    pathname: '/admin/users-admin',
    icon: <AccountGroupOutline style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
  {
    key: 'customers',
    name: 'Customers',
    pathname: '/admin/customers-admin',
    icon: <AccountGroupOutline style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
  {
    key: 'control-flows',
    name: 'Control Flows',
    pathname: '/admin/control-flows-admin',
    icon: <ViewDashboardOutline style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
  {
    key: 'packages',
    name: 'Packages',
    pathname: '/admin/packages-admin',
    icon: <ClipboardListOutline style={{ fontSize: 24 }} /> ,
    badge: false,
    childs: [],
  },
  {
    key: 'subscriptions',
    name: 'Subscriptions',
    pathname: '/admin/subscriptions-admin',
    icon: <ClipboardListOutline style={{ fontSize: 24 }} />,
    badge: false,
    childs: [],
  },
  {
    key: 'website-settings',
    name: 'Website Settings',
    pathname: '/admin/website-settings-admin',
    icon: <CogOutline style={{ fontSize: 24 }} />,
    badge: true,
    childs: [],
  },
  {
    key: 'reporting',
    name: 'Reporting',
    pathname: '/admin/reporting-admin',
    icon: <ClipboardListOutline style={{ fontSize: 24 }} />,
    badge: true,
    childs: [],
  },
  {
    key: 'ticket-support',
    name: 'Ticket and Support',
    pathname: '/admin/ticket-support-admin',
    icon: <ClipboardListOutline style={{ fontSize: 24 }} />,
    badge: true,
    childs: [],
  },

];
