import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navibar from './Navibar';
import './App.css';

export default class Signup extends Component{

  handleSubmit = e => {
    e.preventDefault();
    const data ={
      email : this.email,
      username : this.name,
      password : this.password,
      type : this.accounttype
    };

    axios.post('http://localhost:3001/signup', data).then(
      res => {
        console.log(res);
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  }

  

  render() {
    return (
      <div className="bg-light">
        <Navibar />
        <Container className="justify-content-center col-lg-5 col-md-7 col-sm-12 card-div">
          <Card>
            <Card.Body>
              <Card.Title><h2>Create an account</h2></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
              <Form className="wastecollectionform" onSubmit={this.handleSubmit}>
                  <Row>
                      <Col>
                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>Email</Form.Label>
                              <Form.Control required type="email" placeholder="Your Email" name="email" 
                                onChange={e => this.email = e.target.value} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>Your Name</Form.Label>
                              <Form.Control required type="text" placeholder="Your Name" name="name" 
                                onChange={e => this.name = e.target.value} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>Password</Form.Label>
                              <Form.Control required type="password" placeholder="Password" name="password"
                                onChange={e => this.password = e.target.value} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formGridAddress1">
                              <Form.Label>Account Type</Form.Label>
                              <Form.Select required aria-label="Default select example" name="accounttype"
                                onChange={e => this.accounttype = e.target.value} >
                                  <option>Auth</option>
                                  <option value="Admin">Admin</option>
                                  <option value="Collector">Collector</option>
                              </Form.Select>
                          </Form.Group>

                          <button className="btn-signin" type="submit">SIGN UP</button>
                      </Col>
                  </Row>
                  <Row>
                      <p className="bottom-para my-3">
                              Already have an account? <Link to="/login">Signin</Link>
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
