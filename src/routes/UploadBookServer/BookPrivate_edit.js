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
import SelectBookType from '../Select/SelectBookType';
import SelectBookProp from '../Select/SelectBookProp';
import SelectBookStorage from '../Select/SelectBookStorage';
import SelectBookStyle from '../Select/SelectBookStyle';
import SelectImage from '../Select/SelectImage';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    bookTypeModalVisible: false,
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

  closeSelectBookTypeModal = () => {
    this.setState({
      bookTypeModalVisible: false
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

  callSelectBookTypeReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('bookTypeId');
      form.resetFields('bookTypeName');
      const myFormData = {
        bookTypeId: record[0].bookTypeId,
        bookTypeName: record[0].typeName
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectBookTypeModal();
  };

  callSelectBookPropReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('bookPropId');
      form.resetFields('bookPropName');
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
      const { dispatch, form } = this.props;
      form.resetFields('bookStyleId');
      form.resetFields('bookStyleName');
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
      const { dispatch, form } = this.props;
      form.resetFields('bookStorageId');
      form.resetFields('bookStorageName');
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
      const { dispatch, form } = this.props;
      form.resetFields('coverPath');
      form.resetFields('wholePhotoPath');
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

  selectBookTypeModel = () => {
    this.setState({
      bookTypeModalVisible: true
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
    const { modalVisible, form, add, update, closeModal, formData, title } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.bookId >= 0) {
          fieldsValue.bookId = formData.bookId;
          update(fieldsValue);
        } else {
          add(fieldsValue);
        }
      });
    };

    const cancelHandle = () => {
      form.resetFields();
      closeModal();
    };

    const parentMethods = {
      callReturn: this.callSelectReturn,
      closeModal: this.closeSelectModal
    };

    const parentMethodsForBookType = {
      callReturn: this.callSelectBookTypeReturn,
      closeModal: this.closeSelectBookTypeModal
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
      <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={cancelHandle}>
        <FormItem {...formItemLayout} label="图书属性">
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
              <Button onClick={this.selectBookPropModel} icon="search" />
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
        <FormItem {...formItemLayout} label="图书编号">
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
        <FormItem {...formItemLayout} label="图书名">
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
        <FormItem {...formItemLayout} label="图书分类">
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('bookTypeName', {
                initialValue: formData.bookTypeName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择图书分类...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectBookTypeModel} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="图书分类ID"
          style={{ display: 'none' }}
        >
          {form.getFieldDecorator('bookTypeId', { initialValue: formData.bookTypeId || '' })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="图书格式">
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('bookStyleName', {
                initialValue: formData.bookStyleName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择图书格式...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectBookStyleModel} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="图书格式ID"
          style={{ display: 'none' }}
        >
          {form.getFieldDecorator('bookStyleId', { initialValue: formData.bookStyleId || '' })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="封面">
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
              <Button onClick={this.selectImage} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="图片显示">
          <img alt="" style={{ width: 100, height: 100 }} src={formData.wholePhotoPath} />
        </FormItem>
        <FormItem {...formItemLayout} label="作者">
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
        <FormItem {...formItemLayout} label="图书存储">
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('bookStorageName', {
                initialValue: formData.bookStorageName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择图书存储...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectBookStorageModel} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="图书存储ID"
          style={{ display: 'none' }}
        >
          {form.getFieldDecorator('bookStorageId', { initialValue: formData.bookStorageId || '' })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="存储文件名">
          {form.getFieldDecorator('fileName', {
            initialValue: formData.fileName || '',
            rules: [
              {
                required: true,
                message: '请输入存储文件名...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="资源大小">
          {form.getFieldDecorator('fileSize', {
            initialValue: formData.fileSize || '',
            rules: [
              {
                required: true,
                message: '请输入资源大小...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="图书简介">
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
        <SelectBookType
          {...parentMethodsForBookType}
          modalVisible={this.state.bookTypeModalVisible}
        />
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
        <SelectImage {...parentMethods} modalVisible={this.state.modalVisible} />
      </Modal>
    );
  }
}
