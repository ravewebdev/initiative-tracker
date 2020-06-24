/**
 * WP dependencies
 */
const {
    components: {
        Button,
    },
    element: {
        Component,
    },
} = wp;

/**
 * Components
 */
import Character from './Character';
import AddEditCharacterForm from './AddEditCharacterForm';

export default class CharacterList extends Component {
	constructor( props ) {
		super( props );
	
		this.state = {
			adding: false,
		};
	};

	render() {
		const {
			adding,
		} = this.state;
		const {
			title,
			characters,
			type,
			addCharacter,
			editCharacter,
			deleteCharacter,
			addText,
			editText,
			active,
			activeIndex,
		} = this.props;

		const isAdminActive = active && undefined === activeIndex;

		const toggleAdd = () => {
			this.setState( {
				adding: ! adding
			} );
		};

		// Sort characters by initiative if combined list is displayed.
		if ( ! active ) {
			characters.sort( function( char1, char2 ) {
				return ( parseInt( char1.initiative ) > parseInt( char2.initiative ) ? -1 : 1 );
			} );
		}
		
		return (
			<div className={ `character-list${ typeof type === 'undefined' ? '' : `--${type}` }` }>
				<h2>{ title }</h2>

				{ characters.length > 0 && (
					<ul>
						{ characters.map( ( character, index ) => (
							isAdminActive ?
								<Character
									character={ character }
									type={ type }
									index={ index }
									editCharacter={ editCharacter }
									deleteCharacter={ deleteCharacter }
									editText={ editText }
									active={ active }
								/> :
								<Character
									character={ character }
									index={ index }
									editCharacter={ editCharacter }
									active={ active }
									activeIndex={ activeIndex }
								/>
						) ) }
					</ul>
				) }

				{ isAdminActive && (
					adding ?
						<AddEditCharacterForm
							type={ type}
							characterFn={ addCharacter }
							toggle={ toggleAdd }
						/> :
						<div className="edit-character-buttons">
							<Button
					            isPrimary
					            onClick={ () => {
					            	this.setState( {
					            		adding: true
					            	} );
					            } }
							>
								{ addText }
							</Button>
						</div>
				) }
			</div>
		);
	};
}
