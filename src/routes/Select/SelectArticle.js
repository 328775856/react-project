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
  Table
} from 'antd';
import styles from '../../assets/styles.less';
import CreateConditionForm from './SelectArticle_condition';

const FormItem = Form.Item;

@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTable
}))
@Form.create()
export default class SelectArticle extends React.Component {
  state = {
    selectedRows: [],
    formValues: {},
    modalVisibleTemp: false
  };

  constructor(props) {
    super(props);
  }

  initGroup = () => {
    const { dispatch, mediaArticleId } = this.props;
    this.setState({ mediaArticleId: mediaArticleId });
    dispatch({
      type: 'restTableData/initOptionElement',
      path: 'media/articleGroup/page',
      payload: {
        data: {},
        page: {
          pageNo: 1,
          pageSize: 1000
        }
      },
      option: {
        optionKey: 'articleGroup',
        key: 'mediaArticleGroupId',
        value: 'groupName'
      }
    });
  };

  query = (params, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/article/page',
      payload: {
        data: params,
        page
      }
    });
  };

  componentDidUpdate() {
    const { modalVisible } = this.props;
    if (modalVisible === this.state.modalVisibleTemp) {
      return;
    }
    if (modalVisible === true) {
      const { restTableData } = this.props;
      restTableData.pageData.list = '';
      this.init();
    }
    this.setState({ modalVisibleTemp: modalVisible });
  }

  init = () => {
    this.initGroup();
    this.query({}, { pageNo: 1, pageSize: 10 });
  };

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const page = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize
    };
    this.query(formValues, page);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  onRowClick = row => {
    this.setState({
      selectedRows: row
    });
  };

  formSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue
      };
      this.setState({
        formValues: values
      });
      this.query(values, { pageNo: 1, pageSize: 10 });
    });
  };

  renderForm() {
    const { restTableData } = this.props;
    return CreateConditionForm(
      this.props,
      this.formSubmit,
      this.formReset,
      restTableData.articleGroup
    );
  }

  render() {
    const {
      restTableData,
      formData,
      form,
      loading,
      callReturn,
      closeModal,
      modalVisible
    } = this.props;
    const { selectedRows } = this.state;

    const okHandle = () => {
      if (selectedRows.length < 1) {
        message.success('请选择一条数据');
      } else {
        callReturn(selectedRows);
      }
    };

    const cancelHandle = () => {
      form.resetFields();
      closeModal();
    };

    const columns = [
      {
        title: '分组名称',
        dataIndex: 'mediaArticleGroupName'
      },
      {
        title: '图文标题',
        dataIndex: 'articleTitle'
      },
      {
        title: '图文描述',
        dataIndex: 'articleDesc',
        render(text, record) {
          if ((text || '.').length > 40) {
            return `${text.substring(0, 40)}......`;
          }
          return text;
        }
      },
      {
        title: '上传时间',
        dataIndex: 'createTime'
      }
    ];

    const rowSelection = {
      type: 'radio',
      hideDefaultSelections: 'true',
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log('selectedRows',selectedRows);//得到每一项的信息，也就是每一项的信息[{key: 1, name: "花骨朵", age: 18, hobby: "看书"}]
        this.setState({ mediaArticleId: selectedRows[0].mediaArticleId });
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log('selectedRows',selectedRows); //选中的每行信息，是一个数组
        // callReturn(selectedRows);
        this.onRowClick(selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log('changeRows',changeRows);   //变化的每一项
      },
      onSelectInvert: selectedRows => {
        // console.log('selectedRows',selectedRows);
      },
      getCheckboxProps: record => {
        const { mediaArticleId } = this.state;
        return {
          checked: record.mediaArticleId === mediaArticleId
        };
      }
    };

    return (
      <Modal
        title="选择图文"
        visible={modalVisible}
        width={1000}
        onOk={okHandle}
        onCancel={cancelHandle}
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            dataSource={restTableData.pageData.list || []}
            columns={columns}
            rowKey="mediaArticleId"
            pagination={restTableData.pageData.pagination}
            loading={loading}
            onChange={this.tableChange}
            rowSelection={rowSelection}
          />
        </div>
      </Modal>
    );
  }
}
