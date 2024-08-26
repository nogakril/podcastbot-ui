import React, { FunctionComponent } from 'react';
import  './LoadingAnimation.css';
import  './ListeningAnimation.css';
import  './SpeakingAnimation.css';
import  './PlayingAnimation.css';
import './Animation.css';
import { Status } from '../../App';

interface IProps {
    state?: Status;
}

const StateAnimation: FunctionComponent<IProps> = ({state}) => {
    
    return (
             <div className="canvas">
                <div className={`dot first_${state}`}/>
                <div className={`dot second_${state}`}/>
                <div className={`dot third_${state}`}/>
                <div className={`dot fourth_${state}`}/>
            </div>
    )
}
export default StateAnimation;
