/**
 * EDIT: Initiative Tracker Block
 */

import AddEditCharacterModal from '../components/AddEditCharacterModal';
import CharacterList from '../components/CharacterList';
import DeleteCharacterModal from '../components/DeleteCharacterModal';
import withCharacterButtons from '../components/withCharacterButtons';
import addCharacter from '../utils/addCharacter';
import deleteCharacter from '../utils/deleteCharacter';
import editCharacter from '../utils/editCharacter';
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
	 * HOF: Update Characters and save to attributes.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {function} wrappedFunction Wrapped function to call.
	 * @param  {Array}    characters      Array of Characters to update.
	 * @return {Array}                    Updated array of Characters.
	 */
	const withCharacterUpdate = ( wrappedFunction, characters ) => ( type, ...args ) => {
		const newCharacters = wrappedFunction( type, ...args, characters );

		setAttributes( {
			[ type ]: newCharacters,
		} );

		return characters;
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
				characterFn={ withCharacterUpdate( editCharacter, [ ...props.attributes[ type ] ] ) }
				character={ character }
				index={ index }
			/>
			<DeleteCharacterModal
				index={ index }
				deleteCharacter={ withCharacterUpdate( deleteCharacter, [ ...props.attributes[ type ] ] ) }
				name={ character.name }
				type={ type }
			/>
		</div>
	);

	/**
	 * Display button to trigger add Character modal.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {Object} args            Function args.
	 * @param  {string} args.type       Type of Character list being displayed.
	 * @param  {Array}  args.characters Array of Characters.
	 * @return {ReactElement}           JSX to display.
	 */
	const afterCharacterList = ( { type, characters } ) => (
		<AddEditCharacterModal
			type={ type }
			buttonText={ __( 'Add Character' ) }
			characterFn={ withCharacterUpdate( addCharacter, characters ) }
		/>
	);

	if ( isSelected ) {

		// Display Character edit buttons.
		addFilter( 'rave.initiativeTracker.afterCharacter', 'rave.initiativeTracker.renderEditCharacterButtons', ( content, args ) => displayEditCharacterButtons( args ) );
	} else {
		removeFilter( 'rave.initiativeTracker.afterCharacter', 'rave.initiativeTracker.renderEditCharacterButtons' );
	}

	// HOC: CharacterList with Character editing buttons.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const CharacterListWithButtons = withCharacterButtons( CharacterList, {
		buttonFn: afterCharacterList,
		position: 'after',
		fnArgs: [ 'type', 'characters' ],
	} );

	return (
		<div className={ className }>
			<div className="characters">
				{ isSelected && (
					<>
						<CharacterListWithButtons
							title={ __( 'Players', 'initiative-tracker' ) }
							characters={ players }
							type="players"
						/>
						<CharacterListWithButtons
							title={ __( 'NPCs', 'initiative-tracker' ) }
							characters={ npcs }
							type="npcs"
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
