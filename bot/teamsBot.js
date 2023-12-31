// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { TeamsActivityHandler, TurnContext } = require("botbuilder");

const path = require('path');

// Read botFilePath and botFileSecret from .env file.
require('dotenv').config({ path: '../env/.env.local' }); // If deploying or provisioning the sample, please replace this with with .env.dev

class TeamsBot extends TeamsActivityHandler {
  constructor(conversationReferences) {
    super();
    // Dependency injected dictionary for storing ConversationReference objects used in NotifyController to proactively message users
    this.conversationReferences = conversationReferences;

    this.onConversationUpdate(async (context, next) => {
      this.addConversationReference(context.activity);

      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          const welcomeMessage = `Welcome to the Proactive Bot sample.  Navigate to ${process.env.PROVISIONOUTPUT__BOTOUTPUT__SITEENDPOINT}/api/notify to proactively message everyone who has previously messaged this bot.`;
          await context.sendActivity(welcomeMessage);
        }
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMessage(async (context, next) => {
      this.addConversationReference(context.activity);

      // Echo back what the user said
      await context.sendActivity(`You sent '${context.activity.text}'. Navigate to ${process.env.PROVISIONOUTPUT__BOTOUTPUT__SITEENDPOINT}/api/notify to proactively message everyone who has previously messaged this bot.`);
      await next();
    });

  }

  addConversationReference(activity) {
    const conversationReference = TurnContext.getConversationReference(activity);
    this.conversationReferences[conversationReference.conversation.id] = conversationReference;
  }

}

module.exports.TeamsBot = TeamsBot;
