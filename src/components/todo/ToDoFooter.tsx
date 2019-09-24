import React from 'react';

interface Props {
  amount: number;
  activeFilter: string;
  changeFilter: any;
}

function ToDoFooter({amount, activeFilter, changeFilter}: Props) {
  const FILTERS_BTN = [
    {
      text: 'All',
      id: 'all',
    },
    {
      text: 'Active',
      id: 'active',
    },
    {
      text: 'Completed',
      id: 'completed'
    }
  ];

  return (
    <div className="todo-footer">
      <span className="todo-footer__amount">{`${amount} Tasks left`}</span>
      <div className="todo-footer__button-group">
        {FILTERS_BTN.map(({text, id}) => (
          <button
            key={id}
            className={'todo-footer__button' + (id === activeFilter ? ' is-active' : '')}
            onClick={() => changeFilter(id)}
          >{text}</button>
        ))}
      </div>
    </div>
  );
}

export default ToDoFooter;