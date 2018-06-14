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
        if (i < 0) {
          clearInterval(alertFade);
          this.setState({ alert: false });
        } else if (this.alertRef.current) {
          i -= 0.09;
          this.alertRef.current.style.opacity = i;
        }
      }, 100);
    };
    this.selectRow = () => {
      // this.deselect();
      // // Clear multi selected
      // const totalRows = document.querySelectorAll('.exl__table tbody tr').length;
      // for (let j = 0; j < totalRows; j += 1) {
      //   document.querySelectorAll('.exl__table tbody tr')[j].style.background = '';
      // }
      // const row = e.target.parentNode;
      // const cols = row.childNodes;
      // let copyText = '';
      // if (cols.length > 0) {
      //   for (let i = 0; i < cols.length; i += 1) {
      //     copyText += `${cols[i].innerText}, `;
      //   }
      //   copyText = copyText.replace(/,\s*$/, '');
      //   copy(copyText);
      //   this.setState({ alert: true });
      // }
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
    this.deselect = () => {
      this.setState({ start: false });
      let copyText = '';
      const rows = document.querySelectorAll('.exl__table tbody tr');
      for (let i = 0; i < rows.length; i += 1) {
        if (copyText !== '') {
          copyText += '\n';
        }
        if (rows[i].style.background) {
          for (let j = 0; j < rows[i].childNodes.length; j += 1) {
            copyText += `${rows[i].childNodes[j].innerText}, `;
          }
        }
      }
      copyText = copyText.replace(/,\s*$/, '');
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
      <div className="home">
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
