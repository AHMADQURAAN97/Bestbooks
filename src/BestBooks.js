import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withAuth0 } from '@auth0/auth0-react';
import { Form, Button } from "react-bootstrap/";

class MyFavoriteBooks extends React.Component {


constructor(props){
  super(props);
  this.state = {
    book:[]
  }
}

componentDidMount = async ()=>{
  const { user } = this.props.auth0;

  console.log(this.props.auth0);
  let emailaddress = user.email;
  console.log('email',emailaddress);


  // http://localhost:3001/books?email=AhmadQouraan@gmail.com
let booksData = await axios.get(`${process.env.REACT_APP_DATABASE}/books?email=${emailaddress}`);
console.log(booksData.data);

await this.setState({
  book:booksData.data
})

};



addBook = async(event)=> {

  event.preventDefault();
    
  let title = event.target.title.value;

  let description = event.target.description.value;

};




  render() {
    console.log(this.state.book);

    return(
      <>
    <div>
    <Form  onSubmit={this.addBook}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Book name"
              name="title"
            />

            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Book description"
              name="description"
            />
          </Form.Group>
          <Button type="submit"  variant="primary">
              Add book
            </Button>
        </Form>
    </div>
      <Jumbotron>
        <h1> My Favorite Books</h1>
        <p>
        This is a collection of my favorite books
        </p>
      </Jumbotron>

      <div>
      {this.state.book.length !== 0 ? ( this.state.book.map((item,i) => { 

return (

      <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{item.title}</Card.Title>
    <Card.Text>
    {item.description}
    </Card.Text>
    <Card.Text>
    {item.email}
    </Card.Text>
  </Card.Body>
</Card>
     
      
     )
  })
      ) :( <p> Not exist any Book </p> )
      
      }
     
      
</div>
    
      </>
      )}}
export default withAuth0(MyFavoriteBooks);
