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
const Option = Select.Option;
function CreateFindFrom(props, formQuery, formReset, isEmptyObject, curState) {
  console.log(curState);
  let options = '';
  if (!isEmptyObject(curState.options)) {
    options = curState.options.map(item => <Option key={item.sysRoleId}>{item.roleName}</Option>);
  }

  const { form } = props;
  const { getFieldDecorator } = form;
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
          <FormItem label="编号">
            {form.getFieldDecorator('userCode')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="名称">
            {form.getFieldDecorator('userName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        />

        <Col
          md={8}
          sm={24}
        >
          <FormItem label="权限组id">
            {form.getFieldDecorator('sysRoleId')(
              <Select
                placeholder=""
                style={{ width: '150px' }}
              >
                {options}
              </Select>
            )}
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
