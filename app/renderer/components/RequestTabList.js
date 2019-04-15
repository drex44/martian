import React, { Component } from 'react';
import RequestTab from './RequestTab';

export default class RequestTabList extends Component {
  state = { activeTab: 0, tabs: [], count: 0 };

  componentDidMount() {
    // this.handleAddNewTab();
  }

  handleAddNewTab = () => {
    const activeTab = this.props.requests.requests.length;
    this.props.onAddNewRequest();
    this.setState({ activeTab });
  };

  handleDeleteTab = (index) => {
    this.props.onDeleteRequest(index);
    let activeTab = this.state.activeTab;
    if (index <= activeTab) {
      activeTab = activeTab - 1 >= 0 ? activeTab - 1 : 0;
    }
    this.setState({ activeTab });
  };

  handleActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { requests } = this.props.requests;

    return (
      <div>
        <div className="tabs is-boxed" style={{ margin: '0.15em' }}>
          <ul>
            {requests.map((tab, index) => (
              <li
                key={index}
                className={[
                  'field has-addons ',
                  this.state.activeTab == index ? 'is-active' : undefined,
                ].join(' ')}
                style={{ margin: '0em 0.2em' }}>
                <div className="control">
                  <a
                    onClick={() => {
                      this.handleActiveTab(index);
                    }}>
                    <p>
                      {tab.url
                        ? tab.url
                            .replace('wss://', '')
                            .replace('ws://', '')
                            .substring(0, 15) + '..'
                        : tab.name}
                    </p>
                  </a>
                </div>
                <div className="control" style={{ marginLeft: '0.1em' }}>
                  <button
                    className="button is-small is-rounded is-danger is-inverted"
                    onClick={() => {
                      this.handleDeleteTab(index);
                    }}>
                    x
                  </button>
                </div>
              </li>
            ))}
            <li>
              <a
                onClick={() => {
                  this.handleAddNewTab();
                }}>
                +
              </a>
            </li>
          </ul>
        </div>
        <div style={{ margin: '1em' }}>
          {requests.map((tab) => (
            <RequestTab
              key={tab.id}
              request={tab}
              isActive={requests[this.state.activeTab].id == tab.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
