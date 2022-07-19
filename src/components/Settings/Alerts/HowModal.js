import React, { useState, useEffect } from 'react';
import { Modal, Form, Checkbox, Input,Table, Button, Dropdown, Menu, Typography, Row, Col, Select } from 'antd';
// icons
import Close from '@2fd/ant-design-icons/lib/Close';
import PlusThick from '@2fd/ant-design-icons/lib/PlusThick';
const {Text} = Typography;
const HowModal = props => {
  const { visible, closeModal } = props;
  const columns = [
    {
      title: <b style={{fontSize:18}} >Markdown</b>,
      dataIndex: 'Markdown',
    },
    {
      title: <b style={{fontSize:18}}>Result</b>,
      dataIndex: 'Result',
    }
  ];

  const data = [
    {
      key: '1',
      Markdown: '**text**',
      Result: <b>Bold</b>
    },
    {
      key: '2',
      Markdown: '*text*',
      Result: <i>Emphasize</i>
    },
    {
      key: '3',
      Markdown: '<br>',
      Result: 98
    },
    {
      key: '4',
      Markdown: '[title](https://yourlink.com)',
      Result: <span style={{color:'#08f'}}>Link</span>
    },
    {
      key: '5',
      Markdown: '![alt](https://yourlink.com/image.png)	',
      Result: 'Image'
    },
    {
      key: '6',
      Markdown: '* item	',
      Result: <ul><li>Item</li></ul>
    },
    {
      key: '7',
      Markdown: '#Heading',
      Result: <h1><b style={{color:'#3d4455'}}>Heading</b></h1>
    },
    {
      key: '8',
      Markdown: '##Heading',
      Result: <h2><b style={{color:'#3d4455'}}>Heading</b></h2>
    },
    {
      key: '9',
      Markdown: '###Heading',
      Result: <h3><b style={{color:'#3d4455'}}>Heading</b></h3>
    },
  ];

  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      style={{ top: 50 }}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      title={<span style={{fontSize:23}}>Write with Markdown</span>}
      onCancel={closeModal}
      forceRender
      footer={<Button onClick={closeModal} type="primary">Got it</Button>}
      width={700}
    >
      <Table columns={columns} dataSource={data} pagination={false}/>
      <Text>For further Markdown syntax reference: <a href={'https://ghost.org/docs/'} target="_blank">Markdown Documentation</a></Text>
    </Modal >
  );
}

export default HowModal;