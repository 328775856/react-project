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
    opt2 = options['11'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    opt3 = options['12'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  let opt10 = [];
  opt10.push(<Option key="-1">请选择</Option>);
  opt10.push(opt1);
  let opt20 = [];
  opt20.push(<Option key="-1">请选择</Option>);
  opt20.push(opt2);
  let opt30 = [];
  opt30.push(<Option key="-1">请选择</Option>);
  opt30.push(opt3);
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
      <FormItem {...formItemLayout} label="昵称">
        {form.getFieldDecorator('nickname', {
          initialValue: formData.nickname || ''
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="藏书馆图书名">
        {form.getFieldDecorator('bookName', {
          initialValue: formData.bookName || ''
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="错误类型">
        {form.getFieldDecorator('errorType', {
          initialValue: formData.errorType === undefined ? '-1' : `${formData.errorType}` || ''
        })(<Select style={{ width: '150px' }}>{opt20}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="错误原因">
        {form.getFieldDecorator('errorContent', {
          initialValue: formData.errorContent || ''
        })(<Input.TextArea style={{ height: 150 }} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="处理状态">
        {form.getFieldDecorator('dealStatus', {
          initialValue: formData.dealStatus === undefined ? '0' : `${formData.dealStatus}` || ''
        })(<Select style={{ width: '150px' }}>{opt10}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="处理时间">
        {form.getFieldDecorator('dealTime', {
          initialValue: formData.dealTime || '暂无处理时间'
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="处理内容">
        {form.getFieldDecorator('dealContent', {
          initialValue: formData.dealContent || '暂无处理内容'
        })(<Input.TextArea style={{ height: 150 }} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="操作人">
        {form.getFieldDecorator('dealByName', {
          initialValue: formData.dealByName || '暂无处理'
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="终端类型">
        {form.getFieldDecorator('terminalType', {
          initialValue:
            formData.terminalType === undefined ? '-1' : `${formData.terminalType}` || ''
        })(<Select style={{ width: '150px' }}>{opt30}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="终端唯一">
        {form.getFieldDecorator('terminalSn', {
          initialValue: formData.terminalSn || ''
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="终端名称">
        {form.getFieldDecorator('terminalName', {
          initialValue: formData.terminalName || ''
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="app版本号">
        {form.getFieldDecorator('appVersionNo', {
          initialValue: formData.appVersionNo || ''
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="app版本名称">
        {form.getFieldDecorator('appVersionName', {
          initialValue: formData.appVersionName || ''
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
