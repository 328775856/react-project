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
const { TextArea } = Input;
const CreateEditForm = Form.create()(props => {
  const { updateModalVisible, form, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.findBorrowBookStatId >= 0) {
        fieldsValue.findBorrowBookStatId = formData.findBorrowBookStatId;
        update(fieldsValue);
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
    <Modal title={title} visible={updateModalVisible} onOk={okHandle} onCancel={cancelHandle}>
      <FormItem {...formItemLayout} label="借阅量">
        {form.getFieldDecorator('numBorrow', {
          initialValue: formData.numBorrow,
          rules: [
            {
              required: true,
              message: '请输入推荐顺序...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="顺序">
        {form.getFieldDecorator('indexNo', {
          initialValue: formData.indexNo,
          rules: [
            {
              required: true,
              message: '请输入推荐顺序...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
