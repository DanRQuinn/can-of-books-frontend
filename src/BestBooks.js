import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import './BestBooks.css';
import Image from 'react-bootstrap/Image';
import myImage from './book-pic.jpeg';
import { Container, Button } from 'react-bootstrap';
import './App';
import UpdateBookFormModal from './UpdateBookFormModal';

/* declare server = get code from .env */
let SERVER = process.env.REACT_APP_SERVER

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalDisplaying: false
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

getBooks = async () => {
  try {
    let results = await axios.get(`$${SERVER}/books`);
    console.log(results);
    this.setState({
      books: results.data,
      hasBooks: true,
    })
  } catch (error) {
    console.log('we have an error: ', error.response.data)
  }
}

postBooks = async (newBooks) => {
  try { 
    let url = `${SERVER}/books`
    let createdBook = await axios.post(url, newBook);
    console.log(createdBook.data);
    this.setState({
      books: [...this.state.books, createdBook.data]
    });
  } catch (error) {
    console.log('ERROR: ', error.response.data)
  }
}

handleBookSubmit = (event) => {
  event.preventDefault();
  let newBook = {
    title: event.target.title.value,
    author: event.target.author.value,
    description: event.target.description.value,
    status: event.target.status.checked
  }
  this.postBooks(newBook);
}

deleteBook = async (id) => {
  console.log(id);
  try {
    let url = `${SERVER}/books/${id}`;
    await axios.delete(url);
    let deletedBooks = this.state.books.filter(book => book._id !== id);
    this.setState({
      books. deletedBooks
    })
  } catch (error) {
    console.log('ERROR: ', error.response.data)
  }
}

putBook = async (bookToUpdate) => {
  try {
    let url = `${SERVER}/books/${bookToUpdate._id}`;
    await axios.delete(url);
    let updatedBooks = this.state.books.map(existingBook => {
      return existingBook._id === bookToUpdate._id
      ? updatedBooks.data
      : existingBook;
    });
    this.setState({
      books: updatedBooks
    })
  } catch (error) {
    console.log('ERROR: ', error.response.data)
  }
}

handleShowModal = () => {
  this.setState({
    isModalDisplaying: true
  });
}

handleCloseModal = () => {
  this.setState({
    isModalDisplaying: false
  })
}

componentDidMount() {
  this.getBooks();
}

  render() {

    /* TODO: render all the books in a Carousel */

console.log(this.state.hasBooks);

    return (
      <>
      <header className="subHead">
        <BookFormModal
        show={this.state.isModalDisplaying}
        handleClose={this.handleCloseModal}
        handleShow={this.handleShowModal}
        handleBookSubmit={this.handleBookSubmit}
        putBook={this.putBook}
        />
        <Button variant="primary" className="addButton" onClick={this.handleShowModal} > Collect Tome </Button>
      </header>
      <main>
        <h2>This is me playing catchup on the Readings of Dandrew</h2>
        <div>Books:</div>
        
        {this.state.books.length ? (

          <Book
            books={this.state.books}
            deleteBook={this.deleteBook}
            putBooks={this.putBooks}
            
            />
        ) : (
          <h3>No Books Found :(</h3>
        )}
        </main>
      </>
    )
  }
}

export default BestBooks;

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }
  render() {
    console.log('props.books =>', this.props.books);
    let carouselSlides = this.props.books.map((book, index) => {
      return (

        <Carousel.Item key={index}>
          <Image className='w-100 h-25' src={myImage} alt='book' />
          <Carousel.Caption>

            <h3 key={book._id} className='carousel-test'>
              {book.title}
            </h3>

            <h3 className='carousel-test'>
              {book.author}
            </h3>

            <p className='carousel-test'>
              {book.description}
            </p>

            <Button
              variant='dark'
              onClick={() => this.props.deleteBook(book._id)}
              >
                Burn Tome
              </Button>
              <Button
                onClick={() => this.setState({ showUpdateForm: true})}
                >
                  Revise Tome
                </Button>

          </Carousel.Caption>
        </Carousel.Item>
      )
    });
    return (
      <>
      <Carousel>{carouselSlides}</Carousel>
      {
        this.state.showUpdateForm && <UpdateBookFormModal book={this.props.book} putBook={this.putBook} />
      }
      <h1>Hello</h1>
      </>
    )
  }
}
