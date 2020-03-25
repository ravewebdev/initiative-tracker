/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Import dependencies.
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow } from '@wordpress/components';

/**
 * Import components.
 */
import CharacterList from './components/CharacterList';
import AddCharacterButton from './components/AddCharacterButton';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'rave-rpg/initiative-tracker', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'TTRPG Initiative Helper', 'rave-rpg-initiative' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'This block helps track and organize player initiative scores.',
		'rave-rpg-initiative'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'list-view',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	/**
	 * Block attributes.
	 */
	attributes: {
		players: {
			type: 'array',
			default: []
		},
		npcs: {
			type: 'array',
			default: []
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
	 *
	 * @param {Object} [props] Properties passed from the editor.
	 *
	 * @return {WPElement} Element to render.
	 */
	edit( props ) {
		const {
			attributes: { players, npcs },
			className,
			setAttributes
		} = props;

		const addCharacter = ( type ) => {
			setAttributes( {
				[ type ]: [ ...props.attributes[ type ], {} ]
			} )
		};

		return [
			<InspectorControls>
				<PanelBody title={ __( 'Players', 'rave-rpg-initiative' ) }>
					<PanelRow>
						<AddCharacterButton
							type='players'
							buttonText={ __( 'Player' ) }
							addCharacter={ addCharacter }
						/>
						<AddCharacterButton
							type='npcs'
							buttonText={ __( 'NPC' ) }
							addCharacter={ addCharacter }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={ className }>
				{/*{console.log( 'players', players )}*/}
				<CharacterList
					title={ __( 'Players', 'rave-rpg-initiative' ) }
					className="character-list--players"
					characters={ players }
				/>
			{/* Can use previous setup w/in block itself, just need to define function here and pass it down! */}
				<CharacterList
					title={ __( 'NPCs', 'rave-rpg-initiative' ) }
					className="character-list--npcs"
					characters={ npcs }
				/>
			</div>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by the block editor into `post_content`.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
	 *
	 * @return {WPElement} Element to render.
	 */
	save() {
		return (
			<p>
				{ __(
					'TTRPG Initiative Helper – hello from the saved content!',
					'rave-rpg-initiative'
				) }
			</p>
		);
	},
} );
