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
      path: 'uploadBook/initHistoryUploadBookMongo',
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
        this.add(fieldsValue);
      });
    };

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
            <FormItem {...submitFormLayout} style={{ marginTop: 32, marginLeft: 64 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                初始化
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
