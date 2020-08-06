/**
 * EDIT: Initiative Tracker Block
 */

import AddEditCharacterModal from './components/AddEditCharacterModal';
import CharacterList from './components/CharacterList';
import DeleteCharacterModal from './components/DeleteCharacterModal';
import sortCharacters from '../utils/sortCharacters';

import './editor.scss';

const {
	i18n: {
		__,
	},
	element: {
		useEffect,
	},
	hooks: {
		addFilter,
		removeFilter,
	},
} = wp;

/**
 * Handle edit functionality in the admin.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {Object} props Block props.
 * @return {ReactElement} Block edit JSX.
 */
const Edit = ( props ) => {
	const {
		attributes: {
			id,
			players,
			npcs,
		},
		clientId,
		className,
		setAttributes,
		isSelected,
	} = props;

	useEffect( () => {

		// If id is not set (initial block creation), set id to clientId value.
		if ( 0 === id.length ) {
			setAttributes( {
				id: clientId,
			} );
		}
	}, [] );

	/**
	 * Add new character, sort alphabetically.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  1.0.0
	 *
	 * @param  {string} type      Type of character.
	 * @param  {Object} character New character object.
	 */
	const addCharacter = ( type, character ) => {
		character.key = Date.now();

		const characters = [ ...props.attributes[ type ], character ];

		setAttributes( {
			[ type ]: sortCharacters( characters ),
		} );
	};

	/**
	 * Edit character attributes.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  1.0.0
	 *
	 * @param  {string} type      Type of character.
	 * @param  {number} index     Character index.
	 * @param  {Object} character Character object.
	 */
	const editCharacter = ( type, index, character ) => {
		const characters = [ ...props.attributes[ type ] ];
		characters[ index ] = character;
		setAttributes( {
			[ type ]: sortCharacters( characters ),
		} );
	};

	/**
	 * Delete character.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  1.0.0
	 *
	 * @param  {string} type  Type of character.
	 * @param  {number} index Character index.
	 */
	const deleteCharacter = ( type, index ) => {
		const characters = [ ...props.attributes[ type ] ].filter( function( character, charIndex ) {
			return charIndex !== index;
		}, index );
		setAttributes( {
			[ type ]: characters,
		} );
	};

	/**
	 * Display Character edit/delete buttons.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {Object}   args           Function args.
	 * @param  {string}   args.type      Type of Character list being displayed.
	 * @param  {Object}   args.character  Current character.
	 * @param  {number}   args.index      Current character index.
	 * @return {ReactElement}             JSX to display.
	 */
	const displayEditCharacterButtons = ( { type, character, index } ) => (
		<div className="edit-character-buttons">
			<AddEditCharacterModal
				type={ type }
				buttonText={ __( 'Edit Character' ) }
				characterFn={ editCharacter }
				character={ character }
				index={ index }
			/>
			<DeleteCharacterModal
				index={ index }
				deleteCharacter={ deleteCharacter }
				name={ character.name }
				type={ type }
			/>
		</div>
	);

	/**
	 * Display Character edit/delete buttons.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {Object} args      Function args.
	 * @param  {string} args.type Type of Character list being displayed.
	 * @return {ReactElement}     JSX to display.
	 */
	const displayAddCharacterButton = ( { type } ) => (
		<AddEditCharacterModal
			type={ type }
			buttonText={ __( 'Add Character' ) }
			characterFn={ addCharacter }
		/>
	);

	if ( isSelected ) {

		// Display Character add button.
		addFilter( 'rave.initiativeTracker.afterCharacterList', 'rave.initiativeTracker.renderAddCharacterbutton', ( content, args ) => displayAddCharacterButton( args ) );

		// Display Character edit buttons.
		addFilter( 'rave.initiativeTracker.afterCharacter', 'rave.initiativeTracker.renderEditCharacterButtons', ( content, args ) => displayEditCharacterButtons( args ) );
	} else {
		removeFilter( 'rave.initiativeTracker.afterCharacterList', 'rave.initiativeTracker.renderAddCharacterbutton' );
		removeFilter( 'rave.initiativeTracker.afterCharacter', 'rave.initiativeTracker.renderEditCharacterButtons' );
	}

	return (
		<div className={ className }>
			<div className="characters">
				{ isSelected && (
					<>
						<CharacterList
							title={ __( 'Players', 'initiative-tracker' ) }
							characters={ players }
							type="players"
							editCharacter={ () => null }
						/>
						<CharacterList
							title={ __( 'NPCs', 'initiative-tracker' ) }
							characters={ npcs }
							type="npcs"
							editCharacter={ () => null }
						/>
					</>
				) }
				{ ! isSelected && (
					<CharacterList
						title={ __( 'Characters', 'initiative-tracker' ) }
						characters={ sortCharacters( [
							...players,
							...npcs,
						], false ) }
					/>
				) }
			</div>
		</div>
	);
};

export default Edit;
