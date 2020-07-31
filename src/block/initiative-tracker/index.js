/**
* BLOCK: Initiative Tracker
*
* Register Initiative Tracker
*/

import Edit from './edit';
import Save from './save';

import './style.scss';

const {
	i18n: {
		__,
	},
	blocks: {
		registerBlockType,
	},
} = wp;

/**
 * Register Initiative Tracker block.
 */
registerBlockType( 'rave/initiative-tracker', {
	title: __( 'Initiative Tracker', 'initiative-tracker' ),
	description: __( 'This block helps track and organize character initiative scores.', 'initiative-tracker' ),
	icon: 'list-view',
	category: 'widgets',
	keywords: [
		__( 'initiative tracker', 'initiative-tracker' ),
	],
	supports: {
		html: false,
	},
	attributes: {
		id: {
			type: 'string',
			default: '',
		},
		players: {
			type: 'array',
			default: [],
		},
		npcs: {
			type: 'array',
			default: [],
		},
	},
	edit: Edit,
	save: Save,
} );
