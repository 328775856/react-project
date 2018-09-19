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
  Table,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import CreateFindForm from './FindSuggestBook_find';
import CreateEditForm from './FindSuggestBook_edit';
import { defaultPage } from '../../../utils/utils.js';
import SelectBookShare from '../../Select/SelectBookShare';

@connect(({ tableData, commonTableData, loading }) => ({
  tableData,
  commonTableData,
  loading: loading.models.crud,
}))
@Form.create()
export default class FindSuggestBook extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: [],
    selectedChannel: '',
  };

  componentDidMount() {
    this.initOptions();
  }

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'findSuggestBook/getDataForUpdate',
      payload: { findSuggestBookId: record.findSuggestBookId },
    });
    this.setState({
      modalTitle: '修改图书推荐',
      updateModalVisible: true,
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
      author: selectedRows[0].bookAuthor,
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
          path: 'findSuggestBook/remove',
          payload: { findSuggestBookId: record.findSuggestBookId },
          callback: cb,
        });
      },
      onCancel() {},
    });
  };

  publish = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定发布吗?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'findSuggestBook/publish',
          payload: {
            findSuggestBookId: record.findSuggestBookId,
          },
          callback: cb,
        });
      },
      onCancel() {},
    });
  };

  off = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定取消发布吗?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'findSuggestBook/off',
          payload: {
            findSuggestBookId: record.findSuggestBookId,
          },
          callback: cb,
        });
      },
      onCancel() {},
    });
  };

  query = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };
      const page = defaultPage();
      this.setState({
        formValues: values,
        page,
      });
      this.refresh(values, page);
    });
  };

  selectBook = () => {
    this.setState({
      modalVisible: true,
      modalTitle: '选择图书',
    });
  };

  closeModal = key => {
    if (!key) {
      this.setState({
        modalVisible: false,
      });
    } else {
      const newState = {};
      newState[key] = false;
      this.setState(newState);
    }
  };

  initOptionsCallback = response => {
    const { page } = this.state;
    const result = JSON.parse(response.data);
    this.refresh({ findChannelId: result[0].findChannelId }, page);
    this.setState({
      options: result,
      selectedChannel: result[0].findChannelId,
      formValues: { findChannelId: result[0].findChannelId },
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'findSuggestBook/getDataForAdd',
      payload: {
        channelType: 3,
      },
      callback: this.initOptionsCallback,
    });
  };

  handleChange = item => {
    this.setState({
      selectedChannel: item,
    });
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.findChannelId = item;
      const values = {
        ...fieldsValue,
      };
      const page = defaultPage();
      this.setState({
        formValues: values,
        page,
      });
      this.refresh(values, page);
    });
  };

  add = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'findSuggestBook/add',
      payload: fields,
      callback: this.callback,
    });
  };

  addSave = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'findSuggestBook/add',
      payload: fields,
      callback: this.callback,
    });
  };

  update = fields => {
    const { dispatch, tableData } = this.props;
    const payload = {
      ...tableData.formData,
      ...fields,
    };
    dispatch({
      type: 'tableData/update',
      path: 'findSuggestBook/update',
      payload,
      callback: this.callback,
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
      pageNo: pagination.current,
    };
    this.setState({
      page,
    });
    this.refresh(formValues, page);
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'findSuggestBook/page',
      payload: {
        data: values,
        page,
      },
    });
    this.setState({
      modalVisible: false,
      updateModalVisible: false,
    });
  };

  renderForm() {
    const { options } = this.state;
    return CreateFindForm(this.props, this.query, this.formReset, options, this.handleChange);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, selectedChannel, updateModalVisible, options } = this.state;

    const columns = [
      {
        title: '系统id',
        dataIndex: 'findSuggestBookId',
      },
      {
        title: '所属栏目',
        dataIndex: 'findChannelId',
        render(text, record) {
          const dict = recordRow => {
            let res = '';
            for (let i = 0; i < options.length; i += 1) {
              if (recordRow.findChannelId === options[i].findChannelId) {
                res = options[i].channelName;
                break;
              }
            }
            return res;
          };
          return <Fragment>{dict(record)}</Fragment>;
        },
      },
      {
        title: '图书名',
        dataIndex: 'bookName',
      },
      {
        title: '图书荐语',
        dataIndex: 'suggestDesc',
      },
      {
        title: '顺序',
        dataIndex: 'indexNo',
      },
      {
        title: '发布状态',
        dataIndex: 'publishStatus',
        render: (text, record) => (
          <Fragment>
            {record.publishStatus === 1
              ? '已发布'
              : record.publishStatus === 2
                ? `定时发布：${record.publishDate}`
                : '未发布'}
          </Fragment>
        ),
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.publish(record)}>发布</a>
            <Divider type="vertical" />
            <a onClick={() => this.off(record)}>取消发布</a>
            <Divider type="vertical" />
            <a onClick={() => this.remove(record)}>删除</a>
            <Divider type="vertical" />
            <a onClick={() => this.getDataForUpdate(record)}>修改</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      add: this.add,
      addSave: this.addSave,
      update: this.update,
      closeModal: this.closeModal,
      getSelectedDate: this.getSelectedDate,
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={this.selectBook}>
                新增
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
          title={modalTitle}
          selectedChannel={selectedChannel}
        />
        <SelectBookShare {...parentMethods} modalVisible={modalVisible} modalTitle={modalTitle} />
      </PageHeaderLayout>
    );
  }
}
