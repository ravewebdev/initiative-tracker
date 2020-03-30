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
    const playerLabel       = __( 'Player', 'rave-rpg-initiative' );
    const playerLabelPlural = __( 'Players', 'rave-rpg-initiative' );
    const npcLabel          = __( 'NPC', 'rave-rpg-initiative' );
    const npcLabelPlural    = __( 'NPCs', 'rave-rpg-initiative' );
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

    return [
        <InspectorControls>
            <CharacterPanel
                type='player'
                title={ playerLabelPlural }
                buttonText={ playerLabel }
                addCharacter={ addCharacter }
                characters={ players }
            />
            <CharacterPanel
                type='npc'
                title={ npcLabelPlural }
                buttonText={ npcLabel }
                addCharacter={ addCharacter }
                characters={ npcs }
            />
        </InspectorControls>,
        <div className={ className }>
            <CharacterList
                title={ playerLabelPlural }
                characters={ players }
                addCharacter={ addCharacter }
                type="player"
            />
            <CharacterList
                title={ npcLabelPlural }
                characters={ npcs }
                addCharacter={ addCharacter }
                type="npc"
            />
        </div>
    ];
};

export default Edit;
