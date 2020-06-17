import React, {Fragment} from 'react';
import AddApplication from './AddApplication';
import ApplicationLine from './ApplicationLine';
import {Application, ApplicationData, ApplicationState} from './Application';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const defaultData = [
  {id:0, name: "Space X", link: "https://www.spacex.com/careers/index.html", state: ApplicationState.Sent},
  {id:1, name: "ESA", link: "http://www.esa.int/About_Us/Careers_at_ESA", state: ApplicationState.Waiting},
  {id:2, name: "NASA", link: "https://www.nasa.gov/careers", state: ApplicationState.Todo}
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
    this.changeApplicationState = this.changeApplicationState.bind(this);
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

  changeApplicationState(id: number, applicationState: ApplicationState) {
    this.setState(
      state => ({
        applications: state.applications.map(app => {
          if (app.id === id) {
            const copy: Application = {...app};
            copy.state = applicationState;
            return copy;
          } else {
            return app;
          }
        })
      }),
      () => this.updateStoredData()
    );
  }

  updateStoredData() {
    localStorage.setItem('applications', JSON.stringify(this.state.applications));
  }

  render() {
    const applications = this.state.applications.map(data => 
      <CSSTransition
        key={data.id}
        timeout={{
          enter: 500,
          exit: 300
        }}
        classNames="item">
        <ApplicationLine
          onDelete={this.deleteApplication}
          onStateChange={this.changeApplicationState}
          {...data}
        />
      </CSSTransition>
    );

    return (
      <Fragment>
        <TransitionGroup>
          {applications}
        </TransitionGroup>
        <AddApplication onAddApplication={this.addApplication} />
      </Fragment>
    );
  }
}

export default Organizer;
