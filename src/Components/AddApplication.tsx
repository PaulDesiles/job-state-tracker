import React from 'react';
import {ApplicationData} from './Application';

export interface AddProps {
  onAddApplication: (data: ApplicationData) => void
}

class AddApplication extends React.Component<AddProps, ApplicationData> {
  constructor(props: AddProps) {
    super(props);
    this.state = {
      name: '',
      state: 'todo'
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: event.target.value
    });
  }

  handleStateChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      state: event.target.value
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
          <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
        </label>

        <label>
          State:
          <input type="text" name="state" value={this.state.state} onChange={this.handleStateChange} />
        </label>
        
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default AddApplication;
