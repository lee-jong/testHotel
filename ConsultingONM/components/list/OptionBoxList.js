import React from 'react';
import { HourTimeSelect, MinuteTimeSelect } from '../../helpers/utils';

const OptionBoxList = ({
  key,
  title,
  startTimeHour,
  endTimeHour,
  startTimeMin,
  endTimeMin,
  onChangeOption,
  startTimeHourName,
  endTimeHourName,
  startTimeMinName,
  endTimeMinName,
  useTypeName,
  handleChangeChecked,
  useType
}) => {
  return (
    <>
      <td> {title}</td>
      <td>
        <p className="check-type01">
          <input
            type="checkbox"
            name={useTypeName}
            id={title}
            onChange={handleChangeChecked}
            checked={useType}
          />
          <label htmlFor={title}>
            <span />
            대표 ID 운용
          </label>
        </p>
      </td>
      <td>
        {/* start hh time */}
        {useType ? (
          <select
            name={startTimeHourName}
            onChange={onChangeOption}
            value={startTimeHour}
          >
            {HourTimeSelect()}
          </select>
        ) : (
          <select
            name={startTimeHourName}
            onChange={onChangeOption}
            value={startTimeHour}
          >
            <option>--</option>
          </select>
        )}
        {/* start mm time */}
        {useType ? (
          <select
            name={startTimeMinName}
            onChange={onChangeOption}
            value={startTimeMin}
          >
            {MinuteTimeSelect()}
          </select>
        ) : (
          <select name={startTimeMinName} onChange={onChangeOption} value="--">
            <option>--</option>
          </select>
        )}
        ~{/* end hh time */}
        {useType ? (
          <select
            name={endTimeHourName}
            onChange={onChangeOption}
            value={endTimeHour}
          >
            {HourTimeSelect()}
          </select>
        ) : (
          <select
            name={endTimeHourName}
            onChange={onChangeOption}
            value={endTimeHour}
          >
            <option>--</option>
          </select>
        )}
        {/* end mm time */}
        {useType ? (
          <select
            name={endTimeMinName}
            onChange={onChangeOption}
            value={endTimeMin}
          >
            {MinuteTimeSelect()}
          </select>
        ) : (
          <select
            name={endTimeMinName}
            onChange={onChangeOption}
            value={endTimeMin}
          >
            <option>--</option>
          </select>
        )}
      </td>
    </>
  );
};

export default OptionBoxList;
