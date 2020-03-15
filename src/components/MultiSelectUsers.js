import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import { getTeamMembersQuery } from '../graphql/teams';

const MultiSelectUsers = ({
  data: { loading, getTeamMembers },
  value,
  handleChange,
  placeholder,
  currentUserId
}) =>
  loading ? null : (
    <Dropdown
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      fluid
      multiple
      search
      selection
      options={getTeamMembers
        .filter(item => item.id !== currentUserId)
        .map(tm => ({
          key: tm.id,
          value: tm.id,
          text: tm.username
        }))}
    />
  );

export default graphql(getTeamMembersQuery, {
  options: ({ teamId }) => ({ variables: { teamId } })
})(MultiSelectUsers);
