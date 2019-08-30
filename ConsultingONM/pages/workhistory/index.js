import React, { Component } from 'react';
import Pagination from '../../helpers/Pagination';
import WorkHistory from '../../components/list/WorkHistoryList';
import DatePickerList from '../../components/list/DatePickerList';
import SearchHistoryList from '../../components/list/SearchHistoryList';
import {
  getWorkHistory,
  getHistoryByGroup,
  searchHistory,
  getWorkHistoryByDate,
  getTransactionListExcel
} from '../../actions/workHistory';
import { weekAgoDate, getDate, getDateByExcel } from '../../helpers/utils';
import { setCharacterDecomposition } from '../../helpers/SearchHistory';
import Cookies from 'js-cookie';

class workHistory extends Component {
  static async getInitialProps({ query }) {
    let startDate = new Date();
    let endDate = new Date();
    let { b2b_seq } = query;
    let pageData = {
      active: 1,
      option: 'all',
      keyword: '',
      startDate: weekAgoDate(startDate),
      endDate,
      b2bSeq: b2b_seq,
      onSearchHistory: false
    };

    let workHistory = {};

    try {
      workHistory = await getWorkHistory(pageData);
    } catch (err) {}

    return {
      workHistory,
      query
    };
  }
  constructor(props) {
    super(props);

    this.Date = new Date();
    this.state = {
      active: 1,
      items: this.props.workHistory.result || [],
      total: this.props.workHistory.total || 1,
      dataPerPage: 10,
      option: 'all',
      searchValue: '',
      startDate: weekAgoDate(this.Date),
      endDate: new Date()
    };

    Cookies.set('hotelInfo', this.props.query);
  }

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

  handleChangeByDate = async () => {
    const { searchValue, option, startDate, endDate } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    let dateData = {
      searchValue,
      option,
      startDate,
      endDate,
      b2bSeq: hotelInfo.b2b_seq
    };
    try {
      const res = await getWorkHistoryByDate(dateData);
      this.setState({
        items: res.result,
        total: res.total,
        active: 1
      });
    } catch (err) {
      this.setState({
        items: [],
        total: 1,
        active: 1
      });
    }
  };

  handleChangePage = async pageNo => {
    const { searchValue, option, startDate, endDate } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');

    let pageData = {
      searchValue,
      option,
      active: pageNo,
      startDate,
      endDate,
      b2bSeq: hotelInfo.b2b_seq
    };
    try {
      const res = await getWorkHistory(pageData);
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

  handleHistoryByGroup = async e => {
    const { searchValue, startDate, endDate } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    let optionValue = e.target.value;
    try {
      let searchData = {
        searchValue,
        option: optionValue,
        active: 1,
        startDate,
        endDate,
        b2bSeq: hotelInfo.b2b_seq
      };
      let res = await getHistoryByGroup(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        option: optionValue,
        active: searchData.active
      });
    } catch (err) {
      this.setState({
        items: [],
        total: 1,
        option: optionValue,
        active: 1
      });
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length) return this.setState({ onSearchHistory: true });
    if (!e.target.value.length)
      return this.setState({ onSearchHistory: false });
  };

  handleHistoryBySearch = async e => {
    const { option, startDate, endDate, searchValue } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');

    setCharacterDecomposition(searchValue);

    let searchData = {
      searchValue,
      active: 1,
      option,
      startDate,
      endDate,
      b2bSeq: hotelInfo.b2b_seq
    };

    try {
      let res = await searchHistory(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        searchValue: searchValue,
        active: searchData.active
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

  downloadTransactionListExcel = async () => {
    const hotelInfo = Cookies.getJSON('hotelInfo');
    const { startDate, endDate, option, searchValue } = this.state;
    let data = {
      b2bSeq: hotelInfo.b2b_seq,
      startDate,
      endDate,
      option,
      searchValue
    };
    try {
      let res = await getTransactionListExcel(data);

      let blob = new Blob(['\ufeff' + res], {
        type: 'text/csv;charSet=utf-8'
      });
      let blobURL = window.URL.createObjectURL(blob);
      let tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute(
        'download',
        `Work_History_${getDateByExcel(new Date())}.csv`
      );
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    } catch (err) {}
  };

  handleBlur = () => {
    this.setState({ onSearchHistory: false });
  };

  handleClickValue = e => {
    this.setState({ searchValue: e.target.getAttribute('searchText') });
  };

  render() {
    const {
      total,
      dataPerPage,
      items,
      active,
      option,
      startDate,
      endDate,
      searchValue,
      onSearchHistory
    } = this.state;
    return (
      <section>
        <div className="default-cell">
          <h3 className="con-title">작업 이력</h3>
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
                              className="btn-01 type-02"
                              onMouseDown={this.handleChangeByDate}
                            >
                              검색
                            </a>
                          </div>
                          <div className="sort-right">
                            <input
                              type="text"
                              placeholder="상담사 ID"
                              style={{ width: '250px' }}
                              name="searchValue"
                              value={searchValue}
                              onChange={this.handleChange}
                              onBlur={this.handleBlur}
                              autoComplete="off"
                            />
                            <a
                              onMouseDown={this.handleHistoryBySearch}
                              className="btn-01 type-02"
                            >
                              검색
                            </a>
                            <SearchHistoryList
                              searchValue={searchValue}
                              onClickChange={this.handleClickValue}
                              onSearchHistory={onSearchHistory}
                            />
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
            <div className="table-sort">
              <div className="row-input-wrap">
                <div>
                  <select value={option} onChange={this.handleHistoryByGroup}>
                    <option value="all"> 그룹 전체</option>
                    <option value="b2b"> 관리자 </option>
                    <option value="consultant"> 상담사 </option>
                  </select>
                </div>
                <p className="sort-right">
                  <a
                    onClick={this.downloadTransactionListExcel}
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
                  <col style={{ width: '200px' }} />
                  <col style={{ width: '150px' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: '200px' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">계정</th>
                    <th scope="col">계정타입</th>
                    <th scope="col">이벤트</th>
                    <th scope="col">발생시간</th>
                  </tr>
                </thead>
                <tbody>
                  <WorkHistory items={items} active={active} total={total} />
                </tbody>
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
      </section>
    );
  }
}

export default workHistory;
