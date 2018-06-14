import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import copy from 'clipboard-copy';
import './Home.scss';
import Loader from '../Loader/Loader';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      alert: false,
      start: false
    };
    this.alertRef = React.createRef();
    this.hideAlert = () => {
      let i = 1;
      const alertFade = setInterval(() => {
        i -= 0.1;
        if (i < 0) {
          clearInterval(alertFade);
          this.setState({ alert: false });
        }
      }, 100);
    };
    this.startMultiselect = (e) => {
      if (e.target.parentNode.style.background) {
        e.target.parentNode.style.background = '';
      } else {
        e.target.parentNode.style.background = '#f1f1f1';
        this.setState({ start: true });
      }
    };
    this.selectMulti = (e) => {
      if (this.state.start) {
        e.target.parentNode.style.background = '#f1f1f1';
      }
    };
    this.selectRows = () => {
      let copyText = '';
      const rows = document.querySelectorAll('.exl__table tbody tr');
      for (let i = 0; i < rows.length; i += 1) {
        if (rows[i].style.background) {
          if (copyText !== '') {
            copyText += '\n';
          }
          for (let j = 0; j < rows[i].childNodes.length; j += 1) {
            copyText += `${rows[i].childNodes[j].innerText}, `;
          }
        }
      }
      copyText = copyText.replace(/,\s*$/, '');
      return copyText;
    };
    this.deselect = () => {
      copy(this.selectRows());
      this.setState({ alert: true, start: false });
    };
    this.toggleAllSelect = (flag) => {
      let copyText = '';
      const rows = document.querySelectorAll('.exl__table tbody tr');
      if (flag === 'clear') {
        for (let i = 0; i < rows.length; i += 1) {
          rows[i].style.background = '';
        }
      } else {
        for (let i = 0; i < rows.length; i += 1) {
          rows[i].style.background = '#f1f1f1';
        }
        copyText = this.selectRows();
      }
      copy(copyText);
    };
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.data) {
          this.setState({ users: response.data });
        }
      });
  }
  render() {
    return (
      <div className="spreadsheet">
        <button onClick={() => this.toggleAllSelect('clear')} className="de-select">De-select All</button>
        <button onClick={() => this.toggleAllSelect('select')} className="select-all">Copy all rows of page</button>
        {
          this.state.users.length > 0 &&
          <table className="exl__table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Website</th>
                <th>Company</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.map((val, index) => (
                  <tr
                    key={index}
                    onMouseDown={this.startMultiselect}
                    onMouseOver={this.selectMulti}
                    onMouseUp={this.deselect}
                  >
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.username}</td>
                    <td>{val.phone}</td>
                    <td>{val.email}</td>
                    <td>{val.website}</td>
                    <td>{val.company.name}</td>
                    <td>
                      {val.address.suite}, {val.address.street},
                      &nbsp;{val.address.city}. Pincode: {val.address.zipcode}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        }
        {
          !this.state.users.length > 0 &&
          <Loader />
        }
        {
          this.state.alert &&
          <div ref={this.alertRef} className="alert">
            <div className="alert__box">
              <div className="alert__msg">
                Text copied to clipboard as comma seperated data
              </div>
            </div>
            { this.hideAlert() }
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Home);
