import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { changeActiveFile } from '../../actions/side';

import ToggleButton from './ToggleButton';
import Navigation from './Navigation';
import Items from './Items';

let firstSelectIdx = null;


class Side extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { ple } = this.props;
		Side.getItems(ple.preference.side.items).then();
	}

	/**
	 * Get items
	 *
	 * @param {Array|String} items
	 */
	static async getItems(items) {
		if (typeof items === 'string')
		{
			try {
				const res = await axios.get(items);
				ple.api.side.addItems(res.data);
			} catch(e) {}
		}
		else if (items instanceof Array)
		{
			ple.api.side.addItems(items);
		}
	}

	/**
	 * On select item
	 *
	 * @param {Number} n
	 */
	onSelectItem(n) {
		const { root, dispatch, files } = this.props;
		const { keyName } = root.keyboard;

		if (keyName !== 'shift')
		{
			let currentItem = null;
			files.forEach((o) => {
				if (o.id === n)
				{
					currentItem = o;
					return false;
				}
			});
			firstSelectIdx = (currentItem.active === true) ? null : n;
		}
		dispatch(changeActiveFile(n, keyName, firstSelectIdx));
	}

	/**
	 * Toggle select all items
	 */
	_toggleSelect() {
		const { files, dispatch } = this.props;

		let active = false;
		files.forEach((o) => {
			if (o.active) active = true;
		});
		if (active)
		{
			dispatch(changeActiveFile(null, 'none', null));
		}
		else
		{
			dispatch(changeActiveFile(null, 'all', null));
		}
	}

	render() {
		const { tree, ple } = this.props;

		return (
			<aside className="ple-side">
				<div className={`wrap ${tree.side.layout.visible ? 'show' : ''}`}>
					<ToggleButton
						show={tree.side.layout.visible}
						onClick={() => ple.api.layout.toggleSide()}/>
					<Navigation
						attach={() => {
							console.log('attach files');
						}}
						toggleSelect={this._toggleSelect.bind(this)}
						upload={() => {
							console.log('on upload');
						}}
						remove={() => {
							console.log('on remove');
						}}/>
					{/*<Items*/}
						{/*files={files}*/}
						{/*select={this.onSelectItem.bind(this)}/>*/}
				</div>
			</aside>
		);
	}
}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Side);