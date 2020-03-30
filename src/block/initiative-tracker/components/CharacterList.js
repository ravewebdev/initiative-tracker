/**
 * WP dependencies
 */
// const {} = wp;

/**
 * Components
 */
import Character from './Character';
import AddEditCharacterModal from './AddEditCharacterModal';

const CharacterList = ( props ) => {
	const {
		title,
		characters,
		type,
		addCharacter,
		deleteCharacter,
		addText,
	} = props;
	
	return (
		<div className={ `character-list--${type}` }>
			<h2>{ title }</h2>

			{ characters.length && (
				<ul>
					{ characters.map( ( character, index ) => (
						<Character characterName={ character.name } type={ type } index={ index } deleteCharacter={ deleteCharacter } />
					) ) }
				</ul>
			) }

			<AddEditCharacterModal type={ type } addCharacter={ addCharacter } addText={ addText } />
		</div>
	);
}

export default CharacterList;
