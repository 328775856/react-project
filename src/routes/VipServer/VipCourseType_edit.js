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
  let optionsEle = '';
  if (!isEmptyObject(options)) {
    optionsEle = options.map(item => <Option key={item.vipPackageId}>{item.packageName}</Option>);
  }
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.vipCourseTypeId >= 0) {
        fieldsValue.vipCourseTypeId = formData.vipCourseTypeId;
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

  return (
    <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={cancelHandle}>
      <FormItem {...formItemLayout} label="VIP包ID">
        {form.getFieldDecorator('vipPackageId', {
          initialValue: formData.vipPackageId || '',
          rules: [
            {
              required: true,
              message: '请输入VIP包ID...'
            }
          ]
        })(<Select style={{ width: '150px' }}>{optionsEle}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="标签名">
        {form.getFieldDecorator('typename', {
          initialValue: formData.typename || '',
          rules: [
            {
              required: true,
              message: '请输入标签名...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="顺序">
        {form.getFieldDecorator('indexNo', {
          initialValue: formData.indexNo || '',
          rules: [
            {
              required: true,
              message: '请输入顺序...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
