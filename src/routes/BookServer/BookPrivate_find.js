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
  Divider,
} from 'antd';

const FormItem = Form.Item;
function CreateFindFrom(props,formQuery,formReset, isEmptyObject, state) {
  const { form } = props;
  const { getFieldDecorator } = form;
  let opt1 = [];
  let opt2 = [];
  if (!isEmptyObject(state.options)) {
    console.log(state.options);
    const dictOpt = JSON.parse(state.options.dictDatas);
    opt1 = dictOpt["32"].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    const bookStyleOpt = JSON.parse(state.options.bookStyle);
    opt2 = bookStyleOpt.map(item => <Option key={item.bookStyleId}>{item.styleName}</Option>);
  }
  const opt10 = [];
  opt10.push(<Option key="-1">请选择</Option>);
  opt10.push(opt1);

  const opt11 = [];
  opt11.push(<Option key="-1">请选择</Option>);
  opt11.push(opt2);
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="上传用户Id">
            {form.getFieldDecorator('userId')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="图书Id">
            {form.getFieldDecorator('bookId')(<Input placeholder="" />)}
          </FormItem>
        </Col>

        <Col md={8} sm={24}>
          <FormItem label="图书名">
            {form.getFieldDecorator('bookName')(<Input placeholder="" />)}
          </FormItem>
        </Col>

        <Col md={8} sm={24}>
          <FormItem label="图书格式">
            {form.getFieldDecorator('bookStyleId', {initialValue: '-1'})(<Select style={{ width: '150px' }}>{opt11}</Select>)}
          </FormItem>
        </Col>

        <Col md={8} sm={24}>
          <FormItem label="审核时间">
            {form.getFieldDecorator('createTimeStart')(<DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={{}} placeholder="开始时间" />)}
            &nbsp;-&nbsp;
            {form.getFieldDecorator('createTimeEnd')(<DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={{}} placeholder="结束时间" />)}
          </FormItem>
        </Col>
        {/* <Col md={8} sm={24}>
        <FormItem label="图书存放类型">
          {form.getFieldDecorator('bookStorageType', {initialValue: '-1'})(<Select style={{ width: '150px' }}>{opt10}</Select>)}
        </FormItem>
      </Col>*/}

        <Col md={8} sm={24}>
        <span>
          <Button type="primary" htmlType="submit">
                查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={formReset}>
                重置
          </Button>
        </span>
        </Col>
      </Row>
    </Form>
  );
}
export default CreateFindFrom;
