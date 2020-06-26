/**
 * EDIT: Initiative Tracker Block
 */

const {
    i18n: {
        __,
    },
} = wp;

import CharacterList from './components/CharacterList';

/**
 * Handle edit functionality in the admin.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {Object} props Block props.
 * @return {ReactElement} Block edit JSX.
 */
const Edit = ( props ) => {
    const {
        attributes: {
            id,
            players,
            npcs,
        },
        clientId,
        className,
        setAttributes,
        isSelected,
    } = props;

    // Update id attr when clientId changes.
    if ( clientId !== id ) {
        setAttributes( {
            id: clientId
        } );
    }

    /**
     * Sort characters by name.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  1.0.0
     *
     * @param  {array} characters Array of characters.
     */
    const sortCharacters = ( characters ) => {
        characters.sort( function( char1, char2 ) {
            return char1.name.localeCompare( char2.name );
        } );
        return characters;
    }

    /**
     * Add new character, sort alphabetically.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  1.0.0
     *
     * @param  {string} type      Type of character.
     * @param  {Object} character New character object.
     */
    const addCharacter = ( type, character ) => {
        type = `${type}s`;
        character.key = Date.now();

        const characters = [ ...props.attributes[ type ], character ];

        setAttributes( {
            [ type ]: sortCharacters( characters )
        } );
    };

    /**
     * Edit character attributes.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  1.0.0
     *
     * @param  {string}  type      Type of character.
     * @param  {integer} index     Character index.
     * @param  {Object}  character Character object.
     */
    const editCharacter = ( type, index, character ) => {
        type = `${type}s`;
        const characters = [ ...props.attributes[ type ] ];
        characters[ index ] = character;
        setAttributes( {
            [ type ]: sortCharacters( characters )
        } );
    }

    /**
     * Delete character.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  1.0.0
     *
     * @param  {string}  type  Type of character.
     * @param  {integer} index Character index.
     */
    const deleteCharacter = ( type, index ) => {
        type = `${type}s`;
        const characters = [ ...props.attributes[ type ] ].filter( function( character, charIndex ) {
            return charIndex !== index;
        }, index );
        setAttributes( {
            [ type ]: characters
        } );
    };

    return (
        <div className={ className }>
            <div className="characters">
                { isSelected && (
                    <>
                        <CharacterList
                            title={ __( 'Players', 'initiative-tracker' ) }
                            characters={ players }
                            addCharacter={ addCharacter }
                            editCharacter={ editCharacter }
                            deleteCharacter={ deleteCharacter }
                            type="player"
                            addText={ __( 'Add Player', 'initiative-tracker' ) }
                            editText={ __( 'Edit Player', 'initiative-tracker' ) }
                            active={ isSelected }
                        />
                        <CharacterList
                            title={ __( 'NPCs', 'initiative-tracker' ) }
                            characters={ npcs }
                            addCharacter={ addCharacter }
                            editCharacter={ editCharacter }
                            deleteCharacter={ deleteCharacter }
                            type="npc"
                            addText={ __( 'Add NPC', 'initiative-tracker' ) }
                            editText={ __( 'Edit NPC', 'initiative-tracker' ) }
                            active={ isSelected }
                        />
                    </>
                ) }
                { ! isSelected && (
                    <CharacterList
                        title={ __( 'Characters', 'initiative-tracker' ) }
                        characters={ [
                            ...players,
                            ...npcs,
                        ] }
                        active={ isSelected }
                    />
                ) }
            </div>
        </div>
    );
};

export default Edit;
