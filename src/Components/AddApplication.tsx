import React from 'react';
import {ApplicationState, ApplicationData} from './Application';

export interface AddProps {
  onAddApplication: (data: ApplicationData) => void
}

class AddApplication extends React.Component<AddProps, ApplicationData> {
  constructor(props: AddProps) {
    super(props);
    this.state = {
      name: '',
      link: '',
      state: ApplicationState.Todo
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: event.target.value
    });
  }

  handleLinkChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      link: event.target.value
    });
  }

  handleSubmit(event: React.FormEvent<HTMLElement>) {
    this.props.onAddApplication(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form className="addForm" onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>

        <label>
          Job offer link:
          <input type="text" value={this.state.link} onChange={this.handleLinkChange} />
        </label>

        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default AddApplication;
