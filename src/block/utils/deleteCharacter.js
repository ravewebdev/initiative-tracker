/**
 * Utility: Delete character.
 */

/**
 * Delete character.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {string} type       Type of character.
 * @param  {number} index      Character index.
 * @param  {Array}  characters Array of characters.
 * @return {Array}             Sorted array of characters.
 */
const deleteCharacter = ( type, index, characters = [] ) => {
	const newCharacters = characters.filter( ( character, charIndex ) => {
		return charIndex !== index;
	}, index );

	return newCharacters;
};

export default deleteCharacter;
