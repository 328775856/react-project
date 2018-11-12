/* eslint-disable no-unused-vars */

import React, { PureComponent } from 'react';
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
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    // eslint-disable-next-line react/no-unused-state
    modalVisible: false,
    flag: false
  };

  addOrUpdate = () => {
    const { formData } = this.props;
    let length = formData.userTypeId;
    if (length != null) {
      this.setState({
        flag: true
      });
    } else {
      this.setState({
        flag: false
      });
    }
  };

  render() {
    const { modalVisible, form, update, closeModal, formData, title, add } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.userTypeId >= 0) {
          // eslint-disable-next-line no-param-reassign
          fieldsValue.userTypeId = formData.userTypeId;
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

    this.addOrUpdate();

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
        <FormItem {...formItemLayout} label="Id">
          {form.getFieldDecorator('userTypeId', {
            initialValue: formData.userTypeId,
            rules: [
              {
                required: true,
                message: '请输入ID...'
              }
            ]
          })(<Input disabled={this.state.flag} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="用户类型名称">
          {form.getFieldDecorator('userTypeName', {
            initialValue: formData.userTypeName || '',
            rules: [
              {
                required: true,
                message: '请输入用户类型名称...'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Modal>
    );
  }
}
