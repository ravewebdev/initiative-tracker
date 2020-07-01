/**
 * Display Initiative Tracker on frontend.
 */

/* global initTracker */

import CharacterList from './CharacterList';
import { sortCharacters } from '../util';

const {
	apiFetch,
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

	// Handle loading state.
	const [ isLoading, setLoading ] = useState( false );

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
	            	editCharacter( {
	            		...character,
	            		initiative,
	            	}, character );
	            } }
	            onBlur={ () => {
	            	const initiative = parseInt( character.initiative, 10 );

	            	// Reset initiative to 0 if not a number or less than 0.
	            	if ( isNaN( initiative ) || 0 > initiative ) {
	            		editCharacter( {
		            		...character,
		            		initiative: 0,
		            	}, character );
	            	}
	            } }
	            min="0"
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
    	const linkClass = `char-link ${ isLoading ? 'disabled' : '' }`;

    	if ( ! isEditing ) {
    		return displayEditLink( linkClass, 'edit', __( 'Edit Initiative', 'initiative-tracker' ), () => setIsEditing( true ) );
    	}

    	return (
    		<>
    			{ displayEditLink( linkClass, 'no', __( 'Cancel', 'initiative-tracker' ), () => {
	                resetAttributes();
    				setIsEditing( false );
    			} ) }
    			{ displayEditLink( linkClass, 'yes', __( 'Save Initiative', 'initiative-tracker' ), () => saveCharacterUpdates() ) }
    		</>
    	);
    };

    /**
     * Display edit/save link.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  2.0.0
     *
     * @param  {string}   linkClass Link class(es).
     * @param  {string}   icon      Dashicon icon.
     * @param  {string}   label     Link label text.
     * @param  {function} clickFn   Functionality to call on link click.
     * @return {ReactElement}       Link JSX.
     */
    const displayEditLink = ( linkClass, icon, label, clickFn ) => {
    	return (
    		<a
        		href="#"
                className={ linkClass }
                onClick={ ( event ) => {
                	event.preventDefault();

                	// Stop here if currently in loading state.
                	if ( isLoading ) {
                		return false;
                	}

                	clickFn();
                } }
            >
                <Dashicon icon={ icon } /> { label }
            </a>
    	);
    };

    /**
     * Update block attributes.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  2.0.0
     *
     * @return {void}
     */
    const saveCharacterUpdates = async () => {
    	const path = initTracker.initiative;

    	if ( null === path ) {
    		return;
    	}

		setLoading( true );

    	const response = await apiFetch( {
    		path: `${path}/${ dataAttributes.post_id }`,
    		method: 'POST',
    		data: {
    			...attributes,
    		},
    	} )
    		.then( ( success ) => success )
			.catch( ( error ) => error );

		// Update dataAttributes to reflect changes.
    	dataAttributes.players = [ ...players ];
    	dataAttributes.npcs = [ ...npcs ];

		setIsEditing( false );
		setLoading( false );
    };

	return (
		<div className={ `${ className } ${ isLoading ? 'is-loading' : '' }` }>
            <div className="characters">
				<CharacterList
		            title={ __( 'Characters', 'initiative-tracker' ) }
		            characters={ characters }
		            editCharacter={ displayEditForm }
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
					disabled={ isLoading }
		        >
					&raquo; { __( 'Next Character', 'initiative-tracker' ) }
				</button>
            </div>
        </div>
	);
};

export default FrontendTracker;
