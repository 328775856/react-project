/**
 * Created by wuyakun on 2017/3/20.
 */

import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';

/**
 * 几个注意点：
 * 1.handleUpload返回的成功与失败,需要自行判断
 * 2.接收参数为array[{uid,url}]
 * 3.吐出来的也是array
 * 4.给我通过value(看下方fileList)
 * 5.吐出去通过this.props.onChange(看下方handleChange())
 */

class GbUpload extends React.Component {
  state = {
    uid: this.props.uid,
    previewVisible: false,
    previewImage: '',
    length: this.props.length,
    maxFileSize: this.props.maxFileSize ? this.props.maxFileSize : 2,
    fileList:
      this.props.fileList instanceof Array &&
      (this.props.fileList.length === 0 ||
        (this.props.fileList[0].fileName && this.props.fileList[0].fileName !== 'undefined')) ?
        this.props.fileList :
        [],
    accept: this.props.accept ? this.props.accept : 'image/*',

    action: this.props.action ? this.props.action : '/upload/uploadImage',
    fileHead: this.props.fileHead ? this.props.fileHead : 'image://',
    video: false,
    audio: false
  };

  /**
   * 关闭预览
   */

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  /**
   * 查看预览
   * @param file
   */

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  /**
   * 处理图片更新
   * @param e
   */

  handleChange = e => {
    const fileList = this.handleUpload(e);
    this.props.onChange(fileList);
  };

  /**
   * 处理更新
   * @param e
   * @returns {*}
   */

  handleUpload = e => {
    // 再进行实际筛选，其实上面那一行没有用
    const fileList = e.fileList.map(file => {
      if (file.response) {
        // 这个地方是上传结束之后会调用的方法，这边是判断success!!!
        if (file.response.success) {
          return this.filter(file);
        }
      }
      return file;
    });
    this.setState({ fileList });
    return fileList;
  };

  /**
   * 过滤服务器返回的数据
   * @param file
   */

  filter = file => {
    const { name, response, uid, status } = file;
    return {
      name,
      url: `${response.data.domain}/${response.data.fileName}`,
      fileName: response.data.fileName,
      format: response.data.format || '',
      millisecond: response.data.millisecond || 0,
      uid,
      status
    };
  };

  /**
   * 上传之前的验证
   */

  beforeUpload = file => {
    const maxFileSize = this.state.maxFileSize;
    if (maxFileSize) {
      const isLtMax = file.size / 1024 / 1024 < maxFileSize;
      if (!isLtMax) {
        message.error(`文件大小超过${maxFileSize}M限制`);
      }
      return isLtMax;
    }
  };

  resetState = props => {
    const newState = {
      uid: props.uid,
      previewVisible: false,
      length: props.length,
      previewImage: '',
      maxFileSize: props.maxFileSize ? props.maxFileSize : 2,
      fileList:
        props.fileList instanceof Array &&
        (props.fileList.length === 0 ||
          (props.fileList[0].fileName && props.fileList[0].fileName !== 'undefined')) ?
          props.fileList :
          [],
      accept: props.accept ? props.accept : 'image/*',

      action: props.action ? props.action : '/upload/uploadImage',
      fileHead: props.fileHead ? props.fileHead : 'image://'
    };
    this.setState(newState);
  };

  componentDidMount = props => {
    this.setState({fileList:[]})
    if (this.props.accept.indexOf('video') !== -1) {
      this.setState({ video: true });
    }
    if (this.props.accept.indexOf('audio') !== -1) {
      this.setState({ audio: true });
    }
  };

  componentWillReceiveProps = props => {
    // 组建有它自己的渲染和改变state的方式，不能这么简单粗暴的改
    // console.log(props);
    if (this.props.uid === props.uid) {
      return;
    }
    this.resetState(props);
  };

  render() {
    const { previewVisible, previewImage } = this.state;
    const fileList = this.state.fileList;
    if (fileList.length > 0) {
      fileList.map((file, i) => {
        if (!file.url || !file.url.startsWith('http://')) {
          file.url = `${this.state.imageHead}${file.url}`;
        }
      });
    }

    // 一共有多少个图片
    const uploadButton = (
        <div>
          <Icon type="plus" />
        </div>);
    // showUploadList={false} 加了就显示不了
    const props = {
      uid: this.state.uid,
      action: this.state.action,
      fileList,
      headers: { 'X-Requested-With': null },
      accept: this.props.accept ? this.props.accept : 'image/*',
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      onPreview: this.handlePreview,
      listType: 'picture-card'
    };
    return (
      <div className="clearfix">
        <Upload {...props}>{fileList.length >= this.state.length ? null : uploadButton}</Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          {!this.state.video&&!this.state.audio?<img
            alt="example"
            style={{ width: '100%' }}
            src={previewImage}
          />:""
          }
          {this.state.video ?
            <video
width="90%" height="100%" src={this.props.fileList[0]&&`http://debugimage.geeboo.com/${this.props.fileList[0].name}`}
                   controls
            /> : ''
          }
          {this.state.audio ?
            <audio
width="90%" height="100%" src={this.props.fileList[0]&&`http://debugimage.geeboo.com/${this.props.fileList[0].name}`}
controls="controls"
            /> : ''
          }
        </Modal>
      </div>
    );
  }
}

export default GbUpload;
