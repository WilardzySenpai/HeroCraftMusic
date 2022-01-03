# Support

<div align="center">
  <a href="https://discord.gg/S6d777Ph8t">
    <img src="https://user-images.githubusercontent.com/59381835/92191514-d649ad80-ee18-11ea-9bc4-e95c7a122a99.png"  alt="Discord" width="80px"/>
    <h1>HeroCraftBot</h1<br><p>Join To Our Discord Server!</p>
  </a><a href="https://discord.com/oauth2/authorize?client_id=882546376699949057&permissions=3147776&scope=bot">
    <img src="https://media.discordapp.net/attachments/899498088660627476/913708707555188766/HMusic.png?width=484&height=484" width="80px"/>
    <h1>Invite Me<br>HeroCraftMusic</h1>
  </a>
</div>

# Configuration
Go to `config.json` file and fill up the token and change the prefix. (important)  
You can change the bot emoji. (optional)

To find the token of the bot go to [Developer Portal](https://discord.com/developers/applications)

```json
{
  "discord": {
    "prefix": "prefix.exe",
    "token": "token.js lol" 
  },
  "emoji": {
    "success": "✅",
    "failed": "❌",
    "error": "⚠",
    "stop": "🛑",
    "goodbye": "👋",
    "music": "🎶",
    "radio": "🔘",
    "volume": "🔊",
    "loop": "🔄"
  }
  "dashboard": {
    "clientId": "clientId",
    "clientSecret": "Secret",
    "URL": "https://herocraftmusic.itsherohero.repl.co",
    "port": "80",
    "support": "https://discord.gg/S6d777Ph8t"
  }
}

```

# Tutorials
## How To Deploy the Project
- Fork this Project.
- Go to `config.json` file and fill up the needed informations.
- Go to Terminal or Console and type `npm install` or `npm i`.
- You can now run this project, Enjoy!

## How to Make Commands
- Go to `commands` folder and select which category.
- Create file to you category folder you make or you choose.
- Here's the template below ⬇

```js
module.exports = {
  name: "", // command name
  aliases: [""], // command aliases
  category: "", // command category
  description: "", // command description
  usage: "", // command usage
  accessibility: "", // who can execute the command (ex. Administrator, everyone)
  
  run: async (client, message, args) => {
    
  }
}

```