import React, { useEffect, useState } from 'react';
import { List, Avatar, Skeleton, Select, Tooltip, Modal, Button, Typography } from 'antd';
import { connect } from 'react-redux';
import { getServiceData, addService, updateService, deleteService } from '../../../appRedux/actions/Settings';
import { baseURL } from '../../../util/Api';

// component
import ServiceForm from '../../../components/Settings/Services/ServiceForm';

// icons
import Pencil from '@2fd/ant-design-icons/lib/Pencil';
import Delete from '@2fd/ant-design-icons/lib/Delete';
import InformationOutline from '@2fd/ant-design-icons/lib/InformationOutline';

const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;
let dataByCategory = null;

const ServiceSettings = (props) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    initialData();
  }, []);

  useEffect(() => {
    groupData();
  }, [props.serviceData]);

  const initialData = async () => {
    await props.getServiceData(props.user.id);
  };

  const groupData = () => {
    if (props.serviceData) {
      dataByCategory = props.serviceData.reduce((returnValues, item) => {
        if (!returnValues[item.category_name]) returnValues[item.category_name] = [];
        returnValues[item.category_name].push(item);
        return returnValues;
      }, {});

      setOptions(Object.keys(dataByCategory));
    }
    setData(dataByCategory);
  };

  const handleEdit = (values) => {
    setFormData(values);
    setVisible(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure delete this service?',
      icon: <InformationOutline />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
      await props.deleteService(id);
      await props.getServiceData(props.user.id)
      },
    });
  };

  const handleClick = () => {
    setFormData(null);
    setVisible(true);
  };

  const handleChange = (option) => {
    if (option !== 'all') {
      setData({ [option]: dataByCategory[option] });
    } else {
      setData(dataByCategory);
    }
  };

  const handleSubmit = async (values) => {
    setVisible(false);
    if (values.id){
       await props.updateService(values); 
       await props.getServiceData(props.user.id);
      }
     else await props.addService(values,props.user.id);
  };

  return (
    <div className={'setting-form__wrapper resource-setting__form'}>
      <div className={'setting-form__header gx-d-flex gx-justify-content-between'}>
        <span>Services</span>
        <Button type={'primary'} onClick={handleClick}>
          Add Service
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
              Show all services
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
                    // console.log(item.img_path)
                    <List.Item
                      actions={[
                        <Tooltip title={'Edit'} color={'#fff'} key={key}>
                          <Pencil style={{ fontSize: 24 }} onClick={() => handleEdit(item)} />
                        </Tooltip>,
                        <Tooltip title={'Delete'} color={'#fff'} key={key}>
                          <Delete
                            className={'gx-text-danger'}
                            style={{ fontSize: 24 }}
                            onClick={() => handleDelete(item.id)}
                          />
                        </Tooltip>,
                      ]}
                    >
                      <Skeleton avatar title={false} loading={props.loading} active>
                        <List.Item.Meta
                        
                          avatar={
                            item.img_path && item.img_path != '' && item.img_path != 'undefined' && item.img_path != null ? (
                              <Avatar
                                src={`${baseURL}service/avatar/${item.id}`}
                                size={'large'}
                                className={'testat-'+item.img_path}
                                style={{ backgroundColor: 'gray' }}
                              />
                            ) : (
                              <Avatar
                                shape="square"
                                style={{
                                  borderRadius: 3,
                                  backgroundColor: item.color,
                                }}
                                size={'large'}
                              />
                            )
                          }
                          title={item.name?.charAt(0).toUpperCase() + item.name?.slice(1)}
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
      <ServiceForm
        visible={visible}
        title={formData ? 'Add Service' : 'Edit Service'}
        formData={formData}
        categoryNames={options}
        handleSubmit={handleSubmit}
        closeModal={() => {
          setVisible(false);
        }}
      />
      {/* {console.log(formdata)} */}
    </div>
  );
};

const mapStateToProps = ({ settings, commonData,auth}) => {
  const {user}=auth;
  const { serviceData } = settings;
  const { loading } = commonData;
  return { serviceData, loading,user };
};

export default connect(mapStateToProps, {
  getServiceData,
  addService,
  updateService,
  deleteService,
})(ServiceSettings);
