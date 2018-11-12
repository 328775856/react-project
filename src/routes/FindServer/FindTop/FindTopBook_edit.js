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
    modalVisible: false
  };

  closeSelectModal = () => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      modalVisible: false
    });
  };

  render() {
    const { modalVisible, form, update, closeModal, formData, title } = this.props;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.findTopId >= 0) {
          // eslint-disable-next-line no-param-reassign
          fieldsValue.findTopId = formData.findTopId;
          update(fieldsValue);
        } else {
          closeModal();
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
        <FormItem {...formItemLayout} label="排序">
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo || '',
            rules: [
              {
                required: true,
                message: '请输入序号...'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Modal>
    );
  }
}
