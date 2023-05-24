import React from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';

class BookFormModal extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title} Add-A-Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form onSubmit={this.props.handleBookSubmit}>
                <Form.Group controlId="title">
                  <Form.Label> Title</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="author">
                  <Form.Label> Author</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label> Description</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="status">
                  <Form.Check type="checkbox" label="Finished book" />
                </Form.Group>
                <Button type="submit">Add Book! </Button>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default BookFormModal;
