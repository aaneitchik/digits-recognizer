import React from 'react';

import './Sidebar.scss';

const links = ['Try me', 'Statistics'];

const Sidebar = (props) => {
	const height = window.innerHeight + 'px';
	return (
		<div className="sidebar" style={{height}}>
			{getMenuItems(props.onMenuHover)}
		</div>
	)
};

function getMenuItems(hoverCallback) {
	return links.map((item, index) => {
		return (
			<div key={index}
				 className="sidebar-item"
				 onMouseEnter={() => hoverCallback(item)}>
				<span>{item}</span>
			</div>
		);
	});
}

export {Sidebar};