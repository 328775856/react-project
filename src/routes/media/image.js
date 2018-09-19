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
    formValues: {}
  };

  refresh() {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/image/getImagePage',
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/image/getImagePage',
      payload: {
        page: {
          pageNo: 1,
          pageSize: 10
        }
      }
    });
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues
    };
    dispatch({
      type: 'restTableData/list',
      path: 'media/image/getImagePage',
      payload: params
    });
  };

  formReset = () => {
    const { form, dispatch } = this.props;
    this.setState({
      formValues: {}
    });
    dispatch({
      type: 'restTableData/list',
      path: 'media/image/getImagePage',
      payload: {}
    });

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
        path: 'media/image/getImagePage',
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
      payload: fields
    });
    message.success('保存成功');
    this.refresh();
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
    const { dispatch, formData } = this.props;
    dispatch({
      type: 'restTableData/update',
      path: 'media/image',
      payload: fields
    });
    message.success('修改成功');
    this.refresh();
  };

  delete = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/delete',
      path: 'media/image',
      payload: { mediaImageId: record.mediaImageId }
    });
    message.success('删除成功');
    this.refresh();
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
        dataIndex: 'mediaImageId'
      },
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
            <img
              alt=""
              style={{ width: 100, height: 100 }}
              src={record.domain}
            />
          </Fragment>
        )
      },
      {
        title: '用户ID',
        dataIndex: 'userId'
      },
      {
        title: '用户名称',
        dataIndex: 'userName'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime'
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
              <Button
                type="primary"
                onClick={() => this.add()}
              >
                新建
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={pageData}
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
          formData={formData}
          title={modalTitle}
        />
      </PageHeaderLayout>
    );
  }
}
