import React, { useState } from 'react';
import logo from '../images/logo.png';
import { ReactComponent as Vk} from '../images/icons/vk.svg';
import { ReactComponent as Instagram} from '../images/icons/instagram.svg';
import { ReactComponent as Telegram} from '../images/icons/telegram.svg';
import { ReactComponent as Github} from '../images/icons/github-logo.svg';
import { ReactComponent as Menu} from '../images/icons/menu.svg';
import { HomeOutlined, AccountBoxOutlined, Code, WorkOutline, MailOutline } from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';

function Toolbar() {
  type linkType = {
    id: string,
    link: string,
    rel: string,
    icon(): JSX.Element
  };

  type SocialType = {
    id: string,
    link: string,
    item(): JSX.Element
  };

  const menuLinks: linkType[] = [
    { link: '/', id: 'home', rel: 'index', icon: () => <HomeOutlined /> },
    { link: '/about', id: 'about', rel: 'about', icon: () => <AccountBoxOutlined /> },
    { link: '/skills', id: 'skills', rel: 'skills', icon: () => <Code /> },
    { link: '/myworks', id: 'my works', rel: 'gallery', icon: () => <WorkOutline /> },
    { link: '/contact', id: 'contact', rel: 'contact', icon: () => <MailOutline /> },
  ];

  const socialLinks: SocialType[] = [
    {id: 'vk', link: 'https://vk.com/artbad', item: () => <Vk />},
    {id: 'instagram', link: 'https://www.instagram.com/aartbad/', item: () => <Instagram />},
    {id: 'tlg', link: 'https://t.me/nathanielbumpp0', item: () => <Telegram />},
    {id: 'git', link: 'https://github.com/nathanielbumppo', item: () => <Github />}
  ];

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="toolbar">
      <div className="toolbar__wrapper">
        <Link to="/" className="toolbar__logo">
          <img src={logo} alt="Web developer, React, Vue" srcSet={logo}/>
          <span className="toolbar__logo-title">
            ART
          </span>
        </Link>
        <nav className={"toolbar__navbar" + (openMenu ? ' is-active' : '')}>
          {menuLinks.map(({link, id, rel, icon}) => {
            const exact: boolean = (id === 'home');
            return (
              <NavLink
                key={id} 
                to={link} 
                rel={rel} 
                className="toolbar__navbar-link"
                activeClassName="is-active"
                exact={exact}
              >
                {icon()}
                <span>{id.toUpperCase()}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="toolbar__social">
          {socialLinks.map(({link, item, id}) => 
            <a key={id} href={link} target="_blank" rel="noopener noreferrer">
              {item()}
            </a>
          )}
        </div>
        <button className={"toolbar__menu-button" + (openMenu ? ' is-active' : '')} onClick={() => setOpenMenu(!openMenu)}>
          <Menu/>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;