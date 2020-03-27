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
	} = props;
	
	return (
		<div className={ `character-list--${type}` }>
			<h2>{ title }</h2>

			{ characters.length && (
				<ul>
					{ characters.map( character => (
						<Character characterName={ character.name } type={ type } />
					) ) }
				</ul>
			) }

			<AddEditCharacterModal type={ type } addCharacter={ addCharacter } />
		</div>
	);
}

export default CharacterList;
