import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import { getTeamMembersQuery } from '../graphql/teams';

const MultiSelectUsers = ({
  data: { loading, getTeamMembers },
  value,
  handleChange,
  placeholder
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
      options={getTeamMembers.map(tm => ({
        key: tm.id,
        value: tm.id,
        text: tm.username
      }))}
    />
  );

export default graphql(getTeamMembersQuery, {
  options: ({ teamId }) => ({ variables: { teamId } })
})(MultiSelectUsers);
