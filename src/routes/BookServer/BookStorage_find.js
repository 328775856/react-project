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
function CreateFindFrom(props,formQuery,formReset,isEmptyObject,state) {
const { form } = props;
const { getFieldDecorator } = form;
  let opt1 = [];
  let opt2 = [];
  if (!isEmptyObject(state.options)) {
    opt1 = state.options["32"].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    opt2 = state.options["36"].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  const opt10 = [];
  opt10.push(<Option key="-1">请选择</Option>);
  opt10.push(opt1);

  const opt20 = [];
  opt20.push(<Option key="-1">请选择</Option>);
  opt20.push(opt2);
return (
  <Form onSubmit={formQuery} layout="inline">
    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <Col md={8} sm={24}>
        <FormItem label="图书存放类型">
          {form.getFieldDecorator('bookStorageType',{initialValue: '-1',})(<Select style={{ width: '150px' }}>{opt10}</Select>)}
        </FormItem>
      </Col>
      <Col md={8} sm={24}>
        <FormItem label="存储名">
          {form.getFieldDecorator('storageName')(<Input placeholder="" />)}
        </FormItem>
      </Col>
      <Col md={8} sm={24}>
        <FormItem label="是否已满">
          {form.getFieldDecorator('isFull',{initialValue: '-1',})(<Select style={{ width: '150px' }}>{opt20}</Select>)}
        </FormItem>
      </Col>
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
