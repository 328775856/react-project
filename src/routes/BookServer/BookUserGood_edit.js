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
      if (formData.bookUserGoodId >= 0) {
        fieldsValue.bookUserGoodId = formData.bookUserGoodId;
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
      <FormItem {...formItemLayout} label="图书-用户id">
        {form.getFieldDecorator('bookUserId', {
          initialValue: formData.bookUserId || '',
          rules: [
            {
              required: true,
              message: '请输入图书-用户id...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
