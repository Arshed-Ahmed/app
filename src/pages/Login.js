import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navibar from './Navibar';
import './App.css';


export default class Login extends Component{
  handleSubmit = e => {
    e.preventDefault();
    const data ={
      type : this.accounttype,
      username : this.name,
      password : this.password
    };
    console.log(data);
    axios.post('http://localhost:3001/login', data).then(
      res => {
        console.log(res);
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  }

  render(){
    return (
      <div className="bg-light">
        <Navibar />
        <Container className="justify-content-center col-lg-5 col-md-7 col-sm-12 card-div">
          <Card>
            <Card.Body>
              <Card.Title><h2>Sign in to your account</h2></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
              <Form className="wastecollectionform" onSubmit={this.handleSubmit}>
                  <Row>
                      <Col>
                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>Account Type</Form.Label>
                              <Form.Select required aria-label="Default select example" name="accounttype"
                                onChange={e => this.accounttype = e.target.value}>
                                  <option>Auth</option>
                                  <option value="Admin">Admin</option>
                                  <option value="Collector">Collector</option>
                              </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>User Name</Form.Label>
                              <Form.Control required type="text" placeholder="User name" name="username"
                                onChange={e => this.username = e.target.value} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>Password</Form.Label>
                              <Form.Control required type="password" placeholder="Password" name="password"
                                onChange={e => this.password = e.target.value} />
                          </Form.Group>

                          <p className="bottom-para">
                            Forgot the password? <Link to="/forgotpassword">Reset</Link>
                          </p>
                          
                          <button className="btn-signin" type="submit">SIGN IN</button>
                      </Col>
                  </Row>
                  <Row>
                      <p className="bottom-para mt-3">
                              Don't have an account? <Link to="/signup">Signup</Link>
                      </p>
                  </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );  
  }
  
}
