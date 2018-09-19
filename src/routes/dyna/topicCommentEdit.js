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
      if (formData.dynaTopicCommentId >= 0) {
        fieldsValue.dynaTopicCommentId = formData.dynaTopicCommentId;
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
        label="用户id"
      >
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || '',
          rules: [
            {
              required: true,
              message: '请输入用户id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="话题id"
      >
        {form.getFieldDecorator('dynaTopicId', {
          initialValue: formData.dynaTopicId || '',
          rules: [
            {
              required: true,
              message: '请输入话题id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="回复数"
      >
        {form.getFieldDecorator('numReply', {
          initialValue: formData.numReply || '',
          rules: [
            {
              required: true,
              message: '请输入回复数...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="点赞数"
      >
        {form.getFieldDecorator('numFavor', {
          initialValue: formData.numFavor || '',
          rules: [
            {
              required: true,
              message: '请输入点赞数...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
