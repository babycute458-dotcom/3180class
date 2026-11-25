/**
 * Meaning-based English matching for the whole sentence bank.
 * Principle: same meaning → pass; different meaning → fail.
 * Uses phrase rewrites + word lemmas (true synonyms only).
 */

const STOP = new Set([
  'a', 'an', 'the', 'to', 'for', 'of', 'in', 'on', 'at', 'by', 'as', 'so',
  'please', 'just', 'really', 'very', 'too', 'some', 'any', 'my', 'your',
  'our', 'their', 'his', 'her', 'its', 'me', 'you', 'him', 'them', 'us',
])

/**
 * Each group shares one lemma.
 * Only safe, context-insensitive synonyms. Contextual ones go in PHRASE_RULES.
 */
const WORD_GROUPS = [
  ['favorite', 'favourite'],
  ['color', 'colour'],
  ['movie', 'film'],
  ['movies', 'films'],
  ['can', 'could'],
  ['ok', 'okay', 'alright'],
  ['yes', 'yeah', 'yep'],
  ['bathroom', 'restroom', 'toilet', 'washroom'],
  ['mother', 'mom', 'mum', 'mommy', 'mummy'],
  ['father', 'dad', 'daddy'],
  ['coworker', 'colleague'],
  ['coworkers', 'colleagues'],
  ['begin', 'start'],
  ['finish', 'complete'],
  ['finished', 'completed'],
  ['buy', 'purchase'],
  ['bought', 'purchased'],
  ['big', 'large'],
  ['small', 'little'],
  ['happy', 'glad'],
  ['sick', 'ill'],
  ['kids', 'children'],
  ['kid', 'child'],
  ['hello', 'hi'],
  ['garbage', 'trash', 'rubbish'],
  ['apartment', 'flat'],
  ['elevator', 'lift'],
  ['vacation', 'holiday'],
  ['store', 'shop'],
  ['near', 'nearby'],
  ['hard', 'difficult'],
  ['wrong', 'incorrect'],
  ['email', 'e-mail'],
  ['emails', 'e-mails'],
  ['worried', 'concerned'],
  ['grateful', 'thankful'],
  ['recommend', 'suggest'],
  ['napkin', 'serviette'],
  ['napkins', 'serviettes'],
  ['line', 'queue'],
  ['delicious', 'tasty'],
  ['exercise', 'workout'],
]

const LEMMA = new Map()
for (const group of WORD_GROUPS) {
  const canon = group[0]
  for (const w of group) LEMMA.set(w, canon)
}

/**
 * Phrase → canonical phrase. Only true paraphrases.
 * Applied before word lemmatization. Longer phrases first.
 */
const PHRASE_RULES = [
  // understanding
  [/i know what you mean/g, 'i understand you'],
  [/i see what you mean/g, 'i understand you'],
  [/i understand what you mean/g, 'i understand you'],
  [/i get what you mean/g, 'i understand you'],
  [/i know what you are saying/g, 'i understand you'],
  [/i see what you are saying/g, 'i understand you'],
  [/i understand what you are saying/g, 'i understand you'],
  [/i get what you are saying/g, 'i understand you'],
  [/i see your point/g, 'i understand you'],
  [/i know your point/g, 'i understand you'],
  [/i understand your point/g, 'i understand you'],
  [/i get your point/g, 'i understand you'],
  [/i agree with you/g, 'i agree'],
  [/i agree with that/g, 'i agree'],
  [/that is a good idea/g, 'good idea'],
  [/that sounds like a good idea/g, 'good idea'],
  [/sounds good to me/g, 'sounds good'],
  [/sounds good/g, 'sounds good'],
  [/sounds great/g, 'sounds good'],

  // favorite item vs type (keep distinction)
  [/what is your favorite (\w+)/g, 'ask favorite $1'],
  [/what is favorite (\w+)/g, 'ask favorite $1'],
  [/which (\w+) do you like most/g, 'ask favorite $1'],
  [/what (\w+) do you like most/g, 'ask favorite $1'],
  [/which (\w+) do you like best/g, 'ask favorite $1'],
  [/what (\w+) do you like best/g, 'ask favorite $1'],
  [/which (\w+) do you prefer/g, 'ask favorite $1'],
  [/what kind of (\w+)/g, 'ask type $1'],
  [/which kind of (\w+)/g, 'ask type $1'],
  [/what type of (\w+)/g, 'ask type $1'],
  [/which type of (\w+)/g, 'ask type $1'],
  [/what sort of (\w+)/g, 'ask type $1'],
  [/which sort of (\w+)/g, 'ask type $1'],

  // call / say in English
  [/how do you say (.+) in english/g, 'ask english name $1'],
  [/how do you call (.+) in english/g, 'ask english name $1'],
  [/what do you call (.+) in english/g, 'ask english name $1'],
  [/what is (.+) called in english/g, 'ask english name $1'],

  // greetings / wellbeing
  [/how have you been lately/g, 'ask wellbeing'],
  [/how have you been/g, 'ask wellbeing'],
  [/how are you doing today/g, 'ask wellbeing'],
  [/how are you today/g, 'ask wellbeing'],
  [/how are you doing/g, 'ask wellbeing'],
  [/how are you/g, 'ask wellbeing'],
  [/how was your day/g, 'ask day'],
  [/how is your day/g, 'ask day'],

  // work / job
  [/what do you do for a living/g, 'ask job'],
  [/what is your job/g, 'ask job'],
  [/what do you do/g, 'ask job'],
  [/i work in marketing/g, 'job marketing'],
  [/i am in marketing/g, 'job marketing'],
  [/get off work/g, 'leave work'],
  [/finish work/g, 'leave work'],
  [/clock out/g, 'leave work'],
  [/log into/g, 'log into'],
  [/log in to/g, 'log into'],
  [/sign into/g, 'log into'],
  [/sign in to/g, 'log into'],

  // money / bill
  [/split the bill/g, 'split bill'],
  [/split the check/g, 'split bill'],
  [/go dutch/g, 'split bill'],
  [/pay in cash/g, 'pay cash'],
  [/pay cash/g, 'pay cash'],
  [/pay with cash/g, 'pay cash'],

  // time / place
  [/i am on my way/g, 'on the way'],
  [/i am coming/g, 'on the way'],
  [/see you tomorrow/g, 'bye tomorrow'],
  [/catch you tomorrow/g, 'bye tomorrow'],
  [/talk to you later/g, 'talk later'],
  [/i will call you later/g, 'call later'],
  [/i will text you instead/g, 'text instead'],
  [/give me a minute/g, 'wait a minute'],
  [/give me a second/g, 'wait a minute'],
  [/one moment/g, 'wait a minute'],
  [/hang on a second/g, 'wait a minute'],

  // health
  [/i am not feeling well/g, 'feeling sick'],
  [/i feel sick/g, 'feeling sick'],
  [/i feel ill/g, 'feeling sick'],
  [/i have a terrible headache/g, 'have headache'],
  [/i have a bad headache/g, 'have headache'],
  [/i have a headache/g, 'have headache'],

  // take after / resemble
  [/i take after my mother/g, 'resemble mother'],
  [/i take after my mom/g, 'resemble mother'],
  [/i look like my mother/g, 'resemble mother'],
  [/i look like my mom/g, 'resemble mother'],
  [/i look a lot like my mother/g, 'resemble mother'],
  [/i am a lot like my mother/g, 'resemble mother'],

  // misc common
  [/do not worry about it/g, 'dont worry'],
  [/do not worry/g, 'dont worry'],
  [/no worries/g, 'dont worry'],
  [/it will not happen again/g, 'wont happen again'],
  [/that will not happen again/g, 'wont happen again'],
  [/i am running late/g, 'running late'],
  [/i am stuck in traffic/g, 'in traffic'],
  [/stuck in traffic/g, 'in traffic'],
  [/i appreciate it/g, 'thank you'],
  [/thank you for the help/g, 'thank help'],
  [/thanks for the help/g, 'thank help'],
  [/thank you for helping/g, 'thank help'],
  [/make yourself at home/g, 'feel at home'],
  [/feel free to make yourself at home/g, 'feel at home'],
  [/i am looking forward to it/g, 'looking forward'],
  [/looking forward to it/g, 'looking forward'],
  [/i cannot wait/g, 'looking forward'],
  [/let us split/g, 'split bill'],
  [/order takeout/g, 'order takeout'],
  [/order take away/g, 'order takeout'],
  [/order takeaway/g, 'order takeout'],
  [/get takeout/g, 'order takeout'],
  [/i am getting used to it/g, 'getting used'],
  [/i am used to it now/g, 'getting used'],
  [/you are breaking up/g, 'signal bad'],
  [/i cannot hear you clearly/g, 'signal bad'],
  [/the connection is bad/g, 'signal bad'],
  [/we do not see eye to eye/g, 'disagree sometimes'],
  [/we do not always agree/g, 'disagree sometimes'],
  [/i take a day off/g, 'day off'],
  [/i am taking a day off/g, 'day off'],
  [/i have the day off/g, 'day off'],
]

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function expandContractions(text) {
  let t = text
  const pairs = [
    [/\bwhat's\b/g, 'what is'],
    [/\bwho's\b/g, 'who is'],
    [/\bwhere's\b/g, 'where is'],
    [/\bhow's\b/g, 'how is'],
    [/\bthat's\b/g, 'that is'],
    [/\bthere's\b/g, 'there is'],
    [/\bhere's\b/g, 'here is'],
    [/\bi'm\b/g, 'i am'],
    [/\byou're\b/g, 'you are'],
    [/\bwe're\b/g, 'we are'],
    [/\bthey're\b/g, 'they are'],
    [/\bi've\b/g, 'i have'],
    [/\byou've\b/g, 'you have'],
    [/\bwe've\b/g, 'we have'],
    [/\bthey've\b/g, 'they have'],
    [/\bi'll\b/g, 'i will'],
    [/\byou'll\b/g, 'you will'],
    [/\bwe'll\b/g, 'we will'],
    [/\bthey'll\b/g, 'they will'],
    [/\bi'd\b/g, 'i would'],
    [/\byou'd\b/g, 'you would'],
    [/\bwe'd\b/g, 'we would'],
    [/\bthey'd\b/g, 'they would'],
    [/\bdon't\b/g, 'do not'],
    [/\bdoesn't\b/g, 'does not'],
    [/\bdidn't\b/g, 'did not'],
    [/\bcan't\b/g, 'cannot'],
    [/\bcannot\b/g, 'can not'],
    [/\bwon't\b/g, 'will not'],
    [/\bisn't\b/g, 'is not'],
    [/\baren't\b/g, 'are not'],
    [/\bwasn't\b/g, 'was not'],
    [/\bweren't\b/g, 'were not'],
    [/\bhaven't\b/g, 'have not'],
    [/\bhasn't\b/g, 'has not'],
    [/\bhadn't\b/g, 'had not'],
    [/\bcouldn't\b/g, 'could not'],
    [/\bwouldn't\b/g, 'would not'],
    [/\bshouldn't\b/g, 'should not'],
    [/\blet's\b/g, 'let us'],
    [/\bgonna\b/g, 'going to'],
    [/\bwanna\b/g, 'want to'],
    [/\bgotta\b/g, 'have to'],
  ]
  for (const [re, to] of pairs) t = t.replace(re, to)
  return t
}

function applyPhrases(text) {
  let t = text
  // sort by pattern length roughly via array order (already longer-first where needed)
  for (const [re, to] of PHRASE_RULES) t = t.replace(re, to)
  return t
}

function lemmatizeToken(tok) {
  if (LEMMA.has(tok)) return LEMMA.get(tok)
  // light stemming for -ing/-ed/-s on unknown words (conservative)
  if (tok.length > 5 && tok.endsWith('ing')) return tok.slice(0, -3)
  if (tok.length > 4 && tok.endsWith('ed')) return tok.slice(0, -2)
  if (tok.length > 4 && tok.endsWith('s') && !tok.endsWith('ss')) return tok.slice(0, -1)
  return tok
}

/** Full meaning form used for comparison. */
export function meaningForm(text) {
  let t = normalize(text)
  t = expandContractions(t)
  t = applyPhrases(t)
  t = t
    .replace(/\bplease\b/g, ' ')
    .replace(/\bjust\b/g, ' ')
    .replace(/\breally\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const tokens = t
    .split(' ')
    .filter(Boolean)
    .map(lemmatizeToken)
    .filter((w) => w && !STOP.has(w))

  return tokens.join(' ')
}

function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[m][n]
}

function intentsConflict(a, b) {
  const fa = a.match(/\bask favorite (\w+)\b/)
  const fb = b.match(/\bask favorite (\w+)\b/)
  const ta = a.match(/\bask type (\w+)\b/)
  const tb = b.match(/\bask type (\w+)\b/)
  if (fa && tb) return true
  if (ta && fb) return true
  return false
}

/**
 * True if heard and expected express the same meaning.
 * `alts` are additional accepted reference sentences.
 */
export function sameMeaning(heard, expected, alts = []) {
  const raw = normalize(heard)
  if (!raw) return false

  const candidates = [expected, ...(alts || [])].filter(Boolean)
  const heardForm = meaningForm(heard)

  for (const candidate of candidates) {
    if (normalize(heard) === normalize(candidate)) return true

    const expForm = meaningForm(candidate)
    if (!expForm) continue
    if (intentsConflict(heardForm, expForm)) continue

    if (heardForm === expForm) return true

    // bag-of-lemmas equal
    const ha = heardForm.split(' ').filter(Boolean).sort().join(' ')
    const hb = expForm.split(' ').filter(Boolean).sort().join(' ')
    if (ha === hb) return true

    // small edit distance on meaning form
    const dist = levenshtein(heardForm, expForm)
    const maxLen = Math.max(heardForm.length, expForm.length) || 1
    if (maxLen <= 16 && dist <= 2) return true
    if (maxLen <= 36 && dist <= 3) return true
    if (dist / maxLen <= 0.14) return true

    // high lemma overlap with similar length
    const ta = heardForm.split(' ').filter(Boolean)
    const tb = expForm.split(' ').filter(Boolean)
    if (ta.length && tb.length) {
      const setB = new Set(tb)
      const overlap = ta.filter((w) => setB.has(w)).length
      const coverage = overlap / Math.max(tb.length, 1)
      const lengthRatio = Math.min(ta.length, tb.length) / Math.max(ta.length, tb.length)
      if (coverage >= 0.85 && lengthRatio >= 0.75 && Math.abs(ta.length - tb.length) <= 2) return true
    }
  }

  return false
}
