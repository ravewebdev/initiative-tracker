/**
 * Utility: Edit character.
 */

import sortCharacters from './sortCharacters';

/**
 * Edit character attributes.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {string} type       Type of character.
 * @param  {number} index      Character index.
 * @param  {Object} character  Character object.
 * @param  {Array}  characters Array of characters.
 * @return {Array}             Sorted array of characters.
 */
const editCharacter = ( type, index, character, characters = [] ) => {
	const newCharacters = [ ...characters ];

	newCharacters[ index ] = character;

	return sortCharacters( newCharacters );
};

export default editCharacter;
