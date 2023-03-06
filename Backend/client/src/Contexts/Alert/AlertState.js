import AlertContext from './AlertContext'

import React, { useState } from 'react'

const AlertState = (props) => {
    const [alert, setAlert] = useState(null);
    const setalert = (type,msg) => {
        setAlert({ type: type, message: msg });
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }
  return (
    
      <AlertContext.Provider value={{ alert,setalert }}>
          {props.children}
      </AlertContext.Provider>
      
  )
}

export default AlertState