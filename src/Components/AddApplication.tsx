import React from 'react';
import {ApplicationState, ApplicationData} from './Application';

export interface AddProps {
  onAddApplication: (data: ApplicationData) => void
}

const defaultState = {
  name: '',
  link: '',
  state: ApplicationState.Todo
};

class AddApplication extends React.Component<AddProps, ApplicationData> {
  constructor(props: AddProps) {
    super(props);
    this.state = defaultState;

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
    this.props.onAddApplication({
      name: this.state.name,
      link: this.state.link,
      state: ApplicationState.Todo
    });
    this.setState(defaultState);
    event.preventDefault();
  }

  render() {
    return (
      <form className="addForm" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={this.state.name} onChange={this.handleNameChange} />

        <label htmlFor="link">Job offer link:</label>
        <input id="link" type="text" value={this.state.link} onChange={this.handleLinkChange} />
        
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default AddApplication;
