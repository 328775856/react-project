import React, { Fragment, PureComponent } from 'react';
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
import SelectImage from '../Select/SelectImage';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    modalVisible: false
  };

  closeSelectModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  callSelectReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        imagePath: record[0].imagePath,
        wholeImagePath: record[0].domain
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

  render() {
    let opt = [];
    const {
      modalVisible,
      form,
      add,
      update,
      closeModal,
      formData,
      title,
      dispatch,
      isEmptyObject,
      options
    } = this.props;
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
        if (formData.sysCarouselId >= 0) {
          fieldsValue.sysCarouselId = formData.sysCarouselId;
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
    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => closeModal()}
      >
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          {form.getFieldDecorator('carouselName', {
            initialValue: formData.carouselName || '',
            rules: [
              {
                required: true,
                message: '请输入名称...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="轮播类型"
        >
          {form.getFieldDecorator('carouselType', {
            initialValue:
              formData.carouselType === undefined ? '-1' : `${formData.carouselType}` || '',
            rules: [
              {
                required: true,
                message: '请输入轮播类型...'
              }
            ]
          })(<Select style={{ width: '150px' }}>{opt1}</Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="轮播顺序"
        >
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo || '',
            rules: [
              {
                required: true,
                message: '请输入轮播顺序...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="跳转参数"
        >
          {form.getFieldDecorator('params', {
            initialValue: formData.params || '',
            rules: [
              {
                required: true,
                message: '请输入跳转参数...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="轮播图片"
        >
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('imagePath', {
                initialValue: formData.imagePath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入轮播图片...'
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
            src={formData.wholeImagePath}
          />
        </FormItem>
        <SelectImage
          {...parentMethods}
          modalVisible={this.state.modalVisible}
        />
      </Modal>
    );
  }
}
