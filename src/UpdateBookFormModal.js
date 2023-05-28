import React from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';

class UpdateBookFormModal extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let bookToUpdate = {
      title: e.target.title.value || this.props.book.title,
      author: e.target.author.value || this.props.book.author,
      description: e.target.description.value || this.props.book.description,
      status: e.target.status.checked || this.props.book.status,
      _id: this.props.book._id,
      __v: this.props.book.__v
    };
    this.props.putBook(bookToUpdate)
  }
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
                  <Form.Control type="text" placeholder={this.props.book.title}/>
                </Form.Group>
                <Form.Group controlId="author">
                  <Form.Label> Author</Form.Label>
                  <Form.Control type="text" placeholder={this.props.book.author}/>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label> Description</Form.Label>
                  <Form.Control type="text" placeholder={this.props.book.description}/>
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

export default UpdateBookFormModal;