import React, { useState } from 'react';

const CookieBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="cookie-bar bg-dark text-white p-3">
      <div className="container d-flex justify-content-between">
        <span>This site uses cookies to enhance user experience.</span>
        <button className="btn btn-light btn-sm" onClick={() => setVisible(false)}>Accept</button>
      </div>
    </div>
  );
};

export default CookieBar;
