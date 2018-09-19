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
import SelectCourseInfo from '../Select/SelectCourseInfo';
import SelectVipCourseType from '../Select/SelectVipCourseType';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    courseInfoModalVisible: false,
    vipCourseTypeModalVisible: false
  };

  closeSelectCourseInfoModal = () => {
    this.setState({
      courseInfoModalVisible: false
    });
  };

  closeSelectVipCourseTypeModal = () => {
    this.setState({
      vipCourseTypeModalVisible: false
    });
  };

  callSelectCourseInfoReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        courseId: record[0].courseId,
        courseName: record[0].courseName,
        coverPath: record[0].wholeCoverPath
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectCourseInfoModal();
  };

  callSelectVipCourseTypeReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        vipCourseTypeId: record[0].vipCourseTypeId,
        typename: record[0].typename
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectVipCourseTypeModal();
  };

  selectCourseInfoModel = () => {
    this.setState({
      courseInfoModalVisible: true
    });
  };

  selectVipCourseTypeModel = () => {
    this.setState({
      vipCourseTypeModalVisible: true
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
      isEmptyObject
    } = this.props;
    let optionsEle = '';
    if (!isEmptyObject(this.props.options)) {
      debugger;
      optionsEle = this.props.options.map(item => (
        <Option key={item.vipPackageId}>{item.packageName}</Option>
      ));
    }

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.vipCourseDemoId >= 0) {
          fieldsValue.vipCourseDemoId = formData.vipCourseDemoId;
          update(fieldsValue);
        } else {
          add(fieldsValue);
        }
      });
    };

    const parentMethodsForCourseInfo = {
      callReturn: this.callSelectCourseInfoReturn,
      closeModal: this.closeSelectCourseInfoModal
    };

    const parentMethodsForVipCourseType = {
      callReturn: this.callSelectVipCourseTypeReturn,
      closeModal: this.closeSelectVipCourseTypeModal
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
          label="vip包"
        >
          {form.getFieldDecorator('vipPackageId', {
            initialValue: formData.vipPackageId == undefined ? '' : `${formData.vipPackageId}`
          })(
            <Select
              placeholder=""
              style={{ width: '150px' }}
            >
              {optionsEle}
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="标签id"
          style={{ display: 'none' }}
        >
          {form.getFieldDecorator('vipCourseTypeId', {
            initialValue: formData.vipCourseTypeId || '',
            rules: [
              {
                required: true,
                message: '请输入课程标签...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="标签名称"
        >
          <Row>
            <Col span={22}>
              {form.getFieldDecorator('typename', {
                initialValue: formData.typename || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程标签...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button
                onClick={this.selectVipCourseTypeModel}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="课程id"
          style={{ display: 'none' }}
        >
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('courseId', {
                initialValue: formData.courseId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程id...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col>
              <Button
                onClick={this.selectCourseInfoModel}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="课程名称"
        >
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('courseName', {
                initialValue: formData.courseName || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程名称...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col>
              <Button
                onClick={this.selectCourseInfoModel}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="课程封面图"
        >
          {form.getFieldDecorator('coverPath', {
            initialValue: formData.coverPath || '',
            rules: [
              {
                required: true,
                message: '请输入课程封面(素材图片)...'
              }
            ]
          })(<img
            alt=""
            style={{ width: 100, height: 100 }}
            src={formData.coverPath}
          />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="顺序"
        >
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo || '',
            rules: [
              {
                required: true,
                message: '请输入顺序...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <SelectCourseInfo
          {...parentMethodsForCourseInfo}
          modalVisible={this.state.courseInfoModalVisible}
        />
        <SelectVipCourseType
          {...parentMethodsForVipCourseType}
          modalVisible={this.state.vipCourseTypeModalVisible}
        />
      </Modal>
    );
  }
}
