import React, { Fragment, PureComponent } from 'react';
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
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import CreateFindForm from './FindBorrowBookStat_find';
import CreateEditForm from './FindBorrowBookStat_edit';
import { defaultPage, formatDate } from '../../../utils/utils.js';
import SelectBookShare from '../../Select/SelectBookShare';

@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class FindBorrowBookStat extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    modalTitle: '',
    updateModalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: [],
    selectedChannel: ''
  };

  componentDidMount() {
    this.initOptions();
  }

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'findBorrowBookStat/getDataForUpdate',
      payload: { findBorrowBookStatId: record.findBorrowBookStatId }
    });
    this.setState({
      updateModalVisible: true,
      updateModalTitle: '修改'
    });
  };

  getSelectedDate = selectedRows => {
    const { selectedChannel } = this.state;
    const returnData = {
      findChannelId: selectedChannel,
      bookUserId: selectedRows[0].bookUserId,
      bookName: selectedRows[0].bookName,
      coverPath: selectedRows[0].coverPath,
      suggestDesc: '',
      indexNo: 1,
      author: selectedRows[0].bookAuthor
    };
    return returnData;
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

  remove = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'tableData/remove',
          path: 'findBorrowBookStat/remove',
          payload: { findBorrowBookStatId: record.findBorrowBookStatId },
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
      const page = defaultPage();
      this.setState({
        formValues: values,
        page
      });
      this.refresh(values, page);
    });
  };

  selectBook = () => {
    this.setState({
      modalVisible: true,
      modalTitle: '选择图书'
    });
  };

  closeModal = () => {
    this.setState({
      updateModalVisible: false
    });
  };

  initOptionsCallback = response => {
    const { page } = this.state;
    const result = JSON.parse(response.data);
    this.refresh({ findChannelId: result[0].findChannelId }, page);
    this.setState({
      options: result,
      selectedChannel: result[0].findChannelId,
      formValues: { findChannelId: result[0].findChannelId }
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'findBorrowBookStat/getDataForAdd',
      payload: {
        channelType: 3
      },
      callback: this.initOptionsCallback
    });
  };

  handleChange = item => {
    this.setState({
      selectedChannel: item
    });
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.findChannelId = item;
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

  add = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'findBorrowBookStat/add',
      payload: fields,
      callback: this.callback
    });
  };

  addSave = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'findBorrowBookStat/add',
      payload: fields,
      callback: this.callback
    });
  };

  update = fields => {
    const { dispatch, tableData } = this.props;
    const payload = {
      ...tableData.formData,
      ...fields
    };
    dispatch({
      type: 'tableData/update',
      path: 'findBorrowBookStat/update',
      payload,
      callback: this.callback
    });
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  tableChange = (pagination, filtersArg, sorter) => {
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

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'findBorrowBookStat/page',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false,
      updateModalVisible: false
    });
  };

  closeSelectBookShareModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  callSelectBookShareReturn = record => {
    const { selectedChannel } = this.state;
    if (record != null) {
      const myFormData = {
        findChannelId: selectedChannel,
        bookUserId: record[0].bookUserId,
        bookName: record[0].bookName,
        coverPath: record[0].coverPath,
        suggestDesc: '',
        indexNo: 1,
        author: record[0].bookAuthor
      };
      this.addSave(myFormData);
    }
    this.closeSelectBookShareModal();
  };

  renderForm() {
    const { options } = this.state;
    return CreateFindForm(this.props, this.query, this.formReset, options, this.handleChange);
  }

  render() {
    const { tableData, loading } = this.props;
    const {
      modalVisible,
      modalTitle,
      selectedChannel,
      updateModalVisible,
      options,
      updateModalTitle
    } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'findBorrowBookStatId'
      },
      {
        title: '图书名',
        dataIndex: 'bookName'
      },
      {
        title: '图书封面',
        dataIndex: 'wholePhotoPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholePhotoPath} />
          </Fragment>
        )
      },
      {
        title: '借阅量',
        dataIndex: 'numBorrow'
      },
      {
        title: '顺序',
        dataIndex: 'indexNo'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.remove(record)}>删除</a>
            <Divider type="vertical" />
            <a onClick={() => this.getDataForUpdate(record)}>修改</a>
          </Fragment>
        )
      }
    ];

    const parentMethodsForBook = {
      callReturn: this.callSelectBookShareReturn,
      closeModal: this.closeSelectBookShareModal
    };

    const parentMethods = {
      update: this.update,
      closeModal: this.closeModal,
      getSelectedDate: this.getSelectedDate
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={this.selectBook}>
                新建
              </Button>
            </div>
            <Table
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="findSuggestBookId"
              pagination={tableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          updateModalVisible={updateModalVisible}
          formData={tableData.formData}
          title={updateModalTitle}
          selectedChannel={selectedChannel}
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
