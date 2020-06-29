/**
 * Character List.
 */

import Character from './Character';
import AddEditCharacterForm from './AddEditCharacterForm';

const {
    element: {
        useState,
    },
} = wp;

/**
 * Character List.
 *
 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
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
		setActive = null,
	} = props;

	const [ isAdding, setIsAdding ] = useState( false );

	/**
	 * Toggle adding state.
	 *
	 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
	 * @since  1.0.0
	 */
	const toggleAdd = () => {
		setIsAdding( ! isAdding );
	};

	/**
	 * Display AddEditCharacterForm if in admin.
	 *
	 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return {ReactElement} JSX to add Character if in admin.
	 */
	const maybeAddCharacter = () => (
		null !== addCharacter ? addCharacter( type, isAdding, toggleAdd ) : null
	);

	const onFrontend = null !== activeIndex;

	return (
		<div className={ `character-list${ null === type ? '' : `--${type}` }` }>
			<h2>{ title }</h2>

			{ characters.length > 0 && (
				<ul>
					{ characters.map( ( character, index ) => (
						<Character
							key={ character.key }
							character={ character }
							type={ type }
							index={ index }
							editCharacter={ editCharacter }
							activeIndex={ activeIndex }
							setActive={ setActive }
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
