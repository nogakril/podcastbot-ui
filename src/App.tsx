import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import QRCode from 'react-qr-code';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Instructions from './components/instructions/Instructions';
import { io } from 'socket.io-client';
import StartRecordingBtn from './components/buttons/StartRecordingBtn';
import StateAnimation from './components/animations/Animation';
import { styled } from '@mui/material/styles';


const socket = io('http://localhost:5000', { transports: ['websocket'] });

export type Status = 'loading' | 'listening' | 'pending' | 'speaking' | 'done' | 'playing';


const CustomButtonDone = styled(Button)(({ theme }) => ({
  borderColor: '#EEEEEE',
  color: '#EEEEEE',
  fontWeight: 'bold',
  fontFamily: 'Open Sans',
  '&:hover': {
    borderColor: '#ADF0DD', 
    color: '#ADF0DD', 
  },
})) as typeof Button;

const CustomButtonQuit = styled(Button)(({ theme }) => ({
  borderColor: '#EEEEEE',
  color: '#EEEEEE',
  fontWeight: 'bold',
  fontFamily: 'Open Sans',
  '&:hover': {
    borderColor: '#FBD3CB', 
    color: '#FBD3CB', 
  },
})) as typeof Button;

function App() {
  const [url, setUrl] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('pending');

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
    console.log('click')
    // setStatus('loading');
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
      setOpen(true);
      setStatus('pending');
      })
    }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDoneClicked = () => {
    setStatus('pending');
  }

  // const handleQuitClicked = () => {
  //   socket.emit('stop_process');
  //   setStatus('pending');
  // }

  const displayStatus = useMemo(() => {
    if (status === 'loading') {
      return 'Loading';
    } else if (status === 'listening') {
      return 'Recording, Speak now!';
    } else if (status === 'speaking') {
      return 'The bot is speaking.';
    } else if (status === 'playing') {
      return 'Playing your recording.';
    } else  {
      return '';
    }
  }, [status]); 

  return (
    <div className='container'>
        {/* { <div style={{position: 'fixed', bottom: '0px', margin: '20px'}}>
          <CustomButtonQuit variant="outlined" startIcon={<HighlightOffIcon />} onClick={handleQuitClicked}>
              {'Quit'}
          </CustomButtonQuit>
        </div>} */}
      <div className='main'>
        {status === 'pending' && <StartRecordingBtn onClick={handleClick} btnText='REC' ></StartRecordingBtn>}
        {status === 'done' && 
          <div className='qr-container'>
            <div className='qr'>
            <QRCode
              size={256}
              value={url}
            />
            </div>
            <span className='done-btn'>
            <CustomButtonDone variant="outlined" startIcon={<CheckCircleIcon />} onClick={handleDoneClicked}>
            {'Done, Click to start a new recording'}
            </CustomButtonDone>
            </span>
        </div>
      }
        {status !== 'pending' && status !== 'done' &&
          <>
            <StateAnimation state={status}></StateAnimation>
            <div className="loading-container">
              <div className={status === 'loading' ? 'loading' : ''}>{displayStatus}</div>
            </div>
          </>
        }
      </div>
      <Instructions/>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Some error has occured, try again.
        </Alert>
      </Snackbar>

    </div>
  );
}

export default App;
