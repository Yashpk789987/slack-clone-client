import React from 'react';
import { Form, Input, Button, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import findIndex from 'lodash/findIndex';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { meQuery } from '../graphql/teams';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  resetForm
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
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
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
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      try {
        onClose();

        await mutate({
          variables: { teamId: parseInt(teamId), name: values.name },
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
