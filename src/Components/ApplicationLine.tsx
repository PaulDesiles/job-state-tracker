import React from 'react';
import Select, {ValueType} from 'react-select';
import {ApplicationState, getStateIcon, LineProps, LineState} from './interfaces';

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

    const optionformatter = (option: stateOption) =>  {
      const optionId = "option" + option.value;
      return (<div className="optionContainer">
        <span className="icon" role="img" aria-labelledby={optionId}>{option.icon}</span>
        <span id={optionId}>{option.label}</span>
      </div>);
    }

    const labelId = 'linkLabel' + this.props.id;
    const displayedUrl = simplifyUrl(this.props.link);

    return (
      <div className={`application app${ApplicationState[this.props.state]}`}>
        <div className="applicationContent">
          <span>{this.props.name}</span>
          
          <Select
            className="stateSelector"
            options={stateOptions}
            defaultValue={selectedOption}
            formatOptionLabel={optionformatter}
            onChange={this.handleStateChange}
            isSearchable={false}
            menuPlacement="auto"
          />

          <div className="link">
            {this.props.link &&
              <a href={this.props.link}>
                <span className="icon" role="img" aria-labelledby={labelId}>🔗</span>
                <span className="linkLabel" id={labelId}>{displayedUrl}</span>
              </a>
            }
          </div>
        </div>

        <button className="deleteButton" onClick={this.handleDelete}></button>
      </div>
    );
  }
}

function simplifyUrl(url?: string) {
  if (!url)
    return '';

  return url.replace('https://', '').replace('http://', '');
}

export default ApplicationLine;
