import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Modal, message, Divider, Table } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import SelectCourseInfo from '../../Select/SelectCourseInfo';
import ChangeIndexNoForm from './FindSpec_indexNo';
import { defaultPage, translateDate } from '../../../utils/utils.js';

@connect(({ commonTableData, loading }) => ({
  commonTableData,
  loading: loading.models.crud
}))
export default class FindSpecCourse extends PureComponent {
  state = {
    modalCourseVisible: false,
    modalIndexNoVisible: false,
    modalTitle: '',
    page: defaultPage(),
    paramData: {}
  };

  componentWillMount() {
    const { commonTableData } = this.props;
    commonTableData.pageData.list = '';
  }

  componentDidMount() {
    const { commonTableData } = this.props;
    const id = commonTableData.formData.findSpecId;
    if (!id) {
      this.goBackSpec();
    }
    const { paramData } = this.state;
    paramData.findSpecId = id;
    this.refresh();
  }

  getSelect = () => {
    this.setState({ modalCourseVisible: true });
  };

  addSave = record => {
    if (record != null) {
      const { dispatch } = this.props;
      const { paramData } = this.state;
      const payload = {
        ...record[0],
        ...paramData
      };
      dispatch({
        type: 'commonTableData/add',
        path: 'findSpecCourse/add',
        payload,
        callback: this.callback
      });
    }
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
      path: 'findSpecCourse/update',
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
          path: 'findSpecCourse/remove',
          payload: { findSpecCourseId: record.findSpecCourseId },
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
      path: 'findSpecCourse/getDataForUpdate',
      payload: { findSpecCourseId: record.findSpecCourseId }
    });
    this.setState({
      modalIndexNoVisible: true,
      modalTitle: '修改排序'
    });
  };

  callback = () => {
    const { commonTableData } = this.props;
    this.closeModal();
    if (commonTableData.status === 200) {
      this.refresh();
    } else {
      message.success(commonTableData.message);
    }
  };

  closeModal = () => {
    this.setState({
      modalCourseVisible: false,
      modalIndexNoVisible: false
    });
  };

  closeIndexNoModal = () => {
    this.setState({ modalIndexNoVisible: false });
  };

  closeCourseModal = () => {
    this.setState({ modalCourseVisible: false });
  };

  refresh = () => {
    const { dispatch } = this.props;
    const { page, paramData } = this.state;
    const data = {
      ...paramData
    };
    dispatch({
      type: 'commonTableData/list',
      path: 'findSpecCourse/page',
      payload: { data, page }
    });
  };

  indexNoChange = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    dispatch({
      type: 'commonTableData/update',
      path: 'findSpecCourse/changeIndexNo',
      payload: {
        findSpecCourseId: record.findSpecCourseId,
        indexNo: record.indexNo
      },
      callback: cb
    });
  };

  goBackSpec = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/goUrl',
      path: '/FindServer/findSpec',
      payload: {}
    });
  };

  tableChange = pagination => {
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({ page });
    this.refresh();
  };

  render() {
    const { commonTableData, loading } = this.props;
    const { modalCourseVisible, modalIndexNoVisible, modalTitle } = this.state;

    const columns = [
      { title: '序号', render: (text, record, index) => <Fragment>{index + 1}</Fragment> },
      { title: '专题ID', dataIndex: 'findSpecId' },
      { title: '课程ID', dataIndex: 'courseId' },
      { title: '排序', dataIndex: 'indexNo' },
      {
        title: '课程封面',
        dataIndex: 'wholeCoverPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholeCoverPath} />
          </Fragment>
        )
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (text, record) => <Fragment>{translateDate(text)}</Fragment>
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        render: (text, record) => <Fragment>{translateDate(text) || '暂无更新'}</Fragment>
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

    const parentIndexNoMethods = {
      closeModal: this.closeIndexNoModal,
      indexNoChange: this.indexNoChange
    };

    const parentCourseMethods = {
      callReturn: this.addSave,
      closeModal: this.closeCourseModal
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.getSelect()}>
                新增课程
              </Button>
              <Button type="primary" onClick={() => this.goBackSpec()}>
                返回专题
              </Button>
            </div>
            <Table
              dataSource={commonTableData.pageData.list}
              columns={columns}
              rowKey="findSpecCourseId"
              pagination={commonTableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <ChangeIndexNoForm
          {...parentIndexNoMethods}
          modalVisible={modalIndexNoVisible}
          formData={commonTableData.formData}
          title={modalTitle}
          state={this.state}
        />
        <SelectCourseInfo {...parentCourseMethods} modalVisible={modalCourseVisible} />
      </PageHeaderLayout>
    );
  }
}
