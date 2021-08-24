import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navibar from './Navibar';
import './App.css';


function CollectionForm() {
  return (
    <div className="bg-light">
      <Navibar />
      <Container className="justify-content-end col-lg-9 col-md-11 col-sm-12 card-div">
        <Card>
          <Card.Body>
            <Card.Title><h2>Waste collection form</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
            <Form className="wastecollectionform">
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Collection point</Form.Label>
                    <Form.Control required type="text" placeholder="Collection point" name="collectionPoint" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Waste type</Form.Label>
                    <Form.Select required aria-label="Default select example" name="wasteType">
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control required type="text" placeholder="Quantity" name="quantity" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Collected by</Form.Label>
                    <Form.Control required type="text" placeholder="Collected by" name="collectedBy" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Collecting equipment</Form.Label>
                    <Form.Control required type="text" placeholder="Collected equipment" name="CollectingEquipment" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Date & time</Form.Label>
                    <Form.Control required placeholder="Date & time" name="date" />
                  </Form.Group>

                  <button className="btn-submit" type="submit">SUBMIT FORM</button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CollectionForm;
