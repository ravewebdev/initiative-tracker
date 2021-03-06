/**
 * Character List.
 */

import Character from './Character';

const {
	element: {
		useState,
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
		addCharacter = null,
		editCharacter = null,
		activeIndex = null,
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

	/**
	 * Display AddEditCharacterForm if in admin.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @return {ReactElement} JSX to add Character if in admin.
	 */
	const maybeAddCharacter = () => (
		null !== addCharacter ? addCharacter( type, isAdding, toggleAdd ) : null
	);

	const onFrontend = null !== activeIndex;

	return (
		<div className={ `character-list${ null === type ? '' : `--${ type }` }` }>
			<h2>{ title }</h2>

			{ null !== children && children }

			{ 0 < characters.length && (
				<ul>
					{ characters.map( ( character, index ) => (
						<Character
							key={ character.key }
							character={ character }
							type={ type }
							index={ index }
							editCharacter={ editCharacter }
							activeIndex={ activeIndex }
							onFrontend={ onFrontend }
						/>
					) ) }
				</ul>
			) }

			{ maybeAddCharacter() }
		</div>
	);
};

export default CharacterList;
