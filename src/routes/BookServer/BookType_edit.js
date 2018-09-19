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
import SelectImage from '../Select/SelectImage';

const FormItem = Form.Item;
// const CreateEditForm = Form.create()(props => {
@Form.create()
export default class CreateEditForm extends PureComponent {
  // const { modalVisible, form, add,update, closeModal,formData,title,isEmptyObject, options } = props;
  state = {
    modalVisible: false,
    bookTypeModalVisible: false,
    opt: {}
  };
  // let opt = [];
  // if (!isEmptyObject(options)) {
  //   opt = options.map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  // }

  componentDidMount() {
    let opt1 = [];
    const { isEmptyObject } = this.props;
    if (!isEmptyObject(this.props.options)) {
      opt1 = this.props.map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    }
    this.setState({
      opt: opt1
    });
  }

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

  callSelectReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        typeIco: record[0].imagePath,
        wholePhotoPath: record[0].domain
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectModal();
  };

  callSelectBookTypeReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        parentId: record[0].bookTypeId,
        parentTypeName: record[0].typeName
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectBookTypeModal();
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

  render() {
    const {
      modalVisible,
      form,
      add,
      update,
      closeModal,
      formData,
      title,
      dispatch,
      options,
      isEmptyObject
    } = this.props;
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
        if (formData.bookTypeId >= 0) {
          fieldsValue.bookTypeId = formData.bookTypeId;
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

    const parentMethodsForBookType = {
      callReturn: this.callSelectBookTypeReturn,
      closeModal: this.closeSelectBookTypeModal
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
          label="分类名称"
        >
          {form.getFieldDecorator('typeName', {
            initialValue: formData.typeName || '',
            rules: [
              {
                required: true,
                message: '请输入分类名称...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上级分类"
        >
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('parentTypeName', {
                initialValue: formData.parentTypeName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择上级分类...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col span={2}>
              <Button
                onClick={this.selectBookTypeModel}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="上级图书分类ID"
          style={{ display: 'none' }}
        >
          {form.getFieldDecorator('parentId', { initialValue: formData.parentId || '' })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类顺序"
        >
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo || '',
            rules: [
              {
                required: true,
                message: '请输入分类顺序...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否禁用"
        >
          {form.getFieldDecorator('isForbid', {
            initialValue: formData.isForbid === undefined ? '0' : `${formData.isForbid}` || '',
            rules: [
              {
                required: true,
                message: '请选择是否禁用...'
              },
              {
                validator: checkContent.bind(this)
              }
            ]
          })(<Select style={{ width: '150px' }}>{opt1}</Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类图标"
        >
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('typeIco', {
                initialValue: formData.typeIco || '',
                rules: [
                  {
                    required: true,
                    message: '请选择分类图标...'
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
        <SelectImage
          {...parentMethods}
          modalVisible={this.state.modalVisible}
        />
        <SelectBookType
          {...parentMethodsForBookType}
          modalVisible={this.state.bookTypeModalVisible}
        />
      </Modal>
    );
  }
}
