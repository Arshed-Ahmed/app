import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navibar from './Navibar';
import Logo from './logo.png';
import './App.css';

function Home() {
  return (
    <div className="bg-light">
      <Navibar />
      <Container className="justify-content-center col-lg-5 col-md-7 col-sm-12 card-div">
        <Card>
          <Card.Body>
            <Form className="wastecollectionform">
              <Row>
                <Col>
                    <Row className="flex justify-content-center">
                        <img
                            alt="SafeEnviro"
                            src={Logo}
                            className="home-logo"
                        />
                    </Row>
                    <h6 className="welcomemsg">Welcome to SafeEnviro DAPP</h6>
                    <button className="btn-signup" type="submit">SIGN UP</button>
                    <button className="btn-signin" type="submit">SIGN IN</button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
