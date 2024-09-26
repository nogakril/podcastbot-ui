import React, { FunctionComponent } from 'react';
import './StartRecordingBtn.css';

interface IProps {
    btnText: string;
    onClick: () => void;
}

const StartRecordingBtn: FunctionComponent<IProps> = ({btnText, onClick}) => {
    return (
        <>
        <span>Put the headphones on and click REC to start</span>

        <div className="center">
            <div className="circle pulse btn" onClick={onClick}>
                {btnText}
            </div>
        </div>
        </>
    )
}
export default StartRecordingBtn;
