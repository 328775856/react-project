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
      if (formData.msgUserId >= 0) {
        fieldsValue.msgUserId = formData.msgUserId;
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
      <FormItem {...formItemLayout} label="消息标题">
        {form.getFieldDecorator('msgTitle', {
          initialValue: formData.msgTitle || '',
          rules: [
            {
              required: true,
              message: '请输入消息标题...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="消息内容">
        {form.getFieldDecorator('msgContent', {
          initialValue: formData.msgContent || '',
          rules: [
            {
              required: true,
              message: '请输入消息内容...'
            }
          ]
        })(<Input.TextArea rows={4} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="用户id">
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || '',
          rules: [
            {
              required: true,
              message: '请输入用户id...'
            }
          ]
        })(<InputNumber />)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否已读">
        {form.getFieldDecorator('isRead', {
          initialValue: formData.isRead || '',
          rules: [
            {
              required: false,
              message: '请输入是否已读...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
