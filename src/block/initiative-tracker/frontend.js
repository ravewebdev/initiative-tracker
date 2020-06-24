/**
 * FRONTEND: Initiative Tracker Block
 */
const {
    element: {
		render,
	},
} = wp;

import FrontendTracker from './components/FrontendTracker';

const trackerClass = 'wp-block-rave-initiative-tracker';
const trackers     = document.querySelectorAll( `.${trackerClass}` );

/**
 * Retrieve and re-render initiative tracker blocks.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {Object} tracker Tracker DOM element.
 */
trackers.forEach( ( tracker ) => {
	const attributes = {
		block_id: tracker.dataset.id,
		players: JSON.parse( tracker.dataset.players ),
		npcs: JSON.parse( tracker.dataset.npcs ),
	};

	render(
		<FrontendTracker
			dataAttributes={ attributes }
			className={ trackerClass }
		/>,
        tracker
	);
	trackCurrentCharacter( tracker );
} );

/**
 * Track current character with pointer.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {DOM element} tracker Tracker DOM element.
 * @return {void}
 */
function trackCurrentCharacter( tracker ) {
	const button = tracker.querySelectorAll( '.next-character' );

	if ( ! button.length ) {
		return;
	}

	button[0].addEventListener( 'click', function( e ) {
		const characters   = tracker.querySelectorAll( '.characters .character' );
		let current        = tracker.querySelectorAll( '.character.current' );
		const currentClass = 'current';

		if ( ! characters.length ) {
			return;
		}

		// If no character is currently active, select the first in the list.
		if ( ! current.length ) {
			characters[0].classList.add( currentClass );
			return;
		}

		current  = current[0];
		let next = current.nextElementSibling;

		current.classList.remove( currentClass );

		// Return to first character in list if end of list is reached.
		if ( null === next ) {
			characters[0].classList.add( currentClass );
			return;
		}

		next.classList.add( currentClass );
	} );
}
