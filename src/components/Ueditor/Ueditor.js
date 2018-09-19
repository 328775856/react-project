/**
 * Created by GuoMiaomiao on 2018/4/18.
 */
import React from 'react';
// import UE from '../ueditor/ueditor.all';
const UE = window.UE;

// let editor=null;
class Ueditor extends React.Component {
  static defaultProps = {
    config: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      editor: {}
    };
  }

  componentDidMount() {
    this.initEditor();
  }

  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    UE.delEditor(this.props.id);
  }

  initEditor() {
    /* 初始化编辑器 */
    const { id, config } = this.props;
    const dft = {
      initialFrameHeight: 300,
      open_editor: true,
      style_width: 360, // 样式区宽度像素
      style_url:
        'http://www.135editor.com/editor_styles/open?inajax=1&appkey=5ad85f42-0858-4947-9f76-02f2ac10c65d'
    };
    const conf = {
      ...dft,
      ...config
    };

    const ueEditor = UE.getEditor(this.props.id, conf);
    window.current_editor = ueEditor;
    const self = this;

    ueEditor.ready(ueditor => {
      if (!ueditor) {
        UE.delEditor(id);
        self.initEditor();
      }
    });

    this.setState({ editor: ueEditor });
  }

  getVal() {
    /* 获取编辑器内容函数 */
    const { editor } = this.state;
    const content = editor.getContent();
    return content;
  }

  render() {
    const { content, id } = this.props;
    return <div
      id={id}
      defaultValue={content}
      onChange={this.getVal}
      type="text/plain"
    />;
  }
}
export default Ueditor;
