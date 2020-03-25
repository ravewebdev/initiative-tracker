const { __ } = wp.i18n;
const { Component } = wp.element;

import Character from './Character';

/**
 * List characters and section title.
 *
 * @author Rebekah Van Epps <rave@ravanepps.com>
 * @since  2020-02-28
 *
 * @param  {Object}    props Properties passed from parent.
 * @return {WPElement}       Element to render.
 */
const CharacterList = props => {
	const { title, className, characters } = props;
	
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
