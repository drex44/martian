import React, { Component } from 'react';
import RequestTab from './RequestTab';

export default class RequestTabList extends Component {
  state = { activeTab: 0, tabs: [{ name: 'New Tab' }] };

  handleAddNewTab = () => {
    this.setState((state) => ({
      tabs: [...state.tabs, { name: 'New Tab' }],
      activeTab: state.tabs.length,
    }));
  };

  handleActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    return (
      <div>
        <div className="tabs is-boxed">
          <ul>
            {this.state.tabs.map((tab, index) => (
              <li key={index} className={this.state.activeTab == index ? 'is-active' : undefined}>
                <a
                  onClick={() => {
                    this.handleActiveTab(index);
                  }}>
                  {tab.name}
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
        {this.state.tabs.map((_, index) => (
          <RequestTab key={index} isActive={this.state.activeTab == index} />
        ))}
      </div>
    );
  }
}
