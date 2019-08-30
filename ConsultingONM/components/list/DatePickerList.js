import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const focusToDatePicker = e => {
  e.target.previousSibling.firstChild.firstChild.focus()
}


const DatePickerList = ({
  startDate,
  endDate,
  handleChangeStart,
  handleChangeEnd
}) => {
  
  return (
    <>
      <div className="cell">
        <div className="date-input">
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={handleChangeStart}
          />

          <img onClick={focusToDatePicker} src="../../static/images/datepicker/btn_datepicker.png" />
        </div>
      </div>
      <div className="cell">
        <div className="date-input">
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            onChange={handleChangeEnd}
            minDate={startDate}
          />
          <img onClick={focusToDatePicker} src="../../static/images/datepicker/btn_datepicker.png" />
        </div>
      </div>
    </>
  );
};

export default DatePickerList;
