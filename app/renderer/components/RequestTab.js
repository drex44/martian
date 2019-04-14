import React, { Component } from 'react';
import WebSocket from 'ws';
import ConnectionButton from './ConnectionButton';
import PacketDataList from './PacketDataList';
import HeaderInputList from './HeaderInputList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import requestsActions from '../actions/requests';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import _ from 'lodash';

class RequestTab extends Component {
  ws = null;

  constructor(props) {
    super(props);
    const { request } = props;
    this.state = {
      url: 'wss://echo.websocket.org/',
      message: { messageType: 'text', content: '' },
      headers: [],
      outgoingData: [],
      incomingData: [],
      status: WebSocket.CLOSED,
      activeTab: 0,
      requestOptions: ['Messages', 'Headers/Options'],
      ...request,
    };
  }

  componentDidMount() {
    this.handleAddNewHeaderInput();
    window.addEventListener('unload', this.onApplicationClose);
  }

  onApplicationClose = () => {
    const headers = [];
    this.state.headers.map((header) => {
      if (header.name != '' && header.value != '') headers.push(header);
    });

    this.props.onSaveRequest({
      ...this.props.request,
      url: this.state.url,
      message: this.state.message,
      headers,
      outgoingData: this.state.outgoingData,
      incomingData: this.state.incomingData,
    });
  };

  onClose = () => {
    console.log('disconnected');
    this.setState({ status: WebSocket.CLOSED });
  };

  onError = (error) => {
    console.log('error', error);
    this.setState({ status: WebSocket.CLOSED });
  };

  onOpen = () => {
    console.log('connected');
    this.setState({
      status: WebSocket.OPEN,
    });
  };

  onIncoming = (data) => {
    console.log('data::', data);
    this.setState((state) => ({
      incomingData: [this.prepareMessage(data), ...state.incomingData],
    }));
  };

  handleMessageChange = (event) => {
    console.log(event);

    if (event.json) {
      this.setState((state) => ({
        message: {
          messageType: state.message.messageType,
          content: event.jsObject,
        },
      }));
    } else {
      const { value } = event.target;
      this.setState((state) => ({
        message: {
          messageType: state.message.messageType,
          content: value,
        },
      }));
    }
  };

  handleChange = (event) => {
    // console.log(event.target);
    const { name, value } = event.target;
    if (name == 'messageType') {
      this.setState({
        message: { messageType: value, content: value == 'json' ? {} : '' },
      });
      if (value == 'json') {
        this.addNewHeader({ name: 'Content-Type', value: 'application/json', active: true });
      } else {
        this.removeHeader({ name: 'Content-Type', value: 'application/json', active: true });
      }
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  addNewHeader = (header) => {
    const headers = [...this.state.headers];
    const index = _.findIndex(headers, { name: header.name });
    if (index >= 0) {
      headers[index] = header;
    } else {
      headers.push(header);
    }
    this.setState({ headers });
  };

  removeHeader = (header) => {
    const headers = [...this.state.headers];
    const index = _.findIndex(headers, { name: header.name });
    if (index >= 0) {
      headers.splice(index, 1);
    }
    this.setState({ headers });
  };

  handleConnection = () => {
    if (this.state.status == WebSocket.OPEN) {
      this.ws.close();
    } else {
      this.setState({
        status: WebSocket.CONNECTING,
      });
      const options = {};
      this.state.headers.map((header) => {
        if (header.active == true && header.name != '' && header.value != '')
          options[header.name] = header.value;
      });
      this.ws = new WebSocket(this.state.url, options);
      this.ws.on('open', this.onOpen);
      this.ws.on('close', this.onClose);
      this.ws.on('message', this.onIncoming);
      this.ws.on('error', this.onError);
    }
  };

  handleMessageSend = () => {
    if (this.state.status == WebSocket.OPEN) {
      if (this.state.message.content != '') {
        this.ws.send(JSON.stringify(this.state.message.content));
        this.setState((state) => ({
          outgoingData: [this.prepareMessage(this.state.message), ...state.outgoingData],
        }));
        // this.resetMessage();
      }
    } else {
      alert('Please connect to a websocket first!');
    }
  };

  resetMessage = () => {
    const message = this.state.message;
    message.content = message.messageType == 'text' ? '' : {};
    this.setState({ message });
  };

  prepareMessage = (message) => {
    return { timestamp: Date(), message };
  };

  handleClearHistory = () => {
    this.setState({ incomingData: [], outgoingData: [] });
  };

  handleActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  handleHeaderInputListChange = (headers) => {
    this.setState({ headers });
  };

  handleAddNewHeaderInput = () => {
    this.setState((state) => ({
      headers: [...state.headers, { name: '', value: '', active: true }],
    }));
  };

  render() {
    if (!this.props.isActive) return null;

    return (
      <>
        <div className="box">
          <label className="label">Request URL</label>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                name="url"
                placeholder="wss://echo.websocket.org/"
                onChange={this.handleChange}
                value={this.state.url}
              />
            </div>
            <div className="control">
              <ConnectionButton onClick={this.handleConnection} status={this.state.status} />
            </div>
          </div>
        </div>

        <div className="box">
          <div className="tabs">
            <ul>
              {this.state.requestOptions.map((option, index) => (
                <li key={index} className={this.state.activeTab == index ? 'is-active' : undefined}>
                  <a
                    onClick={() => {
                      this.handleActiveTab(index);
                    }}>
                    {option}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {this.state.activeTab == 0 && (
            <div className="field">
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <div className="select">
                    <select
                      name="messageType"
                      value={this.state.message.messageType}
                      onChange={this.handleChange}>
                      <option value="text">Text</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>
                  {this.state.message.messageType == 'json' ? (
                    <JSONInput
                      id="message"
                      placeholder={this.state.message.content}
                      // colors={{ background: 'white', string: 'black' }}
                      // style={{ outerBox: { border: '1px solid black' } }}
                      locale={locale}
                      height="15em"
                      width="100%"
                      name="message"
                      confirmGood={false}
                      waitAfterKeyPress={1000}
                      onChange={this.handleMessageChange}
                    />
                  ) : (
                    <textarea
                      className="textarea"
                      type="text"
                      name="message"
                      placeholder="message..."
                      onChange={this.handleMessageChange}
                      value={this.state.message.content}
                    />
                  )}
                </div>
              </div>
              <div className="control">
                <button className="button is-warning" onClick={this.handleMessageSend}>
                  Send
                </button>
              </div>
            </div>
          )}
          {this.state.activeTab == 1 && (
            <HeaderInputList
              headers={this.state.headers}
              handleChange={this.handleHeaderInputListChange}
              handleAddNew={this.handleAddNewHeaderInput}
            />
          )}

          {this.state.outgoingData.length > 0 && (
            <>
              <h2
                className="title is-4"
                style={{ paddingTop: '0.4rem', borderTop: '1px solid #e0e0e0' }}>
                History
              </h2>
              <button
                className="button is-dark is-outlined"
                style={{ marginBottom: '2em' }}
                onClick={this.handleClearHistory}>
                Clear History
              </button>
              <div className="columns is-gapless">
                <div className="column">
                  <h2 className="label">Sent: </h2>
                  <PacketDataList packetList={this.state.outgoingData} />
                </div>
                <div className="column">
                  <h2 className="label">Received: </h2>
                  <PacketDataList packetList={this.state.incomingData} incoming />
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  const requests = bindActionCreators(requestsActions, dispatch);
  return {
    onSaveRequest: (data) => {
      requests.saveRequest(data);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestTab);
