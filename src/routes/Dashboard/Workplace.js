import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, List, Avatar } from 'antd';

import { Radar } from 'components/Charts';
import EditableLinkGroup from 'components/EditableLinkGroup';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Workplace.less';
@connect(({ user }) => ({ user }))
export default class Workplace extends PureComponent {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            {this.props.user.currentUser.userName}，祝你开心每一天！
          </div>
          <div>运营部</div>
        </div>
      </div>
    );

    return <PageHeaderLayout content={pageHeaderContent} />;
  }
}
