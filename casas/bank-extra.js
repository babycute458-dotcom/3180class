BANK.push(
  {
    id: "A11", level: "A", title: "Library Hours",
    form: [["Monday", "Closed"], ["Tuesday", "10:00–6:00"], ["Saturday", "9:00–1:00"]],
    paragraphs: [
      "The library is closed on Monday. Story time is Saturday at 10:30 in the children's room.",
      "Bring your card to check out books. You may take 5 books. Return them in 3 weeks.",
      "If the card is lost, ask at the front desk. A new card is free the first time."
    ],
    questions: [
      { weight: 1, q: "When is the library closed?", choices: ["Tuesday", "Monday", "Saturday morning", "Every afternoon"], answer: 1, why: "Monday is marked closed.", whyZh: "星期一公休。" },
      { weight: 1, q: "How many books may you take?", choices: ["3", "5", "10", "1"], answer: 1, why: "The note says 5 books.", whyZh: "最多可以借 5 本。" },
      { weight: 1, q: "When is story time?", choices: ["Monday at 10:00", "Saturday at 10:30", "Tuesday at 6:00", "In 3 weeks"], answer: 1, why: "Story time is Saturday at 10:30.", whyZh: "說故事時間是星期六 10:30。" },
      { weight: 1, q: "What does a lost card cost the first time?", choices: ["$5", "Nothing", "$3", "One book"], answer: 1, why: "The first replacement is free.", whyZh: "第一次補發免費。" }
    ]
  },
  {
    id: "A12", level: "A", title: "A Note on the Table", by: "Dad",
    paragraphs: [
      "Lina, I went to work early. Your uniform is on the chair. The bus comes at 7:20.",
      "Eat the sandwich in the bag. Do not forget your water bottle. It is by the sink.",
      "I will pick you up at 4:00 at the school gate. Call me if the practice ends later."
    ],
    questions: [
      { weight: 1, q: "What time is the bus?", choices: ["4:00", "7:20", "Early morning only", "After practice"], answer: 1, why: "The note says the bus comes at 7:20.", whyZh: "公車 7:20 來。" },
      { weight: 1, q: "Where is the water bottle?", choices: ["In the bag", "By the sink", "On the chair", "At the gate"], answer: 1, why: "He says it is by the sink.", whyZh: "水壺在水槽旁邊。" },
      { weight: 1, q: "Where will Dad pick Lina up?", choices: ["At work", "At the school gate", "On the bus", "At 7:20"], answer: 1, why: "He will be at the school gate at 4:00.", whyZh: "他 4 點在校門口接她。" },
      { weight: 2, q: "What should Lina do if practice ends later?", choices: ["Wait without calling", "Call Dad", "Take the 7:20 bus", "Leave the uniform"], answer: 1, why: "The note says to call if practice ends later.", whyZh: "練習若較晚結束，要打電話給爸爸。" }
    ]
  },
  {
    id: "A13", level: "A", title: "Microwave Soup",
    paragraphs: [
      "Peel the lid back halfway. Heat on high for 2 minutes. Let it sit for 1 minute. The cup will be hot.",
      "Stir before you eat. If the soup is still cold, heat it for 30 more seconds. Do not heat the cup with the lid fully closed.",
      "This cup is for one person. Do not put the cup in a regular oven. Throw it away when it is empty."
    ],
    questions: [
      { weight: 1, q: "How long is the first heating?", choices: ["30 seconds", "1 minute", "2 minutes", "Half a day"], answer: 2, why: "The label says 2 minutes on high.", whyZh: "第一次加熱 2 分鐘。" },
      { weight: 1, q: "Why should the lid be only halfway open?", choices: ["The soup tastes better closed.", "A fully closed lid should not be heated.", "The oven needs a lid.", "One person must hold it."], answer: 1, why: "The label says not to heat it with the lid fully closed.", whyZh: "蓋子不能完全蓋上再加熱。" },
      { weight: 1, q: "What do you do if the soup is still cold?", choices: ["Put it in the oven", "Heat 30 more seconds", "Throw it away", "Stir without heating"], answer: 1, why: "Heat it for 30 more seconds.", whyZh: "再加熱 30 秒。" },
      { weight: 2, q: "What should you do before you eat?", choices: ["Close the lid", "Stir", "Freeze the cup", "Peel the label off"], answer: 1, why: "The label says to stir before eating.", whyZh: "吃之前要攪一攪。" }
    ]
  },
  {
    id: "A14", level: "A", title: "Community Breakfast",
    paragraphs: [
      "Free breakfast this Sunday from 8:00 to 10:00 a.m. at the church hall on 2nd Street. Everyone is welcome. No ticket is needed.",
      "Eggs, rice, and fruit will be served. Coffee is 50 cents. Children eat free, and adults eat free too.",
      "Please enter through the side door. The front steps are closed for repair. Volunteers will meet you inside."
    ],
    questions: [
      { weight: 1, q: "How much is breakfast?", choices: ["$5", "Free", "$50", "One ticket"], answer: 1, why: "Breakfast is free. Coffee is 50 cents.", whyZh: "早餐免費，咖啡另計。" },
      { weight: 1, q: "Which door should people use?", choices: ["The front steps", "The side door", "The repair door", "Any door at noon"], answer: 1, why: "The front steps are closed, so people use the side door.", whyZh: "前門台階在修，要走側門。" },
      { weight: 1, q: "When does breakfast end?", choices: ["8:00 a.m.", "10:00 a.m.", "Sunday night", "After coffee"], answer: 1, why: "It runs until 10:00 a.m.", whyZh: "上午 10 點結束。" },
      { weight: 1, q: "What costs 50 cents?", choices: ["Eggs", "Coffee", "Fruit", "A ticket"], answer: 1, why: "Coffee is 50 cents.", whyZh: "咖啡是 50 美分。" }
    ]
  },
  {
    id: "A15", level: "A", title: "Pharmacy Window",
    form: [["Name", "Ali Hassan"], ["Ready", "After 3:00 p.m."], ["Window", "2"], ["Pay", "$12"], ["Bring", "ID"]],
    paragraphs: [
      "Your medicine will be ready after 3:00 p.m. Come to Window 2. Bring an ID.",
      "If someone else picks it up, that person needs your ID and a note with your name. The pharmacy closes at 7:00 p.m."
    ],
    questions: [
      { weight: 1, q: "When can Ali pick up the medicine?", choices: ["Before noon", "After 3:00 p.m.", "At Window 7", "Tomorrow only"], answer: 1, why: "It is ready after 3:00 p.m.", whyZh: "下午 3 點以後可以拿。" },
      { weight: 1, q: "How much does he pay?", choices: ["$2", "$3", "$7", "$12"], answer: 3, why: "The slip says $12.", whyZh: "要付 12 元。" },
      { weight: 2, q: "What does another person need in order to pick it up?", choices: ["Only the money", "Ali's ID and a note with his name", "Window 7", "A new prescription at noon"], answer: 1, why: "The note says the person needs his ID and a note with his name.", whyZh: "代領要帶他的證件和寫有他名字的字條。" },
      { weight: 1, q: "What time does the pharmacy close?", choices: ["3:00 p.m.", "7:00 p.m.", "Noon", "After ID check only"], answer: 1, why: "It closes at 7:00 p.m.", whyZh: "晚上 7 點關門。" }
    ]
  },
  {
    id: "A16", level: "A", title: "Rainy Day at School",
    paragraphs: [
      "Today students will eat lunch inside. The yard is too wet. Go to the gym after you eat.",
      "Wear your coat home. The rain may continue at 3:00. Cars will stop on Elm Street, not in the yard.",
      "If you walk, use the covered door on the west side. Teachers will be at that door from 2:50 to 3:15."
    ],
    questions: [
      { weight: 1, q: "Where will students go after lunch?", choices: ["The yard", "The gym", "Elm Street", "Home at noon"], answer: 1, why: "They go to the gym because the yard is wet.", whyZh: "院子太濕，午餐後去體育館。" },
      { weight: 1, q: "Where will cars stop?", choices: ["In the yard", "On Elm Street", "At the west door only for cars", "Inside the gym"], answer: 1, why: "Cars stop on Elm Street.", whyZh: "車子停在 Elm 街。" },
      { weight: 2, q: "Why should walkers use the west door?", choices: ["It is the lunch line.", "It is covered, and teachers will be there.", "The gym is closed.", "Coats are stored there."], answer: 1, why: "The west door is covered, and teachers wait there.", whyZh: "西門有遮蔽，老師也會在那裡。" },
      { weight: 1, q: "What should students wear home?", choices: ["Gym shoes only", "A coat", "A lunch tray", "Nothing"], answer: 1, why: "The note says to wear a coat home.", whyZh: "回家要穿外套。" }
    ]
  },
  {
    id: "B11", level: "B", title: "Email from the Office", by: "North Clinic",
    paragraphs: [
      "Mr. Farah, your blood test is on Thursday at 8:10 a.m. Please do not eat after midnight. You may drink water. Take your blood-pressure pill unless Dr. Shah told you to skip it.",
      "Arrive at 7:50 so we can copy your insurance card. If you are more than 15 minutes late, we may ask you to reschedule. The lab closes to new patients at 11:00.",
      "Reply to this email if you cannot come. A phone call before Wednesday at 5:00 p.m. also saves the appointment for someone else."
    ],
    questions: [
      { weight: 2, q: "What should Mr. Farah do after midnight?", choices: ["Eat a small meal", "Drink water only, and not eat", "Skip all pills", "Arrive at 11:00"], answer: 1, why: "He should not eat after midnight, but water is allowed.", whyZh: "午夜後不要吃東西，但可以喝水。" },
      { weight: 2, q: "Why should he arrive at 7:50?", choices: ["The test is at 7:50.", "The office needs time to copy his insurance card.", "The lab opens at 11:00.", "Dr. Shah is leaving."], answer: 1, why: "They need to copy the card before the 8:10 test.", whyZh: "要先影印保險卡。" },
      { weight: 3, q: "What is the result of arriving more than 15 minutes late?", choices: ["The test becomes free.", "He may have to reschedule.", "He must skip the water.", "The lab stays open all day."], answer: 1, why: "The email says they may ask him to reschedule.", whyZh: "遲到超過 15 分鐘，可能要改期。" },
      { weight: 2, q: "How can he cancel in time?", choices: ["Wait until Thursday morning", "Reply by email or call before Wednesday at 5:00 p.m.", "Tell another patient", "Skip the pill only"], answer: 1, why: "An email reply or a call before Wednesday at 5:00 keeps the slot for someone else.", whyZh: "星期三下午 5 點前回信或打電話才來得及。" }
    ]
  },
  {
    id: "B12", level: "B", title: "Apartment Heat Notice",
    paragraphs: [
      "The heat will be off on Tuesday from 9:00 a.m. to 1:00 p.m. while the boiler is repaired. The water will stay on. Please plan for a cold apartment during those hours.",
      "Close your windows before you leave. Open cabinets under the sinks if you are worried about pipes. The repair is on the boiler, not on the water line.",
      "If your heat is still off at 2:00 p.m., call the manager at 555-0164. Do not call the fire department for a cold apartment unless you smell gas."
    ],
    questions: [
      { weight: 2, q: "What will be off on Tuesday morning?", choices: ["The water", "The heat", "The phone", "The windows"], answer: 1, why: "The heat will be off. The water stays on.", whyZh: "停的是暖氣，水不停。" },
      { weight: 2, q: "Why should residents close the windows?", choices: ["To help the boiler repair keep the apartment from getting colder", "To stop the water", "To call the fire department", "To open the cabinets"], answer: 0, why: "Closing windows is part of planning for a cold apartment during the repair.", whyZh: "關窗是為了修理期間家裡不要更冷。" },
      { weight: 3, q: "When should a resident call the manager?", choices: ["If the water stops at 9:00", "If the heat is still off at 2:00 p.m.", "If they smell breakfast", "Before they close the windows"], answer: 1, why: "Call the manager if heat is still off at 2:00.", whyZh: "下午 2 點暖氣還沒來，就要打給管理員。" },
      { weight: 2, q: "When is the fire department the right call?", choices: ["Whenever the apartment is cold", "When there is a smell of gas", "At 9:00 a.m. on Tuesday", "If the cabinets are open"], answer: 1, why: "The notice says to call the fire department for a gas smell, not for a cold apartment.", whyZh: "聞到瓦斯才打給消防隊，只是冷不要打。" }
    ]
  },
  {
    id: "B13", level: "B", title: "Store Coupon",
    paragraphs: [
      "Save $3 on any frozen meal priced at $6 or more. One coupon per family. The offer ends Sunday.",
      "The coupon cannot be used on alcohol, tobacco, or medicine. It also cannot be used with another store coupon. A manufacturer's coupon is still allowed.",
      "Show the coupon before the cashier finishes the sale. After the receipt is printed, the $3 cannot be added back."
    ],
    questions: [
      { weight: 2, q: "Which item can use the coupon?", choices: ["A $5 frozen meal", "A $6 frozen meal", "Medicine", "Alcohol"], answer: 1, why: "The meal must cost $6 or more, and it must be frozen.", whyZh: "冷凍餐要 6 元以上才能用。" },
      { weight: 2, q: "What else may a shopper use at the same time?", choices: ["Another store coupon", "A manufacturer's coupon", "A tobacco discount", "A second $3 coupon"], answer: 1, why: "Another store coupon is blocked, but a manufacturer's coupon is allowed.", whyZh: "店家的折價券不能再疊，但廠商折價券可以。" },
      { weight: 3, q: "Why must the coupon be shown before the sale is finished?", choices: ["The cashier leaves at noon.", "After the receipt prints, the $3 cannot be added.", "Sunday is the only morning.", "Families may use two."], answer: 1, why: "The notice says the discount cannot be added after the receipt is printed.", whyZh: "收據印出後就不能再扣 3 元。" },
      { weight: 2, q: "How many of these coupons may one family use?", choices: ["One", "Three", "One per item", "Unlimited until Sunday"], answer: 0, why: "The ad says one coupon per family.", whyZh: "一個家庭只能用一張。" }
    ]
  },
  {
    id: "B14", level: "B", title: "Message from the Day Care", by: "Ms. Ortiz",
    paragraphs: [
      "Jonah had a fever of 100.8 at 11:30. We moved him to the quiet room and gave him water. We did not give medicine. Our rules say a parent must approve that by phone first.",
      "Please pick him up as soon as you can. He may return when he has had no fever for 24 hours without medicine. A note from you is enough. We do not need a doctor's letter for this fever.",
      "His coat and a drawing are in his cubby. The drawing got wet, so we put it in a plastic bag."
    ],
    questions: [
      { weight: 2, q: "Why did the day care not give medicine?", choices: ["Jonah refused water.", "A parent must approve medicine by phone first.", "The fever was 24 hours old.", "The doctor already called."], answer: 1, why: "The rules require a parent's phone approval.", whyZh: "給藥前必須先電話取得家長同意。" },
      { weight: 2, q: "When may Jonah come back?", choices: ["The same afternoon", "After 24 hours with no fever and no medicine", "Only with a doctor's letter", "When the drawing dries"], answer: 1, why: "He needs 24 fever-free hours without medicine.", whyZh: "要 24 小時沒有發燒，而且沒有靠藥。" },
      { weight: 3, q: "What should the parent do first?", choices: ["Bring a doctor's letter tonight", "Pick Jonah up as soon as possible", "Wash the drawing", "Send medicine with a classmate"], answer: 1, why: "The message asks the parent to pick him up as soon as they can.", whyZh: "家長要盡快來接他。" },
      { weight: 2, q: "Where are his things?", choices: ["In the quiet room", "In his cubby", "At the doctor's office", "In the office safe"], answer: 1, why: "His coat and drawing are in his cubby.", whyZh: "外套和圖畫在他的置物格。" }
    ]
  },
  {
    id: "B15", level: "B", title: "How to Clock In",
    paragraphs: [
      "Use your own badge at the side door. The reader beeps once for a good punch. Two beeps mean the punch did not count. Try again, then tell a supervisor if it still fails.",
      "Do not punch in more than 5 minutes early unless a supervisor asked you to. Early minutes are not paid. They can also start your shift before the floor is ready.",
      "If you forget the badge, sign the book at the office and write the time you entered. Do this before you go to your station. A signature at the end of the day looks like the time was added later."
    ],
    questions: [
      { weight: 2, q: "What do two beeps mean?", choices: ["The punch counted.", "The punch did not count.", "The shift is over.", "The badge is early."], answer: 1, why: "Two beeps mean the punch failed.", whyZh: "響兩聲表示沒打成功。" },
      { weight: 3, q: "Why are early punches a problem?", choices: ["They are not paid and can start the shift too soon.", "They set off the fire alarm.", "They erase the badge.", "They close the side door."], answer: 0, why: "Early minutes are unpaid and the floor may not be ready.", whyZh: "提早的分鐘不給薪，也可能讓班次太早開始。" },
      { weight: 2, q: "What should a worker without a badge do first?", choices: ["Wait until the end of the day", "Sign the office book before going to the station", "Use a coworker's badge", "Punch in 5 minutes early"], answer: 1, why: "Sign the book with the entry time before going to the station.", whyZh: "先到辦公室簽名並寫進門時間，再去工作崗位。" },
      { weight: 3, q: "Why is a signature at the end of the day a problem?", choices: ["The office is closed.", "It looks as if the time was added later.", "Two beeps are required.", "Early minutes become overtime."], answer: 1, why: "A late signature looks like the time was written in afterward.", whyZh: "下班才簽名，看起來像事後補時間。" }
    ]
  },
  {
    id: "B16", level: "B", title: "A Change in the Pickup Line",
    paragraphs: [
      "Starting Monday, the parent line will move to Cedar Street. Pine Street will be for buses only from 2:30 to 3:15. The change is happening because two cars and a bus tried to use the same curb last week.",
      "Stay in your car. A staff member will bring your child to the Cedar Street sidewalk. Do not leave the car to walk into the bus lane.",
      "Families who walk should still use the west door. The new line is for cars. It does not change the door for people on foot."
    ],
    questions: [
      { weight: 2, q: "Why did the school move the car line?", choices: ["Cedar Street is newer.", "Cars and a bus were sharing one curb.", "The west door closed.", "Buses now use Cedar Street."], answer: 1, why: "Two cars and a bus tried to use the same curb.", whyZh: "因為汽車和公車擠在同一個路邊。" },
      { weight: 2, q: "What should a parent in a car do?", choices: ["Walk into the bus lane", "Stay in the car on Cedar Street", "Park on Pine Street at 2:30", "Use the west door only"], answer: 1, why: "Staff will bring the child to the Cedar Street sidewalk.", whyZh: "人留在 Cedar 街的車裡，老師會把孩子帶過來。" },
      { weight: 2, q: "Who still uses the west door?", choices: ["Bus drivers", "Families who walk", "Every parent in a car", "No one after Monday"], answer: 1, why: "Walkers still use the west door.", whyZh: "走路來的家庭仍然走西門。" },
      { weight: 3, q: "What is Pine Street for between 2:30 and 3:15?", choices: ["The parent car line", "Buses only", "Walkers only", "A closed street"], answer: 1, why: "Pine Street is for buses only during that time.", whyZh: "那段時間 Pine 街只給公車。" }
    ]
  },
  {
    id: "C11", level: "C", title: "Letter to the Scheduler", by: "Rita Gomez",
    paragraphs: [
      "Ms. Cole, I was scheduled until 11:00 p.m. three nights last week and then opened at 6:00 a.m. the next day. I can work either shift. I cannot safely do both with only a short break between them.",
      "I am not refusing nights, and I am not asking for fewer hours. I am asking that a close and the next open not fall on the same person. Last Thursday I caught myself miscounting a drawer because I was tired.",
      "Please look at next week's draft before you post it. I would rather fix the pattern now than explain a mistake later."
    ],
    questions: [
      { weight: 3, q: "What is Rita's attitude?", choices: ["She refuses all night work.", "She is direct about safety and still willing to work either shift.", "She wants fewer hours and a later start.", "She is joking about the drawer."], answer: 1, why: "She says she can work either shift but not both with a short break.", whyZh: "她兩種班都可以上，但不能中間幾乎沒休息連著上。" },
      { weight: 2, q: "What problem did the schedule cause?", choices: ["She missed a week of work.", "She was tired enough to miscount a drawer.", "She opened the store at 11:00 p.m.", "She asked for fewer hours."], answer: 1, why: "She caught herself miscounting because she was tired.", whyZh: "她太累，點錢點錯了。" },
      { weight: 3, q: "What does she want Ms. Cole to do?", choices: ["Remove her from nights", "Check next week's draft so one person is not closing and then opening", "Cut everyone's hours", "Ignore Thursday"], answer: 1, why: "She asks the scheduler to review the draft before posting it.", whyZh: "她要對方在公布前先看下週的草稿。" },
      { weight: 3, q: "The sentence \"I am not asking for fewer hours\" shows that she", choices: ["wants a pay cut", "is changing the pattern, not the amount of work", "will skip next week", "refuses the morning shift"], answer: 1, why: "She separates the rotation problem from a request to work less.", whyZh: "她要改的是班次接法，不是減少時數。" }
    ]
  },
  {
    id: "C12", level: "C", title: "Return Desk Policy",
    paragraphs: [
      "Items may be returned within 30 days with a receipt. Without a receipt, the store gives a gift card for the lowest selling price from the last 30 days. Opened food and underwear cannot be returned.",
      "Bring the item, the receipt, and a photo ID. A different person may return a gift if the receipt is in the bag. The desk does not take returns during the last hour of the day because the safe is already closed.",
      "The purpose of the ID rule is to stop someone from returning a stolen item for cash. It is not there to embarrass customers. If you forgot your ID, you may come back the same day."
    ],
    questions: [
      { weight: 2, q: "What does a shopper without a receipt receive?", choices: ["Full cash", "A gift card for the lowest recent price", "Nothing", "A new receipt"], answer: 1, why: "The gift card uses the lowest price from the last 30 days.", whyZh: "沒有收據就給禮卡，金額是近 30 天的最低售價。" },
      { weight: 2, q: "Which item cannot be returned?", choices: ["A shirt with a receipt", "Opened food", "A gift with the receipt in the bag", "A lamp within 30 days"], answer: 1, why: "Opened food and underwear cannot be returned.", whyZh: "已打開的食物不能退。" },
      { weight: 3, q: "What is the purpose of asking for an ID?", choices: ["To sell more gift cards", "To stop a stolen item from being turned into cash", "To close the safe", "To embarrass customers"], answer: 1, why: "The policy says the ID rule is meant to stop returns of stolen goods for cash.", whyZh: "查證件是為了避免贓物被拿去換成現金。" },
      { weight: 2, q: "Why are returns refused in the last hour?", choices: ["The ID machine is off.", "The safe is already closed.", "Receipts expire at that hour.", "Gifts cannot be returned."], answer: 1, why: "The safe is already closed during the last hour.", whyZh: "最後一小時保險箱已經關了。" }
    ]
  },
  {
    id: "C13", level: "C", title: "After a Spill in Aisle 4",
    paragraphs: [
      "Block the aisle with a cart before you look for a mop. Customers will walk around a cart faster than they will notice a wet floor. Stay at the spill if you are alone until another worker arrives.",
      "Use the yellow sign, then the absorbent powder, then the mop. The powder needs two minutes. Mopping first spreads the liquid into the next aisle.",
      "Write the time and the product name in the spill log before you go back to the register. The log is how the store shows that the hazard was handled. A clean floor with no note is hard to prove later."
    ],
    questions: [
      { weight: 2, q: "What is the first step?", choices: ["Mop immediately", "Block the aisle with a cart", "Write the log", "Open a new product"], answer: 1, why: "Block the aisle before looking for a mop.", whyZh: "先用推車擋住通道，再去拿拖把。" },
      { weight: 3, q: "Why does the notice say not to mop first?", choices: ["Mops are locked.", "Mopping first spreads the liquid.", "The powder is only for the log.", "Customers prefer a wet floor."], answer: 1, why: "Mopping first pushes the spill into the next aisle.", whyZh: "先拖會把液體帶到下一條通道。" },
      { weight: 3, q: "What is the purpose of the spill log?", choices: ["To order more powder", "To show later that the hazard was handled", "To close aisle 4 forever", "To replace the yellow sign"], answer: 1, why: "The log is the record that the spill was handled.", whyZh: "紀錄是為了日後證明危險已經處理。" },
      { weight: 2, q: "What should a worker do if nobody else is nearby?", choices: ["Leave the spill and find a mop at once", "Stay at the spill until another worker arrives", "Send customers to aisle 4", "Skip the yellow sign"], answer: 1, why: "An alone worker stays until someone else arrives.", whyZh: "如果只有一個人，要留在現場等到同事來。" }
    ]
  },
  {
    id: "C14", level: "C", title: "A Note in the Company Newsletter",
    paragraphs: [
      "The writer says the new parking rule is fair because night workers asked for it. That is a reason, and it may be true. The sentence \"Day workers should be glad to walk farther\" is not a reason. It is an opinion about how other people ought to feel.",
      "The newsletter also states a fact: 60 of 80 night-shift employees signed the request. It does not say how many day-shift employees were asked. A signature count from one group cannot speak for the other.",
      "Readers can support the closer parking for night workers and still reject the line about being glad. Wanting a safer walk at midnight is not the same as telling the morning shift to smile."
    ],
    questions: [
      { weight: 4, q: "Which line is an opinion?", choices: ["60 of 80 night workers signed.", "Day workers should be glad to walk farther.", "There is a new parking rule.", "The newsletter was printed."], answer: 1, why: "Telling people they should feel glad is a judgment.", whyZh: "叫別人應該高興，是看法。" },
      { weight: 3, q: "Why can the signature count not speak for day workers?", choices: ["No one signed.", "Only night-shift employees were counted.", "80 is smaller than 60.", "The rule was canceled."], answer: 1, why: "The 60 signatures are from the night shift, not the day shift.", whyZh: "簽名的是夜班，不能代表日班。" },
      { weight: 3, q: "What can a reader do?", choices: ["Treat every sentence as a fact", "Support closer night parking and still reject the line about being glad", "Ignore the 60 signatures", "Assume the morning shift wrote the request"], answer: 1, why: "The passage separates the safety request from the opinion about feelings.", whyZh: "可以贊成夜班停車近一點，同時不同意那句要人高興的話。" },
      { weight: 3, q: "What is the writer's purpose?", choices: ["To cancel night parking", "To separate a fact and a request from an opinion about feelings", "To count day workers", "To close the lot"], answer: 1, why: "The note distinguishes the signature fact from the sentence about being glad.", whyZh: "目的是把事實、要求和情緒看法分開。" }
    ]
  },
  {
    id: "C15", level: "C", title: "Email about a Noisy Neighbor", by: "The building office",
    paragraphs: [
      "Ms. Alvarez, we received your note about footsteps after midnight. We spoke with the tenant upstairs. He works a night shift and did not know the sound carried. He agreed to leave his shoes by the door.",
      "We are not filing a violation yet. This is the first report, and he responded the same day. If the noise continues this week, write down the dates and times. A list is more useful than another general complaint.",
      "Thank you for telling us before the problem grew. Please do not confront him in the hallway. Further contact should come through this office."
    ],
    questions: [
      { weight: 3, q: "What is the office's attitude?", choices: ["It blames Ms. Alvarez.", "It takes the report seriously and wants the next step to stay polite and specific.", "It has already evicted the neighbor.", "It ignores night workers."], answer: 1, why: "The office spoke with the tenant, held off on a violation, and asked for dates if it continues.", whyZh: "辦公室有處理，但還沒認定違規，並請她再記錄時間。" },
      { weight: 2, q: "Why is there no violation yet?", choices: ["Noise is allowed all night.", "This is the first report, and the tenant responded.", "The office lost the note.", "The shoes were already by the door."], answer: 1, why: "It is the first report and he answered the same day.", whyZh: "這是第一次反映，對方當天就有回應。" },
      { weight: 2, q: "What should Ms. Alvarez do if the noise continues?", choices: ["Stop him in the hallway", "Write the dates and times", "File nothing", "Call his job"], answer: 1, why: "A list of dates and times is more useful than a general complaint.", whyZh: "要寫下日期和時間。" },
      { weight: 3, q: "Why does the office want contact to go through them?", choices: ["So a hallway argument does not become the next problem", "Because the tenant has no door", "To hide the first report", "To end the night shift"], answer: 0, why: "They tell her not to confront him in the hallway.", whyZh: "他們不希望她在走廊上當面衝突。" }
    ]
  },
  {
    id: "C16", level: "C", title: "Why the Training Moved",
    paragraphs: [
      "The forklift class was on Saturday because that was the only day the instructor could come. Several new hires work Monday through Friday and do not have a car on weekends. Two of them missed the class.",
      "The company then marked those two workers ineligible for the higher-paying dock job. The posted reason was \"training not complete.\" The unstated reason was the day the class was offered.",
      "Next month the same class will be offered on a Wednesday evening as well as on Saturday. The change admits that a single weekend class was not a real chance for every new hire. Completing the class should measure the skill, not the worker's access to a Saturday ride."
    ],
    questions: [
      { weight: 3, q: "Why did two workers miss the class?", choices: ["They refused to learn.", "The only class was on Saturday, and they had no weekend car.", "The instructor canceled Wednesday.", "They already had the dock job."], answer: 1, why: "The class was Saturday only, and they had no weekend transportation.", whyZh: "課只排在星期六，而他們週末沒有車。" },
      { weight: 3, q: "What is the writer's point about \"training not complete\"?", choices: ["The mark was only about skill.", "The mark hid the fact that the class day was the barrier.", "The workers finished on Monday.", "The dock job was never posted."], answer: 1, why: "The stated reason ignored that the class was offered on a day they could not attend.", whyZh: "書面理由沒寫出真正的障礙是上課日期。" },
      { weight: 2, q: "What will be different next month?", choices: ["There will be no class.", "A Wednesday evening class will be added.", "Saturday will be the only day again.", "The dock job will close."], answer: 1, why: "The class will be on Wednesday evening and Saturday.", whyZh: "下個月除了星期六，還有星期三晚上。" },
      { weight: 4, q: "What should completion of the class measure, according to the writer?", choices: ["Whether the worker can get a Saturday ride", "The skill, not access to a weekend class", "How many cars the worker owns", "The instructor's schedule only"], answer: 1, why: "The last paragraph says completion should measure skill, not a Saturday ride.", whyZh: "上完課應該代表技能，而不是週末有沒有車。" }
    ]
  },
  {
    id: "D11", level: "D", title: "Hours by Department",
    form: [["Department", "Overtime hours"], ["Packing", "46"], ["Shipping", "18"], ["Packing last month", "12"], ["Shipping last month", "20"]],
    paragraphs: [
      "Packing overtime almost quadrupled. Shipping overtime fell slightly. A manager who looks only at the plant total will say overtime is under control, because the two changes nearly cancel.",
      "They do not cancel for the packing crew. Those workers stayed late because a new tape machine jammed, and each box took longer. The hours are a symptom. The machine is the cause.",
      "Praising the plant for a flat total would congratulate the chart and ignore the people inside the largest number. The useful question is why packing changed, not whether the building's sum looks calm."
    ],
    questions: [
      { weight: 3, q: "What happened to packing overtime?", choices: ["It fell from 46 to 12.", "It rose from 12 to 46.", "It matched shipping.", "It disappeared."], answer: 1, why: "Packing went from 12 last month to 46.", whyZh: "包裝組從 12 小時增到 46 小時。" },
      { weight: 4, q: "Why is the plant total a weak comfort?", choices: ["Totals cannot be added.", "The drop in shipping hides the jump in packing.", "Both departments fell.", "The machine was repaired."], answer: 1, why: "The two changes nearly cancel on a combined chart.", whyZh: "出貨組減少，把包裝組的增加蓋住了。" },
      { weight: 4, q: "What does the writer say caused the packing hours?", choices: ["A request for praise", "A jammed tape machine that slowed each box", "A cut in shipping staff only", "A calm chart"], answer: 1, why: "Each box took longer because the tape machine jammed.", whyZh: "封箱機卡住，每一箱都變慢。" },
      { weight: 4, q: "What is the writer's main point?", choices: ["Overtime should never be questioned.", "A calm total can hide the department that is actually in trouble.", "Shipping should add hours.", "Charts are always false."], answer: 1, why: "The plant sum looks calm while packing does not.", whyZh: "全廠總數看起來平穩，包裝組其實出了問題。" }
    ]
  },
  {
    id: "D12", level: "D", title: "The Word on the Warning Label",
    paragraphs: [
      "The cleaner bottle says the product is [[mild]]. In this kitchen, mild does not mean gentle on skin. Three workers developed red hands after using it without gloves. The company kept the word because shoppers prefer it to the word irritant.",
      "Mild here means the marketing department's hope. It does not mean the safety sheet's finding. The sheet, two clicks down on the website, says to wear gloves and avoid long contact.",
      "A reader who trusts the front of the bottle and skips the sheet is doing what the larger type was designed to encourage. The opinion is on the front. The instruction is behind it."
    ],
    questions: [
      { weight: 4, q: "In this passage, [[mild]] means", choices: ["safe for bare hands", "a selling word that conflicts with the safety sheet", "the name of the gloves", "a type of water"], answer: 1, why: "The word stayed because shoppers like it, even though the sheet requires gloves.", whyZh: "這個詞是為了好賣，和安全資料單的要求不一致。" },
      { weight: 3, q: "What does the safety sheet tell workers to do?", choices: ["Skip gloves", "Wear gloves and avoid long contact", "Trust the front label only", "Use more cleaner on skin"], answer: 1, why: "The sheet says to wear gloves and avoid long contact.", whyZh: "資料單要戴手套，並且避免長時間接觸。" },
      { weight: 4, q: "Where is the opinion?", choices: ["In the instruction to wear gloves", "On the front of the bottle, in the word mild", "In the number of clicks", "In the color of the gloves"], answer: 1, why: "The passage says the opinion is on the front.", whyZh: "看法在瓶子正面那個 mild。" },
      { weight: 4, q: "What was the large type designed to do?", choices: ["Send readers to the safety sheet", "Encourage readers to trust the front and skip the sheet", "List the three workers", "Close the website"], answer: 1, why: "The larger word was meant to keep people from reading the warning behind it.", whyZh: "大字是要人相信正面、不去看後面的警告。" }
    ]
  },
  {
    id: "D13", level: "D", title: "Letter about the Interview", by: "Samuel Abebe",
    paragraphs: [
      "Dear Hiring Committee, I am writing after Friday's interview. I was asked to demonstrate a lift I had already described, and then the conversation ended before I could ask about the shift. I can do the work. I am less sure the interview measured that.",
      "I am not asking you to hire me out of courtesy. I am asking whether the permanent opening is still a conversation or only a test of one motion. If the shift includes nights, that fact belongs in the interview, not in a surprise on the first day.",
      "If you have already chosen someone else, a short note is enough. Silence after a two-hour trip is its own answer, but it is not a respectful one."
    ],
    questions: [
      { weight: 4, q: "What is Samuel's attitude?", choices: ["He is certain he will be hired.", "He is disappointed and firm, and he wants a clear process rather than a favor.", "He refuses the job.", "He enjoyed the surprise night shift."], answer: 1, why: "He says he is not asking for courtesy, and he wants the shift discussed in the interview.", whyZh: "他不是要人情，而是要面試過程把班次講清楚。" },
      { weight: 4, q: "What does he think the interview failed to do?", choices: ["Ask him to lift", "Measure whether he could do the whole job, including the shift", "End on time", "Give him a two-hour trip"], answer: 1, why: "The talk ended before he could ask about the shift, so one motion stood in for the job.", whyZh: "面試在他問班次之前就結束，只測了一個動作。" },
      { weight: 3, q: "What would he accept if he is not hired?", choices: ["Silence", "A short note", "A second two-hour trip", "A night shift with no warning"], answer: 1, why: "He says a short note is enough.", whyZh: "沒被錄取的話，一封簡短通知就夠了。" },
      { weight: 4, q: "The sentence \"Silence is its own answer\" means he thinks no reply", choices: ["is a kind delay", "already communicates rejection, without respect", "means the job is his", "is required by the handbook"], answer: 1, why: "He says silence answers him, but not respectfully.", whyZh: "不回信本身就是一種回答，只是不夠尊重。" }
    ]
  },
  {
    id: "D14", level: "D", title: "Two Comments on the Same Policy",
    paragraphs: [
      "Manager's note: Beginning May 1, personal phones stay in lockers. Last month a phone rang beside an open medicine cart. The rule applies to every shift, including supervisors.",
      "A worker wrote underneath: \"They care more about catching us than about the cart.\" That sentence judges motive. The manager's note states a start date, an incident, and who must follow the rule.",
      "A reader can think the locker rule is too broad and still see that the worker's sentence was not witnessed. No one recorded what the supervisors care about. The ringing phone was recorded."
    ],
    questions: [
      { weight: 3, q: "Which detail is a fact in the manager's note?", choices: ["Supervisors enjoy punishment.", "A phone rang beside an open medicine cart.", "The worker's motive is kind.", "May has no shifts."], answer: 1, why: "The incident is stated as something that happened.", whyZh: "電話在打開的藥車旁邊響，是事件。" },
      { weight: 4, q: "The worker's sentence is an opinion because it", choices: ["includes the date May 1", "claims to know what they care about", "names the medicine cart", "applies to every shift"], answer: 1, why: "Caring more about catching people is a judgment of motive.", whyZh: "說對方在乎抓人，是在判斷動機。" },
      { weight: 4, q: "What can a reader not prove from these notes?", choices: ["That a phone rang", "What supervisors care about", "That the rule starts May 1", "That the rule includes supervisors"], answer: 1, why: "Motive was not recorded. The phone was.", whyZh: "動機沒有被記錄，電話響了才有。" },
      { weight: 3, q: "What does the manager's note require?", choices: ["Phones only for supervisors", "Phones in lockers on every shift", "Open carts beside phones", "A vote in May"], answer: 1, why: "Personal phones stay in lockers on every shift, including supervisors.", whyZh: "每一班，包含主管，私人手機都要放存物櫃。" }
    ]
  },
  {
    id: "D15", level: "D", title: "Why the Test Scores Rose",
    paragraphs: [
      "The program announced that practice-test scores rose by 15 points. The announcement did not mention that the newest form was shorter and that two of the hardest items had been removed.",
      "Students also received the answer key after the first try and took the same form again the next night. The second score is the one in the announcement. A gain produced by repeating a shorter form is not the same as a gain produced by harder reading.",
      "The writer does not say the students learned nothing. The writer says the headline takes credit for a change in the test. A reader who wants to know about learning has to ask what the second form still required."
    ],
    questions: [
      { weight: 4, q: "What does the writer want readers to infer?", choices: ["Students became worse readers.", "The 15-point rise does not by itself prove harder reading improved.", "The form got longer.", "Answer keys were hidden."], answer: 1, why: "The form was shorter, hard items were removed, and students repeated it.", whyZh: "題本變短、難題拿掉，而且同一份考了兩次。" },
      { weight: 3, q: "Which score was announced?", choices: ["The first try", "The second try, after students saw the key", "A different agency's score", "Last year's form only"], answer: 1, why: "The second score, after the key, is the one in the announcement.", whyZh: "公布的是看過答案後的第二次分數。" },
      { weight: 4, q: "What is the writer's purpose?", choices: ["To praise the headline", "To show that the headline credits a change in the test", "To remove practice tests", "To publish the answer key"], answer: 1, why: "The writer says the headline takes credit for a change in the test.", whyZh: "目的是指出標題把試題的改變說成學生的進步。" },
      { weight: 4, q: "What question does the writer say a careful reader should ask?", choices: ["Who designed the poster", "What the second form still required", "Why keys are expensive", "How many points equal 15"], answer: 1, why: "A reader who wants to know about learning must ask what the second form still required.", whyZh: "想知道有沒有真的學會，要問第二次還考了什麼。" }
    ]
  },
  {
    id: "D16", level: "D", title: "A Line in the Recommendation",
    paragraphs: [
      "The letter says Nora is \"a pleasure to schedule.\" In this workplace, that phrase has been used for people who never refuse a weekend. It has not been used for people who are skilled but unavailable on Sunday.",
      "The rest of the letter is specific. She learned the register in a week, and she trained two new hires. Those lines can be checked against the calendar and the training log.",
      "The underlined compliment cannot. [[A pleasure to schedule]] praises her for being easy to use. A reader who needs to know whether she can do the job should trust the register and the training, not the relief in the first phrase."
    ],
    questions: [
      { weight: 4, q: "In this letter, [[a pleasure to schedule]] most nearly means", choices: ["she learned the register quickly", "she is easy to place on the hours other people avoid", "she trained two people", "she refuses Sundays"], answer: 1, why: "The phrase has been used for people who never refuse a weekend.", whyZh: "這個說法是在稱讚她好排班，尤其是別人不要的時段。" },
      { weight: 3, q: "Which part can be checked?", choices: ["That she is a pleasure", "That she trained two new hires", "That every skilled worker is unavailable", "That the phrase has no history"], answer: 1, why: "The training log can confirm the two new hires.", whyZh: "她訓練了兩名新人，這可以用紀錄核對。" },
      { weight: 4, q: "What should a reader trust when judging whether she can do the job?", choices: ["The relief in the first phrase", "The lines about the register and the training", "The fact that Sundays exist", "The paper color"], answer: 1, why: "Those lines describe skills. The first phrase describes convenience.", whyZh: "收銀和訓練寫的是能力，第一句寫的是好不好用。" },
      { weight: 4, q: "The writer's point is that the compliment", choices: ["proves she is the most skilled", "can hide a judgment about convenience inside praise", "should be copied onto every letter", "contradicts the training log"], answer: 1, why: "The phrase praises her for being easy to schedule, not for the skills listed later.", whyZh: "這句稱讚其實是在說她好安排。" }
    ]
  },
  {
    id: "E11", level: "E", title: "Letter about the New Fare Card", by: "Edith Marsh",
    paragraphs: [
      "The agency calls the card a simplification. I now need an app, a bank card, and a working phone to do what a paper ticket did in one hand. Simplification, in this announcement, means fewer steps for the agency and more equipment for the rider.",
      "I am not nostalgic for paper. I am opposed to a system that treats a dead phone as a personal failure. The night bus does not wait while an app reloads, and the driver is no longer allowed to sell a single ride.",
      "If the agency wants the word simple, it should keep one way to pay that does not require a charged battery. Until then, the brochure is describing the office's relief, not my trip."
    ],
    questions: [
      { weight: 5, q: "What is Edith's attitude?", choices: ["She is pleased by the simpler card.", "She is critical of a change that shifts the burden onto the rider.", "She refuses every bus.", "She wants the driver to keep the app."], answer: 1, why: "She says simplification helped the agency and added equipment for the rider.", whyZh: "她認為所謂簡化是讓機關輕鬆，乘客卻要準備更多東西。" },
      { weight: 5, q: "What does she mean by \"the office's relief\"?", choices: ["The office gave riders a discount.", "The brochure celebrates the agency's easier process, not the rider's trip.", "The night bus is faster.", "Paper tickets were illegal."], answer: 1, why: "She says the brochure describes the office's relief rather than her trip.", whyZh: "文宣寫的是辦公室輕鬆了，不是她的路程變簡單。" },
      { weight: 4, q: "Which change removed a backup for a dead phone?", choices: ["Drivers may still sell a single ride.", "Drivers are no longer allowed to sell a single ride.", "Paper tickets reload the app.", "The night bus waits."], answer: 1, why: "The driver can no longer sell a single ride.", whyZh: "司機不能再賣單程票，手機沒電就沒有退路。" },
      { weight: 4, q: "What would meet her request?", choices: ["A longer brochure", "One payment method that works without a charged battery", "A ban on paper and cash", "A new app icon"], answer: 1, why: "She asks for one way to pay that does not need a charged battery.", whyZh: "她要一種不靠手機電量的付款方式。" }
    ]
  },
  {
    id: "E12", level: "E", title: "What the Attendance Rate Leaves Out",
    paragraphs: [
      "The school reported a 96 percent attendance rate and called the year a recovery. The rate counts a student present if the student is in the building for a single period. A teenager who arrives for first period and leaves before lunch is present on that measure.",
      "The writer does not accuse the school of inventing bodies. The writer says the measure was [[generous]]. In this article, generous does not mean kind to students. It means willing to count a fragment of a day as a full day.",
      "The opinion is that the recovery is a feature of the definition. Students may indeed be coming more often. A reader cannot know that from a rate that turns an hour into a day. The opinion is not the arithmetic. It is the decision to stop the story there."
    ],
    questions: [
      { weight: 5, q: "In this article, [[generous]] describes a measure that", choices: ["helps students stay all day", "counts a small part of the day as a full day", "was calculated incorrectly", "ignores first period"], answer: 1, why: "Generous means the school counts a fragment as a full day.", whyZh: "這裡指計算方式很寬，片段出勤也算整天。" },
      { weight: 4, q: "What can a reader not conclude from the 96 percent alone?", choices: ["That the school published a rate", "That students are staying for full days more often", "That one period can count", "That a definition is being used"], answer: 1, why: "The rate can rise because an hour counts as a day.", whyZh: "單看 96% 無法知道學生是不是真的留了一整天。" },
      { weight: 5, q: "Where is the writer's opinion?", choices: ["In the decision to treat the rate as a recovery and stop", "In the existence of first period", "In the school calendar", "In a forged number"], answer: 0, why: "The opinion is the decision to end the story at the generous rate.", whyZh: "看法是：用這個寬鬆的比率就宣布復甦，然後停住。" },
      { weight: 4, q: "What does the writer refuse to claim?", choices: ["That the definition is generous", "That the school invented the students", "That one period can count as present", "That the story stops too early"], answer: 1, why: "The writer does not say the bodies were invented.", whyZh: "作者沒有說學校捏造學生人數。" }
    ]
  },
  {
    id: "E13", level: "E", title: "A Clause near the End", by: "Nadia Rahman",
    paragraphs: [
      "The offer letter spends a page on growth, mentoring, and a community of learners. The wage appears once, in a smaller line, and it is lower than the job Nadia already has. She does not think the page is accidental. A long welcome can be a hallway that delays the number.",
      "Near the end, the letter says the role is exempt and that evening events are \"part of the culture.\" Exempt means the hourly protections she has now would not apply. Culture, in this letter, is a soft word for unpaid time.",
      "Her conclusion is that the letter should be read backward. The constraints are at the bottom. The invitation is at the top. A reader who accepts the music without the last clause has agreed to a job the first page never quite described."
    ],
    questions: [
      { weight: 5, q: "What does Nadia want the reader to infer about the long welcome?", choices: ["It proves the wage is generous.", "It can delay the moment the reader sees the real terms.", "It was printed by mistake.", "It lists her current protections."], answer: 1, why: "She calls the welcome a hallway that delays the number.", whyZh: "前面的歡迎詞像一條走廊，把薪水數字往後推。" },
      { weight: 5, q: "In this letter, \"part of the culture\" most nearly means", choices: ["paid training", "unpaid evening time described as a value", "a community class she already takes", "a higher wage"], answer: 1, why: "She reads culture as a soft word for unpaid time.", whyZh: "culture 在這封信裡是不給薪時間的委婉說法。" },
      { weight: 4, q: "Which sentence best supports her warning about exempt status?", choices: ["The letter mentions mentoring.", "Exempt work would drop the hourly protections she has now.", "The wage appears once.", "The page is long."], answer: 1, why: "Losing hourly protections is the concrete consequence of exempt status.", whyZh: "改成豁免職位後，她現在的時薪保障會消失。" },
      { weight: 4, q: "Why does she say to read the letter backward?", choices: ["The first page is blank.", "The limits are at the end, and the invitation is at the top.", "The wage is higher at the bottom.", "Culture is defined in a dictionary."], answer: 1, why: "The constraints are at the bottom and the welcome is at the top.", whyZh: "限制寫在後面，邀請寫在前面。" }
    ]
  },
  {
    id: "E14", level: "E", title: "Reply to a Performance Note", by: "Chris Dalton",
    paragraphs: [
      "You wrote that I seem disengaged in morning meetings. I am present, and I am also the person who closed the building at midnight. Disengaged is a convenient word for a face that has already worked a shift.",
      "I am willing to move the meeting to 2:00 p.m., when the night crew is awake, or to receive the decisions in writing. I am not willing to be scored for failing to perform enthusiasm at 8:00 a.m. after a night on the floor.",
      "If the note remains in my file, I want this reply beside it. A description of my schedule belongs next to a description of my expression. One without the other is a portrait with the hours cut out."
    ],
    questions: [
      { weight: 5, q: "What is Chris's attitude?", choices: ["He agrees that he does not care.", "He rejects the label and offers practical alternatives.", "He wants the meetings canceled forever.", "He is amused by the file."], answer: 1, why: "He challenges disengaged and offers a later meeting or written decisions.", whyZh: "他不接受那個評語，並提出改時間或改成書面。" },
      { weight: 5, q: "What does he think \"disengaged\" ignores?", choices: ["The agenda", "The fact that he had already worked until midnight", "His wish to sleep through 2:00 p.m.", "The written decisions"], answer: 1, why: "He says the word describes a face that has already worked a night shift.", whyZh: "這個詞沒有算進他已經上完夜班。" },
      { weight: 4, q: "The sentence \"a portrait with the hours cut out\" means the note", choices: ["includes a photo", "judges his expression while omitting his schedule", "should be longer", "moves the meeting to 2:00"], answer: 1, why: "He wants the schedule beside the description of his expression.", whyZh: "只寫他的表情、不寫他的工時，像一幅被剪掉時間的畫。" },
      { weight: 4, q: "What does he want placed in the file?", choices: ["Only the original note", "This reply next to the note", "A canceled meeting", "A new midnight shift"], answer: 1, why: "He wants the reply filed beside the note.", whyZh: "他要這封回覆和原來的評語放在一起。" }
    ]
  },
  {
    id: "E15", level: "E", title: "The Safety Minute",
    paragraphs: [
      "Every meeting now begins with a safety minute. Ellis timed twelve of them. The average length was 48 seconds, and nine of the twelve repeated the same slide about wet floors. No minute mentioned the unguarded blade that workers had already written up twice.",
      "He does not think the ritual is useless because it is short. He thinks it is useless because it is [[aimed]] past the hazard in the room. In this account, aimed does not mean carefully directed. It means pointed at a danger the audience is not the one facing.",
      "The opinion is that a ritual can occupy the space where a warning should be. The wet-floor slide may be true in the lobby. It is not the reason the blade was written up. A minute that never risks an uncomfortable fact is not a safety program. It is a pause before the real agenda."
    ],
    questions: [
      { weight: 5, q: "In this account, [[aimed]] means the safety minute is", choices: ["carefully focused on the blade", "directed at a hazard the workers are not the ones facing", "longer than a minute", "written by the audience"], answer: 1, why: "The slide is about wet floors, not the blade they reported.", whyZh: "安全一分鐘講的是別人的危險，不是他們已經反映的那個。" },
      { weight: 4, q: "Which detail best supports the claim that the minute avoids the real hazard?", choices: ["Twelve meetings were timed.", "Nine minutes repeated a wet-floor slide and none mentioned the blade.", "The average was under a minute.", "The lobby has a floor."], answer: 1, why: "The repeated slide never reaches the hazard workers wrote up.", whyZh: "重複的是湿地板，沒有一次提到那片沒有防護的刀片。" },
      { weight: 5, q: "Where is the writer's opinion clearest?", choices: ["In the average of 48 seconds", "In the claim that the ritual occupies the space where a warning should be", "In the number of meetings", "In the existence of a lobby"], answer: 1, why: "That claim judges the ritual. The times are observations.", whyZh: "看法是這個儀式佔走了真正警告該在的位置。" },
      { weight: 4, q: "What does Ellis refuse to treat as the problem?", choices: ["The missing blade warning", "The shortness of the minute by itself", "The repeated slide", "The written reports"], answer: 1, why: "He says the ritual is not useless merely because it is short.", whyZh: "他認為問題不是它短，而是它沒有對準危險。" }
    ]
  },
  {
    id: "E16", level: "E", title: "Two Sentences, One Budget", by: "Helen Cho",
    paragraphs: [
      "The budget message says the city \"had no choice\" but to cut evening English classes. On the same page, a line adds money for a lobby renovation at the administration building. Had no choice is a claim about necessity. The renovation shows that money still moved. It moved toward a room the officials inhabit.",
      "Cho does not argue that a lobby can never be repaired. She argues that necessity was declared only for the cut that fell on students. A necessity that appears in one paragraph and disappears in the next is a preference wearing a stricter name.",
      "The opinion is in \"no choice,\" not in the dollar figures. The figures can be audited. The phrase cannot. It asks the reader to stop asking who chose."
    ],
    questions: [
      { weight: 5, q: "What does Cho want readers to infer from the two lines together?", choices: ["The city had no money anywhere.", "The cut was a choice, because money was found for the lobby.", "Evening classes were expanded.", "The figures are false."], answer: 1, why: "Money moved to the lobby on the same page as the claim of no choice.", whyZh: "同一頁還能撥錢整修大廳，所以削減課程是選擇。" },
      { weight: 5, q: "In her reading, \"had no choice\" functions as", choices: ["an audited dollar figure", "a stricter name for a preference", "a request to expand classes", "a description of the lobby"], answer: 1, why: "She says necessity is a preference wearing a stricter name.", whyZh: "所謂不得不，其實是偏好換了一個更硬的名字。" },
      { weight: 4, q: "Which part can be audited?", choices: ["The phrase no choice", "The dollar figures", "The officials' feelings", "The students' gratitude"], answer: 1, why: "She says the figures can be audited and the phrase cannot.", whyZh: "金額可以查，那句話不能。" },
      { weight: 4, q: "What does the phrase ask the reader to do?", choices: ["Compare the lobby with the classes", "Stop asking who made the choice", "Repair the building", "Audit every feeling"], answer: 1, why: "It asks the reader to stop asking who chose.", whyZh: "這句話要讀者不要再問是誰做的選擇。" }
    ]
  }
);
