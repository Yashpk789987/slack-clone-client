import React from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import findIndex from 'lodash/findIndex';

import { meQuery } from '../graphql/teams';
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
    getOrCreateChannel(teamId: $teamId, members: $members) {
      id
      name
    }
  }
`;

export default compose(
  withRouter,
  graphql(getOrCreateChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ members: [] }),
    handleSubmit: async (
      { members },
      { props: { history, onClose, teamId, mutate }, resetForm }
    ) => {
      await mutate({
        variables: { members, teamId },
        update: (store, { data: { getOrCreateChannel } }) => {
          const { id, name, __typename } = getOrCreateChannel;

          const data = store.readQuery({ query: meQuery });
          const teamIdx = findIndex(data.me.teams, ['id', teamId]);

          const notInChannelList = data.me.teams[teamIdx].channels.every(
            c => c.id !== id
          );
          if (notInChannelList) {
            data.me.teams[teamIdx].channels.push({
              id,
              name,
              dm: true,
              __typename
            });
            store.writeQuery({ query: meQuery, data });
          }
          history.push(`/view-team/${teamId}/${id}`);
        }
      });
      onClose();
      resetForm();
    }
  })
)(DirectMessageModal);
