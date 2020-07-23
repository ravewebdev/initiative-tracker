=== Initiative Tracker ===
Contributors: ravewebdev
Author URI: https://ravewebdev.com/
Tags: gutenberg, blocks, rpg, role-playing game, combat tracker
Requires at least: 5.2.
Tested up to: 5.4.0
Requires PHP: 7.0.0
Stable tag: 1.0.0
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Initiative Tracker block to track PC and NPC combat initiative in TTRPGs.

== Description ==
This plugin provides the Initiative Tracker block, which can be used to organize PC (Player Character) and NPC (Non-Player Character) combat initiative scores for Table-Top Role-Playing Games.

== Installation ==
1. Upload the `initiative-tracker` folder to the `/wp-content/plugins` directory.
2. Activate the Initiative Tracker plugin through the 'Plugins' menu in WordPress.
3. Add the 'Initiative Tracker' block in a post or page.
4. Populate the Player and NPC lists with character, player, and initiative data.
5. Save and view your page or post.
6. Use the 'Next Character' button to iterate through active characters.

== Frequently Asked Questions ==
= How are the character lists ordered? =
When the Initiative Tracker block is active (i.e., selected for editing) in the block editor, characters are divided into Players (PCs) and NPCs and sorted alphabetically in ascending order. Otherwise, both character lists are combined and sorted according to initiative score in descending order.

= How should I use this block? =
This block is best for games where there's a fairly good plan for the session's combat ahead of time. Prior to the start of the session, create a fresh page or post for the session, and add an Initiative Tracker block. Populate the block with the players (PCs), then duplicate the block for as many combats you expect to encounter (this way you don't have to re-enter players for each block). Next, add the different NPCs for each encounter to each block – bonus: roll your NPCs' initiative scores and enter those into the blocks ahead of time – and save your post. Finally, during gameplay, input the players' initiative scores for the current round of combat on the frontend by clicking "Edit Initiative", entering player scores, then clicking "Save Initiative." Now you can click "Next Character" to iterate through the active characters.

= How can I report issues or suggest improvements? =
Feel free to create an issue or PR in the [Github repo here](https://github.com/ravewebdev/initiative-tracker).

== Screenshots ==
1. Admin Demo: Insert Initiative Tracker Block and Add Characters.
2. Frontend Demo 1: Edit Character Initiative.
3. Frontend Demo 2: Cycle Active Character.

== Changelog ==

= 2.0.3 =
* Fixed: Removed duplicate block wrapper `div` on frontend display.

= 2.0.2 =
* Fixed: Updated doc blocks and plugin version.

= 2.0.1 =
* Updated: Cleaned up route handling code for clarity.

= 2.0.0 =
* Added: Implemented frontend editing of character initiative scores.
* Added: Created WP REST API route for editing initiative tracker blocks.
* Updated: Converted class components to function components.
* Updated: Simplified frontend character name and player name display.
* Removed: Removed notes field.

= 1.0.2 =
* Fixed: Updated "current" character pointer to work across browsers.

= 1.0.1 =
* Fixed: Cleaned up doc comments, updated block keywords, addressed linting errors.

= 1.0.0 =
* Added: Create Initiative Tracker block with character sorting by name and initiative.
* Added: Create frontend 'current character' pointer and 'next character' button.
