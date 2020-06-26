/**
 * Character List.
 */

import Character from './Character';
import AddEditCharacterForm from './AddEditCharacterForm';

const {
    components: {
        Button,
    },
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
		type,
		addCharacter,
		editCharacter,
		deleteCharacter,
		addText,
		editText,
		active,
		activeIndex,
		setActive,
	} = props;

	const [ isAdding, setIsAdding ] = useState( false );

	const onFrontend = undefined !== activeIndex,
		isAdminActive = active && ! onFrontend;

	/**
	 * Toggle adding state.
	 *
	 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
	 * @since  1.0.0
	 */
	const toggleAdd = () => {
		setIsAdding( ! isAdding );
	};

	return (
		<div className={ `character-list${ typeof type === 'undefined' ? '' : `--${type}` }` }>
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
							deleteCharacter={ deleteCharacter }
							editText={ editText }
							activeIndex={ activeIndex }
							setActive={ setActive }
							onFrontend={ onFrontend }
							isAdminActive={ isAdminActive }
						/>
					) ) }
				</ul>
			) }

			{ isAdminActive && (
				isAdding ?
					<AddEditCharacterForm
						type={ type }
						characterFn={ addCharacter }
						toggle={ toggleAdd }
					/> :
					<div className="edit-character-buttons">
						<Button
				            isPrimary
				            onClick={ () => {
				            	toggleAdd();
				            } }
						>
							{ addText }
						</Button>
					</div>
			) }
		</div>
	);
};

export default CharacterList;
