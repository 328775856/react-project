/* eslint-disable no-unused-vars,radix */
import React, { Fragment, PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
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
  Divider,
  Table
} from 'antd';

@connect(({ commonTableData, loading }) => ({
  commonTableData,
  loading: loading.models.crud
}))
export default class TimingPublishModal extends PureComponent {
  state = {
    publishDate: ''
  };

  onChange = date => {
    if (date) {
      this.setState({ publishDate: date });
    }
  };

  onOk = () => {
    const { publishDate } = this.state;
    if (!publishDate) {
      message.error('请选择上架时间!');
      return;
    }

    const timePublishDate = publishDate.unix();

    const currDate = new Date().getTime() / 1000;
    if (timePublishDate <= currDate) {
      message.error('请选择今天以后的时间!');
      return;
    }
    const selectDate = moment(parseInt(timePublishDate * 1000)).format('YYYYMMDD');
    const { parent, publishForm } = this.props;
    const { dispatch, refresh, timingRelease } = parent;
    publishForm.publishDate = selectDate;
    publishForm.publishStatus = 2;
    const payload = { ...publishForm };
    this.closeModal();
    timingRelease();
  };

  closeModal = () => {
    this.setState({ publishDate: '' });
    const { parent } = this.props;
    parent.setState({
      publishForm: {},
      publishModalVisible: false
    });
  };

  render() {
    const { onChange, onOk, closeModal } = this;
    const { modalVisible } = this.props;
    return (
      <Modal
        title="定时上架"
        visible={modalVisible}
        onOk={onOk}
        onCancel={() => closeModal()}
      >
        上架时间：<DatePicker
          format="YYYY-MM-DD"
          onChange={onChange}
        />
      </Modal>
    );
  }
}
