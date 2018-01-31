/**
 * External dependencies
 */
import { get, some, castArray } from 'lodash';

/**
 * WordPress dependencies
 */
import { withAPIData, withConditionalRender } from '@wordpress/components';
import { compose, getWrapperDisplayName } from '@wordpress/element';
import { query } from '@wordpress/data';

export function checkIfPostTypeSupports( postType, supportKeys ) {
	return some(
		castArray( supportKeys ), key => get( postType, [ 'data', 'supports', key ], false )
	);
}

const applyQuery = query( ( select ) => ( {
	postTypeSlug: select( 'core/editor', 'getCurrentPostType' ),
} ) );

const applyWithAPIData = withAPIData( ( { postTypeSlug } ) => {
	return {
		postType: postTypeSlug ? `/wp/v2/types/${ postTypeSlug }?context=edit` : undefined,
	};
} );

function IfPostTypeSupports( supportKeys ) {
	return ( OriginalComponent ) => {
		const applyConditionalRender = withConditionalRender( ( { postType } ) => checkIfPostTypeSupports( postType, supportKeys ) );
		const ComponentWithApply = compose(
			applyQuery,
			applyWithAPIData,
			applyConditionalRender,
		)( OriginalComponent );
		const WrappedComponent = ( props ) => <ComponentWithApply { ...props } />;
		WrappedComponent.displayName = getWrapperDisplayName( WrappedComponent, 'IfPostTypeSupports' );
		return WrappedComponent;
	};
}

export default IfPostTypeSupports;
