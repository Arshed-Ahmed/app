import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CollectionForm from './pages/CollectionForm';
import ReviewForm from './pages/ReviewForm';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirmation from './pages/Confirmation'
import Footer from './pages/Footer';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const [isAuth , setIsAuth ] = useState(false);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/collectionform" exact component={CollectionForm} />
          <ProtectedRoute path="/reviewform" component={ReviewForm} isAuth={isAuth} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/forgotpassword" exact component={ForgotPassword} />
          <Route path="/confirmation" exact component={Confirmation} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
      
      <button 
        className="btn btn-primary"
        onClick= {() => {
          setIsAuth(true);
      }}>
        Login
      </button>
      <button 
        className="btn btn-warning"
        onClick= {() => {
          setIsAuth(false);
      }}>
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default App;
