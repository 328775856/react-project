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
const CreateHandleForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    add,
    update,
    closeModal,
    formData,
    title,
  } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.userFeedbackId >= 0) {
        fieldsValue.userFeedbackId = formData.userFeedbackId;
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
      <FormItem {...formItemLayout} label="处理内容">
        {form.getFieldDecorator('dealContent', {
          initialValue: formData.dealContent || '',
        })(<Input.TextArea style={{height:150}} />)}
      </FormItem>
    </Modal>
  );
});
export default CreateHandleForm;
