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
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import CreateEditForm from './FindSpec_edit';
import CreateFindForm from './FindSpec_find';
import TimingPublishModal from './FindSpec_timing';
import { defaultPage, formatDate } from '../../../utils/utils.js';

const publishStatus = { 0: '未发布', 1: '已发布', 2: '定时发布' };
const publishTitle = { 0: '确定取消发布?', 1: '确定发布?', 2: '确定定时发布?' };

const FormItem = Form.Item;
@connect(({ commonTableData, loading }) => ({
  commonTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class FindSpec extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    publishModalVisible: false,
    publishForm: '',
    options: []
  };

  componentWillMount() {
    const { commonTableData } = this.props;
    commonTableData.pageData.list = '';
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    this.initOptions();
    this.refresh(formValues, page);
  }

  getDataForAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForAdd',
      path: 'findSpec/getDataForAdd'
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForUpdate',
      path: 'findSpec/getDataForUpdate',
      payload: { findSpecId: record.findSpecId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/initOptions',
      path: 'findSpec/getDataForAdd',
      payload: {},
      callback: this.initOptionsCallback
    });
  };

  initOptionsCallback = response => {
    const { page } = this.state;
    const result = JSON.parse(response.data);
    this.setState({
      options: result
    });
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/list',
      path: 'findSpec/page',
      payload: {
        data: values,
        // eslint-disable-next-line react/destructuring-assignment
        page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({ page });
    this.refresh(formValues, page);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  callback = () => {
    const { commonTableData } = this.props;
    if (commonTableData.status === 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(commonTableData.message);
    }
  };

  remove = record => {
    const { dispatch, commonTableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'commonTableData/remove',
          path: 'findSpec/remove',
          payload: { findSpecId: record.findSpecId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  query = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      if (values.publishDate) {
        values.publishDate = values.publishDate.format('YYYYMMDD');
      }
      const page = defaultPage();
      this.setState({
        formValues: values,
        page
      });
      this.refresh(values, page);
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      publishModalVisible: false
    });
  };

  add = fields => {
    const { dispatch, commonTableData } = this.props;
    dispatch({
      type: 'commonTableData/add',
      path: 'findSpec/add',
      payload: fields,
      callback: this.callback
    });
  };

  update = fields => {
    const { dispatch, commonTableData } = this.props;
    const payload = {
      ...commonTableData.formData,
      ...fields
    };
    dispatch({
      type: 'commonTableData/update',
      path: 'findSpec/update',
      payload,
      callback: this.callback
    });
  };

  publishChange = (record, status, date) => {
    const { dispatch } = this.props;
    const cb = this.callback;
    const title = publishTitle[status];
    Modal.confirm({
      title,
      onOk() {
        dispatch({
          type: 'commonTableData/update',
          path: 'findSpec/publishChange',
          payload: {
            findSpecId: record.findSpecId,
            publishStatus: status,
            publishDate: date
          },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  goSpecBook = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/goUrl',
      path: '/findServer/findSpecBook',
      payload: {
        findSpecId: record.findSpecId
      }
    });
  };

  goSpecCourse = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/goUrl',
      path: '/findServer/findSpecCourse',
      payload: {
        findSpecId: record.findSpecId
      }
    });
  };

  showTimingPublishModal = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForUpdate',
      path: 'findSpec/getDataForUpdate',
      payload: { findSpecId: record.findSpecId }
    });
    this.setState({
      publishForm: record,
      publishModalVisible: true
    });
  };

  publishOP = record => (
    <Fragment>
      <a onClick={() => this.goSpecBook(record)}>图书列表</a>
      <Divider type="vertical" />
      <a onClick={() => this.goSpecCourse(record)}>课程列表</a>
      <Divider type="vertical" />
      <a onClick={() => this.publishChange(record, 0)}>取消发布</a>
    </Fragment>
  );

  unPublishOP = record => (
    <Fragment>
      <a onClick={() => this.goSpecBook(record)}>图书列表</a>
      <Divider type="vertical" />
      <a onClick={() => this.goSpecCourse(record)}>课程列表</a>
      <Divider type="vertical" />
      <a onClick={() => this.publishChange(record, 1)}>发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.showTimingPublishModal(record)}>定时发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.getDataForUpdate(record)}>编辑</a>
      <Divider type="vertical" />
      <a onClick={() => this.remove(record)}>删除</a>
    </Fragment>
  );

  timingPublishOP = record => (
    <Fragment>
      <a onClick={() => this.goSpecBook(record)}>图书列表</a>
      <Divider type="vertical" />
      <a onClick={() => this.goSpecCourse(record)}>课程列表</a>
      <Divider type="vertical" />
      <a onClick={() => this.publishChange(record, 0)}>取消定时发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.getDataForUpdate(record)}>编辑</a>
      <Divider type="vertical" />
      <a onClick={() => this.remove(record)}>删除</a>
    </Fragment>
  );

  renderPublishOP = record => {
    const { unPublishOP, publishOP, timingPublishOP } = this;
    switch (record.publishStatus) {
      case 0:
        return unPublishOP(record);
      case 1:
        return publishOP(record);
      case 2:
        return timingPublishOP(record);
      default:
        return null;
    }
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset, this.getDataForAdd);
  }

  render() {
    const { dispatch, commonTableData, loading } = this.props;
    const { modalVisible, modalTitle, publishModalVisible, publishForm, options } = this.state;
    const columns = [
      {
        title: '系统ID',
        dataIndex: 'findSpecId'
      },
      {
        title: '所属栏目ID',
        dataIndex: 'findChannelId',
        render(text, record) {
          const dict = () => {
            let res = '';
            for (let i = 0; i < options.length; i += 1) {
              if (record.findChannelId === options[i].findChannelId) {
                res = options[i].channelName;
                break;
              }
            }
            return res;
          };
          return <Fragment>{dict()}</Fragment>;
        }
      },
      {
        title: '专题名称',
        dataIndex: 'specName',
        render: text => <Fragment>{text}</Fragment>
      },
      {
        title: '专题封面图',
        dataIndex: 'imagePath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholeCoverPath} />
          </Fragment>
        )
      },
      {
        title: '专题描述',
        dataIndex: 'specIntro',
        render(text, record) {
          if ((text || '.').length > 40) {
            return `${text.substring(0, 40)}......`;
          }
          return text;
        }
      },
      {
        title: '发布状态',
        dataIndex: 'publishStatus',
        render: text => <Fragment>{publishStatus[text]}</Fragment>
      },
      {
        title: '发布日期',
        dataIndex: 'publishDate',
        render: (text, record) => (
          <Fragment>{record.publishStatus === 0 ? '' : formatDate(text)}</Fragment>
        )
      },
      {
        title: '操作',
        render: (text, record) => <Fragment>{this.renderPublishOP(record)}</Fragment>
      }
    ];

    const parentMethods = {
      dispatch,
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
      publishChange: this.publishChange,
      refresh: this.refresh,
      getDataForAdd: this.getDataForAdd
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator} />
            <Table
              dataSource={commonTableData.pageData.list}
              columns={columns}
              rowKey="findSpecId"
              pagination={commonTableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <TimingPublishModal
          {...parentMethods}
          modalVisible={publishModalVisible}
          publishForm={publishForm}
        />
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={commonTableData.formData}
          title={modalTitle}
          options={options}
        />
      </PageHeaderLayout>
    );
  }
}
