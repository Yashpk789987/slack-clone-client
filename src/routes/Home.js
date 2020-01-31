import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const Home = () => {
  const { data, loading, error } = useQuery(allUsersQuery);
  if (loading) return <h1>loading</h1>;
  if (error) return <h1>Error</h1>;
  return data.allUsers.map(u => <h1 key={u.id}>{u.username}</h1>);
};

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
    }
  }
`;

export default Home;
