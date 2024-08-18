import React, { FunctionComponent } from 'react';
import './StartRecordingBtn.css';

interface IProps {
    btnText: string;
    onClick: () => void;
}

const StartRecordingBtn: FunctionComponent<IProps> = ({btnText, onClick}) => {
    return (
        <div className="center">
            <div className="circle pulse btn" onClick={onClick}>
                {btnText}
            </div>
        </div>
    )
}
export default StartRecordingBtn;
