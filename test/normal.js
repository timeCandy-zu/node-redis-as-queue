/**
 * XadillaX created at 2014-11-02 12:34:11
 *
 * Copyright (c) 2014 Huaban.com, all rights
 * reserved
 */
var async = require("async");
var Scarlet = require("scarlet-task");
var scarlet = new Scarlet(1);

var Queue = require("../").NormalQueue;
var queue = new Queue("test");

for(var i = 0; i < 10; i++) {
    scarlet.push(i, function(TO) {
        queue.push(TO.task, function() { scarlet.taskDone(TO); });
    });
}

scarlet.push(undefined, function(TO) {
    queue.get(-1, function(err, messages) {
        console.log(messages);
        queue.removeAmount(function(err, amount) {
            console.log(amount);

            messages.pop();messages.pop();
            queue.removeMessages(messages, function(err, amount, still) {
                console.log(amount, still);

                queue.length(function(err, l) {
                    console.log(l);
                    scarlet.taskDone(TO);
                });
            });
        })
    });
});
