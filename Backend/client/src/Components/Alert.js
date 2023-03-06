import React, { useContext } from 'react'
import alertcontext from '../Contexts/Alert/AlertContext';

const Alert = () => {
  const context = useContext(alertcontext);
  const { alert } = context;
       return (
         <div
           style={{ height: "50px", position: "absolute",width:"100%", textAlign: "center",top:"60px" }}
         >
           {alert && (
             <div
               className={`alert alert-${alert.type.toLowerCase()} alert-dismissible fade show`}
               role="alert"
             >
               <h5>
                 <strong>{alert.type}</strong> {alert.message}
               </h5>
             </div>
           )}
         </div>
       );
}

export default Alert