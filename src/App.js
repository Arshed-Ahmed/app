import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CollectionForm from './pages/CollectionForm';
import ReviewForm from './pages/ReviewForm';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirmation from './pages/Confirmation'
import './App.css';

function App() {
  return (
    <div>
      <Home />
      <CollectionForm />
      <ReviewForm />
      <ForgotPassword />
      <Login />
      <Signup />
      <Confirmation />
    </div>
  );
}

export default App;
