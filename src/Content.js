import React from 'react'
import { withAuth0 } from "@auth0/auth0-react"
import axios from 'axios';

class Content extends React.Component {
  getBooks = async () => {
//8 - 16 need to go into getbooks on bestbooks
    if (this.props.auth0.isAuthenticated) {
      //get token
      const res = await this.props.auth0.getIdTokenClaims();

      //extract token
      const jwt = res.__raw;

      //never leave token log in deployed code
      console.log(jwt);

      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER_URL,
        books: '/books',
        headers: { "Authorization": `Bearer ${jwt}` }
      }
      const bookResults = await axios(config);
      console.log(bookResults);

      // these lines do what is above them
      // let url = `${process.env.REACT_APP_SERVER_URL}`
      // const bookResults = await axios.get(url);
      // console.log(bookResults.data);
    }
  }
  componentDidMount() {
    this.getbooks();
  }
  
  render() {
    
    console.log(this.props.auth0.user);
    
    return (
      <>
        <h1>Content page</h1>
      </>
    )
  }
}

export default withAuth0(Content);
