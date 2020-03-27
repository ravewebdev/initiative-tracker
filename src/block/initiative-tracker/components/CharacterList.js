/**
 * WP dependencies
 */
// const {} = wp;

/**
 * Components
 */
import Character from './Character';

const CharacterList = ( props ) => {
	const {
		title,
		characters,
		type,
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
		</div>
	);
}

export default CharacterList;
