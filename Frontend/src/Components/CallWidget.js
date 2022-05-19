import React from 'react';
import icon_call from '../images/icon_call.svg';

function CallWidget() {
  return (
    <div className="callWidget dflx">
        <img src={icon_call} alt="call" />
        <div>
            <p>Call Anytime</p>
            <a href="tel:+1234567890">+123-456-7890</a>
        </div>
    </div>
  );
}

export default CallWidget;
