const { Telegraf, Markup, Scenes, session } = require('telegraf');
const registrationScene = require('./scenes/registration.js')
require('dotenv').config();

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);

const chatId = 1018120467;

const stage = new Scenes.Stage([registrationScene])
bot.use(session());
bot.use(stage.middleware())

bot.hears('📝 Ro\'yhatdan o\'tish', ctx => ctx.scene.enter('registrationWizard'))


bot.start(async (ctx) => {
    await ctx.reply(`Assalomu alaykum ${ctx.message.from.first_name}, bu bot sizga markazimiz haqida ma'lumot beradi`, Markup.keyboard([
        ["🔷 ITC-HUB haqida 🔷", "📋 O'quv kurslar"],
        ['📝 Ro\'yhatdan o\'tish', '☎️ Aloqa', '📍 Joylashuv']
    ]).resize())
})

bot.hears('📋 O\'quv kurslar', async (ctx) => {
    return await ctx.reply('📋 O\'quv kurslar', Markup
      .keyboard([
        ['Office dasturlar', 'Smm Marketing'],
        ['🔝 Main Menu']
      ])
      .resize()
    )
  })

  bot.hears('🔝 Main Menu', async (ctx) => {
    return await ctx.reply('🔝 Main Menu',Markup
      .keyboard([
        ["🔷 ITC-HUB haqida 🔷", "📋 O'quv kurslar"],
        ['📝 Ro\'yhatdan o\'tish', '☎️ Aloqa', '📍 Joylashuv']
      ])
      .resize()
    )
  })

bot.hears('🔷 ITC-HUB haqida 🔷', async (ctx) => {
    return await ctx.reply('Itc-hub bu innovatsion o\'quv markaz hisoblanadi'
    )
  })

bot.launch();