import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import SelectNote from '../Select/SelectNote';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    noteModalVisible: false
  };

  closeSelectNoteModal = () => {
    this.setState({
      noteModalVisible: false
    });
  };

  callSelectNoteReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const myFormData = {
        userReadnoteId: record[0].bookReadnoteId,
        notesTitle: record[0].notesTitle
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectNoteModal();
  };

  selectNoteModel = () => {
    this.setState({
      noteModalVisible: true
    });
  };

  render() {
    const { modalVisible, form, add, update, closeModal, formData, title, dispatch } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.courseChapterNoteId >= 0) {
          fieldsValue.courseChapterNoteId = formData.courseChapterNoteId;
          update(fieldsValue);
        } else {
          add(fieldsValue);
        }
      });
    };

    const parentMethodsForNote = {
      callReturn: this.callSelectNoteReturn,
      closeModal: this.closeSelectNoteModal
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
          label="笔记id"
        >
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('userReadnoteId', {
                initialValue: formData.userReadnoteId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入笔记id...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col>
              <Button
                onClick={this.selectNoteModel}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="笔记标题"
        >
          {form.getFieldDecorator('notesTitle', {
            initialValue: formData.notesTitle || '',
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
        <SelectNote
          {...parentMethodsForNote}
          modalVisible={this.state.noteModalVisible}
        />
      </Modal>
    );
  }
}
