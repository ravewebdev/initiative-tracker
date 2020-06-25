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

const AddEditCharacterForm = ( props ) => {
    const {
        type,
        characterFn,
        toggle,
        character,
    } = props;

    const [ state, setState ] = useState( {
        name: null,
        player: null,
        initiative: 0,
        nameIsEmpty: true,
        playerIsEmpty: true,
        editing: false,
        index: null,
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
        index,
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
                        if ( editing ) {
                            characterFn( type, index, {
                                name: name.trim(),
                                player: ( isPlayer ? player.trim() : '' ),
                                initiative,
                            } );
                        } else {
                            characterFn( type, {
                                name: name.trim(),
                                player: ( isPlayer ? player.trim() : '' ),
                                initiative,
                            } );
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
