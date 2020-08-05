/**
 * Character List.
 */

import Character from './Character';

const {
	element: {
		useState,
	},
	hooks: {
		applyFilters,
	},
} = wp;

/**
 * Character List.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 * @since  2.0.0 Converted to functional component.
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const CharacterList = ( props ) => {
	const {
		title,
		characters,
		type = null,
		editCharacter = null,
		children = null,
	} = props;

	const [ isAdding, setIsAdding ] = useState( false );

	/**
	 * Toggle adding state.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  1.0.0
	 */
	const toggleAdd = () => {
		setIsAdding( ! isAdding );
	};

	// Args to pass to content filters.
	const filterArgs = {
		characters,
		type,
	};

	/**
	 * Render content before Characters.
	 *
	 * @since  NEXT
	 *
	 * @param  {?ReactElement} JSX to display.
	 * @param  {Object}        Filter args.
	 */
	const renderBeforeCharacterList = applyFilters( 'rave.initiativeTracker.beforeCharacterList', null, filterArgs );

	/**
	 * Render content after Characters.
	 *
	 * @since  NEXT
	 *
	 * @param  {?ReactElement} JSX to display.
	 * @param  {Object}        Filter args.
	 */
	const renderAfterCharacterList = applyFilters( 'rave.initiativeTracker.afterCharacterList', null, filterArgs );

	return (
		<div className={ `character-list${ null === type ? '' : `--${ type }` }` }>
			<h2>{ title }</h2>

			{ null !== children && children }

			{ renderBeforeCharacterList }

			{ 0 < characters.length && (
				<ul>
					{ characters.map( ( character, index ) => (
						<Character
							key={ character.key }
							character={ character }
							type={ type }
							index={ index }
							editCharacter={ editCharacter }
						/>
					) ) }
				</ul>
			) }

			{ renderAfterCharacterList }
		</div>
	);
};

export default CharacterList;
