import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import aa from '../images/aa.png';

function HomeTitle() {
  const messageTitle: string = 'Hi,\$I\'m\u00A0\*rtem,\$web\u00A0developer.'; // eslint-disable-line
  const [keyCount, setKeyCount] = useState('');

  useEffect(() => {
    const timeoutLetters = setTimeout(() => setKeyCount('0'), 1000);
    
    return () => clearTimeout(timeoutLetters);
  }, []);

  return (
    <h1 aria-label="Hi, I'm rt, web developer" className="home__title">
      {messageTitle.split('').map((letter: string, letterInd: number) => {
        const currentKey: string = letterInd.toString();
        const nextInd:number = letterInd + 1;

        if (letter === '*') {
          return (
            <CSSTransition 
            in={keyCount === currentKey} 
            timeout={50} 
            onEntered={() => setKeyCount(nextInd.toString())} 
            key={'css-' + currentKey}
            classNames="letter-transition"
          >
            <img key={'home'+currentKey} src={aa} alt="A"></img>
          </CSSTransition>
          )
        } else if (letter === '$') {
          return (
            <CSSTransition 
            in={keyCount === currentKey} 
            timeout={50} 
            onEntered={() => setKeyCount(nextInd.toString())} 
            key={'css-' + currentKey}
            classNames="letter-transition"
          >
            <br key={'home'+currentKey}></br>
          </CSSTransition>
          )
        }
        return (
          <CSSTransition 
            in={keyCount === currentKey} 
            timeout={50} 
            onEntered={() => setKeyCount(nextInd.toString())} 
            key={'css-' + currentKey}
            classNames="letter-transition"
          >
            <span className="rubber" key={'home'+currentKey} aria-hidden="true">{letter}</span>
          </CSSTransition>
        )
        })}
        <div className="tags tags--title-top">{`<h1>`}</div>
        <div className="tags tags--title-bottom">{`</h1>`}</div>
    </h1>
  )
}

export default HomeTitle;