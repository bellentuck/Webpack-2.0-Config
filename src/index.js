require('./assets/stylesheets/styles.scss');

import React from 'react'; // main react dependency
import ReactDOM from 'react-dom'; // ReactDOM virtual DOM
import App from './app/App.jsx'; // main app component

ReactDOM.render(<App />, document.getElementById('root'));
// render our app component and mount it to our #root element


// // Previously...
// const dress = () => {
//   document.write('I like your dress')
// }
//
// dress();
// class Car {
//
//   manufacturer(car) {
//     document.write(`I have a ${car}`)
//   }
//
// }
//
// const bmw = new Car;
//
// bmw.manufacturer('maserati');
