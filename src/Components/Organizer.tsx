import React, {Fragment} from 'react';
import AddApplication from './AddApplication';
import {Application, ApplicationData, ApplicationState} from './interfaces';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import OrganizerItem from './OrganizerItem';
import { v4 as uuidv4 } from 'uuid';

const defaultData = [
  {id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6a', name: "Space X", link: "https://www.spacex.com/careers/index.html", state: ApplicationState.Sent},
  {id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6b', name: "ESA", link: "http://www.esa.int/About_Us/Careers_at_ESA", state: ApplicationState.Waiting},
  {id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6c', name: "NASA", link: "https://www.nasa.gov/careers", state: ApplicationState.Todo}
];

interface OrganizerProps { }

interface OrganizerState {
  applications: Application[]
}

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

    // transform old ids
    apps.forEach(app => {
      if (typeof(app.id) === 'number') {
        app.id = uuidv4();
      }
    });

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
      id: uuidv4(),
      ...data
    };

    this.setState(
      state => ({
        applications: state.applications.concat(newElement)
      }),
      () => this.updateStoredData()
    );
  }

  deleteApplication(id: string) {
    this.setState(
      state => ({
        applications: state.applications.filter(app => app.id !== id)
      }),
      () => this.updateStoredData()
    );
  }

  changeApplicationState(id: string, applicationState: ApplicationState) {
    this.setState(
      state => ({
        applications: state.applications.map(app => {
          if (app.id === id) {
            return {...app, state: applicationState};
          }

          return app;
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

      this.setState(
        { applications },
        () => this.updateStoredData()
      );
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
