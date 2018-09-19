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
      if (formData.courseRelBookId >= 0) {
        fieldsValue.courseRelBookId = formData.courseRelBookId;
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
        label="课程id"
      >
        {form.getFieldDecorator('courseId', {
          initialValue: formData.courseId || '',
          rules: [
            {
              required: true,
              message: '请输入课程id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="图书id"
      >
        {form.getFieldDecorator('bookUserId', {
          initialValue: formData.bookUserId || '',
          rules: [
            {
              required: true,
              message: '请输入图书id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="顺序"
      >
        {form.getFieldDecorator('indexNo', {
          initialValue: formData.indexNo || '',
          rules: [
            {
              required: true,
              message: '请输入顺序...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="图书名"
      >
        {form.getFieldDecorator('bookName', {
          initialValue: formData.bookName || '',
          rules: [
            {
              required: true,
              message: '请输入图书名...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="封面路径"
      >
        {form.getFieldDecorator('coverPath', {
          initialValue: formData.coverPath || '',
          rules: [
            {
              required: true,
              message: '请输入封面路径...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="作者"
      >
        {form.getFieldDecorator('bookAuthor', {
          initialValue: formData.bookAuthor || '',
          rules: [
            {
              required: true,
              message: '请输入作者...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
