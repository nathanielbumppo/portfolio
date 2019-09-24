import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import logo from '../images/logo.png';

function Preloader({children}: any) {
  const [isLoaded, setLoad] = useState(false);
  const [fillBar, setFillBar] = useState({
    width: '0%'
  });
  
  useEffect(() => { 
    const timeoutLoad = setTimeout(() => setLoad(true), 1800);
    const timeoutBar = setTimeout(() => {
      setFillBar({
        width: '100%'
      });
    }, 400);

    return () => {
      clearTimeout(timeoutLoad);
      clearTimeout(timeoutBar);
    }
  }, []);
  
  if (!isLoaded) {
    return (
      <CSSTransition in={true} appear={true} timeout={1400} classNames="loader-transition">
        <div className="loader">
          <div className="loader__inner">
            <div className="loader__logo">
              <img src={logo} alt="Web developer, React, Vue" srcSet={logo}/>
              <span className="loader__logo-title">
                ART
              </span>
            </div>
            <div className="loader__message">
              ART is thinking
            </div>
            <div className="loader__progress-bar">
              <div className="loader__bar-bg">
                <div style={fillBar}></div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
  return children;
};

export default Preloader;