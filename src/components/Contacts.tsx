import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import ContactForm from './ContactForm';

function Contacts() {
  const constactsTitle = 'Contact\u00A0me';
  const [keyCount, setKeyCount] = useState('');

  useEffect(() => {
    const timeoutLetters = setTimeout(() => setKeyCount('0'), 1000);
    
    return () => clearTimeout(timeoutLetters);
  }, []);

  return (
    <div className="contacts">
      <h1 className="contacts__title" aria-label="Contact me">
          {constactsTitle.split('').map((letter, letterInd) => {
            const currentKey: string = letterInd.toString();
            const nextInd:number = letterInd + 1;
            return (
              <CSSTransition
                in={keyCount === currentKey} 
                timeout={100} 
                onEntered={() => setKeyCount(nextInd.toString())} 
                key={'css-' + currentKey}
                classNames="letter-transition"
              >
                <span className="rubber" key={'constacts'+currentKey} aria-hidden="true">{letter}</span>
              </CSSTransition>
            )
          })}
          <div className="tags tags--about-top">{`<h1>`}</div>
          <div className="tags tags--about-bottom">{`</h1>`}</div>
        </h1>
        <ContactForm/>
    </div>
  );
};

export default Contacts;