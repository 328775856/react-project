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
import CreateConditionForm from './SelectVideo_condition';
import { getUrl, postUrl } from '../../services/api';

const FormItem = Form.Item;

@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTable
}))
@Form.create()
export default class SelectVideo extends React.Component {
  state = {
    selectedRows: [],
    formValues: {},
    modalVisibleTemp: true
  };

  constructor(props) {
    super(props);
  }

  initGroup = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/initOptionElement',
      path: 'media/videoGroup/page',
      payload: {
        data: {},
        page: {
          pageNo: 1,
          pageSize: 1000
        }
      },
      option: {
        optionKey: 'videoGroup',
        key: 'mediaVideoGroupId',
        value: 'VideoGroupName'
      }
    });
  };

  query = (params, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/video/page',
      payload: {
        data: params,
        page
      }
    });
  };

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    const { modalVisible } = this.props;
    if (modalVisible === this.state.modalVisibleTemp) {
      return;
    }
    this.setState({ modalVisibleTemp: modalVisible });
    if (modalVisible === true) {
      this.init();
    }
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
      restTableData.videoGroup
    );
  }

  render() {
    const { restTableData, formData, loading, callReturn, closeModal, modalVisible } = this.props;

    const columns = [
      {
        title: '分组名称',
        dataIndex: 'mediaVideoGroupName'
      },
      {
        title: '视频名称',
        dataIndex: 'videoName'
      },
      {
        title: '音频格式',
        dataIndex: 'videoFormat'
      },
      {
        title: '时长-分钟',
        dataIndex: 'videoMinute'
      },
      {
        title: '时长-秒',
        dataIndex: 'videoSecond'
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
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log('selectedRows',selectedRows); //选中的每行信息，是一个数组
        callReturn(selectedRows);
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
        title="选择音频"
        visible={modalVisible}
        width={650}
        onOk={closeModal}
        onCancel={() => closeModal()}
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            dataSource={restTableData.pageData.list}
            columns={columns}
            rowKey="mediaVideoId"
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
