import React, { Component } from 'react';
import Router from 'next/router';
import Pagination from '../../helpers/Pagination';
import ManagementList from '../../components/list/ManagementList';
import {
  getManagementsByPage,
  getManagementsByGroup,
  searchManagements
} from '../../actions/management';
import { withRouter } from 'next/router';
import { setCharacterDecomposition } from '../../helpers/SearchHistory';
import SearchHistoryList from '../../components/list/SearchHistoryList';
import Cookies from 'js-cookie';

class Management extends Component {
  static async getInitialProps({ query }) {
    const { b2b_seq, active, option, searchValue } = query;

    let pageData = {
      active: active ? active : 1,
      option: option ? option : 'all',
      keyword: searchValue ? searchValue : '',
      b2bSeq: b2b_seq
    };

    let management = {};

    try {
      management = await getManagementsByPage(pageData);
    } catch (err) {
      console.log('check error', err);
    }

    return {
      management,
      query,
      pageData
    };
  }

  constructor(props) {
    super(props);

    // Cookies.remove('searchHistory');

    this.state = {
      active: this.props.pageData.active ? this.props.pageData.active : 1,
      items: this.props.management.result || [],
      total: this.props.management.result ? this.props.management.total : 0,
      dataPerPage: 10,
      option: this.props.pageData.option ? this.props.pageData.option : 'all',
      searchValue: this.props.pageData.searchValue
        ? this.props.pageData.searchValue
        : '',
      onSearchHistory: false
    };
    Cookies.set('hotelInfo', this.props.query);
  }

  goToCreatePage = () => {
    const { active, searchValue, option } = this.state;
    const href = `/management/create?active=${active}&searchValue=${searchValue}&option=${option}`;
    Router.push(href);
  };

  goToDetailPage = id => {
    const { active, searchValue, option } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    const href = `/management/detail?id=${id}&admin_id=${hotelInfo.admin_id}&active=${active}&searchValue=${searchValue}&option=${option}`;
    Router.push(href);
  };

  handleClickValue = e => {
    this.setState({ searchValue: e.target.getAttribute('searchText') });
  };

  handleChangePage = async pageNo => {
    const { searchValue, option } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    let pageData = {
      searchValue,
      option,
      active: pageNo,
      b2bSeq: hotelInfo.b2b_seq
    };
    try {
      const res = await getManagementsByPage(pageData);
      this.setState({
        items: res.result,
        total: res.total,
        active: pageNo,
        option
      });
    } catch (err) {
      this.setState({
        items: [],
        total: 1,
        active: 1
      });
    }
  };

  handleManagementByGroup = async e => {
    const { searchValue } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    let optionValue = e.target.value;
    try {
      let searchData = {
        searchValue,
        option: optionValue,
        active: 1,
        b2bSeq: hotelInfo.b2b_seq
      };

      let res = await getManagementsByGroup(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        option: optionValue,
        active: 1
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

    if (e.target.value.length >= 1)
      return this.setState({ onSearchHistory: true });
    if (e.target.value.length <= 0)
      return this.setState({ onSearchHistory: false });
  };

  handleBlur = () => {
    this.setState({ onSearchHistory: false });
  };

  handleManagementBySearch = async e => {
    const { option, searchValue } = this.state;
    const hotelInfo = Cookies.getJSON('hotelInfo');

    setCharacterDecomposition(searchValue);

    let searchData = {
      searchValue,
      active: 1,
      option,
      b2bSeq: hotelInfo.b2b_seq
    };

    try {
      let res = await searchManagements(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        searchValue: searchValue,
        option: option,
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

  render() {
    const {
      items,
      total,
      dataPerPage,
      searchValue,
      active,
      onSearchHistory
    } = this.state;
    return (
      <section>
        <div className="default-cell">
          <h3 className="con-title">상담사 관리</h3>
          <div className="table-list-data">
            <div className="table-sort">
              <div className="row-input-wrap">
                <div>
                  <select
                    className="browser-default"
                    value={this.state.option}
                    onChange={this.handleManagementByGroup}
                  >
                    <option value="all"> 그룹 전체</option>
                    <option value="CODE_101">프론트</option>
                    <option value="CODE_102">예약문의</option>
                    <option value="CODE_103">룸서비스</option>
                    <option value="CODE_104">하우스키핑</option>
                  </select>
                </div>
                <div className="sort-right">
                  <input
                    type="text"
                    placeholder="아이디로 검색"
                    style={{ width: '250px' }}
                    name="searchValue"
                    value={searchValue}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    autoComplete="off"
                  />
                  <a
                    onMouseDown={this.handleManagementBySearch}
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
            <div>
              <table className="list">
                <caption>상담사 관리</caption>
                <colgroup>
                  <col style={{ width: '80px' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">그룹</th>
                    <th scope="col">ID</th>
                    <th scope="col">계정 생성일</th>
                    <th scope="col">대표 ID 설정</th>
                  </tr>
                </thead>
                <tbody>
                  <ManagementList
                    goToDetailPage={this.goToDetailPage}
                    items={items}
                    total={total}
                    active={active}
                  />
                </tbody>
              </table>
              <div className="paging-wrap">
                <Pagination
                  activeProps={this.state.active}
                  total={total}
                  dataPerPage={dataPerPage}
                  handleChangePage={this.handleChangePage}
                />
                <p className="btn-pos-right">
                  <a onClick={this.goToCreatePage} className="btn-01 type-01">
                    계정 생성
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Management);
