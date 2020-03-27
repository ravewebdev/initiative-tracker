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
	} = props;
	const [ isOpen, setOpen ] = useState( false );
	const toggle = () => {
		setOpen( isOpen ? false : true );
	};

	return (
		<>
			<Button
				className="is-button is-primary"
	            isPrimary
	            onClick={ toggle }
			>
				+ Add
			</Button>
			{ isOpen && (
				<Modal
					title="Add New"
					onRequestClose={ toggle }
				>
					<AddEditCharacterForm
						type={ type}
						addCharacter={ addCharacter }
						toggle={ toggle }
					/>
				</Modal>
			) }
		</>
	);
}

export default AddEditCharacterModal;
