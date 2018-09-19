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
      if (formData.dynaTopicComplaintId >= 0) {
        fieldsValue.dynaTopicComplaintId = formData.dynaTopicComplaintId;
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
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => closeModal()}
    >
      <FormItem
        {...formItemLayout}
        label="举报内容"
      >
        {form.getFieldDecorator('complaintContent', {
          initialValue: formData.complaintContent || '',
          rules: [
            {
              required: true,
              message: '请输入举报内容...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="举报类型(字典:1,色情相关;2,不友善行为;3,广告推销;4,其他, 默认为4 )"
      >
        {form.getFieldDecorator('complaintType', {
          initialValue: formData.complaintType || '',
          rules: [
            {
              required: true,
              message:
                '请输入举报类型(字典:1,色情相关;2,不友善行为;3,广告推销;4,其他, 默认为4 )...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="举报人id"
      >
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || '',
          rules: [
            {
              required: true,
              message: '请输入举报人id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="被举报人id"
      >
        {form.getFieldDecorator('toUserId', {
          initialValue: formData.toUserId || '',
          rules: [
            {
              required: true,
              message: '请输入被举报人id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="举报状态(字典:0待处理;1已驳回,2已隐藏.默认为0)"
      >
        {form.getFieldDecorator('complaintStatus', {
          initialValue: formData.complaintStatus || '',
          rules: [
            {
              required: true,
              message: '请输入举报状态(字典:0待处理;1已驳回,2已隐藏.默认为0)...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="评论或回复id"
      >
        {form.getFieldDecorator('contentId', {
          initialValue: formData.contentId || '',
          rules: [
            {
              required: true,
              message: '请输入评论或回复id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="举报对象(字典:1评论,2回复,默认为1)"
      >
        {form.getFieldDecorator('complaintObj', {
          initialValue: formData.complaintObj || '',
          rules: [
            {
              required: true,
              message: '请输入举报对象(字典:1评论,2回复,默认为1)...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
