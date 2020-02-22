import React from 'react';
import { graphql } from 'react-apollo';

import Header from '../components/Header';

import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';
import MessageContaier from '../containers/MessageContainer';
import findIndex from 'lodash/findIndex';
import { allTeamsQuery } from '../graphql/teams';
import { Redirect } from 'react-router-dom';

const ViewTeam = ({
  data: { loading, allTeams, inviteTeams },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) {
    return null;
  }

  const teams = [...allTeams, ...inviteTeams];

  if (!teams.length) {
    return <Redirect to='/create-team' />;
  }

  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

  const channelIdInteger = parseInt(channelId, 10);
  const channelIdx = channelIdInteger
    ? findIndex(team.channels, ['id', channelIdInteger])
    : 0;
  const channel =
    channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];

  return (
    <AppLayout>
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && (
        <MessageContaier channelId={channel.id} channelName={channel.name} />
      )}
      <SendMessage channelId={channel.id} channelName={channel.name} />
    </AppLayout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
