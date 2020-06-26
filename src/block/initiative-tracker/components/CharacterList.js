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
		type,
		editCharacter = null,
		deleteCharacter,
		addText,
		editText,
		active,
		activeIndex,
		setActive,
		children,
	} = props;

	const onFrontend = undefined !== activeIndex,
		isAdminActive = active && ! onFrontend;

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

			{ children }
		</div>
	);
};

export default CharacterList;
