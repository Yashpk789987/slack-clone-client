import React from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';
import DirectMessageModal from '../components/DirectMessageModal';

export default class Sidebar extends React.Component {
  state = {
    openChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false
  };

  toggleDirectMessageModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      openDirectMessageModal: !state.openDirectMessageModal
    }));
  };

  toggleAddChannelClick = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({ openChannelModal: !state.openChannelModal }));
  };

  toggleInvitePeopleClick = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      openInvitePeopleModal: !state.openInvitePeopleModal
    }));
  };

  render() {
    const { teams, team, username, currentUserId } = this.props;

    const regularChannels = [];
    const dmChannels = [];

    team.channels.forEach(c => {
      if (c.dm) {
        dmChannels.push(c);
      } else {
        regularChannels.push(c);
      }
    });

    return [
      <Teams key='team-sidebar' teams={teams} />,
      <Channels
        onAddChannelClick={this.toggleAddChannelClick}
        onInvitePeopleClick={this.toggleInvitePeopleClick}
        onDirectMessageClick={this.toggleDirectMessageModal}
        key='channels-sidebar'
        teamName={team.name}
        username={username}
        teamId={team.id}
        isOwner={team.admin}
        channels={regularChannels}
        dmChannels={dmChannels}
      />,
      <AddChannelModal
        teamId={team.id}
        open={this.state.openChannelModal}
        key='side-bar-add-channel-modal'
        onClose={this.toggleAddChannelClick}
        currentUserId={currentUserId}
      />,
      <DirectMessageModal
        teamId={team.id}
        open={this.state.openDirectMessageModal}
        key='side-bar-direct-message-modal'
        onClose={this.toggleDirectMessageModal}
        currentUserId={currentUserId}
      />,
      <InvitePeopleModal
        teamId={team.id}
        open={this.state.openInvitePeopleModal}
        key='invite-people-modal'
        onClose={this.toggleInvitePeopleClick}
      />
    ];
  }
}
