module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Store Bot Client Info",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Bot Client Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
const info = ['Uptime in milliseconds', 'Ready at?', 'Ping', 'Guild amount', 'User amount', 'Ping rounded', 'Uptime in seconds', 'Uptime in minutes', 'Bots token', 'Voice connections amount', 'Total Amount of Channels', 'Total Amount of Emojis', 'Bot\'s Previous Pings', 'Uptime in Days', 'Uptime in Days (Rounded)', 'Memory (RAM) Usage', 'Bot Guilds Objects', 'Bot Guilds Names', 'Bot Guilds IDs', 'Bot Current Prefix', 'Bot Client ID'];
	return `Bot Client - ${info[parseInt(data.info)]}`;
},

//---------------------------------------------------------------------
	 // DBM Mods Manager Variables (Optional but nice to have!)
	 //
	 // These are variables that DBM Mods Manager uses to show information
	 // about the mods for people to see in the list.
	 //---------------------------------------------------------------------

	 // Who made the mod (If not set, defaults to "DBM Mods")
	 author: "Lasse, EliteArtz and EGGSY",

	 // The version of the mod (Defaults to 1.0.0)
	 version: "1.8.4",

	 // A short description to show on the mod line for this mod (Must be on a single line)
	 short_description: "Stores Bot Information like Ping, Total Members or Guilds...",

	 // If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods


	 //---------------------------------------------------------------------

//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	const info = parseInt(data.info);
	let dataType = 'Unknown Type';
	switch(info) {
		case 0:
			dataType = "Number";
			break;
		case 1:
			dataType = "Date";
			break;
		case 2:
			dataType = "Number";
			break;
		case 3:
			dataType = "Number";
			break;
		case 4:
			dataType = "Number";
			break;
		case 5:
			dataType = "Number";
			break;
		case 6:
			dataType = "Number";
			break;
		case 7:
			dataType = "Number";
			break;
		case 8:
			dataType = "Token";
			break;
		case 9:
			dataType = "Number";
			break;
		case 10:
			dataType = "Number";
			break;
		case 11:
			dataType = "Number";
			break;
		case 12:
			dataType = "Number";
			break;
		case 13:
			dataType = "Time";
			break;
		case 14:
			dataType = "Time";
			break;
		case 15:
			dataType = "Number";
			break;
		case 16:
			dataType = "Guild";
			break;
		case 17:
			dataType = "Guild Name";
			break;
		case 18:
			dataType = "Guild ID";
			break;
		case 19:
			dataType = "Bot Tag";
			break;
		case 20:
			dataType = "Bot ID";
			break;
	}
	return ([data.varName2, dataType]);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["info", "storage", "varName2"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions.
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information,
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use.
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels,
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
	<div>
		<p>
			<u>Mod Info:</u><br>
			Created by EliteArtz, EGGSY and Lasse!
		</p>
	</div><br>
<div style="float: left; width: 80%;">
	Source Info:<br>
	<select id="info" class="round">
		<option value="0">Uptime in milliseconds</option>
		<option value="1">Ready at</option>
		<option value="2">Ping</option>
		<option value="3">Total amount of guilds</option>
		<option value="4">Total amount of users</option>
		<option value="5">Ping rounded</option>
		<option value="6">Uptime in seconds</option>
		<option value="7">Uptime in minutes</option>
		<option value="8">Bots Token</option>
		<option value="9">Total Voice connections</option>
		<option value="10">Total Amount of Channels</option>
		<option value="11">Total Amount of Emojis</option>
		<option value="12">Bot's Previous Pings</option>
		<option value="13">Uptime in Days</option>
		<option value="14">Uptime in Days (Rounded)</option>
		<option value="15">Memory (RAM) Usage</option>
		<option value="16">Bot Guilds Objects</option>
		<option value="17">Bot Guilds Names</option>
		<option value="18">Bot Guilds IDs</option>
		<option value="19">Bot Current Prefix</option>
		<option value="20">Bot Client ID</option>
	</select>
</div>
<div>
	<div style="float: left; width: 35%;">
		Store In:<br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer2" style="float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName2" class="round" type="text"><br>
	</div>
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter,
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
  const botClient = this.getDBM().Bot.bot;
  const dibiem = this.getDBM(); //EliteArtz... really????
	const data = cache.actions[cache.index];
	const info = parseInt(data.info);
	if(!botClient) {
		this.callNextAction(cache);
		return;
	}
	switch(info) {
		case 0:
			result = botClient.uptime + 'ms';
			break;
		case 1:
			result = botClient.readyAt;
			break;
		case 2:
			result = botClient.ping;
			break;
		case 3:
			result = botClient.guilds.array().length;
			break;
		case 4:
			result = botClient.users.array().length;
			break;
		case 5:
			result = Math.round(botClient.ping);
			break;
		case 6:
			result = Math.floor(botClient.uptime/1000) + 's';
			break;
		case 7:
			result = Math.floor(botClient.uptime/1000/60) + 'm';
			break;
		case 8:
			result = botClient.token;
			break;
		case 9:
			result = botClient.voiceConnections.array().length;
			break;
		case 10:
			result = botClient.channels.size;
			break;
		case 11:
			result = botClient.emojis.size;
			break;
		case 12:
			result = botClient.pings;
			break;
		case 13:
			result = botClient.uptime/msToDay;
			break;
		case 14:
			result = Math.floor(botClient.uptime/msToDay);
			break;
		case 15:
			result = "%" + ((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2);
			break;
		case 16:
			result = botClient.guilds;
		 	break;
		case 17:
			result = botClient.guilds.array();
			break;
		case 18:
			result = botClient.guilds.map(guilds => guilds.id);
			break;
		case 19:
			result = dibiem.Files.data.settings.tag;
			break;
		case 20:
			result = dibiem.Files.data.settings.client;
			break;
		default:
		break;
	}
	if(result !== undefined) {
		const storage = parseInt(data.storage);
		const varName2 = this.evalMessage(data.varName2, cache);
		this.storeValue(result, storage, varName2, cache);
	}
	this.callNextAction(cache);
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module
