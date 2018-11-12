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
      if (formData.priPackageId >= 0) {
        fieldsValue.priPackageId = formData.priPackageId;
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
      <FormItem {...formItemLayout} label="系统id">
        {form.getFieldDecorator('priPackageId', {
          initialValue: formData.priPackageId || '',
          rules: [
            {
              required: true,
              message: '请输入系统id...'
            }
          ]
        })(<Input disabled={formData.priPackageId >= 0} />)}
      </FormItem>

      <FormItem {...formItemLayout} label="包名">
        {form.getFieldDecorator('packageName', {
          initialValue: formData.packageName || '',
          rules: [
            {
              required: true,
              message: '请输入包名...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
