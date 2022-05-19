import React from 'react';
import Icon from './Icon';

import facebook from '../images/icon_facebook.svg';
import twitter from '../images/icon_twitter.svg';
import instagram from '../images/icon_instagram.svg';

function SocialLinks() {
  return (
    <ul className="dflx socialLinks">
        <li><Icon iconName="Twitter" iconLink="/" iconImage={twitter} /></li>
        <li><Icon iconName="Instagram" iconLink="/" iconImage={instagram} /></li>
        <li><Icon iconName="Facebook" iconLink="/" iconImage={facebook} /></li>
    </ul>
  );
}

export default SocialLinks;
