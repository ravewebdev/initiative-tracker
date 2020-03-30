/**
 * WP dependencies
 */
const {
    blockEditor: {
        InspectorControls,
    },
    i18n: {
        __,
    },
} = wp;

/**
 * Components
 */
import CharacterList from './components/CharacterList';
import CharacterPanel from './components/CharacterPanel';

const Edit = ( props ) => {
    const {
        attributes: {
            players,
            npcs,
        },
        className,
        setAttributes,
    } = props;

    // Add new character.
    const addCharacter = ( type, character ) => {
        type = `${type}s`;
        setAttributes( {
            [ type ]: [ ...props.attributes[ type ], character ]
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
