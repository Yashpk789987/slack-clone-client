import React from 'react';
import { Form, Input, Button, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import normalizeErrors from '../normalizeErrors';

const InvitePeopleModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add People to your Team</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            name='email'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            fluid
            placeholder="User's Email"
          />
        </Form.Field>
        {touched.email && errors.email ? errors.email[0] : null}
        <Form.Group widths='equal'>
          <Button onClick={handleSubmit} disabled={isSubmitting} fluid>
            Add User
          </Button>
          <Button disabled={isSubmitting} fluid onClick={onClose}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting, setErrors }
    ) => {
      try {
        const response = await mutate({
          variables: { teamId: parseInt(teamId), email: values.email }
        });

        const { ok, errors } = response.data.addTeamMember;

        if (ok) {
          onClose();
          setSubmitting(false);
        } else {
          setSubmitting(false);
          const errorsLength = errors.length;
          const filteredErrors = errors.filter(
            e => e.message !== 'PRIMARY must be unique'
          );
          if (errorsLength !== filteredErrors.length) {
            filteredErrors.push({
              path: 'email',
              message: 'this user is already part of the team'
            });
          }

          setErrors(normalizeErrors(filteredErrors));
        }
      } catch (error) {
        console.log(error);
      }
    }
  })
)(InvitePeopleModal);
