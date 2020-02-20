import React from 'react';

import decode from 'jwt-decode';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

export default class Sidebar extends React.Component {
  state = {
    openChannelModal: false,
    openInvitePeopleModal: false
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
    const { teams, team } = this.props;

    let username = '';
    let isOwner = false;
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      username = user.username;
      isOwner = user.id === team.owner;
    } catch (error) {
      console.log(error);
    }
    return [
      <Teams key='team-sidebar' teams={teams} />,
      <Channels
        onAddChannelClick={this.toggleAddChannelClick}
        onInvitePeopleClick={this.toggleInvitePeopleClick}
        key='channels-sidebar'
        teamName={team.name}
        username={username}
        teamId={team.id}
        isOwner={isOwner}
        channels={team.channels}
        users={[
          { id: 1, name: 'slackbot' },
          { id: 2, name: 'user1' }
        ]}
      />,
      <AddChannelModal
        teamId={team.id}
        open={this.state.openChannelModal}
        key='side-bar-add-channel-modal'
        onClose={this.toggleAddChannelClick}
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
