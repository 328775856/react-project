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
const CreateEditForm = Form.create()(props => {
const { modalVisible, form, add,update, closeModal,formData,title } = props;
const okHandle = () => {
form.validateFields((err, fieldsValue) => {
if (err) return;
form.resetFields();
if(formData.bookStyleId>=0){
fieldsValue.bookStyleId=formData.bookStyleId;
update(fieldsValue);
}else{
add(fieldsValue);
}
});
};

const formItemLayout = {
labelCol: {
xs: { span: 24 },
sm: { span: 7 },
md: { span: 5 },
},
wrapperCol: {
xs: { span: 24 },
sm: { span: 12 },
md: { span: 13 },
},
};

return (
<Modal
        title={title}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => closeModal()}
>
<FormItem {...formItemLayout} label="名称">
    {form.getFieldDecorator('styleName', {initialValue:formData.styleName ||'',
    rules: [
    {
    required: true,
    message: '请输入名称...',
    },
    ],
    })(<Input/>)}
</FormItem>
</Modal>
);
});
export default CreateEditForm;
