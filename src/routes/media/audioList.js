import React, { Fragment, PureComponent } from 'react';
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
  Divider,
  Table
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './audioEdit';
import CreateFindForm from './audioFind';
import { defaultPage, mul, div, formatTime } from '../../utils/utils.js';

const FormItem = Form.Item;

const formatList = ['aac', 'mp3'];
@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class MediaAudio extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: {},
    isNew:false
  };

  initGroup = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/initOptionElement',
      path: 'media/audioGroup/page',
      payload: {
        data: {},
        page: {
          pageNo: 1,
          pageSize: 1000
        }
      },
      option: {
        optionKey: 'audioGroup',
        key: 'mediaAudioGroupId',
        value: 'audioGroupName'
      }
    });
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/audio/page',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  componentWillMount() {
    const { restTableData } = this.props;
    restTableData.pageData.list = '';
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    // this.initOptions();
    this.initGroup();
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
          path: 'media/audio',
          payload: { mediaAudioId: record.mediaAudioId },
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

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/initOptions',
      path: 'media/audio/getDataForAdd',
      payload: {},
      callback: this.initOptionsCallback
    });
  };

  initOptionsCallback = response => {
    console.log(response);
    this.setState({
      options: JSON.parse(response.data)
    });
  };

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForAdd',
      path: 'media/audio/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true,
      isNew:true
    });
  };

  add = fields => {
    const { dispatch, restTableData } = this.props;
    dispatch({
      type: 'restTableData/add',
      path: 'media/audio',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getData',
      path: 'media/audio/getDataForUpdate',
      payload: { mediaAudioId: record.mediaAudioId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true,
      isNew:false
    });
  };

  update = fields => {
    const { dispatch, restTableData } = this.props;
    const payload = {
      ...restTableData.formData,
      ...fields
    };
    dispatch({
      type: 'restTableData/update',
      path: 'media/audio',
      payload,
      callback: this.callback
    });
  };

  renderForm() {
    const { restTableData } = this.props;
    return CreateFindForm(this.props, this.query, this.formReset, restTableData.audioGroup);
  }

  render() {
    const { restTableData, loading } = this.props;
    const { modalVisible, modalTitle, options } = this.state;

    const columns = [
      {
        title: '分组',
        dataIndex: 'mediaAudioGroupName'
      },
      {
        title: '名称',
        dataIndex: 'audioName'
      },
      {
        title: '音频图径',
        dataIndex: 'audioPath'
      },
      {
        title: '音频格式',
        dataIndex: 'audioFormat',
        render(text, record) {
          return <Fragment>{formatList[text - 1]}</Fragment>;
        }
      },
      {
        title: '时长-分钟',
        dataIndex: 'minute'
      },
      {
        title: '时长-秒',
        dataIndex: 'second'
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
            <a onClick={() => this.getDataForUpdate(record)}>修改</a>
          </Fragment>
        )
      }
    ];
    const parentMethods = {
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
      options
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
              dataSource={restTableData.pageData.list || []}
              columns={columns}
              rowKey="mediaAudioId"
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
          isNew={this.state.isNew}
          audioGroup={restTableData.audioGroup}
          mul={mul}
          div={div}
        />
      </PageHeaderLayout>
    );
  }
}
