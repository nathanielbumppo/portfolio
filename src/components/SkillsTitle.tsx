import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import useWindowWidth from './hooks/useWindowWidth';

function SkillsTitle() {
  const skillsTitle = 'Skills\u00A0&\$Experience'; // eslint-disable-line
  const [keyCount, setKeyCount] = useState('');
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const timeoutLetters = setTimeout(() => setKeyCount('0'), 1000);
    
    return () => clearTimeout(timeoutLetters);
  }, []);

  return (
    <h1 className="skills__title" aria-label="Skills & Experience">
      {skillsTitle.split('').map((letter:string, letterInd) => {
        const currentKey: string = letterInd.toString();
        const nextInd:number = letterInd + 1;
        if (letter === '$' && windowWidth >= 992) {
          return (
            <CSSTransition 
            in={keyCount === currentKey} 
            timeout={100} 
            onEntered={() => setKeyCount(nextInd.toString())} 
            key={'css-' + currentKey}
            classNames="letter-transition"
          >
            <br key={'skills'+ currentKey}></br>
          </CSSTransition>
          )
        } else if (letter === '$' && windowWidth < 992) {
          return (
            <CSSTransition 
            in={keyCount === currentKey} 
            timeout={100} 
            onEntered={() => setKeyCount(nextInd.toString())} 
            key={'css-' + currentKey}
            classNames="letter-transition"
          >
            <span key={'skills'+ currentKey}>&nbsp;</span>
          </CSSTransition>
          )
        } else {
          return (
            <CSSTransition
              in={keyCount === currentKey} 
              timeout={100} 
              onEntered={() => setKeyCount(nextInd.toString())} 
              key={'css-' + currentKey}
              classNames="letter-transition"
            >
              <span className="rubber" key={'skills'+currentKey} aria-hidden="true">{letter}</span>
            </CSSTransition>
          )
        }
        
      })}
      <div className="tags tags--about-top">{`<h1>`}</div>
      <div className="tags tags--about-bottom">{`</h1>`}</div>
    </h1>
  )
}

export default SkillsTitle;