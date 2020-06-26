/**
 * Utility functions.
 */

/**
 * Sort characters by name.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {array} characters Array of characters.
 */
const sortCharacters = ( characters, alpha = true ) => {
    characters.sort( function( char1, char2 ) {
        if ( alpha ) {
            return char1.name.localeCompare( char2.name );
        }
        return ( parseInt( char1.initiative ) > parseInt( char2.initiative ) ? -1 : 1 );
    } );
    return characters;
}

export {
	sortCharacters,
};
