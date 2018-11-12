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
import CreateConditionForm from './SelectVipCourseType_condition';

const FormItem = Form.Item;

@connect(({ selectData, loading }) => ({
  selectData,
  loading: loading.models.selectTable
}))
@Form.create()
export default class SelectVipCourseType extends React.Component {
  state = {
    selectedRows: [],
    formValues: {},
    modalVisibleTemp: true
  };

  constructor(props) {
    super(props);
  }

  query = (params, page) => {
    const { dispatch, vipCourseTypeId } = this.props;
    this.setState({ vipCourseTypeId: vipCourseTypeId });
    dispatch({
      type: 'selectData/query',
      path: 'vipCourseType/page',
      payload: {
        data: params,
        page
      }
    });
  };

  // componentDidMount() {
  //   this.query({}, { pageNo: 1, pageSize: 10 });
  // }

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
    return CreateConditionForm(this.props, this.formSubmit, this.formReset);
  }

  render() {
    const {
      selectData: { pageData },
      selectData: { formData },
      callReturn,
      closeModal,
      modalVisible,
      form
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
        title: '系统id',
        dataIndex: 'vipCourseTypeId'
      },

      {
        title: '标签名',
        dataIndex: 'typename'
      },
      {
        title: '顺序',
        dataIndex: 'indexNo'
      }
    ];

    const rowSelection = {
      type: 'radio',
      hideDefaultSelections: 'true',
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log('selectedRows',selectedRows);//得到每一项的信息，也就是每一项的信息[{key: 1, name: "花骨朵", age: 18, hobby: "看书"}]
        this.setState({ vipCourseTypeId: selectedRows[0].vipCourseTypeId });
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
        const { vipCourseTypeId } = this.state;
        return {
          checked: record.vipCourseTypeId === vipCourseTypeId
        };
      }
    };

    return (
      <Modal
        title="选择标签"
        visible={modalVisible}
        width={650}
        onOk={okHandle}
        onCancel={cancelHandle}
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
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
