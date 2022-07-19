import React, { useEffect, useState } from 'react';
import { List, Avatar, Badge, Select, Tooltip, Skeleton, Modal, Button, Typography } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment'
import {
  getResourceData,
  addResource,
  updateResource,
  updateResourceAvailable,
  deleteResource,
  getServiceData,
} from '../../appRedux/actions/Settings';
import { baseURL } from '../../util/Api';

// component
import ResourceForm from '../../components/Settings/Resources/ResourceForm';
import CustomeAwayModal from '../../components/Settings/Resources/CustomAwayModal'
import AvatarWithName from '../../components/common/AvatarWithName';

// icons
import Pencil from '@2fd/ant-design-icons/lib/Pencil';
import Delete from '@2fd/ant-design-icons/lib/Delete';
import InformationOutline from '@2fd/ant-design-icons/lib/InformationOutline';
import { DownCircleTwoTone } from '@ant-design/icons'

const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;
let resourceDataByCategory = null;

const ResourceSettings = (props) => {
  const [visible, setVisible] = useState(false);
  const [customVisible, setCustomVisible] = useState(false);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState([]);
  const [FormData, setFormData] = useState(null);
  const [selectedResourceID, setSelectedResourceID] = useState(null);
  const availablityClass = ['green__badge', 'orange__badge', 'red__badge'];
  const availablityText = ['Available', 'Away', 'Busy'];



  useEffect(() => {
    initialData();
  }, []);

  useEffect(() => {
    groupData();
  }, [props.resourceData]);

  const initialData = async () => {
    await props.getResourceData(props.user.id);
    await props.getServiceData();
  };

  const groupData = () => {
    if (props.resourceData) {
      resourceDataByCategory = props.resourceData.reduce((returnValues, item) => {
        if (!returnValues[item.category_name]) returnValues[item.category_name] = [];
        returnValues[item.category_name].push(item);
        return returnValues;
      }, {});

      setOptions(Object.keys(resourceDataByCategory));
    }
    setData(resourceDataByCategory);
  };
console.log(data)
  const handleEdit = (values) => {
    setFormData(values);
    console.log(values)

    setVisible(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure delete this resource?',
      icon: <InformationOutline />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await props.deleteResource(id);
      },
    });
  };

  const handleClick = () => {
    setFormData(null);
    setVisible(true);
  };

  const handleChange = (option) => {
    if (option !== 'all') {
      setData({ [option]: resourceDataByCategory[option] });
    } else {
      setData(resourceDataByCategory);
    }
  };

  const handleSubmit = async (values) => {
    setVisible(false);
    console.log(values, props.user);
    var user_id = props.user.id;
    if (values.ID) await props.updateResource(values);
    else await props.addResource(values,user_id);
  };
  const handleAvailableUpdate = async (values) => {
    var submitData = "Custom," + moment(values['Date']).format("YYYY-MM-DD") + " " + moment(values['Time']).format("h:mm a");
    await props.updateResourceAvailable({ ID: values['resource_id'], available: submitData });
    setCustomVisible(false);
  };

  const availableChange = async (type, resource_id) => {
    if (type == "custom") {
      setSelectedResourceID(resource_id);
      setCustomVisible(true);
      return;
    }
    var submitData = type;
    if (type == "BackIn1Hour") {
      submitData += "," + moment().add(1, 'hours').format("YYYY-MM-DD h:mm a");
    }
    else if (type == "BackIn30Min") {
      submitData += "," + moment().add(30, 'minutes').format("YYYY-MM-DD h:mm a");
    }
    await props.updateResourceAvailable({ ID: resource_id, available: submitData });
  }

  const getAvailableOptions = (type) => {
    if (type == undefined) {
      var tempOption = [
        ['Away', 'set as away'],
        ['Busy', 'set as busy'],
        ['BackIn30Min', 'Back in 30 min'],
        ['BackIn1Hour', 'Back in 1 hour'],
        ['custom']
      ];
      return tempOption;
    }
    else if (type == "Away") {
      var tempOption = [
        ['Available', 'set as available'],
        ['Busy', 'set as busy'],
      ];
      return tempOption;
    }
    else if (type == "Busy") {
      var tempOption = [
        ['Available', 'set as available'],
        ['Away', 'set as away'],
        ['BackIn30Min', 'Back in 30 min'],
        ['BackIn1Hour', 'Back in 1 hour'],
        ['custom']
      ];
      return tempOption;
    }
    else if (type.startsWith('BackIn30Min')) {
      var tempOption = [
        ['Back', 'back at ' + type.split(",")[1]],
        ['Available', 'set as available'],
        ['Busy', 'set as busy'],
      ];
      return tempOption;
    }
    else if (type.startsWith('BackIn1Hour')) {
      var tempOption = [
        ['Back', 'back at ' + type.split(",")[1]],
        ['Available', 'set as available'],
        ['Busy', 'set as busy'],
      ];
      return tempOption;
    }
    else if (type.startsWith('Custom')) {
      var tempOption = [
        ['Back', 'back at ' + type.split(",")[1]],
        ['Available', 'set as available'],
        ['Busy', 'set as busy'],
      ];
      return tempOption;
    }
    else {
      var tempOption = [
        ['Away', 'set as away'],
        ['Busy', 'set as busy'],
        ['BackIn30Min', 'Back in 30 min'],
        ['BackIn1Hour', 'Back in 1 hour'],
        ['custom']
      ];
      return tempOption;
    }
  }
  const isAvailable = (type) => {
    if (type == undefined || type == "Available")
      return 0;
    else if (type.startsWith('BackIn1Hour') || type.startsWith('BackIn30Min') || type.startsWith('Custom') || type == "Away")
      return 1;
    else if (type == "Busy")
      return 2;
    else
      return 0;
  }
  
  return (
    <div className={'setting-form__wrapper resource-setting__form'}>
      <div className={'setting-form__header gx-d-flex gx-justify-content-between'}>
        <span>Resources</span>
        <Button type={'primary'} onClick={handleClick}>
          Add Resource
        </Button>
      </div>
      <div className={'setting-form__body'}>
        {options.length > 0 && (
          <Select
            className={'category-name__select'}
            size={'large'}
            onChange={handleChange}
            defaultValue={'all'}
            style={{ width: 300 }}
          >
            <Option value={'all'} key={'all'}>
              Show all resoures
            </Option>
            {options.map((item, key) => (
              <Option value={item} key={key}>
                {item}
              </Option>
            ))}
          </Select>
        )}
        {data &&
          Object.keys(data).map((key) => {
            return (
              <>
                <Title level={5} className={'category-name__wrapper'}>
                  {key}&nbsp;({data[key].length})
                </Title>
                <List
                  key={key}
                  className="item-list__wrapper"
                  itemLayout="horizontal"
                  dataSource={data[key]}
                  renderItem={(item) => (
                    
                    <List.Item
                      actions={[
                        <Select
                          dropdownMatchSelectWidth={false}
                          value={
                            <span style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                              <div className={availablityClass[isAvailable(item.available)]}></div>
                              <label>{availablityText[isAvailable(item.available)]}</label>
                            </span>
                          }
                          clearIcon={<span>1</span>}
                          style={{ width: 150 }}
                          onChange={(e) => { availableChange(e, item.ID) }}
                        >
                          {
                            getAvailableOptions(item.available).map(option => {
                              return <Option key={option[0]} disabled={(option[0] == "Back")}>{option[1]}</Option>
                            })
                          }
                        </Select>,
                        <Tooltip title={'Edit'} color={'#fff'} key={key}>
                          <Pencil style={{ fontSize: 24 }} onClick={() => handleEdit(item)} />
                        </Tooltip>,
                        <Tooltip title={'Delete'} color={'#fff'} key={key}>
                          <Delete
                            className={'gx-text-danger'}
                            style={{ fontSize: 24 }}
                            onClick={() => handleDelete(item.ID)}
                          />
                        </Tooltip>,
                      ]}
                    >
                      <Skeleton avatar title={false} loading={props.loading} active>
                        {console.log(item)}
                        <List.Item.Meta
                          avatar={
                            item.img_path ? (
                              <Badge className={'avatar__badge'} color={'green'} dot>
                                <Avatar
                                  src={`${baseURL}resource/avatar/${item.ID}?update=${new Date().valueOf()}`}
                                  size={'large'}
                                  style={{ backgroundColor: 'gray' }}
                                />
                              </Badge>
                            ) : (
                                <Badge className={'avatar__badge'} color={'green'} dot>
                                  <AvatarWithName name={item.name} />
                                </Badge>
                              )
                          }
                          title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                          description={item.description}
                        />
                      
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </>
            );
          })}
      </div>
      <ResourceForm
        visible={visible}
        title={'Add Resource'}
        formData={FormData}
        categoryNames={options}
        handleSubmit={handleSubmit}
        serviceData={props.serviceData}
        closeModal={() => {
          setVisible(false);
        }}
      />
      <CustomeAwayModal
        visible={customVisible}
        closeModal={() => {
          setCustomVisible(false);
        }}
        handleSubmit={handleAvailableUpdate}
        ID={selectedResourceID}
      ></CustomeAwayModal>
    </div>
  );
};

const mapStateToProps = ({ settings, commonData, auth }) => {
  const { user } = auth;
  const { resourceData } = settings;
  const { serviceData } = settings;
  const { loading } = commonData;
  return { resourceData, loading, serviceData, user };
};

export default connect(mapStateToProps, {
  getServiceData,
  getResourceData,
  addResource,
  updateResource,
  updateResourceAvailable,
  deleteResource,
})(ResourceSettings);
