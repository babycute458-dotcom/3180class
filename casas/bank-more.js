BANK.push(
  {
    id: "A6", level: "A", title: "Cold Relief Tablets",
    paragraphs: [
      "This medicine is for adults with a stuffy nose and a sore throat. Take 1 tablet with water every 6 hours. Do not take more than 4 tablets in one day. Do not give this medicine to children under 12.",
      "Take the tablet with food if it upsets your stomach. Do not drive until you know how the medicine makes you feel. It may cause sleepiness. Avoid alcohol while you are taking it.",
      "Stop and call a doctor if a rash appears, or if the sore throat lasts more than 7 days. Keep the bottle closed and away from heat. The expiration date is printed on the bottom of the bottle."
    ],
    questions: [
      { weight: 1, q: "What is the most you may take in one day?", choices: ["1 tablet", "4 tablets", "6 tablets", "12 tablets"], answer: 1, why: "The label says not more than 4 tablets in one day.", whyZh: "標籤寫一天最多 4 顆。" },
      { weight: 1, q: "Who should not use this medicine?", choices: ["Adults with a stuffy nose", "Children under 12", "People who drink water", "People with a sore throat"], answer: 1, why: "The label says not to give it to children under 12.", whyZh: "12 歲以下不要用。" },
      { weight: 1, q: "What should you do if a rash appears?", choices: ["Take two more tablets", "Drive to work", "Stop and call a doctor", "Put the bottle in the sun"], answer: 2, why: "The label says to stop and call a doctor if a rash appears.", whyZh: "出現疹子要停藥並打電話給醫生。" },
      { weight: 2, q: "Why does the label mention driving?", choices: ["The medicine may cause sleepiness.", "Drivers pay less.", "The store is far away.", "Children may drive."], answer: 0, why: "It may cause sleepiness, so you should not drive until you know how you feel.", whyZh: "藥可能讓人想睡，所以先不要開車。" }
    ]
  },
  {
    id: "A7", level: "A", title: "A Note from Luis", by: "Luis",
    paragraphs: [
      "Dear Ana, I cannot come to dinner on Friday. My boss asked me to close the store. I am sorry to miss your birthday cake. Please save me one piece if you can.",
      "I will call you on Saturday morning. Thank you for inviting me. I was looking forward to seeing everyone. Your friend, Luis."
    ],
    questions: [
      { weight: 1, q: "Why is Luis writing?", choices: ["To invite Ana to the store", "To say he cannot come to dinner", "To ask Ana to work on Friday", "To sell a cake"], answer: 1, why: "He writes that he cannot come to dinner on Friday.", whyZh: "他寫星期五不能來吃飯。" },
      { weight: 2, q: "What is Luis's attitude toward missing the dinner?", choices: ["He is glad to miss it.", "He is sorry and still wants to see Ana later.", "He is angry at Ana.", "He does not care about the cake."], answer: 1, why: "He says he is sorry and will call on Saturday.", whyZh: "他感到抱歉，而且星期六還會打電話。" },
      { weight: 1, q: "What does he ask Ana to do?", choices: ["Close the store", "Save him a piece of cake", "Cancel the birthday", "Call his boss"], answer: 1, why: "He asks her to save him one piece if she can.", whyZh: "他請她可能的話留一塊蛋糕。" }
    ]
  },
  {
    id: "A8", level: "A", title: "Work Schedule",
    form: [["Monday", "Ana, 9–5"], ["Tuesday", "Ben, 9–5"], ["Wednesday", "Ana, 12–8"], ["Thursday", "Ben, 12–8"], ["Friday", "Both, 9–1"]],
    paragraphs: ["The board in the break room shows who opens the shop. A person whose name is on the board must be at the door on time. If you are sick, [[call the manager before your start time]]."],
    questions: [
      { weight: 1, q: "Who works on Wednesday afternoon?", choices: ["Only Ben", "Ana", "Nobody", "The manager only"], answer: 1, why: "Wednesday lists Ana from 12 to 8.", whyZh: "星期三是 Ana，12 點到 8 點。" },
      { weight: 1, q: "When do Ana and Ben both work?", choices: ["Monday all day", "Friday morning", "Thursday night", "Wednesday morning"], answer: 1, why: "Friday says both, from 9 to 1.", whyZh: "星期五兩人都上，9 點到 1 點。" },
      { weight: 2, q: "What does the underlined instruction tell a sick worker to do?", choices: ["Wait until the next day", "Tell the manager before the start time", "Come in and then leave", "Trade days with no call"], answer: 1, why: "The note says to call the manager before your start time.", whyZh: "生病要在上班時間之前打給經理。" }
    ]
  },
  {
    id: "B6", level: "B", title: "Email to a Teacher", by: "Mina Cho",
    paragraphs: [
      "Dear Ms. Rivera, I am writing because I missed class on Tuesday. My son was sick, and I had to stay home with him. I know the homework was due that day. I am sorry I did not send it.",
      "I finished the page last night. May I give it to you on Thursday? I also borrowed a classmate's notes, so I can see what I missed. Thank you for understanding. Sincerely, Mina Cho."
    ],
    questions: [
      { weight: 2, q: "Why did Mina miss class?", choices: ["She forgot the room.", "She stayed home with her sick son.", "She did not like the homework.", "The teacher canceled class."], answer: 1, why: "She writes that her son was sick and she stayed home.", whyZh: "她兒子生病，她留在家裡。" },
      { weight: 3, q: "What is Mina's attitude in this email?", choices: ["She blames the teacher.", "She is polite and sorry, and she wants to make up the work.", "She is uninterested in the class.", "She is angry about the notes."], answer: 1, why: "She apologizes and asks if she may turn the work in on Thursday.", whyZh: "她道歉，並請問星期四補交可不可以。" },
      { weight: 2, q: "What does she want to do on Thursday?", choices: ["Skip class again", "Give the teacher the finished homework", "Borrow the textbook", "Meet in the office only"], answer: 1, why: "She asks if she may give the finished page to the teacher on Thursday.", whyZh: "她想星期四把寫好的作業交上去。" }
    ]
  },
  {
    id: "B7", level: "B", title: "All-Purpose Cleaner",
    paragraphs: [
      "Spray the cleaner on a cool surface. Wipe with a dry cloth. For a greasy stove, spray and wait 2 minutes before you wipe. Do not use on wood, or on a screen.",
      "Keep the bottle away from children. If the cleaner gets in your eyes, rinse with water for 15 minutes and call a doctor. Do not mix this product with bleach. The fumes can be harmful.",
      "The word [[concentrated]] on the front means the liquid is strong. For floors, mix a small capful with a bucket of water. Using it full strength on a floor can leave a slippery film."
    ],
    questions: [
      { weight: 2, q: "What should you do before wiping a greasy stove?", choices: ["Mix the cleaner with bleach", "Wait 2 minutes", "Heat the stove", "Add it to a bucket"], answer: 1, why: "The label says to spray and wait 2 minutes before wiping grease.", whyZh: "油污要先噴、等 2 分鐘再擦。" },
      { weight: 3, q: "In this label, what does [[concentrated]] mean?", choices: ["Already mixed with water", "Strong, so it should be diluted for floors", "Safe to drink", "Only for wood"], answer: 1, why: "The label says the liquid is strong and should be mixed with water for floors.", whyZh: "這裡指很濃，擦地板要先加水稀釋。" },
      { weight: 2, q: "Why does the label say not to mix the cleaner with bleach?", choices: ["The color will change only.", "The fumes can be harmful.", "Bleach costs more.", "The cloth will be too dry."], answer: 1, why: "The label warns that the fumes can be harmful.", whyZh: "混合後的氣味可能有害。" }
    ]
  },
  {
    id: "B8", level: "B", title: "A Comment in the Break Room",
    paragraphs: [
      "Someone wrote on the whiteboard: \"People who leave dishes in the sink are careless.\" Under it, another person wrote, \"The late shift does not have time to wash them before the bus.\"",
      "The manager read both lines at the Monday meeting. She said the first line gives an [[opinion]], not a fact. Nobody measured who left the dishes. The second line gives a reason that might be true and should be checked.",
      "She asked the late shift to rinse cups before they leave, and she asked the morning shift not to write blame on the board. A factual note, she said, would be: \"Cups were in the sink at 7:00 a.m.\""
    ],
    questions: [
      { weight: 3, q: "Which sentence is an opinion?", choices: ["Cups were in the sink at 7:00 a.m.", "People who leave dishes are careless.", "The manager read both lines.", "The late shift takes a bus."], answer: 1, why: "Calling people careless is a judgment, not a checked fact.", whyZh: "說別人 careless 是看法，不是已查證的事實。" },
      { weight: 3, q: "What does the manager say [[opinion]] means here?", choices: ["A measured fact", "A judgment that was not proven", "A bus schedule", "A list of cups"], answer: 1, why: "She says the first line is an opinion because nobody measured who left the dishes.", whyZh: "沒有人查證是誰留下碗盤，所以那句是看法。" },
      { weight: 2, q: "What does the manager want the morning shift to stop doing?", choices: ["Rinsing cups", "Writing blame on the board", "Coming at 7:00 a.m.", "Taking the bus"], answer: 1, why: "She asked the morning shift not to write blame on the board.", whyZh: "她要早班不要在白板上寫責備的話。" }
    ]
  },
  {
    id: "C6", level: "C", title: "Letter to the Landlord", by: "Grace Allen",
    paragraphs: [
      "Dear Mr. Holt, I am writing about the heat in apartment 4B. For six nights the temperature has stayed near 58 degrees. I have two small children, and the youngest coughed through the night. I have already called the office twice.",
      "I am not asking for a new apartment. I am asking you to send someone this week. If the heater cannot be fixed quickly, please provide a safe space heater. I will pay my rent as usual. I do not think families should have to beg for heat in January.",
      "Please reply in writing by Friday. I want a record of what will be done. Sincerely, Grace Allen."
    ],
    questions: [
      { weight: 3, q: "What is Grace's attitude toward the landlord?", choices: ["She is amused and patient about waiting all winter.", "She is firm and frustrated, but she is still willing to pay rent.", "She wants to move out tomorrow.", "She is thanking him for quick repairs."], answer: 1, why: "She insists on a repair this week and says she should not have to beg, while promising to pay rent.", whyZh: "她態度堅定、不滿，但仍會照常付房租。" },
      { weight: 3, q: "What is the main point she wants him to understand?", choices: ["The rent is late.", "The apartment is too cold for her children, and she wants action this week.", "She needs a larger apartment.", "The office phone is broken."], answer: 1, why: "The letter is about nights at 58 degrees and a request for a repair this week.", whyZh: "重點是家裡太冷，她要這週就處理。" },
      { weight: 2, q: "Why does she want a written reply?", choices: ["So she can frame the letter", "So there is a record of what will be done", "So the children can read it", "So she can skip the rent"], answer: 1, why: "She says she wants a record of what will be done.", whyZh: "她要留下對方會怎麼處理的紀錄。" },
      { weight: 3, q: "The sentence \"I do not think families should have to beg for heat\" is best read as", choices: ["a fact about the temperature", "her opinion about how tenants should be treated", "a request for a new address", "a joke"], answer: 1, why: "It states what she believes tenants should not have to do.", whyZh: "這句是她對房客不該被迫乞求暖氣的看法。" }
    ]
  },
  {
    id: "C7", level: "C", title: "Pain Relief Gel",
    paragraphs: [
      "Adults and children 12 and older: apply a thin layer to the sore area 3 times a day. Rub until the gel disappears. Wash your hands after use. Do not cover the skin with a tight bandage unless a doctor tells you to.",
      "Do not use on broken skin, or near the eyes. Stop use if the skin burns for more than a few minutes. This gel only [[numbs]] the surface. It does not cure the cause of the pain. See a doctor if the pain lasts more than 7 days.",
      "External use only. If someone swallows the gel, call Poison Control. Store it at room temperature. Do not leave it in a hot car."
    ],
    questions: [
      { weight: 2, q: "How often should an adult apply the gel?", choices: ["Once a day", "3 times a day", "Every hour", "Only at night"], answer: 1, why: "The label says 3 times a day.", whyZh: "標籤寫一天 3 次。" },
      { weight: 3, q: "In this label, [[numbs]] means the gel", choices: ["heals the injury", "reduces feeling on the skin for a while", "warms the whole body", "must be swallowed"], answer: 1, why: "It reduces feeling on the surface and does not cure the cause.", whyZh: "只是讓皮膚表面暫時比較沒感覺，不是治好原因。" },
      { weight: 2, q: "What should you do if the gel is swallowed?", choices: ["Rub it on the skin", "Call Poison Control", "Cover it with a bandage", "Leave it in the car"], answer: 1, why: "The label says to call Poison Control if someone swallows it.", whyZh: "若不小心吞下，要打中毒防治電話。" },
      { weight: 3, q: "What is the label's purpose?", choices: ["To advertise a cure", "To tell users how to apply the gel safely", "To explain a doctor's life story", "To compare two hospitals"], answer: 1, why: "The label gives directions and warnings for safe use.", whyZh: "目的是說明怎麼安全使用。" }
    ]
  },
  {
    id: "C8", level: "C", title: "From the School Newsletter",
    paragraphs: [
      "Some parents believe the new homework rule is unfair. They say one hour a night is too much for third grade. The principal wrote that [[the hour should count reading, not only worksheets]]. That is her view of what the hour ought to include.",
      "The newsletter also reports a fact: last month, 40 of 120 families returned the survey. The writer then says, \"Most families support the rule.\" That claim goes beyond the surveys that came back. Families who did not answer are not the same as families who agreed.",
      "The purpose of the article is to explain the rule and answer complaints. It is not a neutral list of numbers only. The writer wants parents to accept the hour as reasonable."
    ],
    questions: [
      { weight: 4, q: "Which line is marked as an opinion?", choices: ["40 of 120 families returned the survey.", "The hour includes reading, and that is what should count.", "The survey was last month.", "There are 120 families."], answer: 1, why: "The underlined idea is the principal's view of what the hour should include.", whyZh: "劃線的是校長認為這一小時該怎麼算，這是看法。" },
      { weight: 3, q: "Why is \"Most families support the rule\" a weak claim?", choices: ["No survey was sent.", "Most families did not return the survey, so they cannot all be counted as supporters.", "The principal canceled homework.", "Only teachers were asked."], answer: 1, why: "Only 40 of 120 replied, so non-replies are not the same as agreement.", whyZh: "120 家只回了 40 家，沒回的不能算成贊成。" },
      { weight: 3, q: "What is the writer's purpose?", choices: ["To list numbers with no point of view", "To defend the homework hour as reasonable", "To close the school", "To report a sports score"], answer: 1, why: "The article explains the rule and wants parents to accept the hour.", whyZh: "作者想說這一小時的功課是合理的。" }
    ]
  },
  {
    id: "D6", level: "D", title: "A Letter from the Night Crew", by: "The evening shift",
    paragraphs: [
      "Dear Plant Manager, we are writing as a group because individual complaints have been treated as personal problems. For three weeks the line has started ten minutes before the posted time. People who arrive at the posted time are marked late. We were not told about the change in writing.",
      "We are willing to start earlier if the schedule and the pay both change. What we cannot accept is a rule that exists only in a supervisor's memory. Please post the real start time, or return to the time on the board.",
      "We respect the production goals. We do not respect being described as unreliable for following the schedule we were given. We would like a written answer before next Monday."
    ],
    questions: [
      { weight: 4, q: "What is the writers' attitude?", choices: ["They are casually joking about being early.", "They are collective, firm, and unwilling to be blamed for a rule they never received.", "They want the plant to close.", "They agree they have been unreliable."], answer: 1, why: "They write together, accept an earlier start only if pay and the schedule change, and reject being called unreliable.", whyZh: "他們一起寫、態度堅定，拒絕被說成不守時。" },
      { weight: 3, q: "What do they want by Monday?", choices: ["A verbal reminder only", "A written answer", "New machines", "A party for the night crew"], answer: 1, why: "The letter asks for a written answer before next Monday.", whyZh: "他們要下星期一之前的書面回覆。" },
      { weight: 4, q: "The sentence \"We do not respect being described as unreliable\" expresses", choices: ["a production number", "their opinion that the criticism is undeserved", "the posted start time", "a request for new boots"], answer: 1, why: "It is their judgment that the label does not fit people who followed the posted schedule.", whyZh: "這是他們的看法：照表上班的人不該被說成不可靠。" }
    ]
  },
  {
    id: "D7", level: "D", title: "Battery Notice",
    paragraphs: [
      "Charge the battery before first use. A full charge takes about 3 hours. The light turns green when charging is finished. Do not leave the battery on the charger for more than 12 hours.",
      "If the tool stops suddenly, the battery may be [[depleted]]. That means the charge is used up, not that the tool is broken. Put the battery back on the charger. If it will not hold a charge after three tries, call the number on the box.",
      "Do not open the battery case. Do not burn it. Store it away from metal objects that could connect the ends and cause heat. These steps prevent a fire. They do not make an old battery new."
    ],
    questions: [
      { weight: 2, q: "How long should a first charge take?", choices: ["12 minutes", "About 3 hours", "12 hours on purpose", "Three days"], answer: 1, why: "A full charge takes about 3 hours.", whyZh: "第一次大約充 3 小時。" },
      { weight: 4, q: "In this notice, [[depleted]] means", choices: ["broken beyond repair", "empty of charge", "too hot to touch", "still brand new"], answer: 1, why: "The notice says the charge is used up, not that the tool is broken.", whyZh: "這裡指電量用完，不是工具壞了。" },
      { weight: 3, q: "What is the purpose of the storage warning?", choices: ["To sell a second battery", "To prevent heat and fire", "To explain the green light", "To compare two brands"], answer: 1, why: "Storing it away from metal is meant to prevent a fire.", whyZh: "不要和金屬放在一起，是為了避免發熱起火。" }
    ]
  },
  {
    id: "D8", level: "D", title: "Two Sentences in the Editorial",
    paragraphs: [
      "The editorial says the city \"must\" raise the adult bus fare. Later it reports that ridership rose by 8 percent. The first statement tells readers what the writer thinks should happen. The second reports a change that can be checked.",
      "The writer then says riders who complain are [[shortsighted]]. In this editorial, the word does not mean they cannot see the street. It means the writer thinks they care too much about today's price and too little about next year's service.",
      "A careful reader can accept the 8 percent and still reject the word shortsighted. Numbers and judgments are doing different jobs. The opinion sits in the command to raise the fare and in the label for the riders, not in the ridership figure."
    ],
    questions: [
      { weight: 4, q: "Where is the writer's opinion clearest?", choices: ["In the 8 percent ridership figure", "In the claim that the city must raise the fare and that complainers are shortsighted", "In the date of the editorial", "In the list of bus numbers"], answer: 1, why: "Must and shortsighted are judgments. The percentage is a reported figure.", whyZh: "must 和 shortsighted 是看法，8% 是可查的數字。" },
      { weight: 4, q: "What does [[shortsighted]] mean in this editorial?", choices: ["Unable to read a sign across the street", "Too focused on the present cost, in the writer's view", "Standing at the wrong stop", "Paying the senior fare"], answer: 1, why: "The writer uses it for people who care about today's price more than future service.", whyZh: "作者用來形容只看眼前票價、不看未來服務的人。" },
      { weight: 3, q: "What can a careful reader do?", choices: ["Treat every sentence as a fact", "Accept the number and still disagree with the judgment", "Ignore both", "Assume the fare already changed"], answer: 1, why: "The passage says a reader can accept the 8 percent and still reject the label.", whyZh: "可以接受 8% 這個數字，同時不同意那個評語。" }
    ]
  },
  {
    id: "E6", level: "E", title: "Letter to the Editor", by: "Ruth Adeyemi",
    paragraphs: [
      "I am a night nurse, and I am tired of being told that the new bus plan is a gift. The gift, if that is the word, leaves downtown at 7:10 p.m. My shift ends at 11:00. A bed, a class, or a cheaper fare that I cannot reach is not a benefit. It is a press release.",
      "I am not opposed to raising money for more service. I am opposed to calling an unreachable service an improvement. If the board wants my support, it should publish the last trip that a night worker can actually catch, and it should say so without decoration.",
      "Until then I will keep paying for a ride that the plan pretends I do not need. Please do not write back to congratulate me on routes I will never see."
    ],
    questions: [
      { weight: 5, q: "What is the writer's attitude toward the plan?", choices: ["Grateful and celebratory", "Skeptical and angry that officials describe an unusable service as a gift", "Uninterested in buses", "Confused about her own shift"], answer: 1, why: "She rejects the word gift and the idea that an unreachable service is an improvement.", whyZh: "她不接受把她搭不到的服務說成禮物。" },
      { weight: 4, q: "What does she want the board to publish?", choices: ["A congratulations letter", "The last trip a night worker can actually catch, stated plainly", "Her hospital schedule", "A list of press releases"], answer: 1, why: "She asks for the last usable trip, without decoration.", whyZh: "她要末班可搭的車次，而且不要用裝飾性的說法。" },
      { weight: 5, q: "The sentence \"It is a press release\" means she thinks the plan is", choices: ["a detailed schedule", "publicity rather than a real benefit for her", "a medical form", "a cheaper night fare she already uses"], answer: 1, why: "She contrasts a real benefit with an announcement that does not help her.", whyZh: "她認為這是宣傳，不是她用得到的好處。" },
      { weight: 4, q: "Which request would satisfy her?", choices: ["More praise for riders", "A plain statement of the last trip night workers can catch", "Closing the night shift", "Raising her hospital pay"], answer: 1, why: "She says support depends on publishing the last trip she can catch.", whyZh: "她說要支持，就得公布夜班工人真正搭得到的末班車。" }
    ]
  },
  {
    id: "E7", level: "E", title: "From a Review of the Safety Report",
    paragraphs: [
      "The opening line celebrates a 15 percent drop in recordable injuries. A reader who stops there will miss the table, where cuts on the line went up. The drop came mostly from a winter with little ice in the parking lot. The line itself did not become safer.",
      "Workers told the reviewer they stopped reporting small cuts because the meeting afterward was unpaid and ran past the shift. The year therefore looks [[quieter]] than the floor was. In this review, quieter does not mean calmer work. It means fewer marks on the form.",
      "The writer's point is that a headline can be produced by silence. A number that falls because people stop reporting is not the same as a number that falls because fewer people are hurt. The opinion is not hidden in the 15 percent. It is in the claim that the report trains workers to keep quiet."
    ],
    questions: [
      { weight: 4, q: "What does the writer want the reader to infer?", choices: ["The parking lot caused every injury.", "The headline drop does not prove the line became safer.", "Cuts were invented.", "Winter ice increased."], answer: 1, why: "The drop is tied to the parking lot and the weather, while line injuries rose.", whyZh: "下降來自停車場和天氣，產線上的傷害並沒有變少。" },
      { weight: 5, q: "In this review, [[quieter]] means", choices: ["the machines made less noise", "fewer injuries were written down, not necessarily fewer injuries happened", "the winter was mild", "workers enjoyed the meetings"], answer: 1, why: "Quieter means fewer marks on the form, because people stopped reporting.", whyZh: "這裡指表格上記得比較少，不是工作真的比較安全。" },
      { weight: 5, q: "Where is the writer's opinion stated most directly?", choices: ["In the 15 percent figure", "In the claim that the report trains workers to keep quiet", "In the date of winter", "In the list of parking spaces"], answer: 1, why: "The passage says the opinion is that the report trains people to stay silent.", whyZh: "看法是這份報告在訓練工人不要聲張。" },
      { weight: 4, q: "What is the purpose of the review?", choices: ["To praise the headline", "To show how a falling number can mislead", "To teach first aid", "To close the parking lot"], answer: 1, why: "The review explains why the celebrated drop is not proof of safer work.", whyZh: "目的是說明下降的數字可能讓人誤解。" }
    ]
  },
  {
    id: "E8", level: "E", title: "Reply to a Tenant", by: "Owen Grant, Manager",
    paragraphs: [
      "Ms. Allen, I received your letter about the heat. I am sorry the apartment has been cold. A technician is scheduled for Thursday between 1:00 and 4:00 p.m. Someone 18 or older must be home. If nobody is there, the visit will be canceled and the next opening is the following week.",
      "I cannot leave a space heater in the unit. Our insurance does not allow it. I understand that this is not the answer you wanted. It is the answer I am able to give. Please do not withhold rent. A withheld payment will be treated as late, even if the repair is still pending.",
      "I recognize the frustrated tone of your letter, and I am not dismissing the six cold nights. I am telling you the limit of what this office can do before Thursday. If the technician cannot repair the heater that day, I will call you before 5:00 p.m. with the next step."
    ],
    questions: [
      { weight: 4, q: "What is the manager's attitude?", choices: ["He mocks the tenant.", "He is polite and acknowledges the problem, but he refuses the heater and warns about rent.", "He agrees to cancel the rent.", "He denies that the apartment was cold."], answer: 1, why: "He apologizes and schedules a repair, refuses the heater, and says withheld rent will be late.", whyZh: "他有道歉並安排修理，但拒絕電暖器，也警告不可以扣房租。" },
      { weight: 3, q: "What must the tenant do on Thursday?", choices: ["Stay away from the apartment", "Have someone 18 or older at home between 1:00 and 4:00", "Bring a space heater", "Pay a late fee in cash"], answer: 1, why: "Someone 18 or older must be home during the appointment window.", whyZh: "下午 1 點到 4 點要有 18 歲以上的人在家。" },
      { weight: 5, q: "The sentence \"It is the answer I am able to give\" suggests that he", choices: ["has not read the letter", "sees the refusal as a limit on his authority, not as a denial that she is cold", "wants her to move out the same day", "will deliver a heater at 5:00"], answer: 1, why: "He separates understanding her frustration from what the office is allowed to do.", whyZh: "他不是否認她冷，而是說辦公室能做的有限。" },
      { weight: 4, q: "What will he do if Thursday's repair fails?", choices: ["Nothing", "Call before 5:00 p.m. with the next step", "Withhold his own pay", "Leave a heater anyway"], answer: 1, why: "He says he will call before 5:00 p.m. with the next step.", whyZh: "修不好的話，他會在下午 5 點前打電話說明下一步。" }
    ]
  },
  {
    id: "A9", level: "A", title: "Park Market Weekend Ad",
    paragraphs: [
      "This Saturday only, chicken is $1.99 a pound. Buy one loaf of bread and get the second loaf free. The sale starts at 8:00 a.m. and ends at 6:00 p.m. Limit two free loaves for each shopper.",
      "Bring this ad to the service desk to get a $5 coupon for fruit. The coupon is for Saturday only. It cannot be used on milk or on items that are already on sale.",
      "Park Market is at 410 Oak Street. The bus stops in front of the store. Questions? Call 555-0148 before 5:00 p.m."
    ],
    questions: [
      { weight: 1, q: "How much is the chicken on Saturday?", choices: ["$1.99 a pound", "$5 a pound", "Buy one, get one free", "$5 for fruit"], answer: 0, why: "The ad says chicken is $1.99 a pound.", whyZh: "廣告寫雞肉一磅 1.99 元。" },
      { weight: 1, q: "What do you bring to the service desk?", choices: ["A free loaf", "This ad", "A bus pass", "Two pounds of chicken"], answer: 1, why: "You bring the ad to get the fruit coupon.", whyZh: "要拿這張廣告到服務台。" },
      { weight: 1, q: "When does the sale end?", choices: ["5:00 p.m.", "6:00 p.m.", "8:00 a.m.", "Sunday"], answer: 1, why: "The sale ends at 6:00 p.m.", whyZh: "特價到下午 6 點結束。" },
      { weight: 2, q: "What should a shopper do to get the fruit coupon?", choices: ["Call after 6:00 p.m.", "Bring the ad to the service desk on Saturday", "Buy milk", "Take the bus home first"], answer: 1, why: "The coupon is for Saturday, and you get it by bringing the ad to the service desk.", whyZh: "星期六把廣告拿到服務台，才能換水果折價券。" }
    ]
  },
  {
    id: "A10", level: "A", title: "Clinic Appointment",
    form: [["Patient", "Samira Haddad"], ["Date", "Tuesday, May 12"], ["Time", "2:30 p.m."], ["Doctor", "Dr. Patel"], ["Bring", "ID and insurance card"]],
    paragraphs: [
      "Please arrive 15 minutes early. Go to Window 2 and say your name. If you are more than 20 minutes late, the clinic may give your time to another patient.",
      "Do not eat or drink for 8 hours before a blood test. Water is allowed. Take your morning pills unless the nurse told you to skip them.",
      "To cancel, call 555-0172 the day before. A same-day cancellation may be charged a $15 fee."
    ],
    questions: [
      { weight: 1, q: "What time is the appointment?", choices: ["8:00 a.m.", "2:30 p.m.", "15 minutes", "The day before"], answer: 1, why: "The card says 2:30 p.m.", whyZh: "預約卡寫下午 2:30。" },
      { weight: 1, q: "What should Samira bring?", choices: ["A $15 fee only", "ID and her insurance card", "Breakfast", "Another patient"], answer: 1, why: "The card says to bring ID and an insurance card.", whyZh: "要帶身分證件和保險卡。" },
      { weight: 2, q: "What happens if she arrives more than 20 minutes late?", choices: ["The visit is longer.", "The clinic may give her time to someone else.", "She skips the fee.", "She must eat first."], answer: 1, why: "The note says a late patient may lose the appointment time.", whyZh: "遲到超過 20 分鐘，時間可能給別人。" },
      { weight: 2, q: "Why should she call the day before if she cannot come?", choices: ["To order pills", "To cancel in time and avoid a same-day fee", "To change doctors at Window 2", "To drink water"], answer: 1, why: "A same-day cancellation may cost $15, so she should call the day before.", whyZh: "當天取消可能要付 15 元，所以要前一天打電話。" }
    ]
  },
  {
    id: "B9", level: "B", title: "City Water Bill",
    form: [["Account", "4418"], ["Service", "March 1–31"], ["Water used", "9 units"], ["Amount due", "$46.20"], ["Due date", "April 18"], ["Late fee", "$8 after the due date"]],
    paragraphs: [
      "Pay at the city office, by phone, or on the city website. Write the account number on any check. A payment mailed on the due date may still arrive late.",
      "The bill is higher than last month because a toilet was running. The office can send a free kit to check for leaks. Call before you pay if you think the meter reading is wrong.",
      "If you cannot pay the full amount, ask for a payment plan before April 18. After that date, the late fee is added, and water service may be shut off after one more unpaid bill."
    ],
    questions: [
      { weight: 2, q: "When is the bill due?", choices: ["March 1", "March 31", "April 18", "After two bills"], answer: 2, why: "The due date is April 18.", whyZh: "繳款日是 4 月 18 日。" },
      { weight: 2, q: "Why is this bill higher?", choices: ["The late fee was already added.", "A toilet was running.", "The account number changed.", "The office closed."], answer: 1, why: "The note says a running toilet used more water.", whyZh: "馬桶一直漏水，所以用水量變多。" },
      { weight: 3, q: "What should you do if the meter reading seems wrong?", choices: ["Wait for the shutoff", "Call before you pay", "Mail a check on April 18", "Ignore the account number"], answer: 1, why: "The bill says to call before paying if the reading may be wrong.", whyZh: "如果覺得度數不對，要在付款前先打電話。" },
      { weight: 3, q: "What is the result of waiting until after April 18 to ask for a plan?", choices: ["The water use goes down.", "A late fee is added.", "The kit arrives free.", "The due date moves to March."], answer: 1, why: "After the due date, the $8 late fee is added.", whyZh: "過了繳款日才申請分期，滯納金就會加上去。" }
    ]
  },
  {
    id: "B10", level: "B", title: "Help Wanted",
    paragraphs: [
      "Night stock clerk. Harper Market, 3 nights a week, 9:00 p.m. to 5:00 a.m. The job includes lifting boxes up to 40 pounds and keeping the dairy case cold. No experience is required. Training lasts one week.",
      "Apply in person on Tuesday between 10:00 a.m. and 1:00 p.m. Ask for Ms. Ruiz. Bring an ID and a list of two people we can call. Do not call the store about this job. Phone calls will not be returned.",
      "The pay is $18 an hour. Workers who stay for 90 days receive a bus pass. The first step is the Tuesday visit, not an online form."
    ],
    questions: [
      { weight: 2, q: "What is the work schedule?", choices: ["Tuesday morning only", "3 nights a week, 9:00 p.m. to 5:00 a.m.", "90 days of training", "One week in the morning"], answer: 1, why: "The ad says three nights, from 9:00 p.m. to 5:00 a.m.", whyZh: "一週三個晚上，晚上 9 點到早上 5 點。" },
      { weight: 2, q: "What should an applicant do first?", choices: ["Call the store", "Fill out an online form", "Go to the store on Tuesday and ask for Ms. Ruiz", "Wait 90 days"], answer: 2, why: "The ad says to apply in person on Tuesday and ask for Ms. Ruiz.", whyZh: "第一步是星期二親自到店裡找 Ruiz 女士。" },
      { weight: 3, q: "Why will a phone call not help?", choices: ["The store has no phone.", "The ad says calls about this job will not be returned.", "Ms. Ruiz works only at night.", "The pay is a secret."], answer: 1, why: "Applicants are told not to call, and calls will not be returned.", whyZh: "廣告寫打來詢問這份工作不會有人回。" },
      { weight: 2, q: "What do workers receive after 90 days?", choices: ["A lighter box limit", "A bus pass", "One week of training", "A new ID"], answer: 1, why: "Workers who stay 90 days receive a bus pass.", whyZh: "做滿 90 天可以拿到公車月票。" }
    ]
  },
  {
    id: "C9", level: "C", title: "If You Are Hurt at Work",
    paragraphs: [
      "Stop the machine and tell a supervisor before you leave the floor. Do this even if the cut looks small. A report written the same day protects both the worker and the record.",
      "Go to the company clinic on the first floor, or to the emergency room if you cannot walk safely. Keep every paper the clinic gives you. The claim form must reach Human Resources within 24 hours.",
      "Do not post about the injury on social media, and do not guess who was at fault in the report. Write what you saw and what you did. The purpose of these steps is to get care quickly and to leave a clear record, not to decide blame on the first day."
    ],
    questions: [
      { weight: 2, q: "What is the first step after an injury?", choices: ["Post a photo", "Stop the machine and tell a supervisor", "Wait 24 hours", "Decide who was at fault"], answer: 1, why: "The notice says to stop the machine and tell a supervisor before leaving the floor.", whyZh: "先停機器並告訴主管，再離開現場。" },
      { weight: 2, q: "Where does the claim form go, and how soon?", choices: ["To the clinic within a week", "To Human Resources within 24 hours", "To social media the same day", "To the emergency room after 24 hours"], answer: 1, why: "The claim form must reach Human Resources within 24 hours.", whyZh: "申請表要在 24 小時內送到人資。" },
      { weight: 3, q: "What is the purpose of the notice?", choices: ["To name the person at fault", "To get care quickly and leave a clear record", "To close the clinic", "To invite posts about the injury"], answer: 1, why: "The last paragraph states that purpose directly.", whyZh: "目的是趕快就醫，並留下清楚紀錄。" },
      { weight: 3, q: "What causes a weak report, according to the notice?", choices: ["Writing what you saw", "Guessing who was at fault", "Keeping the clinic papers", "Telling a supervisor"], answer: 1, why: "The notice says not to guess about fault; write what you saw and did.", whyZh: "不要在報告裡猜測是誰的錯。" }
    ]
  },
  {
    id: "C10", level: "C", title: "Email about a Missing Deposit", by: "Luis Ortega",
    paragraphs: [
      "Dear Payroll, my April 4 deposit was $160 short. I worked six hours of overtime that week, and the hours are on the posted schedule. I have already asked my supervisor, and she said the hours were sent to you on March 28.",
      "I am not accusing anyone of taking the money. I am asking you to compare the schedule with the deposit and to correct the next paycheck if the hours were missed. Rent is due on Friday, so I need an answer by Wednesday.",
      "Please write back rather than calling the store. I cannot take personal calls on the floor. Thank you, Luis Ortega."
    ],
    questions: [
      { weight: 3, q: "What is Luis's attitude?", choices: ["He accuses payroll of stealing.", "He is direct and worried, but he asks for a check rather than blame.", "He does not care about the rent.", "He is joking about the overtime."], answer: 1, why: "He says he is not accusing anyone and asks them to compare the records.", whyZh: "他沒有指控誰，只是要求核對並補上。" },
      { weight: 2, q: "Why does he need an answer by Wednesday?", choices: ["His supervisor is leaving.", "Rent is due on Friday.", "The store closes on Wednesday.", "Overtime ended in April."], answer: 1, why: "He says rent is due Friday, so he needs an answer by Wednesday.", whyZh: "星期五要交房租，所以星期三前要有回覆。" },
      { weight: 3, q: "What does he want payroll to do?", choices: ["Call him on the floor", "Compare the schedule with the deposit and fix the next check if needed", "Remove the overtime", "Change the rent date"], answer: 1, why: "He asks them to compare the two records and correct the next paycheck if the hours were missed.", whyZh: "他要對方核對班表和入帳，若漏了就在下一份薪水補上。" },
      { weight: 2, q: "Why does he ask for a written reply?", choices: ["He cannot take personal calls while he is working.", "He lost his phone.", "Payroll has no email.", "His supervisor told him not to write."], answer: 0, why: "He says he cannot take personal calls on the floor.", whyZh: "他在賣場不能接私人電話，所以要書面回覆。" }
    ]
  },
  {
    id: "D9", level: "D", title: "Complaints by Month",
    form: [["Month", "Written complaints"], ["January", "12"], ["February", "14"], ["March", "31"], ["April", "18"]],
    paragraphs: [
      "The table counts written complaints at the downtown clinic. March is the only month above 30. The clinic changed its phone menu on March 2, and callers could no longer reach a person without waiting through four recordings.",
      "April fell to 18 after the clinic put a person back on the first menu choice. The writer of the report says the March jump was caused by the menu, not by a sudden change in medical care. Visits that month were almost the same as in February.",
      "A reader should not treat 31 as proof that doctors became worse. The number measures letters, not treatment. The report's point is that a small office change can create a large pile of paper."
    ],
    questions: [
      { weight: 3, q: "Which month had the most written complaints?", choices: ["January", "February", "March", "April"], answer: 2, why: "March lists 31, the highest number.", whyZh: "三月是 31 件，最高。" },
      { weight: 4, q: "What does the writer say caused the March jump?", choices: ["Worse medical care", "The new phone menu", "Fewer visits", "A shorter table"], answer: 1, why: "The menu changed on March 2, and visits stayed about the same.", whyZh: "作者認為是電話選單改了，不是醫療變差。" },
      { weight: 4, q: "What should a reader infer from the similar number of visits?", choices: ["More people came in March.", "The extra complaints were not explained by a large increase in patients.", "April had no staff.", "January was the worst month for care."], answer: 1, why: "Visits in March were almost the same as in February, so the complaint spike needs another explanation.", whyZh: "看診人數差不多，所以抱怨變多不能用病人變多來解釋。" },
      { weight: 4, q: "What is the report's main point?", choices: ["Doctors failed in March.", "A small office change can produce many written complaints.", "The phone should have four recordings.", "April complaints do not count."], answer: 1, why: "The last paragraph says a small office change can create a large pile of paper.", whyZh: "重點是辦公室一個小改動就可能帶來一大疊書面抱怨。" }
    ]
  },
  {
    id: "D10", level: "D", title: "Two Notes on the Same Class",
    paragraphs: [
      "Note from the teacher: Eleven of 15 students finished the practice form. The average score was 18 out of 25. I will review items 7, 12, and 19 on Monday because most of the class missed them.",
      "Note from a student, posted later: This class is a waste of time, and the teacher does not care if we pass. The underlined sentence is the student's [[opinion]]. The numbers in the teacher's note can be checked against the graded forms.",
      "A reader who wants the teacher's view of the class will not find it in the score. She does not say the class is failing or succeeding. She says which items she will reteach. The student's sentence judges her motive. That judgment is not in the grade book."
    ],
    questions: [
      { weight: 3, q: "Which statement is a fact from the teacher's note?", choices: ["The class is a waste of time.", "Eleven of 15 students finished the form.", "The teacher does not care.", "Monday class is useless."], answer: 1, why: "The teacher reports a count that can be checked.", whyZh: "老師寫的是可以核對的人數。" },
      { weight: 4, q: "What does the underlined word [[opinion]] refer to here?", choices: ["The average score", "The student's judgment that the teacher does not care", "Items 7, 12, and 19", "The number 15"], answer: 1, why: "The note marks the student's sentence about the teacher as an opinion.", whyZh: "劃線的 opinion 指學生對老師動機的評斷。" },
      { weight: 4, q: "Where is the teacher's plan stated?", choices: ["In the average score alone", "In her decision to review the three items most students missed", "In the student's last sentence", "In a claim that the class is a waste"], answer: 1, why: "She says she will review items 7, 12, and 19 on Monday.", whyZh: "她的計畫是星期一重講大多數人錯的三題。" },
      { weight: 4, q: "What can a reader not prove from the grade book?", choices: ["How many students finished", "That the teacher does not care if students pass", "Which items were missed", "The average score"], answer: 1, why: "The motive is the student's judgment, not a number in the grade book.", whyZh: "老師在不在乎，無法從成績簿證明。" }
    ]
  },
  {
    id: "E9", level: "E", title: "A Letter about the Library Fee", by: "Hannah Brooks",
    paragraphs: [
      "The board calls the new $40 card fee a small [[contribution]]. For a family that already chooses between bus fare and a late fine, $40 is not small, and it is not a gift freely given. A contribution is something a person decides to offer. This fee is a charge for a card that used to be free.",
      "I accept the fact that the roof repair will cost more than the city set aside. That sentence can be checked against the bid. I do not accept the next sentence in the flyer, which says families who object are unwilling to support children. Objecting to a fee is not the same as objecting to the library.",
      "If the board needs the money, it should say so plainly and offer a waiver that does not require a public interview. The underlined judgment about unwilling families is the flyer's opinion. The bid for the roof is not."
    ],
    questions: [
      { weight: 5, q: "In this letter, [[contribution]] is used to show that the writer", choices: ["agrees the fee is a voluntary gift", "rejects the board's soft word for a required charge", "wants a larger fee", "has not read the flyer"], answer: 1, why: "She says a contribution is chosen, while this fee is required for a card that used to be free.", whyZh: "她認為 contribution 是自願的，這 40 元卻是不得不付的費用。" },
      { weight: 4, q: "Which statement does she treat as a fact?", choices: ["Families who object do not support children.", "The roof repair will cost more than the city set aside.", "The fee is a gift.", "$40 is small for every family."], answer: 1, why: "She says the roof cost can be checked against the bid.", whyZh: "屋頂修繕比預算貴，她認為這可以用報價單核對。" },
      { weight: 5, q: "Where is the flyer's opinion, according to her?", choices: ["In the roof bid", "In the claim that objecting families are unwilling to support children", "In the old price of a free card", "In the waiver form"], answer: 1, why: "She says that judgment is the flyer's opinion, and the bid is not.", whyZh: "她指出傳單的看法是：反對費用的家庭等於不支持孩子。" },
      { weight: 4, q: "What change would answer her request?", choices: ["A public interview for every waiver", "A plain statement of the need and a waiver that is not a public interview", "A higher fee with softer wording", "Closing the library"], answer: 1, why: "She asks the board to speak plainly and to waive the fee without a public interview.", whyZh: "她要對方直說需要這筆錢，並提供不必公開面談的減免。" }
    ]
  },
  {
    id: "E10", level: "E", title: "What the Handbook Leaves Implied", by: "Marcus Hale",
    paragraphs: [
      "The handbook says employees \"may be asked\" to stay late. It never says who asks, how often, or what happens if the answer is no. A sentence that looks like a choice can hide a requirement. Hale's point is that soft wording still directs behavior when the penalty is left unnamed.",
      "He quotes a newer page: \"Repeated refusal may affect scheduling.\" That line is more honest because it names a consequence. It still avoids the word punishment. Readers have to infer that a no can become fewer hours.",
      "The most useful sentence, in his view, is the one a supervisor added in pencil: \"If you cannot stay, tell me before noon so I can call someone else.\" It gives a time, a person, and a next step. The printed pages explain the company's preference. The pencil line tells a worker what to do."
    ],
    questions: [
      { weight: 5, q: "What does Hale want readers to infer about \"may be asked\"?", choices: ["Staying late is always optional and free of consequences.", "The soft wording can still function as a requirement.", "Supervisors may not speak to staff.", "The handbook has no late shifts."], answer: 1, why: "He says a sentence that looks like a choice can hide a requirement.", whyZh: "他要讀者推出：看起來像選擇的句子，仍可能是要求。" },
      { weight: 4, q: "Which sentence best supports his claim that the newer page is more honest?", choices: ["It uses the words may be asked.", "It says repeated refusal may affect scheduling.", "It is written in pencil.", "It thanks employees for staying."], answer: 1, why: "Naming a consequence is what he calls more honest.", whyZh: "較誠實的是寫出拒絕可能影響排班。" },
      { weight: 5, q: "The phrase \"may affect scheduling\" most nearly means", choices: ["the schedule will be printed in color", "a refusal can lead to fewer hours", "noon is the new start time", "someone else wrote the handbook"], answer: 1, why: "He says readers must infer that a no can become fewer hours.", whyZh: "意思是拒絕留下，之後排到的工時可能變少。" },
      { weight: 4, q: "Why does he prefer the pencil line?", choices: ["It is longer than the handbook.", "It tells the worker whom to tell, by when, and why.", "It removes every consequence.", "It repeats the company's preference only."], answer: 1, why: "It gives a time, a person, and a next step.", whyZh: "鉛筆那句寫了要在中午前告訴誰，以及為什麼。" }
    ]
  }
);
