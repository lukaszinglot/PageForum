import React from "react";
import { Button, Modal, Form, TextArea, Icon } from "semantic-ui-react";

const ModalCommon = (props: any) => {
  return (
    <>
      {props.text === "Add Comment" ? (
        <button onClick={props.onClick}>{props.text}</button>
      ) : (
        <Button onClick={props.onClick} icon size="small">
          <Icon name="add circle" size="big" color="blue" />
        </Button>
      )}
      <Modal open={props.open} onClose={props.onClose}>
        <Modal.Header>{props.text}</Modal.Header>
        <Form onSubmit={props.onSubmit} id="form">
          <Modal.Content>
            <Form.Input
              placeholder="Title"
              type="text"
              value={props.inputNameValue}
              onChange={props.onInputChange}
            />
            {props.text === "Add Comment" ? (
              <Form.Input
                placeholder="Email"
                type="text"
                value={props.inputEmailValue}
                onChange={props.onInputEmailChange}
              />
            ) : null}
            <TextArea
              placeholder="Body"
              type="text"
              value={props.textAreaValue}
              onChange={props.onTextAreaChange}
            />
          </Modal.Content>
          <Modal.Actions className="ui segment">
            <Button type="button" onClick={props.onClose} inverted color="red">
              Cancel
            </Button>
            <Button type="submit" value="Submit" inverted color="green">
              Submit
            </Button>
          </Modal.Actions>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCommon;
