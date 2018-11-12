/* eslint-disable no-unused-vars,guard-for-in,prefer-template */
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Alert,
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
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import SelectUnscramble from '../../Select/SelectUnscramble';
import { defaultPage, formatDate } from '../../../utils/utils.js';
import TimingPublishModal from './FindUnscramble_timing';
import CreateFindForm from './FindUnscramble_find';
import fetch from '../../../utils/fetch';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class FindUnscramble extends PureComponent {
  state = {
    modalVisible: false,
    formValues: {},
    page: defaultPage(),
    options: {},
    publishForm: {},
    publishModalVisible: false,
    TableData: []
  };

  componentWillMount() {
    const { tableData } = this.props;
    tableData.pageData.list = '';
  }

  componentDidMount() {
    const { formValues, page, options } = this.state;
    this.refresh(formValues, page);
  }

  getSelect = () => {
    this.setState({
      modalVisible: true
    });
  };

  refresh = (values, page) => {
    fetch('findUnscramble/page', 'post', {
      data: values,
      page
    }).then(reset => {
      if (reset.data !== undefined) {
        this.setState({
          TableData: reset.data.data.rows
        });
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  callback = () => {
    const { tableData } = this.props;
    if (tableData.status === 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(tableData.message);
    }
  };

  isEmptyObject = e => {
    let t;
    for (t in e) return !1;
    return !0;
  };

  addSave = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'findUnscramble/add',
      payload: fields,
      callback: this.callback
    });
    this.closeModal();
  };

  closeSelectUnscrambleModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  callSelectUnscrambleReturn = record => {
    if (record != null) {
      const myFormData = {
        findChannelId: 3,
        courseId: record[0].courseId,
        courseTagId: record[0].courseTagId,
        courseName: record[0].courseName,
        coverPath: record[0].coverPath,
        courseIntro: record[0].courseIntro,
        upCourse: record[0].upCourse
      };
      this.addSave(myFormData);
    }
    this.closeSelectUnscrambleModal();
  };

  query = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (!this.isEmptyObject(fieldsValue.createTime)) {
        // eslint-disable-next-line no-param-reassign
        fieldsValue.createTime = fieldsValue.createTime.format('YYYYMMDD');
      }
      const values = {
        ...fieldsValue
      };
      const page = defaultPage();
      this.setState({
        formValues: values,
        page
      });
      this.refresh(values, page);
    });
  };

  delete = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'tableData/remove',
          path: 'findUnscramble/delete',
          payload: { findUnscrambleId: record.findUnscrambleId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  release = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定要发布吗?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'findUnscramble/release',
          payload: {
            findUnscrambleId: record.findUnscrambleId,
            publishStatus: record.publishStatus
          },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  unRelease = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定要取消吗?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'findUnscramble/release',
          payload: {
            findUnscrambleId: record.findUnscrambleId,
            publishStatus: record.publishStatus
          },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  timingRelease = () => {
    const { dispatch } = this.props;
    const { publishForm } = this.state;
    const cb = this.callback;
    dispatch({
      type: 'tableData/update',
      path: 'findUnscramble/release',
      payload: {
        findUnscrambleId: publishForm.findUnscrambleId,
        publishStatus: publishForm.publishStatus,
        publishDate: publishForm.publishDate
      },
      callback: cb
    });
  };

  publishOP = record => (
    <Fragment>
      <a onClick={() => this.unRelease(record)}>取消发布</a>
    </Fragment>
  );

  unPublishOP = record => (
    <Fragment>
      <a onClick={() => this.release(record)}>发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.showTimingPublishModal(record)}>定时发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.delete(record)}>删除</a>
    </Fragment>
  );

  timingPublishOP = record => (
    <Fragment>
      <a onClick={() => this.unRelease(record)}>取消定时发布</a>
    </Fragment>
  );

  showTimingPublishModal = record => {
    this.setState({
      publishForm: record,
      publishModalVisible: true
    });
  };

  formtTime = data => (
    <Fragment>
      {data.substring(0, 4) + '-' + data.substring(4, 6) + '-' + data.substring(6, 8)}
    </Fragment>
  );

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  formatState = text => {
    if (text == 0) {
      return '未发布';
    } else if (text == 1) {
      return '已发布';
    } else {
      return '定时发布';
    }
  };

  renderPublishOP = record =>
    record.publishStatus === 0 ?
      this.unPublishOP(record) :
      record.publishStatus === 1 ?
        this.publishOP(record) :
        this.timingPublishOP(record);

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset, this.state, this.getSelect);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, publishModalVisible, publishForm, TableData } = this.state;

    const columns = [
      { title: 'ID', dataIndex: 'findUnscrambleId' },
      {
        title: '所属栏目',
        dataIndex: 'findChannelId',
        render: () => '好书推荐'
      },
      { title: '课程标签', dataIndex: 'courseTagName' },
      { title: '课程名称', dataIndex: 'courseName' },
      {
        title: '课程封面',
        dataIndex: 'wholeCoverPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholeCoverPath} />
          </Fragment>
        )
      },
      { title: '简介', dataIndex: 'courseIntro' },
      { title: '课程价格', dataIndex: 'upCourse' },
      {
        title: '发布状态',
        dataIndex: 'publishStatus',
        render: (text, record) => <Fragment>{this.formatState(text)}</Fragment>
      },
      {
        title: '发布时间',
        dataIndex: 'publishDate',
        render: (text, record) => <Fragment>{formatDate(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => <Fragment>{this.renderPublishOP(record)}</Fragment>
      }
    ];

    const parentMethodsForUnscramble = {
      callReturn: this.callSelectUnscrambleReturn,
      closeModal: this.closeSelectUnscrambleModal
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.getSelect()}>
                新建
              </Button>
            </div>
            <Table
              dataSource={TableData}
              columns={columns}
              rowKey="findUnscrambleId"
              pagination={tableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <TimingPublishModal
          modalVisible={publishModalVisible}
          publishForm={publishForm}
          parent={this}
        />
        <SelectUnscramble {...parentMethodsForUnscramble} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
