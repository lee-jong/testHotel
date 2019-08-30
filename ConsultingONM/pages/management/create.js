import React, { Component } from 'react';
import { createManagement } from '../../actions/management';
import Router from 'next/router';
import {
  comparePasswordCheck,
  isUsableIdCheck,
  isValidIdCheck,
  isValidPasswordCheck
} from '../../helpers/validation';
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';

class Create extends Component {
  static async getInitialProps({ query }) {
    let previousPage = {
      active: query.active,
      searchValue: query.searchValue,
      option: query.option
    };

    return {
      previousPage
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      password1: '',
      password2: '',
      name: '',
      group: '',
      isRep: false,
      remarks: '',
      isUsableId: false, // 아이디 중복확인
      isValidPassword: '', // 패스워드 정규 표현식
      isEqualPassword: '', // 패스워드 동일 여부
      isValidId: '', // 아이디 정규 표현식
      idValidationError: '',
      pwValidationError: '',
      pwEqualityError: '',
      isValidGroup: '',
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

  handleChangeChecked = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleChangeInput = e => {
    let field = e.target.name;
    let { password1, isUsableId } = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });

    switch (field) {
      case 'userId':
        let isValidId = isValidIdCheck(e.target.value);
        this.setState({
          isValidId,
          isUsableId: false,
          idValidationError: isValidId
            ? ''
            : 'ID는 ‘호텔명(세 자리)_그룹번호(영문 두 자리 + 숫자 세 자리)’로 설정하세요. 예시) mrt_fr001'
        });

        if (isValidId && !isUsableId) {
          this.setState({
            idValidationError: '아이디 중복 확인을 해주세요.'
          });
        }

        break;

      case 'password1':
        let isValidPassword = isValidPasswordCheck(e.target.value);
        this.setState({
          isValidPassword,
          pwValidationError: isValidPassword
            ? ''
            : '8~16 자 영문, 숫자, 특수문자를 조합하여 사용해 주세요.'
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
            remarksValidationError:
              '비고 메시지는 최대 500자까지 등록 가능합니다.'
          });
        } else {
          this.setState({ remarksValidationError: '' });
        }
        break;

      case 'group':
        if (e.target.value) {
          if (e.target.value == 'CODE_101') {
            this.setState({ userId: 'fr' });
          }

          if (e.target.value == 'CODE_102') {
            this.setState({ userId: 'fv' });
          }

          if (e.target.value == 'CODE_103') {
            this.setState({ userId: 'rs' });
          }

          if (e.target.value == 'CODE_104') {
            this.setState({ userId: 'hk' });
          }
          this.setState({ isValidGroup: false });
        } else {
          if (!e.target.value) {
            this.setState({ userId: '' });
          }
        }
    }
  };

  handleChangeRepresent = e => {
    this.setState({
      isRep: !this.state.isRep
    });
  };

  createManagementForm = async () => {
    const {
      userId,
      password1,
      group,
      isRep,
      remarks,
      isValidId,
      isValidPassword,
      isEqualPassword,
      isUsableId,
      remarksValidationError
    } = this.state;

    if (!isUsableId)
      this.setState({
        idValidationError: '아이디 중복 확인을 해주세요.'
      });

    // 그룹을 설정 하지 않았을 시
    this.setState({ isValidGroup: !group ? true : false });

    //비밀번호 설정을 하지 않았을 시
    if (!isValidPassword) {
      this.setState({
        pwValidationError:
          '8~16 자 영문, 숫자, 특수문자를 조합하여 사용해 주세요.'
      });
    }

    //비밀번호를 입력했으나, 비밀번호 재입력을 하지 않았을 시
    if (isValidPassword && !isEqualPassword) {
      this.setState({
        pwEqualityError: '비밀번호가 일치하지 않습니다.'
      });
    }

    if (
      !isValidId ||
      !isValidPassword ||
      !isEqualPassword ||
      !isUsableId ||
      remarksValidationError
    ) {
      return;
    }
    if (confirm('계정을 생성하시겠습니까?') == true) {
      try {
        const hotelInfo = Cookies.getJSON('hotelInfo');
        let management = {
          userId,
          password1,
          group,
          isRep,
          remarks,
          b2bSeq: hotelInfo.b2b_seq,
          adminId: hotelInfo.admin_id
        };

        const { active, searchValue, option } = this.props.previousPage;
        let res = await createManagement(management);
        if (res.code === 200) {
          alert('계정이 생성되었습니다.');
          const as = `/management?b2b_seq=${hotelInfo.b2b_seq}&admin_id=${hotelInfo.admin_id}`;
          const href = `/management?admin_id=${hotelInfo.admin_id}&b2b_seq=${hotelInfo.b2b_seq}&active=${active}&searchValue=${searchValue}&option=${option}`;
          Router.push(href, as);
        }

        if (res.code !== 200) {
          alert('계정 생성이 실패하였습니다.');
        }
      } catch (err) {
        alert('계정 생성이 실패하였습니다.');
      }
    } else {
      return false;
    }
  };

  goToListPage = () => {
    const { active, searchValue, option } = this.props.previousPage;
    const hotelInfo = Cookies.getJSON('hotelInfo');
    if (confirm('작성 중인 내용이 취소됩니다.') == true) {
      const as = `/management?b2b_seq=${hotelInfo.b2b_seq}&admin_id=${hotelInfo.admin_id}`;
      const href = `/management?b2b_seq=${hotelInfo.b2b_seq}&admin_id=${hotelInfo.admin_id}&active=${active}&searchValue=${searchValue}&option=${option}`;
      Router.push(href, as);
    } else {
      return false;
    }
  };

  duplicationId = async e => {
    let { userId } = this.state;
    let isValidId = isValidIdCheck(userId);
    if (!isValidId)
      return this.setState({
        isValidId,
        idValidationError: isValidId
          ? ''
          : 'ID는 ‘호텔명(세 자리)_그룹번호(영문 두 자리 + 숫자 세 자리)’로 설정하세요. 예시) mrt_fr001'
      });

    let isUsableId = await isUsableIdCheck(userId);
    if (isUsableId) {
      alert('사용가능한 ID입니다.');
    } else {
      alert('사용중인 ID입니다.');
    }
    this.setState({
      isUsableId,
      idValidationError: isUsableId ? '' : '아이디 중복 확인을 해주세요.'
    });
  };

  toggleButton = isRep => {
    let onButton = <button onClick={this.handleChangeRepresent}> ON </button>;
    let offButton = <button onClick={this.handleChangeRepresent}> OFF </button>;
    let toggleBtn = isRep ? onButton : offButton;
    return toggleBtn;
  };

  render() {
    const {
      isRep,
      idValidationError,
      pwEqualityError,
      pwValidationError,
      isValidGroup,
      remarks,
      remarksValidationError
    } = this.state;
    return (
      <section>
        <div className="default-cell">
          <h3 className="con-title">상담사 관리</h3>
          <div className="table-list-data">
            <fieldset>
              <legend>상담사 관리 입력 폼</legend>
              <table className="view">
                <caption>상담사 관리 입력 폼 테이블</caption>
                <colgroup>
                  <col style={{ width: '160px' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      그룹 <em className="fc01">*</em>
                    </th>
                    <td>
                      <select
                        style={{ width: '300px' }}
                        value={this.state.group}
                        onChange={this.handleChangeInput}
                        className="browser-default"
                        name="group"
                      >
                        <option value="">상담사의 그룹을 선택하세요.</option>
                        <option value="CODE_101">프론트</option>
                        <option value="CODE_102">예약문의</option>
                        <option value="CODE_103">룸서비스</option>
                        <option value="CODE_104">하우스키핑</option>
                      </select>
                      {isValidGroup ? (
                        <p className="error">소속 그룹을 선택해주세요.</p>
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      ID <em className="fc01">*</em>
                    </th>
                    <td>
                      <input
                        type="text"
                        style={{ width: '300px' }}
                        name={'userId'}
                        placeholder=" mrt_fr001"
                        onChange={this.handleChangeInput}
                        onBlur={this.handleValidation}
                        value={this.state.userId}
                      />
                      <a
                        className="btn-01 type-02"
                        onClick={this.duplicationId}
                      >
                        중복확인
                      </a>
                      {idValidationError ? (
                        <p className="error">{idValidationError}</p>
                      ) : (
                        <p className="info">
                          ID는 ‘호텔명(세 자리)_그룹번호(영문 두 자리 + 숫자 세
                          자리)’로 설정하세요. 예시) mrt_fr001
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      비밀번호 <em className="fc01">*</em>
                    </th>
                    <td>
                      <input
                        type="password"
                        style={{ width: '300px' }}
                        name={'password1'}
                        onChange={this.handleChangeInput}
                      />
                      {pwValidationError ? (
                        <p className="error">{pwValidationError}</p>
                      ) : (
                        <p className="info">
                          8자 이상 영문/숫자/특수문자 조합하여 설정하세요.
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      비밀번호 확인 <em className="fc01">*</em>
                    </th>
                    <td>
                      <input
                        type="password"
                        style={{ width: '300px' }}
                        name={'password2'}
                        onChange={this.handleChangeInput}
                      />
                      <p className="error">{pwEqualityError}</p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">대표ID 설정</th>
                    <td>
                      <p className="check-type01">
                        <input
                          name={'isRep'}
                          onChange={this.handleChangeChecked}
                          type="checkbox"
                          id="checkbox"
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
                          className="email"
                          onChange={this.handleChangeInput}
                          name="remarks"
                        />
                        <span id="textarea-counter">{remarks.length}/500</span>
                      </div>
                      <p className="error">{remarksValidationError}</p>
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
                  onClick={this.createManagementForm}
                  className="btn-01 type-01"
                >
                  등록
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Create);
