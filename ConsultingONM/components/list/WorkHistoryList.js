import React, { Fragment } from 'react';
import { hyphenDate } from '../../helpers/utils';

const renderWorkHistoryList = (items, active, total) => {
  let renderWorkHistory = items.map((item, index) => (
    <tr key={item.idx}>
      <td>{total - (active - 1) * 10 - index}</td>
      <td>{item.userId}</td>
      <td>{item.userType === 'b2b' ? '관리자' : '상담사'}</td>
      <td className="al-l">{item.event}</td>
      <td>{hyphenDate(item.createDate)}</td>
    </tr>
  ));

  return renderWorkHistory;
};

const notContentPage = () => {
  let notContent = (
    <tr>
      <td colSpan="5">조회된 정보가 없습니다.</td>
    </tr>
  );

  return notContent;
};
const WorkHistoryList = ({ items, active, total }) => {
  return (
    <Fragment>
      {items.length === 0
        ? notContentPage()
        : renderWorkHistoryList(items, active, total)}
    </Fragment>
  );
};

export default WorkHistoryList;
