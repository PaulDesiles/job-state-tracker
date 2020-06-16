import React, {Fragment} from 'react';
import AddApplication from './AddApplication'
import CompanyApplication from './CompanyApplication'

let appCount = 1;
class Organizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: props.data
    }

    this.addApplication = this.addApplication.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);
  }

  addApplication(data) {
    const newElement = {
      id:++appCount,
      ...data
    };

    this.setState(state => ({
      applications: state.applications.concat(newElement)
    }));
  }

  deleteApplication(id) {
    this.setState(state => ({
      applications: state.applications.filter(app => app.id !== id)
    }))
  }

  render() {
    const applications = this.state.applications.map(data => 
      <CompanyApplication
        key={data.id}
        onClick={this.deleteApplication}
        {...data}
      />
    );

    return (
      <Fragment>
        {applications}
        <AddApplication onAddApplication={this.addApplication} />
      </Fragment>
    );
  }
}

export default Organizer;
