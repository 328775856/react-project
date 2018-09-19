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
  Col
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import SelectImage from '../Select/SelectImage';
import styles from '../../assets/edit.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTest
}))
@Form.create()
export default class SelectTest extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillMount() {}

  state = {
    modalVisible: false,
    submitting: false
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  callReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        imagePath: record[0].imagePath,
        fullPath: record[0].domain
      };
      dispatch({
        type: 'restTableData/select',
        payload: myFormData
      });
    }
    this.closeModal();
  };

  selectUser = () => {
    this.setState({
      modalVisible: true
    });
  };

  render() {
    const { submitting, modalVisible } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {
      restTableData: { formData }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
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
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="选择图片Demo"
            >
              <Row gutter={0}>
                <Col span={22}>
                  {getFieldDecorator('code', {
                    initialValue: formData.imagePath || '',
                    rules: [{ required: true, message: '请选择图片!' }]
                  })(<Input />)}
                </Col>
                <Col span={2}>
                  <Button
                    onClick={this.selectUser}
                    icon="search"
                  />
                </Col>
              </Row>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图片显示"
            >
              <img
                alt=""
                style={{ width: 100, height: 100 }}
                src={formData.fullPath}
              />
            </FormItem>

            <FormItem
              {...submitFormLayout}
              style={{ marginTop: 32 }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
              >
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>返回</Button>
            </FormItem>
          </Form>
        </Card>
        <SelectImage
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
