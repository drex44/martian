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
        <div className="tabs is-boxed">
          <ul>
            {requests.map((tab, index) => (
              <li key={index} className={this.state.activeTab == index ? 'is-active' : undefined}>
                <a style={{ paddingRight: '0px' }}>
                  <p
                    onClick={() => {
                      this.handleActiveTab(index);
                    }}>
                    {tab.name}
                  </p>
                  <button
                    className="button is-small is-danger is-rounded is-inverted"
                    onClick={() => {
                      this.handleDeleteTab(index);
                    }}
                    style={{ margin: '0px 5px' }}>
                    x
                  </button>
                </a>
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
        {requests.map((tab) => (
          <RequestTab
            key={tab.id}
            request={tab}
            isActive={requests[this.state.activeTab].id == tab.id}
          />
        ))}
      </div>
    );
  }
}
