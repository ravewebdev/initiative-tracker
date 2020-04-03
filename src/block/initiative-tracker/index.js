/**
* BLOCK: Initiative Tracker
*
* Register Initiative Tracker
*/
import edit from './edit';
import save from './save';

/**
* WordPress dependencies.
*/
const {
    i18n: {
        __,
    },
    blocks: {
        registerBlockType,
    },
} = wp;

registerBlockType( 'rave/rpg-initiative-tracker', {
    title: __( 'Initiative Tracker', 'rpg-initiative' ),
    description: __( 'This block helps track and organize character initiative scores.', 'rave-rpg-initiative' ),
    icon: 'list-view',
    category: 'widgets',
    keywords: [
        __( 'richtext', 'rpg-initiative' ),
    ],
    supports: {
        html: false,
    },
    attributes: {
        notes: {
            type: 'string',
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
    edit,
    save,
} );
