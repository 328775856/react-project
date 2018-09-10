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
const { modalVisible, form, add,update, closeModal,formData,title,isEmptyObject, options } = props;
  let opt = [];
  if (!isEmptyObject(options)) {
    opt = options.map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  const opt1 = [];
  opt1.push(<Option key="-1">请选择</Option>);
  opt1.push(opt);
const okHandle = () => {
form.validateFields((err, fieldsValue) => {
if (err) return;
form.resetFields();
if(formData.uploadBookId>=0){
fieldsValue.uploadBookId=formData.uploadBookId;
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

const checkContent=(rule,value,callback)=> {
  if(value === '-1') {
    callback("请选择!");
    return;
  }
  callback();
  }

return (
  <Modal
    title={title}
    visible={modalVisible}
    onOk={okHandle}
    onCancel={() => closeModal()}
  >
    <FormItem {...formItemLayout} label="用户id">
      {form.getFieldDecorator('userId', {initialValue:formData.userId ||'',
    rules: [
    {
    required: true,
    message: '请输入用户id...',
    },
    ],
    })(<Input />)}
    </FormItem>
    <FormItem {...formItemLayout} label="上传图书基本信息ID">
      {form.getFieldDecorator('bookId', {initialValue:formData.bookId ||'',
    rules: [
    {
    required: true,
    message: '请输入上传图书基本信息ID...',
    },
    ],
    })(<Input />)}
    </FormItem>
    <FormItem {...formItemLayout} label="图书存放类型">
      {form.getFieldDecorator('bookStorageType', {initialValue:formData.bookStorageType === undefined ? '-1' : `${formData.bookStorageType  }` || '',
    rules: [
    {
    required: true,
    message: '请选择图书存放类型...',
    },{
        validator: checkContent.bind(this),
      },
    ],
    })(<Select style={{ width: '150px' }}>{opt1}</Select>)}
    </FormItem>
    <FormItem {...formItemLayout} label="备注">
      {form.getFieldDecorator('memo', {initialValue:formData.memo ||'',
    rules: [
    {
    required: true,
    message: '请输入备注...',
    },
    ],
    })(<Input />)}
    </FormItem>
  </Modal>
);
});
export default CreateEditForm;
