/**
 * Utility: Add character.
 */

import sortCharacters from './sortCharacters';

/**
 * Add new character, sort alphabetically.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {string} type       Type of character.
 * @param  {Object} character  New character object.
 * @param  {Array}  characters Array of characters.
 * @return {Array}             Sorted array of characters.
 */
const addCharacter = ( type, character, characters = [] ) => {
	character.key = Date.now();

	return sortCharacters( [ ...characters, character ] );
};

export default addCharacter;
