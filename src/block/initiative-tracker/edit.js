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
    components: {
        PanelBody,
        PanelRow,
    }
} = wp;

/**
 * Components
 */
import CharacterList from './components/CharacterList';
import AddCharacterButton from './components/AddCharacterButton';

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
    const addCharacter = ( type ) => {
        // console.log( type );
        // console.log( ...[ type ] );
        setAttributes( {
            [ type ]: [ ...props.attributes[ type ], {} ]
        } );
    };

    return [
        <InspectorControls>
            <PanelBody title={ __( 'Players', 'rave-rpg-initiative' ) }>
                <PanelRow>
                    <AddCharacterButton
                        type='players'
                        buttonText={ __( 'Player' ) }
                        addCharacter={ addCharacter }
                    />
                </PanelRow>
            </PanelBody>
        </InspectorControls>,
        <div className={ className }>
            {/*{console.log( 'players', players )}*/}
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
