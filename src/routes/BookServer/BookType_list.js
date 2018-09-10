import React, {Fragment, PureComponent} from 'react';
import {connect} from 'dva';
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
Table,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './BookType_edit';
import CreateFindForm from './BookType_find';
import {defaultPage} from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({tableData, loading}) => ({
tableData,
loading: loading.models.crud,
}))
@Form.create()
export default class BookType extends PureComponent {
state = {
modalVisible: false,
modalTitle: '',
formValues: {},
page:defaultPage(),
  options: {},

};

refresh = (values,page) => {
const {dispatch} = this.props;
dispatch({
type: 'tableData/list',
path: 'bookType/page',
payload: {
data: values,
page,
},
});
this.setState({
modalVisible: false,
});
}

componentDidMount() {
const { formValues,page,options } = this.state;
  this.initOptions();
this.refresh(formValues,page);
}


tableChange = (pagination, filtersArg, sorter) => {
const { formValues } = this.state;
const page={
pageSize: pagination.pageSize,
pageNo: pagination.current,
}
this.setState({
page,
})
this.refresh(formValues,page);
};

  isEmptyObject = e => {
    let t;
    for (t in e) return !1;
    return !0;
  };

formReset = () => {
const {form} = this.props;
form.resetFields();
};

callback = () => {
const {tableData} = this.props;
if (tableData.status == 200) {
const { formValues,page } = this.state;
this.refresh(formValues,page);
} else {
message.success(tableData.message);
}
};

  initOptionsCallback = response => {
    this.setState({
      options: JSON.parse(response.data),
    });
  };

remove = (record) => {
const {dispatch,tableData} = this.props;
const cb=this.callback;
Modal.confirm({
title: '确定删除吗?',
onOk() {
dispatch({
type: 'tableData/remove',
path: 'bookType/remove',
payload: {bookTypeId:record.bookTypeId},
callback:cb,
});
},
onCancel() {
},
});
};

query = e => {
e.preventDefault();
const {dispatch, form} = this.props;
form.validateFields((err, fieldsValue) => {
if (err) return;

const values = {
...fieldsValue,
};
const page=defaultPage();
this.setState({
formValues: values,
page,
});
this.refresh(values,page);
});
};

closeModal = () => {
this.setState({
modalVisible: false,
});
};

getDataForAdd = (fields) => {
const {dispatch} = this.props;
dispatch({
type: 'tableData/getDataForAdd',
path: 'bookType/getDataForAdd',
payload: fields,
});
this.setState({
modalTitle: '新增',
modalVisible: true,
});
};

add = fields => {
const {dispatch,tableData} = this.props;
dispatch({
type: 'tableData/add',
path: 'bookType/add',
payload: fields,
callback:this.callback,
});
};


getDataForUpdate = (record) => {
const {dispatch} = this.props;
dispatch({
type: 'tableData/getDataForUpdate',
path: 'bookType/getDataForUpdate',
payload: {bookTypeId:record.bookTypeId},
});
this.setState({
modalTitle: '修改',
modalVisible: true,

});
};

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'bookType/getDataForAdd',
      payload: {},
      callback: this.initOptionsCallback,
    });
  };

update = fields => {
const {dispatch, tableData} = this.props;
const payload={
...tableData.formData,
...fields,
}
dispatch({
type: 'tableData/update',
path: 'bookType/update',
payload,
callback: this.callback,
});
};


renderForm() {
return CreateFindForm(this.props, this.query, this.formReset,this.isEmptyObject,this.state);
}

render() {
const {
tableData,
loading,
} = this.props;
const {modalVisible, modalTitle,options} = this.state;

const columns = [
 {
     title:"系统id",
     dataIndex:"bookTypeId",
  }
  ,{
     title:"分类名称",
     dataIndex:"typeName",
   }
  ,{
     title:"上级分类",
     dataIndex:"parentTypeName",
   }
  ,{
     title:"分类顺序",
     dataIndex:"indexNo",
   }
  ,{
     title:"是否禁用",
     dataIndex:"isForbid",
    render(text, record) {
      const dict = record => {
        let res = '';
        for (let i = 0; i < options.length; i++) {
          if (record.isForbid === options[i].itemNo) {
            res = options[i].itemLabel;
            break;
          }
        }
        return res;
      };
      return <Fragment>{dict(record)}</Fragment>;
    },
   }
  ,{
     title:"分类图标",
     dataIndex:"typeIco",
   }
,
{
title: '操作',
render: (text, record) => (
  <Fragment>
    <a onClick={() => this.getDataForUpdate(record)}>修改</a>
    <Divider type="vertical" />
    <a onClick={() => this.remove(record)}>删除</a>
  </Fragment>
),
},
];


const parentMethods = {
add: this.add,
update: this.update,
closeModal: this.closeModal,
  isEmptyObject: this.isEmptyObject,
  dispatch: this.props.dispatch,
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
          rowKey="bookTypeId"
          pagination={tableData.pageData.pagination}
          loading={loading}
          onChange={this.tableChange}
        />
      </div>
    </Card>
    <CreateEditForm {...parentMethods} modalVisible={modalVisible} formData={tableData.formData} title={modalTitle} options={options} />
  </PageHeaderLayout>
);
}
}
