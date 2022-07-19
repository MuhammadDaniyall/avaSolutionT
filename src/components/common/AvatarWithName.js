import React from 'react';
import { Avatar } from 'antd';

const AvatarWithName = (props) => {
  const stringToHslColor = (name, s, l) => {
    let hash = 0;
    for (let i = 0; i < name?.length; i++) {
      hash = name?.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  };
  return (
    <Avatar
      style={{
        backgroundColor: stringToHslColor(props.name, 20, 70),
        verticalAlign: 'middle',
        fontWeight: 600,
      }}
      size={props?.size?props.size:'large'}
    >
      {props.name?.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default AvatarWithName;
