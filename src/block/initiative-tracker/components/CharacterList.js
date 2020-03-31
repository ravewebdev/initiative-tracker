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
			title,
			characters,
			type,
			addCharacter,
			deleteCharacter,
			addText,
		} = this.props;
		const {
			adding,
		} = this.state;

		const toggleAdd = () => {
			this.setState( {
				adding: ! adding
			} );
		};
		
		return (
			<div className={ `character-list--${type}` }>
				<h2>{ title }</h2>

				{ characters.length && (
					<ul>
						{ characters.map( ( character, index ) => (
							<Character characterName={ character.name } type={ type } index={ index } deleteCharacter={ deleteCharacter } />
						) ) }
					</ul>
				) }

				{ ! adding && (
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
				) }

				{ adding && (
					<AddEditCharacterForm
						type={ type}
						addCharacter={ addCharacter }
						addText={ addText }
						toggle={ toggleAdd }
					/>
				) }
			</div>
		);
	};
}
