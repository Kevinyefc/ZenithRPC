const express = require('express');
const Discord = require('discord.js-selfbot-v13');

const app = express();
const port = process.env.PORT || 3000;

const client = new Discord.Client();

const Authorization_Token = process.env.Authorization_Token;
const Webhook_ID = process.env.Webhook_ID;
const Webhook_Token = process.env.Webhook_Token;

let Webhook_Support = true; // Variable to control webhook enable/disable

client.on('ready', async () => {
  console.clear();
  console.log(`ZenithRPC has connected to Discord Client: ${client.user.tag}`);

  const sendWebhookMessage = () => {
    if (Webhook_Support) {
      const embed = new Discord.MessageEmbed()
        .setColor('#545759')
        .setTitle('ZenithRPC | Webhook Logs')
        .setDescription('Our recent update has included "Render.com" hosting with our old functionalities.')
        .addField('Discord Client:', client.user.tag, true)
        .addField('Client Uptime:', calculateUptime(), true)
        .setThumbnail("https://media.discordapp.net/attachments/1206955445940658287/1223021688971591770/zenith-grey.png?ex=661856b5&is=6605e1b5&hm=0c0699c469634dda8ce20ceb6d31d5cfd8e62005aafe78acae73edae47a3b530&=&format=webp&quality=lossless&width=600&height=450")
        .setFooter('・Developer: zensware   ', client.user.displayAvatarURL())
        .setTimestamp();

      const webhookClient = new Discord.WebhookClient({ id: Webhook_ID, token: Webhook_Token });
      webhookClient.send({ embeds: [embed] })
        .then(() => {
          console.log('Embed sent successfully!');
        })
        .catch(console.error);
    }
  };

  const calculateUptime = () => {
    const currentTime = Date.now();
    const uptime = currentTime - client.readyAt;
    const formattedUptime = formatMilliseconds(uptime);
    return formattedUptime;
  };
  
  const formatMilliseconds = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  const updatePresenceAndActivity = () => {
    sendWebhookMessage();
    const r = new Discord.RichPresence()
      .setApplicationId('Application-ID') // Please replace all values to your own. If it seems to say null then you could easily replace it with 'text/image-value' 
      .setType('STREAMING') // Playing, Streaming, Watching, Listening, Competing 
      .setURL('https://twitch.tv/zensware')
      .setState('Community Mods Gta SA-MP')
      .setName('𝙳𝚒𝚜𝚌𝚘𝚛𝚍 𝙰𝚗𝚍 𝚈𝚘𝚞𝚃𝚞𝚋𝚎')
      .setDetails('House Mojarela')
      .setStartTimestamp(Date.now())
      .setAssetsLargeImage('https://media.discordapp.net/attachments/1164626042045087804/1183866510331093153/tumblr_ne5u9nuby21secagoo1_1280.gif?ex=6589e49b&is=65776f9b&hm=bf12a47618627da70ff0978a41214c542057d2ef9b1ab1995d88e79d3826d934&')
      .setAssetsLargeText('Join Here')
      .setAssetsSmallImage('https://media.discordapp.net/attachments/1164626042045087804/1183853795260768266/5G4r.gif?ex=6589d8c3&is=657763c3&hm=a958b558f36d7faf4346bd08b757b769dd0020e7bd86f60be976996b771913c0&')
      .setAssetsSmallText('small-image-text')
      .addButton('𝙳𝚒𝚜𝚌𝚘𝚛𝚍', 'https://discord.com/invite/C2v5hFvTsw')
      .addButton('𝚈𝚘𝚞𝚃𝚞𝚋𝚎', 'https://youtube.com/@kepinn999?si=zeWX870jwWVtVN6j');
    client.user.setActivity(r);
  };

  updatePresenceAndActivity();
  setInterval(updatePresenceAndActivity, 30000);
  client.user.setPresence({ status: "idle" });
});

client.login(Authorization_Token);

app.get('/', (req, res) => {
  res.send('ZenithRPC is running!');
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
