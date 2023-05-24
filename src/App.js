import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Container>
            <Routes>

              <Route
                // "/" is the homepage
                exact path="/"
                //the homepage will render bestbooks js
                element={<BestBooks />}
              >
              </Route>
              {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
            </Routes>
          </Container>
          <Footer />
        </Router>
      </>
    )
  }
}
console.log('Im alive!');

export default App;
