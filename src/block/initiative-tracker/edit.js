/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
} = wp;

/**
 * Components
 */
import CharacterList from './components/CharacterList';

const Edit = ( props ) => {
    const {
        attributes: {
            players,
            npcs,
        },
        className,
        setAttributes,
    } = props;

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

    return (
        <div className={ className }>
            <CharacterList
                title={ __( 'Players', 'rave-rpg-initiative' ) }
                characters={ players }
                addCharacter={ addCharacter }
                type="player"
                addText={ __( 'Add Player', 'rave-rpg-initiative' ) }
            />
            <CharacterList
                title={ __( 'NPCs', 'rave-rpg-initiative' ) }
                characters={ npcs }
                addCharacter={ addCharacter }
                type="npc"
                addText={ __( 'Add NPC', 'rave-rpg-initiative' ) }
            />
        </div>
    );
};

export default Edit;
