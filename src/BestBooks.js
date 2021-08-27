import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import { withAuth0 } from "@auth0/auth0-react";
import { Form, Button, ThemeProvider } from "react-bootstrap/";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      selectedBook:{},
      showUpdateForm: false,
    };
  }

  // ====================================== GetBook Function=====================

  componentDidMount = async () => {
    const { user } = this.props.auth0;

    console.log(this.props.auth0);
    let emailaddress = user.email;
    console.log("email", emailaddress);

    // http://localhost:3001/books?email=AhmadQouraan@gmail.com
    let booksData = await axios.get(
      `${process.env.REACT_APP_DATABASE}/books?email=${emailaddress}`
    );
    console.log(booksData.data);

     this.setState({
      book: booksData.data,
    });
  };

  // ========================================== addBook function ============================

  addbook = async (e) => {
    e.preventDefault();
    const { user } = this.props.auth0;

    let bookInfo = {
      email: user.email,
      title: e.target.title.value,
      description: e.target.description.value,
    };

    let bookInfoData = await axios.post(
      `${process.env.REACT_APP_DATABASE}/addbook`,
      bookInfo
    );
    console.log("boooookInfo", bookInfoData);


 
     this.setState({
      book: [...this.state.book , bookInfoData.data]
    });
  };

  // ======================================Delete Function==================

   deleteBook = async (bookID) => {
    const { user } = this.props.auth0;

   

    let resData = await axios.delete(
      `${process.env.REACT_APP_DATABASE}/deletebook/${bookID}?email=${user.email}`
    );

    this.setState({
      book: resData.data,
     
    });
    
  };
 
  // ======================================Update Function================= 

  updateBook = async (bookID) => { 
    await this.setState({

      showUpdateForm:false,
    });
    
    let choosenBook=this.state.book.find(item => {

     return item._id === bookID;
    })

    this.setState({

      selectedBook:choosenBook,
      showUpdateForm:true,
    })
console.log("choooosenbook",{choosenBook})
  };

  updateBookInfo = async (e) => { 
    const { user } = this.props.auth0;

    e.preventDefault();

    let bookData ={

    title : e.target.title.value,
    description : e.target.description.value,
    email:user.email
  }
  let bookID = this.state.selectedBook._id
  let booksDataa = await axios.put(`${process.env.REACT_APP_DATABASE}/updatebook/${bookID}`,bookData);

  this.setState ({
    book:booksDataa.data
  })

  };

  render() {
    

    return (
      <>
        <div>
          <Form onSubmit={this.addbook}>
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
              <input type="submit" value="Add Book" />
            </Form.Group>
          </Form>
        </div>

        <Jumbotron>
          <h1> My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
        </Jumbotron>
       <div>

         {this.state.showUpdateForm && 
      <Form onSubmit={this.updateBookInfo}>
      <Form.Group>
      <Form.Control
       className="mb-2"
       type="text"
       defaultValue={this.state.selectedBook.title}
       name="title"
        />

      <Form.Control
       className="mb-2"
       type="text"
       defaultValue={this.state.selectedBook.description}
       name="description"
        />
   <input type="submit" value="Update" />
 </Form.Group>
</Form>
         }


        </div>
        <div>
          {this.state.book.length !== 0 ? (
            this.state.book.map((item, i) => {
              return (
                <li key={i}>
                  <h4> {item.title}</h4>
                  <p>{item.description}</p>
                  <p>{item.email}</p>
                  <Button
                    variant="bottom"
                    variant="danger"
                    onClick={() => this.deleteBook(item._id)}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="bottom"
                    variant="danger"
                    onClick={() => this.updateBook(item._id)}
                  >
                    Update Book
                  </Button>
                </li>
              );
            })
          ) : (
            <p> Not exist any Book </p>
          )}
        </div>

 

      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);

{
  /* <Card key={i} style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{item.title}</Card.Title>
    <Card.Text>
    {item.description}
    </Card.Text>
    <Card.Text>
    {item.email}
    </Card.Text>
  </Card.Body>
</Card> */
}

{
  /* <li key={i}>
<h4> {item.title}</h4>
<p>{item.description}</p>
<p>{item.email}</p>
<Button variant="bottom" variant="danger" onClick={() => this.deleteBook(i)}>
Delete 
      </Button>

</li>
    )})} */
}
