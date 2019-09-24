import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import HomeTitle from '../components/HomeTitle';
import aBigPng from '../images/abig.png';
import BigA from '../components/icons/abig';
import ContentWrapper from '../components/ContentWrapper';

function Home() {
  const [showPngA, setShowPngA] = useState(false);
  return (
    <ContentWrapper>
      <main className="home">
        <div className="home__info">
          <HomeTitle />
          <h2 className="home__subtitle">
            Front End Developer / Vue / React
          </h2>
          <Link to="/contact" rel="contact" className="button button--contact">
            <span className="button__content">
              Contact me
            </span>
          </Link>
        </div>
        <div className="home__logo">
          <div className="home__logo-wrapper">
            <CSSTransition 
              in={showPngA} 
              timeout={1000} 
              classNames="fade-in"
            >
              <img src={aBigPng} alt=""/>
            </CSSTransition>
            <CSSTransition 
              in={!showPngA}
              appear={true}
              timeout={3000} 
              onEntered={() => setShowPngA(true)}
              unmountOnExit
            >
              <BigA />
            </CSSTransition>
          </div>
        </div>
      </main>
    </ContentWrapper>
  );
};


export default Home;