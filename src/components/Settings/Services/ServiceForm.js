import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, AutoComplete } from 'antd';
import { CirclePicker } from 'react-color';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { baseURL } from '../../../util/Api';

// icons
import Close from '@2fd/ant-design-icons/lib/Close';
import CameraPlus from '@2fd/ant-design-icons/lib/CameraPlus';

const { TextArea } = Input;

const ServiceForm = (props) => {
  const [form] = Form.useForm();

  const [options, setOptions] = useState([]);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [color, setColor] = useState('');
  const { title, state, visible, formData, handleSubmit, closeModal, categoryNames } = props;

  useEffect(() => {
    const tmp = [];
    if (visible) {
      // console.log(formData);
      form.setFieldsValue(formData);
      categoryNames.map((item) => tmp.push({ value: item }));
      setOptions(tmp);
      if (formData) setColor(formData.color);
    } else {
      setPicture(null);
      setImgData(null);
      setColor('');
      form.resetFields();
    }
  }, [visible]);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const handelClick = () => {
    console.log("first");
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        handleSubmit({ ...values, picture: picture, color: color });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      title={title}
      onCancel={closeModal}
      forceRender
      footer={[
        <Button key="submit" type="primary" onClick={handelClick}>
          {state ? 'Add' : 'Save'}
        </Button>,
      ]}
      width={800}
    >
      <Form form={form} layout={'vertical'}>
        <Row className={'gx-flex-sm-row'}>
          <Col className={'gx-p-2'} span={16}>
            <Form.Item
              name="name"
              label="Service Name"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input type="text" placeholder="Service Name" />
            </Form.Item>
            <Form.Item name="display_name" label="Display Name">
              <Input type="text" placeholder="Display Name" />
            </Form.Item>
            <Form.Item
              name="category_name"
              label="Category"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <AutoComplete options={options} placeholder="Category" />
            </Form.Item>
            <div className={'gx-d-flex gx-justify-content-between'}>
              <Form.Item
                className={'gx-flex-1'}
                name="email"
                label="Email"
                style={{ paddingRight: 5 }}
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input type="text" placeholder="Email" />
              </Form.Item>
              <Form.Item className={'gx-flex-1'} name="phone" label="Phone" style={{ paddingLeft: 5 }}>
                <PhoneInput
                  country={'ca'}
                  inputStyle={{
                    width: '100%',
                    height: 40,
                    borderRadius: 3,
                    border: '1px solid #d9d9d9',
                  }}
                  buttonStyle={{ backgroundColor: '#fff', borderRight: 0 }}
                />
              </Form.Item>
            </div>
            <Form.Item name="description" label="Description">
              <TextArea autoSize={{ minRows: 5, maxRows: 5 }} placeholder="Description" />
            </Form.Item>
            <Form.Item name="id" hidden={true}>
              <Input placeholder="ID" />
            </Form.Item>
          </Col>
          <Col className={'gx-p-2'} span={8}>
            <Form.Item name="image" label="Image">
              <Input
                type="file"
                id={'raised-button-file'}
                className={'gx-d-none'}
                onChange={handleChange}
                accept="image/*"
              />
              <label className={'img-preview__wrapper'} htmlFor={'raised-button-file'}>
                {formData && formData.img_path ? (
                  <img className={'img__preview'} src={`${baseURL}service/avatar/${formData.id}`} />
                ) : (
                  imgData && <img className={'img__preview'} src={imgData} />
                )}
                {!formData
                  ? !imgData && <CameraPlus style={{ color: '#595959', fontSize: 30 }} />
                  : !imgData && !formData.img_path && <CameraPlus style={{ color: '#595959', fontSize: 30 }} />}
              </label>
              <div className={'upload-button__wrapper'} style={{ textAlign: 'center' }}>
                <label className={'upload__button'} htmlFor={'raised-button-file'}>
                  Upload Image...
                </label>
              </div>
            </Form.Item>
            <Form.Item name="color" label="Color">
              <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default ServiceForm;
