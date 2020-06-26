/**
 * EDIT: Initiative Tracker Block
 */

import AddEditCharacterForm from './components/AddEditCharacterForm';
import CharacterList from './components/CharacterList';
import { sortCharacters } from './util';

const {
    i18n: {
        __,
    },
    components: {
        Button,
    },
    element: {
        useState,
    },
} = wp;

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

    // Handle adding character state.
    const [ isAdding, setIsAdding ] = useState( {
        player: false,
        npc: false,
    } );

    /**
     * Toggle adding state.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  1.0.0
     * @since  2.0.0 Added type param.
     *
     * @param  {string} type Type of character.
     */
    const toggleAdding = ( type ) => {
        setIsAdding( {
            ...isAdding,
            [ type ]: ! isAdding[ type ],
        } );
    };

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

    /**
     * Display AddEditCharacterForm component.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  2.0.0
     *
     * @param  {Object} fnProps Props to pass to componenent.
     * @param  {string} action  Version of form to display.
     * @return {ReactElement}   JSX to display.
     */
    const displayAddEditForm = ( fnProps, action = 'add' ) => {
        const {
            type,
            characterFn,
            toggleFn,
        } = fnProps;

        if ( 'add' === action ) {
            return (
                isAdding[ type ] ?
                    <AddEditCharacterForm
                        type={ type }
                        characterFn={ characterFn }
                        toggle={ () => toggleFn( type ) }
                    /> :
                    <div className="edit-character-buttons">
                        <Button
                            isPrimary
                            onClick={ () => {
                                toggleFn( type );
                            } }
                        >
                            { __( 'Add Player', 'initiative-tracker' ) }
                        </Button>
                    </div>
            );
        }
    };

    /**
     * Display Add version of AddEditCharacterForm.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  2.0.0
     *
     * @param  {string} type  Type of Character list being displayed.
     * @return {ReactElement} JSX to display.
     */
    const displayAddForm = ( type ) => (
        displayAddEditForm( {
            type,
            characterFn: addCharacter,
            toggleFn: toggleAdding,
        } )
    );

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
                        >
                            { displayAddForm( 'player' ) }
                        </CharacterList>
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
                        >
                            { displayAddForm( 'npc' ) }
                        </CharacterList>
                    </>
                ) }
                { ! isSelected && (
                    <CharacterList
                        title={ __( 'Characters', 'initiative-tracker' ) }
                        characters={ sortCharacters( [
                            ...players,
                            ...npcs,
                        ], false ) }
                        active={ isSelected }
                    />
                ) }
            </div>
        </div>
    );
};

export default Edit;
