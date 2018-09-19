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
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import CreateEditForm from './FindChannel_edit';
import TimingPublishModal from './FindChannel_timing';
import { defaultPage } from '../../../utils/utils';

const channelType = { 1: '专题', 2: '书单', 3: '图书推荐', 4: '好书推荐', 5: '榜单' };
const publishStatus = { 0: '未发布', 1: '已发布', 2: '定时发布' };
const publishTitle = { 0: '确定取消发布?', 1: '确定发布?', 2: '确定定时发布?' };

const FormItem = Form.Item;
@connect(({ commonTableData, loading }) => ({
  commonTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class FindChannel extends PureComponent {
  state = {
    paramData: {},
    formValues: {},
    modalTitle: '',
    modalVisible: false,
    publishForm: {},
    publishModalVisible: false,
    page: defaultPage()
  };

  componentDidMount() {
    const { formValues } = this.state;
    this.refresh(formValues);
  }

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForUpdate',
      path: 'findChannel/getDataForUpdate',
      payload: { findChannelId: record.findChannelId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForAdd',
      path: 'findChannel/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  refresh = values => {
    const { dispatch } = this.props;
    const { page } = this.state;
    dispatch({
      type: 'commonTableData/list',
      path: 'findChannel/query',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  tableChange = () => {
    const { formValues } = this.state;
    this.refresh(formValues);
  };

  add = fields => {
    const { dispatch, paramData } = this.props;
    const params = {
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'commonTableData/add',
      path: 'findChannel/add',
      payload: params,
      callback: this.callback
    });
  };

  update = fields => {
    const { dispatch, commonTableData } = this.props;
    const { paramData } = this.state;
    const payload = {
      ...commonTableData.formData,
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'commonTableData/update',
      path: 'findChannel/update',
      payload,
      callback: this.callback
    });
  };

  remove = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'commonTableData/remove',
          path: 'findChannel/remove',
          payload: { findChannelId: record.findChannelId },
          callback: cb
        });
      },
      onCancel() {}
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
          type: 'tableData/update',
          path: 'findChannel/publishChange',
          payload: {
            findChannelId: record.findChannelId,
            publishStatus: status,
            publishDate: date
          },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  isEmptyObject = e => {
    let t;
    // eslint-disable-next-line guard-for-in
    for (t in e) return !1;
    return !0;
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      publishModalVisible: false
    });
  };

  callback = () => {
    const { commonTableData } = this.props;
    if (commonTableData.status === 200) {
      const { formValues } = this.state;
      this.refresh(formValues);
    } else {
      message.success(commonTableData.message);
    }
  };

  showSuggestBook = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/goUrl',
      path: '/findServer/findSuggestBook',
      payload: {
        dynaTopicId: record.findChannelId
      }
    });
  };

  publishOP = record => (
    <Fragment>
      <a onClick={() => this.publishChange(record, 0)}>取消发布</a>
    </Fragment>
  );

  unPublishOP = record => (
    <Fragment>
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
      <a onClick={() => this.publishChange(record, 0)}>取消定时发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.getDataForUpdate(record)}>编辑</a>
      <Divider type="vertical" />
      <a onClick={() => this.remove(record)}>删除</a>
    </Fragment>
  );

  showTimingPublishModal = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForUpdate',
      path: 'findChannel/getDataForUpdate',
      payload: { findChannelId: record.findChannelId }
    });
    this.setState({
      publishForm: record,
      publishModalVisible: true
    });
  };

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

  render() {
    const {
      add,
      update,
      tableChange,
      closeModal,
      isEmptyObject,
      renderPublishOP,
      refresh,
      publishChange
    } = this;
    const { loading, commonTableData } = this.props;
    const { modalVisible, modalTitle, publishModalVisible, publishForm } = this.state;
    const parentMethods = {
      add,
      update,
      closeModal,
      publishChange,
      refresh,
      isEmptyObject
    };

    const columns = [
      { title: '序号', render: (text, record, index) => <Fragment>{index + 1}</Fragment> },
      { title: '栏目名称', dataIndex: 'channelName' },
      {
        title: '布局类型',
        dataIndex: 'layoutType',
        render: text => <Fragment>{text === 0 ? '横排' : '竖排'}</Fragment>
      },
      {
        title: '栏目类型',
        dataIndex: 'channelType',
        render: text => <Fragment>{channelType[text]}</Fragment>
      },
      {
        title: '栏目排序',
        dataIndex: 'indexNo',
        render: text => <Fragment>{text}</Fragment>
      },
      {
        title: '展示个数',
        dataIndex: 'numRecord',
        render: text => <Fragment>{text || 0}</Fragment>
      },
      {
        title: '发布状态',
        dataIndex: 'publishStatus',
        render: text => <Fragment>{publishStatus[text]}</Fragment>
      },
      {
        title: '发布日期',
        dataIndex: 'publishDate',
        render: (text, record) => <Fragment>{record.publishStatus === 0 ? '' : text}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => <Fragment>{renderPublishOP(record)}</Fragment>
      }
    ];

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                type="primary"
                onClick={() => this.getDataForAdd()}
              >
                新建
              </Button>
            </div>
            <Table
              dataSource={commonTableData.pageData.list}
              columns={columns}
              rowKey="findChannelId"
              loading={loading}
              onChange={tableChange}
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
          state={this.state}
        />
      </PageHeaderLayout>
    );
  }
}
