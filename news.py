"""News and tool spotlights for breathegetaway.ai/news/. Same fields as guides in build.py.
Keep the mix varied (most pieces about other tools) so the section reads like real news.
Keep every claim true; check Utterseen claims against ~/utterseen/frontend/public/llms.txt.
"""
NEWS_DATE = "2026-11-19"

NEWS = [
{
"slug": "ai-assistants-that-see-your-screen",
"title": "AI assistants that can see your screen: what they do and which to try",
"desc": "ChatGPT, Microsoft Copilot, Meta AI and Utterseen can all look at what's on your screen. How screen-aware AI works, what each one does, and how they differ.",
"answer": "Several AI assistants can now look at your screen so you don't have to copy and paste: ChatGPT's desktop app can work with some apps, Microsoft Copilot Vision can see apps you share on Windows, Meta AI's Mac app can share a window, and Utterseen is a voice assistant for Mac and Windows that looks at your screen whenever you hold a key and ask. They differ in how you ask, which apps they see, and whether they can take actions.",
"body": """
<h2>Why does screen-aware AI matter?</h2>
<p>Most AI chats still start with copying text or a screenshot into a chat window, then copying the answer back. Assistants that can see your screen cut those steps, so a question like "what does this error mean?" works without any setup.</p>
<h2>What can ChatGPT see?</h2>
<p>ChatGPT's desktop app has a feature that lets it read content from supported apps, such as some coding tools and note apps, when you turn it on. You still ask in a chat window.</p>
<h2>What about Microsoft Copilot?</h2>
<p>Copilot Vision on Windows lets you share an app or your screen with Copilot and talk about what it sees. It's built into Windows for users in supported regions.</p>
<h2>And Meta AI?</h2>
<p>Meta AI's Mac app can share a window so you can ask about it. It works as a chat app first.</p>
<h2>How is Utterseen different?</h2>
<p><a href="{US}">Utterseen</a> is built around voice. You hold a key, ask out loud, and it takes one screenshot and answers out loud in whatever app you're using. It can also act on the screen: fill out forms and job applications, write and paste replies, and make study guides or flashcards.</p>
<h2>How do they compare?</h2>
<div class="tablewrap"><table><thead><tr><th></th><th>How you ask</th><th>Platforms</th><th>Takes actions</th></tr></thead><tbody>
<tr><td>ChatGPT desktop</td><td>Chat, voice mode</td><td>Mac, Windows</td><td>Mostly answers</td></tr>
<tr><td>Copilot Vision</td><td>Voice, chat</td><td>Windows</td><td>Mostly guidance</td></tr>
<tr><td>Meta AI app</td><td>Chat</td><td>Mac</td><td>Mostly answers</td></tr>
<tr><td>Utterseen</td><td>Hold a key, talk</td><td>Mac, Windows</td><td>Fills forms, pastes replies, makes files</td></tr>
</tbody></table></div>
<p>These features change quickly, so check each app for the latest.</p>
<h2>What about privacy?</h2>
<p>Look at when each one sees your screen. Some only look when you share or ask; check what's captured and whether it's stored. Utterseen, for example, listens only while the key is held and takes one screenshot per question.</p>
""",
"faq": [
("Is there an AI that can see my screen?", "Yes. ChatGPT's desktop app, Microsoft Copilot Vision, Meta AI's Mac app and Utterseen can all look at what's on your screen in different ways."),
("Which screen-reading AI works on both Mac and Windows?", "ChatGPT's desktop app and Utterseen both run on Mac and Windows. Copilot Vision is a Windows feature."),
("Can AI see my screen and fill out forms?", "Some can. Utterseen can fill out forms and job applications on your screen and stops before Submit so you can review."),
],
},
{
"slug": "tool-spotlight-google-notebooklm",
"title": "Tool spotlight: Google NotebookLM turns your notes into a study partner",
"desc": "NotebookLM answers questions using only the sources you upload, and makes summaries, study guides, flashcards and audio overviews. How students use it.",
"answer": "Google NotebookLM is a free AI notebook that answers questions using only the sources you give it, like PDFs, Google Docs, websites and YouTube videos, with citations back to the source. Students use it to summarize readings, make study guides, flashcards and quizzes, and generate podcast-style Audio Overviews of their material.",
"body": """
<h2>What makes NotebookLM different from a chatbot?</h2>
<p>It sticks to your sources. Upload your readings and notes, and its answers point back to the exact passages they came from, which makes it easier to trust for a specific class.</p>
<h2>What can you make with it?</h2>
<p>Summaries, study guides, FAQs, flashcards and quizzes from your sources, plus Audio Overviews: a two-voice, podcast-style discussion of your material you can listen to on the go.</p>
<h2>Who is it best for?</h2>
<p>Students with a stack of readings for one course, and anyone researching from a fixed set of documents.</p>
<h2>What are the limits?</h2>
<p>You have to upload material first, so it's less handy for a quick question about whatever happens to be on your screen. For that, a screen-aware assistant is faster; see our <a href="/chatgpt-vs-notebooklm-vs-utterseen-for-studying/">ChatGPT vs NotebookLM vs Utterseen</a> comparison.</p>
""",
"faq": [
("Is NotebookLM free?", "NotebookLM has a free version with usage limits, plus higher limits on paid Google plans."),
("Can NotebookLM make flashcards?", "Yes. It can make flashcards and quizzes from the sources you upload."),
("What is an Audio Overview?", "A podcast-style audio discussion of your uploaded sources that NotebookLM generates so you can listen instead of read."),
],
},
{
"slug": "tool-spotlight-anki",
"title": "Tool spotlight: Anki, the free flashcard app medical students swear by",
"desc": "Anki uses spaced repetition to show you each flashcard right before you'd forget it. Why it works, what it costs, and how to fill it with cards fast.",
"answer": "Anki is a free, open-source flashcard app that uses spaced repetition, showing each card right before you're likely to forget it, so you remember more in less review time. It's especially popular with medical and language students. The desktop app and Android app are free; the iPhone app is a one-time purchase.",
"body": """
<h2>Why does spaced repetition work?</h2>
<p>Reviewing a fact just before you'd forget it makes the memory last longer each time. Anki schedules every card for you, so easy cards come back rarely and hard ones come back often. Newer versions include the FSRS scheduler, which predicts forgetting more precisely.</p>
<h2>Why do medical students love it?</h2>
<p>Huge amounts of facts, years of retention needed, and shared decks built by other students. Many med school communities trade well-known decks.</p>
<h2>What's the catch?</h2>
<p>Making cards takes time, and the interface feels dated. The fix for the first one is letting AI make the cards: give ChatGPT your notes and import the result, or use <a href="{US}">Utterseen</a>, which makes Anki flashcards straight from slides or notes on your screen.</p>
<h2>How do you start?</h2>
<p>Download Anki, make or import a deck, and review every day, even for ten minutes. Consistency matters more than session length. Our guide: <a href="/make-flashcards-with-ai/">how to make flashcards with AI</a>.</p>
""",
"faq": [
("Is Anki free?", "The desktop app and AnkiDroid are free. AnkiMobile for iPhone is a one-time purchase that supports development."),
("Is Anki better than Quizlet?", "Anki has stronger spaced repetition for long-term memory. Quizlet is easier to use and share. Both import AI-made cards."),
("Can AI make Anki cards?", "Yes. ChatGPT can write question and answer pairs to import, and Utterseen can make Anki flashcards from slides or notes on your screen."),
],
},
{
"slug": "tool-spotlight-simplify-copilot",
"title": "Tool spotlight: Simplify Copilot, the free autofill extension for job applications",
"desc": "Simplify Copilot saves your profile and autofills job applications in your browser, and tracks where you've applied. What it does well and where it falls short.",
"answer": "Simplify Copilot is a free browser extension that saves your resume details once and autofills job applications on many common job sites, then tracks the jobs you've applied to. It's popular with students and early-career job seekers who apply in volume.",
"body": """
<h2>What does Simplify do well?</h2>
<p>Speed on standard forms. Contact details, work history and education fill in with a click on supported sites, and every application lands in a tracker automatically.</p>
<h2>Where does it fall short?</h2>
<p>It's a browser extension, so it only works in supported browsers, and custom or unusual application forms can still need a lot of manual fixing. It fills from a saved profile rather than tailoring your resume to each posting.</p>
<h2>What are the alternatives?</h2>
<p>Teal and Jobscan focus on matching your resume to the posting, Huntr on tracking, and <a href="{US}">Utterseen</a> makes a resume tailored to each job and fills the application by voice in any browser. See our <a href="/simplify-vs-teal-vs-huntr-vs-utterseen/">full comparison</a>.</p>
<h2>Should you use it?</h2>
<p>If you apply mostly in Chrome on standard job sites, it's an easy free win. Check every field before you submit.</p>
""",
"faq": [
("Is Simplify Copilot free?", "Yes, the core extension is free, with optional paid upgrades."),
("Does Simplify work on every job site?", "It supports many common job sites, but custom application forms may need manual fixes."),
("What is a good Simplify alternative?", "Utterseen works in any browser and makes a resume tailored to each job before filling the application. Teal and Huntr cover resumes and tracking."),
],
},
{
"slug": "tool-spotlight-google-interview-warmup",
"title": "Tool spotlight: Google Interview Warmup lets you practice interview answers for free",
"desc": "Google's free Interview Warmup asks real interview questions, transcribes your spoken answers, and highlights the job terms you used. How to get the most out of it.",
"answer": "Google Interview Warmup is a free tool from Google that asks common interview questions for your field, transcribes your answer as you speak, and points out the job-related terms and talking points you used. It's a low-pressure way to practice before a real interview, with no account or cost.",
"body": """
<h2>How does it work?</h2>
<p>Pick a field, answer a set of questions out loud or by typing, and it shows your answer as text with insights: which job terms you used, which talking points came up, and the words you repeat most.</p>
<h2>Why practice out loud?</h2>
<p>Answers that sound fine in your head often ramble when spoken. Saying them out loud a few times makes them shorter and more confident, which is what interviewers notice.</p>
<h2>How do you get the most from it?</h2>
<p>Answer each question twice: once naturally, then again after reading your transcript and cutting filler. Prepare two or three real stories with results you can reuse across questions.</p>
<h2>What comes before the interview?</h2>
<p>Getting it. Our <a href="/top-10-ai-tools-for-job-seekers/">top 10 AI tools for job seekers</a> covers resumes, applications and tracking.</p>
""",
"faq": [
("Is Google Interview Warmup free?", "Yes. It's a free tool from Google with no account needed."),
("Does Interview Warmup grade my answers?", "It doesn't give a score. It shows your transcript and highlights job terms, talking points and repeated words so you can improve."),
("What fields does it cover?", "It includes question sets for several career fields plus general interview questions."),
],
},
{
"slug": "tool-of-the-week-utterseen",
"title": "Tool spotlight: Utterseen, the AI that sees your screen",
"desc": "Utterseen is a voice AI for Mac and Windows that answers questions about anything on your screen, makes study guides and flashcards, and applies to jobs with a tailored resume.",
"answer": "Utterseen is a voice AI assistant for Mac and Windows that sees your screen. Hold a key, ask out loud, and it answers about whatever you're looking at or does the task: study guides, flashcards, lecture summaries, email replies, and job applications with a resume tailored to each job.",
"body": """
<h2>What makes it stand out?</h2>
<p>No copying and pasting. It looks at your screen when you ask, so "what does this mean?" or "fill this out" works in any app.</p>
<h2>What can you do with it?</h2>
<ul>
<li><b>Study:</b> study guide PDFs and Anki flashcards from your slides, homework explained step by step, quizzes out loud.</li>
<li><b>Watch and read faster:</b> lecture and YouTube summaries, pages read out loud and explained in plain words.</li>
<li><b>Apply to jobs:</b> "apply to this job" makes a resume tailored to that job, fills the application, asks you the written questions, and stops before Submit.</li>
<li><b>Everyday tasks:</b> write and paste email replies, fill out forms.</li>
</ul>
<h2>What does it cost?</h2>
<p><a href="{US}">Utterseen</a> is free to start, with a Pro plan for daily use, on Mac and Windows.</p>
<h2>How does it compare?</h2>
<p>See <a href="/news/ai-assistants-that-see-your-screen/">AI assistants that can see your screen</a> for how it stacks up against ChatGPT, Copilot and Meta AI.</p>
""",
"faq": [
("What is Utterseen?", "A voice AI for Mac and Windows that sees your screen and answers out loud or does tasks like study guides and job applications."),
("Is Utterseen free?", "Yes, it's free to start, with a Pro plan for daily use."),
],
},
]
