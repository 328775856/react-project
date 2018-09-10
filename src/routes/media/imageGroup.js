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
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
const FormItem = Form.Item;
import CreateEditForm from './imageGroupEdit';
import CreateFindForm from './imageGroupFind';

@connect(({ crud, loading }) => ({
  crud,
  loading: loading.models.crud,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    selectedRows: [],
    formValues: {},
  };
  refresh() {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/list',
      path: 'media/imageGroup/getGroupPage',
      payload: {
        page: {
          pageNo: 1,
          pageSize: 10,
        },
      },
    });
    this.setState({
      modalVisible: false,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/list',
      path: 'media/imageGroup/getGroupPage',
      payload: {
        page: {
          pageNo: 1,
          pageSize: 10,
        },
      },
    });
  }

  tableChange = (pagination, filtersArg, sorter) => {
    console.log(99999999999999999999);
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };
    dispatch({
      type: 'crud/list',
      path: 'media/imageGroup/getGroupPage',
      payload: params,
    });
  };

  formReset = () => {
    const { form, dispatch } = this.props;
    this.setState({
      formValues: {},
    });
    console.log('000000000000000');
    dispatch({
      type: 'crud/list',
      path: 'media/imageGroup/getGroupPage',
      payload: {},
    });

    form.resetFields();
  };

  selectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  query = e => {
    console.log(1111111111111111111);
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        data: {
          ...fieldsValue,
        },
        page: {
          pageNo: 1,
          pageSize: 10,
        },
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'crud/list',
        path: 'media/imageGroup/getGroupPage',
        payload: values,
      });
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };
  add = fields => {
    const { dispatch } = this.props;
    this.setState({
      modalTitle: '新增图片分组',
      modalVisible: true,
      formData: { isDefault: 1 },
    });
  };

  addSave = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/addSave',
      path: 'media/imageGroup',
      payload: fields,
    });
    message.success('保存成功');
    this.refresh();
  };

  update = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/update',
      path: 'media/imageGroup/' + record.mediaImageGroupId,
    });
    this.setState({
      modalTitle: '修改图片分组',
      modalVisible: true,
    });
  };

  updateSave = fields => {
    const { dispatch, formData } = this.props;
    dispatch({
      type: 'crud/updateSave',
      path: 'media/imageGroup',
      payload: fields,
    });
    message.success('修改成功');
    this.refresh();
  };

  delete = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/delete',
      path: 'media/imageGroup',
      payload: { mediaImageGroupId: record.mediaImageGroupId },
    });
    message.success('删除成功');
    this.refresh();
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const {
      crud: { pageData },
      crud: { formData },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'mediaImageGroupId',
      },
      {
        title: '分组名称',
        dataIndex: 'imageGroupName',
      },
      {
        title: '排序',
        dataIndex: 'indexNo',
      },
      {
        title: '是否默认',
        dataIndex: 'isDefault',
        render: (text, record) => (
           <Fragment>
           {text === 1 ? '是' : '否'}
         </Fragment>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.update(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(record)}>删除</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      addSave: this.addSave,
      updateSave: this.updateSave,
      closeModal: this.closeModal,
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
