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
function CreateFindFrom(props,formQuery,formReset) {
const { form } = props;
const { getFieldDecorator } = form;
return (
<Form onSubmit={formQuery} layout="inline">
    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
            <FormItem label="名称">
                {form.getFieldDecorator('groupName')(<Input placeholder="" />)}
            </FormItem>
            </Col>
                    <Col md={8} sm={24}>
            <FormItem label="默认分组">
                {form.getFieldDecorator('isDefault')(
                    <Select style={{ width: '100%' }}>
                        <Select.Option value="1">是</Select.Option>
                        <Select.Option value="0">否</Select.Option>
                    </Select>
                )}
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
