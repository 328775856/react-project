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
      if (formData.key >= 0) {
        fieldsValue.key = formData.key;
        updateSave(fieldsValue);
      } else {
        addSave(fieldsValue);
      }
    });
  };
  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => closeModal()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="编号"
      >
        {form.getFieldDecorator('code', {
          initialValue: formData.code || '',
          rules: [{ required: true, message: '请输入编号...' }]
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="名称"
      >
        {form.getFieldDecorator('name', {
          initialValue: formData.name || '',
          rules: [{ required: true, message: '请输入名称...' }]
        })(<Input
          placeholder="请输入"
          value={formData.name}
        />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="备注"
      >
        {form.getFieldDecorator('memo', {
          initialValue: formData.memo || ''
        })(<Input
          placeholder=""
          value={formData.memo}
        />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
