/**
 * WordPress dependencies
 */
import { Component, DangerousHTML } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';

class DangerousHTMLWithWarning extends Component {
	constructor() {
		super( ...arguments );

		// Disable reason: We're intentionally logging a console warning
		// advising the developer to upgrade usage.

		// eslint-disable-next-line no-console
		console.warn(
			'Deprecated: String returns from block `save` is unsupported. ' +
			'Use `wp.element.DangerousHTML` component instead.\n\n' +
			'See: '
		);
	}

	render() {
		const { children } = this.props;

		return <DangerousHTML>{ children }</DangerousHTML>;
	}
}

/**
 * Override save element for a block, providing support for deprecated string
 * return value, logging a warning advising the developer to use the preferred
 * DangerousHTML component instead.
 *
 * @param {(string|Object)} element Original block save return.
 *
 * @returns {Object} Filtered props applied to save element.
 */
export function shimDangerousHTML( element ) {
	if ( typeof element !== 'string' ) {
		return element;
	}

	return <DangerousHTMLWithWarning children={ element } />;
}

addFilter( 'blocks.getSaveContent.saveElement', 'core/deprecated/save-props', shimDangerousHTML );
