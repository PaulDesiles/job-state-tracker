import React from 'react';
import {Application, ApplicationState, getStateIcon} from './Application';

interface LineProps extends Application {
  onClick: (id: number) => void
}

function extractHostname(url?: string) {
  if (!url)
    return '';

  var hostname;
  if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  return hostname;
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
    let stateIcon = getStateIcon(this.props.state);
    let stateName = ApplicationState[this.props.state];
    return (
      <div className="application">
        <span>{this.props.name}</span>
        <span className="icon" role="img" aria-label={stateName}>{stateIcon}</span>
        <span className="stateName">{stateName}</span>
        {this.props.link &&
          <a href={this.props.link}>
            <span className="icon" role="img" aria-label="link">🔗</span>
            <span>{extractHostname(this.props.link)}</span>
          </a>
        }
        <button className="deleteButton" onClick={this.handleClick}>
        </button>
      </div>
    );
  }
}

export default ApplicationLine;
