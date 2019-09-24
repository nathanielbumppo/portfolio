import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import ContentWrapper from '../components/ContentWrapper';
import Cube from '../components/Cube';

function About() {
  const aboutTitle = 'About\u00A0me';
  const [keyCount, setKeyCount] = useState('');

  useEffect(() => {
    const timeoutLetters = setTimeout(() => setKeyCount('0'), 1000);
    
    return () => clearTimeout(timeoutLetters);
  }, []);

  return (
    <ContentWrapper>
      <div className="about">
        <div className="about__info">
          <h1 className="about__title" aria-label="About me">
            {aboutTitle.split('').map((letter:string, letterInd) => {
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
                  <span className="rubber" key={currentKey} aria-hidden="true">{letter}</span>
                </CSSTransition>
              )
            })}
            <div className="tags tags--about-top">{`<h1>`}</div>
            <div className="tags tags--about-bottom">{`</h1>`}</div>
          </h1>
          <div className="about__text">
            <p>
              Всё началось с интереса к веб-технологиям.
            </p>
            <p>
              С августа по октябрь 2018 года я занимался прохождением курсов HTMLAcademy, включая дополнительные материалы.
            </p>
            <p>
              С октября 2018 по конец февраля 2019 года участовал в разработке (фронтенд-направление) социальной сети для мотоциклистов "MotoSite" (Laravel).
            </p>
            <p>
              С марта по апрель изучал Vue (включая vue-router и vuex). По окончанию изучения, занимался разработкой landing page для компании, занимающейся ремонтом бытовой техники в г.Тюмень (Vue + vue-router + vuex + vuetify).
            </p>
            <p>
              С мая по июль занимался самообучением (learn.javascript.ru), так же сделал 'comming page' для инвестиционной платформы (Nuxt).
            </p>
            <p>
              С начала июля по настоящее время изучаю React, redux и react-router-dom и Typescript. Этот сайт построен на данном стэке технологий.
            </p>
          </div>
        </div>
        <div className="about__right-col">
          <Cube/>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default About;