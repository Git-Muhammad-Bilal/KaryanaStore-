import React from 'react'


 
const KaryanaNameWithTitle = ({isSignup}:{isSignup?:boolean})=>{
       
     return(
        <div className="karyanaName-container">
            <h1>Karyana</h1>
        
            {
                isSignup ?
                 <h2>Sighn Up to a digial solution for your Store!</h2>:
                 <p>A Way to make your buisness digital and easy!</p>
            }
        </div>
     )
}

export default KaryanaNameWithTitle;