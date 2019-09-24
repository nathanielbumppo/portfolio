import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../store/actions/actionCreator';

const mapDispatchToProps = (dispatch:any) => {
  return {
    createMessage: (userMessage:any) => dispatch(createMessage(userMessage))
  }
}

function ContactForm(props: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formValid, setFormValid] = useState(checkValid);
  
  function checkValid() {
    if (name.length >= 3 && email.length >= 3 && subject.length >= 3 && message.length >= 3) {
      return true;
    }
    return false;
  }

  function handleSubmit(event:any) {
    event.preventDefault();
    props.createMessage({
      name,
      email,
      subject,
      message,
    });
    setName(''); setEmail(''); setSubject(''); setMessage('');
    alert('Спасибо за обращение!');
  }

  function handleChange(event:any, typeHandle:string) {
    event.preventDefault();
    if (typeHandle === 'name') {
      setName(event.target.value);
    } else if (typeHandle === 'email') {
      setEmail(event.target.value);
    } else if (typeHandle === 'subject') {
      setSubject(event.target.value);
    } else if (typeHandle === 'message') {
      setMessage(event.target.value);
    }
    setFormValid(checkValid);
  }

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <ul>
          <li className="contact-form__name">
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              minLength={3}
              maxLength={30} 
              onChange={(event) => handleChange(event, 'name')}/>
            <label></label>
          </li>
          <li className="contact-form__email">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              minLength={3}
              maxLength={30} 
              onChange={(event) => handleChange(event, 'email')}/>
            <label></label>
          </li>
          <li className="contact-form__subject">
            <input 
              type="text"
              placeholder="Subject" 
              value={subject}
              minLength={3}
              maxLength={100} 
              onChange={(event) => handleChange(event, 'subject')}/>
            <label></label>
          </li>
          <li className="contact-form__message">
            <textarea 
              placeholder="Message" 
              value={message}
              minLength={3}
              maxLength={500} 
              onChange={(event) => handleChange(event, 'message')}/>
            <label></label>
          </li>
        </ul>
        <div className={"contact-form__submit" + (formValid ? '' : ' is-not-valid')}>
          <button className="button button--contact" type="submit">
            <span className="button__content">SEND</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ContactForm);