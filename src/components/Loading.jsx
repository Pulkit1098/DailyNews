import React, { Component } from 'react'

const Loading = ()=> {

    return (
        <div className='d-flex justify-content-center align-items-center my-3'>
        <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
        </div>
    )
  }
export default Loading;
