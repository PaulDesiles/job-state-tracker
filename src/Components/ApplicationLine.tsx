import React from 'react';
import {Application, ApplicationState, getStateIcon} from './Application';
import Select, {ValueType} from 'react-select';

interface LineProps extends Application {
  onDelete: (id: number) => void,
  onStateChange: (id: number, state: ApplicationState) => void
}

interface LineState {
  applicationState: ApplicationState
}

interface stateOption {
  value: ApplicationState,
  label: string,
  icon: string
}

class ApplicationLine extends React.Component<LineProps, LineState> {
  constructor(props: LineProps) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.props.onDelete(this.props.id);
  }

  handleStateChange(option: ValueType<stateOption>) {
    if (option) {
      this.props.onStateChange(this.props.id, (option as stateOption).value);
    }
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
        <div className="applicationContent">
          <span>{this.props.name}</span>
          
          <Select
            className="stateSelector"
            options={stateOptions}
            defaultValue={selectedOption}
            formatOptionLabel={optionformatter}
            onChange={this.handleStateChange}
          />

          <div className="link">
            {this.props.link &&
              <a href={this.props.link}>
                <span className="icon" role="img" aria-labelledby={labelId}>🔗</span>
                <span className="linkLabel" id={labelId}>{hostName}</span>
              </a>
            }
          </div>
        </div>

        <button className="deleteButton" onClick={this.handleDelete}></button>
      </div>
    );
  }
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

export default ApplicationLine;
