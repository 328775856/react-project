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
      if (formData.priFunctionId >= 0) {
        fieldsValue.priFunctionId = formData.priFunctionId;
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
      <FormItem {...formItemLayout} label="系统ID">
        {form.getFieldDecorator('priFunctionId', {
          initialValue: formData.priFunctionId || '',
          rules: [
            {
              required: true,
              message: '请输入系统ID...'
            }
          ]
        })(<Input disabled={formData.priFunctionId >= 0} />)}
      </FormItem>

      <FormItem {...formItemLayout} label="资源名称">
        {form.getFieldDecorator('functionName', {
          initialValue: formData.functionName || '',
          rules: [
            {
              required: true,
              message: '请输入资源名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
