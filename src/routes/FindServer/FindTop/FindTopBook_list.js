import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Modal, message, Divider, Table } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import SelectBookShare from '../../Select/SelectBookShare';
import CreateEditForm from './FindTopBook_edit';
import { defaultPage } from '../../../utils/utils.js';

@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
export default class FindTopBook extends PureComponent {
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
    const { tableData } = this.props;
    const paramData = {
      ...tableData.formData
    };
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

  getSelectedDate = selectedRows => ({
    bookUserId: selectedRows[0].bookUserId,
    bookName: selectedRows[0].bookName,
    coverPath: selectedRows[0].coverPath,
    indexNo: 1
  });

  callback = () => {
    const { tableData } = this.props;
    this.closeModal();
    if (tableData.status === 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(tableData.message);
    }
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      modalCreateEditVisible: false
    });
  };

  addSave = fields => {
    const { dispatch } = this.props;
    const { paramData } = this.state;
    const payload = {
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'tableData/add',
      path: 'findTopBook/add',
      payload,
      callback: this.callback
    });
    this.closeModal();
  };

  update = fields => {
    const { dispatch, tableData } = this.props;
    const { paramData } = this.state;
    const payload = {
      ...tableData.formData,
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'tableData/update',
      path: 'findTopBook/update',
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
          type: 'tableData/remove',
          path: 'findTopBook/remove',
          payload: { findTopBookId: record.findTopBookId },

          callback: cb
        });
      },
      onCancel() {}
    });
  };

  changeIndex = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'findTopBook/getDataForUpdate',
      payload: { findTopBookId: record.findTopBookId }
    });
    this.setState({
      modalCreateEditVisible: true,
      modalTitle: '修改排序'
    });
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    const { paramData } = this.state;
    let params = {
      ...paramData,
      ...values
    };
    dispatch({
      type: 'tableData/list',
      path: 'findTopBook/page',
      payload: {
        data: params,
        page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  goBackTop = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/goUrl',
      path: '/FindServer/findTop',
      payload: {}
    });
  };

  formtTime = data => (
    <Fragment>{`${data.substring(0, 4)}-${data.substring(4, 6)}-${data.substring(6, 8)}`}</Fragment>
  );

  tableChange = pagination => {
    const { formValues } = this.state;
    let page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page
    });
    this.refresh(formValues, page);
  };

  closeSelectBookShareModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  callSelectBookShareReturn = record => {
    if (record != null) {
      const myFormData = {
        bookUserId: record[0].bookUserId,
        bookName: record[0].bookName,
        coverPath: record[0].coverPath,
        indexNo: 1
      };
      this.addSave(myFormData);
    }
    this.closeSelectBookShareModal();
  };

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalCreateEditVisible, modalTitle } = this.state;

    const columns = [
      { title: '系统Id', dataIndex: 'findTopBookId' },
      {
        title: '榜单Id',
        dataIndex: 'findTopId'
      },
      { title: '用户图书Id', dataIndex: 'bookUserId' },
      { title: '图书名称', dataIndex: 'bookName' },
      {
        title: '课程封面',
        dataIndex: 'wholeCoverPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholeCoverPath} />
          </Fragment>
        )
      },
      { title: '排序', dataIndex: 'indexNo' },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (text, record) => (
          <Fragment>
            {record.createTime === undefined ? '' : this.formtTime(record.createTime.toString())}
          </Fragment>
        )
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        render: (text, record) => (
          <Fragment>
            {record.modifyTime === undefined ?
              '' :
              record.modifyTime === 0 ?
                '暂无更新' :
                this.formtTime(record.modifyTime.toString())}
          </Fragment>
        )
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
      getSelectedDate: this.getSelectedDate,
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
      addSave: this.addSave
    };

    const parentMethodsForBook = {
      callReturn: this.callSelectBookShareReturn,
      closeModal: this.closeSelectBookShareModal
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.getSelect()}>
                新增图书
              </Button>
              <Button type="primary" onClick={() => this.goBackTop()}>
                返回榜单
              </Button>
            </div>
            <Table
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="findTopBookId"
              pagination={tableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalCreateEditVisible}
          formData={tableData.formData}
          title={modalTitle}
          state={this.state}
        />
        <SelectBookShare
          {...parentMethodsForBook}
          modalVisible={modalVisible}
          modalTitle={modalTitle}
        />
      </PageHeaderLayout>
    );
  }
}
