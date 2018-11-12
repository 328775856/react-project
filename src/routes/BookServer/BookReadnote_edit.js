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
      if (formData.bookReadnoteId >= 0) {
        fieldsValue.bookReadnoteId = formData.bookReadnoteId;
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
      <FormItem {...formItemLayout} label="账号id">
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || '',
          rules: [
            {
              required: true,
              message: '请输入账号id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="图书用户id">
        {form.getFieldDecorator('bookUserId', {
          initialValue: formData.bookUserId || '',
          rules: [
            {
              required: true,
              message: '请输入图书用户id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="笔记标题">
        {form.getFieldDecorator('notesTitle', {
          initialValue: formData.notesTitle || '',
          rules: [
            {
              required: true,
              message: '请输入笔记标题...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="原文内容/笔记内容">
        {form.getFieldDecorator('bookContent', {
          initialValue: formData.bookContent || '',
          rules: [
            {
              required: true,
              message: '请输入原文内容/笔记内容...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="批注内容/笔记内容">
        {form.getFieldDecorator('annotation', {
          initialValue: formData.annotation || '',
          rules: [
            {
              required: true,
              message: '请输入批注内容/笔记内容...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="原文范围(原文内容的起始位置描述)">
        {form.getFieldDecorator('srcRange', {
          initialValue: formData.srcRange || '',
          rules: [
            {
              required: true,
              message: '请输入原文范围(原文内容的起始位置描述)...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否隐藏（1是0否, 默认为0）">
        {form.getFieldDecorator('isHidden', {
          initialValue: formData.isHidden || '',
          rules: [
            {
              required: true,
              message: '请输入是否隐藏（1是0否, 默认为0）...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="笔记分组标签(保留)">
        {form.getFieldDecorator('notesLabelid', {
          initialValue: formData.notesLabelid || '',
          rules: [
            {
              required: true,
              message: '请输入笔记分组标签(保留)...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="审核状态(0:未审，1：审核通过，2：审核不通过),字典">
        {form.getFieldDecorator('auditStatus', {
          initialValue: formData.auditStatus || '',
          rules: [
            {
              required: true,
              message: '请输入审核状态(0:未审，1：审核通过，2：审核不通过),字典...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="审核时间">
        {form.getFieldDecorator('auditTime', {
          initialValue: formData.auditTime || '',
          rules: [
            {
              required: true,
              message: '请输入审核时间...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="审核人">
        {form.getFieldDecorator('auditBy', {
          initialValue: formData.auditBy || '',
          rules: [
            {
              required: true,
              message: '请输入审核人...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="审核不通过原因">
        {form.getFieldDecorator('auditReason', {
          initialValue: formData.auditReason || '',
          rules: [
            {
              required: true,
              message: '请输入审核不通过原因...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="昵称">
        {form.getFieldDecorator('nickname', {
          initialValue: formData.nickname || '',
          rules: [
            {
              required: true,
              message: '请输入昵称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="作者">
        {form.getFieldDecorator('author', {
          initialValue: formData.author || '',
          rules: [
            {
              required: true,
              message: '请输入作者...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="章节">
        {form.getFieldDecorator('chapter', {
          initialValue: formData.chapter || '',
          rules: [
            {
              required: true,
              message: '请输入章节...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
