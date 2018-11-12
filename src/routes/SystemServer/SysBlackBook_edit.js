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
  const { modalVisible, form, addSave, updateSave, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.blackBookId >= 0) {
        fieldsValue.blackBookId = formData.blackBookId;
        updateSave(fieldsValue);
      } else {
        addSave(fieldsValue);
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
      <FormItem {...formItemLayout} label="书名">
        {form.getFieldDecorator('bookName', {
          initialValue: formData.bookName || '',
          rules: [{ required: true, message: '请输入书名...' }]
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="备注">
        {form.getFieldDecorator('remark', {
          initialValue: formData.remark || '',
          rules: [{ required: true, message: '请输入备注...' }]
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
