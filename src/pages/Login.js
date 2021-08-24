import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navibar from './Navibar';
import './App.css';

function Login() {
  return (
    <div className="bg-light">
      <Navibar />
      <Container className="justify-content-center col-lg-5 col-md-7 col-sm-12 card-div">
        <Card>
          <Card.Body>
            <Card.Title><h2>Sign in your account</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
            <Form className="wastecollectionform">
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Select required aria-label="Default select example" name="accounttype">
                                <option>Auth</option>
                                <option value="1">Admin</option>
                                <option value="2">Collector</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control required type="text" placeholder="User name" name="username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" name="password" />
                        </Form.Group>

                        <p className="bottom-para">
                          Forgot the password? <a href="#">Reset</a>
                        </p>
                        
                        <button className="btn-signin" type="submit">SIGN IN</button>
                    </Col>
                </Row>
                <Row>
                    <p className="bottom-para mt-3">
                            Don't have an account? <a href="#">Signup</a>
                    </p>
                </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
