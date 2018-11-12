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
import CreateEditForm from './imageGroupEdit';
import CreateFindForm from './imageGroupFind';
import { formatTime } from '../../utils/utils';

const FormItem = Form.Item;

@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.restTableData
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    selectedRows: [],
    formValues: {}
  };

  refresh() {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/imageGroup/getGroupPage',
      payload: {
        page: {
          pageNo: 1,
          pageSize: 10
        }
      }
    });
    this.setState({
      modalVisible: false
    });
  }

  componentWillMount() {
    const { restTableData } = this.props;
    restTableData.pageData.list = '';
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/imageGroup/getGroupPage',
      payload: {
        page: {
          pageNo: 1,
          pageSize: 10
        }
      }
    });
  }

  tableChange = (pagination, filtersArg, sorter) => {
    console.log(99999999999999999999);
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues
    };
    dispatch({
      type: 'restTableData/list',
      path: 'media/imageGroup/getGroupPage',
      payload: {
        page: params
      }
    });
  };

  formReset = () => {
    const { form } = this.props;
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
        data: {
          ...fieldsValue
        },
        page: {
          pageNo: 1,
          pageSize: 10
        }
      };

      this.setState({
        formValues: values
      });

      dispatch({
        type: 'restTableData/list',
        path: 'media/imageGroup/getGroupPage',
        payload: values
      });
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  add = fields => {
    const { dispatch } = this.props;
    this.setState({
      modalTitle: '新增图片分组',
      modalVisible: true,
      formData: { isDefault: 1 }
    });
  };

  addSave = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/add',
      path: 'media/imageGroup',
      payload: fields,
      callback: this.callback
    });
  };

  update = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getData',
      path: `media/imageGroup/${record.mediaImageGroupId}`
    });
    this.setState({
      modalTitle: '修改图片分组',
      modalVisible: true
    });
  };

  updateSave = fields => {
    const { dispatch, formData } = this.props;
    dispatch({
      type: 'restTableData/update',
      path: 'media/imageGroup',
      payload: fields,
      callback: this.callback
    });
  };

  callback = () => {
    const { restTableData } = this.props;
    if (restTableData.status === 200) {
      // const { formValues, page } = this.state;
      this.refresh();
    } else {
      message.success(restTableData.message);
    }
  };

  delete = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'restTableData/delete',
          path: 'media/imageGroup',
          payload: { mediaImageGroupId: record.mediaImageGroupId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const {
      restTableData: { pageData },
      restTableData: { formData },
      loading
    } = this.props;
    const { selectedRows, modalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'mediaImageGroupId'
      },
      {
        title: '分组名称',
        dataIndex: 'imageGroupName'
      },
      {
        title: '排序',
        dataIndex: 'indexNo'
      },
      {
        title: '是否默认',
        dataIndex: 'isDefault',
        render: (text, record) => <Fragment>{text === 1 ? '是' : '否'}</Fragment>
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

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.add()}>
                新建
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={pageData}
              columns={columns}
              rowKey="mediaImageGroupId"
              onSelectRow={this.selectRows}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={formData}
          title={modalTitle}
        />
      </PageHeaderLayout>
    );
  }
}
