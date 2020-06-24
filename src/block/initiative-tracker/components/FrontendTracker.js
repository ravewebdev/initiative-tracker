/**
 * Display Initiative Tracker on frontend.
 */
const {
	i18n: {
        __,
    },
    element: {
    	useState,
    	useEffect,
    }
} = wp;

import CharacterList from './CharacterList';

const FrontendTracker = ( props ) => {
	const {
		dataAttributes,
		className,
	} = props;

	const [ attributes, setAttributes ] = useState( {
		players: [],
		npcs: [],
	} );

	const {
		players,
		npcs,
	} = attributes;

	// Set initial attribute values from props.
	useEffect( () => {
		setAttributes( {
			...dataAttributes,
		} );
	}, [] );

	return (
		<div className={ className }>
            <div className="characters">
				<CharacterList
		            title={ __( 'Characters', 'initiative-tracker' ) }
		            characters={ [
		                ...players,
		                ...npcs,
		            ] }
		            active={ false }
		        />
		        <button type="button" className="next-character">
					&raquo; { __( 'Next Character', 'initiative-tracker' ) }
				</button>
            </div>
        </div>
	);
};

export default FrontendTracker;
