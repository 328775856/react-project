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
      const { dispatch, form } = this.props;
      form.resetFields('labelPath');
      form.resetFields('wholeLabelPath');
      const myFormData = {
        labelPath: record[0].imagePath,
        wholeLabelPath: record[0].domain
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
    const { modalVisible, form, add, update, closeModal, formData, title, dispatch } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.sysLabelId >= 0) {
          fieldsValue.sysLabelId = formData.sysLabelId;
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
      <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={cancelHandle}>
        <FormItem {...formItemLayout} label="标签名称">
          {form.getFieldDecorator('labelName', {
            initialValue: formData.labelName || '',
            rules: [
              {
                required: true,
                message: '请输入标签名称...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="标签图片">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('labelPath', {
                initialValue: formData.labelPath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入标签图片...'
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
          <img alt="" style={{ width: 100, height: 100 }} src={formData.wholeLabelPath} />
        </FormItem>
        <SelectImage
          {...parentMethods}
          imagePath={formData.labelPath}
          modalVisible={this.state.modalVisible}
        />
      </Modal>
    );
  }
}
