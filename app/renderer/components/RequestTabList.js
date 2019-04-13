import React, { Component } from 'react';
import RequestTab from './RequestTab';

export default class RequestTabList extends Component {
  state = { activeTab: 0, tabs: [], count: 0 };

  componentDidMount() {
    this.handleAddNewTab();
  }

  handleAddNewTab = () => {
    this.setState((state) => ({
      tabs: [
        ...state.tabs,
        {
          name: 'New Tab',
          id: state.count,
        },
      ],
      count: state.count + 1,
      activeTab: state.tabs.length,
    }));
  };

  handleDeleteTab = (index) => {
    const tabs = this.state.tabs;
    let activeTab = this.state.activeTab;
    tabs.splice(index, 1);
    if (index <= activeTab) {
      activeTab = activeTab - 1 >= 0 ? activeTab - 1 : 0;
    }
    this.setState({ activeTab, tabs });
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
                <a>
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
                    }}>
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
        {this.state.tabs.map((tab) => (
          <RequestTab key={tab.id} isActive={this.state.tabs[this.state.activeTab].id == tab.id} />
        ))}
      </div>
    );
  }
}
