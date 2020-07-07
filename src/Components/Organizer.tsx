import React, {Fragment} from 'react';
import AddApplication from './AddApplication';
import {Application, ApplicationData, ApplicationState} from './interfaces';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DragDropContext, Droppable, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import OrganizerItem from './OrganizerItem';
import { v4 as uuidv4 } from 'uuid';

const defaultData = [
  {id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6a', name: "Space X", link: "https://www.spacex.com/careers/index.html", state: ApplicationState.Sent},
  {id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6b', name: "ESA", link: "http://www.esa.int/About_Us/Careers_at_ESA", state: ApplicationState.Waiting},
  {id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6c', name: "NASA", link: "https://www.nasa.gov/careers", state: ApplicationState.Todo}
];

interface OrganizerProps { }

interface OrganizerState {
  applications: Application[];
  archives: Application[];
}

const reorder = (list: Application[], sourceIndex: number, destIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destIndex, 0, removed);

    return result;
};

const move = (
  sourceList: Application[], 
  destinationList: Application[], 
  source: DraggableLocation,
  destination: DraggableLocation) => 
{
  const sourceClone = [...sourceList];
  const destClone = [...destinationList];
  const [removed] = sourceClone.splice(source.index, 1);

  destClone.splice(destination.index, 0, removed);

  return {
    source: sourceClone,
    destination: destClone
  };
};

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

    const archives: Application[] = JSON.parse(localStorage.getItem('archives') || '[]');

    // transform old ids
    apps.forEach(app => {
      if (typeof(app.id) === 'number') {
        app.id = uuidv4();
      }
    });

    this.state = {
      applications: apps,
      archives
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
    localStorage.setItem('archives', JSON.stringify(this.state.archives));
  }

  onDragEnd(result: DropResult) {
    const {source, destination} = result;

    if (destination) {

      const getList = (droppableId: string, state: OrganizerState) => {
        if (droppableId === "mainDroppable")
          return state.applications;
        else
          return state.archives;
      };

      const isDestMain = destination.droppableId === "mainDroppable";

      if (source.droppableId === destination.droppableId) {
        this.setState((state) => {
          const newArray = reorder(
            getList(destination.droppableId, state),
            source.index,
            destination.index);

          if (isDestMain)
            return { applications: newArray } as OrganizerState;
          else
            return { archives: newArray } as OrganizerState;
        },
        () => this.updateStoredData());
      } else {
        this.setState(state => {
          const updatedLists = move(
            getList(source.droppableId, state),
            getList(destination.droppableId, state),
            source,
            destination);

          if (isDestMain) {
            return { 
              applications: updatedLists.destination,
              archives: updatedLists.source
            }
          } else {
            return { 
              applications: updatedLists.source,
              archives: updatedLists.destination
            }
          }
        },
        () => this.updateStoredData());
      }
    }
  }

  render() {

    return (
      <Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="mainDroppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} >
                  {this.state.applications.map((item, index) => (
                      <OrganizerItem 
                        key={item.id}
                        index={index}
                        onDelete={this.deleteApplication}
                        onStateChange={this.changeApplicationState}
                        {...item}
                        />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <i>Archives</i>
          <Droppable droppableId="archivesDroppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="archivesZone">
                  {this.state.archives.map((item, index) => (
                      <OrganizerItem 
                        key={item.id}
                        index={index}
                        onDelete={this.deleteApplication}
                        onStateChange={this.changeApplicationState}
                        {...item}
                        />
                  ))}
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
