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
    optionsEle = options.map(item => <Option key={item.priFunctionId}>{item.functionName}</Option>);
  }
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.priPackageItemId >= 0) {
        fieldsValue.priPackageItemId = formData.priPackageItemId;
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
        label="权限id"
      >
        {form.getFieldDecorator('priFunctionId', {
          initialValue: formData.priFunctionId || '',
          rules: [
            {
              required: true,
              message: '请输入权限id...'
            }
          ]
        })(<Select style={{ width: '150px' }}>{optionsEle}</Select>)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="过期天数"
      >
        {form.getFieldDecorator('dayExpire', {
          initialValue: formData.dayExpire || '',
          rules: [
            {
              required: true,
              message: '请输入过期天数...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
