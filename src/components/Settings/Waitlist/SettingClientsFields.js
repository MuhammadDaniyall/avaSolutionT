import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addField, updateField, getField, enableField, deleteClientField } from '../../../appRedux/actions/Settings';
import NewFieldModal from './NewFieldModal';
import { Modal, List, Button, Row, Col, Switch } from 'antd';

const SettingClientFieldModal = (props) => {
  const { visible, closeModal } = props;
  const [NewFieldModalVisible, setNewFieldModalVisible] = useState(null);
  const tempdatas = {
    ID: null,
    PORV: 'Public',
    defaultValue: '',
    for: 'Both bookings and waitlist',
    is_add_option: false,
    is_multiple: false,
    is_pre_select: false,
    is_required: false,
    label: '',
    name: '',
    options: '[]',
    ordering: null,
    placeholder: '',
    type: 'Text Field',
  };
  const [editFieldData, seteditFieldData] = useState(tempdatas);
  useEffect(() => {
    props.getField(props.user.id);
  }, [visible]);

  const handleSubmit = (data) => {
    let tmp = data;
    tmp['user_id'] = props.user.id;
    if (data.ID) {
      props.updateField(tmp);
    } else {
      props.addField(tmp);
    }
    setNewFieldModalVisible(false);
  };
  const closeNewFieldModal = () => {
    setNewFieldModalVisible(false);
  };
  const deleteField = (ID) => {
    props.deleteClientField(ID);
  };
  const editField = (item) => {
    item.is_required = parseInt(item.is_required);
    item.is_multiple = parseInt(item.is_multiple);
    item.is_add_option = parseInt(item.is_add_option);
    item.is_pre_select = parseInt(item.is_pre_select);
    seteditFieldData(item);
    setNewFieldModalVisible(true);
  };
  const newField = () => {
    seteditFieldData(tempdatas);
    setNewFieldModalVisible(true);
  }; 
  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      title={<b style={{ fontSize: 22 }}>Client Fields</b>}
      width={830}
      footer={null}
    >
      <Row className={'gx-flex-sm-row'}>
        <Col span={21} style={{ paddingTop: 10 }}>
          <b style={{ paddingLeft: 10 }}>Specify what info about your client you want to capture.</b>
        </Col>
        <Col>
          <Button
            onClick={() => {
              newField();
            }}
            type={'primary'}
            style={{ width: 90, marginLeft: -4 }}
          >
            New Field
          </Button>
        </Col>
      </Row>
      {
        props.clientFieldData &&

        <List
          dataSource={props.clientFieldData}
          renderItem={(item) => (
            <List.Item key={item.ID}>
              <List.Item.Meta
                avatar={
                  <Switch
                    checked={item.enable != 0}
                    style={{ marginTop: 12, marginRight: 35 }}
                    onChange={() => {
                      props.enableField(item.ID);
                    }}
                  ></Switch>
                }
                title={<b>{item.name}</b>}
                description={
                  <span>
                    require <b>{item.is_required != '0' ? 'Yes' : 'No'}</b>
                  </span>
                }
              />
              <div>
                <Button
                  onClick={() => {
                    editField(item);
                  }}
                  type={'primary'}
                  size={'small'}
                  style={{
                    width: 90,
                    paddingBottom: 25,
                    fontSize: 13,
                    marginBottom: 4,
                  }}
                >
                  Edit
              </Button>
                <Button
                  onClick={() => {
                    deleteField(item.ID);
                  }}
                  size={'small'}
                  type={'default'}
                  style={{ width: 90, paddingBottom: 25, fontSize: 13 }}
                >
                  Delete
              </Button>
              </div>
            </List.Item>
          )}
        ></List>
      }

      <NewFieldModal
        visible={NewFieldModalVisible}
        handleSubmit={handleSubmit}
        closeModal={closeNewFieldModal}
        modalData={JSON.stringify(editFieldData)}
      ></NewFieldModal>
    </Modal>
  );
};
const mapStateToProps = ({ settings, auth }) => {
  const { user } = auth;
  const { clientFieldData } = settings;
  return { clientFieldData, user };
};

export default connect(mapStateToProps, {
  addField,
  getField,
  updateField,
  enableField,
  deleteClientField,
})(SettingClientFieldModal);
