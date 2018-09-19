import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Modal, message, Divider, Table } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import SelectBookBuy from '../../Select/SelectBookBuy';
import ChangeIndexNoForm from './FindSpec_indexNo';
import { defaultPage, translateDate } from '../../../utils/utils.js';

@connect(({ commonTableData, restTableData, loading }) => ({
  commonTableData,
  restTableData,
  loading: loading.models.crud
}))
export default class FindSpecBook extends PureComponent {
  state = {
    modalVisible: false,
    modalCreateEditVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    paramData: {}
  };

  componentDidMount() {
    const { page } = this.state;
    const { commonTableData } = this.props;
    const paramData = {
      ...commonTableData.formData
    };
    if (!paramData.findSpecId) {
      this.goBackSpec();
    }
    this.setState({
      paramData
    });
    this.refresh(paramData, page);
  }

  getSelect = () => {
    this.setState({
      modalVisible: true
    });
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    const { paramData } = this.state;
    const params = {
      ...paramData,
      ...values
    };
    dispatch({
      type: 'restTableData/list',
      path: 'findSpecBook/page',
      payload: {
        data: params,
        page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      modalCreateEditVisible: false
    });
  };

  callback = () => {
    const { commonTableData } = this.props;
    this.closeModal();
    if (commonTableData.status === 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(commonTableData.message);
    }
  };

  addSave = fields => {
    const { dispatch } = this.props;
    const { paramData } = this.state;
    const payload = {
      ...fields,
      ...paramData
    };

    dispatch({
      type: 'commonTableData/add',
      path: 'findSpecBook/add',
      payload,
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
      path: 'findSpecBook/update',
      payload,
      callback: this.callback
    });
  };

  indexNoChange = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    dispatch({
      type: 'commonTableData/update',
      path: 'findSpecBook/changeIndexNo',
      payload: {
        findSpecBookId: record.findSpecBookId,
        indexNo: record.indexNo
      },
      callback: cb
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
          path: 'findSpecBook/remove',
          payload: { findSpecBookId: record.findSpecBookId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  changeIndex = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForUpdate',
      path: 'findSpecBook/getDataForUpdate',
      payload: { findSpecBookId: record.findSpecBookId }
    });
    this.setState({
      modalCreateEditVisible: true,
      modalTitle: '修改排序'
    });
  };

  goBackSpec = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/goUrl',
      path: '/findServer/findSpec',
      payload: {
        page: defaultPage()
      }
    });
  };

  tableChange = pagination => {
    const { formValues } = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page
    });
    this.refresh(formValues, page);
  };

  render() {
    const { commonTableData, restTableData, loading } = this.props;
    const { modalVisible, modalCreateEditVisible, modalTitle } = this.state;

    const columns = [
      { title: '序号', render: (text, record, index) => <Fragment>{index + 1}</Fragment> },
      { title: '图书名称', dataIndex: 'bookName' },
      { title: '上传者ID', dataIndex: 'bookUserId' },
      { title: '排序', dataIndex: 'indexNo' },
      {
        title: '图书封面',
        dataIndex: 'wholeCoverPath',
        render: (text, record) => (
          <Fragment>
            <img
              alt=""
              style={{ width: 100, height: 100 }}
              src={record.wholeCoverPath}
            />
          </Fragment>
        )
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: text => <Fragment>{translateDate(text)}</Fragment>
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        render: text => <Fragment>{translateDate(text) || '暂无更新'}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.changeIndex(record)}>排序</a>
            <Divider type="vertical" />
            <a onClick={() => this.remove(record)}>删除</a>
          </Fragment>
        )
      }
    ];

    const parentMethods = {
      update: this.update,
      closeModal: this.closeModal,
      addSave: this.addSave,
      indexNoChange: this.indexNoChange
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                type="primary"
                onClick={() => this.getSelect()}
              >
                新增图书
              </Button>
              <Button
                type="primary"
                onClick={() => this.goBackSpec()}
              >
                返回榜单
              </Button>
            </div>
            <Table
              dataSource={restTableData.pageData.list}
              columns={columns}
              rowKey="findSpecBookId"
              pagination={restTableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <ChangeIndexNoForm
          {...parentMethods}
          modalVisible={modalCreateEditVisible}
          formData={commonTableData.formData}
          title={modalTitle}
          state={this.state}
        />
        <SelectBookBuy
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
