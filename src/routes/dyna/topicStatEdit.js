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
      if (formData.dynaTopicStatId >= 0) {
        fieldsValue.dynaTopicStatId = formData.dynaTopicStatId;
        update(fieldsValue);
      } else {
        add(fieldsValue);
      }
    });
  };

  const cancelHandle = () => {
    form.resetFields();
    closeModal();
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
    <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={cancelHandle}>
      <FormItem {...formItemLayout} label="浏览数">
        {form.getFieldDecorator('numView', {
          initialValue: formData.numView || '',
          rules: [
            {
              required: true,
              message: '请输入浏览数...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="参与评论数">
        {form.getFieldDecorator('numComment', {
          initialValue: formData.numComment || '',
          rules: [
            {
              required: true,
              message: '请输入参与评论数...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="总回复数">
        {form.getFieldDecorator('numReply', {
          initialValue: formData.numReply || '',
          rules: [
            {
              required: true,
              message: '请输入总回复数...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="总参与数">
        {form.getFieldDecorator('numTotal', {
          initialValue: formData.numTotal || '',
          rules: [
            {
              required: false,
              message: '请输入总参与数...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
