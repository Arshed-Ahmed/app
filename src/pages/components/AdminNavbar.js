import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './../logo.png';
import Container from 'react-bootstrap/Container';
import { NavLink, Redirect } from "react-router-dom";
import Web3 from 'web3';
import swal from 'sweetalert';
import metalogo from '../metamask.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import detectEthereumProvider from '@metamask/detect-provider';


function AdminNavbar() {


    const [refresh, setrefresh] = useState(0);
    const [isMetaMask, setisMetaMask] = useState();
    const [Account, setAccount] = useState([]);
    const [networkType, setnetworkType] = useState();

    // const connect = window.ethereum.isConnected();
    // useEffect(() => {
    //     setisMetaMask(connect);
    //     console.log(connect);
    // },[connect]);
    useEffect(() => {
        const savedData = localStorage.getItem('isMetaMask');
        if (savedData == 'undefined' ){
            setisMetaMask(false);
        }else{
            setisMetaMask(JSON.parse(savedData));
        }
    },[]);
    
if(window.ethereum){
    window.ethereum.on('accountsChanged', (accounts) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
        check();
    });

    window.ethereum.on('chainChanged', (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      check();
    });
}

    const loadWeb3 = () => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(
                (response) => {
                    swal({
                        title: "Connected to MetaMask!",
                        text: "Successfully connected",
                        icon: "success",
                    });
                    setisMetaMask(true);
                }
            ).catch(
                (err) => {
                    swal({
                        title: "Not Connected to MetaMask!",
                        text: err.message,
                        icon: "warning",
                    });
                    setisMetaMask(false);
                }
            )
        }else {
            swal({
            title: "Non ethereum browser detected!",
            text: "Please Install Metamask to Continue",
            icon: "warning",
            buttons: true,
            });
            setisMetaMask(false)
        }
    }


    const check = async () =>{
        if(isMetaMask === true){
            setisMetaMask(true);
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0){
                const networkType = await web3.eth.net.getNetworkType();
                const NType = networkType.toUpperCase();
                setnetworkType(NType);
                setAccount(accounts[0]);
            }else{
                setAccount("Not Connected");
                setisMetaMask(false);
            }
            
        }
    }

    

    useEffect(() => {
        check();
        if(refresh === 1) {
            setrefresh(0);
        }
    }, [refresh, isMetaMask]);

    useEffect(() => {
        localStorage.setItem('isMetaMask', isMetaMask)
    },[isMetaMask]);


    const [islogout, setislogout] = useState(false);
    const logout = () =>{
        swal({
            title: "Are you sure?",
            text: "Make sure you have finished your work!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                localStorage.clear();
                sessionStorage.clear();
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                setislogout(true);
            }
        });
    }
    return (
        <div>
            {/* <Container>
                <Nav className="justify-content-end topbar">
                    <Nav.Link href="#tel:">On Call Support</Nav.Link>
                    <Nav.Link href="#link">Help</Nav.Link>
                </Nav>
            </Container> */}
            <Navbar className="nav-div" expand="lg">
                <Container>
                    <Navbar.Brand href="/analytics">
                        <img
                        alt="SafeEnviro"
                        src={Logo}
                        width="120"
                        className="d-inline-block align-top"
                        />{' '}
                    {/* SafeEnviro */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className=" justify-content-end"  id="basic-navbar-nav">
                        <Nav>
                            <NavLink className="nav-link" to="#"><strong>Account: </strong>{Account}</NavLink>

                            {isMetaMask === true ? (
                                <OverlayTrigger
                                    key='bottom-1'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id='tooltip-connected'>
                                            <strong>Connected</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <button className="conweb"><img className="metalogo" alt="Meta Mask" src={metalogo} /> {networkType}</button>
                                </OverlayTrigger>
                            ):(
                                <OverlayTrigger
                                    key='bottom-2'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id='tooltip-Notconnect'>
                                            <strong>Connect to MetaMask</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <button className="conweb" onClick={loadWeb3}>CONNECT TO  <img className="metalogo" alt="Meta Mask" src={metalogo} /></button>
                                </OverlayTrigger>
                            )}

                            <NavLink className="nav-link hover" activeClassName="active" to="/analytics">Analytics</NavLink>

                            <NavLink className="nav-link hover" activeClassName="active" to="/reviewform">Review Table</NavLink>

                            <button className="signin" onClick={logout}>SIGN OUT</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {islogout && <Redirect to="/logoutconfirm" />}
        </div>
    );
}

export default AdminNavbar;