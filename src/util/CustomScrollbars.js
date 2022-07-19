import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbars = (props) => (
  <Scrollbars
    {...props}
    autoHide
    renderTrackHorizontal={(scrollProps) => (
      <div {...scrollProps} style={{ display: 'none' }} className="track-horizontal" />
    )}
  />
);

export default CustomScrollbars;
