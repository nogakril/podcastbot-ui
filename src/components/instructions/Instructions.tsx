import React, { FunctionComponent } from 'react';
import './Instructions.css';
import { Divider } from '@mui/material';


const Instructions: FunctionComponent= () => {
    return (
        <div className="instructions">
          <div className="instruction hebrew">
            <h2>הוראות</h2> {/* Hebrew for 'Instructions' */}
            <ol>
              <li>פתח את התוכנה</li>
              <li>בחר את הקובץ הרצוי</li>
              <li>לחץ על הכפתור 'התחל'</li>
              <li>שמור את התוצאות</li>
            </ol>
          </div>
          <div className="divider"></div>
          <div className="instruction english">
            <h2>Instructions</h2>
            <ol>
              <li>Open the application</li>
              <li>Select the desired file</li>
              <li>Click on the 'Start' button</li>
              <li>Save the results</li>
            </ol>
          </div>
        </div>
    )
}
export default Instructions;