import React, {Fragment} from 'react';
import AddApplication from './AddApplication';
import {Application, ApplicationData, ApplicationState} from './interfaces';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import OrganizerItem from './OrganizerItem';

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
    this.onDragEnd = this.onDragEnd.bind(this);
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

  onDragEnd(result: DropResult) {
    if (result.destination) {
      const applications = [...this.state.applications];
      const removed = applications.splice(result.source.index, 1)[0];
      applications.splice(result.destination.index, 0, removed);

      this.setState({
        applications
      });
    }
  }

  render() {

    return (
      <Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} >
                <TransitionGroup>
                  {this.state.applications.map((item, index) => (
                    <CSSTransition key={item.id} timeout={{ enter: 500, exit: 300 }} classNames="item">
                      <OrganizerItem 
                        index={index}
                        onDelete={this.deleteApplication}
                        onStateChange={this.changeApplicationState}
                        {...item}
                        />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <AddApplication onAddApplication={this.addApplication} />
      </Fragment>
    );
  }
}

export default Organizer;
