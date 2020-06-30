<?php
/**
 * Handle custom routing.
 *
 * @package Rave\InitiativeTracker
 * @author  R A Van Epps <rave@ravanepps.com>
 * @since   2.0.0
 */

namespace Rave\InitiativeTracker;

/**
 * Class Routes.
 *
 * @package Rave\InitiativeTracker
 * @author  R A Van Epps <rave@ravanepps.com>
 * @since   2.0.0
 */
class Routes {

	/**
	 * Array of custom routes.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 * @var    array
	 */
	private $routes = [];

	/**
	 * Route namespace.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 * @var    string
	 */
	private $namespace = 'rave-initiative';

	/**
	 * Init / return singleton.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @return Routes Routes instance.
	 */
	public static function init() : Routes {
		static $instance = null;

		if ( null === $instance ) {
			$instance = new Routes();
		}

		return $instance;
	}

	/**
	 * Initialize object.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 */
	private function __construct() {
		$this->register_hooks();
	}

	/**
	 * Register hooks.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 */
	private function register_hooks() {
		add_action( 'wp_enqueue_scripts', [ $this, 'localize_routes' ], 20 );
	}

	/**
	 * Localize script vars for REST routing.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 */
	public function localize_routes() {

		// Return nulled array if user doesn't have permission to access REST API.
		$has_access = $this->current_user_can_access_rest();

		$vars = [
			'nonce' => $has_access ? wp_create_nonce( 'wp_rest' ) : null,
		];

		wp_localize_script( 'initiative-tracker-frontend-script', 'initTracker', $vars );
	}

	/**
	 * Determine if current user has permissions to access REST API.
	 *
	 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool Whether current user can access REST API.
	 */
	private function current_user_can_access_rest() {
		if ( ! is_user_logged_in() ) {
			return false;
		}

		if ( current_user_can( 'edit_published_posts' ) ) {
			return true;
		}

		return is_singular() && is_author( get_current_user_id() );
	}
}

// Init Routes instance.
if ( ! is_admin() ) {
	Routes::init();
}
