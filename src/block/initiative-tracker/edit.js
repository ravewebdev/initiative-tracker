/**
 * EDIT: Initiative Tracker Block
 */

import AddEditCharacterModal from '../components/AddEditCharacterModal';
import Character from '../components/Character';
import CharacterList from '../components/CharacterList';
import DeleteCharacterModal from '../components/DeleteCharacterModal';
import withCharacterButtons from '../components/withCharacterButtons';
import withChildren from '../components/withChildren';
import addCharacter from '../utils/addCharacter';
import deleteCharacter from '../utils/deleteCharacter';
import editCharacter from '../utils/editCharacter';
import sortCharacters from '../utils/sortCharacters';

import './editor.scss';

const {
	i18n: {
		__,
	},
	compose: {
		compose,
	},
	element: {
		useEffect,
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
	 * @param  {Function} wrappedFunction Wrapped function to call.
	 * @param  {Array}    characters      Array of Characters to update.
	 * @return {Function}                 A functions that accepts one or more params to update the block's Character attributes.
	 */
	const withCharacterUpdate = ( wrappedFunction, characters ) => {

		/**
		 * @author R A Van Epps <rave@ravanepps.com>
		 * @since  NEXT
		 *
		 * @param  {string}  type       Type of Characters to update.
		 * @param  {?Object} args       Other args.
		 * @param  {Array}   characters Array of Characters to update.
		 * @return {Array}              Updated array of Characters.
		 */
		return ( type, ...args ) => {
			const newCharacters = wrappedFunction( type, ...args, characters );

			setAttributes( {
				[ type ]: newCharacters,
			} );

			return characters;
		};
	};

	/**
	 * Display Character list(s) depending on current view.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @return {ReactElement} Character list(s).
	 */
	const displayCharacterLists = () => {
		if ( ! isSelected ) {
			return (
				<CharacterList
					title={ __( 'Characters', 'initiative-tracker' ) }
					characters={ sortCharacters( [
						...players,
						...npcs,
					], false ) }
				/>
			);
		}

		return (
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
		);
	};

	/**
	 * Display Character edit/delete buttons.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {string} options.type       Type of Character list being displayed.
	 * @param  {Object} options.character  Current character.
	 * @param  {number} options.index      Current character index.
	 * @param  {Array}  options.characters Array of Characters.
	 * @return {ReactElement}              JSX to display.
	 */
	const displayEditCharacterButtons = ( { type, character, index, characters } ) => (
		<>
			<AddEditCharacterModal
				type={ type }
				buttonText={ __( 'Edit Character' ) }
				characterFn={ withCharacterUpdate( editCharacter, characters ) }
				character={ character }
				index={ index }
			/>
			<DeleteCharacterModal
				index={ index }
				deleteCharacter={ withCharacterUpdate( deleteCharacter, characters ) }
				name={ character.name }
				type={ type }
			/>
		</>
	);

	/**
	 * Display button to trigger add Character modal.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {string} options.type       Type of Character list being displayed.
	 * @param  {Array}  options.characters Array of Characters.
	 * @return {ReactElement}              JSX to display.
	 */
	const displayAddCharacterButton = ( { type, characters } ) => (
		<AddEditCharacterModal
			type={ type }
			buttonText={ __( 'Add Character' ) }
			characterFn={ withCharacterUpdate( addCharacter, characters ) }
		/>
	);

	/**
	 * Display CharacterList with children function to display individual Character edit buttons.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {string} options.type       Type of Character list being displayed.
	 * @param  {Array}  options.characters Array of Characters.
	 * @return {ReactElement}              JSX to display.
	 */
	const displayCharacterListWithChildren = ( { type, characters } ) => {

		// HOC: Character with Character editing buttons.
		// eslint-disable-next-line @wordpress/no-unused-vars-before-return
		const CharacterWithButtons = compose(
			withCharacterButtons( {
				buttonFn: displayEditCharacterButtons,
				position: 'after',
				requiredProps: [ 'type', 'character', 'index' ],
				extraArgs: { characters },
			} )
		)( Character );

		return (
			<ul>
				{ characters.map( ( character, index ) => (
					<CharacterWithButtons
						key={ character.key }
						character={ character }
						type={ type }
						index={ index }
					/>
				) ) }
			</ul>
		);
	};

	// HOC: CharacterList with Character editing buttons.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const CharacterListWithButtons = compose(
		withCharacterButtons( {
			buttonFn: displayAddCharacterButton,
			position: 'after',
			requiredProps: [ 'type', 'characters' ],
		} ),
		withChildren( {
			childrenFn: displayCharacterListWithChildren,
			requiredProps: [ 'type', 'characters' ],
		} )
	)( CharacterList );

	return (
		<div className={ className }>
			<div className="characters">
				{ displayCharacterLists() }
			</div>
		</div>
	);
};

export default Edit;
