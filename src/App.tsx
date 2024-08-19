import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import QRCode from 'react-qr-code';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { io } from 'socket.io-client';
import StartRecordingBtn from './components/buttons/StartRecordingBtn';
import StateAnimation from './components/animations/Animation';
import Instructions from './components/instructions/Instructions';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const socket = io('http://localhost:5000', { transports: ['websocket'] });

export type Status = 'loading' | 'recording' | 'pending' | 'speaking' | 'done';

function App() {
  const [url, setUrl] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('done');

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
    setStatus('loading');
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

  const handleDoneClicked = () => {
    setStatus('pending');
  }

  return (
    <div className='container'>
      
      
      <div className='main'>
        {status === 'pending' && <StartRecordingBtn onClick={handleClick} btnText='REC' ></StartRecordingBtn>}
        {status === 'done' && 
          <div className='qr-container'>
            <QRCode
              size={256}
              value={url}
            />
            <span className='done-btn'>
            <IconButton aria-label="done" size='large' color='success' onClick={handleDoneClicked}>
              <CheckCircleIcon />
            </IconButton>
            {'Done, Take me back'}
            </span>
        </div>
      }
        {status !== 'pending' &&  status !== 'done' && 
          <>
            <StateAnimation state={status}></StateAnimation>
            <span>{status}</span>
          </>
        }
      </div>
      <Instructions/>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          The recording session is already in progress.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
