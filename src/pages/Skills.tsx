import React from 'react';
import { Link } from 'react-router-dom';

import ContentWrapper from '../components/ContentWrapper';
import TagSphere from '../components/TagSphere';
import SkillsTitle from '../components/SkillsTitle';

function Skills() {

  return (
    <ContentWrapper>
      <div className="skills">
        <div className="skills__info">
          <SkillsTitle/>
          <div className="skills__text">
            <p>Основная сфера моей компетенции - frontend разработка (клиентская часть).</p>
            <p>HTML, CSS, Javascript (Typescript), разработка клиентской части веб-сайтов с Vue, React фреймворками, пользовательскими плагинами, библиотеками, анимациями и созданием адаптивных макетов.</p>
            <p>Работал со многими графическими редакторами, включая Adobe Photoshop, Corel Draw, Adobe Illustrator, Figma.</p>
            <p>Для получения большей информации вы можете посетить мой <a href="https://github.com/nathanielbumppo" className="skills__links" target="_blank" rel="noopener noreferrer">Github</a> профиль или просто <Link to="/contact" className="skills__links">связаться</Link> со мной.</p>
          </div>
        </div>
        <div className="skills__sphere">
          <TagSphere/>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Skills;