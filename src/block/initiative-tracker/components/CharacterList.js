/**
 * Character List.
 */

import Character from './Character';

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
		before = null,
		after = null,
	} = props;

	return (
		<div className={ `character-list${ null === type ? '' : `--${ type }` }` }>
			<h2>{ title }</h2>

			{ null !== children && children }

			{ null !== before && before }

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

			{ null !== after && after }
		</div>
	);
};

export default CharacterList;
