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

const CommendForm = Form.create()(props => {
  const { commendModalVisible, form, recommend, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      console.log(formData.dynaTopicId);
      fieldsValue.dynaTopicId = formData.dynaTopicId;
      recommend(fieldsValue);
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
      visible={commendModalVisible}
      onOk={okHandle}
      onCancel={() => closeModal('commendModalVisible')}
    >
      <FormItem {...formItemLayout} label="排序">
        {form.getFieldDecorator('indexNo', {
          initialValue: formData.indexNo || '',
          rules: [
            {
              required: true,
              message: '请输入排序值...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});

export default CommendForm;
