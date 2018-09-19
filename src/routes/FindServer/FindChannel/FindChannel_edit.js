/* eslint-disable no-param-reassign,radix */
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
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
  Divider,
  Table
} from 'antd';

const channelType = { 1: '专题', 2: '书单', 3: '图书推荐', 4: '好书推荐', 5: '榜单' };

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  render() {
    const {
      modalVisible,
      form,
      add,
      update,
      closeModal,
      formData,
      title,
      isEmptyObject
    } = this.props;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.findChannelId >= 0) {
          fieldsValue.findChannelId = formData.findChannelId;
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
          label="栏目名称"
        >
          {form.getFieldDecorator('channelName', {
            initialValue: formData.channelName || '',
            rules: [{ required: true, message: '请输入栏目名字...' }]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布局类型:"
        >
          {form.getFieldDecorator('layoutType', {
            initialValue: formData.layoutType,
            // formData.layoutType === undefined ? '' : formData.layoutType === 0 ? '横排' : '竖排',
            rules: [{ required: true, message: '请选择布局类型...' }]
          })(
            <Select
              placeholder=""
              style={{ width: '150px' }}
            >
              <Select.Option
                key={0}
                value={0}
              >
                横排
              </Select.Option>
              <Select.Option
                key={1}
                value={1}
              >
                竖排
              </Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="栏目类型:"
        >
          {form.getFieldDecorator('channelType', {
            initialValue: formData.channelType,
            // formData.channelType === undefined ? '' : channelType[formData.channelType],
            rules: [{ required: true, message: '请选择栏目类型...' }]
          })(
            <Select
              placeholder=""
              style={{ width: '150px' }}
            >
              <Select.Option
                key={1}
                value={1}
              >
                专题
              </Select.Option>
              <Select.Option
                key={2}
                value={2}
              >
                书单
              </Select.Option>
              <Select.Option
                key={3}
                value={3}
              >
                图书推荐
              </Select.Option>
              <Select.Option
                key={4}
                value={4}
              >
                好书推荐
              </Select.Option>
              <Select.Option
                key={5}
                value={5}
              >
                榜单
              </Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="栏目排序"
        >
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo || 0,
            rules: [{ required: true, message: '请输入栏目排序...' }]
          })(<InputNumber />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="展示个数"
        >
          {form.getFieldDecorator('numRecord', {
            initialValue: formData.numRecord || 0,
            rules: [{ required: true, message: '请输入展示个数...' }]
          })(<InputNumber />)}
        </FormItem>
      </Modal>
    );
  }
}
