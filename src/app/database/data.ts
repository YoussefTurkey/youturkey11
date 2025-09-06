type TAbout = {
  titleAr: string;
  titleEn: string;
  infoAr: string;
  infoEn: string;
  heroAr: string;
  heroEn: string;
  img: string;
};
export const about: TAbout = {
  titleAr: "مَن أنا",
  titleEn: "Who's Me",
  infoAr:
    "مطور واجهات أمامية مبدع ويدقق في التفاصيل، لديه أكثر من سنتين من الخبرة في بناء تطبيقات ويب حديثة ومتجاوبة. ماهر في JavaScript وNext.js وSCSS وWordPress (بما في ذلك Elementor وWooCommerce) ضمن مجموعة تقنيات متنوعة. شغوف بتجربة المستخدم وتصميم واجهات مخصصة تُعزز التفاعل وتحسن الأداء.",
  infoEn:
    "Creative and detail-oriented Frontend Developer with over 2 years of experience in building modern, responsive web applications. Proficient in JavaScript, Next.js, SCSS, and WordPress (Elementor, WooCommerce) as part of a versatile tech stack. Passionate about UI/UX and delivering tailored digital experiences that drive engagement and performance.",
  heroAr: "يوسف التركي",
  heroEn: "Youssef Turkey",
  img: "/images/turkey.webp",
};

type TWorks = {
  id: number;
  image: string;
  filter: string;
  titleAr: string;
  titleEn: string;
  shortDescAr?: string;
  shortDescEn?: string;
  descAr?: string;
  descEn?: string;
  preview?: string;
  behance?: string;
  github?: string;
  slug?: string;
};
export const works: TWorks[] = [
  {
    id: 1,
    image: "/images/project-4.webp",
    filter: "web",
    titleAr: "السيرة الذاتية",
    titleEn: "Resume",
    shortDescAr: "السيرة الذاتية الديناميكية تشكمل كافية بيانات يوسف التركي",
    shortDescEn: "Dynamic Resume that has all data about Youssef Turkey",
    preview: "https://youturkey11.com/",
  },
  {
    id: 2,
    image: "/images/project-5.webp",
    filter: "web",
    titleAr: "سبوت75",
    titleEn: "Spot75",
    shortDescAr: "متجر إلكتروني لخدمات الأدوات الترفيهية",
    shortDescEn: "E-Commerce for entertainment tools",
    preview: "https://spot75.com/",
  },
  {
    id: 3,
    image: "/images/project-6.webp",
    filter: "web",
    titleAr: "قُرّاءً",
    titleEn: "Qorra",
    shortDescAr:
      "موقع تعريفي لمبادرة قُرّاءْ التي تهدف للاهتمام باللغة العربية",
    shortDescEn:
      "Website for Qorra initiative that interesting of Arabic Langauage",
    preview: "https://qorra.vercel.app/",
  },
  {
    id: 4,
    image: "/images/project-1.webp",
    filter: "graphic",
    titleAr: "سنفُرّة",
    titleEn: "Senforra",
    shortDescAr: "سنفُرّة للبن البرازيلي الفاخر",
    shortDescEn: "Senforra For premium Brazilian coffee",
    preview:
      "https://www.behance.net/gallery/217496887/Senforra-Every-Sip-a-Story",
  },
  {
    id: 5,
    image: "/images/project-2.webp",
    filter: "graphic",
    titleAr: "كل ما هو تركي جميل",
    titleEn: "Every Turkey is Beautiful",
    shortDescAr: "الهوية البصرية لشعار يوسف التركي الجديد",
    shortDescEn: "Visual identity branding for Youssef Turkey",
    preview: "https://www.behance.net/gallery/208797491/_",
  },
  {
    id: 6,
    image: "/images/project-3.webp",
    filter: "graphic",
    titleAr: "جميع أعمالي 2024",
    titleEn: "All My Projects 2024",
    shortDescAr: "جميع الهويات البصرية سنة 2024",
    shortDescEn: "Logofolio for 2024",
    preview: "https://www.behance.net/gallery/209786459/Logofolio-2024",
  },
  {
    id: 7,
    image: "/images/post-1.webp",
    filter: "post",
    titleAr: "الفرق بين الوظيفة واستدعاء الوظيفة",
    titleEn: "Function VS Callback Function",
    descAr: `دايمًا بنسمع مصطلح الـcallback function
            بصراحة انا كنت فاكرها مجرد استدعاء للـfunction الأساسية بتاعتي
            مثال:
            function sum ( a, b ) {
            return a + b
            }
            sum( 10, 15 ) 
            الحقيقة إن دي مجرد function عادية جدًا والاستدعاء اسمه call the function

            طيب إيه بقى الـcallback function?
            ببساطة مجرد function اتمررت كـparameter لـfunction تانية
            مثال:
            function greetUser(callback) {
            console.log("Welcome!")
            callback(); // استدعاء الفنكشن اللي اتبعتت كـ callback
            }

            function sayName() {
            console.log("My name is Youssef.")
            }

            greetUser(sayName)

            لو هتلاحظ نحط الـsayName function كـparameter لـgreetUser

            أشهر أمثلة الـcallback function هي setTimeout
            مثال:
            setTimeout(function() {
            console.log("This runs after 2 seconds");
            }, 2000);
            `,
    descEn: `🚀 Let’s talk about Callback Functions in JavaScript!
            At first, I used to think a callback function was just calling my main function, like this:
            function sum(a, b) {
              return a + b;
            }
            sum(10, 15);
            But this is just a normal function call.

            So, what exactly is a callback function? 🤔
            👉 It’s simply a function that you pass as a parameter to another function.

            Example:
            function greetUser(callback) {
              console.log("Welcome!");
              callback(); // calling the function that was passed
            }

            function sayName() {
              console.log("My name is Youssef.");
            }

            greetUser(sayName);

            Here, sayName is passed as a callback to greetUser.

            One of the most common real-life examples is setTimeout:
            setTimeout(function() {
              console.log("This runs after 2 seconds");
            }, 2000);

            ✅ That’s the beauty of callbacks — they allow us to control the flow of our code and make it more flexible.`,
    slug: "/",
  },
  {
    id: 8,
    image: "/images/post-2.webp",
    filter: "post",
    titleAr: "تشانك",
    titleEn: "Chunk",
    descAr: `بلعب بالـNode.js كدا فلاقيت كلمة chunk متنتورة ف كل حتة ومش فاهم معناها اية!!

            كلمة chunk هنشوفها كتير جدًا في Node.js والمجالات المرتبطة بالشبكات أو الـ streams.

            1️⃣ يعني إيه chunk؟
            Chunk = "قطعة" أو "جزء".
            في البرمجة، chunk يعني جزء صغير من البيانات بيتم إرساله أو استقباله بدل ما نبعت كل البيانات مرة واحدة.
            في Node.js، خصوصًا في HTTP أو Streams، البيانات مش بتتبعت أو تتقرأ كـ ملف واحد ضخم، لكن بتتقسم لأجزاء صغيرة chunks.

            2️⃣ مثال بسيط:
            تخيل إنك بتنزل فيلم من النت.
            الفيلم حجمه 2GB.
            السيرفر مش بيبعتلك 2GB مرة واحدة، هو بيبعتلك chunks (مثلاً كل chunk حجمها 1MB).
            إنت تجمع الـ chunks لحد ما تكوّن الملف الكامل.

            4️⃣ ليه بنستخدم chunks؟
            توفير الذاكرة: مش مضطر تحمل كل البيانات في RAM مرة واحدة.
            السرعة: تقدر تبدأ الإرسال أو المعالجة قبل ما البيانات كلها تبقى جاهزة.
            المرونة: مناسب للملفات الكبيرة أو الـ streaming (زي فيديوهات يوتيوب).`,
    descEn: `🔹 Playing around with Node.js, I kept seeing the word chunk everywhere… and I wasn’t sure what it really meant!

            So, let’s break it down 👇

            1️⃣ What is a chunk?

            A chunk = a “piece” or “part” of data.
            In programming, a chunk is simply a small portion of data that’s sent or received instead of transferring the whole thing at once.

            In Node.js, especially when working with HTTP or Streams, data isn’t sent or read as one giant file. Instead, it’s broken down into smaller chunks.

            2️⃣ Simple Example

            Imagine you’re downloading a movie that’s 2GB in size.
            The server doesn’t send you all 2GB in one go. Instead, it sends you chunks (for example, each chunk is 1MB).
            You keep receiving chunks until the full file is assembled.

            3️⃣ Why do we use chunks?

            ✅ Memory efficiency – no need to load the entire data into RAM.
            ✅ Speed – you can start processing before the entire file is ready.
            ✅ Flexibility – perfect for large files or streaming (think YouTube videos).

            ⚡ That’s why chunks are everywhere in Node.js — they’re the backbone of handling streams and big data.`,
    slug: "/",
  },
  {
    id: 9,
    image: "/images/post-3.webp",
    filter: "post",
    titleAr: "بفار",
    titleEn: "Buffer",
    descAr: `💡 ليه بنحتاج Buffer؟
              JavaScript العادي بيتعامل مع النصوص (strings) والأرقام، لكن أحيانًا في Node.js بنحتاج نتعامل مع:
              ملفات (صور، PDF، فيديو…)
              بيانات بتوصل من الإنترنت على شكل أجزاء (chunks)
              Streams (زي قراءة ملف أو استقبال request)
              البيانات دي مش نصوص، هي بيانات ثنائية (binary data) مكوّنة من أصفار وآحاد.
              هنا بييجي دور Buffer.

              🛠 مثال سريع
              const buf = Buffer.from('Hello');
              console.log(buf); 

              👈 اللي حصل هنا إنه تم تحويل كل حرف لـbinary data زي كدا <Buffer 48 65 6c 6c 6f> بس بطريقة الـhexadecimal

              hashtag#nodejs_tips
              hashtag#js_tips
            `,
    descEn: `💡 Why do we need Buffers in Node.js?

              In plain JavaScript, we usually deal with strings and numbers.
              But sometimes in Node.js, we need to handle:

              Files (images, PDFs, videos…)

              Data coming from the internet in small parts (chunks)

              Streams (like reading a file or handling an HTTP request)

              👉 The problem: this data isn’t text — it’s binary data (zeros and ones).
              That’s where Buffer comes in.
              
              🛠 Quick Example:
              const buf = Buffer.from('Hello');
              console.log(buf);

              Output:
              <Buffer 48 65 6c 6c 6f>

              Here, each character of "Hello" gets converted into binary data, represented in hexadecimal.

              ⚡ Buffers are essential whenever you need to work with raw binary data in Node.js.

              #nodejs_tips #js_tips
            `,
    slug: "/",
  },
  {
    id: 10,
    image: "/images/post-4.webp",
    filter: "post",
    titleAr: "Spread VS Rest",
    titleEn: "Spread VS Rest",
    descAr: `انا مش كريم انا كرم 😂

            ♾️ تخيل معايا كدا لو روحت لفرن العيش هتلاقي فيه اتنين شبه بعض بس شغلانتهم مختلفة
            واحد بيفرد العيش داخل الفرن 
            وواحد بيلم العيش بعد ما يستوي

            ده بالظبط دور الـSpeard Operator والـRest Parameter
            بص حتة باينة من اسمها ازاي

            1️⃣ الـSpread Operator:
            بياخد عناصر موجودة في array أو object ويفردها (يفكها) في مكان تاني.
            مثال:
            // Array
            let arr1 = [1, 2, 3];
            let arr2 = [4, 5, ...arr1];
            [4, 5, 1, 2, 3]

            // Object
            let obj1 = { a: 1, b: 2 };
            let obj2 = { c: 3, ...obj1 }; 
            { c: 3, a: 1, b: 2 }

            2️⃣ أما الـRest Parameter:
            بيجمع قيم متعددة في parameter واحد على هيئة array.
            مثال:
            function sum(...numbers) { 
            return numbers.reduce((total, num) => total + num, 0);
            }
            console.log(sum(1, 2, 3, 4));

            💡فكرها كده:
            Spread = انشر
            Rest = اجمع

            hashtag#nodejs_tips
            hashtag#js_tips
`,
    descEn: `😂 I’m not Kareem, I’m Karam!

            ♾️ Imagine this: you go to a bakery and find two people who look alike but have different jobs.

            One spreads the dough inside the oven.

            The other collects the bread after it’s baked.

            That’s exactly the difference between the Spread Operator and the Rest Parameter in JavaScript.

            1️⃣ Spread Operator
            It takes elements from an array or object and spreads (unpacks) them somewhere else.
            
            // Array
            let arr1 = [1, 2, 3];
            let arr2 = [4, 5, ...arr1];
            console.log(arr2); // [4, 5, 1, 2, 3]

            // Object
            let obj1 = { a: 1, b: 2 };
            let obj2 = { c: 3, ...obj1 };
            console.log(obj2); // { c: 3, a: 1, b: 2 }

            2️⃣ Rest Parameter
            It collects multiple values into a single parameter as an array.

            function sum(...numbers) {
              return numbers.reduce((total, num) => total + num, 0);
            }
            console.log(sum(1, 2, 3, 4)); // 10


            💡Think of it like this:

            Spread = Spread out

            Rest = Collect

            #nodejs_tips #js_tips`,
    slug: "/",
  },
  {
    id: 11,
    image: "/images/post-5.webp",
    filter: "post",
    titleAr: "ليه JavaScript لغة ذكية ومرنة؟",
    titleEn: "Why JavaScript is flexable and inteligiant langauage?",
    descAr: `ليه JavaScript لغة ذكية ومرنة؟ 8 حقائق لازم تعرفها

            1️⃣ عالية المستوى (High-level)
            يعني مش محتاج تتعامل مع تفاصيل معقدة للهاردوير زي إدارة الذاكرة أو التعامل المباشر مع البروسيسور.
            في JavaScript أنت بتكتب أوامر قريبة من طريقة التفكير البشري، والـEngine (المحرك) بيحوّلها للتعليمات اللي الكمبيوتر يفهمها.
            مثال: بدل ما تحجز مساحة في الرام يدوي، JavaScript بتعمل ده عنك تلقائي.

            2️⃣ أحادية الخيط (Single-threaded)
            JavaScript بتنفذ كود واحد في نفس اللحظة، يعني فيه "خط" واحد فقط بينفذ التعليمات بالترتيب.
            عشان كده عندها Event Loop للتعامل مع العمليات اللي ممكن تاخد وقت (زي قراءة ملف أو الاتصال بسيرفر) من غير ما توقف الكود كله.

            3️⃣ تجميع القمامة (Garbage Collected)
            ده معناه إن JavaScript بتنظف الذاكرة تلقائيًا.
            أي متغير أو كائن مابقاش في استخدام، الـGarbage Collector بيشيله من الذاكرة لتوفير مساحة.
            مش محتاج تحذف أو تدير الميموري يدوي زي لغات زي C أو C++.

            4️⃣ مفسّرة (Interpreted)
            يعني الكود ممكن يتنفذ مباشرة سطر بسطر عن طريق الـJavaScript Engine من غير ما تحتاج تعمل Compile للكود كله مسبقًا زي C++.
            لكن هنا فيه لمسة مهمة…

            5️⃣ مترجمة في الوقت الفعلي (JIT Compiled)
            المحركات الحديثة زي V8 (في Chrome وNode.js) بتعمل مزيج بين التفسير والترجمة الفورية.
            بتقرأ الكود وتفسره في الأول بسرعة، ولو لقيت جزء بيتكرر كتير بتحوّله لكود آلة أسرع أثناء التشغيل (on the fly).
            ده بيخلي JavaScript أسرع بكتير من زمان.

            6️⃣ مبنية على النماذج الأولية (Prototype-based)
            JavaScript مفيهاش Classes بالمعنى التقليدي (زي Java أو C++)، لكن كل كائن مرتبط بكائن آخر اسمه Prototype.
            الخصائص والدوال ممكن تتوارث من الـPrototype ده.
            ES6 أضاف كلمة class لكن هي Syntax Sugar فوق النظام القديم.

            7️⃣ متعددة الأنماط (Multi-paradigm)
            JavaScript مرنة، وتقدر تستخدم أكتر من أسلوب برمجة:
            ✅ Functional programming (دوال نقية، map, filter, reduce).
            ✅ Object-oriented (كائنات ووراثة).
            ✅ Procedural (خطوات أو أوامر متسلسلة).

            8️⃣ ديناميكية (Dynamic Language)
            تقدر تغيّر نوع المتغير في أي وقت (Weakly typed).
            المتغير x ممكن يكون رقم، وبعدها نص، وبعدها كائن، من غير ما JavaScript تمنعك.
            الخصائص ممكن تتضاف أو تتشال من الكائنات وقت التشغيل.

            hashtag#nodejs_tips
            hashtag#js_tips
`,
    descEn: `🚀 Why is JavaScript such a smart and flexible language?
              Here are 8 facts you need to know 👇

              1️⃣ High-level
              You don’t deal with low-level details like memory management or direct processor instructions.
              JavaScript lets you write code closer to human thinking, while the engine handles the heavy lifting.

              2️⃣ Single-threaded
              JS runs one piece of code at a time in a single thread.
              To handle tasks like file reading or server requests without blocking everything, it uses the Event Loop.

              3️⃣ Garbage Collected
              Memory cleanup is automatic.
              Unused variables/objects are removed by the Garbage Collector — no manual memory management like in C/C++.

              4️⃣ Interpreted
              JavaScript can run line by line directly via the engine — no full compilation step needed.

              5️⃣ JIT Compiled (Just-in-Time)
              Modern engines like V8 mix interpretation with real-time compilation.
              Frequently used code is optimized into faster machine code on the fly → 🚀 big performance boost.

              6️⃣ Prototype-based
              Instead of traditional classes, every object is linked to a prototype.
              Inheritance works via prototypes. (The class keyword in ES6 is just syntax sugar 😉).

              7️⃣ Multi-paradigm
              JS supports different coding styles:
              ✅ Functional (map, filter, reduce)
              ✅ Object-oriented (objects, inheritance)
              ✅ Procedural (step-by-step instructions)

              8️⃣ Dynamic
              Variables can change type at any time.
              x can be a number, then a string, then an object — no problem.
              Objects can gain or lose properties during runtime.

              💡 That’s why JavaScript is one of the most powerful and flexible languages out there.

              #nodejs_tips #js_tips`,
    slug: "/",
  },
  {
    id: 12,
    image: "/images/post-6.webp",
    filter: "post",
    titleAr: "اية الفرق بين الACID والBASE؟",
    titleEn: "What is difference between ACID and BASE?",
    descAr: `اية الفرق بين الACID والBASE؟

            📌 ACID (أسلوب الانضباط الشديد)
            ده أسلوب قواعد البيانات التقليدية زي SQL، بيهتم إن كل عملية (Transaction) تكون:
            A – Atomicity (ذرية)
            يا إما العملية تحصل كلها، يا إما ما تحصلش خالص.
            زي لو دفعت في المحل، يا إما الفلوس تتسحب والبضاعة تخرج، يا إما ولا حاجة تحصل.
            C – Consistency (اتساق)
            بعد كل عملية، البيانات تفضل سليمة ووفق القوانين.
            زي لو رصيدك 100 جنيه، والمحل بيبيع بـ 120، مش هيسمح يبيعلك.
            I – Isolation (عزل)
            العمليات ما تتداخلش مع بعض وتبوظ البيانات.
            زي لو فيه اتنين بيشتروا آخر قطعة، النظام يمنع إن الاتنين ياخدوها معًا.
            D – Durability (ثبات)
            بعد ما العملية تخلص، البيانات تفضل موجودة حتى لو الكهرباء قطعت.
            🔹 ده ممتاز للبنوك، المعاملات المالية، والمجالات اللي ما ينفعش يحصل فيها خطأ.

            📌 BASE (أسلوب المرونة العالية)
            ده أسلوب قواعد البيانات الحديثة زي NoSQL، بيركز أكتر على السرعة والتوزيع بدل الصرامة:
            B – Basically Available (متاح أغلب الوقت)
            النظام دايمًا بيحاول يرد، حتى لو الرد مؤقت أو ناقص.
            S – Soft state (حالة مرنة)
            البيانات ممكن تتغير مع الوقت حتى من غير تحديث مباشر.
            يعني فيه احتمال إنك تقرأ بيانات قديمة شوية.
            E – Eventually consistent (اتساق في النهاية)
            مش لازم البيانات تكون صحيحة 100% فورًا، بس بعد وقت قصير كل النسخ هتكون متطابقة.
            زي لو اشتريت من فرع القاهرة، فرع الإسكندرية ممكن يعرف بعد دقائق.
            🔹 ده ممتاز للشبكات الاجتماعية، أنظمة البحث، والتطبيقات اللي الأولوية فيها للسرعة والتوسع.

            hashtag#nodejs_tips
            hashtag#js_tips
`,
    descEn: `⚖️ ACID vs BASE in Databases

            When it comes to databases, two major philosophies exist: ACID (strict discipline) and BASE (high flexibility). Let’s break them down 👇

            📌 ACID – Strong Consistency (used in SQL/Relational DBs)
            Focus: reliability, accuracy, and strict rules.

            A – Atomicity → A transaction happens all or nothing.
            Example: Either money is deducted and the item is delivered, or nothing happens.

            C – Consistency → Data must always remain valid and follow rules.
            Example: If your balance is $100, you can’t buy something worth $120.

            I – Isolation → Transactions don’t interfere with each other.
            Example: If 2 people try to buy the last item, only one succeeds.

            D – Durability → Once a transaction is complete, the data is safe (even if the server crashes).

            ✅ Best for: Banking, financial apps, mission-critical systems.

            📌 BASE – High Availability (used in NoSQL/modern DBs)
            Focus: speed, scalability, and flexibility.

            B – Basically Available → The system always tries to respond, even if partial or temporary.

            S – Soft State → Data can be temporarily out of sync and change over time.

            E – Eventually Consistent → Data across replicas may not be correct immediately, but will be consistent eventually.
            Example: You buy something in Cairo, the Alexandria branch may update after a few seconds.

            ✅ Best for: Social networks, search engines, real-time apps.

            💡 In short:

            ACID = Accuracy & strict rules ⚖️

            BASE = Speed & scalability ⚡

            #nodejs_tips #js_tips`,
    slug: "/",
  },
  {
    id: 13,
    image: "/images/post-7.webp",
    filter: "post",
    titleAr: "اية الفرق بين Blocking والـNon-Blocking ؟",
    titleEn: "What is difference between Blocking and Non-Blocking?",
    descAr: `اية الفرق بين Blocking والـNon-Blocking 

            📌 Blocking I/O
            يعني الكود يوقف التنفيذ لحد ما العملية تخلص.
            لو بتقرأ من ملف كبير → الكود هيستنى لحد ما الملف كله يتقري قبل ما يكمل.
            ده بيخلي الأداء ضعيف لما يكون عندك طلبات كتير.
            🔹 مثال (Blocking):

            const fs = require("fs");
            console.log("قبل قراءة الملف");
            const data = fs.readFileSync("data.txt", "utf-8"); 
            console.log(data);
            console.log("بعد قراءة الملف");

            النتيجة...
            >> قبل قراءة الملف
            >> data لازم تتحمل وتظهر الأول
            >> بعد قراءة الملف

            -------------------------------------------------------

            📌 Non-Blocking I/O
            يعني الكود ميستناش العملية → يكمل تنفيذ باقي الكود على طول، ولما العملية تخلص هيرجع ينفذ الـcallback أو الـpromise.
            ده اللي بيخلي Node.js يقدر يتعامل مع آلاف الطلبات في نفس الوقت.
            🔹 مثال (Non-Blocking):

            const fs = require("fs");
            console.log("قبل قراءة الملف");
            fs.readFile("data.txt", "utf-8", (err, data) => {
            if (err) throw err;
            console.log(data); 
            });
            console.log("بعد قراءة الملف");

            النتيجة...
            >> قبل قراءة الملف
            >> بعد قراءة الملف
            >> data تيجي ع مهلها بقى

            🎯 الفرق الأساسي
            Blocking: ينفذ الأوامر واحدة ورا التانية، وكل عملية I/O توقف الكود كله.
            Non-Blocking: ينفذ الأوامر بالتوازي، وعمليات I/O تشتغل في الخلفية من غير ما توقف باقي الكود.

            ⚡ ليه Node.js بيعتمد على Non-Blocking؟
            عشان يقدر يخدم عدد كبير من المستخدمين في نفس اللحظة.
            ده السبب إنه مشهور في السيرفرات والتطبيقات اللي فيها كثير اتصالات متزامنة (زي الشات، APIs، الاستريم).

            hashtag#nodejs_tips
            hashtag#js_tips
`,
    descEn: `🔄 Blocking vs Non-Blocking in Node.js

            When dealing with I/O operations (like reading files, making requests, etc.), Node.js shines because of its Non-Blocking nature. Let’s break it down 👇

            📌 Blocking I/O
            Execution stops until the operation is fully completed.
            If you read a large file → the code waits until it’s done before moving on.
            This can cause performance issues with many requests.

            🔹 Example (Blocking):
            
            const fs = require("fs");
            console.log("Before reading file");
            const data = fs.readFileSync("data.txt", "utf-8"); 
            console.log(data);
            console.log("After reading file");

            📍 Output:
            Before reading file
            <data content>
            After reading file

            📌 Non-Blocking I/O
            The code doesn’t wait for the operation. It continues executing, and when the operation finishes, a callback or promise handles the result.
            This is what allows Node.js to handle thousands of requests at once.

            🔹 Example (Non-Blocking):
              const fs = require("fs");
              console.log("Before reading file");
              fs.readFile("data.txt", "utf-8", (err, data) => {
              if (err) throw err;
              console.log(data);
              });
              console.log("After reading file");

              📍 Output:
              Before reading file
              After reading file
              <data content>

              🎯 Key Difference

              Blocking → Executes one by one. Each I/O stops the entire code.

              Non-Blocking → Executes in parallel. I/O runs in the background without blocking.

              ⚡ Why Node.js uses Non-Blocking?
              Because it allows servers to handle a huge number of users simultaneously → perfect for chats, APIs, streaming apps, etc.

              #nodejs_tips #js_tips
`,
    slug: "/",
  },
  {
    id: 14,
    image: "/images/post-8.webp",
    filter: "post",
    titleAr: "معنى Syntax Sugar",
    titleEn: "What is Syntax Sugar?",
    descAr: `✅ معنى Syntax Sugar
              هو مش حاجة جديدة في اللغة، لكنه طريقة كتابة أبسط وأسهل لشيء ممكن نكتبه بطريقة أطول أو أعقد.
              يعني: نفس النتيجة، بس الكود يبقى أوضح وأسهل للقراية والفهم.

              🟢 مثال في JavaScript​:
              من غير Syntax Sugar

              const numbers = [1, 2, 3];
              const doubled = numbers.map(function (num) {
              return num * 2;
              });

              🟢 مع Syntax Sugar (Arrow Functions)

              const numbers = [1, 2, 3];
              const doubled = numbers.map(num => num * 2);

              🎯 الخلاصة:
              Syntax Sugar = طريقة أقصر وأوضح لكتابة كود بيعمل نفس الحاجة.
              الهدف: سهولة القراءة، تقليل الكود، تحسين الإنتاجية.

              hashtag#nodejs_tips
              hashtag#js_tips`,
    descEn: `✅ What does “Syntax Sugar” mean?

              It’s not something new in the language.
              It’s simply a shorter and easier way to write code that could otherwise be written in a longer or more complex way.
              👉 Same result, but the code becomes clearer and easier to read.

              🟢 Example in JavaScript

              Without Syntax Sugar:
              const numbers = [1, 2, 3];
              const doubled = numbers.map(function (num) {
                return num * 2;
              });

              With Syntax Sugar (Arrow Functions):
              const numbers = [1, 2, 3];
              const doubled = numbers.map(num => num * 2);

              🎯 Takeaway:
              Syntax Sugar = A cleaner, shorter way to write the same logic.
              ✅ Easier to read
              ✅ Less code
              ✅ Better productivity

              #nodejs_tips #js_tips
`,
    slug: "/",
  },
  {
    id: 15,
    image: "/images/VALIDATION.webp",
    filter: "video",
    titleAr: "التأكد من صحة البيانات",
    titleEn: "VALIDATION",
    descAr: `🚀 عاوز تبني فورمات تسجيل دخول (Login) وتسجيل حساب (Signup) قوية وسهلة الاستخدام في React؟

            في الفيديو ده هتتعلم إزاي تدمج بين React Hook Form و Zod علشان تعمل فورمات سريعة، منظمة، وآمنة بالـTypeScript مع فاليـديشن متقدم!

            🔧 هتتعلم إيه؟

            إزاي تظبط react-hook-form

            إزاي تعرف schema بالفاليـديشن باستخدام zod

            إزاي تستخدم zodResolver للدمج السلس بين الاتنين

            مثال عملي: Login & Signup Forms

            التعامل مع أخطاء الفاليـديشن والقواعد المخصصة

            Tips لواجهة مستخدم (UX) أنضف في الفورمات

            💡 سواء بتشتغل بـ React أو Next.js أو TypeScript، الطريقة دي هتوفرلك وقت وتجنبك الأخطاء الشائعة في التعامل مع الفورمات.

            🔗 لينكات مفيدة:

            Template على GitHub: https://github.com/YoussefTurkey/react-hook-form-zod

            React Hook Form: https://react-hook-form.com

            Zod: https://zod.dev

            zodResolver: https://www.npmjs.com/package/@hookform/resolvers

            🔥 ما تنساش تعمل لايك 👍، سبسكرايب 🔔، وتسيب سؤالك في الكومنتات!

            #React #ReactHookForm #Zod #Authentication #LoginForm #SignupForm #FormValidation #WebDevelopment #TypeScript #NextJS`,
    descEn: `Want to build powerful and user-friendly authentication forms in React?
              In this video, you'll learn how to combine React Hook Form with Zod to create fast, clean, and type-safe login and signup forms with advanced validation!

              🔧 What you’ll learn:

              How to set up react-hook-form

              How to define form schema with zod

              How to use zodResolver for seamless integration

              Real-world example: Login & Signup forms

              Handling validation errors and custom rules

              Tips for clean UX in authentication

              💡 Whether you’re building with React, Next.js, or TypeScript, this method will save you time and help you avoid common form-handling mistakes.

              🔗 Useful Links:

              Template on Github: https://github.com/YoussefTurkey/react-hook-form-zod

              React Hook Form: https://react-hook-form.com

              Zod: https://zod.dev

              zodResolver: https://www.npmjs.com/package/@hookform/resolvers

              🚀 Don't forget to Like, Subscribe, and Comment your questions below!

              #React #ReactHookForm #Zod #Authentication #LoginForm #SignupForm #FormValidation #WebDevelopment #TypeScript #NextJS`,
    preview: "https://youtu.be/4j5SZBTIXLc?si=VUwnIerYa6igz_Jj",
    slug: "/",
  },
  {
    id: 16,
    image: "/images/NEXT-THEME.webp",
    filter: "video",
    titleAr: "القالب النهاري والليلي",
    titleEn: "NEXT-THEME",
    descAr: `🌓 عاوز تضيف Dark Mode لموقعك بـ Next.js؟
              متضيعش وقتك في حلول معقدة!
              مكتبة next-themes هتخليك تفعل الوضع الليلي بسهولة وفي سطرين كود بس 🔥
              ✅ دعم مباشر لـ TailwindCSS
              ✅ حفظ تفضيل المستخدم تلقائيًا
              ✅ تشتغل على مستوى التطبيق بالكامل
              ✅ خفيفة وسهلة التخصيص
              📚 شوف الـ Docs الرسمية هنا:
              https://github.com/pacocoursey/next-themes`,
    descEn: `🌗 Want to add Dark Mode to your Next.js website?
            Stop wasting time with complicated solutions!

            The next-themes library makes it super easy to enable dark mode in just a couple of lines of code 🔥

            ✅ Seamless support with TailwindCSS
            ✅ Automatically saves user preferences
            ✅ Works across your entire app
            ✅ Lightweight & fully customizable

            📚 Check out the official docs here:
`,
    preview: "https://youtu.be/Jz2ODo3mycE?si=y7CD7uo9Y2mPrmI3",
    slug: "/",
  },
];
