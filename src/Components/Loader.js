import React from 'react'
import "./Loader.css"
const Loader = () => {
  return (
    <div >
      <div className="lds-ring">
        <h3>Loading</h3>
          <div></div>
          <div></div>
     </div>
    </div>
  )
}

export default Loader