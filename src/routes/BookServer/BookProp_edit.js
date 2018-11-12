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
  let opt = [];
  if (!isEmptyObject(options)) {
    opt = options.map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  const opt1 = [];
  opt1.push(<Option key="-1">请选择</Option>);
  opt1.push(opt);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.bookPropId >= 0) {
        fieldsValue.bookPropId = formData.bookPropId;
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

  const checkContent = (rule, value, callback) => {
    if (value === '-1') {
      callback('请选择!');
      return;
    }
    callback();
  };

  return (
    <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={cancelHandle}>
      <FormItem {...formItemLayout} label="名称">
        {form.getFieldDecorator('propName', {
          initialValue: formData.propName || '',
          rules: [
            {
              required: true,
              message: '请输入名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否可借">
        {form.getFieldDecorator('isLend', {
          initialValue: formData.isLend === undefined ? '1' : `${formData.isLend}` || '',
          rules: [
            {
              required: true,
              message: '请选择是否可借...'
            },
            {
              validator: checkContent.bind(this)
            }
          ]
        })(<Select style={{ width: '150px' }}>{opt1}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="借阅天数">
        {form.getFieldDecorator('dayLend', {
          initialValue: formData.dayLend || '',
          rules: [
            {
              required: true,
              message: '请输入借阅天数...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否限制">
        {form.getFieldDecorator('isLimit', {
          initialValue: formData.isLimit === undefined ? '1' : `${formData.isLimit}` || '',
          rules: [
            {
              required: true,
              message: '请选择是否限制...'
            },
            {
              validator: checkContent.bind(this)
            }
          ]
        })(<Select style={{ width: '150px' }}>{opt1}</Select>)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
