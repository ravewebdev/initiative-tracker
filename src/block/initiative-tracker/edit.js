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
        useEffect,
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

    useEffect( () => {

        // If id is not set (initial block creation), set id to clientId value.
        if ( 0 === id.length ) {
            setAttributes( {
                id: clientId,
            } );
        }
    }, [] );

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
     * @author R A Van Epps <rave@ravanepps.com>
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
            index = null,
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
                <div className="edit-character-buttons">
                    { 'add' === action ? (
                        <Button
                            isPrimary
                            onClick={ () => toggleFn( type ) }
                        >
                            { __( 'Add Player', 'initiative-tracker' ) }
                        </Button>
                    ) : (
                        <>
                            <Button
                                className="edit-character"
                                isTertiary
                                onClick={ () => toggleFn( type ) }
                            >
                                <Dashicon icon="edit" /> { __( 'Edit', 'initiative-tracker' ) }
                            </Button>
                            <DeleteCharacterModal
                                index={ index }
                                deleteCharacter={ deleteCharacter }
                                name={ character.name }
                                type={ type }
                            />
                        </>
                    ) }
                </div>
            );
        }
    };

    /**
     * Display Add version of AddEditCharacterForm.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  2.0.0
     *
     * @param  {string}   type     Type of Character list being displayed.
     * @param  {boolean}  isAdding Whether currently in editing mode.
     * @param  {function} toggleFn Toggle function.
     * @return {ReactElement}      JSX to display.
     */
    const displayAddForm = ( type, isAdding, toggleFn ) => (
        displayAddEditForm( {
            type,
            characterFn: addCharacter,
            toggleFn: toggleFn,
            isActive: isAdding,
        } )
    );

    /**
     * Display Edit version of AddEditCharacterForm.
     *
     * @author R A Van Epps <rave@ravanepps.com>
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
                            addCharacter={ displayAddForm }
                            editCharacter={ displayEditForm }
                            type="player"
                        />
                        <CharacterList
                            title={ __( 'NPCs', 'initiative-tracker' ) }
                            characters={ npcs }
                            addCharacter={ displayAddForm }
                            editCharacter={ displayEditForm }
                            type="npc"
                        />
                    </>
                ) }
                { ! isSelected && (
                    <CharacterList
                        title={ __( 'Characters', 'initiative-tracker' ) }
                        characters={ sortCharacters( [
                            ...players,
                            ...npcs,
                        ], false ) }
                    />
                ) }
            </div>
        </div>
    );
};

export default Edit;
