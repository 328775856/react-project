/* eslint-disable radix */
import React, { Fragment, PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { DatePicker, Modal, message } from 'antd';

@connect(({ commonTableData, loading }) => ({
  commonTableData,
  loading: loading.models.crud
}))
export default class TimingPublishModal extends PureComponent {
  state = {
    publishDate: 0
  };

  onChange = date => {
    if (this.checkPublishTime(date.unix())) {
      message.error('请选择大于今天的日期!');
      this.setState({ publishDate: 0 });
    } else {
      this.setState({ publishDate: parseInt(date.format('YYYYMMDD')) });
    }
  };

  onOk = () => {
    const { publishDate } = this.state;
    if (!publishDate) {
      message.error('请选择发布时间!');
      return;
    }
    if (this.checkPublishTime(publishDate)) {
      message.error('请选择大于今天的日期!');
      return;
    }
    const { refresh, publishForm, publishChange } = this.props;
    publishChange(publishForm, 2, publishDate);
    this.closeModal();
    refresh();
  };

  closeModal = () => {
    this.setState({ publishDate: 0 });
    const { closeModal } = this.props;
    closeModal();
  };

  checkPublishTime = date => parseInt(moment().format('YYYYMMDD')) >= date;

  render() {
    const { onChange, onOk, closeModal, onOK } = this;
    const { modalVisible } = this.props;
    return (
      <Modal
        title="定时上架"
        visible={modalVisible}
        onOk={onOk}
        onCancel={() => closeModal()}
      >
        上架时间：<DatePicker
          format="YYYYMMDD"
          onChange={onChange}
        />
      </Modal>
    );
  }
}
