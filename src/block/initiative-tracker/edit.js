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
        isSelected
    } = props;

    // Add combat notes.
    const onChangeNotes = ( notes ) => {
        setAttributes( {
            notes
        } );
    };

    const sortCharacters = ( characters ) => {
        characters.sort( function( char1, char2 ) {
            return char1.name.localeCompare( char2.name );
        } );
        return characters;
    }

    // Add new character, sort alphabetically.
    const addCharacter = ( type, character ) => {
        type = `${type}s`;
        const characters = [ ...props.attributes[ type ], character ];
        setAttributes( {
            [ type ]: sortCharacters( characters )
        } );
    };

    // Edit character.
    const editCharacter = ( type, index, character ) => {
        type = `${type}s`;
        const characters = [ ...props.attributes[ type ] ];
        characters[ index ] = character;
        setAttributes( {
            [ type ]: sortCharacters( characters )
        } );
    }

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
            <h2>{ __( 'Combat Notes', 'initiative-tracker' ) }</h2>
            <RichText
                tagName="div"
                multiline="p"
                className="notes"
                placeholder={ __( 'Enter notes about this combat here...', 'initiative-tracker' ) }
                keepPlaceholderOnFocus={ true }
                onChange={ onChangeNotes }
                value={ notes }
            />
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
