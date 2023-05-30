import React from 'react';
import { withAuth0 } from "@auth0/auth0-react";
//import in class components
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from './LoginButtton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import About from './About';
import './App.css';
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
        <h1>Auth0</h1>
        {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        {/* {this.props.auth0.isAuthenticated ? <Profile/> : <h2>please login</h2>} */}

        <Router>
          <Header />
          <Container>
            <Routes>
              
              {this.props.auth0.isAuthenticated &&

                <Route
                  // "/" is the homepage
                  exact path="/"
                  //the homepage will render bestbooks js
                  element={<BestBooks />}
                >
                </Route>
              }
              {this.props.auth0.isAuthenticated &&

                <Route
                  // "/" is the homepage
                  exact path="/profile"
                  //the homepage will render bestbooks js
                  element={<Profile />}
                >
                </Route>
                }

                <Route
                  // "/" is the homepage
                  exact path="/about"
                  //the homepage will render bestbooks js
                  element={<About />}
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

export default withAuth0(App);
