import React from 'react';


export default class Item extends React.Component {

	render() {
		const { image, onClick, active } = this.props;

		return (
			<li>
				<button
					type="button"
					data-image={image}
					style={{ backgroundImage: `url('${image}')` }}
					className={active ? 'active' : ''}
					onClick={onClick}/>
			</li>
		);
	}
}