import React, { Fragment } from 'react';
import { hyphenDate } from '../../helpers/utils';

const renderCallHistoryList = (items, displayMemo, active, total) => {
  let renderCallHistory = items.map((item, index) => (
    <tr
      className={
        item.missedType
          ? 'missedcall'
          : item.guestRoomId === item.receiver
          ? 'sendcall'
          : 'receivecall'
      }
      key={item.idx}
    >
      <td>{total - (active - 1) * 10 - index}</td>
      <td>
        <span className="calltime">
          {item.missedType
            ? '부재중'
            : item.guestRoomId === item.receiver
            ? '착신'
            : '발신'}
        </span>
        {hyphenDate(item.receptionTime)}
      </td>
      <td>{item.guestRoomName}</td>
      <td>{item.requestGroup}</td>
      <td>{item.processGroup}</td>
      <td>
        {item.guestRoomId === item.receiver ? item.sender : item.receiver}
      </td>
      <td>{!item.callTime ? '-' : item.callTime}</td>
      <td>
        {item.memo ? (
          <a onClick={() => displayMemo(item.idx)} className="btn-01 type-03">
            메모 확인
          </a>
        ) : (
          ''
        )}
      </td>
    </tr>
  ));
  return renderCallHistory;
};

const notContentPage = () => {
  let notContent = (
    <tr>
      <td colSpan="8">조회된 정보가 없습니다.</td>
    </tr>
  );
  return notContent;
};

const CallHistoryList = ({ items, displayMemo, active, total }) => {
  return (
    <Fragment>
      <tbody>
        {items.length === 0
          ? notContentPage()
          : renderCallHistoryList(items, displayMemo, active, total)}
      </tbody>
    </Fragment>
  );
};

export default CallHistoryList;
