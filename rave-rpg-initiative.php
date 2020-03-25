<?php
/**
 * Plugin Name:     TTRPG Initiative Helper
 * Description:     This block helps track and organize player initiative scores.
 * Version:         0.1.0
 * Author:          R A Van Epps
 * Author URI:      https://ravanepps.com
 * License:         GPL-2.0-or-later
 * Text Domain:     rave-rpg-initiative
 *
 * @package         rave-rpg-initiative
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 *
 * @throws Error Throw error if assets not compiled.
 */
function rave_rpg_initiative_rave_rpg_initiative_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "rave-rpg/initiative-tracker" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'rave-rpg-initiative-tracker-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$editor_css = 'editor.css';
	wp_register_style(
		'rave-rpg-initiative-tracker-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'style.css';
	wp_register_style(
		'rave-rpg-initiative-tracker-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'rave-rpg/initiative-tracker', array(
		'editor_script' => 'rave-rpg-initiative-tracker-block-editor',
		'editor_style'  => 'rave-rpg-initiative-tracker-block-editor',
		'style'         => 'rave-rpg-initiative-tracker-block',
	) );
}
add_action( 'init', 'rave_rpg_initiative_rave_rpg_initiative_block_init' );
