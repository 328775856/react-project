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
      if (formData.id >= 0) {
        fieldsValue.id = formData.id;
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

  return (
    <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={cancelHandle}>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="code">
        {form.getFieldDecorator('code', {
          initialValue: formData.code || '',
          rules: [{ required: true, message: '请输入code...' }]
        })(<Input placeholder="请输入" value={formData.code} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="secret">
        {form.getFieldDecorator('secret', {
          initialValue: formData.secret || '',
          rules: [{ required: true, message: '请输入备注...' }]
        })(<Input placeholder="请输入" value={formData.secret} />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
