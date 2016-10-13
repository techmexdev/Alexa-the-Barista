'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Space Facts';

/**
 * Array containing coffee facts.
 */
var FACTS = [
    "Legend has it a 9th-century Ethiopian goat herder discovered coffee by accident when he noticed how crazy the beans were making his goats.",
    "New Yorkers drink almost 7 times more coffee than other cities in the US.",
    "Coffee is a psychoactive. And at high doses it can make you see things… It can also kill you…",
    "A French doctor in the 1600s suggested Cafe Au Laits for patients, inspiring people to begin adding milk to coffee.",
    "The lethal dose of caffeine is roughly 100 cups of coffee."

];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a space fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
