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
const Option = Select.Option;
function CreateConditionForm(props,formQuery,formReset,audioGroup) {
    const { form } = props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={formQuery}>
        <Row gutter={4}>
          <Col md={12} sm={12}>
            <FormItem label="名称">
              {getFieldDecorator('audioName')(<Input placeholder="" />)}
            </FormItem>
          </Col>
           <Col md={12} sm={12}>
            <FormItem label="分组">
              {getFieldDecorator('mediaAudioGroupId')(<Select placeholder="">{audioGroup}</Select>)}
            </FormItem>
          </Col>
          <Col md={12} sm={12}>
            <span>
              <Button  type="primary" htmlType="submit">
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
export default CreateConditionForm;
