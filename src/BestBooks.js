import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import './BestBooks.css';
import { withAuth0 } from "@auth0/auth0-react";
import Image from 'react-bootstrap/Image';
import myImage from './book-pic.jpeg'
import { Container, Button } from 'react-bootstrap';
import './App'
import UpdateBookFormModal from './UpdateBookFormModal';
//declare server telling it to get code from the .env
let SERVER = process.env.REACT_APP_SERVER


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalDisplaying: false

    }
  }

  /* TODO: Make a GET request to your API 'get' all the books from the database  */

  getBooks = async () => {
    if (this.props.auth0.isAuthenticated){
      
      try {
        //axios means we are going to get data from the backend
        let results = await axios.get(`${SERVER}/books`);
        console.log(results);
        this.setState({
          //filling empty books array from state with data from mongo db database, also data is 3rd requirement of axios after async and await
          books: results.data,
          hasBooks: true,
        })
      } catch(error) {
        console.log('we have an error: ', error.response.data)
      }
    };
  }

  postBook = async (newBook) => {
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
    this.postBook(newBook);
  }

  deleteBook = async (id) => {
    console.log(id);
    try {
      let url = `${SERVER}/books/${id}`;
      await axios.delete(url);
      // this.getBooks();
      let deletedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: deletedBooks
      })
    } catch (error) {
      console.log('ERROR: ', error.response.data)
    }
  }

  putBook = async (bookToUpdate) => {
    try {
      let url = `${SERVER}/books/${bookToUpdate._id}`;
      await axios.delete(url);
      // this.getBooks();
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

  // I need to know more about what this does
  componentDidMount() {
    this.getBooks();
  }

  render() {
    //between render and return we set variables

    /* TODO: render all the books in a Carousel */
    //map over the array
    //callback fuction uses book and index
    //books are objects

    console.log(this.state.hasBooks);

    //this is where my data is showing up in the browser
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
          <Button variant="primary" className="addButton" onClick={this.handleShowModal} > Add Book! </Button>
        </header>
        <main>
          <h2>The Readings of Dandrew</h2>
          <div>Books:</div>
          {this.state.books.length ?
            (

              <Book
                books={this.state.books}
                deleteBook={this.deleteBook}
                putBooks={this.putBooks}

              />


            ) : (
              // alt text
              <h3>No Books Found :</h3>
            )}
        </main>
      </>
    );
  }
}

export default withAuth0(BestBooks);

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
              {/* get the title */}
              {book.title}
            </h3>

            <h3 className='carousel-test'>
              {/* get the author */}
              {book.author}
            </h3>

            <p className='carousel-test'>
              {/* get the description */}
              {book.description}
            </p>

            {/* <p className='carousel-test'>
              
              {book.status}
            </p> */}
            <Button
              variant='dark'
              onClick={() => this.props.deleteBook(book._id)}
            >
              delete book

            </Button>
            <Button
              onClick={() => this.setState({ showUpdateForm: true })}
            >
              update book

            </Button>



          </Carousel.Caption>
        </Carousel.Item>


      );
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

