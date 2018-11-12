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
  const {
    modalVisible,
    form,
    add,
    update,
    closeModal,
    formData,
    title,
    isEmptyObject,
    options
  } = props;
  let opt1 = [];
  let opt2 = [];
  let opt3 = [];
  if (!isEmptyObject(options)) {
    opt1 = options['5'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  let opt10 = [];
  opt10.push(<Option key="-1">请选择</Option>);
  opt10.push(opt1);
  const okHandle = () => {
    form.resetFields();
    closeModal();
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
  const checkContent = (rule, value, callback) => {
    if (value === '-1') {
      callback('请选择!');
      return;
    }
    callback();
  };
  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle}
      footer={null}
    >
      <FormItem {...formItemLayout} label="书名">
        {form.getFieldDecorator('bookName', {
          initialValue: formData.bookName || ''
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="求书内容">
        {form.getFieldDecorator('requestContent', {
          initialValue: formData.requestContent || ''
        })(<Input.TextArea style={{ height: 150 }} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="处理状态">
        {form.getFieldDecorator('isReply', {
          initialValue: formData.isReply === undefined ? '0' : `${formData.isReply}` || ''
        })(<Select style={{ width: '150px' }}>{opt10}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="回复时间">
        {form.getFieldDecorator('replyTime', {
          initialValue: formData.replyTime || '暂无回复时间'
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="回复内容">
        {form.getFieldDecorator('replyContent', {
          initialValue: formData.replyContent || '暂无回复内容'
        })(<Input.TextArea style={{ height: 150 }} />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
