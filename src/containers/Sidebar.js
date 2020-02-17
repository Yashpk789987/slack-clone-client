import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
class Sidebar extends React.Component {
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
    const {
      data: { loading, allTeams },
      currentTeamId
    } = this.props;
    if (loading) {
      return null;
    }
    const teamIdx = currentTeamId
      ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)])
      : 0;
    const team = allTeams[teamIdx];
    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      username = user.username;
    } catch (error) {
      console.log(error);
    }
    return [
      <Teams
        key='team-sidebar'
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
      />,
      <Channels
        onAddChannelClick={this.handleAddChannelClick}
        key='channels-sidebar'
        teamName={team.name}
        username={username}
        channels={team.channels}
        users={[
          { id: 1, name: 'slackbot' },
          { id: 2, name: 'user1' }
        ]}
      />,
      <AddChannelModal
        teamId={currentTeamId}
        open={this.state.openChannelModal}
        key='side-bar-add-channel-modal'
        onClose={this.handleCloseAddChannelModal}
      />
    ];
  }
}

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(Sidebar);
