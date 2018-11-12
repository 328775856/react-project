import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Modal, message, Divider, Table } from 'antd';
import qs from 'qs';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './CourseChapterAudio_edit';
import CreateFindForm from './CourseChapterAudio_find';
import { defaultPage } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ commonTableData, loading }) => ({
  commonTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class CourseChapterAudio extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    paramData: {}
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/list',
      path: 'courseChapterAudio/page',
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
    const { commonTableData } = this.props;
    commonTableData.pageData.list = [];
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    const id = this.props.location.search.replace('?', '');
    this.setState({ paramData: qs.parse(id) });
    this.refresh(qs.parse(id), page);
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
    const { commonTableData } = this.props;
    if (commonTableData.status == 200) {
      const { paramData, page } = this.state;
      this.refresh(paramData, page);
    } else {
      message.success(commonTableData.message);
    }
  };

  remove = record => {
    const { dispatch, commonTableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'commonTableData/remove',
          path: 'courseChapterAudio/remove',
          payload: { courseChapterAudioId: record.courseChapterAudioId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  query = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { paramData } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        ...paramData
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

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForAdd',
      path: 'courseChapterAudio/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  add = fields => {
    const { dispatch, commonTableData } = this.props;
    const { paramData } = this.state;
    const params = {
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'commonTableData/add',
      path: 'courseChapterAudio/add',
      payload: params,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/getDataForUpdate',
      path: 'courseChapterAudio/getDataForUpdate',
      payload: { courseChapterAudioId: record.courseChapterAudioId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  update = fields => {
    const { dispatch, commonTableData } = this.props;
    const { paramData } = this.state;
    const payload = {
      ...commonTableData.formData,
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'commonTableData/update',
      path: 'courseChapterAudio/update',
      payload,
      callback: this.callback
    });
  };

  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/goUrl',
      path: '/courseServer/courseChapter',
      payload: {}
    });
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const { commonTableData, loading } = this.props;
    const { modalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: '系统id',
        dataIndex: 'courseChapterAudioId'
      },
      {
        title: '音频名称',
        dataIndex: 'audioName'
      },
      {
        title: '顺序',
        dataIndex: 'indexNo'
      },
      {
        title: '是否是试听音频',
        dataIndex: 'isAudition',
        render(text) {
          return <Fragment>{text === 0 ? '否' : '是'}</Fragment>;
        }
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
      closeModal: this.closeModal,
      dispatch: this.props.dispatch
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

              <Button type="default" onClick={() => this.back()}>
                返回
              </Button>
            </div>
            <Table
              dataSource={commonTableData.pageData.list}
              columns={columns}
              rowKey="courseChapterAudioId"
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
      </PageHeaderLayout>
    );
  }
}
