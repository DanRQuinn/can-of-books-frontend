import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import myImage from './book-pic.jpeg'
import './App'
//declare server telling it to get code from the .env
let SERVER = process.env.REACT_APP_SERVER


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API 'get' all the books from the database  */

  getBooks = async () => {
    try {
      //axios means we are going to get data from the backend
      let results = await axios.get(`${SERVER}/books`);
      console.log(results);
      this.setState({
        //filling empty books array from state with data from mongo db database, also data is 3rd requirement of axios after async and await
        books: results.data,
        hasBooks: true,
      })
    } catch (error) {
      console.log('we have an error: ', error.response.data)
    }
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
    let carouselSlides = this.state.books.map((book, index) => {

      //console.log(book);

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

          </Carousel.Caption>
        </Carousel.Item>

      )
    });
    console.log(carouselSlides);
    //this is where my data is showing up in the browser
    return (
      <>
        <h2>The Readings of Dandrew</h2>
        <div>Books:</div>
        {carouselSlides.length ? 
        (
          <Carousel>
            {carouselSlides}
          </Carousel>

        ) : (
        // alt text
        <h3>No Books Found :</h3>
        )}

      </>
    );
  }
}

export default BestBooks;
