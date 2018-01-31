/**
 * WordPress dependencies
 */
import { getWrapperDisplayName } from '@wordpress/element';

function withConditionalRender( predicate ) {
	return ( OriginalComponent ) => {
		const WrappedComponent = ( props ) => {
			if ( predicate( props ) ) {
				return <OriginalComponent { ...props } />;
			}
			return null;
		};
		WrappedComponent.displayName = getWrapperDisplayName( WrappedComponent, 'ConditionalRender' );
		return WrappedComponent;
	};
}

export default withConditionalRender;
