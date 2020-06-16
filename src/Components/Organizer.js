import React, {Fragment} from 'react';
import AddApplication from './AddApplication'
import CompanyApplication from './CompanyApplication'

const defaultData = [
  {id:0, name: "Space X", state:"sent"},
  {id:1, name: "ESA", state:"scheduled"}
];

let appCount = 0;
class Organizer extends React.Component {
  constructor(props) {
    super(props);

    let apps = defaultData;
    let storedApps = localStorage.getItem('applications');
    if (storedApps) {
      apps = JSON.parse(storedApps);
      
      //reset ids
      for(let i = 0; i < apps.length; i++) {
        apps[i].id = i;
      }

    } else {
      localStorage.setItem('applications', JSON.stringify(apps));
    }

    appCount = apps.length;

    this.state = {
      applications: apps
    }

    this.addApplication = this.addApplication.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);
    this.updateStoredData = this.updateStoredData.bind(this);
  }

  addApplication(data) {
    const newElement = {
      id: appCount++,
      ...data
    };

    this.setState(
      state => ({
        applications: state.applications.concat(newElement)
      }),
      () => this.updateStoredData()
    );
  }

  deleteApplication(id) {
    this.setState(
      state => ({
        applications: state.applications.filter(app => app.id !== id)
      }),
      () => this.updateStoredData()
    );
  }

  updateStoredData() {
    localStorage.setItem('applications', JSON.stringify(this.state.applications));
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
