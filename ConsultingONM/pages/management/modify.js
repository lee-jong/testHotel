import React, { Component } from 'react';
import { modifyManagement, detailManagement } from '../../actions/management';
import { withRouter } from 'next/router';
import Router from 'next/router';
import {
  comparePasswordCheck,
  isValidPasswordCheck
} from '../../helpers/validation';
import Cookies from 'js-cookie';

class Modify extends Component {
  static async getInitialProps({ query }) {
    let detailInfo = {};
    let detailInfoUseType = '';
    let previousPage = {
      active: query.active,
      searchValue: query.searchValue,
      option: query.option
    };

    const { admin_id, id } = query;
    try {
      let data = {
        id,
        adminId: admin_id
      };
      detailInfo = await detailManagement(data);

      detailInfoUseType =
        detailInfo.result.representativeType === 'N' ? false : true;
    } catch (err) {}
    return {
      detailInfo,
      detailInfoUseType,
      query,
      previousPage
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      password1: '',
      password2: '',
      isValidPassword: '',
      isEqualPassword: '',
      pwValidationError: '',
      pwEqualityError: '',
      useType: this.props.detailInfoUseType,
      remark: '',
      remarksValidationError: ''
    };
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
    let href = `/management?b2b_seq=${hotelInfo.b2b_seq}&admin_id=${hotelInfo.admin_id}&active=${active}&searchValue=${searchValue}&option=${option}`;
    Router.push(href);
  };

  handleChangeInput = e => {
    let field = e.target.name;
    let { password1 } = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });

    switch (field) {
      case 'password1':
        let isValidPassword = isValidPasswordCheck(e.target.value);
        this.setState({
          isValidPassword,
          pwValidationError: isValidPassword
            ? ''
            : '8~16 자 영문, 숫자, 특수문자를 조합하여 사용해 주세요'
        });
        break;

      case 'password2':
        let isEqualPassword = comparePasswordCheck(password1, e.target.value);
        this.setState({
          isEqualPassword,
          pwEqualityError: isEqualPassword
            ? ''
            : '비밀번호가 일치하지 않습니다.'
        });
        break;

      case 'remarks':
        if (e.target.value.length > 500) {
          this.setState({
            remarksValidationError: '객실메시지는 최대 500자 등록 가능합니다.'
          });
        } else {
          this.setState({ remarksValidationError: '' });
        }
        break;
    }
  };

  handleChangeChecked = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  onChangeSuccess = async () => {
    const {
      password1,
      password2,
      useType,
      remark,
      isValidPassword,
      pwValidationError,
      isEqualPassword,
      pwEqualityError,
      remarksValidationError
    } = this.state;

    if (password1 && (!isValidPassword || pwValidationError)) return;
    if (password2 && (!isEqualPassword || pwEqualityError)) return;
    if (remarksValidationError) return;

    if (confirm('수정할 내역을 저장하시겠습니까?') == true) {
      try {
        const hotelInfo = Cookies.getJSON('hotelInfo');
        const { id } = this.props.router.query;
        let data = {
          cUserId: id,
          cPassword: password1,
          cUseType: useType,
          cRemarks: remark,
          adminId: hotelInfo.admin_id
        };
        let res = await modifyManagement(data);
        if (res.code === 200) {
          const { active, searchValue, option } = this.props.previousPage;
          alert('수정이 완료 되었습니다.');
          const href = `/management/detail?id=${id}&b2b_seq=${hotelInfo.b2b_seq}&admin_id=${hotelInfo.admin_id}&active=${active}&searchValue=${searchValue}&option=${option}`;
          Router.push(href);
        } else {
          alert('수정이 완료 되지 않았습니다.');
        }
      } catch (err) {
        alert('수정이 완료 되지 않았습니다.');
      }
    } else {
      return false;
    }
  };

  onChangeToList = () => {
    const hotelInfo = Cookies.getJSON('hotelInfo');
    const { id } = this.props.router.query;
    if (confirm('작성 중인 내용이 취소됩니다.')) {
      const href = `/management/detail?id=${id}&b2b_seq=${hotelInfo.b2b_seq}&admin_id=${hotelInfo.admin_id}`;
      Router.push(href);
    } else {
      return false;
    }
  };

  render() {
    const {
      useType,
      pwValidationError,
      pwEqualityError,
      remarksValidationError,
      remark
    } = this.state;
    const { groupName, remarks, userId } = this.props.detailInfo.result;

    return (
      <section>
        <div className="default-cell">
          <h3 className="con-title">상담사 정보 수정</h3>
          <div className="table-list-data">
            <fieldset>
              <legend>상담사 정보 수정 폼</legend>
              <table className="view">
                <caption>상담사 정보 수정 폼 테이블</caption>
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
                    <td>
                      <input
                        name="password1"
                        style={{ width: '300px' }}
                        onChange={this.handleChangeInput}
                        type="password"
                        placeholder="********"
                      />
                      {pwValidationError ? (
                        <p className="error">{pwValidationError}</p>
                      ) : (
                        <p className="info">
                          비밀번호를 변경하시려면 8자 이상 영문/숫자/특수문자
                          조합하여 설정하세요.
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">비밀번호 확인</th>
                    <td>
                      <input
                        type="password"
                        style={{ width: '300px' }}
                        name="password2"
                        onChange={this.handleChangeInput}
                        type="password"
                        placeholder="*******"
                      />
                      <p className="error">{pwEqualityError}</p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">대표ID 설정</th>
                    <td>
                      <p className="check-type01">
                        <input
                          type="checkbox"
                          id="checkbox"
                          name={'useType'}
                          checked={useType}
                          onChange={this.handleChangeChecked}
                        />
                        <label htmlFor="checkbox">
                          <span />
                          대표 ID로 설정
                        </label>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">비고 </th>
                    <td>
                      <div className="textarea-wrap">
                        <textarea
                          name="remark"
                          onChange={this.handleChangeInput}
                          placeholder={
                            remarks
                              ? remarks
                              : '객실메시지는 최대 500자 등록 가능합니다.'
                          }
                          defaultValue={remarks ? remarks : ''}
                        />
                        <span id="textarea-counter">{remark.length}/500</span>
                      </div>
                      <p className="error">{remarksValidationError}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
            <div className="btn-page-wrap big">
              <p className="btn-pos-right">
                <a onClick={this.onChangeToList} className="btn-01 type-02">
                  취소
                </a>
                <a onClick={this.onChangeSuccess} className="btn-01 type-01">
                  저장
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Modify);
