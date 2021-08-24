import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navibar from './Navibar';
import './App.css';

function Signup() {
  return (
    <div className="bg-light">
      <Navibar />
      <Container className="justify-content-center col-lg-5 col-md-7 col-sm-12 card-div">
        <Card>
          <Card.Body>
            <Card.Title><h2>Create your account</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
            <Form className="wastecollectionform">
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>User Email</Form.Label>
                            <Form.Control required type="email" placeholder="Your Email" name="useremail" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control required type="text" placeholder="User Name" name="username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" name="password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Select required aria-label="Default select example" name="accounttype">
                                <option>Auth</option>
                                <option value="1">Two</option>
                                <option value="2">Three</option>
                            </Form.Select>
                        </Form.Group>

                        <button className="btn-signin" type="submit">SIGN UP</button>
                    </Col>
                </Row>
                <Row>
                    <p className="bottom-para my-3">
                            Already have an account? <a href="#signin">Signin</a>
                    </p>
                </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Signup;
