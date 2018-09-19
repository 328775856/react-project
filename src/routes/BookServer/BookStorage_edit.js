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

import SelectBookStyle from '../Select/SelectBookStyle';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    bookStyleModalVisible: false
  };

  componentDidMount() {
    let opt1 = [];
    const { isEmptyObject } = this.props;
    if (!isEmptyObject(this.props.options)) {
      opt1 = this.props.map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    }
    this.setState({
      opt: opt1
    });
  }

  closeSelectBookStyleModal = () => {
    this.setState({
      bookStyleModalVisible: false
    });
  };

  callSelectBookStyleReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        bookStyleId: record[0].bookStyleId,
        bookStyleName: record[0].styleName
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectBookStyleModal();
  };

  selectBookStyleModel = () => {
    this.setState({
      bookStyleModalVisible: true
    });
  };

  render() {
    const {
      modalVisible,
      form,
      add,
      update,
      closeModal,
      formData,
      title,
      dispatch,
      options,
      isEmptyObject
    } = this.props;
    let opt1 = [];
    let opt2 = [];
    if (!isEmptyObject(options)) {
      opt1 = options['32'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
      opt2 = options['36'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    }
    const opt10 = [];
    opt10.push(<Option key="-1">请选择</Option>);
    opt10.push(opt1);

    const opt20 = [];
    opt20.push(<Option key="-1">请选择</Option>);
    opt20.push(opt2);
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.bookStorageId >= 0) {
          fieldsValue.bookStorageId = formData.bookStorageId;
          update(fieldsValue);
        } else {
          add(fieldsValue);
        }
      });
    };

    const parentMethodsForBookStyle = {
      callReturn: this.callSelectBookStyleReturn,
      closeModal: this.closeSelectBookStyleModal
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
          label="图书存放类型"
        >
          {form.getFieldDecorator('bookStorageType', {
            initialValue:
              formData.bookStorageType === undefined ? '-1' : `${formData.bookStorageType}` || '',
            rules: [
              {
                required: true,
                message: '请选择图书存放类型...'
              },
              {
                validator: checkContent.bind(this)
              }
            ]
          })(<Select style={{ width: '150px' }}>{opt10}</Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图书格式"
        >
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('bookStyleName', {
                initialValue: formData.bookStyleName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择图书格式...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col span={2}>
              <Button
                onClick={this.selectBookStyleModel}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="图书格式ID"
          style={{ display: 'none' }}
        >
          {form.getFieldDecorator('bookStyleId', { initialValue: formData.bookStyleId || '' })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="存储名"
        >
          {form.getFieldDecorator('storageName', {
            initialValue: formData.storageName || '',
            rules: [
              {
                required: true,
                message: '请输入存储名...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="存储地址"
        >
          {form.getFieldDecorator('storagePath', {
            initialValue: formData.storagePath || '',
            rules: [
              {
                required: true,
                message: '请输入存储地址...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="访问url"
        >
          {form.getFieldDecorator('accessUrl', {
            initialValue: formData.accessUrl || '',
            rules: [
              {
                required: true,
                message: '请输入访问url...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否已满"
        >
          {form.getFieldDecorator('isFull', {
            initialValue: formData.isFull === undefined ? '0' : `${formData.isFull}` || '',
            rules: [
              {
                required: true,
                message: '请选择是否已满...'
              },
              {
                validator: checkContent.bind(this)
              }
            ]
          })(<Select style={{ width: '150px' }}>{opt20}</Select>)}
        </FormItem>
        <SelectBookStyle
          {...parentMethodsForBookStyle}
          modalVisible={this.state.bookStyleModalVisible}
        />
      </Modal>
    );
  }
}
