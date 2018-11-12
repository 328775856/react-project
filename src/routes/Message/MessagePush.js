import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Row,
  Col,
  Modal,
  message
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTest
}))
@Form.create()
export default class MessagePush extends PureComponent {
  state = {
    submitting: false
  };

  componentDidMount() {}

  componentWillMount() {}

  add = fields => {
    const { dispatch, paramData } = this.props;
    const params = {
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'restTableData/add',
      path: 'messgaePush/messgaePush',
      payload: params,
      callback: this.callback
    });
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  callback = () => {
    const { restTableData } = this.props;
    if (restTableData.status === 200) {
      message.success('发送成功！！');
      this.formReset();
    } else {
      message.error('请重新输入！！');
    }
  };

  render() {
    const { submitting } = this.state;
    const { form } = this.props;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        this.add(fieldsValue);
      });
    };

    let opt10 = [];
    opt10.push(<Option key="0">全部</Option>);
    opt10.push(<Option key="1">ios全部</Option>);
    opt10.push(<Option key="2">andriod全部</Option>);
    opt10.push(<Option key="3">单个用户</Option>);
    opt10.push(<Option key="4">多个用户</Option>);
    opt10.push(<Option key="5">单个标签</Option>);
    opt10.push(<Option key="6">多个标签</Option>);

    let opt20 = [];
    opt20.push(<Option key="1">系统通知</Option>);
    opt20.push(<Option key="2">系统通知</Option>);
    opt20.push(<Option key="3">图书借阅审核通知</Option>);
    opt20.push(<Option key="4">图书审核通知</Option>);

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 13 }
      }
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 }
      }
    };

    const parentMethods = {
      callReturn: this.callReturn,
      closeModal: this.closeModal
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Form onSubmit={okHandle} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="推送标题">
              {form.getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入推送标题...'
                  }
                ]
              })(<Input style={{ width: 300 }} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="推送内容">
              {form.getFieldDecorator('message', {
                rules: [
                  {
                    required: true,
                    message: '请输入推送内容...'
                  }
                ]
              })(<Input.TextArea style={{ width: 300, height: 200 }} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="信鸽类型">
              {form.getFieldDecorator('pushType', {
                rules: [
                  {
                    required: true
                  }
                ]
              })(<Select style={{ width: '300px' }}>{opt10}</Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="目标(以（,）隔开)：">
              {form.getFieldDecorator('userId', {
                initialValue: '',
                rules: [
                  {
                    required: false,
                    message: '请输入目标id...'
                  }
                ]
              })(<Input style={{ width: 300 }} />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32, marginLeft: 64 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
