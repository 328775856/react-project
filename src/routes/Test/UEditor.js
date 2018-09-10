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
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ueditor from '../../components/Ueditor/Ueditor';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
@Form.create()
export default class Editor extends PureComponent {
  state = {
    data: '',
  };

  constructor(props) {
    super(props);
  }
  handleSubmit = () => {
    const data = UE.getEditor('content').getContent();
    this.setState({ data });
  };

  render() {
    return (
      <PageHeaderLayout>
        <div>
          <Ueditor id="content" height="200" />
          <button onClick={this.handleSubmit}>保存</button>
          <p>{this.state.data}</p>
        </div>
      </PageHeaderLayout>
    );
  }
}
