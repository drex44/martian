import React, { Component } from 'react';
import WebSocket from 'ws';
import ConnectionButton from './ConnectionButton';
import PacketDataList from './PacketDataList';
import HeaderInputList from './HeaderInputList';

export default class RequestTab extends Component {
  ws = null;

  state = {
    url: 'wss://echo.websocket.org/',
    message: '',
    outgoingData: [],
    incomingData: [],
    status: WebSocket.CLOSED,
    activeTab: 1,
    headers: [{ name: '', value: '', active: true }],
  };

  componentDidMount() {}

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
      outgoingData: [],
      incomingData: [],
    });
  };

  onIncoming = (data) => {
    console.log('data::', data);
    this.setState((state) => ({
      incomingData: [...state.incomingData, this.prepareMessage(data)],
    }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleConnection = () => {
    if (this.state.status == WebSocket.OPEN) {
      this.ws.close();
    } else {
      this.setState({
        status: WebSocket.CONNECTING,
      });
      let options = {};
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
      if (this.state.message != '') {
        this.ws.send(this.state.message);
        this.setState((state) => ({
          outgoingData: [...state.outgoingData, this.prepareMessage(this.state.message)],
        }));
        this.setState({ message: '' });
      }
    } else {
      alert('Please connect to a websocket first!');
    }
  };

  prepareMessage = (data) => {
    return { timestamp: Date(), data };
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
          <div className="tabs is-boxed">
            <ul>
              <li className={this.state.activeTab == 1 ? 'is-active' : undefined}>
                <a
                  onClick={() => {
                    this.handleActiveTab(1);
                  }}>
                  Messages
                </a>
              </li>
              <li className={this.state.activeTab == 2 ? 'is-active' : undefined}>
                <a
                  onClick={() => {
                    this.handleActiveTab(2);
                  }}>
                  Headers/Options
                </a>
              </li>
            </ul>
          </div>
          {this.state.activeTab == 1 && (
            <div className="field">
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <textarea
                    className="textarea"
                    type="text"
                    name="message"
                    placeholder="message..."
                    onChange={this.handleChange}
                    value={this.state.message}
                  />
                </div>
              </div>
              <div className="control">
                <button className="button is-primary" onClick={this.handleMessageSend}>
                  Send
                </button>
              </div>
            </div>
          )}
          {this.state.activeTab == 2 && (
            <HeaderInputList
              headers={this.state.headers}
              handleChange={this.handleHeaderInputListChange}
              handleAddNew={this.handleAddNewHeaderInput}
            />
          )}

          <div className="columns is-gapless">
            <div className="column">
              <h2 className="label">Outgoing: </h2>
              <PacketDataList packetList={this.state.outgoingData} />
            </div>
            <div className="column">
              <h2 className="label">Incoming: </h2>
              <PacketDataList packetList={this.state.incomingData} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
