import React, { PureComponent } from 'react';
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
import SelectBookProp from '../Select/SelectBookProp';
import SelectBookStorage from '../Select/SelectBookStorage';
import SelectBookStyle from '../Select/SelectBookStyle';
import SelectImage from '../Select/SelectImage';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    bookPropModalVisible: false,
    bookStyleModalVisible: false,
    bookStorageModalVisible: false,
    modalVisible: false
  };

  closeSelectModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  closeSelectBookPropModal = () => {
    this.setState({
      bookPropModalVisible: false
    });
  };

  closeSelectBookStyleModal = () => {
    this.setState({
      bookStyleModalVisible: false
    });
  };

  closeSelectBookStorageModal = () => {
    this.setState({
      bookStorageModalVisible: false
    });
  };

  callSelectBookPropReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        bookPropId: record[0].bookPropId,
        bookPropName: record[0].propName
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectBookPropModal();
  };

  callSelectBookStyleReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        bookStyleId: record[0].bookStyleId,
        bookStyleName: record[0].styleName
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectBookStyleModal();
  };

  callSelectBookStorageReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        bookStorageId: record[0].bookStorageId,
        bookStorageName: record[0].storageName
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectBookStorageModal();
  };

  callSelectReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        coverPath: record[0].imagePath,
        wholePhotoPath: record[0].domain
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectModal();
  };

  selectImage = () => {
    this.setState({
      modalVisible: true
    });
  };

  selectBookPropModel = () => {
    this.setState({
      bookPropModalVisible: true
    });
  };

  selectBookStyleModel = () => {
    this.setState({
      bookStyleModalVisible: true
    });
  };

  selectBookStorageModel = () => {
    this.setState({
      bookStorageModalVisible: true
    });
  };

  render() {
    const {
      modalVisible,
      form,
      add,
      update,
      closeModal,
      formData,
      title,
      isEmptyObject,
      options
    } = this.props;
    let opt1 = [];
    const opt2 = [];
    if (!isEmptyObject(options)) {
      console.log(options);
      const dictOpt = JSON.parse(options.dictDatas);
      opt1 = dictOpt['32'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    }
    const opt10 = [];
    opt10.push(<Option key="-1">请选择</Option>);
    opt10.push(opt1);
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.bookUserId >= 0) {
          fieldsValue.bookUserId = formData.bookUserId;
          update(fieldsValue);
        } else {
          add(fieldsValue);
        }
      });
    };

    const parentMethods = {
      callReturn: this.callSelectReturn,
      closeModal: this.closeSelectModal
    };

    const parentMethodsForBookProp = {
      callReturn: this.callSelectBookPropReturn,
      closeModal: this.closeSelectBookPropModal
    };

    const parentMethodsForBookStyle = {
      callReturn: this.callSelectBookStyleReturn,
      closeModal: this.closeSelectBookStyleModal
    };

    const parentMethodsForBookStorage = {
      callReturn: this.callSelectBookStorageReturn,
      closeModal: this.closeSelectBookStorageModal
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 5 }
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
      <Modal
        title={title}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => closeModal()}
      >
        <FormItem
          {...formItemLayout}
          label="图书属性"
        >
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('bookPropName', {
                initialValue: formData.bookPropName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择图书属性...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button
                onClick={this.selectBookPropModel}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="图书属性ID"
          style={{ display: 'none' }}
        >
          {form.getFieldDecorator('bookPropId', { initialValue: formData.bookPropId || '' })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图书编号"
        >
          {form.getFieldDecorator('bookCode', {
            initialValue: formData.bookCode || '',
            rules: [
              {
                required: true,
                message: '请输入图书编号...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图书名"
        >
          {form.getFieldDecorator('bookName', {
            initialValue: formData.bookName || '',
            rules: [
              {
                required: true,
                message: '请输入图书名...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图书存放类型"
        >
          {form.getFieldDecorator('bookStorageType', {
            initialValue:
              formData.bookStorageType === undefined ? '-1' : `${formData.bookStorageType}` || '',
            rules: [
              {
                required: true,
                message: '请选择图书存放类型...'
              },
              {
                validator: checkContent.bind(this)
              }
            ]
          })(<Select style={{ width: '150px' }}>{opt10}</Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="封面"
        >
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('coverPath', {
                initialValue: formData.coverPath || '',
                rules: [
                  {
                    required: true,
                    message: '请选择封面...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col>
              <Button
                onClick={this.selectImage}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图片显示"
        >
          <img
            alt=""
            style={{ width: 100, height: 100 }}
            src={formData.wholePhotoPath}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="作者"
        >
          {form.getFieldDecorator('bookAuthor', {
            initialValue: formData.bookAuthor || '',
            rules: [
              {
                required: true,
                message: '请输入作者...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图书简介"
        >
          {form.getFieldDecorator('bookIntro', {
            initialValue: formData.bookIntro || '',
            rules: [
              {
                required: true,
                message: '请输入图书简介...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <SelectBookProp
          {...parentMethodsForBookProp}
          modalVisible={this.state.bookPropModalVisible}
        />
        <SelectBookStyle
          {...parentMethodsForBookStyle}
          modalVisible={this.state.bookStyleModalVisible}
        />
        <SelectBookStorage
          {...parentMethodsForBookStorage}
          modalVisible={this.state.bookStorageModalVisible}
        />
        <SelectImage
          {...parentMethods}
          modalVisible={this.state.modalVisible}
        />
      </Modal>
    );
  }
}
