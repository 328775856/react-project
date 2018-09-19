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
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateConditionForm from './SelectBookBuy_condition';
import { getUrl, postUrl } from '../../services/api';

const FormItem = Form.Item;

@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTable
}))
@Form.create()
export default class SelectBookBuy extends React.Component {
  state = {
    selectedRows: [],
    formValues: {}
  };

  constructor(props) {
    super(props);
  }

  query = (params, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'bookBuy/page',
      payload: {
        data: params,
        page
      }
    });
  };

  initBookStyleGroup = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/initOptionElement',
      path: 'bookStyle/page',
      payload: {
        data: {},
        page: {
          pageNo: 1,
          pageSize: 1000
        }
      },
      option: {
        optionKey: 'bookStyleGroup',
        key: 'bookStyleId',
        value: 'styleName'
      }
    });
  };

  initBookTypeGroup = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/initOptionElement',
      path: 'bookType/page',
      payload: {
        data: {},
        page: {
          pageNo: 1,
          pageSize: 1000
        }
      },
      option: {
        optionKey: 'bookTypeGroup',
        key: 'bookTypeId',
        value: 'typeName'
      }
    });
  };

  componentDidMount() {
    this.init();
  }

  init() {
    this.initBookStyleGroup();
    this.initBookTypeGroup();
    this.query({}, { pageNo: 1, pageSize: 10 });
  }

  componentDidUpdate() {
    const { modalVisible } = this.props;
    if (modalVisible === this.state.modalVisibleTemp) {
      return;
    }
    this.setState({ modalVisibleTemp: modalVisible });
    if (modalVisible === true) {
      this.query({}, { pageNo: 1, pageSize: 10 });
    }
  }

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
    return CreateConditionForm(this.props, this.formSubmit, this.formReset, restTableData);
  }

  render() {
    const { restTableData, loading, closeModal, modalVisible, addSave } = this.props;

    const okHandle = () => {
      const { selectedRows } = this.state;
      const formObject = {
        findChannelId: 3,
        bookUserId: selectedRows[0].bookId,
        bookName: selectedRows[0].bookName,
        coverPath: selectedRows[0].coverPath,
        suggestDesc: '',
        indexNo: 1,
        author: selectedRows[0].bookAuthor
      };
      debugger;
      addSave(formObject);
    };

    const columns = [
      {
        title: '图书名',
        dataIndex: 'bookName'
      },
      {
        title: '图书封面',
        dataIndex: 'coverPath'
      },
      {
        title: '图书分类',
        dataIndex: 'bookTypeName'
      },
      {
        title: '图书格式',
        dataIndex: 'bookStyleName'
      },
      {
        title: '作者',
        dataIndex: 'bookAuthor'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime'
      }
    ];

    const rowSelection = {
      type: 'radio',
      hideDefaultSelections: 'true',
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log('selectedRows',selectedRows);//得到每一项的信息，也就是每一项的信息[{key: 1, name: "花骨朵", age: 18, hobby: "看书"}]
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
      }
    };

    return (
      <Modal
        title="选择图书"
        visible={modalVisible}
        width="65%"
        onOk={okHandle}
        onCancel={() => closeModal()}
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            dataSource={restTableData.pageData.list}
            columns={columns}
            rowKey="bookId"
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
