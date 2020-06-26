/**
 * EDIT: Initiative Tracker Block
 */

import AddEditCharacterForm from './components/AddEditCharacterForm';
import CharacterList from './components/CharacterList';
import DeleteCharacterModal from './components/DeleteCharacterModal';
import { sortCharacters } from './util';

const {
    i18n: {
        __,
    },
    components: {
        Button,
        Dashicon,
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
            isActive,
            character = null,
            index = 0,
        } = fnProps;

        const formProps = {
            type,
            characterFn,
            toggle: () => toggleFn( type ),
        };

        if ( 'edit' === action ) {
            formProps.character = character;
            formProps.index = index;
        }

        if ( isActive ) {
            return (
                <AddEditCharacterForm { ...formProps }/>
            );
        } else {
            return (
                'add' === action ?
                    <div className="edit-character-buttons">
                        <Button
                            isPrimary
                            onClick={ () => toggleFn( type ) }
                        >
                            { __( 'Add Player', 'initiative-tracker' ) }
                        </Button>
                    </div> :
                    <>
                        <Button
                            className="edit-character"
                            isTertiary
                            onClick={ () => toggleFn( type ) }
                        >
                            <Dashicon icon="edit" />
                        </Button>
                        <DeleteCharacterModal
                            index={ index }
                            deleteCharacter={ deleteCharacter }
                            name={ character.name }
                            type={ type }
                        />
                    </>
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
            isActive: isAdding[ type ],
        } )
    );

    /**
     * Display Edit version of AddEditCharacterForm.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  2.0.0
     *
     * @param  {string}   type      Type of Character list being displayed.
     * @param  {boolean}  isEditing Whether currently in editing mode.
     * @param  {function} toggleFn  Toggle function.
     * @param  {Object}   character Character object.
     * @param  {integer}  index     Character index.
     * @return {ReactElement}       JSX to display.
     */
    const displayEditForm = ( type, isEditing, toggleFn, character, index ) => (
        displayAddEditForm( {
            type,
            characterFn: editCharacter,
            toggleFn,
            isActive: isEditing,
            character,
            index,
        }, 'edit' )
    );

    return (
        <div className={ className }>
            <div className="characters">
                { isSelected && (
                    <>
                        <CharacterList
                            title={ __( 'Players', 'initiative-tracker' ) }
                            characters={ players }
                            editCharacter={ displayEditForm }
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
                            editCharacter={ displayEditForm }
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
