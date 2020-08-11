/**
 * FRONTEND: Initiative Tracker Block
 */

import FrontendTracker from '../components/FrontendTracker';

const {
	element: {
		render,
	},
} = wp;

const trackerClass = '.wp-block-rave-initiative-tracker',
	trackers = document.querySelectorAll( trackerClass );

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
		post_id: parseInt( tracker.dataset.post_id, 10 ),
	};

	render(
		<FrontendTracker dataAttributes={ attributes } />,
		tracker
	);
} );
