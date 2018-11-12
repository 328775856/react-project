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
import CreateConditionForm from './SelectUserInfo_condition';
import { defaultPage } from '../../utils/utils';

const FormItem = Form.Item;

@connect(({ selectData, loading }) => ({
  selectData,
  loading: loading.models.selectTable
}))
@Form.create()
export default class SelectUserInfo extends React.Component {
  state = {
    page: defaultPage(),
    selectedRows: [],
    formValues: {},
    modalVisibleTemp: false
  };

  constructor(props) {
    super(props);
  }

  query = (params, page) => {
    const { dispatch, userId } = this.props;
    this.setState({ userId: userId });
    dispatch({
      type: 'selectData/query',
      path: 'userInfo/page',
      payload: {
        data: params,
        page
      }
    });
  };

  // componentDidMount() {
  //   //   this.query({}, { pageNo: 1, pageSize: 10 });
  //   // }

  componentDidUpdate() {
    const { modalVisible } = this.props;
    if (modalVisible === this.state.modalVisibleTemp) {
      return;
    }
    if (modalVisible === true) {
      const { selectData } = this.props;
      selectData.pageData.list = '';
      this.init();
    }
    this.setState({ modalVisibleTemp: modalVisible });
  }

  init = () => {
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

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page
    });
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

  renderForm(groupList) {
    return CreateConditionForm(this.props, this.formSubmit, this.formReset);
  }

  render() {
    const {
      selectData: { pageData },
      selectData: { formData },
      callReturn,
      closeModal,
      modalVisible,
      userIdCallback,
      form
    } = this.props;
    // console.log(this.props.selectData)

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
        title: '用户Id',
        dataIndex: 'userId'
      },
      {
        title: '昵称',
        dataIndex: 'nickname'
      },
      {
        title: '图片',
        dataIndex: 'wholePhotoPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholePhotoPath} />
          </Fragment>
        )
      }
    ];

    const rowSelection = {
      type: 'radio',
      hideDefaultSelections: 'true',
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log('selectedRows',selectedRows);//得到每一项的信息，也就是每一项的信息[{key: 1, name: "花骨朵", age: 18, hobby: "看书"}]
        this.setState({ userId: selectedRows[0].userId });
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
        const { userId } = this.state;
        return {
          checked: record.userId === userId
        };
      }
    };

    return (
      <Modal
        title="选择用户"
        visible={modalVisible}
        width={650}
        onOk={okHandle}
        onCancel={cancelHandle}
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm(formData.rows)}</div>
          <Table
            dataSource={pageData.list}
            columns={columns}
            pagination={pageData.pagination}
            onChange={this.tableChange}
            rowSelection={rowSelection}
            rowKey="createTime"
          />
        </div>
      </Modal>
    );
  }
}
