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
            flags: [''],
            data: {
                validation: {
                    args: Jade.object({
                        equation: Jade.string().required(),
                    }),
                    failAction: 'error',
                },
                handler: async (message, { args: { equation } }) => {

                    let c = message.channel;

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
