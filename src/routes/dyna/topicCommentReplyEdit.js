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
      if (formData.dynaTopicCommentReplyId >= 0) {
        fieldsValue.dynaTopicCommentReplyId = formData.dynaTopicCommentReplyId;
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
      <FormItem {...formItemLayout} label="评论id">
        {form.getFieldDecorator('dynaTopicCommentId', {
          initialValue: formData.dynaTopicCommentId || '',
          rules: [
            {
              required: true,
              message: '请输入评论id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="回复内容">
        {form.getFieldDecorator('replyContent', {
          initialValue: formData.replyContent || '',
          rules: [
            {
              required: true,
              message: '请输入回复内容...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="回复者">
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || '',
          rules: [
            {
              required: true,
              message: '请输入回复者...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="创建时间">
        {form.getFieldDecorator('createTime', {
          initialValue: formData.createTime || '',
          rules: [
            {
              required: false,
              message: '请输入创建时间...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
