import React from 'react';
import { Form, Input, Button, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Modal open={open} onClose={onClose}>
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
          <Button disabled={isSubmitting} fluid onClick={onClose}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name)
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
      let response = await mutate({ variables: { teamId, name: values.name } });
      console.log(response);
      //onClose();
      setSubmitting(false);
    }
  })
)(AddChannelModal);
