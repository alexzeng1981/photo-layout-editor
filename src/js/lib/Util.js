/**
 * Random item in range
 *
 * @param {int} min
 * @param {int} max
 * @returns {number}
 */
export function getRandomRange(min, max)
{
	max += 1;
	return Math.floor(Math.random() * (max - min) + min);
}

/**
 * is touch device
 *
 * @returns {boolean}
 */
export function isTouchDevice()
{
	return (
		('ontouchstart' in window) ||
		(navigator.MaxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0)
	);
}

/**
 * Make props
 *
 * @param {Object} props
 * @param {Object} addProps
 */
export function makeProps(props, addProps)
{
	const { root, dispatch } = props;
	return Object.assign({}, {
		root,
		dispatch,
	}, addProps);
}