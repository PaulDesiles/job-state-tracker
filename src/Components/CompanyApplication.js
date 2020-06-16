import React from 'react';

class CompanyApplication extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <div className="application">
        <span>{this.props.name}</span>
        <span>{this.props.state}</span>
        <button onClick={this.handleClick}>delete</button>
      </div>
    );
  }
}

export default CompanyApplication;
