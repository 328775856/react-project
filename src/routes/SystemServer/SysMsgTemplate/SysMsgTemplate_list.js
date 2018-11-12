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
import CreateEditForm from './SysMsgTemplate_edit';
import CreateFindForm from './SysMsgTemplate_find';
import { defaultPage, formatTime } from '../../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class SysMsgTemplate extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: {},
    isEdit: false
  };

  componentWillMount() {
    const { formValues, page } = this.state;
    this.initOptions();
    this.refresh(formValues, page);
  }

  getDataForAdd = fields => {
    this.setState({
      modalTitle: '新增',
      modalVisible: true,
      isEdit: false,
      formValues: {}
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'sysMsgTemplate/getDataForAdd',
      payload: fields
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'sysMsgTemplate/getDataForUpdate',
      payload: { sysMsgTemplateId: record.sysMsgTemplateId }
    });

    this.setState({
      modalTitle: '修改',
      modalVisible: true,
      isEdit: true
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'sysMsgTemplate/getOptions',
      payload: { dictNo: 38 },
      callback: this.initOptionsCallback
    });
  };

  initOptionsCallback = response => {
    this.setState({
      options: JSON.parse(response.data)
    });
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'sysMsgTemplate/page',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({ page });
    this.refresh(formValues, page);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
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
          path: 'sysMsgTemplate/remove',
          payload: { sysMsgTemplateId: record.sysMsgTemplateId },
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

  add = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'sysMsgTemplate/add',
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
      path: 'sysMsgTemplate/update',
      payload,
      callback: this.callback
    });
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset, this.state);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, options, isEdit } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'sysMsgTemplateId'
      },
      {
        title: '消息模板内容',
        dataIndex: 'templateContent',
        render(text, record) {
          if ((text || '.').length > 30) {
            return `${text.substring(0, 30)}......`;
          }
          return text;
        }
      },
      {
        title: '消息类型',
        dataIndex: 'msgType',
        render(text, record) {
          const type = () => {
            let res = '';
            for (let i = 0; i < options.length; i += 1) {
              if (record.msgType === options[i].itemNo) {
                res = options[i].itemLabel;
                break;
              }
            }
            return res;
          };
          return <Fragment>{type(record)}</Fragment>;
        }
      },
      {
        title: '备注',
        dataIndex: 'remark'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '修改时间',
        dataIndex: 'modifyTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
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
              rowKey="sysMsgTemplateId"
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
          options={options}
          isEdit={isEdit}
        />
      </PageHeaderLayout>
    );
  }
}
