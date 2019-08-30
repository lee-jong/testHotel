import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { detailManagement, deleteManagement } from '../../actions/management';
import Router from 'next/router';
import Cookies from 'js-cookie';

class Detail extends Component {
  static async getInitialProps({ query }) {
    let detailInfo = {};
    let previousPage = {
      active: query.active,
      searchValue: query.searchValue,
      option: query.option
    };
    const { admin_id, id } = query;
    let data = {
      id,
      adminId: admin_id
    };
    try {
      detailInfo = await detailManagement(data);
    } catch (err) {}

    return {
      detailInfo,
      query,
      previousPage
    };
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let hotelInfo = Cookies.getJSON('hotelInfo');
    let { b2b_seq, admin_id } = hotelInfo;
    if (!b2b_seq || !admin_id) {
      alert('허용된 사용자가 아닙니다.');
      const href = `/`;
      Router.push(href);
    }
  }

  goToListPage = () => {
    const { active, searchValue, option } = this.props.previousPage;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    const as = `/management?admin_id=${hotelInfo.admin_id}&b2b_seq=${hotelInfo.b2b_seq}`;
    const href = `/management?admin_id=${hotelInfo.admin_id}&b2b_seq=${hotelInfo.b2b_seq}&active=${active}&searchValue=${searchValue}&option=${option}`;
    Router.push(href, as);
  };

  goToModifyPage = id => {
    const { active, searchValue, option } = this.props.previousPage;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    const href = `/management/modify?id=${id}&admin_id=${hotelInfo.admin_id}&active=${active}&searchValue=${searchValue}&option=${option}`;
    Router.push(href);
  };

  requestDeleteManagement = async id => {
    const hotelInfo = Cookies.getJSON('hotelInfo');

    if (confirm('계정을 삭제하시겠습니까?') == true) {
      try {
        let data = {
          id,
          adminId: hotelInfo.admin_id
        };
        const res = await deleteManagement(data);
        if (res.code === 200) {
          alert('계정이 삭제 되었습니다.');
          this.goToListPage();
        }

        if (res.code !== 200) {
          alert('계정이 삭제가 실패하였습니다.');
        }
      } catch (err) {
        alert('계정이 삭제가 실패하였습니다.');
      }
    } else {
      return false;
    }
  };

  render() {
    const { router } = this.props;
    const { id } = router.query;
    const {
      userId,
      representativeType,
      groupName,
      remarks
    } = this.props.detailInfo.result;
    return (
      <section>
        <div className="default-cell">
          <h3 className="con-title">상담사 정보 상세</h3>
          <div className="table-list-data">
            <fieldset>
              <legend>상담사 정보 상세</legend>
              <table className="view">
                <caption>상담사 정보 상세 테이블</caption>
                <colgroup>
                  <col style={{ width: '160px' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">그룹</th>
                    <td>{groupName}</td>
                  </tr>
                  <tr>
                    <th scope="row">ID</th>
                    <td>{userId}</td>
                  </tr>
                  <tr>
                    <th scope="row">비밀번호</th>
                    <td>********</td>
                  </tr>
                  <tr>
                    <th scope="row">대표ID 설정</th>
                    <td>{representativeType}</td>
                  </tr>
                  <tr>
                    <th scope="row">비고 </th>
                    <td>
                      <div className="textarea-wrap">
                        <textarea placeholder={remarks} disabled="disabled" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
            <div className="btn-page-wrap big">
              <p className="btn-pos-left">
                <a onClick={this.goToListPage} className="btn-01 type-02">
                  목록
                </a>
              </p>
              <p className="btn-pos-right">
                <a
                  onClick={() => this.requestDeleteManagement(id)}
                  className="btn-01 type-02"
                >
                  삭제
                </a>
                <a
                  onClick={() => this.goToModifyPage(id)}
                  className="btn-01 type-01"
                >
                  수정
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Detail);
