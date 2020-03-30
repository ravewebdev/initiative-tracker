/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
    blockEditor: {
        RichText,
    }
} = wp;

/**
 * Components
 */
import CharacterList from './components/CharacterList';

const Edit = ( props ) => {
    const {
        attributes: {
            notes,
            players,
            npcs,
        },
        className,
        setAttributes,
    } = props;

    // Add combat notes.
    const onChangeNotes = ( notes ) => {
        setAttributes( {
            notes
        } );
    };

    // Add new character, sort alphabetically.
    const addCharacter = ( type, character ) => {
        type = `${type}s`;
        const characters = [ ...props.attributes[ type ], character ];
        characters.sort( function( char1, char2 ) {
            return char1.name.localeCompare( char2.name );
        } );
        setAttributes( {
            [ type ]: characters
        } );
    };

    // Delete character.
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
            <h2>Combat Notes</h2>
            <RichText
                tagName="div"
                multiline="p"
                className="notes"
                placeholder={ __( 'Enter notes about this combat here...', 'rave-rpg-initiative' ) }
                keepPlaceholderOnFocus={ true }
                onChange={ onChangeNotes }
                value={ notes }
            />
            <div className="characters">
                <CharacterList
                    title={ __( 'Players', 'rave-rpg-initiative' ) }
                    characters={ players }
                    addCharacter={ addCharacter }
                    deleteCharacter={ deleteCharacter }
                    type="player"
                    addText={ __( 'Add Player', 'rave-rpg-initiative' ) }
                />
                <CharacterList
                    title={ __( 'NPCs', 'rave-rpg-initiative' ) }
                    characters={ npcs }
                    addCharacter={ addCharacter }
                    deleteCharacter={ deleteCharacter }
                    type="npc"
                    addText={ __( 'Add NPC', 'rave-rpg-initiative' ) }
                />
            </div>
        </div>
    );
};

export default Edit;
