import React, { useState } from 'react';
import { Message, Container, Header, Input, Button } from 'semantic-ui-react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

function Register(props) {
  let [username, setUsername] = useState('');
  let [usernameError, setUsernameError] = useState('');
  let [email, setEmail] = useState('');
  let [emailError, setEmailError] = useState('');
  let [password, setPassword] = useState('');
  let [passwordError, setPasswordError] = useState('');

  let [mutate] = useMutation(registerMutation);

  const onSubmit = async () => {
    let response = await mutate({
      variables: { username: username, email: email, password: password }
    });
    setUsernameError('');
    setPasswordError('');
    setEmailError('');
    const { ok, errors } = response.data.register;
    if (ok) {
      props.history.push('/');
    } else {
      errors.forEach(({ path, message }) => {
        switch (path) {
          case 'username':
            setUsernameError(message);
            break;
          case 'email':
            setEmailError(message);
            break;

          case 'password':
            setPasswordError(message);
            break;

          default:
            break;
        }
      });
    }
  };

  const errorList = [];

  if (usernameError) {
    errorList.push(usernameError);
  }

  if (emailError) {
    errorList.push(emailError);
  }

  if (passwordError) {
    errorList.push(passwordError);
  }

  return (
    <Container text>
      <Header as='h2'>Register</Header>
      <Input
        error={!!usernameError}
        name='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='Username'
        fluid
      />
      <Input
        name='email'
        error={!!emailError}
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Email'
        fluid
      />
      <Input
        name='password'
        error={!!passwordError}
        value={password}
        placeholder='Password'
        fluid
        type='password'
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Submit</Button>
      {usernameError || emailError || passwordError ? (
        <Message
          error
          header='There was some errors with your submission'
          list={errorList}
        />
      ) : null}
    </Container>
  );
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default Register;
