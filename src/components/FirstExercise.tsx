/*
Есть массив объектов:
[
  {id: 1, name: “Вася”, date:”15.06.2018”, count: 11},
  {id: 2, name: “Петя”, date:”23.11.2018”, count: 23},
  {id: 3, name: “Иван”, date:”12 марта 2017”, count: 3},
  {id: 4, name: “Александр”, date: ”20/12/2010”, count: 1},
  {id: 5, name: “Евгений”, date:”12.09.2018”, count: 112},
  {id: 6, name: “Мария”, date:”1.08.2016”, count: 122},
  {id: 7, name: “Анастасия”, date:”20.11.2018”, count: 34},
  {id: 8, name: “Степан”, date:”12.11.2019”, count: 10},
]

Сделать функционал:

Таблица с данными
Выбор столбца
Сортировка по выбранному столбцу(больше/меньше/без сортировки)
Поиск по выбранному столбцу всех возможных совпадений

Это задание можно делать различными способами, на ваше усмотрение. 

Можно по выбору использовать - React/Vue/Angular/jq/js. В зависимости от того, на каком стеке планируете работать.
*/

import React, { useState, useEffect } from 'react';

import useCorrectDate from './hooks/useCorrectDate';

function FirstExercise() {
  const originTableRows = [
    {
      id: 1,
      name: 'Вася',
      date: '15.06.2018',
      count: 11
    },
    {
      id: 2,
      name: 'Петя',
      date: '23.11 .2018',
      count: 23
    },
    {
      id: 3,
      name: 'Иван',
      date: '12 марта 2017',
      count: 3
    },
    {
      id: 4,
      name: 'Александр',
      date: '20 / 12 / 2010',
      count: 1
    },
    {
      id: 5,
      name: 'Евгений',
      date: '12.09 .2018',
      count: 112
    },
    {
      id: 6,
      name: 'Мария',
      date: '1.08 .2016',
      count: 122
    },
    {
      id: 7,
      name: 'Анастасия',
      date: '20.11 .2018',
      count: 34
    },
    {
      id: 8,
      name: 'Степан',
      date: '12.11 .2019',
      count: 10
    }
  ];
  const correctTableRows = useCorrectDate(originTableRows)
  const [chosenColumn, setChosenColumn] = useState('ID');
  const [searchBus, setSearchBus] = useState('');
  const [sortType, setSortType] = useState('default');
  const [tableRows, setTableRows] = useState([]);
  const tableTitle = ['ID', 'Name', 'Date', 'Count'];

  function handleChange(event:any) {
    setSearchBus(event.target.value);
  }

  function chooseColumn(event:any, title:string) {
    if (sortType === 'default') {
      setSortType('more');
    } else if (sortType === 'more') {
      if (chosenColumn === title) {
        setSortType('less');
      }
    } else if (sortType === 'less') {
      if (chosenColumn === title) {
        setSortType('more');
      }
    }
    setChosenColumn(title);
  }

  function setTableArrowClasses() {
    if (sortType === 'more') {
      return 'is-more';
    } else if (sortType === 'less') {
      return 'is-less';
    } else {
      return 'default';
    }
  }

  useEffect(() => {
    function renderTable() {
      const column = chosenColumn.toLowerCase();

      function sortTable(tableData: any, column:string) {
        if (sortType === 'more') {
          tableData.sort((a:any, b:any) => {
            if (a[column] > b[column]) {
              return 1;
            } else {
              if (a[column] < b[column]) {
                return -1;
              } else {
                return 0;
              }
            }
          });
        } else if (sortType === 'less') {
          tableData.sort((a:any, b:any) => {
            if (a[column] < b[column]) {
              return 1;
            } else {
              if (a[column] > b[column]) {
                return -1;
              } else {
                return 0;
              }
            }
          });
        }
        tableData.forEach((obj:any) => {
          obj.date = new Date(obj.date * 1000);
          obj.date = obj.date.toLocaleString('ru', {
            day: 'numeric',
            year: 'numeric',
            month: 'numeric',
          });
          
        });
        return tableData;
      }
    
      function filterTable(arr:object[], column:string) {
        const filteredArr = arr.filter((obj:any) => {
          let matchCheck = false;
          for (let key in obj) {
            const searchData = obj[key].toString().toLowerCase();
            const enteredValue = searchBus.toLowerCase();
    
            if (key === column) {
              if (searchData.includes(enteredValue)) {
                matchCheck = true;
              }
            }
          }
          return matchCheck;
        });
        return filteredArr;
      }
  
      let tableData = filterTable(correctTableRows, column);
      let sortTableData = sortTable(tableData, column);
      setTableRows(sortTableData);
    };

    renderTable();
  }, [chosenColumn, sortType, searchBus, correctTableRows]);

  return(
    <div className="first-exercise">
      <input
        className="first-exercise__table-search"
        type="text"
        value={searchBus}
        onChange={(e) => handleChange(e)}
        placeholder="Search..."
      />
      <table className="first-exercise__table">
        <thead className="first-exercise__table-head">
          <tr>
            {tableTitle.map((title) => {
              return (
                <th 
                  key={title} 
                  onClick={(e) => chooseColumn(e, title)}
                >
                  {title}
                  <span 
                    className={setTableArrowClasses()}
                  ></span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="first-exercise__table-body">
          {tableRows.map((row:any) => {
            return (
              <tr key={row.name}>
                {Object.keys(row).map((cellId:string) => {
                  return (
                    <td 
                      key={row[cellId]+cellId}
                      className={cellId === (chosenColumn.toLowerCase()) ? 'is-active' : ''}
                    >{row[cellId]}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <button className="button button--contact" type="button" onClick={() => setSortType('default')}>
        <span className="button__content">Without sort</span>
      </button>
    </div>
  )
}

export default FirstExercise;
