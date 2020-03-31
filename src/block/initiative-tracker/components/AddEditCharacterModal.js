/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
    components: {
        Button,
        Modal,
    },
    element: {
    	useState,
    },
} = wp;

/**
 * Components
 */
import AddEditCharacterForm from './AddEditCharacterForm';

const AddEditCharacterModal = ( props ) => {
	const {
		type,
		addCharacter,
		addText,
	} = props;
	const [ isOpen, setOpen ] = useState( false );
	const toggle = () => {
		setOpen( isOpen ? false : true );
	};

	return (
		<>
			<Button
	            isPrimary
	            onClick={ toggle }
			>
				{ addText }
			</Button>
			{ isOpen && (
				<Modal
					title={ addText }
					onRequestClose={ toggle }
				>
					<AddEditCharacterForm
						type={ type}
						addCharacter={ addCharacter }
						toggle={ toggle }
						addText={ addText }
					/>
				</Modal>
			) }
		</>
	);
}

export default AddEditCharacterModal;
