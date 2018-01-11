import React, { Component } from 'react';
import satire from 'images/ballcrowd';

const hello = () => {
  return (
    <div>
      <div className="images-container">
        <div className="image-wrapper">
          <img src={satire} className="image-wrapper__image" alt=""/>
        </div>
      </div>
    <div className="bunny">
      When it was and when it was, was it when it was, it was when it was, was it when it was.       When it was, it was not and then it was, as was what it was, as though then it was when it was.
    </div>
    <div className="images-container">
      <div className="image-wrapper">
        <img src={satire} className="image-wrapper__image" alt=""/>
      </div>
    </div>
  </div>
  )
}

export default hello;
