import React, { Fragment } from 'react';
import { hyphenDate } from '../../helpers/utils';

const renderManagementList = (items, goToDetailPage, total, active) => {
  let renderManagement = items.map((item, index) => (
    <tr key={index}>
      <td>{total - (active - 1) * 10 - index}</td>
      <td>{item.groupName}</td>
      <td
        style={{ cursor: 'pointer' }}
        onClick={() => goToDetailPage(item.userId)}
      >
        {item.userId}
      </td>
      <td>{hyphenDate(item.createTime)}</td>
      <td>{item.representativeType}</td>
    </tr>
  ));

  return renderManagement;
};

const notContentPage = () => {
  let notContent = (
    <tr>
      <td colSpan="5">조회된 정보가 없습니다.</td>{' '}
    </tr>
  );
  return notContent;
};

const ManagementList = ({ items, goToDetailPage, total, active }) => {
  return (
    <Fragment>
      {items.length === 0
        ? notContentPage()
        : renderManagementList(items, goToDetailPage, total, active)}
    </Fragment>
  );
};

export default ManagementList;
