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
  Divider,
} from 'antd';
const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.sysCheckRuleId >= 0) {
        fieldsValue.sysCheckRuleId = formData.sysCheckRuleId;
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
      md: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 13 },
    },
  };

  return (
    <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={() => closeModal()}>
      <FormItem {...formItemLayout} label="规则">
        {form.getFieldDecorator('checkRule', {
          initialValue: formData.checkRule || '',
          rules: [
            {
              required: true,
              message: '请输入规则...',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="备注">
        {form.getFieldDecorator('remark', {
          initialValue: formData.remark || '',
          rules: [
            {
              required: false,
              message: '请输入备注...',
            },
          ],
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
