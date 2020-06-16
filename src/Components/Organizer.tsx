import React, {Fragment} from 'react';
import AddApplication from './AddApplication';
import ApplicationLine from './ApplicationLine';
import {Application, ApplicationData} from './Application';

const defaultData = [
  {id:0, name: "Space X", state:"sent"},
  {id:1, name: "ESA", state:"scheduled"}
];

interface OrganizerProps { }

interface OrganizerState {
  applications: Array<Application>
}

let appCount = 0;
class Organizer extends React.Component<OrganizerProps, OrganizerState> {
  constructor(props: OrganizerProps) {
    super(props);

    let apps = defaultData;
    let storedApps = localStorage.getItem('applications');
    if (storedApps) {
      apps = JSON.parse(storedApps);
    } else {
      localStorage.setItem('applications', JSON.stringify(apps));
    }

    appCount = Math.max(0, ...apps.map(app => app.id));

    this.state = {
      applications: apps
    }

    this.addApplication = this.addApplication.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);
    this.updateStoredData = this.updateStoredData.bind(this);
  }

  addApplication(data: ApplicationData) {
    const newElement: Application = {
      id: ++appCount,
      ...data
    };

    this.setState(
      state => ({
        applications: state.applications.concat(newElement)
      }),
      () => this.updateStoredData()
    );
  }

  deleteApplication(id: number) {
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
      <ApplicationLine
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
