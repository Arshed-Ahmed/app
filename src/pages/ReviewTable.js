import React, {useEffect, useState, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './App.css';
import { useTable, useRowSelect } from 'react-table';
import { Checkbox } from './components/Checkbox';
import NavCol from './components/NavCol';
import swal from 'sweetalert';
import Storehash from './../contracts/Storehash.json';
import Web3 from 'web3';
import toHex from 'to-hex';



function ReviewTable() {
    
    const [wasteHash, setWasteHash] = useState();
    const [retrieve, setRetrieve] = useState();
    const [Account, setAccount] = useState();

    const loadBlockchain = async () => { //contract delpoyed with ganach
        // setLoading(true);
        if(typeof window.ethereum == "undefined") {
            swal({
                title: "Connection Error!",
                text: "The Meta Mask is not connected",
                icon: "warning",
                buttons: true,
            });
        }
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        //setCurrentAccount(account);
    
        if (accounts.length === 0) {
            swal({
                title: "Connection Error!",
                text: "There are no Account connected",
                icon: "warning",
                buttons: true,
            });
        }
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = Storehash.networks[networkId];
        console.log(networkData);
    
        if (networkId === 5777) { // if we use current netorkId it deploy. if not like id == 42 it will not work
            //   setLoading(false);
            // console.log(Address);
            const StoreHashContract = new web3.eth.Contract(Storehash.abi, networkData.address);
            
            const data = JSON.stringify(selectedFlatRows.map((row) => row.original) ,null, 2 );
            const hexdata = (toHex(Buffer.from(data)));
            const sendData = "0x"+ hexdata;
            console.log(sendData);
            const wasteHash = await StoreHashContract.methods.store(sendData).send({from:accounts[0]}).then(
                (response) => {
                    console.log(response);
                    const BlockId = response.blockNumber;
                    const rowdata = selectedFlatRows.map((row) => row.original);
                    const array = [rowdata, BlockId];
                    console.log(array);
                    //request to backend- database
                    axios.post('http://localhost:3001/reviewsubmit', rowdata).then(
                        (response) => {
                            if(!response.err){
                                if(response.data.err){
                                    if(response.data.err.sqlMessage){
                                        swal({
                                            title: "Transaction Incomplete!",
                                            text: response.data.err.sqlMessage,
                                            icon: "warning",
                                        });
                                    }else{
                                        setreviewStatus();
                                        swal({
                                            title: "Transaction Incomplete!",
                                            text: response.data.err,
                                            icon: "warning",
                                        });
                                    }
                                }else if(response.data.sqlMessage){
                                    swal({
                                        title: "Transaction Incomplete!",
                                        text: response.data.sqlMessage,
                                        icon: "warning",
                                    });
                                }else {
                                    swal({
                                        title: "Transaction Complete!",
                                        text: response.data.message,
                                        icon: "success",
                                        button: true,
                                    }).then(() => {
                                        window.location.reload();
                                    });
                                }
                            } else {
                                swal({
                                    title: "Transaction Incomplete!",
                                    text: response.data.err,
                                    icon: "warning",
                                });
                            }
                        }
                    ).catch(
                        (err) => {
                            console.log(err);
                            swal({
                                title: "Transaction Incomplete!",
                                text: err.message,
                                icon: "warning",
                            });
                        }
                    );
                }
            ).catch(
                (err) => {
                    swal({
                        title: "Transaction Incomplete!",
                        text: err.message,
                        icon: "warning",
                    });
                }
            )
            setWasteHash(wasteHash);
            const retrieve = await StoreHashContract.methods.retrieve().call();
            setRetrieve(retrieve);
        } else {
            swal({
                title: "Network Error!",
                text: "The contract is not detected by the network",
                icon: "warning",
                buttons: true,
            });
        }
        console.log(wasteHash);
        console.log(retrieve);
        console.log(Account);
    };
    


    // Create an editable cell renderer
    const EditableCell = ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData, // This is a custom function that we supplied to our table instance
    }) => {
        // We need to keep and update the state of the cell normally
        const [value, setValue] = useState(initialValue)

        const onChange = e => {
        setValue(e.target.value)
        }

        // We'll only update the external data when the input is blurred
        const onBlur = () => {
        updateMyData(index, id, value)
        }

        // If the initialValue is changed external, sync it up with our state
        useEffect(() => {
        setValue(initialValue)
        }, [initialValue])

        return <input className="tipP" placeholder="Insert Tipping Point" value={value} onChange={onChange} onBlur={onBlur} />
    }

    // Set our editable cell renderer as the default Cell renderer
    // const defaultColumn = {
    //     Cell: EditableCell,
    // }

    const COLUMNS =[
        {
            Header : 'Id',
            accessor: 'collectionid'
        },
        {
            Header : 'Collection Point',
            accessor: 'collectionpoint'
        },
        {
            Header : 'Collected By',
            accessor: 'collectedby'
        },
        {
            Header : 'Waste Type',
            accessor: 'wastetype'
        },
        {
            Header : 'Collecting Equipment',
            accessor: 'collectingequipment'
        },
        {
            Header : 'Quantity',
            accessor: 'quantity'
        },
        {
            Header : 'Date & Time',
            accessor: 'dateandtime'
        },
        {
            Header: 'Tipping Point',
            accessor: 'tippingpoint',
            Cell : EditableCell
        },
    ]
   
    const [showDanger, setshowDanger] = useState(false);
    const [showSuccess, setshowSuccess] = useState(false);
    const [reviewStatus, setreviewStatus] = useState("");
    const [reviewData, setreviewData] = useState([]);
    const [originalData,setoriginalData] = useState([]);
    const [skipPageReset, setSkipPageReset] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/reviewform').then(
            (response) => {
                setreviewData( response.data.result);
                setoriginalData( response.data.result);
            }
        ).catch(
            (err) => {
                console.log(err);
                setshowDanger(true);
                setreviewStatus(err.message);
            }
        )
    },[])
    

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setreviewData(old =>
            old.map((row, index) => {
            if (index === rowIndex) {
                return {
                ...old[rowIndex],
                [columnId]: value,
                }
            }
            return row
            })
        )
    }
    
    useEffect(() => {
        setSkipPageReset(false)
    }, [reviewData])

    
    const resetData = () => setreviewData(originalData);

    const columns = useMemo(() => COLUMNS, []);
    // const data = useMemo(() => reviewData, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = useTable({
        columns,
        data:reviewData,
        autoResetPage: !skipPageReset,
        updateMyData,
    },
    useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                
                return [
                    ...columns,
                    {
                        id: 'selection',
                        Header : ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    }
                ]
            })
        }
    );


    const removedata = e => {
        e.preventDefault();
        const data =  selectedFlatRows.map((row) => row.original);
        if(data.length === 0){
            setreviewStatus("Select data to be removed!");
            setshowDanger(true);
            setTimeout(function(){setshowDanger(false)},5000);
        } else {
            swal({
                title: "Are you sure?",
                text: "Once deleted, this data can not be recovered!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    axios.post('http://localhost:3001/removedata', data).then(
                        (response) => {
                            console.log(response);
                            if(!response.err){
                                if(response.data.err){
                                    if(response.data.err.sqlMessage){
                                        setreviewStatus(response.data.err.sqlMessage);
                                        setshowDanger(true);
                                        setTimeout(function(){setshowDanger(false)},5000);
                                    }else{
                                        setreviewStatus(response.data.err);
                                        setshowDanger(true);
                                        setTimeout(function(){setshowDanger(false)},5000);
                                    }
                                    
                                } else {
                                    setreviewStatus(response.data.message);
                                    setshowSuccess(true);
                                    // setTimeout(function(){setshowSuccess(false)},5000);
                                    refresh();
                                    setshowDanger(false);
                                }
                            } else {
                                setreviewStatus(response.data.err);
                                setshowDanger(true);
                                setTimeout(function(){setshowDanger(false)},5000);
                            }
                        }
                    ).catch(
                        (err) => {
                        console.log(err);
                        setreviewStatus(err.message);
                        setshowDanger(true);
                        setTimeout(function(){setshowDanger(false)},5000);
                        }
                    )
                } else {
                    setreviewStatus("Your data is safe!");
                    setshowSuccess(true);
                    setTimeout(function(){setshowSuccess(false)},5000);
                }
            });
        }
        
    }


    const check = () => {
        const isMetaMask = window.ethereum.isConnected();
        if(isMetaMask === true){
            const data =  selectedFlatRows.map((row) => row.original);
            if(data.length === 0) {
                swal({
                    title: "Transaction Unable!",
                    text: "Select one or more reviewed data to continue",
                    icon: "warning",
                });
            }else{
                axios.post('http://localhost:3001/check', data).then(
                    (response) => {
                        if(response.data.message){
                            loadBlockchain();
                        } else if(response.data.err){
                            setreviewStatus();
                            swal({
                                title: "Transaction Unable!",
                                text: response.data.err,
                                icon: "warning",
                            });
                        }
                    }
                ).catch(
                    (err) => {
                        swal({
                            title: "Transaction Unable!",
                            text: err.message,
                            icon: "warning",
                        });
                    }
                )
            }
        }else{
            swal({
                title: "Connect to MetaMask!",
                text: "To complete this action metamask is needed",
                icon: "warning",
            });
        }
    }

    const refresh = () => {
        setTimeout(function(){window.location.reload()},3500);
    }
      
    return (
        <div className="bg-light">
            <NavCol />
            <Container className="justify-content-center col-lg-9 col-md-10 col-sm-12 card-div">
            <Card className="w-100">
                <Card.Body>
                <Card.Title><h2>Waste collection review form</h2></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
                <Form className="wastereviewform">
                    <Row>
                        <Col>
                            <Table id="review-table" bordered hover responsive size="sm" {...getTableProps}>
                                <thead>
                                    {(headerGroups.map((headerGroup) =>(
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                            ))}
                                        </tr>
                                        )))
                                    }
                                </thead>
                                <tbody className="reviewtbody" {...getTableBodyProps}> 
                                    { rows.length > 0 ? (
                                            rows.map((row) => {
                                                prepareRow(row)
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {row.cells.map((cell) =>{
                                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                        })}
                                                    </tr>
                                                );
                                            })
                                        ):(
                                            <tr>
                                                <td colSpan="9">
                                                    <Alert variant="danger" className="alert-div mb-0">
                                                        This Table doesn't have any data for now. 
                                                    </Alert>
                                                </td>
                                                
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="flex justify-content-start">
                            <button className="btn-reset" type="reset" onClick={resetData}>RESET</button>
                        </Col>
                        <Col className="flex justify-content-end">
                            <button className="btn-rem" onClick={removedata}>REMOVE DATA</button>
                            <button className="btn-sub" type="button" onClick={check}>SUBMIT FORM</button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {showDanger && 
                            <Alert variant="danger" className="alert-div">
                                {reviewStatus}
                            </Alert>
                            
                        }
                        {showSuccess && 
                            <Alert variant="success" className="alert-div">
                                {reviewStatus}
                            </Alert>
                        }
                    </Row>
                </Form>
                </Card.Body>
            </Card>
            </Container>
            {/* <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
        </div>
    );
}

export default ReviewTable;
