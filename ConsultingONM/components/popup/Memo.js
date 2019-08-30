import React from 'react';

const Memo = ({ memo, closeMemo, onMemo }) => {
  return (
    <article
      className="layer-pop-wrap"
      style={{ display: onMemo ? 'block' : 'none' }}
    >
      <form>
        <div className="layer-pop-parent">
          <div className="layer-pop-children">
            <div className="pop-data middle">
              <h2>통화 메모</h2>
              <div className="pop-con">
                <textarea
                  style={{ height: '283px' }}
                  placeholder={memo}
                  disabled
                />
              </div>
              <div className="pop-bottom">
                <div className="btn-page-wrap al-c">
                  <a onClick={closeMemo} className="btn-01 type-01">
                    닫기
                  </a>
                </div>
              </div>
              <a onClick={closeMemo} className="btn-pop-close" />
            </div>
          </div>
        </div>
      </form>
    </article>
  );
};

export default Memo;
