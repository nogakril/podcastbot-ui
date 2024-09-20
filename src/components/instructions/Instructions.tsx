import React, { FunctionComponent } from 'react';
import './Instructions.css';
import HeadsetIcon from '@mui/icons-material/Headset';


const Instructions: FunctionComponent= () => {

    return (
        <div className="instructions">
          <span className='logo' ><HeadsetIcon color='error' fontSize='large'/></span>
          <div className="instruction hebrew">
            <h2 className='header'>הוראות הקלטה</h2> 
            <ol>
              <li>נא לא לגעת בציוד ההקלטה שבחדר! יש להשתמש בעכבר בלבד.</li>
              <li>בחרו נושא שתרצו לדון בו במהלך השיחה עם הבוט.</li>
              <li>שימו לב: יש לפנות לבוט באנגלית בלבד.</li>
              <li>יש לדבר באופן איטי וברור למיקרופון כדי להבטיח הבנה מקסימלית.</li>
              <li>כדי להתחיל את ההקלטה, לחץ על כפתור ה-REC.</li>
              <li>בסיום, תוכלו לסרוק קוד QR כדי להוריד את ההקלטה שלכם.</li>
            </ol>
          </div>
          <div className="divider"></div>
          <div className="instruction english">
            <h2 className='header'>Instructions</h2>
            <ol>
              <li>Do not touch the recording equipment in the room! Use the computer mouse only.</li>
              <li>Choose a topic you want to discuss during the conversation with the bot.</li>
              <li>Note: The conversation will be conducted in English only.</li>
              <li>Speak slowly and clearly towards the microphone to ensure maximum understanding.</li>
              <li>To start recording, press the REC button.</li>
              <li>Once you have finished, you can scan a QR code to download your recording.</li>
            </ol>
          </div>
        </div>
    )
}
export default Instructions;