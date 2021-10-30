const { Markup, Composer, Scenes } = require('telegraf');
const yesUndefined = name => typeof name === 'undefined' ? '' : name;

const startStep = new Composer()
startStep.on("text", async (ctx) => {
    try {

      ctx.wizard.state.data = {}
      ctx.wizard.state.data.userName = ctx.message.from.username
      ctx.wizard.state.data.firsname = ctx.message.from.first_name
      ctx.wizard.state.data.lastName = ctx.message.from.last_name
      await ctx.replyWithHTML("Ism va familiyangiz")
      return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const titleStep = new Composer()
titleStep.on("text", async (ctx) => {
    try {
      ctx.wizard.state.data.title = ctx.message.text
      await ctx.replyWithHTML("Telefon raqamingiz", Markup.inlineKeyboard[
          [Markup.button.callback('SendContact', 'remote')]
      ])
      return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const cityStep = new Composer()
cityStep.on("text", async (ctx) => {
    try {
      ctx.wizard.state.data.city = ctx.message.text
      await ctx.replyWithHTML("Qaysi yo\'nalish bo\'yicha kurga yozilmoqchisiz")
      return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

// cityStep.action('remote', async (ctx) => {
//     try {
// ctx.wizard.state.data.city = 'SendContact'
// await ctx.answerCbQuery()
// await ctx.replyWithHTML('Qaysi yonalish boyicha kurga yozilmoqchisiz')
// return ctx.wizard.next()
//     }catch (e) {
//         console.log(e)
//     }
// })


// const priceStep = new Composer()
// priceStep.on("text", async (ctx) => {
//     try {
//       ctx.wizard.state.data.price = ctx.message.text
//       await ctx.replyWithHTML("Nechi yillik tajribaga ega", Markup.inlineKeyboard([
//           [Markup.button.callback('Tajriba yoq', 'no-experience')]
//       ]))
//       return ctx.wizard.next()
//     } catch (e) {
//         console.log(e)
//     }
// })

// const experienceStep = new Composer()
// experienceStep.on('text', async (ctx) => {
//     try {
//      ctx.wizard.state.data.experience = ctx.message.text
//      await ctx.replyWithHTML('zvonka')
//      return ctx.wizard.next()
//     } catch (e) {
//         console.log(e)
//     }
// })

// experienceStep.action('no-experience', async (ctx) => {
//     try {
//         await ctx.answerCbQuery()
//         ctx.wizard.state.data.experience = 'Talab qilinmaydi'
//         await ctx.replyWithHTML('zvonka')
//         return ctx.wizard.next()
//             }catch (e) {
//                 console.log(e)
//             }
// })

// const dutyStep = new Composer()
// dutyStep.on('text', async (ctx) => {
//     try {
//      ctx.wizard.state.data.duty = ctx.message.text
//      await ctx.replyWithHTML('Yutuqlari')
//      return ctx.wizard.next()
//     } catch (e) {
//         console.log(e)
//     }
// })

// const requirementStep = new Composer()
// requirementStep.on('text', async (ctx) => {
//     try {
//      ctx.wizard.state.data.requirement = ctx.message.text
//      await ctx.replyWithHTML('Ish grafigi qanaqa bolishi kk')
//      return ctx.wizard.next()
//     } catch (e) {
//         console.log(e)
//     }
// })

const conditionStep = new Composer()
conditionStep.on('text', async (ctx) => {
    try {
     ctx.wizard.state.data.condition = ctx.message.text
     const wizardData = ctx.wizard.state.data
     await ctx.replyWithHTML(`
     ${wizardData.condition}

     <b>Ism familiya</b>
     ${wizardData.condition}

     <b>telefon</b>
     ${wizardData.title} //ctx.wizard.state.data.title


     <b>qaysi yonalisj boyicha</b>
     ${wizardData.city}

   
     `)
     await ctx.replyWithHTML('Tez orada adminstratorlarimiz siz bn aloqaga chiqishadi')
     return ctx.scene.leave()
    } catch (e) {
        console.log(e)
    }
})


const registrationScene = new Scenes.WizardScene('registrationWizard', startStep, titleStep, cityStep, conditionStep);
module.exports = registrationScene;