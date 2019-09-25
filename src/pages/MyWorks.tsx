import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import ContentWrapper from '../components/ContentWrapper';
import FirstExercise from '../components/FirstExercise';
import SecondExercise from '../containers/SecondExercise';

function MyWork() {
  const worksTitle = 'My \u00A0 works';
  const [keyCount, setKeyCount] = useState('');

  useEffect(() => {
    const timeoutLetters = setTimeout(() => setKeyCount('0'), 1000);
    
    return () => clearTimeout(timeoutLetters);
  }, []);

  return (
    <ContentWrapper>
      <div className="my-works">
        <h1 className="my-works__title" aria-label="My works">
          {worksTitle.split('').map((letter, letterInd) => {
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
                <span className="rubber" key={'myworks'+currentKey} aria-hidden="true">{letter}</span>
              </CSSTransition>
            )
          })}
          <div className="tags tags--about-top">{`<h1>`}</div>
          <div className="tags tags--about-bottom">{`</h1>`}</div>
        </h1>
        <div className="my-works__exercises">
          <div className="my-works__exercise">
            <h2 className="my-works__exercise-title">
              <a 
                href="https://github.com/nathanielbumppo/portfolio/blob/master/src/components/FirstExercise.tsx" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Задание N1 <br/> (код и задание на github)
              </a>
            </h2>

            <FirstExercise></FirstExercise>
          </div>
          <div className="my-works__exercise">
            <h2 className="my-works__exercise-title">
              <a 
                href="https://github.com/nathanielbumppo/portfolio/blob/master/src/containers/SecondExercise.tsx" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Задание N2 <br/> (код и задание на github)
              </a>
            </h2>
            <SecondExercise></SecondExercise>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default MyWork;