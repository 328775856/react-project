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
const CreateAuditForm = Form.create()(props => {
  const { modalVisible, form, audit, closeModal, formData, title, isEmptyObject, options } = props;
  let opt1 = [];
  if (!isEmptyObject(options)) {
    console.log(options);
    const dictOpt = JSON.parse(options.dictDatas);
    opt1 = dictOpt['36'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  const opt10 = [];
  opt10.push(<Option key="-1">请选择</Option>);
  opt10.push(opt1);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.bookUserId >= 0) {
        fieldsValue.bookUserId = formData.bookUserId;
        audit(fieldsValue);
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
        label="系统ID"
        style={{ display: 'none' }}
      >
        {form.getFieldDecorator('bookUserId', {
          initialValue: formData.bookUserId || ''
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="用户ID"
        style={{ display: 'none' }}
      >
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || ''
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="图书ID"
        style={{ display: 'none' }}
      >
        {form.getFieldDecorator('bookId', {
          initialValue: formData.bookId || ''
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="是否通过"
      >
        {form.getFieldDecorator('isPass', {
          initialValue: formData.isPass === undefined ? '-1' : `${formData.isPass}` || '',
          rules: [
            {
              required: true,
              message: '请选择是否通过...'
            },
            {
              validator: checkContent.bind(this)
            }
          ]
        })(<Select style={{ width: '150px' }}>{opt10}</Select>)}
      </FormItem>
    </Modal>
  );
});
export default CreateAuditForm;
