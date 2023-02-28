import React from 'react'

function Btn({id , className="card-btn" , clickHandler , type ,isDisabled , label}) {
  return (
    <button
      id={id}
      className={className}
      onClick={clickHandler}
      type={type}
      disabled={isDisabled}
    >
      {label}
    </button>
  )
}

export default Btn