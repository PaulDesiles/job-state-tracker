import React, { Component } from 'react';
import { OrganizerItemProps } from './interfaces';
import { Draggable } from 'react-beautiful-dnd';
import ApplicationLine from './ApplicationLine';

class OrganizerItem extends Component<OrganizerItemProps> {
	render() {
		return (
			<Draggable draggableId={`${this.props.id}`} index={this.props.index}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={{margin: '0 0 8px 0', ...provided.draggableProps.style}}
					>
						<ApplicationLine {...this.props} />
					</div>
					)}
			</Draggable>
		);
	}
}

export default OrganizerItem;
