import React from 'react';

import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';

export default class Sidebar extends React.Component {
  state = {
    openChannelModal: false
  };

  handleAddChannelClick = () => {
    this.setState({ openChannelModal: true });
  };

  handleCloseAddChannelModal = () => {
    this.setState({ openChannelModal: false });
  };

  render() {
    const { teams, team } = this.props;

    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      username = user.username;
    } catch (error) {
      console.log(error);
    }
    return [
      <Teams key='team-sidebar' teams={teams} />,
      <Channels
        onAddChannelClick={this.handleAddChannelClick}
        key='channels-sidebar'
        teamName={team.name}
        username={username}
        teamId={team.id}
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
        onClose={this.handleCloseAddChannelModal}
      />
    ];
  }
}
