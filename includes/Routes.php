<?php
/**
 * Handle custom routing.
 *
 * @package Rave\InitiativeTracker
 * @author  R A Van Epps <rave@ravanepps.com>
 * @since   2.0.0
 */

namespace Rave\InitiativeTracker;

use \WP_Block_Parser_Block;
use \WP_Error;
use \WP_REST_Request;
use \WP_REST_Response;
use \WP_REST_SERVER;

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
		$this->routes = [
			'initiative' => [
				'uses_id' => true,
				'version' => 1,
				'args'    => [
					'methods'             => WP_REST_SERVER::EDITABLE,
					'callback'            => [ $this, 'update_initiative' ],
					'permission_callback' => [ $this, 'check_initiative_permissions' ],
					'args'                => [],
				],
			],
		];
		$this->register_hooks();
	}

	/**
	 * Register hooks.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 */
	private function register_hooks() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'localize_routes' ], 20 );
	}

	/**
	 * Register routes.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 */
	public function register_routes() {
		array_map( [ $this, 'register_route' ], array_keys( $this->routes ) );
	}

	/**
	 * Localize script vars for REST routing.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 */
	public function localize_routes() {

		// Return nulled array if user doesn't have permission to access REST API.
		$has_access = $this->current_user_can_access_rest( get_the_ID() ?? 0 );

		$vars = [];

		foreach ( array_keys( $this->routes ) as $route ) {
			$vars[ $route ] = $has_access ? implode( $this->get_route_pieces( $route ) ) : null;
		}

		wp_localize_script( 'initiative-tracker-frontend-script', 'initTracker', $vars );
	}

	/**
	 * Check if current user has proper permissions to access initiative update route.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @param  WP_REST_Request $request WP_REST_Request object.
	 * @return bool                     Whether current user has proper permissions.
	 */
	public function check_initiative_permissions( WP_REST_Request $request ) : bool {
		return $this->current_user_can_access_rest( $request->get_param( 'id' ) ?? 0 );
	}

	/**
	 * Update initiative.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @param  WP_REST_Request $request  WP_REST_Request object.
	 * @return WP_Error|WP_REST_Response WP_REST_Response if data update successful, WP_Error otherwise.
	 */
	public function update_initiative( WP_REST_Request $request ) {
		$post_id      = $request->get_param( 'id' );
		$block_id     = $request->get_param( 'block_id' );
		$players      = $request->get_param( 'players' );
		$npcs         = $request->get_param( 'npcs' );
		$post_content = get_post_field( 'post_content', $post_id );
		$post_blocks  = parse_blocks( $post_content );

		// Update usage count for target block.
		$post_blocks = array_map( function( $block ) use ( $block_id, $players, $npcs ) {
			if ( 'rave/initiative-tracker' !== ( $block['blockName'] ?? '' ) || ( $block['attrs']['id'] ?? 0 ) !== $block_id ) {
				return $block;
			}

			$block['attrs']['players'] = $players;
			$block['attrs']['npcs']    = $npcs;

			return $block;
		}, $post_blocks );

		// Update post content.
		wp_update_post( [
			'ID'           => $post_id,
			'post_content' => serialize_blocks( $post_blocks ),
		] );

		return new WP_REST_Response( __( 'Initiative updated.', 'resource-tracker' ), 200 );
	}

	/**
	 * Register individual route.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @param string $route Route base.
	 */
	private function register_route( string $route ) {
		$route_pieces = $this->get_route_pieces( $route, false );
		$args         = $this->routes[ $route ]['args'] ?? [];

		register_rest_route( $route_pieces['namespace'], $route_pieces['route'], $args );
	}

	/**
	 * Get route pieces: versioned namespace and full route.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @param  string $route Route base.
	 * @param  bool   $plain Whether returned route should be plain, i.e., skip route arg handling.
	 * @return void|array    Route pieces if route exists.
	 */
	private function get_route_pieces( string $route, bool $plain = true ) {
		if ( ! array_key_exists( $route, $this->routes ) ) {
			return;
		}

		$options   = $this->routes[ $route ];
		$version   = $options['version'] ?? 1;
		$namespace = "{$this->namespace}/v{$version}";
		$route    .= ! $plain && $options['uses_id'] ? '/(?P<id>[\d]+)' : '';

		return [
			'namespace' => $namespace,
			'route'     => "/{$route}",
		];
	}

	/**
	 * Determine if current user has permissions to access REST API.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @param  int $post_id Post ID.
	 * @return bool         Whether current user can access REST API.
	 */
	private function current_user_can_access_rest( int $post_id = 0 ) {
		if ( ! is_user_logged_in() ) {
			return false;
		}

		if ( current_user_can( 'edit_published_posts' ) ) {
			return true;
		}

		$post = get_post( $post_id );

		if ( null === $post ) {
			return false;
		}

		return get_current_user_id() === $post->post_author;
	}
}

// Init Routes instance.
if ( ! is_admin() ) {
	Routes::init();
}
