import React from 'react';
import { Form, Input, Button, Modal } from 'semantic-ui-react';
import Downshift from 'downshift';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

const DirectMessageModal = ({
  open,
  onClose,
  teamId,
  history,
  data: { loading, getTeamMembers }
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            {!loading && (
              <Downshift
                onChange={selectedUser => {
                  history.push(`/view-team/user/${teamId}/${selectedUser.id}`);
                  onClose();
                }}
              >
                {({
                  getInputProps,
                  getItemProps,
                  isOpen,
                  inputValue,
                  selectedItem,
                  highlightedIndex
                }) => (
                  <div>
                    <Input
                      fluid
                      {...getInputProps({ placeholder: 'Favorite color ?' })}
                    />
                    {isOpen ? (
                      <div style={{ border: '1px solid #ccc' }}>
                        {getTeamMembers
                          .filter(
                            i =>
                              !inputValue ||
                              i.username
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                          )
                          .map((item, index) => (
                            <div
                              {...getItemProps({ item })}
                              key={item.id}
                              style={{
                                backgroundColor:
                                  highlightedIndex === index ? 'gray' : 'white',
                                fontWeight:
                                  selectedItem === item ? 'bold' : 'normal'
                              }}
                            >
                              {item.username}
                            </div>
                          ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </Downshift>
            )}
          </Form.Field>

          <Form.Group widths='equal'>
            <Button fluid onClick={onClose}>
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const getTeamMembers = gql`
  query($teamId: Int!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`;

export default withRouter(graphql(getTeamMembers)(DirectMessageModal));
