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
  const [showErrors, setShowErrors] = useState(false);

  const validName = {
    minLength: name.length > 2,
    maxLength: name.length <= 30,
    isName: (/^[a-zа-яё]+(?: [a-zа-яё]+)?$/i).test(name),
    required: name.length > 0,
    isValid: function () {
      if (this.minLength && this.maxLength && this.isName && this.required) {
        return true;
      }
      return false;
    }
  };
  const validEmail = {
    minLength: email.length > 2,
    maxLength: email.length <= 30,
    isEmail: (/@/).test(email),
    required: email.length > 0,
    isValid: function () {
      if (this.minLength && this.maxLength && this.isEmail && this.required) {
        return true;
      }
      return false;
    }
  };
  const validSubject = {
    minLength: subject.length > 2,
    maxLength: subject.length < 50,
    required: subject.length > 0,
    isValid: function () {
      if (this.minLength && this.maxLength && this.required) {
        return true;
      }
      return false;
    }
  };
  const validMessage = {
    minLength: message.length > 2,
    maxLength: message.length < 300,
    required: message.length > 0,
    isValid: function () {
      if (this.minLength && this.maxLength && this.required) {
        return true;
      }
      return false;
    }
  };

  function handleSubmit(event:any) {
    event.preventDefault();

    const formValid = 
    validName.isValid() && 
    validEmail.isValid() && 
    validSubject.isValid() && 
    validMessage.isValid();

    if (formValid) {
      props.createMessage({
        name,
        email,
        subject,
        message,
      });

      setName(''); setEmail(''); setSubject(''); setMessage('');
      alert('Спасибо за обращение!');
    } else {
      setShowErrors(true);
    }
  }

  function handleChange(event:any, inputType:string) {
    if (showErrors) setShowErrors(false);
    const value = event.target.value;

    if (inputType === 'name') {
      setName(value);
    } else if (inputType === 'email') {
      setEmail(value);
    } else if (inputType === 'subject') {
      setSubject(value);
    } else if (inputType === 'message') {
      setMessage(value);
    }
  }

  function errors(inputValid: any) {
    if (!inputValid.required && showErrors) {
      return <span>Field is required</span>
    } else if (!inputValid.minLength && showErrors) {
      return <span>Field is not 3 characters minimum!</span>
    }

    if (inputValid === validName) {
      if (!inputValid.isName && showErrors) {
        return <span>Please enter valid characters</span>
      } else if (!inputValid.maxLength && showErrors) {
        return <span>Field is not 30 characters maximum!</span>
      }
    }

    if (inputValid === validEmail) {
      if (!inputValid.isEmail && showErrors) {
        return <span>Wrong email format</span>
      } else if (!inputValid.maxLength && showErrors) {
        return <span>Field is not 30 characters maximum!</span>
      }
    }

    if (inputValid === validSubject) {
      if (!inputValid.maxLength && showErrors) {
        return <span>Field is not 50 characters maximum!</span>
      }
    }

    if (inputValid === validMessage) {
      if (!inputValid.maxLength && showErrors) {
        return <span>Field is not 300 characters maximum!</span>
      }
    }
  }

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <ul>
          <li className={"contact-form__name" + (showErrors && !validName.isValid() ? ' is-not-valid' : '')}>
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(event) => handleChange(event, 'name')}
              />
            <label></label>
            { showErrors ? errors(validName) : null}
          </li>
          <li className={"contact-form__email" + (showErrors && !validEmail.isValid() ? ' is-not-valid' : '')}>
            <input 
              type="text" 
              placeholder="Email" 
              value={email}
              onChange={(event) => handleChange(event, 'email')}
              />
            <label></label>
            {showErrors ? errors(validEmail) : null}
          </li>
          <li className={"contact-form__subject" + (showErrors && !validSubject.isValid() ? ' is-not-valid' : '')}>
            <input 
              type="text"
              placeholder="Subject" 
              value={subject}
              onChange={(event) => handleChange(event, 'subject')}
              />
            <label></label>
            {showErrors ? errors(validSubject) : null}
          </li>
          <li className={"contact-form__message" + (showErrors && !validMessage.isValid() ? ' is-not-valid' : '')}>
            <textarea 
              placeholder="Message" 
              value={message}
              onChange={(event) => handleChange(event, 'message')}
              />
            <label></label>
            {showErrors ? errors(validMessage) : null}
          </li>
        </ul>
        <div className="contact-form__submit">
          <button className="button button--contact" type="submit">
            <span className="button__content">SEND</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ContactForm);