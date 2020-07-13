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
					<path stroke="#000" fill="none" stroke-width="2" d="M 2,2 L 10,10 18,2" />
				</svg>
				<i>{this.props.name}</i>
			</div>
		);
	}
}

export default CollapseTitle;