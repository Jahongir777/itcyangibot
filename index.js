const {Telegraf, session, Scenes: {BaseScene, Stage}, Markup} = require('telegraf')
require('dotenv').config();

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);

const chatId = 1018120467;





bot.start(async (ctx) => {
    await ctx.reply(`Assalomu alaykum ${ctx.message.from.first_name}, bu bot sizga markazimiz haqida ma'lumot beradi`, Markup.keyboard([
        ["๐ท ITC-HUB haqida ๐ท", "๐ O'quv kurslar"],
        ['๐ Ro\'yhatdan o\'tish', 'โ๏ธ Aloqa', '๐ Joylashuv']
    ]).resize())
})

bot.hears('๐ O\'quv kurslar', async (ctx) => {
    return await ctx.reply('๐ O\'quv kurslar', Markup
      .keyboard([
        ['๐ Web dasturlash', '๐งพ 1C Buxgalteyiya'],
        ['๐ฌ๐ง Ingiliz tili ', '๐ฅ Office dasturlari', '๐จ SMM va Dizayn '],
        ['๐ฐ๐ท Koreys tili', '๐ Main Menu']
      ])
      .resize()
    )
  })

  bot.hears('โ๏ธ Aloqa', async (ctx) => {
    return await ctx.replyWithHTML('โ๏ธ Aloqa - bu biz bn aloqa uchun +998943157889', 
    )
  })

  bot.hears('๐ Main Menu', async (ctx) => {
    return await ctx.reply('๐ Main Menu',Markup
      .keyboard([
        ["๐ท ITC-HUB haqida ๐ท", "๐ O'quv kurslar"],
        ['๐ Ro\'yhatdan o\'tish', 'โ๏ธ Aloqa', '๐ Joylashuv']
      ])
      .resize()
    )
  })

bot.hears('๐ท ITC-HUB haqida ๐ท', async (ctx) => {
    return await ctx.reply('Itc-hub bu innovatsion o\'quv markaz hisoblanadi bu yerda siz zamonaviy kasblarni organishingiz mumkin'
    )
  })

  const nameScene = new BaseScene("nameScene");
nameScene.enter((ctx) => ctx.reply("Ismingiz va familiyangiz"));
nameScene.on("text", (ctx) => {
  ctx.session.name = ctx.message.text;
  return ctx.scene.enter("ageScene", { name: ctx.message.text });
});

const ageScene = new BaseScene("ageScene");
ageScene.enter((ctx) => ctx.reply("Yoshingiz nechida?"));
ageScene.on("text", (ctx) => {
  ctx.session.age = ctx.message.text;
  return ctx.scene.enter("courseScene", { age: ctx.message.text });
});

const courseScene = new BaseScene("courseScene");
courseScene.enter((ctx) =>
  ctx.reply(
    "Qaysi yo'nalishda o'qishni hohlaysiz?\n (Misol uchun: Web dasturlash, Android dasturlash, Video mantaj, Kompyuter savodhonligi va h.k)"
  )
);
courseScene.on("text", (ctx) => {
  ctx.session.course = ctx.message.text;
  return ctx.scene.enter("infoScene", { course: ctx.message.text });
});

const infoScene = new BaseScene("infoScene");
infoScene.enter((ctx) =>
  ctx.reply(
    "Bu yo'nalish bo'yicha ma'lumotingiz qanday?\n(Misol uchun: Umuman bilmayman, o'rtacha, yaxshi bilaman"
  )
);
infoScene.on("text", (ctx) => {
  ctx.session.info = ctx.message.text;

  ctx.reply(
    `Anketa o\'rnatildi jo'natishni tasdiqlaysizmi?\n\n๐จโ๐ Ismi: ${ctx.session?.name}\n๐ง Yoshi: ${ctx.session?.age}\n๐ป Tanlangan yo\'nalish: ${ctx.session?.course}\n๐ Ma\'lumoti: ${ctx.session?.info}`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Anketani jo'natish", callback_data: "send" }],
        ],
      },
    }
  );
  return ctx.scene.leave();
});

const stage = new Stage([nameScene, ageScene, courseScene, infoScene]);
stage.hears("exit", (ctx) => ctx.scene.leave());

bot.use(session());
bot.use(stage.middleware());
bot.command("/start", (ctx) => {
  return ctx.reply(
    `Assalom alaykum ${ctx.message.from.first_name}!`,
    Markup.keyboard([["๐ Ro\'yhatdan o\'tish"]]).resize()
  );
});
bot.hears("๐ Ro\'yhatdan o\'tish", (ctx) => ctx.scene.enter("nameScene"));
bot.command("/send", (ctx) =>
  ctx.telegram.sendMessage(
    chatId,
    `Ism: ${ctx.session?.name}\nYoshi: ${ctx.session?.age}\nTanlangan yo\'nalish: ${ctx.session?.course}\nMa\'lumoti: ${ctx.session?.info}`
  )
);
bot.action("send", async (ctx) => {
  await ctx.answerCbQuery()
  await ctx.telegram.sendMessage(
    chatId,
    `Yangi o'quvchi\n\n๐จโ๐ Ismi: ${ctx.session?.name}\n๐ง Yoshi: ${ctx.session?.age}\n๐ป Tanlangan yo\'nalish: ${ctx.session?.course}\n๐ Ma\'lumoti: ${ctx.session?.info}`
  );
});

bot.hears('๐ Joylashuv', async (ctx) => {
  ctx.telegram.sendLocation(ctx.chat.id, 41.56044515274724, 60.607803062078204)
})

bot.launch();