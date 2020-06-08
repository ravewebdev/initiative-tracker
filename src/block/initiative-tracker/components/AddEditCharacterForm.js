/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
    components: {
        TextControl,
        Button,
    },
    element: {
        Component,
    },
} = wp;

export default class AddEditCharacterForm extends Component {
    constructor( props ) {
        super( props )
    
        this.state = {
            name: null,
            player: null,
            initiative: 0,
            nameIsEmpty: true,
            playerIsEmpty: true,
            editing: false,
            index: null,
        };
    };

    componentDidMount() {
        // Populate existing character values when in edit mode.
        if ( this.props.hasOwnProperty( 'character' ) ) {
            const {
                character: {
                    name,
                    player,
                    initiative,
                    index,
                },
                type,
            } = this.props;

            this.setState( {
                nameIsEmpty: false,
                playerIsEmpty: false,
                editing: true,
                name,
                player,
                index,
                initiative
            } );
        }
    };

    render() {
        const {
            name,
            player,
            initiative,
            nameIsEmpty,
            playerIsEmpty,
            editing,
            index,
        } = this.state;
        const {
            type,
            characterFn,
            toggle,
        } = this.props;
        const errorClass = 'input-error';
        const isPlayer = 'player' === type;
        const disableSave = ( isPlayer && playerIsEmpty ) || nameIsEmpty;

        return (
            <div className="edit-character-form">
                <TextControl
                    label={ __( 'Character Name *', 'initiative-tracker' ) }
                    value={ name }
                    onChange={ ( name ) => {
                        this.setState( {
                            name,
                            nameIsEmpty: ( "" === name.trim() )
                        } );
                    } }
                    className={ null !== name && nameIsEmpty ? errorClass : '' }
                />
                { isPlayer && (
                    <TextControl
                        label={ __( 'Player Name *', 'initiative-tracker' ) }
                        value={ player }
                        onChange={ ( player ) => {
                            this.setState( {
                                player,
                                playerIsEmpty: ( "" === player.trim() )
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
                        this.setState( {
                            initiative
                        } )
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
    }
}
