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
    options,
    userType
  } = props;
  let opt1 = [];
  let opt2 = [];
  let opt3 = [];
  if (!isEmptyObject(options)) {
    opt1 = options['4'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    opt2 = options['7'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    opt3 = userType.map(item => <Option key={item.userTypeId}>{item.userTypeName}</Option>);
  }
  let opt10 = [];
  opt10.push(<Option key="0">请选择</Option>);
  opt10.push(opt1);
  let opt20 = [];
  opt20.push(<Option key="0">请选择</Option>);
  opt20.push(opt2);
  let opt30 = [];
  opt30.push(<Option key="0">请选择</Option>);
  opt30.push(opt3);
  const okHandle = () => {
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

  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle}
      footer={null}
    >
      <FormItem {...formItemLayout} label="用户ID">
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || ''
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="昵称">
        {form.getFieldDecorator('nickname', {
          initialValue: formData.nickname || ''
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="用户类型">
        {form.getFieldDecorator('userTypeId', {
          initialValue: formData.userTypeId === undefined ? '0' : `${formData.userTypeId}` || ''
        })(<Select style={{ width: '150px' }}>{opt30}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="兴趣标签">
        {form.getFieldDecorator('labelName', {
          initialValue: formData.labelName || '暂无兴趣标签'
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="用户来源">
        {form.getFieldDecorator('regSource', {
          initialValue: formData.regSource === undefined ? '1' : `${formData.regSource}` || ''
        })(<Select style={{ width: '150px' }}>{opt20}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="藏书数量">
        {form.getFieldDecorator('numTotal', {
          initialValue: formData.numTotal || ''
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="最近登陆时间">
        {form.getFieldDecorator('loginDate', {
          initialValue: formData.loginDate || '暂无处理时间'
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="注册时间">
        {form.getFieldDecorator('regTime', {
          initialValue: formData.regTime || '暂无处理时间'
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="状态">
        {form.getFieldDecorator('userStatus', {
          initialValue: formData.userStatus === undefined ? '0' : `${formData.userStatus}` || ''
        })(<Select style={{ width: '150px' }}>{opt10}</Select>)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
