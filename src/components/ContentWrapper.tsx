import React from 'react';
import { CSSTransition } from 'react-transition-group';

function ContentWrapper({children}:any) {
  return(
    <CSSTransition in={true} appear={true} timeout={1000} classNames="show-component">
    <div className="content-wrapper">
      {children}
      <div className="tags tags--body-top">{'<body>'}</div>
      <div className="tags tags--body-bottom">{'</body>'}</div>
      <div className="tags tags--html-bottom">{'</html>'}</div>
    </div>
  </CSSTransition>
  )
};

export default ContentWrapper;