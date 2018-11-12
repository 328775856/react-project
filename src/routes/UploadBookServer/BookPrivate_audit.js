import React from 'react';
import {Form, Input, Modal, Select,} from 'antd';

const FormItem = Form.Item;
const CreateAuditForm = Form.create()(props => {
  const {modalVisible, form, audit, closeModal, formData, title, isEmptyObject, options} = props;
  let opt1 = [];
  let opt2 = [];
  if (!isEmptyObject(options)) {
    console.log(options);
    const dictOpt = JSON.parse(options.dictDatas);
    opt1 = dictOpt["36"].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    const bookTypeOpt = JSON.parse(options.bookType);
    opt2 = bookTypeOpt.map(item => <Option key={item.bookTypeId}>{item.typeName}</Option>);
  }
  const opt10 = [];
  opt10.push(<Option key="1">审核通过</Option>);
  opt10.push(<Option key="3">黑名单</Option>);
  const opt11 = [];
  opt11.push(opt2);
  const okHandle = () => {debugger;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.bookUserId >= 0) {
        fieldsValue.bookUserId = formData.bookUserId;
        audit(fieldsValue);
      }
    });
  };

  const isTrueSelect = (
    <Select placeholder="" style={{width: '150px'}}>
      <Option key={1}>是</Option>
      <Option key={0}>否</Option>
    </Select>
  );

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 7},
      md: {span: 5},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12},
      md: {span: 13},
    },
  };
  const checkContent = (rule, value, callback) => {
    if (value === '-1') {
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
      <FormItem {...formItemLayout} label="系统ID" style={{display: 'none'}}>
        {form.getFieldDecorator('bookUserId', {
          initialValue: formData.bookUserId || '',
        })(<Input/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="用户ID" style={{display: 'none'}}>
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || '',
        })(<Input/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="图书ID" style={{display: 'none'}}>
        {form.getFieldDecorator('bookId', {
          initialValue: formData.bookId || '',
        })(<Input/>)}
      </FormItem>

      <FormItem {...formItemLayout} label="图书分类">
        {form.getFieldDecorator('bookTypeId', {
          initialValue: formData.bookTypeId === undefined ? '-1' : `${formData.bookTypeId  }` || '',
          rules: [
            {
              required: true,
              message: '请选择图书分类...',
            }, {
              validator: checkContent.bind(this),
            },
          ],
        })(<Select style={{width: '150px'}}>{opt11}</Select>)}
      </FormItem>

      <FormItem {...formItemLayout} label="是否优质书">
        {form.getFieldDecorator('isGood', {
          initialValue: formData.isGood || '',
        })(isTrueSelect)}
      </FormItem>

      <FormItem {...formItemLayout} label="审核结果">
        {form.getFieldDecorator('isPass', {
          initialValue: formData.isPass === undefined ? '-1' : `${formData.isPass  }` || '',
          rules: [
            {
              required: true,
              message: '请选择审核结果...',
            }, {
              validator: checkContent.bind(this),
            },
          ],
        })(<Select style={{width: '150px'}}>{opt10}</Select>)}
      </FormItem>

    </Modal>
  );
});
export default CreateAuditForm;
