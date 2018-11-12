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

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    courseInfoModalVisible: false
  };

  closeSelectCourseInfoModal = () => {
    this.setState({
      courseInfoModalVisible: false
    });
  };

  callSelectCourseInfoReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('courseId');
      form.resetFields('courseName');
      form.resetFields('coverPath');
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

  selectCourseInfoModel = () => {
    this.setState({
      courseInfoModalVisible: true
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

    const cancelHandle = () => {
      form.resetFields();
      closeModal();
    };

    const parentMethodsForCourseInfo = {
      callReturn: this.callSelectCourseInfoReturn,
      closeModal: this.closeSelectCourseInfoModal
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
        <FormItem {...formItemLayout} label="VIP包">
          {form.getFieldDecorator('vipPackageId', {
            initialValue: formData.vipPackageId == undefined ? '' : `${formData.vipPackageId}`
          })(
            <Select placeholder="" style={{ width: '150px' }}>
              {optionsEle}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="课程ID" style={{ display: 'none' }}>
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
              <Button onClick={this.selectCourseInfoModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="课程名称">
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
              <Button onClick={this.selectCourseInfoModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="课程封面图">
          {form.getFieldDecorator('coverPath', {
            initialValue: formData.coverPath || '',
            rules: [
              {
                required: true,
                message: '请输入课程封面(素材图片)...'
              }
            ]
          })(<img alt="" style={{ width: 100, height: 100 }} src={formData.coverPath} />)}
        </FormItem>

        <SelectCourseInfo
          {...parentMethodsForCourseInfo}
          courseId={formData.courseId}
          modalVisible={this.state.courseInfoModalVisible}
        />
      </Modal>
    );
  }
}
