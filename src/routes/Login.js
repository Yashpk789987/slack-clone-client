import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import {
  Container,
  Header,
  Input,
  Button,
  Form,
  Message
} from 'semantic-ui-react';

import { gql, graphql } from 'react-apollo';

class Login extends React.Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: '',
      password: '',
      errors: []
    });
  }

  onChange = event => {
    const { name, value } = event.target;
    this[name] = value;
  };

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });
    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.push('/');
    } else {
      const { ok, errors } = response.data.login;

      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
  };

  render() {
    const {
      email,
      password,
      errors: { emailError, passwordError }
    } = this;
    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    /// Because Of Mobx
    return (
      <Container text>
        <Header as='h2'>Login</Header>
        <Form>
          <Form.Field error={!!emailError}>
            <Input
              name='email'
              value={email}
              onChange={this.onChange}
              placeholder='Email'
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              name='password'
              value={password}
              placeholder='Password'
              fluid
              type='password'
              onChange={this.onChange}
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Login</Button>
        </Form>
        {errorList.length ? (
          <Message
            error
            header='There was some errors with your submission'
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));