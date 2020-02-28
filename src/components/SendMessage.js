import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import { Input } from 'semantic-ui-react';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const ENTER_KEY = 13;

const SendMessage = ({
  placeholder,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <SendMessageWrapper>
    <Input
      onKeyDown={e => {
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e);
        }
      }}
      onChange={handleChange}
      onBlur={handleBlur}
      name='message'
      value={values.message}
      fluid
      placeholder={`Message #${placeholder}`}
    />
  </SendMessageWrapper>
);

export default withFormik({
  mapPropsToValues: () => ({ message: '' }),
  handleSubmit: async (
    values,
    { props: { onSubmit }, setSubmitting, resetForm }
  ) => {
    try {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false);
        return;
      }

      await onSubmit(values.message);
      setSubmitting(false);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  }
})(SendMessage);
