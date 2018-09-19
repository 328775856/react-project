import React from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider
} from 'antd';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.productTypeId >= 0) {
        fieldsValue.productTypeId = formData.productTypeId;
        update(fieldsValue);
      } else {
        add(fieldsValue);
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
      md: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 13 }
    }
  };

  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => closeModal()}
    >
      <FormItem
        {...formItemLayout}
        label="类型名称"
      >
        {form.getFieldDecorator('productTypeName', {
          initialValue: formData.productTypeName || '',
          rules: [
            {
              required: true,
              message: '请输入类型名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="描述"
      >
        {form.getFieldDecorator('productTypeDesc', {
          initialValue: formData.productTypeDesc || '',
          rules: [
            {
              required: true,
              message: '请输入描述...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="服务名"
      >
        {form.getFieldDecorator('callbackService', {
          initialValue: formData.callbackService || '',
          rules: [
            {
              required: false,
              message: '请输入服务名...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
