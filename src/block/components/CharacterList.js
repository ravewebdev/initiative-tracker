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

	/**
	 * Display characters via passed `children` prop or default list.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @return {?ReactElement} JSX to display.
	 */
	const renderCharacters = () => {
		if ( children ) {
			return children;
		}

		if ( 0 === characters.length ) {
			return null;
		}

		return (
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
		);
	};

	return (
		<div className={ `character-list${ null === type ? '' : `--${ type }` }` }>
			<h2>{ title }</h2>

			{ before }

			{ renderCharacters }

			{ after }
		</div>
	);
};

export default CharacterList;
