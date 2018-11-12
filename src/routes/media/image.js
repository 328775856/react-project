import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
  Divider
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './imageEdit';
import CreateFindForm from './imageFind';
import { defaultPage, mul, div, formatTime } from '../../utils/utils.js';
import SelectUserInfo from '../Select/SelectUserInfo';

const FormItem = Form.Item;

@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    selectedRows: [],
    formValues: {},
    options: [],
    userInfoModalVisible: false,
    page: defaultPage(),
    userId: '',
    nickname: ''
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/image/getImagePage',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false,
      userInfoModalVisible: false
    });
  };

  componentWillMount() {
    const { restTableData } = this.props;
    restTableData.pageData.list = [];
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    this.initOptions();
    this.refresh(formValues, page);
  }

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

  formReset = () => {
    const { form } = this.props;
    this.setState({ userId: '' });
    form.resetFields();
  };

  selectRows = rows => {
    this.setState({
      selectedRows: rows
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

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/initOptionElement',
      path: 'media/imageGroup/getGroupPage',
      payload: {
        data: {},
        page: {
          pageNo: 1,
          pageSize: 1000
        }
      },
      option: {
        optionKey: 'imageGroup',
        key: 'mediaImageGroupId',
        value: 'imageGroupName'
      }
    });
  };

  add = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForAdd',
      path: 'media/image/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  addSave = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/add',
      path: 'media/image',
      payload: fields,
      callback: this.callback
    });
  };

  update = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getById',
      path: `media/image/${record.mediaImageId}`
    });
    this.setState({
      modalTitle: '修改图片',
      modalVisible: true
    });
  };

  updateSave = fields => {
    const { dispatch, restTableData } = this.props;
    const payload = {
      ...restTableData.formData,
      ...fields
    };
    dispatch({
      type: 'restTableData/update',
      path: 'media/image',
      payload: payload,
      callback: this.callback
    });
  };

  callback = () => {
    const { restTableData } = this.props;
    if (restTableData.status == 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(restTableData.message);
    }
  };

  delete = record => {
    const { dispatch, restTableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'restTableData/delete',
          path: 'media/image',
          payload: { mediaImageId: record.mediaImageId },
          callback: cb
        });
      },
      onCancel() {}
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

  renderForm() {
    const { restTableData } = this.props;
    return CreateFindForm(
      this.props,
      this.state.userId,
      this.state.nickname,
      this.query,
      this.formReset,
      restTableData.imageGroup,
      this.add,
      this.openSelectUserInfoModal
    );
  }

  render() {
    const { restTableData, loading } = this.props;
    const { selectedRows, modalVisible, modalTitle } = this.state;
    const columns = [
      {
        title: '分组名称',
        dataIndex: 'mediaImageGroupName'
      },
      {
        title: '图片名称',
        dataIndex: 'imageName'
      },
      {
        title: '略缩图',
        dataIndex: 'imagePath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 100, height: 100 }} src={record.domain} />
          </Fragment>
        )
      },
      {
        title: '用户名称',
        dataIndex: 'userName'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.update(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(record)}>删除</a>
          </Fragment>
        )
      }
    ];

    const parentMethods = {
      addSave: this.addSave,
      updateSave: this.updateSave,
      closeModal: this.closeModal
    };

    const parentMethodsForUserInfo = {
      callReturn: this.callSelectUserInfoReturn,
      closeModal: this.closeSelectUserInfoModal
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={restTableData.pageData}
              columns={columns}
              rowKey="mediaImageId"
              onSelectRow={this.selectRows}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={restTableData.formData}
          title={modalTitle}
          imageGroup={restTableData.imageGroup}
        />
        <SelectUserInfo
          {...parentMethodsForUserInfo}
          modalVisible={this.state.userInfoModalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
