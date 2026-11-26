/** @typedef {{ id: string, zh: string, en: string, set: string, alts?: string[] }} Sentence */

/** @type {Sentence[]} */
export const SENTENCES = [
  { id: "w1", set: "work", zh: "我到了會先登入電腦。", en: "I log into my computer when I arrive." },
  { id: "w2", set: "work", zh: "我每天早上都會看團隊日曆。", en: "I check the team calendar every morning.",
    alts: [
          "I bill the team calendar every morning."
    ] },
  { id: "w3", set: "work", zh: "我先回復緊急的郵件。", en: "I answer urgent emails first.",
    alts: [
          "I reply urgent emails first.",
          "I respond urgent emails first.",
          "I answer urgent mails first.",
          "I reply urgent mails first.",
          "I respond urgent mails first."
    ] },
  { id: "w4", set: "work", zh: "開始工作前我會先泡杯咖啡。", en: "I make a fresh cup of coffee before starting." },
  { id: "w5", set: "work", zh: "我通常會複習昨天的筆記。", en: "I usually review yesterday's notes." },
  { id: "w6", set: "work", zh: "我白天會更新待辦清單。", en: "I update my to-do list during the day." },
  { id: "w7", set: "work", zh: "我會短暫休息來保持專注。", en: "I take short breaks to stay focused." },
  { id: "w8", set: "work", zh: "我中午前會回完所有郵件。", en: "I respond to all emails by noon.",
    alts: [
          "I reply to all emails by noon.",
          "I answer to all emails by noon.",
          "I respond to all mails by noon.",
          "I reply to all mails by noon.",
          "I answer to all mails by noon."
    ] },
  { id: "w9", set: "work", zh: "我會回顧本週的目標。", en: "I review my goals for the week." },
  { id: "w10", set: "work", zh: "我十點參加每日團隊會議。", en: "I join our daily team call at 10." },
  { id: "w11", set: "work", zh: "我會預留深度工作時間。", en: "I block time for deep work." },
  { id: "w12", set: "work", zh: "我通常午飯前寫完報告。", en: "I usually finish reports before lunch.",
    alts: [
          "I usually complete reports before lunch."
    ] },
  { id: "w13", set: "work", zh: "每次會議後我會發出更新。", en: "I send out updates after each meeting." },
  { id: "w14", set: "work", zh: "午餐時我會去散步。", en: "I take a walk during lunch." },
  { id: "w15", set: "work", zh: "開會時我會關掉通知。", en: "I turn off notifications during meetings." },
  { id: "w16", set: "work", zh: "下午我會檢查進度。", en: "I check my progress in the afternoon.",
    alts: [
          "I bill my progress in the afternoon."
    ] },
  { id: "w17", set: "work", zh: "忙碌時段我會避免一心多用。", en: "I avoid multitasking during busy hours." },
  { id: "w18", set: "work", zh: "我會把重要檔案存到雲端。", en: "I save important documents to the cloud." },
  { id: "w19", set: "work", zh: "我下班前會回完訊息。", en: "I reply to messages before the end of the day.",
    alts: [
          "I respond to messages before the end of the day.",
          "I answer to messages before the end of the day."
    ] },
  { id: "w20", set: "work", zh: "下午我會整理桌面。", en: "I organize my desk in the afternoon." },
  { id: "w21", set: "work", zh: "離開前我通常會看明天的行程。", en: "I usually check tomorrow's schedule before leaving.",
    alts: [
          "I usually bill tomorrow's schedule before leaving."
    ] },
  { id: "w22", set: "work", zh: "我會記下今天完成的事。", en: "I note down what I finished today.",
    alts: [
          "I note down what I completed today.",
          "I note down what I done today."
    ] },
  { id: "w23", set: "work", zh: "我會準備明天會議的要點。", en: "I prepare talking points for tomorrow's meeting." },
  { id: "w24", set: "work", zh: "我五點會退出工作軟體。", en: "I log out of my work apps at 5." },
  { id: "w25", set: "work", zh: "離開前我會跟同事道別。", en: "I say goodbye to my coworkers before leaving.",
    alts: [
          "I say goodbye to my colleagues before leaving."
    ] },
  { id: "w26", set: "work", zh: "我會清理桌面並關掉標籤頁。", en: "I clean up my desktop and close tabs." },
  { id: "w27", set: "work", zh: "我每天下班大概五點半。", en: "I leave work around 5:30 every day." },
  { id: "w28", set: "work", zh: "我通常坐同一班公交回家。", en: "I usually take the same bus home." },
  { id: "w29", set: "work", zh: "六點後我不看工作郵件。", en: "I don't check work emails after 6.",
    alts: [
          "I do not check work emails after 6.",
          "I don't check work mails after 6.",
          "I don't bill work emails after 6.",
          "I do not check work mails after 6.",
          "I do not bill work emails after 6.",
          "I don't bill work mails after 6."
    ] },
  { id: "h1", set: "work", zh: "我大多時候從家裡帶午餐。", en: "I bring lunch from home most days." },
  { id: "h2", set: "work", zh: "我常喝水保持清醒。", en: "I drink water regularly to stay fresh." },
  { id: "h3", set: "work", zh: "專注時我會把手機靜音。", en: "I mute my phone during focus time.",
    alts: [
          "I mute my mobile during focus time."
    ] },
  { id: "h4", set: "work", zh: "我每週四參加培訓。", en: "I join training sessions every Thursday." },
  { id: "h5", set: "work", zh: "工作時我儘量遠離社交媒體。", en: "I try to stay off social media at work." },
  { id: "h6", set: "work", zh: "我會安排時間處理行政事務。", en: "I schedule time for admin tasks." },
  { id: "h7", set: "work", zh: "我會更新下週的空閒時間。", en: "I update my availability for the next week." },
  { id: "h8", set: "work", zh: "我每小時都會伸展一下腿。", en: "I stretch my legs every hour." },
  { id: "h9", set: "work", zh: "我會正確關機。", en: "I shut down my computer properly." },
  { id: "h10", set: "work", zh: "離開前我會關掉辦公室的燈。", en: "I turn off the office lights before I leave." },
  { id: "e1", set: "easy", zh: "該起床了。", en: "Time to get up.",
    alts: [
          "Time to see up.",
          "Time to know up.",
          "Time to understand up."
    ] },
  { id: "e2", set: "easy", zh: "我還很困。", en: "I'm still sleepy.",
    alts: [
          "I am still sleepy."
    ] },
  { id: "e3", set: "easy", zh: "我去洗手間。", en: "I go to the bathroom.",
    alts: [
          "I go to the restroom.",
          "I go to the toilet."
    ] },
  { id: "e4", set: "easy", zh: "我刷牙。", en: "I brush my teeth." },
  { id: "e5", set: "easy", zh: "我梳頭。", en: "I comb my hair." },
  { id: "e6", set: "easy", zh: "我很快穿好衣服。", en: "I get dressed quickly.",
    alts: [
          "I see dressed quickly.",
          "I know dressed quickly.",
          "I understand dressed quickly."
    ] },
  { id: "e7", set: "easy", zh: "我鋪床。", en: "I make my bed." },
  { id: "e8", set: "easy", zh: "我燒點水。", en: "I boil some water." },
  { id: "e9", set: "easy", zh: "我倒一杯牛奶。", en: "I pour a glass of milk." },
  { id: "e10", set: "easy", zh: "我煮咖啡。", en: "I make some coffee." },
  { id: "e11", set: "easy", zh: "你能幫我煎個蛋嗎？", en: "Could you fry me an egg?",
    alts: [
          "Can you fry me an egg?",
          "Could you fry an egg for me?",
          "Can you fry an egg for me?"
    ] },
  { id: "e12", set: "easy", zh: "早餐好了。", en: "Breakfast is ready." },
  { id: "e13", set: "easy", zh: "我吃吐司和蛋。", en: "I have toast and eggs.",
    alts: [
          "I've toast and eggs."
    ] },
  { id: "e14", set: "easy", zh: "我看一下手機。", en: "I check my phone.",
    alts: [
          "I check my mobile.",
          "I bill my phone.",
          "I bill my mobile."
    ] },
  { id: "e15", set: "easy", zh: "現在幾點了？", en: "What time is it?" },
  { id: "e16", set: "easy", zh: "我快遲到了。", en: "I'm running late.",
    alts: [
          "I am running late.",
          "I'm late.",
          "I am late."
    ] },
  { id: "e17", set: "easy", zh: "我穿上鞋子。", en: "I put on my shoes." },
  { id: "e18", set: "easy", zh: "我出門了。", en: "I leave the house." },
  { id: "e19", set: "easy", zh: "天氣很好。", en: "The weather is nice.",
    alts: [
          "The weather is good.",
          "The weather is great."
    ] },
  { id: "e20", set: "easy", zh: "今天可能會下雨。", en: "It might rain today." },
  { id: "e21", set: "easy", zh: "我忘帶傘了。", en: "I forgot my umbrella." },
  { id: "e22", set: "easy", zh: "我上公交車。", en: "I get on the bus.",
    alts: [
          "I see on the bus.",
          "I know on the bus.",
          "I understand on the bus."
    ] },
  { id: "e23", set: "easy", zh: "我堵車了。", en: "I'm stuck in traffic.",
    alts: [
          "I am stuck in traffic.",
          "I'm in traffic.",
          "I am in traffic."
    ] },
  { id: "e24", set: "easy", zh: "我到公司了。", en: "I arrive at work." },
  { id: "e25", set: "easy", zh: "抱歉我遲到了。", en: "Sorry I'm late.",
    alts: [
          "Sorry I am late."
    ] },
  { id: "e26", set: "easy", zh: "不會再發生了。", en: "It won't happen again.",
    alts: [
          "It will not happen again.",
          "That won't happen again.",
          "That will not happen again."
    ] },
  { id: "e27", set: "easy", zh: "別擔心。", en: "Don't worry about it.",
    alts: [
          "Don't worry.",
          "No worries."
    ] },
  { id: "e28", set: "easy", zh: "謝謝你，我很感激。", en: "I appreciate it.",
    alts: [
          "Thank you.",
          "Thanks a lot.",
          "Thanks.",
          "Thank you a lot.",
          "Thanks a ton.",
          "Thanks a plenty."
    ] },
  { id: "e29", set: "easy", zh: "你真好。", en: "That's very kind.",
    alts: [
          "That is very kind."
    ] },
  { id: "e30", set: "easy", zh: "你今天怎麼樣？", en: "How are you today?" },
  { id: "e31", set: "easy", zh: "我挺好的。", en: "I'm pretty good.",
    alts: [
          "I am pretty good.",
          "I'm pretty great.",
          "I'm pretty nice.",
          "I am pretty great.",
          "I am pretty nice."
    ] },
  { id: "e32", set: "easy", zh: "見到你真高興。", en: "Good to see you.",
    alts: [
          "Good to know you.",
          "Good to understand you.",
          "Good to get you.",
          "Great to see you.",
          "Nice to see you.",
          "Great to know you.",
          "Nice to know you.",
          "Great to understand you.",
          "Nice to understand you.",
          "Great to get you.",
          "Nice to get you."
    ] },
  { id: "e33", set: "easy", zh: "我檢視郵件。", en: "I check my emails.",
    alts: [
          "I check my mails.",
          "I bill my emails.",
          "I bill my mails."
    ] },
  { id: "e34", set: "easy", zh: "我接電話。", en: "I answer the phone.",
    alts: [
          "I reply the phone.",
          "I respond the phone.",
          "I answer the mobile.",
          "I reply the mobile.",
          "I respond the mobile."
    ] },
  { id: "e35", set: "easy", zh: "我馬上有個會議。", en: "I have a meeting soon.",
    alts: [
          "I've a meeting soon."
    ] },
  { id: "e36", set: "easy", zh: "我稍後再打給你。", en: "I'll call you later.",
    alts: [
          "I will call you later.",
          "I'll call later.",
          "I will call later."
    ] },
  { id: "e37", set: "easy", zh: "我正在處理。", en: "I'm working on it.",
    alts: [
          "I am working on it."
    ] },
  { id: "e38", set: "easy", zh: "給我一分鐘。", en: "Give me a minute.",
    alts: [
          "Give me a second.",
          "One moment.",
          "Hang on a second."
    ] },
  { id: "e39", set: "easy", zh: "你覺得呢？", en: "What do you think?" },
  { id: "e40", set: "easy", zh: "我同意你的看法。", en: "I agree with you.",
    alts: [
          "I agree.",
          "I agree with that."
    ] },
  { id: "e41", set: "easy", zh: "這是個好主意。", en: "That's a good idea.",
    alts: [
          "That is a good idea.",
          "That's a great idea.",
          "That's a nice idea.",
          "Good idea.",
          "That is a great idea.",
          "That is a nice idea.",
          "Great idea.",
          "Nice idea."
    ] },
  { id: "e42", set: "easy", zh: "我不這麼認為。", en: "I don't think so.",
    alts: [
          "I do not think so."
    ] },
  { id: "e43", set: "easy", zh: "我明白你的意思。", en: "I see your point.",
    alts: [
          "I see what you mean.",
          "I know what you mean.",
          "I understand what you mean.",
          "I get what you mean.",
          "I understand your point.",
          "I get your point.",
          "I know your point.",
          "I know what you mean",
          "I understand what you mean",
          "I get what you mean",
          "I see what you mean"
    ] },
  { id: "e44", set: "easy", zh: "讓我想想。", en: "Let me think about it." },
  { id: "e45", set: "easy", zh: "我休息一下。", en: "I take a break." },
  { id: "e46", set: "easy", zh: "該吃午飯了。", en: "It's time for lunch.",
    alts: [
          "It is time for lunch."
    ] },
  { id: "e47", set: "easy", zh: "我們出去吃吧。", en: "Let's eat out.",
    alts: [
          "let us eat out.",
          "let's eat out."
    ] },
  { id: "e48", set: "easy", zh: "我準備好了。", en: "I'm ready to go.",
    alts: [
          "I am ready to go."
    ] },
  { id: "e49", set: "easy", zh: "我們吃什麼？", en: "What should we eat?" },
  { id: "e50", set: "easy", zh: "我要披薩。", en: "I'll have the pizza.",
    alts: [
          "I will have the pizza."
    ] },
  { id: "e51", set: "easy", zh: "我喜歡辣的。", en: "I like it spicy." },
  { id: "e52", set: "easy", zh: "我也要一樣的。", en: "I'll get the same.",
    alts: [
          "I will get the same.",
          "I'll see the same.",
          "I'll know the same.",
          "I'll understand the same.",
          "I will see the same.",
          "I will know the same.",
          "I will understand the same."
    ] },
  { id: "e53", set: "easy", zh: "我需要更多餐巾紙。", en: "I need more napkins." },
  { id: "e54", set: "easy", zh: "真的很好吃。", en: "It's really delicious.",
    alts: [
          "It is really delicious."
    ] },
  { id: "e55", set: "easy", zh: "我吃飽了。", en: "I'm full now.",
    alts: [
          "I am full now."
    ] },
  { id: "e56", set: "easy", zh: "我們一起分攤賬單吧。", en: "Let's split the bill.",
    alts: [
          "Let's split the check.",
          "Let's go Dutch.",
          "Shall we split the bill?",
          "let us split the bill.",
          "let us split the check.",
          "let us go Dutch.",
          "Shall we split the check?",
          "let's split the bill."
    ] },
  { id: "e57", set: "easy", zh: "我用現金付。", en: "I'll pay in cash.",
    alts: [
          "I will pay in cash."
    ] },
  { id: "e58", set: "easy", zh: "我做完工作了。", en: "I finished my work.",
    alts: [
          "I completed my work.",
          "I done my work."
    ] },
  { id: "e59", set: "easy", zh: "我關掉電腦。", en: "I shut down my computer." },
  { id: "e60", set: "easy", zh: "我六點下班。", en: "I get off work at 6.",
    alts: [
          "I see off work at 6.",
          "I know off work at 6.",
          "I understand off work at 6.",
          "I leave work at 6.",
          "I finish work at 6.",
          "I complete work at 6."
    ] },
  { id: "e61", set: "easy", zh: "我得走了。", en: "I gotta go now.",
    alts: [
          "I have to go now.",
          "I've got to go now.",
          "I need to go now.",
          "I've to go now.",
          "I have got to go now."
    ] },
  { id: "e62", set: "easy", zh: "明天見。", en: "See you tomorrow.",
    alts: [
          "Know you tomorrow.",
          "Understand you tomorrow.",
          "Get you tomorrow.",
          "Catch you tomorrow.",
          "See you tomorrow!",
          "Know you tomorrow!",
          "Understand you tomorrow!",
          "Get you tomorrow!"
    ] },
  { id: "e63", set: "easy", zh: "我離開辦公室。", en: "I leave the office." },
  { id: "e64", set: "easy", zh: "我覺得好累。", en: "I feel so tired.",
    alts: [
          "I feel so exhausted."
    ] },
  { id: "e65", set: "easy", zh: "你感覺還好嗎？", en: "Are you feeling okay?" },
  { id: "e66", set: "easy", zh: "我昨晚沒睡好。", en: "I didn't sleep well." },
  { id: "e67", set: "easy", zh: "你有空嗎？", en: "Do you have a minute?" },
  { id: "e68", set: "easy", zh: "我們去買菜吧。", en: "Let's go grocery shopping.",
    alts: [
          "let us go grocery shopping.",
          "let's go grocery shopping."
    ] },
  { id: "e69", set: "easy", zh: "你能幫我嗎？", en: "Can you help me?",
    alts: [
          "Could you help me?",
          "Can you help me please?",
          "Could you please help me?",
          "Can you assist me?",
          "Can you please help me?",
          "Could you assist me?",
          "Could you help me please?",
          "Can you assist me please?",
          "Could you please assist me?",
          "Can you please assist me?"
    ] },
  { id: "e70", set: "easy", zh: "這個有貨嗎？", en: "Is this in stock?" },
  { id: "e71", set: "easy", zh: "謝謝你的幫助。", en: "Thank you for the help.",
    alts: [
          "Thank you for the assist.",
          "Thanks for the help.",
          "Thank you for helping.",
          "Thanks for the assist.",
          "Thanks for helping."
    ] },
  { id: "e72", set: "easy", zh: "你在排隊嗎？", en: "Are you in line?" },
  { id: "e73", set: "easy", zh: "我可以坐這裡嗎？", en: "Can I sit here?",
    alts: [
          "Could I sit here?"
    ] },
  { id: "e74", set: "easy", zh: "洗手間在哪裡？", en: "Where is the restroom?",
    alts: [
          "Where's the restroom?",
          "Where is the bathroom?",
          "Where's the bathroom?",
          "Where is the toilet?",
          "Where's the toilet?"
    ] },
  { id: "e75", set: "easy", zh: "就在那邊。", en: "It's over there.",
    alts: [
          "It is over there."
    ] },
  { id: "e76", set: "easy", zh: "你能指給我看嗎？", en: "Can you show me?",
    alts: [
          "Could you show me?"
    ] },
  { id: "e77", set: "easy", zh: "我沒聽清。", en: "I didn't catch that." },
  { id: "e78", set: "easy", zh: "請說慢一點。", en: "Please speak slowly." },
  { id: "e79", set: "easy", zh: "我今天走路回家。", en: "I walk home today." },
  { id: "e80", set: "easy", zh: "我正在路上。", en: "I'm on my way.",
    alts: [
          "I am on my way.",
          "I'm coming.",
          "I am coming."
    ] },
  { id: "e81", set: "easy", zh: "我終於到家了。", en: "I finally get home.",
    alts: [
          "I finally see home.",
          "I finally know home.",
          "I finally understand home."
    ] },
  { id: "e82", set: "easy", zh: "你今天好早。", en: "You're early today.",
    alts: [
          "You are early today."
    ] },
  { id: "e83", set: "easy", zh: "我脫掉鞋子。", en: "I take off my shoes." },
  { id: "e84", set: "easy", zh: "我坐在沙發上。", en: "I sit on the couch." },
  { id: "e85", set: "easy", zh: "你看到我的手機了嗎？", en: "Did you see my phone?",
    alts: [
          "Did you know my phone?",
          "Did you understand my phone?",
          "Did you get my phone?",
          "Did you see my mobile?",
          "Did you know my mobile?",
          "Did you understand my mobile?",
          "Did you get my mobile?"
    ] },
  { id: "e86", set: "easy", zh: "我沒看到。", en: "I haven't seen it." },
  { id: "e87", set: "easy", zh: "你在做什麼？", en: "What are you doing?" },
  { id: "e88", set: "easy", zh: "我在看電視。", en: "I'm watching TV.",
    alts: [
          "I am watching TV."
    ] },
  { id: "e89", set: "easy", zh: "你今天過得怎麼樣？", en: "How was your day?" },
  { id: "e90", set: "easy", zh: "我今天很忙。", en: "I had a busy day." },
  { id: "e91", set: "easy", zh: "你週六有空嗎？", en: "You free on Saturday?",
    alts: [
          "Are you free on Saturday?",
          "Are you available on Saturday?"
    ] },
  { id: "e92", set: "easy", zh: "我們這週末見面吧。", en: "Let's meet this weekend.",
    alts: [
          "let us meet this weekend.",
          "let's meet this weekend."
    ] },
  { id: "e93", set: "easy", zh: "聽起來不錯。", en: "Sounds good to me.",
    alts: [
          "Sounds great to me.",
          "Sounds nice to me.",
          "Sounds good.",
          "Sounds great.",
          "Sounds nice."
    ] },
  { id: "e94", set: "easy", zh: "晚飯吃什麼？", en: "What's for dinner?",
    alts: [
          "What is for dinner?"
    ] },
  { id: "e95", set: "easy", zh: "我們一起吃吧。", en: "Let's eat together.",
    alts: [
          "let us eat together.",
          "let's eat together."
    ] },
  { id: "e96", set: "easy", zh: "請把鹽遞給我。", en: "Please pass the salt." },
  { id: "e97", set: "easy", zh: "我來洗碗。", en: "I'll wash the dishes.",
    alts: [
          "I will wash the dishes.",
          "I'll do the dishes.",
          "I will do the dishes."
    ] },
  { id: "e98", set: "easy", zh: "我覺得困了。", en: "I feel sleepy." },
  { id: "e99", set: "easy", zh: "我設了鬧鐘。", en: "I set my alarm." },
  { id: "e100", set: "easy", zh: "我慢慢睡著了。", en: "I fall asleep slowly." },
  { id: "m101", set: "medium", zh: "你最近過得怎麼樣？", en: "How have you been lately?",
    alts: [
          "How have you been?",
          "How are you doing lately?"
    ] },
  { id: "m102", set: "medium", zh: "你今天看起來真棒。", en: "You look awesome today." },
  { id: "m103", set: "medium", zh: "好久不見了。", en: "It's been a long time.",
    alts: [
          "It is been a long time."
    ] },
  { id: "m104", set: "medium", zh: "你一點都沒變。", en: "You haven't changed at all." },
  { id: "m105", set: "medium", zh: "我們多聚聚吧。", en: "Let's hang out more often.",
    alts: [
          "let us hang out more often.",
          "let's hang out more often."
    ] },
  { id: "m106", set: "medium", zh: "今天星期幾？", en: "What day is it today?" },
  { id: "m107", set: "medium", zh: "真不敢相信已經週五了。", en: "I can't believe it's Friday.",
    alts: [
          "I cannot believe it's Friday.",
          "I could't believe it's Friday.",
          "I can't believe it is Friday.",
          "I could't believe it is Friday.",
          "I cannot believe it is Friday."
    ] },
  { id: "m108", set: "medium", zh: "我心情很好。", en: "I'm in a good mood.",
    alts: [
          "I am in a good mood.",
          "I'm in a great mood.",
          "I'm in a nice mood.",
          "I feel good today.",
          "I am in a great mood.",
          "I am in a nice mood.",
          "I feel great today.",
          "I feel nice today."
    ] },
  { id: "m109", set: "medium", zh: "今天天氣怎麼樣？", en: "How's the weather today?" },
  { id: "m110", set: "medium", zh: "今天冷得要命。", en: "It's freezing cold today.",
    alts: [
          "It is freezing cold today.",
          "It's really cold today.",
          "It is really cold today."
    ] },
  { id: "m111", set: "medium", zh: "外面雨下得很大。", en: "It's raining heavily outside.",
    alts: [
          "It is raining heavily outside.",
          "It's raining hard outside.",
          "It's raining difficult outside.",
          "It is raining hard outside."
    ] },
  { id: "m112", set: "medium", zh: "今天終於放晴了。", en: "It's finally clearing up today.",
    alts: [
          "It is finally clearing up today."
    ] },
  { id: "m113", set: "medium", zh: "你看起來好面熟。", en: "You look so familiar." },
  { id: "m114", set: "medium", zh: "我們以前見過嗎？", en: "Have we met before?" },
  { id: "m115", set: "medium", zh: "你住這附近嗎？", en: "Do you live around here?" },
  { id: "m116", set: "medium", zh: "你做什麼工作？", en: "What do you do for a living?",
    alts: [
          "What is your job?",
          "What do you do?",
          "What's your job?"
    ] },
  { id: "m117", set: "medium", zh: "我做市場行銷。", en: "I work in marketing." },
  { id: "m118", set: "medium", zh: "我打算換工作。", en: "I plan to change my job." },
  { id: "m119", set: "medium", zh: "我常聽人提起你。", en: "I've heard a lot about you.",
    alts: [
          "I have heard a lot about you.",
          "I've heard a ton about you.",
          "I've heard a plenty about you.",
          "I've heard so much about you.",
          "I have heard a ton about you.",
          "I have heard a plenty about you.",
          "I have heard so much about you."
    ] },
  { id: "m120", set: "medium", zh: "我想我們有共同的朋友。", en: "I think we have mutual friends." },
  { id: "m121", set: "medium", zh: "你有幾個兄弟姐妹？", en: "How many siblings do you have?" },
  { id: "m122", set: "medium", zh: "我是家裡唯一的兒子。", en: "I'm the only son in my family.",
    alts: [
          "I am the only son in my family.",
          "I'm an only son.",
          "I am an only son."
    ] },
  { id: "m123", set: "medium", zh: "你昨晚熬夜了嗎？", en: "Did you stay up late last night?" },
  { id: "m124", set: "medium", zh: "我通常睡八個小時。", en: "I sleep eight hours usually." },
  { id: "m125", set: "medium", zh: "我最近胖了五磅。", en: "I gained five pounds recently.",
    alts: [
          "I put on five pounds recently.",
          "I've gained five pounds recently.",
          "I have gained five pounds recently."
    ] },
  { id: "m126", set: "medium", zh: "我想減肥。", en: "I want to lose weight.",
    alts: [
          "I want to lose some weight.",
          "I'd like to lose weight."
    ] },
  { id: "m127", set: "medium", zh: "你多重？", en: "How much do you weigh?" },
  { id: "m128", set: "medium", zh: "我在努力保持身材。", en: "I'm trying to stay fit.",
    alts: [
          "I am trying to stay fit.",
          "I'm trying to keep fit.",
          "I am trying to keep fit."
    ] },
  { id: "m129", set: "medium", zh: "你多久運動一次？", en: "How often do you exercise?",
    alts: [
          "How often do you work out?",
          "How often do you go to the gym?"
    ] },
  { id: "m130", set: "medium", zh: "我早上練瑜伽。", en: "I do yoga in the morning.",
    alts: [
          "I practice yoga in the morning.",
          "I do yoga every morning."
    ] },
  { id: "m131", set: "medium", zh: "我有時會不吃午飯。", en: "I skip lunch sometimes." },
  { id: "m132", set: "medium", zh: "我正在慢慢習慣。", en: "I'm getting used to it.",
    alts: [
          "I am getting used to it."
    ] },
  { id: "m133", set: "medium", zh: "我們去散步吧。", en: "Let's go for a walk.",
    alts: [
          "let us go for a walk.",
          "Let us go for a walk.",
          "Shall we go for a walk?",
          "let's go for a walk."
    ] },
  { id: "m134", set: "medium", zh: "你到底有多高？", en: "How tall are you exactly?" },
  { id: "m135", set: "medium", zh: "我身高五英尺八英寸。", en: "I'm five feet eight inches.",
    alts: [
          "I am five feet eight inches."
    ] },
  { id: "m136", set: "medium", zh: "我比平均身高矮一點。", en: "I'm shorter than average.",
    alts: [
          "I am shorter than average."
    ] },
  { id: "m137", set: "medium", zh: "你今年要滿幾歲？", en: "How old are you turning?" },
  { id: "m138", set: "medium", zh: "我剛滿二十一歲。", en: "I just turned 21." },
  { id: "m139", set: "medium", zh: "我看起來幾歲？", en: "How old do I look?" },
  { id: "m140", set: "medium", zh: "我比你想的要年輕。", en: "I'm younger than you think.",
    alts: [
          "I am younger than you think."
    ] },
  { id: "m141", set: "medium", zh: "我們年紀差不多。", en: "We are about the same age.",
    alts: [
          "We're about the same age."
    ] },
  { id: "m142", set: "medium", zh: "今晚過來吃飯吧。", en: "Come over for dinner tonight." },
  { id: "m143", set: "medium", zh: "謝謝你邀請我過來。", en: "Thanks for having me over.",
    alts: [
          "Thank you for having me over.",
          "Thanks for inviting me over.",
          "Thank you for inviting me over."
    ] },
  { id: "m144", set: "medium", zh: "你想喝點什麼？", en: "What would you like to drink?",
    alts: [
          "What do you want to drink?",
          "Would you like something to drink?"
    ] },
  { id: "m145", set: "medium", zh: "別客氣，就像在自己家一樣。", en: "Make yourself at home.",
    alts: [
          "Please make yourself at home.",
          "Feel free to make yourself at home."
    ] },
  { id: "m146", set: "medium", zh: "我在考慮去旅行。", en: "I'm thinking of taking a trip.",
    alts: [
          "I am thinking of taking a trip."
    ] },
  { id: "m147", set: "medium", zh: "你想跟我們一起嗎？", en: "Do you want to join us?",
    alts: [
          "Would you like to join us?",
          "Wanna join us?"
    ] },
  { id: "m148", set: "medium", zh: "讓我看看行程。", en: "Let me check the schedule.",
    alts: [
          "Let me bill the schedule.",
          "Let me check my schedule.",
          "I'll check the schedule.",
          "Let me bill my schedule.",
          "I'll bill the schedule.",
          "I will check the schedule."
    ] },
  { id: "m149", set: "medium", zh: "我很期待。", en: "I'm looking forward to it.",
    alts: [
          "I am looking forward to it.",
          "I can't wait.",
          "I could't wait.",
          "I cannot wait."
    ] },
  { id: "m150", set: "medium", zh: "你收到我的郵件了嗎？", en: "Did you get my email?",
    alts: [
          "Did you see my email?",
          "Did you know my email?",
          "Did you understand my email?",
          "Did you get my mail?",
          "Have you got my email?",
          "Did you receive my email?",
          "Did you see my mail?",
          "Did you know my mail?",
          "Did you understand my mail?",
          "Have you got my mail?",
          "Did you receive my mail?"
    ] },
  { id: "m151", set: "medium", zh: "我在等回覆。", en: "I'm waiting for a reply.",
    alts: [
          "I am waiting for a reply.",
          "I'm waiting for a respond.",
          "I'm waiting for a answer.",
          "I'm waiting for a response.",
          "I am waiting for a respond.",
          "I am waiting for a answer.",
          "I am waiting for a response."
    ] },
  { id: "m152", set: "medium", zh: "我不確定該怎麼辦。", en: "I'm not sure what to do.",
    alts: [
          "I am not sure what to do.",
          "I'm not sure what I should do.",
          "I am not sure what I should do."
    ] },
  { id: "m153", set: "medium", zh: "我們一起想辦法吧。", en: "Let's find a solution together.",
    alts: [
          "let us find a solution together.",
          "Let us find a solution together.",
          "Let's solve this together.",
          "let's find a solution together.",
          "let us solve this together."
    ] },
  { id: "m154", set: "medium", zh: "我該改變主意嗎？", en: "Should I change my mind?",
    alts: [
          "Do you think I should change my mind?",
          "Should I rethink this?"
    ] },
  { id: "m155", set: "medium", zh: "你的意見對我很重要。", en: "Your opinion matters to me.",
    alts: [
          "Your opinion is important to me.",
          "I care about your opinion."
    ] },
  { id: "m156", set: "medium", zh: "你已經盡全力了。", en: "You've already done your best.",
    alts: [
          "You've already finished your best.",
          "You've already completed your best.",
          "You have already done your best.",
          "You've done your best.",
          "You have already finished your best.",
          "You have already completed your best.",
          "You've finished your best.",
          "You've completed your best."
    ] },
  { id: "m157", set: "medium", zh: "抱歉打擾你了。", en: "I'm sorry to disturb you.",
    alts: [
          "I am sorry to disturb you.",
          "Sorry to bother you."
    ] },
  { id: "m158", set: "medium", zh: "我可以用你的手機嗎？", en: "Can I use your phone?",
    alts: [
          "Could I use your phone?",
          "Can I use your mobile?",
          "Could I use your mobile?"
    ] },
  { id: "m159", set: "medium", zh: "我的電池快沒電了。", en: "My battery is dying.",
    alts: [
          "My battery is low.",
          "My phone is about to die.",
          "My mobile is about to die."
    ] },
  { id: "m160", set: "medium", zh: "現在方便嗎？", en: "Is this a good time?",
    alts: [
          "Is this a great time?",
          "Is this a nice time?",
          "Is now a good time?",
          "Are you free to talk?",
          "Is now a great time?",
          "Is now a nice time?"
    ] },
  { id: "m161", set: "medium", zh: "你講話斷斷續續的。", en: "You're breaking up.",
    alts: [
          "You are breaking up.",
          "I can't hear you clearly.",
          "I could't hear you clearly.",
          "I cannot hear you clearly."
    ] },
  { id: "m162", set: "medium", zh: "我改發簡訊給你。", en: "I'll text you instead.",
    alts: [
          "I will text you instead.",
          "I'll send you a text instead.",
          "I will send you a text instead."
    ] },
  { id: "m163", set: "medium", zh: "我明白你的意思。", en: "I see what you mean.",
    alts: [
          "I know what you mean.",
          "I understand what you mean.",
          "I get what you mean.",
          "I see your point.",
          "I understand your point.",
          "I get your point.",
          "I know what you're saying.",
          "I understand what you're saying.",
          "I know what you mean",
          "I understand what you mean",
          "I get what you mean",
          "I see your point",
          "I know your point.",
          "I see what you're saying.",
          "I get what you're saying.",
          "I see what you mean",
          "I know your point",
          "I understand your point",
          "I get your point"
    ] },
  { id: "m164", set: "medium", zh: "我們稍後再談。", en: "Let's talk about it later.",
    alts: [
          "let us talk about it later.",
          "Let us talk about it later.",
          "We can talk later.",
          "let's talk about it later.",
          "We could talk later."
    ] },
  { id: "m165", set: "medium", zh: "我今天不太舒服。", en: "I'm not feeling well today.",
    alts: [
          "I am not feeling well today.",
          "I feel sick today.",
          "I'm feeling sick today.",
          "I feel ill today.",
          "I'm feeling ill today.",
          "I am feeling sick today."
    ] },
  { id: "m166", set: "medium", zh: "我頭疼得厲害。", en: "I have a terrible headache.",
    alts: [
          "I've a terrible headache.",
          "I have a bad headache.",
          "I have a headache.",
          "I've a bad headache.",
          "I've a headache."
    ] },
  { id: "m167", set: "medium", zh: "我一直在打噴嚏。", en: "I can't stop sneezing.",
    alts: [
          "I cannot stop sneezing.",
          "I could't stop sneezing.",
          "I keep sneezing."
    ] },
  { id: "m168", set: "medium", zh: "我對花生過敏。", en: "I'm allergic to peanuts.",
    alts: [
          "I am allergic to peanuts.",
          "I have a peanut allergy.",
          "I've a peanut allergy."
    ] },
  { id: "m169", set: "medium", zh: "我很擔心你。", en: "I'm worried about you.",
    alts: [
          "I am worried about you.",
          "I'm concerned about you.",
          "I am concerned about you."
    ] },
  { id: "m170", set: "medium", zh: "我現在感覺好多了。", en: "I feel much better now.",
    alts: [
          "I am feeling much better now.",
          "I feel a lot better now.",
          "I'm feeling much better now.",
          "I feel a ton better now.",
          "I feel a plenty better now."
    ] },
  { id: "m171", set: "medium", zh: "謝謝你的支援，我很感激。", en: "I'm grateful for your support.",
    alts: [
          "I am grateful for your support.",
          "Thank you for your support.",
          "Thanks for your support."
    ] },
  { id: "m172", set: "medium", zh: "可以給我選單嗎？", en: "May I have a menu?",
    alts: [
          "May I've a menu?",
          "Can I have a menu?",
          "Could I have a menu?",
          "Can I've a menu?",
          "Could I've a menu?"
    ] },
  { id: "m173", set: "medium", zh: "你有什麼推薦？", en: "What do you recommend?",
    alts: [
          "What would you recommend?",
          "Any recommendations?"
    ] },
  { id: "m174", set: "medium", zh: "我還需要幾分鐘。", en: "I need a few more minutes.",
    alts: [
          "I need a couple more minutes.",
          "I need a bit more time."
    ] },
  { id: "m175", set: "medium", zh: "我們準備好點餐了。", en: "We're ready to order.",
    alts: [
          "We are ready to order.",
          "We're ready to order now.",
          "We are ready to order now."
    ] },
  { id: "m176", set: "medium", zh: "比起咖啡，我更喜歡茶。", en: "I prefer tea to coffee.",
    alts: [
          "I like tea more than coffee.",
          "I prefer tea over coffee."
    ] },
  { id: "m177", set: "medium", zh: "可以給我們一些水嗎？", en: "Can we have some water?",
    alts: [
          "Could we have some water?",
          "Can we get some water?",
          "Can we see some water?",
          "Can we know some water?",
          "Can we understand some water?",
          "Could we get some water?"
    ] },
  { id: "m178", set: "medium", zh: "這不是我點的。", en: "This isn't what I ordered.",
    alts: [
          "This is not what I ordered.",
          "This isn't my order."
    ] },
  { id: "m179", set: "medium", zh: "這個味道會不會太鹹？", en: "Does this taste too salty?",
    alts: [
          "Is this too salty?",
          "Does this taste salty?"
    ] },
  { id: "m180", set: "medium", zh: "週末有什麼計劃嗎？", en: "Any plans for the weekend?",
    alts: [
          "Do you have plans for the weekend?",
          "What are your plans for the weekend?"
    ] },
  { id: "m181", set: "medium", zh: "我們該幾點見面？", en: "What time should we meet?",
    alts: [
          "What time do we meet?",
          "When should we meet?"
    ] },
  { id: "m182", set: "medium", zh: "我七點來接你。", en: "I'll pick you up at seven.",
    alts: [
          "I will pick you up at seven.",
          "I'll pick you up at 7.",
          "I will pick you up at 7."
    ] },
  { id: "m183", set: "medium", zh: "已經有點晚了。", en: "It's getting late already.",
    alts: [
          "It is getting late already.",
          "It's getting late.",
          "It is getting late."
    ] },
  { id: "m184", set: "medium", zh: "我今天玩得很開心。", en: "I had a great time today.",
    alts: [
          "I had a good time today.",
          "I had a nice time today.",
          "I had a wonderful time today.",
          "I really enjoyed today."
    ] },
  { id: "m185", set: "medium", zh: "希望很快能再見到你。", en: "I'd love to see you soon.",
    alts: [
          "I'd love to know you soon.",
          "I'd love to understand you soon.",
          "I'd love to get you soon.",
          "I would love to see you soon.",
          "I'd like to see you soon.",
          "I would love to know you soon.",
          "I would love to understand you soon.",
          "I would love to get you soon.",
          "I'd like to know you soon.",
          "I'd like to understand you soon.",
          "I'd like to get you soon."
    ] },
  { id: "m186", set: "medium", zh: "你剪頭髮了嗎？", en: "Did you have a haircut?",
    alts: [
          "Did you get a haircut?",
          "Have you had a haircut?",
          "Did you see a haircut?",
          "Did you know a haircut?",
          "Did you understand a haircut?"
    ] },
  { id: "m187", set: "medium", zh: "你最喜歡哪部電影？", en: "What's your favourite movie?",
    alts: [
          "What's your favorite movie?",
          "What is your favourite movie?",
          "What is your favorite movie?",
          "Which movie do you like the most?",
          "Which movie do you like most?",
          "Which movie do you like best?",
          "What movie do you like the most?",
          "What movie do you like most?",
          "Which film do you like the most?",
          "What's your favorite film?",
          "What's your favourite film?",
          "What is your favourite film?",
          "What is your favorite film?",
          "Which film do you like most?",
          "Which film do you like best?",
          "What film do you like the most?",
          "What film do you like most?"
    ] },
  { id: "m188", set: "medium", zh: "我可以試穿這個嗎？", en: "Can I try this on?",
    alts: [
          "Could I try this on?",
          "May I try this on?"
    ] },
  { id: "m189", set: "medium", zh: "有小一號的嗎？", en: "Do you have a smaller size?",
    alts: [
          "Have you got a smaller size?",
          "Is there a smaller size?"
    ] },
  { id: "m190", set: "medium", zh: "這個有點太貴了。", en: "This is a bit too expensive.",
    alts: [
          "This is a little too expensive.",
          "It's a bit too expensive.",
          "This is a small too expensive.",
          "It is a bit too expensive."
    ] },
  { id: "m191", set: "medium", zh: "我該買這件襯衫嗎？", en: "Should I buy this shirt?",
    alts: [
          "Should I purchase this shirt?",
          "Do you think I should buy this shirt?",
          "Should I get this shirt?",
          "Do you think I should purchase this shirt?",
          "Should I see this shirt?",
          "Should I know this shirt?",
          "Should I understand this shirt?"
    ] },
  { id: "m192", set: "medium", zh: "你更喜歡哪個顏色？", en: "Which color do you prefer?",
    alts: [
          "Which colour do you prefer?",
          "What color do you prefer?",
          "What colour do you prefer?"
    ] },
  { id: "m193", set: "medium", zh: "這個顏色更適合你。", en: "This color fits you better.",
    alts: [
          "This colour fits you better.",
          "This color looks better on you.",
          "This colour looks better on you."
    ] },
  { id: "m194", set: "medium", zh: "你們收信用卡嗎？", en: "Do you accept credit cards?",
    alts: [
          "Can I pay by credit card?",
          "Do you take credit cards?",
          "Could I pay by credit card?"
    ] },
  { id: "m195", set: "medium", zh: "我要退這件襯衫。", en: "I need to return this shirt.",
    alts: [
          "I want to return this shirt.",
          "I'd like to return this shirt."
    ] },
  { id: "m196", set: "medium", zh: "你能幫我洗衣服嗎？", en: "Can you help with laundry?",
    alts: [
          "Could you help with laundry?",
          "Can you assist with laundry?",
          "Can you help me with the laundry?",
          "Could you assist with laundry?",
          "Could you help me with the laundry?",
          "Can you assist me with the laundry?"
    ] },
  { id: "m197", set: "medium", zh: "我每週吸塵兩次。", en: "I vacuum twice a week.",
    alts: [
          "I vacuum two times a week.",
          "I vacuum twice weekly."
    ] },
  { id: "m198", set: "medium", zh: "你幾點回來？", en: "What time will you be back?",
    alts: [
          "When will you be back?",
          "What time are you coming back?"
    ] },
  { id: "m199", set: "medium", zh: "我今天有一大堆工作。", en: "I have a ton of work today.",
    alts: [
          "I've a ton of work today.",
          "I have a lot of work today.",
          "I have a plenty of work today.",
          "I've got tons of work today.",
          "I've a lot of work today.",
          "I've a plenty of work today.",
          "I have got tons of work today."
    ] },
  { id: "m200", set: "medium", zh: "我明天請假一天。", en: "I'm taking a day off tomorrow.",
    alts: [
          "I am taking a day off tomorrow.",
          "I have tomorrow off.",
          "I've tomorrow off."
    ] },
  { id: "a201", set: "advanced", zh: "雨下了一整天。", en: "It's been raining all day long.",
    alts: [
          "It is been raining all day long."
    ] },
  { id: "a202", set: "advanced", zh: "你最好帶把傘。", en: "You'd better bring an umbrella with you." },
  { id: "a203", set: "advanced", zh: "請問，去商場怎麼走？", en: "Excuse me, how do I get to the mall?",
    alts: [
          "Excuse me, how do I see to the mall?",
          "Excuse me, how do I know to the mall?",
          "Excuse me, how do I understand to the mall?"
    ] },
  { id: "a204", set: "advanced", zh: "直走，到拐角左轉。", en: "Go straight and turn left at the corner." },
  { id: "a205", set: "advanced", zh: "我們認識很久了。", en: "We've known each other for a long time." },
  { id: "a206", set: "advanced", zh: "謝謝你一直支援我。", en: "Thanks for always having my back.",
    alts: [
          "Thank you for always having my back."
    ] },
  { id: "a207", set: "advanced", zh: "這些天黑得越來越早了。", en: "It's getting dark much earlier these days.",
    alts: [
          "It is getting dark much earlier these days."
    ] },
  { id: "a208", set: "advanced", zh: "我開一下窗你介意嗎？", en: "Do you mind if I open the window?" },
  { id: "a209", set: "advanced", zh: "我想你打錯電話了。", en: "I think you have the wrong number." },
  { id: "a210", set: "advanced", zh: "這裡沒有叫這個名字的人。", en: "There's no one here by that name." },
  { id: "a211", set: "advanced", zh: "能請你把音樂調小聲一點嗎？", en: "Could you please turn down the music?",
    alts: [
          "Can you please turn down the music?"
    ] },
  { id: "a212", set: "advanced", zh: "控制一下你的脾氣。", en: "Keep your temper under control." },
  { id: "a213", set: "advanced", zh: "我這些天壓力好大。", en: "I'm so stressed out these days.",
    alts: [
          "I am so stressed out these days."
    ] },
  { id: "a214", set: "advanced", zh: "你睡夠了嗎？", en: "Have you been sleeping enough?" },
  { id: "a215", set: "advanced", zh: "我昨晚又失眠了。", en: "I couldn't sleep again last night." },
  { id: "a216", set: "advanced", zh: "你最近瘦了嗎？", en: "Did you lose some weight recently?" },
  { id: "a217", set: "advanced", zh: "你有規律運動嗎？", en: "Have you been exercising regularly?" },
  { id: "a218", set: "advanced", zh: "我一週鍛鍊三次。", en: "I work out three times a week." },
  { id: "a219", set: "advanced", zh: "你要不要跟我一起去健身房？", en: "Do you want to join me at the gym?" },
  { id: "a220", set: "advanced", zh: "暴風雨終於要過去了。", en: "The storm is finally moving out." },
  { id: "a221", set: "advanced", zh: "我還是不習慣這裡的天氣。", en: "I still can't get used to the weather here.",
    alts: [
          "I still cannot get used to the weather here.",
          "I still can't see used to the weather here.",
          "I still can't know used to the weather here.",
          "I still can't understand used to the weather here.",
          "I still could't get used to the weather here.",
          "I still cannot see used to the weather here.",
          "I still cannot know used to the weather here.",
          "I still cannot understand used to the weather here.",
          "I still could't see used to the weather here.",
          "I still could't know used to the weather here.",
          "I still could't understand used to the weather here."
    ] },
  { id: "a222", set: "advanced", zh: "你現在有交往物件嗎？", en: "Are you seeing anyone right now?" },
  { id: "a223", set: "advanced", zh: "我單身有一段時間了。", en: "I've been single for a while.",
    alts: [
          "I have been single for a while."
    ] },
  { id: "a224", set: "advanced", zh: "今晚你想吃什麼？", en: "What do you feel like eating tonight?" },
  { id: "a225", set: "advanced", zh: "我想吃點辣的。", en: "I'm in the mood for something spicy.",
    alts: [
          "I am in the mood for something spicy."
    ] },
  { id: "a226", set: "advanced", zh: "嘴裡有食物時不要說話。", en: "Don't talk with your mouth full." },
  { id: "a227", set: "advanced", zh: "這個用英語怎麼說？", en: "What do you call this in English?",
    alts: [
          "How do you say this in English?",
          "How do you call this in English?",
          "How do you say it in English?",
          "How do you call it in English?",
          "What's this called in English?",
          "What is this called in English?",
          "How can I say this in English?",
          "How could I say this in English?"
    ] },
  { id: "a228", set: "advanced", zh: "走到那裡要多久？", en: "How long does it take to walk there?" },
  { id: "a229", set: "advanced", zh: "從這裡走大概十分鐘。", en: "It's about a 10 minute walk from here.",
    alts: [
          "It is about a 10 minute walk from here."
    ] },
  { id: "a230", set: "advanced", zh: "我想要一杯杏仁奶卡布奇諾。", en: "I'd like a cappuccino with almond milk." },
  { id: "a231", set: "advanced", zh: "可以再加一份濃縮咖啡嗎？", en: "Can I get an extra shot of espresso?",
    alts: [
          "Can I see an extra shot of espresso?",
          "Can I know an extra shot of espresso?",
          "Can I understand an extra shot of espresso?",
          "Could I get an extra shot of espresso?",
          "Could I see an extra shot of espresso?",
          "Could I know an extra shot of espresso?",
          "Could I understand an extra shot of espresso?"
    ] },
  { id: "a232", set: "advanced", zh: "你襯衫穿反了。", en: "You're wearing your shirt backwards.",
    alts: [
          "You are wearing your shirt backwards."
    ] },
  { id: "a233", set: "advanced", zh: "那件外套你穿很好看。", en: "That jacket looks great on you.",
    alts: [
          "That jacket looks good on you.",
          "That jacket looks nice on you."
    ] },
  { id: "a234", set: "advanced", zh: "你長得像我一個朋友。", en: "You look like a friend of mine." },
  { id: "a235", set: "advanced", zh: "下班後要不要去喝一杯？", en: "Would you like to have a drink after work?" },
  { id: "a236", set: "advanced", zh: "我很期待這個長週末。", en: "I'm excited for the long weekend.",
    alts: [
          "I am excited for the long weekend."
    ] },
  { id: "a237", set: "advanced", zh: "我哥哥有時真讓我抓狂。", en: "My brother drives me crazy sometimes." },
  { id: "a238", set: "advanced", zh: "他很有幽默感。", en: "He has a great sense of humor.",
    alts: [
          "He has a good sense of humor.",
          "He has a nice sense of humor."
    ] },
  { id: "a239", set: "advanced", zh: "你的電話我打不通。", en: "I couldn't get through to your phone.",
    alts: [
          "I couldn't see through to your phone.",
          "I couldn't know through to your phone.",
          "I couldn't understand through to your phone.",
          "I couldn't get through to your mobile.",
          "I couldn't see through to your mobile.",
          "I couldn't know through to your mobile.",
          "I couldn't understand through to your mobile."
    ] },
  { id: "a240", set: "advanced", zh: "抱歉讓你久等了。", en: "Sorry for keeping you waiting." },
  { id: "a241", set: "advanced", zh: "我正在打另一個電話。", en: "I'm on another call right now.",
    alts: [
          "I am on another call right now."
    ] },
  { id: "a242", set: "advanced", zh: "你今天怎麼這麼低落？", en: "Why are you feeling so down today?" },
  { id: "a243", set: "advanced", zh: "我們出去走走透透氣吧。", en: "Let's take a walk and get some fresh air.",
    alts: [
          "let us take a walk and get some fresh air.",
          "Let's take a walk and see some fresh air.",
          "Let's take a walk and know some fresh air.",
          "Let's take a walk and understand some fresh air.",
          "let us take a walk and see some fresh air.",
          "let us take a walk and know some fresh air.",
          "let us take a walk and understand some fresh air.",
          "let's take a walk and get some fresh air."
    ] },
  { id: "a244", set: "advanced", zh: "我咳了一整晚。", en: "I've been coughing all night.",
    alts: [
          "I have been coughing all night."
    ] },
  { id: "a245", set: "advanced", zh: "記得要喝足夠的水。", en: "Make sure to drink plenty of water.",
    alts: [
          "Make sure to drink lot of water.",
          "Make sure to drink ton of water."
    ] },
  { id: "a246", set: "advanced", zh: "我可能該儘快去看醫生。", en: "I should probably see a doctor soon.",
    alts: [
          "I should probably know a doctor soon.",
          "I should probably understand a doctor soon.",
          "I should probably get a doctor soon."
    ] },
  { id: "a247", set: "advanced", zh: "這個藥我要多久吃一次？", en: "How often do I need to take this medicine?" },
  { id: "a248", set: "advanced", zh: "有什麼副作用嗎？", en: "Are there any side effects?" },
  { id: "a249", set: "advanced", zh: "我可以換成大號嗎？", en: "Can I exchange this for a large size?",
    alts: [
          "Could I exchange this for a large size?",
          "Can I exchange this for a big size?",
          "Could I exchange this for a big size?"
    ] },
  { id: "a250", set: "advanced", zh: "這個有其他顏色嗎？", en: "Do you have this in another color?",
    alts: [
          "Do you have this in another colour?"
    ] },
  { id: "a251", set: "advanced", zh: "我在考慮養一隻狗。", en: "I'm thinking about getting a dog.",
    alts: [
          "I am thinking about getting a dog."
    ] },
  { id: "a252", set: "advanced", zh: "你為什麼不試試看？", en: "Why don't you give it a try?",
    alts: [
          "Why do not you give it a try?"
    ] },
  { id: "a253", set: "advanced", zh: "沒什麼好擔心的。", en: "There's nothing to worry about." },
  { id: "a254", set: "advanced", zh: "今晚我們叫外賣吧。", en: "Let's order takeout tonight instead.",
    alts: [
          "let us order takeout tonight instead.",
          "Let's order takeaway tonight instead.",
          "Let's get takeout tonight instead.",
          "let's order takeout tonight instead.",
          "let us order takeaway tonight instead.",
          "Let's see takeout tonight instead.",
          "Let's know takeout tonight instead.",
          "Let's understand takeout tonight instead.",
          "let us get takeout tonight instead."
    ] },
  { id: "a255", set: "advanced", zh: "這正是我想的。", en: "That's exactly what I was thinking.",
    alts: [
          "That is exactly what I was thinking."
    ] },
  { id: "a256", set: "advanced", zh: "你介意幫我們拍張照嗎？", en: "Would you mind taking a photo of us?" },
  { id: "a257", set: "advanced", zh: "你最近備份照片了嗎？", en: "Have you backed up your photos recently?" },
  { id: "a258", set: "advanced", zh: "我的手機儲存完全滿了。", en: "My phone storage is completely full.",
    alts: [
          "My mobile storage is completely full."
    ] },
  { id: "a259", set: "advanced", zh: "我的網路連線有問題。", en: "I'm having trouble with the connection.",
    alts: [
          "I am having trouble with the connection."
    ] },
  { id: "a260", set: "advanced", zh: "我在試著少吃糖。", en: "I'm trying to cut back on sugar.",
    alts: [
          "I am trying to cut back on sugar."
    ] },
  { id: "a261", set: "advanced", zh: "這對我來說太鹹了。", en: "This is way too salty for me." },
  { id: "a262", set: "advanced", zh: "我是家裡最小的。", en: "I'm the youngest in my family.",
    alts: [
          "I am the youngest in my family."
    ] },
  { id: "a263", set: "advanced", zh: "我覺得這張賬單有錯。", en: "I think there's a mistake on this bill.",
    alts: [
          "I think there's a mistake on this check."
    ] },
  { id: "a264", set: "advanced", zh: "服務費是否已包含在內？", en: "Is service charge included?" },
  { id: "a265", set: "advanced", zh: "你最近看了什麼好電影嗎？", en: "Have you seen any good movies lately?",
    alts: [
          "Have you seen any great movies lately?",
          "Have you seen any nice movies lately?"
    ] },
  { id: "a266", set: "advanced", zh: "你喜歡什麼型別的音樂？", en: "What kind of music do you like?" },
  { id: "a267", set: "advanced", zh: "我花太多時間在社交媒體上。", en: "I spend too much time on social media." },
  { id: "a268", set: "advanced", zh: "家人對我來說就是一切。", en: "Family means everything to me." },
  { id: "a269", set: "advanced", zh: "我跟我媽很像。", en: "I take after my mother a lot.",
    alts: [
          "I take after my mom a lot.",
          "I look like my mother a lot.",
          "I look a lot like my mother.",
          "I look like my mom.",
          "I'm a lot like my mother.",
          "I take after my mum a lot.",
          "I take after my mother a ton.",
          "I take after my mother a plenty.",
          "I take after my mom a ton.",
          "I take after my mom a plenty.",
          "I look like my mom a lot.",
          "I look like my mum a lot.",
          "I look like my mother a ton.",
          "I look like my mother a plenty.",
          "I look a lot like my mom.",
          "I look a lot like my mum.",
          "I look a ton like my mother.",
          "I look a plenty like my mother.",
          "I look like my mother.",
          "I look like my mum.",
          "I'm a lot like my mom.",
          "I'm a lot like my mum.",
          "I'm a ton like my mother.",
          "I'm a plenty like my mother."
    ] },
  { id: "a270", set: "advanced", zh: "我很不擅長背東西。", en: "I'm terrible at memorizing things.",
    alts: [
          "I am terrible at memorizing things.",
          "I'm bad at memorizing things.",
          "I am bad at memorizing things."
    ] },
  { id: "a271", set: "advanced", zh: "今晚你能把垃圾拿出去嗎？", en: "Can you take out the trash tonight?",
    alts: [
          "Could you take out the trash tonight?",
          "Can you take out the garbage tonight?",
          "Could you take out the garbage tonight?"
    ] },
  { id: "a272", set: "advanced", zh: "晚飯後我來洗碗。", en: "I'll do the dishes after dinner.",
    alts: [
          "I will do the dishes after dinner.",
          "I'll wash the dishes after dinner.",
          "I will wash the dishes after dinner."
    ] },
  { id: "a273", set: "advanced", zh: "空調壞了。", en: "The air conditioner's not working." },
  { id: "a274", set: "advanced", zh: "你能幫我看一下這個嗎？", en: "Could you take a look at this for me?",
    alts: [
          "Can you take a look at this for me?"
    ] },
  { id: "a275", set: "advanced", zh: "單程票多少錢？", en: "How much is a one-way ticket?" },
  { id: "a276", set: "advanced", zh: "附近有免費停車嗎？", en: "Is there free parking nearby?",
    alts: [
          "Is there free parking near?"
    ] },
  { id: "a277", set: "advanced", zh: "你聽說昨天發生什麼了嗎？", en: "Did you hear what happened yesterday?" },
  { id: "a278", set: "advanced", zh: "好像有點誤會。", en: "There seems to be a misunderstanding." },
  { id: "a279", set: "advanced", zh: "你這週末有空嗎？", en: "Are you free this coming weekend?" },
  { id: "a280", set: "advanced", zh: "我應該幾點過來？", en: "What time should I come over?",
    alts: [
          "When should I come over?",
          "What time should I come by?",
          "When should I come by?"
    ] },
  { id: "a281", set: "advanced", zh: "你這樣說真是太客氣了。", en: "That's very kind of you to say.",
    alts: [
          "That is very kind of you to say."
    ] },
  { id: "a282", set: "advanced", zh: "你真好聊。", en: "You're so easy to talk to.",
    alts: [
          "You are so easy to talk to."
    ] },
  { id: "a283", set: "advanced", zh: "你以前去過歐洲嗎？", en: "Have you ever been to Europe before?" },
  { id: "a284", set: "advanced", zh: "有捷徑可以走嗎？", en: "Is there a shortcut I can take?",
    alts: [
          "Is there a shortcut I could take?"
    ] },
  { id: "a285", set: "advanced", zh: "你今晚需要加班嗎？", en: "Do you need to work overtime tonight?" },
  { id: "a286", set: "advanced", zh: "我這個月花太多了。", en: "I spent way too much this month." },
  { id: "a287", set: "advanced", zh: "這家店幾點關門？", en: "What time does this store close?",
    alts: [
          "What time does this shop close?"
    ] },
  { id: "a288", set: "advanced", zh: "我希望很快能升職。", en: "I'm hoping for a promotion soon.",
    alts: [
          "I am hoping for a promotion soon."
    ] },
  { id: "a289", set: "advanced", zh: "我們開始開會吧。", en: "Let's get started with the meeting.",
    alts: [
          "let us get started with the meeting.",
          "Let's see started with the meeting.",
          "Let's know started with the meeting.",
          "Let's understand started with the meeting.",
          "let us see started with the meeting.",
          "let us know started with the meeting.",
          "let us understand started with the meeting.",
          "let's get started with the meeting."
    ] },
  { id: "a290", set: "advanced", zh: "不知怎麼的，我沒收到你的訊息。", en: "I didn't receive your message somehow." },
  { id: "a291", set: "advanced", zh: "我得當面跟她談談。", en: "I have to talk to her in person.",
    alts: [
          "I've to talk to her in person."
    ] },
  { id: "a292", set: "advanced", zh: "我們意見並不總是一致。", en: "We don't see eye to eye on everything.",
    alts: [
          "We do not see eye to eye on everything.",
          "We don't know eye to eye on everything.",
          "We don't understand eye to eye on everything.",
          "We don't get eye to eye on everything.",
          "We don't always agree on everything.",
          "We disagree sometimes.",
          "We do not know eye to eye on everything.",
          "We do not understand eye to eye on everything.",
          "We do not get eye to eye on everything.",
          "We do not always agree on everything."
    ] },
  { id: "a293", set: "advanced", zh: "換成你會怎麼做？", en: "What would you do in my situation?" },
  { id: "a294", set: "advanced", zh: "我不建議那樣做。", en: "I wouldn't recommend doing that." },
  { id: "a295", set: "advanced", zh: "廚房的水龍頭在漏水。", en: "The faucet in the kitchen is leaking." },
  { id: "a296", set: "advanced", zh: "我明天得叫水管工。", en: "I need to call a plumber tomorrow." },
  { id: "a297", set: "advanced", zh: "我在學著更相信自己。", en: "I'm learning to trust myself more.",
    alts: [
          "I am learning to trust myself more."
    ] },
  { id: "a298", set: "advanced", zh: "學習新事物永遠不嫌晚。", en: "It's never too late to learn something new.",
    alts: [
          "It is never too late to learn something new."
    ] },
  { id: "a299", set: "advanced", zh: "我大概該走了。", en: "I should probably get going now.",
    alts: [
          "I should probably see going now.",
          "I should probably know going now.",
          "I should probably understand going now."
    ] },
  { id: "a300", set: "advanced", zh: "再次見到你真開心。", en: "It was so great seeing you again.",
    alts: [
          "It was so good seeing you again.",
          "It was so nice seeing you again."
    ] },
]

export const SETS = [
  { id: 'work', label: '上班日常', count: SENTENCES.filter((s) => s.set === 'work').length },
  { id: 'easy', label: '初級 1–100', count: SENTENCES.filter((s) => s.set === 'easy').length },
  { id: 'medium', label: '中級 101–200', count: SENTENCES.filter((s) => s.set === 'medium').length },
  { id: 'advanced', label: '高階 201–300', count: SENTENCES.filter((s) => s.set === 'advanced').length },
]
