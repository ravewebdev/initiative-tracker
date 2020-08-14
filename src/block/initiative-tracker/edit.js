/**
 * EDIT: Initiative Tracker Block
 */

import AdminCharacterList from '../components/AdminCharacterList';
import CharacterList from '../components/CharacterList';
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
	 * HOC: Component with update functions.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {ReactElement} WrappedComponent The wrapped component to display.
	 * @return {Function}                      A function that accepts a single param, `wrappedProps`, to display the wrapped component.
	 */
	const withUpdateFunctions = ( WrappedComponent ) => {

		/**
		 * @author R A Van Epps <rave@ravanepps.com>
		 * @since  NEXT
		 *
		 * @param  {Object} wrappedProps Props of the wrapped component.
		 * @return {ReactElement}        The wrapped component.
		 */
		return ( wrappedProps ) => {
			const {
				characters,
			} = wrappedProps;

			return (
				<WrappedComponent
					{ ...wrappedProps }
					addFunction={ withCharacterUpdate( addCharacter, characters ) }
					editFunction={ withCharacterUpdate( editCharacter, characters ) }
					deleteFunction={ withCharacterUpdate( deleteCharacter, characters ) }
				/>
			);
		};
	};

	// HOC: CharacterList with Character update functions.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const CharacterListWithUpdateFunctions = withUpdateFunctions( AdminCharacterList );

	return (
		<div className={ className }>
			<div className="characters">
				{ isSelected ? (
					<>
						<CharacterListWithUpdateFunctions
							title={ __( 'Players', 'initiative-tracker' ) }
							characters={ players }
							type="players"
						/>
						<CharacterListWithUpdateFunctions
							title={ __( 'NPCs', 'initiative-tracker' ) }
							characters={ npcs }
							type="npcs"
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
