import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className="page">
      <h1>Hello Aphid</h1>
      <p style={{ textAlign: 'center' }}>welcome to shanghai</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
