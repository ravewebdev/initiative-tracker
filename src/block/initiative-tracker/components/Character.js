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
    components: {
		Dashicon,
        Button,
        TextControl,
	},
} = wp;

/**
 * Components
 */
import DeleteCharacterModal from './DeleteCharacterModal';
import AddEditCharacterForm from './AddEditCharacterForm';

export default class Character extends Component {
	constructor( props ) {
		super( props );
	
		this.state = {
			editing: false,
		}
	};

	render() {
		const {
			editing,
		} = this.state;

		const {
			character: {
				name,
				player,
				initiative,
			},
			type,
			index,
			editCharacter,
			deleteCharacter,
			editText,
			active,
			activeIndex,
		} = this.props;

		const onFrontend = ( undefined !== activeIndex ),
			isCurrent = ! onFrontend ? false : ( activeIndex === index );

		/**
		 * Handle character edits.
		 *
		 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
		 * @since  1.0.0
		 */
		const toggleEdit = () => {
			this.setState( {
				editing: ! editing
			} );
		};

		if ( editing ) {
			return (
				<AddEditCharacterForm
			 		type={ type}
			 		characterFn={ editCharacter }
			 		toggle={ toggleEdit }
			 		character={ {
			 			name,
			 			player,
			 			initiative,
			 			index,
			 		} }
			 	/>
			);
		}

		return (
			<li className={ `character ${ isCurrent ? 'current' : '' }` }>
				<span className="name">{ name }</span>

				&nbsp;

				{ ! active && (
					<span className="player">{ `( ${ '' === player ? 'NPC' : player } )`}</span>
				) }

				&nbsp;&mdash;&nbsp;

				{ onFrontend && (
					<TextControl
						className="initiative"
	                    type="number"
	                    value={ initiative }
	                    onChange={ ( newInitiative ) => {
	                    	editCharacter( {
	                    		name,
	                    		player,
	                    		initiative: newInitiative,
	                    	}, this.props.character );
	                    } }
	                />
				) }

				{ ! onFrontend && (
					<span className="initiative">{ initiative || 0 }</span>
				) }

				{ active && (
					<>
						<Button
							className="edit-character"
							isTertiary
							onClick={ toggleEdit }
						>
							<Dashicon icon="edit" />
						</Button>
						<DeleteCharacterModal
							index={ index }
							deleteCharacter={ deleteCharacter }
							name={ name }
							type={ type }
						/>
					</>
				) }
			</li>
		);
	};
}
