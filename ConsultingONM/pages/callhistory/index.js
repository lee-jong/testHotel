import React, { Component } from 'react';

import Pagination from '../../helpers/Pagination';
import CallHistoryList from '../../components/list/CallHistoryList';
import DatePickerList from '../../components/list/DatePickerList';
import {
  getHistory,
  getCallHistoryByGroup,
  getCallHistoryByPage,
  getCallHistoryBySearch,
  unfoldMemo,
  getCallHistoryListExcel
} from '../../actions/callHistory';
import { weekAgoDate, getDate, getDateByExcel } from '../../helpers/utils';
import Memo from '../../components/popup/Memo';
import SearchHistoryList from '../../components/list/SearchHistoryList';
import { setCharacterDecomposition } from '../../helpers/SearchHistory';
import Cookies from 'js-cookie';

class CallHistory extends Component {
  static async getInitialProps({ query }) {
    const { b2b_seq } = query;
    let startDate = new Date();
    let endDate = new Date();
    let data = {
      b2bSeq: b2b_seq,
      startDate: weekAgoDate(startDate),
      endDate
    };
    let historyRes = {};
    try {
      historyRes = await getHistory(data);
    } catch (err) {}
    return {
      historyRes,
      query
    };
  }

  constructor(props) {
    super(props);

    this.Date = new Date();
    this.state = {
      onMemo: false, // 메모창을 띄울지 bool
      active: 1, //선택 page
      items: this.props.historyRes.result || [], //list item 의 arr
      total: this.props.historyRes.total || 1, //list item 총 수량
      dataPerPage: 10, // 페이지당 보여줄 수
      memo: '', // memo text 저장 state
      option: 'all',
      searchValue: '',
      searchType: 'room',
      startDate: weekAgoDate(this.Date),
      endDate: new Date(),
      onSearchHistory: false
    };

    Cookies.set('hotelInfo', this.props.query);
  }

  downloadCallHistoryListExcel = async () => {
    const hotelInfo = Cookies.getJSON('hotelInfo');
    const { startDate, endDate, searchType, option, searchValue } = this.state;
    try {
      let data = {
        b2bSeq: hotelInfo.b2b_seq,
        startDate,
        endDate,
        searchType,
        group: option,
        searchValue
      };

      let res = await getCallHistoryListExcel(data);

      let blob = new Blob(['\ufeff' + res], {
        type: 'text/csv;charSet=utf-8'
      });
      let blobURL = window.URL.createObjectURL(blob);
      let tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute(
        'download',
        `Call_History_${getDateByExcel(new Date())}.csv`
      );
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    } catch (err) {
      this.setState({
        items: [],
        total: 1
      });
    }
  };

  handleChangeStart = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDate: date
    });
  };

  closeMemo = () => {
    this.setState({ onMemo: !this.state.onMemo });
  };

  displayMemo = async idx => {
    try {
      let res = await unfoldMemo(idx);
      this.setState({ onMemo: !this.state.onMemo, memo: res.memo });
    } catch (err) {
      if (err.code === 403) {
        this.setState({ onMemo: !this.state.onMemo, memo: '' });
      }
    }
  };

  handleChangePage = async pageNo => {
    const { option, searchValue, startDate, endDate, searchType } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    let data = {
      option,
      searchValue,
      searchType,
      active: pageNo,
      b2bSeq: hotelInfo.b2b_seq,
      startDate,
      endDate
    };
    try {
      const res = await getCallHistoryByPage(data);
      this.setState({
        items: res.result,
        total: res.total,
        active: pageNo
      });
    } catch (err) {
      this.setState({
        items: [],
        total: 1,
        active: 1
      });
    }
  };

  historyBySearchType = async e => {
    this.setState({
      searchType: e.target.value
    });
  };

  historyByGroup = async e => {
    let groupValue = e.target.value;
    try {
      const { searchValue, startDate, endDate, searchType } = this.state;
      const hotelInfo = Cookies.getJSON('hotelInfo');

      let groupData = {
        searchValue,
        active: 1,
        option: groupValue,
        searchType,
        b2bSeq: hotelInfo.b2b_seq,
        startDate: startDate,
        endDate: endDate
      };

      const res = await getCallHistoryByGroup(groupData);
      this.setState({
        items: res.result,
        total: res.total,
        option: groupValue,
        active: 1
      });
    } catch (err) {
      this.setState({
        items: [],
        total: 1,
        option: groupValue,
        active: 1
      });
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length >= 1)
      return this.setState({ onSearchHistory: true });
    if (e.target.value.length <= 0)
      return this.setState({ onSearchHistory: false });
  };

  historyBySearch = async e => {
    const { option, searchType, startDate, endDate, searchValue } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');

    setCharacterDecomposition(searchValue);

    let data = {
      active: 1,
      option,
      searchValue,
      searchType,
      b2bSeq: hotelInfo.b2b_seq,
      startDate,
      endDate
    };
    try {
      const res = await getCallHistoryBySearch(data);
      this.setState({
        items: res.result,
        total: res.total,
        searchValue,
        active: 1
      });
    } catch (err) {
      this.setState({
        items: [],
        total: 1,
        active: 1,
        searchValue
      });
    }
  };

  handleBlur = () => {
    this.setState({ onSearchHistory: false });
  };

  handleClickValue = e => {
    this.setState({ searchValue: e.target.getAttribute('searchText') });
  };

  render() {
    const {
      onMemo,
      active,
      total,
      items,
      memo,
      dataPerPage,
      startDate,
      endDate,
      searchValue,
      onSearchHistory,
      searchType
    } = this.state;
    return (
      <section>
        <div className="default-cell">
          <h3 className="con-title">통화 내역</h3>
          <div className="table-list-data">
            <fieldset>
              <legend>검색 입력 폼</legend>
              <table className="view">
                <caption>검색 입력 폼 테이블</caption>
                <colgroup>
                  <col style={{ width: 'auto' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <div className="row-mulity-input">
                        <div className="table-sort mb0">
                          <div className="sort-left">
                            <div className="date-input-wrap pr0">
                              <DatePickerList
                                startDate={startDate}
                                endDate={endDate}
                                handleChangeStart={this.handleChangeStart}
                                handleChangeEnd={this.handleChangeEnd}
                              />
                            </div>
                            <a
                              onMouseDown={this.historyBySearch}
                              className="btn-01 type-02"
                            >
                              검색
                            </a>
                          </div>
                          <div className="sort-right">
                            <select
                              name="searchType"
                              value={searchType}
                              onChange={this.historyBySearchType}
                            >
                              <option value="room"> 객실 </option>
                              <option value="user">상담사 </option>
                            </select>
                            <div className="input-dropdown-wrap">
                              <input
                                type="text"
                                placeholder={
                                  searchType === 'room'
                                    ? '객실 번호 (ex.101)'
                                    : '상담자명(ex.mar_fr123)'
                                }
                                style={{ width: '250px' }}
                                value={searchValue}
                                name="searchValue"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                              />
                              <SearchHistoryList
                                searchValue={searchValue}
                                onClickChange={this.handleClickValue}
                                onSearchHistory={onSearchHistory}
                              />
                            </div>
                            <a
                              onMouseDown={this.historyBySearch}
                              className="btn-01 type-02"
                            >
                              검색
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </div>
          <div className="table-list-data">
            <h4 className="sub-title">처리 부서</h4>
            <div className="table-sort">
              <div className="row-input-wrap">
                <div>
                  <select
                    value={this.state.option}
                    onChange={this.historyByGroup}
                  >
                    <option value="all"> 그룹 전체</option>
                    <option value="CODE_101">프론트</option>
                    <option value="CODE_102">예약문의</option>
                    <option value="CODE_103">룸서비스</option>
                    <option value="CODE_104">하우스키핑</option>
                  </select>
                </div>
                <p className="sort-right">
                  <a
                    onClick={this.downloadCallHistoryListExcel}
                    className="btn-01 type-04"
                  >
                    엑셀다운로드
                  </a>
                </p>
              </div>
            </div>
            <div>
              <table className="list">
                <caption>상담사 관리</caption>
                <colgroup>
                  <col style={{ width: '80px' }} />
                  <col style={{ width: '220px' }} />
                  <col style={{ width: '80px' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">착/발신 시간</th>
                    <th scope="col">객실</th>
                    <th scope="col">요청부서</th>
                    <th scope="col">처리부서</th>
                    <th scope="col">상담사 ID</th>
                    <th scope="col">총 통화시간</th>
                    <th scope="col">메모</th>
                  </tr>
                </thead>
                <CallHistoryList
                  items={items}
                  active={active}
                  total={total}
                  displayMemo={this.displayMemo}
                />
              </table>
              <div className="paging-wrap">
                <Pagination
                  total={total}
                  dataPerPage={dataPerPage}
                  activeProps={active}
                  handleChangePage={this.handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
        <Memo memo={memo} closeMemo={this.closeMemo} onMemo={onMemo} />
        {onMemo ? <Memo memo={memo} closeMemo={this.closeMemo} /> : ''}
      </section>
    );
  }
}

export default CallHistory;
