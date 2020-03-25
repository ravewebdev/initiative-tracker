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
		className,
		characters
	} = props;
	
	return (
		<div className={ className }>
			<h2>{ title }</h2>

			{ characters.length && (
				<ul>
					{ characters.map( character => (
						<Character character={ character } />
					) ) }
				</ul>
			) }
		</div>
	);
}

export default CharacterList;
