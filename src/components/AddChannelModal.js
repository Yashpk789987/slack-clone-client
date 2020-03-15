import React from 'react';
import { Form, Input, Button, Modal, Checkbox } from 'semantic-ui-react';
import { withFormik } from 'formik';
import findIndex from 'lodash/findIndex';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import MultiSelectUsers from './MultiSelectUsers';

import { meQuery } from '../graphql/teams';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue,
  teamId,
  currentUserId
}) => (
  <Modal
    open={open}
    onClose={() => {
      resetForm();
      onClose();
    }}
  >
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            name='name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            fluid
            placeholder='Channel Name'
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            onChange={(e, checked) => setFieldValue('public', !checked)}
            value={!values.public}
            label='Private'
            toggle
          />
        </Form.Field>
        {values.public ? null : (
          <Form.Field>
            <MultiSelectUsers
              value={values.members}
              handleChange={(e, { value }) => setFieldValue('members', value)}
              teamId={teamId}
              placeholder='select members to invite'
              currentUserId={currentUserId}
            />
          </Form.Field>
        )}
        <Form.Group widths='equal'>
          <Button onClick={handleSubmit} disabled={isSubmitting} fluid>
            Create Channel
          </Button>
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
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!, $public: Boolean, $members: [Int!]) {
    createChannel(
      teamId: $teamId
      name: $name
      public: $public
      members: $members
    ) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '', public: true, members: [] }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      try {
        onClose();

        await mutate({
          variables: {
            teamId: parseInt(teamId),
            name: values.name,
            public: values.public,
            members: values.members
          },
          optimisticResponse: {
            createChannel: {
              __typename: 'Mutation',
              ok: true,
              channel: {
                __typename: 'Channel',
                id: -1,
                name: values.name
              }
            }
          },
          update: (store, { data: { createChannel } }) => {
            const { ok, channel } = createChannel;

            if (!ok) {
              return;
            }
            const data = store.readQuery({ query: meQuery });
            const teamIdx = findIndex(data.me.teams, ['id', teamId]);
            data.me.teams[teamIdx].channels.push(channel);
            store.writeQuery({ query: meQuery, data });
          }
        });
        setSubmitting(false);
      } catch (error) {
        console.log(error);
      }
    }
  })
)(AddChannelModal);
