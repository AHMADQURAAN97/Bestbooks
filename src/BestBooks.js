import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from "axios";
import Card from 'react-bootstrap/Card';

class MyFavoriteBooks extends React.Component {


constructor(props){
  super(props);
  this.state = {
    book:[]
  }
}

componentDidMount = async ()=>{

let url= `${process.env.REACT_APP_DATABASE}`;

let booksData = await axios.get(url);


this.setState({
  book:booksData.data
})
};





  render() {
    return(
      <>
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
    //   <Jumbotron>
    //     <h1> {item.title}</h1>
    //     <p>
    //     {item.description}
    //     </p>
    //     <p> {item.email}</p>
    //   </Jumbotron>
     )
  })
      ) :( <p> Not exist any Book </p> )
      
      }
      </>
      )}}
export default MyFavoriteBooks;
