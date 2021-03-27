'use strict';

const Jade = require('@botsocket/jade');
const math = require('mathjs')

module.exports = {
    name: 'calc',
    register: (client) => {

        client.command({
            name: 'calc',
            alias: ['calc', 'calculate'],
            args: ['equation'],
            flags: ['channel'],
            data: {
                validation: {
                    args: Jade.object({
                        text: Jade.string().required(),
                    }),
                    failAction: 'error',
                },
                handler: async (message, { args: { equation }, flags: { channel } }) => {

                    let c = message.channel;
                    function numberGen(min, max) { 
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    if (channel) {

                        if (message.client.channels.cache.has(channel)) {

                            c = message.client.channels.cache.get(channel);
                        }
                        else {

                            const match = channel.match(/<#(\d{17,19})>/);
                            if (message.client.channels.cache.has(match[1])) {
                                c = message.client.channels.cache.get(match[1]);
                            }
                        }
                    }

                    try {
                        if(!equation) return c.send('Please provide an equation');
                        if (equation.includes(':')) return c.send("You can't use : inside a calculation!")
                
                        let resp;
                    
                        try {
                            resp = math.evaluate(args[0].replace(' ', ''))
                        } catch (e) {
                            return c.send('Please provide a **valid** question')
                        }
                        c.send(`The answer to \`${equation}\` is... \`${resp}\``)
                    }
                    catch {}
                },
            },
        });
    },
};