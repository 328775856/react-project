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
import CreateConditionForm from './SelectImage_condition';

const FormItem = Form.Item;

@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTable
}))
@Form.create()
export default class SelectImage extends React.Component {
  state = {
    selectedRows: [],
    formValues: {},
    modalVisibleTemp: false
  };

  constructor(props) {
    super(props);
  }

  init = () => {
    const { dispatch, imagePath } = this.props;
    this.setState({ imagePath: imagePath });
    dispatch({
      type: 'restTableData/init',
      path: 'media/imageGroup/getGroupPage',
      payload: {
        data: {},
        page: {
          pageSize: 100,
          pageNo: 1
        }
      }
    });
  };

  query = (params, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/image/getImagePage',
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
      this.query({}, { pageNo: 1, pageSize: 10 });
    }
    this.setState({ modalVisibleTemp: modalVisible });
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

  renderForm(groupList) {
    if (groupList == null || groupList == undefined || groupList.constructor != Array) {
      return;
    }
    return CreateConditionForm(this.props, this.formSubmit, this.formReset, groupList);
  }

  render() {
    const {
      restTableData: { pageData },
      restTableData: { formData },
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
        title: '分组名称',
        dataIndex: 'mediaImageGroupName'
      },
      {
        title: '图片名称',
        dataIndex: 'imageName'
      },
      {
        title: '缩略图',
        dataIndex: 'imagePath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.domain} />
          </Fragment>
        )
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
        this.setState({ imagePath: selectedRows[0].imagePath });
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
        const { imagePath } = this.state;
        return {
          checked: record.imagePath === imagePath
        };
      }
    };

    return (
      <Modal
        title="选择图片"
        visible={modalVisible}
        width={650}
        onOk={okHandle}
        onCancel={cancelHandle}
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm(formData.rows)}</div>
          <Table
            dataSource={pageData.list || []}
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
