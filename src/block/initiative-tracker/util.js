/**
 * Utility functions.
 */

/**
 * Sort characters by name.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {Array}   characters Array of characters.
 * @param  {boolean} alpha      Whether to sort alphabetically (true) or by inititiative score (false).
 * @return {Array} 	            Sorted array of characters.
 */
const sortCharacters = ( characters, alpha = true ) => {
	characters.sort( function( char1, char2 ) {
		if ( alpha ) {
			return char1.name.localeCompare( char2.name );
		}
		return ( parseInt( char1.initiative, 10 ) > parseInt( char2.initiative, 10 ) ? -1 : 1 );
	} );
	return characters;
};

export {
	sortCharacters,
};
