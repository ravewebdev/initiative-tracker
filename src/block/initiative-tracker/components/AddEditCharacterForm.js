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
        }
    };

    render() {
        const {
            name,
            player,
            initiative,
            nameIsEmpty,
            playerIsEmpty,
        } = this.state;
        const {
            type,
            addCharacter,
            toggle,
            addText,
        } = this.props;
        const errorClass = 'input-error';

        return (
            <>
                <TextControl
                    label={ __( 'Character Name *', 'rave-rpg-initiative' ) }
                    value={ name }
                    onChange={ ( name ) => {
                        name = name.trim();
                        this.setState( {
                            name,
                            nameIsEmpty: ( "" === name )
                        } );
                    } }
                    className={ null !== name && nameIsEmpty ? errorClass : '' }
                />
                { 'player' === type && (
                    <TextControl
                        label={ __( 'Player Name *', 'rave-rpg-initiative' ) }
                        value={ player }
                        onChange={ ( player ) => {
                            player = player.trim();
                            this.setState( {
                                player,
                                playerIsEmpty: ( "" === player )
                            } );
                        } }
                        className={ null !== player && playerIsEmpty ? errorClass : '' }
                    />
                ) }
                <TextControl
                    label={ __( 'Initiative', 'rave-rpg-initiative' ) }
                    type="number"
                    value={ initiative }
                    onChange={ ( initiative ) => {
                        this.setState( {
                            initiative
                        } )
                    } }
                />
                <Button
                    className="is-button is-secondary"
                    isSecondary
                    onClick={ toggle }
                >
                    { __( 'Cancel', 'rave-rpg-initiative' ) }
                </Button>
                <Button
                    className="is-button is-primary"
                    isPrimary
                    disabled={ ( nameIsEmpty || playerIsEmpty ) }
                    onClick={ () => {
                        addCharacter( type, {
                            name,
                            player,
                            initiative,
                        } );
                        toggle();
                    } }
                >
                    { addText }
                </Button>
            </>
        );
    }
}
