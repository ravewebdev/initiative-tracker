/**
 * EDIT: Initiative Tracker Block
 */

import AddCharacterButton from '../components/AddCharacterButton';
import Character from '../components/Character';
import CharacterList from '../components/CharacterList';
import EditCharacterButtons from '../components/EditCharacterButtons';
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
	 * @return {Function}                 A function that accepts one or more params to update the block's Character attributes.
	 */
	const withCharacterUpdate = ( wrappedFunction, characters ) => {

		/**
		 * @author R A Van Epps <rave@ravanepps.com>
		 * @since  NEXT
		 *
		 * @param  {string}    type Type of Characters to update.
		 * @param  {...Object} args Other args.
		 * @return {Array}          Updated array of Characters.
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
		const buttonProps = {
			editFunction: () => withCharacterUpdate( editCharacter, characters ),
			deleteFunction: () => withCharacterUpdate( deleteCharacter, characters ),
			type,
		};

		return (
			<ul>
				{ characters.map( ( character, index ) => (
					<CharacterWithButtons
						key={ character.key }
						character={ character }
						type={ type }
						index={ index }
						buttons={ (
							<EditCharacterButtons
								{ ...buttonProps }
								character={ character }
								index={ index }
							/>
						) }
						position="after"
					/>
				) ) }
			</ul>
		);
	};

	// HOC: Character with Character editing buttons.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const CharacterWithButtons = withCharacterButtons( Character );

	// HOC: CharacterList with Character editing buttons.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const CharacterListWithButtons = compose(
		withCharacterButtons,
		withChildren( {
			childrenFn: displayCharacterListWithChildren,
			requiredProps: [ 'type', 'characters' ],
		} )
	)( CharacterList );

	return (
		<div className={ className }>
			<div className="characters">
				{ isSelected ? (
					<>
						<CharacterListWithButtons
							title={ __( 'Players', 'initiative-tracker' ) }
							characters={ players }
							type="players"
							buttons={ (
								<AddCharacterButton
									addFunction={ () => withCharacterUpdate( addCharacter, players ) }
									type="players"
								/>
							) }
							position="after"
						/>
						<CharacterListWithButtons
							title={ __( 'NPCs', 'initiative-tracker' ) }
							characters={ npcs }
							type="npcs"
							buttons={ (
								<AddCharacterButton
									addFunction={ () => withCharacterUpdate( addCharacter, npcs ) }
									type="npcs"
								/>
							) }
							position="after"
						/>
					</>
				) : (
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
