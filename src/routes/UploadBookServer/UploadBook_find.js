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
function CreateFindFrom(props, formQuery, formReset, isEmptyObject, state) {
  const { form } = props;
  const { getFieldDecorator } = form;
  let opt1 = [];
  if (!isEmptyObject(state.options)) {
    console.log(state.options);
    const dictOpt = JSON.parse(state.options.dictDatas);
    opt1 = dictOpt['32'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  const opt10 = [];
  opt10.push(<Option key="-1">请选择</Option>);
  opt10.push(opt1);
  return (
    <Form
      onSubmit={formQuery}
      layout="inline"
    >
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="用户Id">
            {form.getFieldDecorator('userId')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="图书编号">
            {form.getFieldDecorator('bookCode')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="图书名">
            {form.getFieldDecorator('bookName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="图书存放类型">
            {form.getFieldDecorator('bookStorageType', { initialValue: '-1' })(
              <Select style={{ width: '150px' }}>{opt10}</Select>
            )}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="作者">
            {form.getFieldDecorator('bookAuthor')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <span>
            <Button
              type="primary"
              htmlType="submit"
            >
              查询
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={formReset}
            >
              重置
            </Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
}
export default CreateFindFrom;
