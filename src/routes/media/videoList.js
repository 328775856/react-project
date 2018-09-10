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
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './videoEdit';
import CreateFindForm from './videoFind';
import { defaultPage, mul, div } from '../../utils/utils.js';
const FormItem = Form.Item;
@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.crud,
}))
@Form.create()
export default class MediaVideo extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
  };

  initGroup = () => {
    const { dispatch } = this.props;
    dispatch({
        type: 'restTableData/initOptionElement',
        path:'media/videoGroup/page',
        payload:{
            data: {},
            page: {
                pageNo: 1,
                pageSize: 1000
            },
        },
        option: {
            optionKey: 'videoGroup',
            key: 'mediaVideoGroupId',
            value: 'videoGroupName'
        },
    });
  }

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/video/page',
      payload: {
        data: values,
        page: page,
      },
    });
    this.setState({
      modalVisible: false,
    });
  };

  componentDidMount() {
    const { formValues, page } = this.state;
    this.initGroup();
    this.refresh(formValues, page);
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    let page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current,
    };
    this.setState({
      page: page,
    });
    this.refresh(formValues, page);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
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
          path: 'media/video',
          payload: { mediaVideoId: record.mediaVideoId },
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
        page: page,
      });
      this.refresh(values, page);
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };
  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForAdd',
      path: 'media/video/getDataForAdd',
      payload: fields,
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true,
    });
  };

  add = fields => {
    const { dispatch, restTableData } = this.props;
    dispatch({
      type: 'restTableData/add',
      path: 'media/video',
      payload: fields,
      callback: this.callback,
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForUpdate',
      path: 'media/video/getDataForUpdate',
      payload: { mediaVideoId: record.mediaVideoId },
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true,
    });
  };

  update = fields => {
    const { dispatch, restTableData } = this.props;
    let payload = {
      ...restTableData.formData,
      ...fields,
    };
    dispatch({
      type: 'restTableData/update',
      path: 'media/video',
      payload: payload,
      callback: this.callback,
    });
  };

  renderForm() {
    const {restTableData} = this.props;
    return CreateFindForm(this.props, this.query, this.formReset, restTableData.videoGroup);
  }

  render() {
    const { restTableData, loading } = this.props;
    const { modalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: '系统id',
        dataIndex: 'mediaVideoId',
      },
      {
        title: '分组ID',
        dataIndex: 'mediaVideoGroupId',
      },
      {
        title: '名称',
        dataIndex: 'videoName',
      },
      {
        title: '视频格式(字典)',
        dataIndex: 'videoFormat',
      },
      {
        title: '时长-分钟',
        dataIndex: 'videoMinute',
      },
      {
        title: '时长-秒',
        dataIndex: 'videoSecond',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForUpdate(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(record)}>删除</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
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
              dataSource={restTableData.pageData.list}
              columns={columns}
              rowKey="mediaVideoId"
              pagination={restTableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={restTableData.formData}
          title={modalTitle}
          videoGroup={restTableData.videoGroup}
          mul={mul}
          div={div}
        />
      </PageHeaderLayout>
    );
  }
}
