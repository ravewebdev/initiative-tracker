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
                type='players'
                title={ __( 'Players', 'rave-rpg-initiative' ) }
                buttonText={ __( 'Player', 'rave-rpg-initiative' ) }
                addCharacter={ addCharacter }
            />
            <CharacterPanel
                type='npcs'
                title={ __( 'NPCs', 'rave-rpg-initiative' ) }
                buttonText={ __( 'NPC', 'rave-rpg-initiative' ) }
                addCharacter={ addCharacter }
            />
        </InspectorControls>,
        <div className={ className }>
            <CharacterList
                title={ __( 'Players', 'rave-rpg-initiative' ) }
                className="character-list--players"
                characters={ players }
            />
            <CharacterList
                title={ __( 'NPCs', 'rave-rpg-initiative' ) }
                className="character-list--npcs"
                characters={ npcs }
            />
        </div>
    ];
};

export default Edit;
