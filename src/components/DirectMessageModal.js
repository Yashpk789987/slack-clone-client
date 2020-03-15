import React from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

import MultiSelectUsers from './MultiSelectUsers';

const DirectMessageModal = ({
  open,
  onClose,
  teamId,
  history,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue,
  currentUserId
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Add Users For Private Messaging</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <MultiSelectUsers
              value={values.members}
              handleChange={(e, { value }) => setFieldValue('members', value)}
              teamId={teamId}
              placeholder='select members to Message'
              currentUserId={currentUserId}
            />
          </Form.Field>

          <Form.Group widths='equal'>
            <Button
              disabled={isSubmitting}
              fluid
              onClick={e => {
                resetForm();
                onClose(e);
              }}
            >
              Cancel
            </Button>
            <Button fluid onClick={handleSubmit}>
              Start Messaging
            </Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const getOrCreateChannelMutation = gql`
  mutation($teamId: Int!, $members: [Int!]!) {
    getOrCreateChannel(teamId: $teamId, members: $members)
  }
`;

export default compose(
  withRouter,
  graphql(getOrCreateChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ members: [] }),
    handleSubmit: async (
      { members },
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      const response = await mutate({ variables: { members, teamId } });
      console.log(response);
      onClose();
      setSubmitting(false);
    }
  })
)(DirectMessageModal);
