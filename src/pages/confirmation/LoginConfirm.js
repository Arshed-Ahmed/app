import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navibar from '../components/Navibar';
import img from '../img.png'
import '../App.css';

function LoginConfirm() {
  return (
    <div className="bg-light">
      <Navibar />
      <Container className="justify-content-center col-lg-5 col-md-7 col-sm-12 card-div">
        <Card>
            <Card.Body>
                <Card.Title align="center">
                    <img alt="Complete" src={img} width="60" className="pb-3" /> <br />
                    You Successfully Signed In!
                </Card.Title>
                <Card.Subtitle align="center" className="mb-2 text-muted size-12">Please go to your Home Page</Card.Subtitle>
                <Form className="wastecollectionform">
                    <Row>
                        <Col>
                          <Link to="/collectionform">
                            <Link to="/dash">
                              <button className="btn-backtosignin" type="submit">Home</button>
                            </Link>
                          </Link>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default LoginConfirm;