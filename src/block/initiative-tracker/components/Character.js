/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
    element: {
        Component,
    },
} = wp;

export default class Character extends Component {
	constructor( props ) {
		super( props )
	
		this.state = {
			editing: false,
		}
	}

	render() {
		const {
			editing,
		} = this.state;
		const {
			characterName,
			playerName,
			type,
		} = this.props;

		{ editing && (
			<div className="edit-character">
				<TextControl
					label={ __( 'Character Name', 'rave-rpg-initiative' ) }
				/>
				{ 'player' === type && (
					<TextControl
						label={ __( 'Player Name', 'rave-rpg-initiative' ) }
					/>
				) }
			</div>
		) }

		return (
			<div className="character">
				<span className="character-name">{ characterName }</span>
			</div>
		);
	}
}
