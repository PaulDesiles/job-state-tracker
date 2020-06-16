import React from 'react';
import {Application} from './Application';

interface LineProps extends Application {
  onClick: (id: number) => void
}

class ApplicationLine extends React.Component<LineProps, object> {
  constructor(props: LineProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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

export default ApplicationLine;
