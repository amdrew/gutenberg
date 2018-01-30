/**
 * Internal dependencies
 */
import { isInlineBlock } from './utils';

/**
 * Browser dependencies
 */
const { ELEMENT_NODE } = window.Node;

export default function( node ) {
	if ( node.nodeType !== ELEMENT_NODE ) {
		return;
	}

	if ( ! isInlineBlock( node ) ) {
		return;
	}

	let wrapper = node;

	while ( wrapper && wrapper.nodeName !== 'P' ) {
		wrapper = wrapper.parentElement;
	}

	if ( wrapper ) {
		wrapper.parentNode.insertBefore( node, wrapper );
	}
}
