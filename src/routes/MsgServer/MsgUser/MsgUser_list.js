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
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import CreateEditForm from './MsgUser_edit';
import CreateFindForm from './MsgUser_find';
import { defaultPage } from '../../../utils/utils.js';
import SelectUserInfo from '../../Select/SelectUserInfo';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class MsgUser extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    userInfoModalVisible: false,
    userId: '',
    nickname: ''
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'msgUser/page',
      payload: {
        data: values,
        page: page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  componentDidMount() {
    const { formValues, page } = this.state;
    this.refresh(formValues, page);
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
          path: 'msgUser/remove',
          payload: { msgUserId: record.msgUserId },
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

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'msgUser/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  openSelectUserInfoModal = () => {
    this.setState({
      modalTitle: '选择用户',
      userInfoModalVisible: true
    });
  };

  callSelectUserInfoReturn = record => {
    if (record != null) {
      this.setState({ userId: record[0].userId });
      this.setState({ nickname: record[0].nickname });
    }
    this.closeSelectUserInfoModal();
  };

  closeSelectUserInfoModal = () => {
    this.setState({
      userInfoModalVisible: false
    });
  };

  add = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'msgUser/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'msgUser/getDataForUpdate',
      payload: { msgUserId: record.msgUserId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
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
      path: 'msgUser/update',
      payload: payload,
      callback: this.callback
    });
  };

  renderForm() {
    return CreateFindForm(
      this.props,
      this.state.userId,
      this.state.nickname,
      this.query,
      this.formReset,
      this.openSelectUserInfoModal
    );
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle } = this.state;
    const parentMethodsForUserInfo = {
      callReturn: this.callSelectUserInfoReturn,
      closeModal: this.closeSelectUserInfoModal
    };
    const columns = [
      {
        title: '用户消息ID',
        dataIndex: 'msgUserId'
      },
      {
        title: '用户id',
        dataIndex: 'userId'
      },
      {
        title: '用户昵称',
        dataIndex: 'nickname'
      },
      {
        title: '消息标题',
        dataIndex: 'msgTitle'
      },
      {
        title: '消息内容',
        dataIndex: 'msgContent',
        render(text, record) {
          if ((text || '.').length > 40) {
            return `${text.substring(0, 40)}......`;
          }
          return text;
        }
      },
      {
        title: '是否已读',
        dataIndex: 'isRead'
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

    const parentMethods = {
      add: this.add,
      update: this.update,
      closeModal: this.closeModal
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.getDataForAdd()}>
                新建
              </Button>
            </div>
            <Table
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="msgUserId"
              pagination={tableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={tableData.formData}
          title={modalTitle}
        />
        <SelectUserInfo
          {...parentMethodsForUserInfo}
          modalVisible={this.state.userInfoModalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
