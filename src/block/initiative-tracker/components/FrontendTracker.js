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
        TextControl,
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

	// Whether actively editing initiative.
	const [ isEditing, setIsEditing ] = useState( false );

	// Set initial attribute values from props.
	useEffect( () => {
		resetAttributes();
	}, [] );

	/**
	 * Reset state attributes to original dataAttributes.
	 *
	 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
	 * @since  2.0.0
	 */
	const resetAttributes = () => {
		setAttributes( {
			...dataAttributes,
		} );
	}

	// Sort characters: alphabetical if editing, by initiative otherwise.
	const characters = isEditing ? [
		...sortCharacters( players ),
		...sortCharacters( npcs ),
	] : sortCharacters( [
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

    /**
     * Display input to edit Initiative.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  2.0.0
     *
     * @param  {Object} character Character object.
     * @return {?ReactElement}    Text input JSX.
     */
    const displayEditForm = ( character ) => {
    	if ( ! isEditing ) {
    		return null;
    	}

    	return (
	    	<TextControl
				className="initiative"
	            type="number"
	            value={ character.initiative }
	            onChange={ ( initiative ) => {
	            	console.log( 'initiative', initiative );
	            	/*editCharacter( {
	            		...props.character,
	            		initiative,
	            	}, props.character );*/
	            } }
	        />
		);
    };

    /**
     * Display edit/save Character links.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  2.0.0
     *
     * @return {ReactElement} Character link JSX.
     */
    const displayEditLinks = () => {
    	const linkClass = 'char-link';

    	if ( ! isEditing ) {
    		return (
    			<a
	        		href="#"
	                className={ linkClass }
	                onClick={ ( event ) => {
	                	event.preventDefault();
	                	setIsEditing( true );
	                } }
	            >
	                <Dashicon icon="edit" /> { __( 'Edit Initiative', 'initiative-tracker' ) }
	            </a>
    		);
    	}

    	return (
    		<>
    			<a
	        		href="#"
	                className={ linkClass }
	                onClick={ ( event ) => {
	                	event.preventDefault();
	                	setIsEditing( false );
	                } }
	            >
	                <Dashicon icon="no" /> { __( 'Cancel', 'initiative-tracker' ) }
	            </a>
    			<a
	        		href="#"
	                className={ linkClass }
	                onClick={ ( event ) => {
	                	event.preventDefault();
	                	setIsEditing( false );
	                } }
	            >
	                <Dashicon icon="yes" /> { __( 'Save Initiative', 'initiative-tracker' ) }
	            </a>
    		</>
    	);
    };

	return (
		<div className={ className }>
            <div className="characters">
				<CharacterList
		            title={ __( 'Characters', 'initiative-tracker' ) }
		            characters={ characters }
		            editCharacter={ displayEditForm }
		            active={ active }
		            activeIndex={ activeIndex }
		        >
		        	<div className="fe-edit-character-buttons">
		        		{ displayEditLinks() }
		        	</div>
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
