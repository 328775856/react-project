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

const FavorForm = Form.create()(props => {
  const { favorModalVisible, form, closeModal, formData, title, setFavorNum } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.dynaTopicCommentId = formData.dynaTopicCommentId;
      setFavorNum(fieldsValue);
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
      visible={favorModalVisible}
      onOk={okHandle}
      onCancel={() => closeModal('favorModalVisible')}
    >
      <FormItem
        {...formItemLayout}
        label="点赞数"
      >
        {form.getFieldDecorator('numFavor', { initialValue: formData.numFavor || '' })(<Input />)}
      </FormItem>
    </Modal>
  );
});

export default FavorForm;
