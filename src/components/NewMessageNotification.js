import * as React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';
import Badge from '@material-ui/core/Badge';

const BadgeContainer = styled('div')`
  margin: 8px;
`;


class NewMessageNotification extends React.Component {
  state = {
    localMessageCount: 0,
    unreadMessageCount: 0
  }
  componentDidMount() {
    this.setState({ localMessageCount: this.props.messageCount });
  }

  componentDidUpdate() {
    const { isSelectedTask, messageCount, selectedTaskSid } = this.props;
    const { localMessageCount, unreadMessageCount } = this.state;
    
    if (isSelectedTask && unreadMessageCount !== 0) {
      this.setState({ unreadMessageCount: 0 });
    }
    
    if (messageCount > localMessageCount) {
      let newUnreadMessageCount = unreadMessageCount;
      if (selectedTaskSid && !isSelectedTask) {
        newUnreadMessageCount++;
      }
      this.setState({
        localMessageCount: messageCount,
        unreadMessageCount: newUnreadMessageCount
      });
    }
  }

  render() {
    return (
      <BadgeContainer>
        {this.state.unreadMessageCount > 0
          ? <Badge badgeContent={this.state.unreadMessageCount} color="secondary" />
          : ''
        }
      </BadgeContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { channels } = state.flex.chat;
  const { task: {attributes, sid} } = ownProps;
  const chatChannel = channels && channels[attributes.channelSid];
  const chatMessages = chatChannel && chatChannel.messages;
  const messageCount = chatMessages && chatMessages.length;

  const { selectedTaskSid } = state.flex.view;
  const isSelectedTask = sid === selectedTaskSid;

  return {
    isSelectedTask,
    messageCount,
    selectedTaskSid
  };
}

export default connect(mapStateToProps)(withTheme(NewMessageNotification));
