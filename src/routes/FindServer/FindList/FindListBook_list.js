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
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import CreateEditForm from './FindListBook_edit';
import SelectBookShare from '../../Select/SelectBookShare';
import CreateFindForm from './FindListBook_find';
import { defaultPage } from '../../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class FindListBook extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    listId: '',
    updateModalVisible: false
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'findListBook/page',
      payload: {
        data: values,
        page: page
      }
    });
    this.setState({
      modalVisible: false,
      updateModalVisible: false
    });
  };

  componentWillMount() {
    const { tableData } = this.props;
    tableData.pageData.list = [];
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    const { tableData } = this.props;
    let findListId = tableData.formData ? tableData.formData.listId : '';
    this.setState({
      listId: findListId,
      formValues: { findListId: findListId }
    });
    this.refresh({ findListId: findListId }, page);
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    let page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page: page
    });
    this.refresh(formValues, page);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  callback = () => {
    const { tableData } = this.props;
    if (tableData.status == 200) {
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
          path: 'findListBook/remove',
          payload: { findListBookId: record.findListBookId },
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
        page: page
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

  closeModal = key => {
    if (!key) {
      this.setState({
        modalVisible: false
      });
    } else {
      let newState = {};
      newState[key] = false;
      this.setState(newState);
    }
  };

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'findListBook/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  add = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'findListBook/add',
      payload: fields,
      callback: this.callback
    });
  };

  addSave = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'findListBook/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'findListBook/getDataForUpdate',
      payload: { findListBookId: record.findListBookId }
    });
    this.setState({
      modalTitle: '修改',
      updateModalVisible: true
    });
  };

  update = fields => {
    const { dispatch, tableData } = this.props;
    let payload = {
      ...tableData.formData,
      ...fields
    };
    dispatch({
      type: 'tableData/update',
      path: 'findListBook/update',
      payload: payload,
      callback: this.callback
    });
  };

  getSelectedDate = selectedRows => {
    const returnData = {
      findListId: this.state.listId,
      bookUserId: selectedRows[0].bookUserId,
      bookName: selectedRows[0].bookName,
      coverPath: selectedRows[0].coverPath,
      indexNo: 1
    };
    return returnData;
  };

  closeSelectBookShareModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  callSelectBookShareReturn = record => {
    if (record != null) {
      //Todo 此处应该可以 传入数组，需后台接口支持
      for (let i = 0; i < record.length; i++) {
        const myFormData = {
          findListId: this.state.listId,
          bookUserId: record[i].bookUserId,
          bookName: record[i].bookName,
          coverPath: record[i].coverPath,
          indexNo: 1
        };
        this.addSave(myFormData);
      }
    }
    this.closeSelectBookShareModal();
  };

  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/goUrl',
      path: '/findServer/findList',
      payload: {}
    });
  };

  renderForm() {
    const { tableData } = this.props;
    let findListId = tableData.formData ? tableData.formData.listId : '';
    return CreateFindForm(this.props, this.query, this.formReset, findListId);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, updateModalVisible, listId } = this.state;

    const columns = [
      {
        title: '系统id',
        dataIndex: 'findListBookId'
      },
      {
        title: '所属书单',
        dataIndex: 'findListId'
      },
      {
        title: '图书用户id',
        dataIndex: 'bookUserId'
      },
      {
        title: '图书名称',
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
        title: '顺序',
        dataIndex: 'indexNo'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForUpdate(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.remove(record)}>删除</a>
          </Fragment>
        )
      }
    ];

    const parentMethodsForBook = {
      callReturn: this.callSelectBookShareReturn,
      closeModal: this.closeSelectBookShareModal
    };

    const parentMethods = {
      add: this.add,
      addSave: this.addSave,
      getSelectedDate: this.getSelectedDate,
      update: this.update,
      closeModal: this.closeModal
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.selectBook()}>
                新建
              </Button>
              <Button type="default" onClick={() => this.back()}>
                返回
              </Button>
            </div>
            <Table
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="findListBookId"
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
          listId={listId}
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
