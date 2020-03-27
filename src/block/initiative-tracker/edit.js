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
        setAttributes( {
            [ type ]: [ ...props.attributes[ type ], character ]
        } );
    };

    return [
        <InspectorControls>
            <CharacterPanel
                type='player'
                title={ __( 'Players', 'rave-rpg-initiative' ) }
                buttonText={ __( 'Player', 'rave-rpg-initiative' ) }
                addCharacter={ addCharacter }
                characters={ players }
            />
            <CharacterPanel
                type='npc'
                title={ __( 'NPCs', 'rave-rpg-initiative' ) }
                buttonText={ __( 'NPC', 'rave-rpg-initiative' ) }
                addCharacter={ addCharacter }
                characters={ npcs }
            />
        </InspectorControls>,
        <div className={ className }>
            <CharacterList
                title={ __( 'Players', 'rave-rpg-initiative' ) }
                characters={ players }
                type="player"
            />
            <CharacterList
                title={ __( 'NPCs', 'rave-rpg-initiative' ) }
                characters={ npcs }
                type="npc"
            />
        </div>
    ];
};

export default Edit;
