import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import QRCode from 'react-qr-code';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { io } from 'socket.io-client';
import StartRecordingBtn from './components/buttons/StartRecordingBtn';
import StateAnimation from './components/animations/Animation';

const socket = io('http://localhost:5000', { transports: ['websocket'] });

function App() {
  const [url, setUrl] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    })
  }, []);

  useEffect(() => {
    socket.on('status_update', data => {
      setStatus(data.state);
      console.log('Update from server:', data.state);
    });

    return () => {
      socket.off('status_update');
    };
  }, []);


  const handleClick = useCallback(() => {
    fetch("http://localhost:5000/run_session")
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.log(data.error);
        setOpen(true);
      } else {
        setUrl(data.url);
      }
    })
    .catch(err => {
      console.log(err)
      })
    }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='container'>
      
      {/* <div style={{ height: "auto", margin: "0 auto", width: "30%", marginTop: "2%" }}>
        <QRCode
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={url}
        />
      </div> */}
      <div className='main'>
        <span>{"Status"}</span>
        {/* <StartRecordingBtn onClick={handleClick} btnText='REC' ></StartRecordingBtn> */}
        <StateAnimation state={'loading'}></StateAnimation>
      </div>

      <div className='instructions'>
        {'test'}
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          The recording session is already in progress.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
