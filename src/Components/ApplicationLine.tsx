import React from 'react';
import {Application, ApplicationState, getStateIcon} from './Application';
import Select from 'react-select';

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

interface stateOption {
  value: ApplicationState,
  label: string,
  icon: string
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
    const states = Object.values(ApplicationState).filter(key => typeof key === 'number') as ApplicationState[];
    const stateOptions: Array<stateOption> = states.map(state => ({
      value: state,
      label: ApplicationState[state],
      icon: getStateIcon(state)
    }));

    const selectedOption = stateOptions.find(o => o.value === this.props.state);

    const optionformatter = (option: stateOption) => (
      <div className="optionContainer">
        <span className="icon">{option.icon}</span>
        <span>{option.label}</span>
      </div>
    );

    const labelId = 'linkLabel' + this.props.id;
    const hostName = extractHostname(this.props.link);

    return (
      <div className="application">
        <div className="title">
          <span>{this.props.name}</span>
        </div>
        
        <div className="state">
          <Select
            className="stateSelector"
            options={stateOptions}
            defaultValue={selectedOption}
            formatOptionLabel={optionformatter}
          />
        </div>

        <div className="link">
          {this.props.link &&
            <a href={this.props.link}>
              <span className="icon" role="img" aria-labelledby={labelId}>🔗</span>
              <span className="linkLabel" id={labelId}>{hostName}</span>
            </a>
          }
        </div>

        <div className="delete">
          <button className="deleteButton" onClick={this.handleClick}>
          </button>
        </div>
      </div>
    );
  }
}

export default ApplicationLine;
