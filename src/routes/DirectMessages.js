import React from 'react';
import { compose, graphql } from 'react-apollo';

import Header from '../components/Header';
import gql from 'graphql-tag';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';
import MessageContaier from '../containers/MessageContainer';
import findIndex from 'lodash/findIndex';

import { meQuery } from '../graphql/teams';
import { Redirect } from 'react-router-dom';

const DirectMessages = ({
  data: { loading, me },
  match: {
    params: { teamId, userId }
  }
}) => {
  if (loading) {
    return null;
  }

  const { teams, username } = me;

  if (!teams.length) {
    return <Redirect to='/create-team' />;
  }

  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

  return (
    <AppLayout>
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
        username={username}
      />
      {/* <Header channelName={channel.name} />
      <MessageContaier channelId={channel.id} channelName={channel.name} /> */}
      <SendMessage onSubmit={() => {}} placeholder={userId} />
    </AppLayout>
  );
};

const createDirectMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default compose(
  graphql(createDirectMessageMutation),
  graphql(meQuery, { options: { fetchPolicy: 'network-only' } })
)(DirectMessages);
