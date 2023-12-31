// index.js is used to setup and configure your bot

// Import required packages
const restify = require("restify");

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const { BotFrameworkAdapter } = require("botbuilder");
const { TeamsBot } = require("./teamsBot");

var mongoose = require("mongoose");
var axios = require("axios");
var db = mongoose.connection;


//All calls out of the server
mongoose.connect(`mongodb+srv://${user}:${password}@${url}?retryWrites=true`, {useNewUrlParser: true }, function (err) {

   if (err) throw err;

   console.log('Successfully connected');

});


// // Create adapter.
// // See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new BotFrameworkAdapter({
  appId: process.env.BOT_ID,
  appPassword: process.env.BOT_PASSWORD,
});


adapter.onTurnError = async (context, error) => {
  // This check writes out errors to console log .vs. app insights.
  // NOTE: In production environment, you should consider logging this to Azure
  //       application insights. See https://aka.ms/bottelemetry for telemetry
  //       configuration instructions.
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  // Uncomment below commented line for local debugging..
  // await context.sendActivity(`Sorry, it looks like something went wrong. Exception Caught: ${error}`);

};

// Create the bot that will handle incoming messages.
const conversationReferences = {};
const bot = new TeamsBot(conversationReferences);

// Create HTTP server.
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log(`\nBot started, ${server.name} listening to ${server.url}`);
});

// Listen for incoming requests.
server.post("/api/messages", async (req, res) => {
  await adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});

// Listen for incoming notifications and send proactive messages to users.
server.post('/api/notify', async (req, res) => {
  console.log(JSON.stringify(conversationReferences));
  console.log(JSON.stringify(req.body));
  for (const conversationReference of Object.values(conversationReferences)) {

    await adapter.continueConversation(conversationReference, async (context) => {
      await context.sendActivity('proactive hello');
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  var response = { message: 'Proactive message sent', code: '200' };
  res.send(200, JSON.stringify(customers));
  res.end();
});


// Listen for incoming notifications from ADO PRs.
server.post('/api/notify/ado/pr', async (req, res) => {
  console.log(JSON.stringify(conversationReferences));
  console.log(JSON.stringify(req.body));
  for (const conversationReference of Object.values(conversationReferences)) {

    await adapter.continueConversation(conversationReference, async (context) => {
      await context.sendActivity('proactive hello');
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  var response = { message: 'Proactive message sent', code: '200' };
  res.send(200, JSON.stringify(customers));
  res.end();
});

// Listen for incoming notifications from ADO PRs.
server.post('/api/notify/ado/prs', async (req, res) => {
  console.log(JSON.stringify(conversationReferences));
  console.log(JSON.stringify(req.body));
  for (const conversationReference of Object.values(conversationReferences)) {

    await adapter.continueConversation(conversationReference, async (context) => {
      await context.sendActivity('proactive hello');
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  var response = { message: 'Proactive message sent', code: '200' };
  res.send(200, JSON.stringify(customers));
  res.end();
});

// Listen for incoming notifications from ADO Mentions.
server.post('/api/notify/ado/mentions', async (req, res) => {
  console.log(JSON.stringify(conversationReferences));
  console.log(JSON.stringify(req.body));
  for (const conversationReference of Object.values(conversationReferences)) {

    await adapter.continueConversation(conversationReference, async (context) => {
      await context.sendActivity('proactive hello');
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  var response = { message: 'Proactive message sent', code: '200' };
  res.send(200, JSON.stringify(customers));
  res.end();
});


// Listen for incoming notifications from ADO Mentions.
server.post('/api/notify/git/mentions', async (req, res) => {
  console.log(JSON.stringify(conversationReferences));
  console.log(JSON.stringify(req.body));
  for (const conversationReference of Object.values(conversationReferences)) {

    await adapter.continueConversation(conversationReference, async (context) => {
      await context.sendActivity('proactive hello');
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  var response = { message: 'Proactive message sent', code: '200' };
  res.send(200, JSON.stringify(customers));
  res.end();
});

// Listen for incoming notifications from ADO Mentions.
server.post('/api/notify/git/mrs', async (req, res) => {
  console.log(JSON.stringify(conversationReferences));
  console.log(JSON.stringify(req.body));
  for (const conversationReference of Object.values(conversationReferences)) {

    await adapter.continueConversation(conversationReference, async (context) => {
      await context.sendActivity('proactive hello');
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  var response = { message: 'Proactive message sent', code: '200' };
  res.send(200, JSON.stringify(customers));
  res.end();
});
// Gracefully shutdown HTTP server
["exit", "uncaughtException", "SIGINT", "SIGTERM", "SIGUSR1", "SIGUSR2"].forEach((event) => {
  process.on(event, () => {
    server.close();
  });
});
