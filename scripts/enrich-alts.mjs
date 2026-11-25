/**
 * Generate paraphrase alts for every sentence using safe transforms.
 * Run: node scripts/enrich-alts.mjs
 */
import { writeFileSync } from 'fs'

const mod = await import(new URL('../src/sentences.js', import.meta.url).href)
const { SENTENCES } = mod

const SWAP_GROUPS = [
  ['see', 'know', 'understand', 'get'],
  ['favorite', 'favourite'],
  ['color', 'colour'],
  ['movie', 'film'],
  ['can', 'could'],
  ['bathroom', 'restroom', 'toilet'],
  ['mom', 'mother', 'mum'],
  ['dad', 'father'],
  ['coworker', 'colleague'],
  ['coworkers', 'colleagues'],
  ['start', 'begin'],
  ['finish', 'complete'],
  ['finished', 'completed', 'done'],
  ['reply', 'respond', 'answer'],
  ['buy', 'purchase'],
  ['big', 'large'],
  ['small', 'little'],
  ['happy', 'glad'],
  ['tired', 'exhausted'],
  ['help', 'assist'],
  ['hello', 'hi'],
  ['thanks', 'thank you'],
  ['problem', 'issue'],
  ['kids', 'children'],
  ['garbage', 'trash'],
  ['store', 'shop'],
  ['vacation', 'holiday'],
  ['sick', 'ill'],
  ['near', 'nearby'],
  ['quick', 'fast'],
  ['hard', 'difficult'],
  ['good', 'great', 'nice'],
  ['bad', 'terrible'],
  ['lot', 'ton', 'plenty'],
  ['email', 'mail'],
  ['emails', 'mails'],
  ['phone', 'mobile'],
  ['bill', 'check'],
]

const PHRASE_SWAPS = [
  [/I see what you mean/gi, ['I know what you mean', 'I understand what you mean', 'I get what you mean', 'I see your point']],
  [/I see your point/gi, ['I know what you mean', 'I understand what you mean', 'I get what you mean', 'I see what you mean']],
  [/What's your favourite movie\?/gi, ["What's your favorite movie?", 'Which movie do you like the most?', 'What movie do you like most?', "What's your favorite film?"]],
  [/What's your favorite movie\?/gi, ["What's your favourite movie?", 'Which movie do you like the most?', 'What movie do you like most?']],
  [/What do you call this in English\?/gi, ['How do you say this in English?', 'How do you call this in English?', "What's this called in English?"]],
  [/Let's split the bill\./gi, ["Let's split the check.", "Let's go Dutch."]],
  [/I take after my mother a lot\./gi, ['I look like my mother a lot.', 'I look a lot like my mother.', 'I take after my mom a lot.', "I'm a lot like my mother."]],
  [/Can you help me\?/gi, ['Could you help me?', 'Can you please help me?', 'Could you please help me?']],
  [/Could you fry me an egg\?/gi, ['Can you fry me an egg?', 'Could you fry an egg for me?', 'Can you fry an egg for me?']],
  [/Where is the restroom\?/gi, ["Where's the restroom?", 'Where is the bathroom?', "Where's the bathroom?", 'Where is the toilet?']],
  [/I get off work at 6\./gi, ['I leave work at 6.', 'I finish work at 6.']],
  [/Don't worry about it\./gi, ["Don't worry.", 'No worries.']],
  [/I'm running late\./gi, ['I am running late.', "I'm late."]],
  [/I'm stuck in traffic\./gi, ['I am stuck in traffic.', "I'm in traffic."]],
  [/See you tomorrow\./gi, ['Catch you tomorrow.', 'See you tomorrow!']],
  [/I appreciate it\./gi, ['Thank you.', 'Thanks a lot.']],
  [/Give me a minute\./gi, ['Give me a second.', 'One moment.', 'Hang on a second.']],
  [/I'll call you later\./gi, ['I will call you later.', 'I\'ll call later.']],
  [/Sounds good to me\./gi, ['Sounds good.', 'Sounds great.']],
  [/I agree with you\./gi, ['I agree.', 'I agree with that.']],
  [/That's a good idea\./gi, ['That is a good idea.', 'Good idea.']],
  [/How have you been lately\?/gi, ['How have you been?', 'How are you doing lately?']],
  [/What do you do for a living\?/gi, ['What is your job?', 'What do you do?']],
  [/I'm not feeling well today\./gi, ["I feel sick today.", "I'm feeling sick today.", 'I feel ill today.']],
  [/I have a terrible headache\./gi, ['I have a bad headache.', 'I have a headache.']],
  [/Make yourself at home\./gi, ['Please make yourself at home.', 'Feel free to make yourself at home.']],
  [/I'm looking forward to it\./gi, ['I am looking forward to it.', "I can't wait."]],
  [/You're breaking up\./gi, ['You are breaking up.', "I can't hear you clearly."]],
  [/We don't see eye to eye on everything\./gi, ["We don't always agree on everything.", 'We disagree sometimes.']],
  [/I'm taking a day off tomorrow\./gi, ['I am taking a day off tomorrow.', 'I have tomorrow off.']],
  [/Let's order takeout tonight instead\./gi, ["Let's order takeaway tonight instead.", "Let's get takeout tonight instead."]],
  [/Thank you for the help\./gi, ['Thanks for the help.', 'Thank you for helping.']],
  [/I'll wash the dishes\./gi, ['I will wash the dishes.', "I'll do the dishes."]],
  [/I'll do the dishes after dinner\./gi, ['I will do the dishes after dinner.', "I'll wash the dishes after dinner."]],
  [/I prefer tea to coffee\./gi, ['I like tea more than coffee.', 'I prefer tea over coffee.']],
  [/I'm on my way\./gi, ['I am on my way.', "I'm coming."]],
  [/It won't happen again\./gi, ["That won't happen again.", 'It will not happen again.']],
  [/I gotta go now\./gi, ['I have to go now.', "I've got to go now.", 'I need to go now.']],
  [/You free on Saturday\?/gi, ['Are you free on Saturday?', 'Are you available on Saturday?']],
  [/Any plans for the weekend\?/gi, ['Do you have plans for the weekend?', 'What are your plans for the weekend?']],
  [/I can't believe it's Friday\./gi, ["I cannot believe it's Friday.", "I can't believe it is Friday."]],
  [/I'm in a good mood\./gi, ['I am in a good mood.', 'I feel good today.']],
  [/It's freezing cold today\./gi, ['It is freezing cold today.', "It's really cold today."]],
  [/It's raining heavily outside\./gi, ['It is raining heavily outside.', "It's raining hard outside."]],
  [/I've heard a lot about you\./gi, ['I have heard a lot about you.', "I've heard so much about you."]],
  [/I'm the only son in my family\./gi, ['I am the only son in my family.', "I'm an only son."]],
  [/I gained five pounds recently\./gi, ['I put on five pounds recently.', "I've gained five pounds recently."]],
  [/I want to lose weight\./gi, ['I want to lose some weight.', "I'd like to lose weight."]],
  [/I'm trying to stay fit\./gi, ['I am trying to stay fit.', "I'm trying to keep fit."]],
  [/How often do you exercise\?/gi, ['How often do you work out?', 'How often do you go to the gym?']],
  [/I do yoga in the morning\./gi, ['I practice yoga in the morning.', 'I do yoga every morning.']],
  [/Let's go for a walk\./gi, ['Let us go for a walk.', 'Shall we go for a walk?']],
  [/Thanks for having me over\./gi, ['Thank you for having me over.', 'Thanks for inviting me over.']],
  [/What would you like to drink\?/gi, ['What do you want to drink?', 'Would you like something to drink?']],
  [/Do you want to join us\?/gi, ['Would you like to join us?', 'Wanna join us?']],
  [/Let me check the schedule\./gi, ['Let me check my schedule.', "I'll check the schedule."]],
  [/Did you get my email\?/gi, ['Have you got my email?', 'Did you receive my email?']],
  [/I'm waiting for a reply\./gi, ['I am waiting for a reply.', "I'm waiting for a response."]],
  [/I'm not sure what to do\./gi, ['I am not sure what to do.', "I'm not sure what I should do."]],
  [/Let's find a solution together\./gi, ['Let us find a solution together.', "Let's solve this together."]],
  [/Should I change my mind\?/gi, ['Do you think I should change my mind?', 'Should I rethink this?']],
  [/Your opinion matters to me\./gi, ['Your opinion is important to me.', 'I care about your opinion.']],
  [/You've already done your best\./gi, ['You have already done your best.', "You've done your best."]],
  [/I'm sorry to disturb you\./gi, ['I am sorry to disturb you.', 'Sorry to bother you.']],
  [/My battery is dying\./gi, ['My battery is low.', 'My phone is about to die.']],
  [/Is this a good time\?/gi, ['Is now a good time?', 'Are you free to talk?']],
  [/I'll text you instead\./gi, ['I will text you instead.', "I'll send you a text instead."]],
  [/Let's talk about it later\./gi, ['Let us talk about it later.', 'We can talk later.']],
  [/I can't stop sneezing\./gi, ['I cannot stop sneezing.', "I keep sneezing."]],
  [/I'm allergic to peanuts\./gi, ['I am allergic to peanuts.', 'I have a peanut allergy.']],
  [/I'm worried about you\./gi, ['I am worried about you.', "I'm concerned about you."]],
  [/I feel much better now\./gi, ['I am feeling much better now.', 'I feel a lot better now.']],
  [/I'm grateful for your support\./gi, ['I am grateful for your support.', 'Thank you for your support.']],
  [/May I have a menu\?/gi, ['Can I have a menu?', 'Could I have a menu?']],
  [/What do you recommend\?/gi, ['What would you recommend?', 'Any recommendations?']],
  [/I need a few more minutes\./gi, ['I need a couple more minutes.', 'I need a bit more time.']],
  [/We're ready to order\./gi, ['We are ready to order.', "We're ready to order now."]],
  [/Can we have some water\?/gi, ['Could we have some water?', 'Can we get some water?']],
  [/This isn't what I ordered\./gi, ['This is not what I ordered.', "This isn't my order."]],
  [/Does this taste too salty\?/gi, ['Is this too salty?', 'Does this taste salty?']],
  [/What time should we meet\?/gi, ['What time do we meet?', 'When should we meet?']],
  [/I'll pick you up at seven\./gi, ['I will pick you up at seven.', "I'll pick you up at 7."]],
  [/It's getting late already\./gi, ['It is getting late already.', "It's getting late."]],
  [/I had a great time today\./gi, ['I had a wonderful time today.', 'I really enjoyed today.']],
  [/I'd love to see you soon\./gi, ['I would love to see you soon.', "I'd like to see you soon."]],
  [/Did you have a haircut\?/gi, ['Did you get a haircut?', 'Have you had a haircut?']],
  [/Can I try this on\?/gi, ['Could I try this on?', 'May I try this on?']],
  [/Do you have a smaller size\?/gi, ['Have you got a smaller size?', 'Is there a smaller size?']],
  [/This is a bit too expensive\./gi, ['This is a little too expensive.', "It's a bit too expensive."]],
  [/Should I buy this shirt\?/gi, ['Do you think I should buy this shirt?', 'Should I get this shirt?']],
  [/Which color do you prefer\?/gi, ['Which colour do you prefer?', 'What color do you prefer?']],
  [/This color fits you better\./gi, ['This colour fits you better.', 'This color looks better on you.']],
  [/Do you accept credit cards\?/gi, ['Can I pay by credit card?', 'Do you take credit cards?']],
  [/I need to return this shirt\./gi, ['I want to return this shirt.', "I'd like to return this shirt."]],
  [/Can you help with laundry\?/gi, ['Could you help with laundry?', 'Can you help me with the laundry?']],
  [/I vacuum twice a week\./gi, ['I vacuum two times a week.', 'I vacuum twice weekly.']],
  [/What time will you be back\?/gi, ['When will you be back?', 'What time are you coming back?']],
  [/I have a ton of work today\./gi, ['I have a lot of work today.', "I've got tons of work today."]],
]

function swapWords(sentence) {
  const out = new Set()
  for (const group of SWAP_GROUPS) {
    for (const from of group) {
      const re = new RegExp(`\\b${from}\\b`, 'gi')
      if (!re.test(sentence)) continue
      for (const to of group) {
        if (to.toLowerCase() === from.toLowerCase()) continue
        const next = sentence.replace(new RegExp(`\\b${from}\\b`, 'gi'), (m) => {
          if (m[0] === m[0].toUpperCase()) return to[0].toUpperCase() + to.slice(1)
          return to
        })
        if (next !== sentence) out.add(next)
      }
    }
  }
  return [...out]
}

function contractionVariants(sentence) {
  const out = new Set([sentence])
  const pairs = [
    [/\bI am\b/g, "I'm"],
    [/\bI'm\b/g, 'I am'],
    [/\bYou are\b/g, "You're"],
    [/\bYou're\b/g, 'You are'],
    [/\bWe are\b/g, "We're"],
    [/\bWe're\b/g, 'We are'],
    [/\bIt is\b/g, "It's"],
    [/\bIt's\b/g, 'It is'],
    [/\bThat is\b/g, "That's"],
    [/\bThat's\b/g, 'That is'],
    [/\bWhat is\b/g, "What's"],
    [/\bWhat's\b/g, 'What is'],
    [/\bI will\b/g, "I'll"],
    [/\bI'll\b/g, 'I will'],
    [/\bI have\b/g, "I've"],
    [/\bI've\b/g, 'I have'],
    [/\bdo not\b/g, "don't"],
    [/\bdon't\b/g, 'do not'],
    [/\bcannot\b/g, "can't"],
    [/\bcan't\b/g, 'cannot'],
    [/\bwill not\b/g, "won't"],
    [/\bwon't\b/g, 'will not'],
    [/\blet us\b/gi, "let's"],
    [/\blet's\b/gi, 'let us'],
  ]
  for (const s of [...out]) {
    for (const [re, to] of pairs) {
      if (re.test(s)) out.add(s.replace(re, to))
    }
  }
  return [...out]
}

function phraseVariants(sentence) {
  const out = new Set()
  for (const [re, alts] of PHRASE_SWAPS) {
    if (re.test(sentence)) {
      for (const a of alts) out.add(a)
    }
  }
  return [...out]
}

function enrich(sentence) {
  const base = sentence.en
  const alts = new Set([...(sentence.alts || [])])
  for (const v of contractionVariants(base)) {
    if (v !== base) alts.add(v)
  }
  for (const v of swapWords(base)) alts.add(v)
  for (const v of phraseVariants(base)) alts.add(v)
  // also swap words on existing alts once
  for (const a of [...alts]) {
    for (const v of swapWords(a)) alts.add(v)
    for (const v of contractionVariants(a)) alts.add(v)
  }
  alts.delete(base)
  const list = [...alts].filter(Boolean).slice(0, 24)
  return { ...sentence, ...(list.length ? { alts: list } : {}) }
}

const enriched = SENTENCES.map(enrich)
console.log('sentences', enriched.length)
console.log('with alts', enriched.filter((s) => s.alts?.length).length)
console.log('avg alts', (enriched.reduce((n, s) => n + (s.alts?.length || 0), 0) / enriched.length).toFixed(2))

const body = enriched.map((s) => {
  const alts = s.alts?.length ? `,\n    alts: ${JSON.stringify(s.alts, null, 6).replace(/\n/g, '\n    ')}` : ''
  return `  { id: ${JSON.stringify(s.id)}, set: ${JSON.stringify(s.set)}, zh: ${JSON.stringify(s.zh)}, en: ${JSON.stringify(s.en)}${alts} }`
}).join(',\n')

const out = `/** @typedef {{ id: string, zh: string, en: string, set: string, alts?: string[] }} Sentence */

/** @type {Sentence[]} */
export const SENTENCES = [
${body},
]

export const SETS = [
  { id: 'work', label: '上班日常', count: SENTENCES.filter((s) => s.set === 'work').length },
  { id: 'easy', label: '初级 1–100', count: SENTENCES.filter((s) => s.set === 'easy').length },
  { id: 'medium', label: '中级 101–200', count: SENTENCES.filter((s) => s.set === 'medium').length },
  { id: 'advanced', label: '高级 201–300', count: SENTENCES.filter((s) => s.set === 'advanced').length },
]
`

writeFileSync(new URL('../src/sentences.js', import.meta.url), out)
console.log('wrote src/sentences.js')
