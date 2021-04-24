import React, {Component} from 'react';

interface CollapseTitleProps {
	name: string,
	isOpened: boolean,
	toggleOpening: () => void;
}


class CollapseTitle extends Component<CollapseTitleProps> {
	render() {
		const arrowClass = 'collapseArrow' + (this.props.isOpened ? '' : ' closedArrow');
		return (
			<div className="collapseTitle" onClick={this.props.toggleOpening}>
				<svg className={arrowClass} xmlns="http://www.w3.org/2000/svg" width="20px" height="12px">
					<path stroke="#000" fill="none" strokeWidth="2" d="M 18,2 L 10,10 2,2" />
				</svg>
				<strong>{this.props.name}</strong>
			</div>
		);
	}
}

export default CollapseTitle;