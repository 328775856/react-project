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

const TimeToPublishForm = Form.create()(props => {
  const { timeToPushModalVisible, form, timeToPublish, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      fieldsValue.publishDate = fieldsValue.publishDate ?
        fieldsValue.publishDate.format('YYYYMMDD') :
        '';
      fieldsValue.findRecommendId = formData.findRecommendId;
      timeToPublish(fieldsValue);
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
      visible={timeToPushModalVisible}
      onOk={okHandle}
      onCancel={() => closeModal('timeToPushModalVisible')}
    >
      <FormItem {...formItemLayout} label="定时发布">
        {form.getFieldDecorator('publishDate', {
          rules: [
            {
              required: false,
              message: '请输入定时发布...'
            }
          ]
        })(<DatePicker format="YYYY-MM-DD" />)}
      </FormItem>
    </Modal>
  );
});

export default TimeToPublishForm;
