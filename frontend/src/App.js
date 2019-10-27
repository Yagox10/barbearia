import React from 'react';

import {
	navigation,
	basename,
} from './settings';

import Frame from './components/frame/App';
import Aside from './components/aside';
import Logo from './components/logo';

import './index.css';

const sidebar = (
	<Aside
		nav={ navigation }
		className="bg-secondary border-right pt-2 pb-5"
	>
		<div className="my-4">
			<Logo
				width="85"
				className="d-flex justify-content-center text-primary border border-primary p-2 mx-2"
				href={ basename }
			/>
		</div>
	</Aside>
);

export default function () {
	return (
		<Frame
			nav={ navigation }
			sidebar={ sidebar }
			sidebarPosition="left"
		/>
	)
}
