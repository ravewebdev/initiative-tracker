/**
 * Display Initiative Tracker on frontend.
 */

/* global initTracker */

import CharacterList from './CharacterList';
import { sortCharacters } from '../util';

const {
	i18n: {
        __,
    },
    components: {
        Dashicon,
    },
    element: {
    	useEffect,
    	useState,
    }
} = wp;

/**
 * Frontend Initiative Tracker.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const FrontendTracker = ( props ) => {
	const {
		dataAttributes,
		className,
	} = props;

	// Block attributes.
	const [ attributes, setAttributes ] = useState( {
		block_id: 0,
		players: [],
		npcs: [],
	} );

	const {
		players,
		npcs,
	} = attributes;

	// Currently active character by index.
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	// Whether actively editing a character.
	const [ active, setActive ] = useState( false );

	// Set initial attribute values from props.
	useEffect( () => {
		setAttributes( {
			...dataAttributes,
		} );
	}, [] );

	const characters = sortCharacters( [
        ...players,
        ...npcs,
    ], false );

	/**
     * Edit character attributes on frontend.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  2.0.0
     *
     * @param  {Object} newCharacter Modified character object.
     * @param  {Object} character    Original character object.
     */
    const editCharacter = ( newCharacter, character ) => {
    	const type = 0 === character.player.trim().length ? 'npcs' : 'players',
    		newCharacters = [ ...attributes[ type ] ],
    		index = newCharacters.indexOf( character );
    	
    	newCharacters[ index ] = newCharacter;

        setAttributes( {
        	...attributes,
            [ type ]: newCharacters,
        } );
    }

	return (
		<div className={ className }>
            <div className="characters">
				<CharacterList
		            title={ __( 'Characters', 'initiative-tracker' ) }
		            characters={ characters }
		            // editCharacter={ editCharacter }
		            setActive={ setActive }
		            active={ active }
		            activeIndex={ activeIndex }
		        >
		        	<a
	            		href=""
	                    className="fe-edit-character"
	                    onClick={ ( event ) => {
	                    	event.preventDefault();
	                    } }
	                >
	                    <Dashicon icon="edit" /> { __( 'Edit Initiative', 'initiative-tracker' ) }
	                </a>
		        </CharacterList>

		        <button
		        	type="button"
		        	className="next-character"
		        	onClick={ () => {
		        		const newIndex = activeIndex + 1;

		        		setActiveIndex( newIndex >= characters.length ? 0 : newIndex );
		        	} }
		        >
					&raquo; { __( 'Next Character', 'initiative-tracker' ) }
				</button>
            </div>
        </div>
	);
};

export default FrontendTracker;
