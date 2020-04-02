const trackerClass = '.wp-block-rave-rpg-initiative-tracker';
const trackers     = document.querySelectorAll(
	trackerClass
);

trackers.forEach( ( tracker, index ) => {
	trackCurrentCharacter( tracker );
} );

/**
 * Track current character with pointer.
 *
 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
 * @since  2020-04-02
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
