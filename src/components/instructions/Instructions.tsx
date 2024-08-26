import React, { FunctionComponent } from 'react';
import logo from '../../assets/logo.svg';
import './Instructions.css';


const Instructions: FunctionComponent= () => {
    return (
        <div className="instructions">
          
          <div className='logo'><img src={logo} alt="logo" className='logo'/></div>
          
          <div className="instruction hebrew">
            <h2>הוראות הקלטה</h2> {/* Hebrew for 'Instructions' */}
            <ol>
              <li>בחר נושא שאתה רוצה לדון בו במהלך השיחה עם הבוט.</li>
              <li>שים לב: השיחה תתקיים באנגלית בלבד.</li>
              <li>דבר באופן איטי וברור ל המיקרופון כדי להבטיח הבנה מקסימלית.</li>
              <li>כדי להתחיל את ההקלטה, לחץ על כפתור ה-REC.</li>
            </ol>
          </div>
          <div className="divider"></div>
          <div className="instruction english">
            <h2>Instructions</h2>
            <ol>
              <li>Choose a topic you want to discuss during the conversation with the bot.</li>
              <li>Note: The conversation will be conducted in English only.</li>
              <li>Speak slowly and clearly towards the microphone to ensure maximum understanding.</li>
              <li>To start recording, press the REC button.</li>
            </ol>
          </div>
        </div>
    )
}
export default Instructions;