/**
 * Add/Edit Character Form.
 */

const {
    i18n: {
        __,
    },
    components: {
        Button,
        TextControl,
    },
    element: {
        Component,
        useEffect,
        useState,
    },
} = wp;

/**
 * Add/Edit Character form.
 *
 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
 * @since  1.0.0
 * @since  2.0.0 Converted to functional component.
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const AddEditCharacterForm = ( props ) => {
    const {
        type,
        characterFn,
        toggle,
        character,
        index,
    } = props;

    const [ state, setState ] = useState( {
        name: null,
        player: null,
        initiative: 0,
        nameIsEmpty: true,
        playerIsEmpty: true,
        editing: false,
    } );

    // Set initial state values.
    useEffect( () => {
        if ( undefined === character ) {
            return;
        }

        setState( {
            ...state,
            ...character,
            nameIsEmpty: false,
            playerIsEmpty: false,
            editing: true,
        } );
    }, [] );

    const {
        name,
        player,
        initiative,
        nameIsEmpty,
        playerIsEmpty,
        editing,
    } = state;

    const errorClass = 'input-error',
        isPlayer = 'player' === type,
        disableSave = ( isPlayer && playerIsEmpty ) || nameIsEmpty;

    return (
        <div className="edit-character-form">
            <TextControl
                label={ __( 'Character Name *', 'initiative-tracker' ) }
                value={ nameIsEmpty ? '' : name }
                onChange={ ( name ) => {
                    setState( {
                        ...state,
                        name,
                        nameIsEmpty: ( "" === name.trim() ),
                    } );
                } }
                className={ null !== name && nameIsEmpty ? errorClass : '' }
            />
            { isPlayer && (
                <TextControl
                    label={ __( 'Player Name *', 'initiative-tracker' ) }
                    value={ playerIsEmpty ? '' : player }
                    onChange={ ( player ) => {
                        setState( {
                            ...state,
                            player,
                            playerIsEmpty: ( "" === player.trim() ),
                        } );
                    } }
                    className={ null !== player && playerIsEmpty ? errorClass : '' }
                />
            ) }
            <TextControl
                label={ __( 'Initiative', 'initiative-tracker' ) }
                type="number"
                value={ initiative }
                onChange={ ( initiative ) => {
                    setState( {
                        ...state,
                        initiative,
                    } );
                } }
            />
            <div className="edit-character-buttons">
                <Button
                    isSecondary
                    onClick={ toggle }
                >
                    { __( 'Cancel', 'initiative-tracker' ) }
                </Button>
                <Button
                    isPrimary
                    disabled={ disableSave }
                    onClick={ () => {
                        const tmpCharacter = {
                            ...character,
                            name: name.trim(),
                            player: ( isPlayer ? player.trim() : '' ),
                            initiative,
                        };

                        if ( editing ) {
                            characterFn( type, index, tmpCharacter );
                        } else {
                            characterFn( type, tmpCharacter );
                        }
                        toggle();
                    } }
                >
                    { __( 'Save', 'initiative-tracker' ) }
                </Button>
            </div>
        </div>
    );
};

export default AddEditCharacterForm;
