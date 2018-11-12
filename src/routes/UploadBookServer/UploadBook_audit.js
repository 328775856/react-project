import React from 'react';
import { Button, Form, Modal, Radio, Select } from 'antd';
// import {div} from '../../utils/utils';
import styles from './UploadBook.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CreateAuditForm = Form.create()(props => {
  const { modalVisible, form, audit, closeModal, formData, title, isEmptyObject, options } = props;
  // console.log(formData, '2');
  let opt1 = [];
  let opt2 = [];
  let opt3 = [];
  let content = '无内容';
  let curKeyWord = '';
  let startWord = 0;
  let endWord = 0;
  if (formData.tryReadContentMap) {
    if (formData.tryReadContentMap.content) {
      content = formData.tryReadContentMap.content;
    }
    if (formData.tryReadContentMap.keyWord) {
      curKeyWord = formData.tryReadContentMap.keyWord;
    }
    if (formData.tryReadContentMap.startWord) {
      startWord = formData.tryReadContentMap.startWord;
    }
    if (formData.tryReadContentMap.endWord) {
      endWord = formData.tryReadContentMap.endWord;
    }

  }
  if (!isEmptyObject(options)) {
    const dictOpt = JSON.parse(options.dictDatas);
    opt1 = dictOpt['36'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    const bookTypeOpt = JSON.parse(options.bookType);
    opt2 = bookTypeOpt.map(item => <Option key={item.bookTypeId}>{item.typeName}</Option>);
  }
  const sensitiveNameAndCountListArr = formData.sensitiveNameAndCountList;
  if (sensitiveNameAndCountListArr != null) {
    for (let i = 0; i < sensitiveNameAndCountListArr.length - 1; i++) {
      opt3.push(sensitiveNameAndCountListArr[i]);
    }
  }

  const opt11 = [];
  opt11.push(opt2);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      if (err) return;
      form.resetFields();
      if (formData.bookUserId >= 0) {
        fieldsValue.bookUserId = formData.bookUserId;
        audit(fieldsValue);
      }
    });
  };
  const prev = () => {
    const { dispatch } = props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'uploadBook/getDataForUpdate',
      payload: {
        bookUserId: formData.bookUserId,
        tryReadContentMap: {
          startWord: startWord - content.length,
          keyWord: curKeyWord
        }
      }
    });
  };
  const next = () => {
    const { dispatch } = props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'uploadBook/getDataForUpdate',
      payload: {
        bookUserId: formData.bookUserId,
        tryReadContentMap: {
          startWord: endWord,
          keyWord: curKeyWord
        }
      }
    });
  };

  const keyWordChange = curKeyWord => {
    const { dispatch } = props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'uploadBook/getDataForUpdate',
      payload: {
        bookUserId: formData.bookUserId,
        tryReadContentMap: {
          startWord: 0,
          keyWord: curKeyWord
        }
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
      md: { span: 10 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 13 }
    }
  };
  const checkContent = (rule, value, callback) => {
    if (value === '-1') {
      callback('请选择!');
      return;
    }
    callback();
  };
  return (
    <div className={styles.UploadBook}>
      <Modal
        width="80%"
        title={title}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => closeModal()}
      >
        <div className={styles.container} style={{}}>
          <div>
            <select style={{}} size="13">
              {opt3.map((el, index) => (
                <option
                  key={index}
                  value={el.key}
                  onClick={() => {
                    keyWordChange(el.key);
                  }}
                >
                  {el.key}({el.count})
                </option>
              ))}
            </select>
          </div>
          <div style={{}}>
            <div className={styles.prev} onClick={prev}>
              上一页
            </div>
            <div className={styles.content}>{content}</div>
            <div className={styles.next} onClick={next}>
              下一页
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <div>
            <FormItem {...formItemLayout}>
              {form.getFieldDecorator('isGood', {
                valuePropName: 'checked',
                initialValue: formData.isGood || 0
              })(<Radio value={1}>设为优质书</Radio>)}
            </FormItem>
          </div>
          <div style={{}}>
            <div>
              图书分类：
              <FormItem style={{ margin: '0 10px 0 0', height: 40 }} {...formItemLayout} label="">
                {form.getFieldDecorator('bookTypeId', {
                  initialValue:
                    formData.bookTypeId === undefined ? '' : `${formData.bookTypeId}` || '',
                  rules: [
                    {
                      required: true,
                      message: '请选择审核结果...'
                    },
                    {
                      validator: checkContent.bind(this)
                    }
                  ]
                })(<Select style={{ width: '150px' }}>{opt11}</Select>)}
              </FormItem>
             {/* <Button>选择</Button>*/}
            </div>
            <FormItem {...formItemLayout} label="">
              {form.getFieldDecorator('isPass', {
                rules: [
                  {
                    required: true,
                    message: '请选择'
                  },
                  {
                    validator: checkContent.bind(this)
                  }
                ],
                initialValue: formData.isPass === undefined ? '-1' : `${formData.isPass}` || ''
              })(
                <RadioGroup>
                  <RadioButton value="0">审核通过</RadioButton>
                  <RadioButton value="1">审核不通过</RadioButton>
                  <RadioButton value="2">黑名单</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </div>
        </div>
      </Modal>
    </div>
  );
});
export default CreateAuditForm;
