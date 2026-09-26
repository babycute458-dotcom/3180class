LOCATOR.push(
  {
    id: "LA1", level: "A", title: "Door Sign",
    paragraphs: [
      "The office is closed today, Monday, for a holiday. We will open again on Tuesday at 9:00 a.m.",
      "If you need a bus pass, come back Tuesday. Please bring your student ID.",
      "The drop box by the door is for envelopes only. Do not leave cash."
    ],
    questions: [
      { q: "When will the office open again?", choices: ["Monday at 9:00 a.m.", "Tuesday at 9:00 a.m.", "Today at noon", "Next month"], answer: 1, why: "The sign says Tuesday at 9:00 a.m.", whyZh: "告示寫星期二上午 9 點再開。" },
      { q: "What should you bring for a bus pass?", choices: ["Cash in the drop box", "Your student ID", "An envelope only", "A holiday form"], answer: 1, why: "The sign says to bring a student ID.", whyZh: "要帶學生證。" }
    ]
  },
  {
    id: "LA2", level: "A", title: "Lunch Note", by: "Rosa",
    paragraphs: [
      "Ben, your soup is in the refrigerator. Please heat it for two minutes.",
      "I will be back at 1:00. Do not wait for me to start eating.",
      "Please wash your bowl. I packed an apple for you too."
    ],
    questions: [
      { q: "Where is the soup?", choices: ["In the oven", "In the refrigerator", "On the table", "In Ben's bag"], answer: 1, why: "Rosa says the soup is in the refrigerator.", whyZh: "湯在冰箱裡。" },
      { q: "What should Ben do with the bowl?", choices: ["Leave it in the sink", "Wash it", "Put it in the refrigerator", "Give it to Rosa at noon"], answer: 1, why: "She asks him to wash the bowl.", whyZh: "她請他把碗洗掉。" }
    ]
  },
  {
    id: "LA3", level: "A", title: "Class Times",
    form: [["Monday", "English, 6:00–8:00"], ["Wednesday", "English, 6:00–8:00"], ["Friday", "Computer, 6:30–8:30"]],
    paragraphs: [
      "The room is 12. Come in the side door after 5:45 p.m.",
      "If you miss Monday, you can still come on Wednesday. Tell the teacher."
    ],
    questions: [
      { q: "What class is on Friday?", choices: ["English at 6:00", "Computer", "No class", "English at 8:30"], answer: 1, why: "Friday lists Computer from 6:30 to 8:30.", whyZh: "星期五是電腦課。" },
      { q: "Which door should students use?", choices: ["The front door at noon", "The side door after 5:45 p.m.", "Room 8", "Any door before 5:00"], answer: 1, why: "The note says the side door after 5:45 p.m.", whyZh: "下午 5:45 之後走側門。" }
    ]
  },
  {
    id: "LA4", level: "A", title: "Hand Soap",
    paragraphs: [
      "Pump once. Wash your hands for 20 seconds. Rinse with water.",
      "This soap is for skin. Do not use it on dishes.",
      "If it gets in your eyes, rinse for 5 minutes. Keep the bottle closed."
    ],
    questions: [
      { q: "How long should you wash?", choices: ["5 seconds", "20 seconds", "5 minutes every time", "One hour"], answer: 1, why: "The label says 20 seconds.", whyZh: "要洗 20 秒。" },
      { q: "What is the soap not for?", choices: ["Hands", "Skin", "Dishes", "Rinsing with water"], answer: 2, why: "The label says not to use it on dishes.", whyZh: "不要用來洗碗。" }
    ]
  },
  {
    id: "LA5", level: "A", title: "Lost Keys",
    paragraphs: [
      "A set of keys was found in the lobby on Thursday at 3:00 p.m. The keys have a red tag.",
      "Ask for them at the front desk. Bring an ID. The desk closes at 7:00 p.m.",
      "Keys that are not claimed by next Thursday will be sent to the office on the second floor."
    ],
    questions: [
      { q: "Where were the keys found?", choices: ["On the second floor", "In the lobby", "At 7:00 p.m. on the bus", "In a red bag"], answer: 1, why: "They were found in the lobby.", whyZh: "鑰匙是在大廳找到的。" },
      { q: "What do you need at the front desk?", choices: ["A red tag only", "An ID", "Seven dollars", "A second-floor form"], answer: 1, why: "The note says to bring an ID.", whyZh: "到櫃檯要帶證件。" }
    ]
  },
  {
    id: "LA6", level: "A", title: "Bus Card",
    form: [["Name", "Nina Cole"], ["Card", "Monthly"], ["Starts", "May 1"], ["Ends", "May 31"], ["Price", "$48"]],
    paragraphs: [
      "Show this card when you get on the bus. Do not give it to another person.",
      "If you lose the card, go to the station window before noon. A new card costs $5."
    ],
    questions: [
      { q: "When does Nina's card end?", choices: ["May 1", "May 31", "At noon", "After $5"], answer: 1, why: "The card ends May 31.", whyZh: "月票到 5 月 31 日。" },
      { q: "What does a lost card cost?", choices: ["$48", "$5", "Nothing", "$31"], answer: 1, why: "A new card costs $5.", whyZh: "補卡要 5 元。" }
    ]
  },
  {
    id: "LB1", level: "B", title: "Note from the Teacher", by: "Mr. Alvarez",
    paragraphs: [
      "Parents, the field trip is next Friday, not this Friday. The bus leaves school at 8:15 a.m. Students should wear walking shoes and bring a lunch that does not need a refrigerator.",
      "Please sign the permission slip by Wednesday. A student without a signed slip will stay at school with Ms. Grant. The trip is free. Spending money is not required.",
      "We will be back by 2:00 p.m. If you need to pick up your child early, call the office before 1:00 so we can meet you at the front gate."
    ],
    questions: [
      { q: "When is the field trip?", choices: ["This Friday", "Next Friday", "Wednesday morning", "Every Friday"], answer: 1, why: "The note says next Friday, not this Friday.", whyZh: "校外教學是下星期五，不是這星期五。" },
      { q: "What happens if the slip is not signed?", choices: ["The student pays $8.", "The student stays at school.", "The bus waits until 2:00.", "The lunch is thrown away."], answer: 1, why: "A student without a signed slip stays with Ms. Grant.", whyZh: "沒有簽名就不能去，要留在學校。" }
    ]
  },
  {
    id: "LB2", level: "B", title: "Coat Return",
    paragraphs: [
      "This coat was left on the evening bus, Route 22, on April 9. It is gray and has a bus map in the pocket.",
      "The driver turned it in at the downtown station. Ask at Window 4 after 10:00 a.m. Describe the map before the clerk shows you the coat.",
      "Items are kept for 30 days. After that, the station gives them to a community closet. Come sooner if the coat is yours."
    ],
    questions: [
      { q: "What should you do before the clerk shows the coat?", choices: ["Pay $4", "Describe the map in the pocket", "Ride Route 22 again", "Wait 30 days"], answer: 1, why: "You must describe the map first.", whyZh: "要先說出口袋裡地圖的樣子。" },
      { q: "Why should the owner come soon?", choices: ["Window 4 closes in the morning.", "The station keeps items for only 30 days.", "The coat is already at the closet.", "Route 22 stops on April 9."], answer: 1, why: "After 30 days the coat goes to a community closet.", whyZh: "只保管 30 天，之後會送走。" }
    ]
  },
  {
    id: "LB3", level: "B", title: "Laundry Room Rules",
    paragraphs: [
      "Washers on the left take six quarters. Dryers take four quarters for 40 minutes. Do not overload the machine. A too-full load does not get clean and can stop the washer.",
      "Remove your clothes when the cycle ends. After 20 minutes, another resident may take them out and leave them on the table. The building is not responsible for clothes left overnight.",
      "Report a leaking machine to the manager the same day. Put an out-of-order note on it so the next person does not lose quarters."
    ],
    questions: [
      { q: "What can happen if you leave clothes for more than 20 minutes?", choices: ["The manager washes them again.", "Another resident may take them out.", "The dryer runs for free.", "You get the quarters back."], answer: 1, why: "After 20 minutes someone else may remove the clothes.", whyZh: "超過 20 分鐘，別人可以把衣服拿出來。" },
      { q: "Why should you put a note on a leaking machine?", choices: ["To reserve it", "So the next person does not lose quarters", "To dry the clothes faster", "To call a resident at night"], answer: 1, why: "The note warns the next person not to put money in a broken machine.", whyZh: "是為了避免下一個人投錢。" }
    ]
  },
  {
    id: "LB4", level: "B", title: "Text from the Supervisor",
    paragraphs: [
      "Amina, the delivery for Table 12 is late. Please tell the guests we are sorry and offer them free coffee while they wait. Do not promise a free meal. I did not approve that.",
      "The driver called from the bridge. He should arrive in about 15 minutes. Seat the guests away from the door if you can. The wind is strong tonight.",
      "When the food comes, check the name on the bag before you serve it. Last week the wrong bag went to Table 4."
    ],
    questions: [
      { q: "What may Amina offer the guests?", choices: ["A free meal", "Free coffee", "A ride over the bridge", "Table 4's food"], answer: 1, why: "The supervisor says to offer free coffee, not a free meal.", whyZh: "可以請他們喝免費咖啡，不能承諾免費餐點。" },
      { q: "What should she check before serving?", choices: ["The wind", "The name on the bag", "The price of coffee", "The bridge traffic"], answer: 1, why: "She must check the name so the wrong bag is not served.", whyZh: "上菜前要核對袋子上的名字。" }
    ]
  },
  {
    id: "LB5", level: "B", title: "School Pickup Change",
    paragraphs: [
      "Today the side gate is locked because of construction. Pick up children at the front gate on Pine Street. Staff will be there from 2:40 to 3:10 p.m.",
      "Cars may not stop in the bus lane. Park on the next block and walk to the gate. Children will not be sent to a car that is waiting in the street.",
      "If you arrive after 3:10, go to the office. Your child will be in the library with a staff member. Call the office if you will be later than 3:30."
    ],
    questions: [
      { q: "Where is pickup today?", choices: ["The side gate", "The front gate on Pine Street", "The bus lane", "The next town"], answer: 1, why: "The side gate is locked, so pickup moved to the front gate.", whyZh: "側門上鎖，改到 Pine 街的前門。" },
      { q: "What should a late parent do after 3:10?", choices: ["Wait in the bus lane", "Go to the office", "Honk at the gate", "Pick up at 2:40 only"], answer: 1, why: "After 3:10 the child is in the library and the parent should go to the office.", whyZh: "3:10 以後要到辦公室。" }
    ]
  },
  {
    id: "LB6", level: "B", title: "Vitamin Drops",
    paragraphs: [
      "Adults: 1 dropper (1 ml) once a day with food. Children 4 to 12: half a dropper, and only if a doctor said to use it. Do not give this bottle to children under 4.",
      "Shake the bottle. The dropper has a line at 1 ml. Fill it to the line. Do not guess.",
      "Stop use if a rash appears. Keep the bottle away from heat, and close it tightly so the drops do not spill in a bag."
    ],
    questions: [
      { q: "How much should an adult take?", choices: ["Half a dropper twice a day", "1 ml once a day with food", "The whole bottle", "1 ml every hour"], answer: 1, why: "Adults take 1 ml once a day with food.", whyZh: "成人一天一次，1 毫升，要配食物。" },
      { q: "Who should not use this bottle?", choices: ["Adults who eat food", "Children under 4", "People who can read the line", "Doctors"], answer: 1, why: "The label says not to give it to children under 4.", whyZh: "4 歲以下不要用。" }
    ]
  },
  {
    id: "LC1", level: "C", title: "Email to a Coworker", by: "Helen Park",
    paragraphs: [
      "David, I am writing because the closing list was not finished last night. The safe was locked, but the front lights were still on, and the sandwich case was not covered. I found it that way at 6:10 this morning.",
      "I am not saying you left early on purpose. I am saying the list has three steps, and two of them were skipped. Please walk through the list with me at 4:30 today so we use the same order tomorrow.",
      "If something kept you from finishing, tell me then. I would rather fix the routine than write this kind of email again."
    ],
    questions: [
      { q: "What is Helen's attitude?", choices: ["She is joking about the lights.", "She is firm about the missed steps, but she is willing to fix the routine together.", "She wants David fired today.", "She thanks him for covering the case."], answer: 1, why: "She names the skipped steps and asks to review the list together.", whyZh: "她指出漏掉的步驟，但仍想一起把流程修好。" },
      { q: "What does she want at 4:30?", choices: ["To lock the safe again", "To walk through the closing list together", "To turn the lights on", "To cover the sandwiches only"], answer: 1, why: "She asks David to walk through the list with her at 4:30.", whyZh: "她要約 4:30 一起把打烊清單走一遍。" }
    ]
  },
  {
    id: "LC2", level: "C", title: "Overtime Notice",
    paragraphs: [
      "Overtime must be approved before you stay. A supervisor writes the extra hours on the daily sheet and signs it. Hours written the next morning may not be paid.",
      "The reason for the rule is a payroll error in March. Several people stayed to help and wrote the time later. Two sheets did not match, and the checks were short.",
      "If a customer emergency keeps you past your shift, call the closing supervisor before you clock out. That call is the approval. Do not text a coworker and call it permission."
    ],
    questions: [
      { q: "What is the purpose of the notice?", choices: ["To cancel all overtime", "To explain how extra hours must be approved so they are paid", "To blame customers for March", "To stop the closing shift"], answer: 1, why: "The notice tells workers to get approval first so the hours are paid.", whyZh: "目的是說明加班要先核准，薪水才會算進去。" },
      { q: "What caused the new rule?", choices: ["A customer holiday", "A March payroll error from hours written later", "A broken clock", "A text from a coworker"], answer: 1, why: "Sheets written the next day did not match, and checks were short.", whyZh: "三月有人隔天補寫時數，薪水才短發。" }
    ]
  },
  {
    id: "LC3", level: "C", title: "A Letter about the Noise", by: "Sara Nguyen",
    paragraphs: [
      "Dear Neighbors, the music after 10:00 p.m. has woken my child three nights this week. I have already asked once at the door. I am writing so we have a clearer request.",
      "I am not asking for silence all evening. I am asking that speakers be turned down at 10:00, which is the time in the building rules. If a birthday goes later, a note the day before would help me plan.",
      "I like living here. I do not want a fight. I do want to sleep before a 5:00 a.m. shift."
    ],
    questions: [
      { q: "What is Sara's attitude?", choices: ["She wants the neighbors to move out.", "She is polite but clear that the late music has to stop at 10:00.", "She enjoys the music.", "She is canceling the building rules."], answer: 1, why: "She says she does not want a fight, and she asks for the volume to drop at 10:00.", whyZh: "她不想吵架，但明確要求 10 點把音量轉小。" },
      { q: "The sentence \"I do not want a fight\" shows that she", choices: ["has already called the police", "wants a solution without a conflict", "will play louder music", "is moving at 5:00 a.m."], answer: 1, why: "She separates her request from a wish to start a conflict.", whyZh: "她要解決問題，不是要起衝突。" }
    ]
  },
  {
    id: "LC4", level: "C", title: "Steps after a Power Cut",
    paragraphs: [
      "When the lights go out, stop the register and write down the last receipt number. Leave the drawer closed. Do not try to finish a card payment in the dark.",
      "Turn on the flashlight under the counter. Help customers who are already inside. Lock the front door only if the manager says the store will close.",
      "Call the power company, then call the district manager. The purpose of this order is to keep the money safe first and to get information second. Guessing the cause of the outage is not your job."
    ],
    questions: [
      { q: "What is the first money-related step?", choices: ["Call the power company", "Write down the last receipt number and leave the drawer closed", "Open the drawer to count", "Finish card payments"], answer: 1, why: "The notice says to record the last receipt and leave the drawer closed.", whyZh: "先記下最後一張收據號碼，抽屜不要打開。" },
      { q: "What is the purpose of the order of steps?", choices: ["To find who caused the outage", "To protect the money before collecting information", "To send customers outside immediately", "To recharge the flashlight"], answer: 1, why: "The notice says money safety comes before information.", whyZh: "順序是先保住錢，再去問消息。" }
    ]
  },
  {
    id: "LC5", level: "C", title: "From a Parent Meeting",
    paragraphs: [
      "The principal said, \"Every child deserves a quiet room for homework.\" That is her opinion about what schools should provide. She also reported a fact: Room 6 was used 14 evenings last month.",
      "A parent then said most families do not need the room. Only 22 families came to the meeting. Families who stayed home were not asked.",
      "The useful question is not whether the principal's hope is popular. It is whether the 14 evenings are serving the students who actually come."
    ],
    questions: [
      { q: "Which sentence is an opinion?", choices: ["Room 6 was used 14 evenings.", "Every child deserves a quiet homework room.", "22 families came.", "The meeting was last month."], answer: 1, why: "Deserves states what she thinks should be true.", whyZh: "deserves 是她認為應該如此，是看法。" },
      { q: "Why is \"most families do not need the room\" a weak claim?", choices: ["Room 6 was never opened.", "Most families were not at the meeting, so they were not counted.", "The principal canceled homework.", "14 is larger than 22."], answer: 1, why: "Only the 22 families present were heard.", whyZh: "只有到場的 22 家說話，不能代表大多數家庭。" }
    ]
  },
  {
    id: "LC6", level: "C", title: "Request to Change a Shift", by: "Omar Said",
    paragraphs: [
      "Ms. Reed, I am asking to move from the Sunday close to the Sunday open for the next four weeks. My mother has surgery on Monday mornings, and I need to be at the hospital by 7:00 a.m.",
      "I can trade with Priya. She has already said she can close. I am not asking to drop Sundays. I am asking to change the hours.",
      "If the trade causes a problem, I can work the close on Saturdays instead. Please tell me by Friday so I can plan the first Monday."
    ],
    questions: [
      { q: "What does Omar want?", choices: ["To stop working Sundays", "To open on Sunday instead of closing, for four weeks", "To leave at 7:00 on Sunday night", "To cancel Priya's job"], answer: 1, why: "He asks to switch from the Sunday close to the Sunday open.", whyZh: "他想把星期日收班改成開班，為期四週。" },
      { q: "Why does he mention Priya?", choices: ["She is the manager.", "She already agreed to take the closing shift.", "She is having surgery.", "She needs Friday off."], answer: 1, why: "Priya has said she can close, so the hours are covered.", whyZh: "Priya 已經答應改去收班。" }
    ]
  },
  {
    id: "LD1", level: "D", title: "A Shortages Memo", by: "The kitchen manager",
    paragraphs: [
      "We ran out of rice on Friday before 7:00 p.m. The sheet on the cooler said we had four bags. We had one. The count was copied from Thursday and never checked.",
      "I am not interested in a longer meeting about teamwork. I am interested in a count that a person does with open eyes. Starting Monday, the closer initials the cooler sheet only after opening two bags and looking inside the bin.",
      "If the bin is short, call me before you leave, even if it is late. A phone call at 10:00 is cheaper than a dining room with nothing to serve."
    ],
    questions: [
      { q: "What does the manager think caused the shortage?", choices: ["Customers ate more than usual and the delivery failed.", "Someone copied Thursday's count instead of looking.", "The rice was locked in the office.", "Monday's rule was already in place."], answer: 1, why: "The sheet was copied from Thursday and never checked.", whyZh: "表上的數字是從星期四抄來的，沒有人真正去看。" },
      { q: "The sentence \"I am not interested in a longer meeting\" shows that the manager", choices: ["wants a practical check, not more talk", "will cancel Monday service", "thinks phone calls are rude", "has already left the job"], answer: 0, why: "The manager contrasts a meeting with a count done by looking.", whyZh: "經理要的是實際去看，不是再開會。" }
    ]
  },
  {
    id: "LD2", level: "D", title: "Ridership Table",
    form: [["Route", "Morning riders"], ["12", "410"], ["18", "390"], ["25", "160"], ["25 last year", "310"]],
    paragraphs: [
      "Route 25 lost almost half its morning riders. The city report calls every route stable because the total for all buses rose by 2 percent. Route 12 and Route 18 grew enough to hide Route 25.",
      "Route 25 is the one that serves the hospital night shift going home. Those riders are not a small detail inside a happy total. They are the people who lost the service.",
      "A useful report would show the route that fell, not only the citywide rise. The 2 percent is true and still misleading."
    ],
    questions: [
      { q: "What should a reader infer from the table and the paragraphs?", choices: ["Every route gained riders.", "A citywide increase can hide a large loss on one route.", "Route 25 carried 410 people.", "The hospital closed."], answer: 1, why: "Routes 12 and 18 grew enough to cover the drop on Route 25.", whyZh: "全市增加，是因為別的路線成長蓋過了 25 路的減少。" },
      { q: "Why does the writer say the 2 percent is misleading?", choices: ["The math is false.", "It is true as a total but hides who lost service.", "It counts only Route 25.", "It was printed last year."], answer: 1, why: "The total rose while Route 25 fell by almost half.", whyZh: "總數是真的上升，但沒有說出哪一路的人受損。" }
    ]
  },
  {
    id: "LD3", level: "D", title: "The Word on the Poster",
    paragraphs: [
      "The hiring poster says the company offers [[competitive]] pay. In this break room, people laughed at the word. The starting rate is two dollars below the warehouse across the street, and that warehouse is hiring this week.",
      "Competitive usually means the pay can compete with other employers. On this poster it does not. It means the company hopes applicants will not ask what the other door is paying.",
      "A reader who wants the fact should ignore the adjective and ask for the hourly number. The opinion is the word competitive. The number, once they say it, is the fact."
    ],
    questions: [
      { q: "In this passage, [[competitive]] means", choices: ["higher than the warehouse across the street", "a flattering word that does not match the actual rate", "two dollars an hour", "a contest for current workers"], answer: 1, why: "The pay is lower than the nearby warehouse, so the word does not match.", whyZh: "薪水比對面倉庫低，這個詞和事實不符。" },
      { q: "Which part is the opinion?", choices: ["The warehouse is hiring this week.", "Calling the pay competitive", "The poster is on the wall.", "Applicants can ask for a number."], answer: 1, why: "The passage says the opinion is the word competitive.", whyZh: "看法是把薪水說成有競爭力。" }
    ]
  },
  {
    id: "LD4", level: "D", title: "Letter from a Night Student", by: "Mei Lin",
    paragraphs: [
      "Dear Program Director, I am halfway through the class and I am asking you not to move it to 4:00 p.m. Several of us come from a 7:00 a.m. shift. A 4:00 class means we leave work early or we leave the program.",
      "I understand that the afternoon room is empty and the evening room is crowded. An empty room is easier for the school. It is not easier for the students the program says it was built for.",
      "If the time must change, offer a later section as well. Do not solve the room problem by quietly ending the class for people who work days."
    ],
    questions: [
      { q: "What is Mei's attitude?", choices: ["She is happy to move to 4:00.", "She is respectful but opposed to a change that would push out day workers.", "She wants the program to close.", "She has already left the class."], answer: 1, why: "She explains the conflict and asks for a later section rather than a quiet cutoff.", whyZh: "她有禮貌，但反對一個會把白天上班的學生擠掉的改動。" },
      { q: "What does she think the empty afternoon room represents?", choices: ["Proof that students prefer 4:00", "A solution that helps the school more than the students the program claims to serve", "A larger stipend", "A safer night bus"], answer: 1, why: "She says the empty room is easier for the school, not for the students it was built for.", whyZh: "空教室對學校方便，對這門課要服務的學生並不方便。" }
    ]
  },
  {
    id: "LD5", level: "D", title: "Two Lines in the Review",
    paragraphs: [
      "The product review says the heater \"failed on the third night.\" That is a report the writer can point to. The next sentence says the company \"does not care about winter.\" Nobody measured the company's feelings.",
      "The underlined sentence, [[the company does not care about winter]], is the writer's opinion. It may be understandable after a cold night. It is still a judgment, not a second fact.",
      "A careful reader can return the heater because it failed and still refuse the sentence about what the company cares about. One claim has a night and a machine. The other has only a mood."
    ],
    questions: [
      { q: "Which line is the opinion?", choices: ["The heater failed on the third night.", "The company does not care about winter.", "The review was published.", "The machine is a heater."], answer: 1, why: "Caring is a judgment. The failure is the reported event.", whyZh: "公司在不在乎是看法；第三天故障是事件。" },
      { q: "What can a careful reader do?", choices: ["Treat both sentences as facts", "Accept the failure and still reject the claim about the company's feelings", "Ignore the third night", "Assume the heater works"], answer: 1, why: "The passage separates the machine's failure from the mood sentence.", whyZh: "可以承認機器壞了，同時不同意那句情緒判斷。" }
    ]
  },
  {
    id: "LD6", level: "D", title: "Why the Line Moved",
    paragraphs: [
      "Patients at the clinic waited 40 minutes in January and 70 minutes in March. Visits rose only from 80 a day to 84. The wait did not grow because the neighborhood suddenly doubled.",
      "In February the clinic assigned one nurse to the front desk and the exam rooms at the same time. People checked in more slowly, and rooms sat empty while she was at the desk.",
      "The writer's point is that a staffing choice, not a flood of patients, explains the longer wait. Adding chairs to the lobby would treat the line, not the cause."
    ],
    questions: [
      { q: "What caused the longer wait, according to the writer?", choices: ["A doubled number of patients", "One nurse covering the desk and the rooms", "Too many chairs", "A new building"], answer: 1, why: "Visits barely rose. The nurse was split between two jobs.", whyZh: "看診人數幾乎沒增加，是護理師被分成兩份工作。" },
      { q: "Why would more lobby chairs miss the point?", choices: ["Chairs are expensive only.", "They would hide the line without fixing the staffing cause.", "Patients do not sit.", "March had fewer visits."], answer: 1, why: "The writer says chairs would treat the line, not the cause.", whyZh: "加椅子只是處理排隊的表面，不是原因。" }
    ]
  },
  {
    id: "LE1", level: "E", title: "A Reply to the Flyer", by: "Denise Howard",
    paragraphs: [
      "The flyer calls the new schedule a gift to working parents. The gift begins at 9:30 a.m. My shift starts at 7:00. A class I can attend only by abandoning the job that pays for the class is not a gift. It is a photograph of someone else's morning.",
      "I am not asking the center to open at dawn for me alone. I am asking it to stop describing an unusable hour as generosity. Publish the first class a person can take after a 3:00 p.m. clock-out, and call it a class, not a favor.",
      "Until then, spare the congratulations. I have already learned how to miss things politely."
    ],
    questions: [
      { q: "What is Denise's attitude toward the flyer?", choices: ["Grateful for the gift", "Sharp and unwilling to accept praise for a schedule she cannot use", "Unsure what time she works", "Eager to switch to the 9:30 class"], answer: 1, why: "She rejects the word gift and the congratulations.", whyZh: "她拒絕把她用不到的時間說成禮物。" },
      { q: "The sentence \"It is a photograph of someone else's morning\" means the schedule", choices: ["includes a free photo", "fits a life that is not hers", "starts at 3:00 p.m.", "was printed in color"], answer: 1, why: "The hour works for a different kind of morning than the one she has.", whyZh: "那個時間適合別人的早上，不適合她。" }
    ]
  },
  {
    id: "LE2", level: "E", title: "Reading the Satisfaction Survey",
    paragraphs: [
      "Ninety-two percent of respondents rated the lobby \"excellent.\" The survey was handed to people as they left a free Wednesday lunch. People who had waited on Monday, when there was no lunch and the line reached the door, were not in the pile of forms.",
      "The number is not false. It is [[selected]]. In this report, selected does not mean carefully representative. It means the hour and the free meal chose the answers before anyone circled a box.",
      "The writer's opinion is not that the lobby is ugly. It is that a pleasant sample can be arranged. A reader who quotes 92 percent without the Wednesday lunch is doing the office's advertising for it."
    ],
    questions: [
      { q: "In this report, [[selected]] means the result was", choices: ["a random sample of every patient", "shaped by who was invited to answer", "incorrect arithmetic", "taken on Monday"], answer: 1, why: "The free lunch and the Wednesday hour decided who filled out the form.", whyZh: "是發卷的時機選出了回答的人。" },
      { q: "Where is the writer's opinion?", choices: ["In the figure 92 percent", "In the claim that a pleasant sample can be arranged", "In the price of the lunch", "In the location of the lobby"], answer: 1, why: "The passage says the opinion is that a pleasant sample can be arranged.", whyZh: "看法是：舒服的樣本可以被安排出來。" }
    ]
  },
  {
    id: "LE3", level: "E", title: "What the Contract Smiles About", by: "Paul Okeke",
    paragraphs: [
      "The contract says temporary workers \"may be considered\" for permanent jobs. It does not say considered by whom, or after how many months, or what considering requires beyond a feeling. A verb that sounds like a path can be a closed door with a window in it.",
      "A later clause is more useful and less kind: \"Nothing in this section creates a right to conversion.\" Readers who stopped at may be considered never reach the sentence that removes the right they thought they had.",
      "Okeke's point is that hope in a contract should be read to the end of the paragraph. The smile is in the first verb. The limit is in the sentence people skip."
    ],
    questions: [
      { q: "What does Okeke want the reader to infer?", choices: ["Temporary workers are guaranteed permanent jobs.", "The hopeful verb is limited by a later sentence many readers skip.", "The contract has no section on jobs.", "Conversion happens after one month."], answer: 1, why: "The later clause says the section creates no right to conversion.", whyZh: "後面那句說這一段並沒有給轉正的權利。" },
      { q: "Which sentence best supports his warning?", choices: ["Nothing in this section creates a right to conversion.", "The contract is printed on white paper.", "Workers may feel hopeful.", "The first verb is may."], answer: 0, why: "That clause is the limit he says people skip.", whyZh: "支持他警告的是：這一段沒有建立轉正的權利。" }
    ]
  },
  {
    id: "LE4", level: "E", title: "Letter to the Board", by: "Carmen Diaz",
    paragraphs: [
      "I have ridden the 6:40 a.m. bus for nine years. Your report thanks riders for an \"improved experience\" because the average delay fell by three minutes. My bus was late 11 times in April. The average was pulled down by midday trips I do not take.",
      "I am not opposed to publishing a citywide number. I am opposed to being thanked for an improvement I cannot find in my week. If you want my confidence, print the on-time rate for trips before 8:00 a.m. next to the average, in the same size type.",
      "Please do not reply with the brochure. I already have it. It is where I first saw the word improved, used for a morning that was not."
    ],
    questions: [
      { q: "What is Carmen's attitude?", choices: ["She is satisfied and grateful.", "She is precise and irritated that an average is being used as her experience.", "She wants the morning bus canceled.", "She did not read the report."], answer: 1, why: "She rejects the thanks and asks for the early-trip number beside the average.", whyZh: "她不接受被感謝，並要求把清晨班次的準點率印在平均數字旁邊。" },
      { q: "Why does she distrust the three-minute figure?", choices: ["Averages cannot be calculated.", "Midday trips improved the average without improving her morning bus.", "Her bus was early 11 times.", "The brochure has no words."], answer: 1, why: "She says midday trips pulled the average down while her bus was late 11 times.", whyZh: "中午的班次把平均拉好了，她的早班並沒有變好。" }
    ]
  },
  {
    id: "LE5", level: "E", title: "A Note in the Margin", by: "Irene Walsh",
    paragraphs: [
      "The handbook says staff \"should feel free\" to raise a safety concern. The margin note, added by a supervisor and then erased badly, says concerns go to the same person who sets the weekly hours. Walsh thinks the printed sentence and the pencil sentence are having an argument.",
      "Feel free is an invitation only if the listener believes the invitation. When the listener also believes the hours can shrink, the invitation becomes a test. The eraser did not remove that meaning. It advertised that someone wanted the meaning gone.",
      "Her conclusion is not that no one should speak. It is that a policy about speech has to survive the note in the margin. If it cannot, the policy is decoration."
    ],
    questions: [
      { q: "What does the erased margin note suggest to Walsh?", choices: ["Concerns are welcomed with no cost.", "The person who hears a concern also controls the speaker's hours.", "The handbook was never printed.", "Erasing a note makes it meaningless."], answer: 1, why: "The note said concerns go to the person who sets the hours.", whyZh: "筆記寫：反映問題的對象，就是排工時的那個人。" },
      { q: "The sentence \"the policy is decoration\" means she thinks the policy", choices: ["is a useful set of steps", "looks protective but does not hold up against the real threat", "should be printed in color", "was written by the supervisor"], answer: 1, why: "If the policy cannot survive the margin note, it only decorates the page.", whyZh: "如果規定敵不過頁邊那句話，它就只是裝飾。" }
    ]
  },
  {
    id: "LE6", level: "E", title: "After the Training Award", by: "Jon Ellis",
    paragraphs: [
      "The company won an award for training and posted the plaque in the lobby. The training, Ellis learned, was a 20-minute video that new hires clicked through on a phone. Completion meant the bar reached the end. It did not mean a person had practiced the lift the video described.",
      "He does not claim the award was forged. He claims the award measured a file, not a skill. A file can be complete while a back is still unprotected. The lobby plaque cannot tell the difference, and it is not trying to.",
      "The opinion sits in that last charge: the display is content with the file. The opinion is not the existence of the video. A workplace can own a video and still have failed to train."
    ],
    questions: [
      { q: "What does Ellis want the reader to conclude?", choices: ["The award was a forgery.", "Finishing a video file is not the same as learning the skill.", "Phones cannot play video.", "The lobby should close."], answer: 1, why: "Completion meant the bar reached the end, not that anyone practiced the lift.", whyZh: "播完只代表進度條走完，不代表有人練過那個動作。" },
      { q: "Where is his opinion stated most directly?", choices: ["In the fact that a video exists", "In the charge that the plaque is content with the file", "In the size of the lobby", "In the length of a phone"], answer: 1, why: "The passage says the opinion is that the display is satisfied with the file.", whyZh: "看法是：這塊獎牌滿足於檔案本身。" }
    ]
  }
);
