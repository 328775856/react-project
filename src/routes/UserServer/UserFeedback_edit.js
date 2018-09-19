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
  const opt10 = [];
  opt10.push(<Option key="-1">请选择</Option>);
  opt10.push(opt1);
  const opt20 = [];
  opt20.push(<Option key="-1">请选择</Option>);
  opt20.push(opt2);
  const opt30 = [];
  opt30.push(<Option key="-1">请选择</Option>);
  opt30.push(opt3);
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
      onCancel={() => closeModal()}
    >
      <FormItem
        {...formItemLayout}
        label="账号id"
      >
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || '',
          rules: [
            {
              required: true,
              message: '请输入账号id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="藏书馆图书id"
      >
        {form.getFieldDecorator('bookUserId', {
          initialValue: formData.bookUserId || '',
          rules: [
            {
              required: true,
              message: '请输入藏书馆图书id...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="错误类型"
      >
        {form.getFieldDecorator('errorType', {
          initialValue: formData.errorType === undefined ? '-1' : `${formData.errorType}` || '',
          rules: [
            {
              required: true,
              message: '请选择错误类型'
            },
            {
              validator: checkContent.bind(this)
            }
          ]
        })(<Select style={{ width: '150px' }}>{opt20}</Select>)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="错误原因"
      >
        {form.getFieldDecorator('errorContent', {
          initialValue: formData.errorContent || '',
          rules: [
            {
              required: true,
              message: '请输入错误原因...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="处理状态"
      >
        {form.getFieldDecorator('dealStatus', {
          initialValue: formData.dealStatus === undefined ? '0' : `${formData.dealStatus}` || '',
          rules: [
            {
              required: true,
              message: '请选择处理状态...'
            },
            {
              validator: checkContent.bind(this)
            }
          ]
        })(<Select style={{ width: '150px' }}>{opt10}</Select>)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="处理时间"
      >
        {form.getFieldDecorator('dealTime', {
          initialValue: formData.dealTime || '',
          rules: [
            {
              required: true,
              message: '请输入处理时间...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="处理内容"
      >
        {form.getFieldDecorator('dealContent', {
          initialValue: formData.dealContent || '',
          rules: [
            {
              required: true,
              message: '请输入处理内容...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="操作人"
      >
        {form.getFieldDecorator('dealBy', {
          initialValue: formData.dealBy || '',
          rules: [
            {
              required: true,
              message: '请输入操作人...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="终端类型"
      >
        {form.getFieldDecorator('terminalType', {
          initialValue:
            formData.terminalType === undefined ? '-1' : `${formData.terminalType}` || '',
          rules: [
            {
              required: true,
              message: '请选择终端类型...'
            },
            {
              validator: checkContent.bind(this)
            }
          ]
        })(<Select style={{ width: '150px' }}>{opt30}</Select>)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="终端唯一"
      >
        {form.getFieldDecorator('terminalSn', {
          initialValue: formData.terminalSn || '',
          rules: [
            {
              required: true,
              message: '请输入终端唯一...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="终端名称"
      >
        {form.getFieldDecorator('terminalName', {
          initialValue: formData.terminalName || '',
          rules: [
            {
              required: true,
              message: '请输入终端名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="app版本号"
      >
        {form.getFieldDecorator('appVersionNo', {
          initialValue: formData.appVersionNo || '',
          rules: [
            {
              required: true,
              message: '请输入app版本号...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="app版本名称"
      >
        {form.getFieldDecorator('appVersionName', {
          initialValue: formData.appVersionName || '',
          rules: [
            {
              required: true,
              message: '请输入app版本名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
