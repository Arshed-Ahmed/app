import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import NavCol from './components/NavCol';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ArrowPopout from './arrow-popout.svg';



function Analytics() {

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 91,
            sortable: true,
        },
        {
          field: 'collectionpoint',
          headerName: 'Collection Point',
          width: 179,
          sortable: true,
        },
        {
          field: 'collectedby',
          headerName: 'Collected By',
          width: 160,
          sortable: true,
        },
        {
          field: 'wastetype',
          headerName: 'Waste Type',
          width: 130,
          sortable: false,
        },
        {
          field: 'collectingequipment',
          headerName: 'Equipment',
          width: 140,
          sortable: false,
        },
        {
          field: 'quantity',
          headerName: 'Quantity',
          width: 130,
          sortable: true,
        },
        {
          field: 'dateandtime',
          headerName: 'Date & Time',
          width: 250,
          sortable: true,
        },
        {
          field: 'tippingpoint',
          headerName: 'Tipping Point',
          width: 165,
          sortable: true,
        },
        {
          field: 'blockId',
          headerName: 'Block ID',
          width: 130,
          sortable: true,
        },
        {
          field: 'transactionHash',
          headerName: ' ',
          width: 50,
          sortable: false,
          renderCell: (params) => {
            if (params.value === ""){
              return null;
            }else {
              return (
                <OverlayTrigger
                  key='bottom-1'
                  placement='bottom'
                  overlay={
                    <Tooltip id='tooltip-connected'>
                      <strong>View on Etherscan</strong>.
                    </Tooltip>
                  }
                >
                  <div>
                    <a className="rop-link" href={`https://ropsten.etherscan.io/tx/${params.value}`} target="_blank" rel="noreferrer"><img src={ArrowPopout} alt="" /></a>
                  </div>
                </OverlayTrigger>
              );
            }
          },
        },
    ];

    
    // const [show, setshow] = useState(false);
    const [reviewData, setreviewData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/analytics').then(
            (response) => {
                setreviewData( response.data.result);
            }
        ).catch(
            (err) => {
                console.log(err);
                // setshow(true);
                // setreviewStatus(err.message);
            }
        )
    },[reviewData])

      
    return (
        <div className="bg-light">
            <NavCol />
            <Container fluid className="col-lg-12 col-md-12 col-sm-12 card-div">
                <Card className="w-100">
                    <DataGrid autoHeight 
                        rows={reviewData}
                        columns={columns}
                        pageSize={10}
                    />
                </Card>
            </Container>
        </div>
    );
}

export default Analytics;
