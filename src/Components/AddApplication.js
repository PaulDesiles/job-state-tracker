import React from 'react';

class AddApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      state: 'todo'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    this.props.onAddApplication(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form className="addForm" onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </label>

        <label>
          State:
          <input type="text" name="state" value={this.state.state} onChange={this.handleChange} />
        </label>
        
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default AddApplication;
