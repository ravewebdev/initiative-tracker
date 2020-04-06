=== Initiative Tracker ===
Contributors: ravewebdev
Author URI: https://ravewebdev.com/
Tags: gutenberg, blocks, rpg, role-playing game, combat tracker
Requires at least: 5.2.0
Tested up to: 5.4.0
Requires PHP: 7.0.0
Table tag: 1.0.0
License: GPL-2.0-or-later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

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
This block is best for Game Masters who have a fairly good plan for the session's combat ahead of time. Prior to the start of the session, create a fresh page or post for the session and add an Initiative Tracker block. Populate the block with the players (PCs), then duplicate the block for as many combats you expect to encounter (this way you don't have to re-enter players for each block). Next, add the different NPCs for each encounter to each block – bonus: pre-roll your NPCs' initiative scores and enter those into the blocks ahead of time. Finally, during gameplay, input the players' initiative scores for the current round of combat, save your page or post, and flip to the frontend to iterate through the active characters.

= How can I report issues or suggest improvements? =
Feel free to create an issue or PR in the [Github repo here](https://github.com/ravewebdev/initiative-tracker).

== Screenshots ==
1. Insert Initiative Tracker block.
2. Add Combat Notes and Characters.
3. Cycle through active characters on frontend.

== Changelog ==
= 1.0.0 =
* Create Initiative Tracker block with character sorting by name and initiative.
* Create frontend 'current character' pointer and 'next character' button.
