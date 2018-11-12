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
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './digestEdit';
import CreateFindForm from './digestFind';
import { defaultPage, formatDate } from '../../utils/utils.js';
import TimeToPublishForm from './digestTimeToPublish';

const FormItem = Form.Item;
@connect(({ commonTableData, loading }) => ({
  commonTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class DynaDigest extends PureComponent {
  state = {
    modalVisible: false,
    timeToPushModalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: {}
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/list',
      path: 'dynaDigest/page',
      payload: {
        data: values,
        page: page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  componentWillMount() {
    const { commonTableData } = this.props;
    commonTableData.pageData.list = [];
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    this.initOptions();
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
    const { commonTableData } = this.props;
    if (commonTableData.status == 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(commonTableData.message);
    }
  };

  initOptionsCallback = response => {
    this.setState({
      options: JSON.parse(response.data)
    });
  };

  remove = record => {
    const { dispatch, commonTableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'commonTableData/remove',
          path: 'dynaDigest/remove',
          payload: { dynaDigestId: record.dynaDigestId },
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
      type: 'commonTableData/getDataForAdd',
      path: 'dynaDigest/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  add = fields => {
    const { dispatch, commonTableData } = this.props;
    dispatch({
      type: 'commonTableData/add',
      path: 'dynaDigest/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForUpdate',
      path: 'dynaDigest/getDataForUpdate',
      payload: { dynaDigestId: record.dynaDigestId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/initOptions',
      path: 'dynaDigest/getDataForAdd',
      payload: {},
      callback: this.initOptionsCallback
    });
  };

  publish = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定发布吗?',
      onOk() {
        dispatch({
          type: 'commonTableData/update',
          path: 'dynaDigest/publish',
          payload: {
            dynaDigestId: record.dynaDigestId
          },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  off = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定取消发布吗?',
      onOk() {
        dispatch({
          type: 'commonTableData/update',
          path: 'dynaDigest/off',
          payload: {
            dynaDigestId: record.dynaDigestId
          },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  getDataForTimeToPublish = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForUpdate',
      path: 'dynaDigest/getDataForUpdate',
      payload: { dynaDigestId: record.dynaDigestId }
    });
    this.setState({
      modalTitle: '定时发布',
      timeToPushModalVisible: true
    });
  };

  timeToPublish = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/update',
      path: 'dynaDigest/timeToPublish',
      payload: {
        dynaDigestId: record.dynaDigestId,
        publishDate: record.publishDate
      },
      callback: this.callback
    });
  };

  update = fields => {
    const { dispatch, commonTableData } = this.props;
    let payload = {
      ...commonTableData.formData,
      ...fields
    };
    dispatch({
      type: 'commonTableData/update',
      path: 'dynaDigest/update',
      payload: payload,
      callback: this.callback
    });
  };

  formatState = text => {
    if (text == 0) {
      return '未发布';
    }
    if (text == 1) {
      return '已发布';
    }
    if (text == 2) {
      return '定时发布';
    }
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const { commonTableData, loading } = this.props;
    const { modalVisible, modalTitle, options, timeToPushModalVisible } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'dynaDigestId'
      },
      {
        title: '书摘内容',
        dataIndex: 'digestContent',
        render(text, record) {
          if ((text || '.').length > 40) {
            return `${text.substring(0, 40)}......`;
          }
          return text;
        }
      },
      {
        title: '图书名称',
        dataIndex: 'bookName'
      },
      {
        title: '图书属性',
        dataIndex: 'bookPropId',
        render(text, record) {
          const dict = row => {
            let res = '';
            for (let i = 0; i < options.length; i++) {
              if (row.bookPropId === options[i].bookPropId) {
                res = options[i].propName;
                break;
              }
            }
            return res;
          };
          return <Fragment>{dict(record)}</Fragment>;
        }
      },
      {
        title: '图片',
        dataIndex: 'imagePath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholeImagePath} />
          </Fragment>
        )
      },
      {
        title: '点赞数量',
        dataIndex: 'numSupport'
      },
      {
        title: '发布状态',
        dataIndex: 'publishStatus',
        render: (text, record) => <Fragment>{this.formatState(text)}</Fragment>
      },
      {
        title: '发布日期',
        dataIndex: 'publishDate',
        render: (text, record) => <Fragment>{formatDate(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => {
          if (record.publishStatus == 0) {
            return (
              <Fragment>
                <a onClick={() => this.publish(record)}>发布</a>
                <Divider type="vertical" />
                <a onClick={() => this.getDataForTimeToPublish(record)}>定时发布</a>
                <Divider type="vertical" />
                <a onClick={() => this.getDataForUpdate(record)}>修改</a>
                <Divider type="vertical" />
                <a onClick={() => this.remove(record)}>删除</a>
              </Fragment>
            );
          } else {
            return (
              <Fragment>
                {' '}
                <a onClick={() => this.off(record)}>下架</a>
              </Fragment>
            );
          }
        }
      }
    ];

    const parentMethods = {
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
      dispatch: this.props.dispatch,
      timeToPublish: this.timeToPublish
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
              dataSource={commonTableData.pageData.list}
              columns={columns}
              rowKey="dynaDigestId"
              pagination={commonTableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={commonTableData.formData}
          title={modalTitle}
        />
        <TimeToPublishForm
          {...parentMethods}
          timeToPushModalVisible={timeToPushModalVisible}
          formData={commonTableData.formData}
          title={modalTitle}
        />
      </PageHeaderLayout>
    );
  }
}
