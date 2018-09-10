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
const CreateAuditForm = Form.create()(props => {
const { modalVisible, form, audit, closeModal,formData,title,isEmptyObject,options } = props;
  let opt1 = [];
  let opt2 = [];
  let opt3 = [];
  if (!isEmptyObject(options)) {
    console.log(options);
    const dictOpt = JSON.parse(options.dictDatas);
    const bookStyleOpt = JSON.parse(options.bookStyle);
    opt1 = dictOpt["32"].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    opt2 = dictOpt["33"].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    opt3 = bookStyleOpt.map(item => <Option key={item.bookStyleId}>{item.styleName}</Option>);
  }
  const opt10 = [];
  opt10.push(<Option key="-1">请选择</Option>);
  opt10.push(opt1);
  const opt20 = [];
  opt20.push(<Option key="-1">请选择</Option>);
  opt20.push(opt2);
  const opt30 = [];
  opt30.push(<Option key="-1">请选择</Option>);
  opt30.push(opt3);
const okHandle = () => {
form.validateFields((err, fieldsValue) => {
if (err) return;
form.resetFields();
if(formData.uploadBookId>=0){
fieldsValue.uploadBookId=formData.uploadBookId;
  audit(fieldsValue);
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
    <FormItem {...formItemLayout} label="系统ID" style={{ display: 'none' }}>
      {form.getFieldDecorator('uploadBookId', {initialValue:formData.uploadBookId ||'',
      })(<Input />)}
    </FormItem>
    <FormItem {...formItemLayout} label="用户ID" style={{ display: 'none' }}>
      {form.getFieldDecorator('userId', {initialValue:formData.userId ||'',
      })(<Input />)}
    </FormItem>
    <FormItem {...formItemLayout} label="图书ID" style={{ display: 'none' }}>
      {form.getFieldDecorator('bookId', {initialValue:formData.bookId ||'',
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
    })(<Select style={{ width: '150px' }}>{opt10}</Select>)}
    </FormItem>
  </Modal>
);
});
export default CreateAuditForm;
