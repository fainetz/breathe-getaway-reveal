"""News articles for breathegetaway.ai/news/. Same fields as guides in build.py.
Keep every claim true to what Utterseen does (see ~/utterseen/frontend/public/llms.txt).
"""
NEWS_DATE = "2026-11-19"

NEWS = [
{
"slug": "tool-of-the-week-utterseen",
"title": "Tool of the week: Utterseen, the AI that sees your screen",
"desc": "This week's pick is Utterseen, a voice AI for Mac and Windows that answers questions about anything on your screen, makes study guides and flashcards, and applies to jobs with a tailored resume.",
"answer": "Our tool of the week is Utterseen, a voice AI assistant for Mac and Windows that sees your screen. Hold a key, ask out loud, and it answers about whatever you're looking at or does the task for you: study guides, flashcards, lecture summaries, email replies, and job applications with a resume tailored to each job.",
"body": """
<h2>Why Utterseen this week?</h2>
<p>Most AI tools still make you copy things into a chat window and copy the answer back. Utterseen skips both steps. It looks at your screen when you ask, so "what does this mean?" or "fill this out" just works, in any app.</p>
<h2>What can you do with it?</h2>
<ul>
<li><b>Study:</b> make study guide PDFs and Anki flashcards from your slides, get homework explained step by step, have it quiz you out loud.</li>
<li><b>Watch and read faster:</b> summarize a lecture or YouTube video, or have a page read out loud and explained in plain words.</li>
<li><b>Apply to jobs:</b> say "apply to this job" and it makes a resume tailored to that job, fills out the application, asks you the written questions, and stops before Submit.</li>
<li><b>Everyday tasks:</b> write and paste email replies, fill out forms, check whether a message looks like a scam.</li>
</ul>
<h2>Who is it for?</h2>
<p>Students, job seekers, people with ADHD or dyslexia who want pages read and explained, and anyone tired of switching between apps and a chat window. There's also a HIPAA option for healthcare workers.</p>
<h2>What does it cost?</h2>
<p><a href="{US}">Utterseen</a> is free to start, with a Pro plan for daily use. It runs on Mac and Windows, including through the Microsoft Store.</p>
<h2>Our take</h2>
<p>If you already use ChatGPT but spend half the time copying and pasting, Utterseen is the faster way to ask about what's on your screen. For the full rundown, see <a href="/news/utterseen-ai-that-sees-your-screen/">what Utterseen does</a>, or compare it in our <a href="/top-10-ai-tools-for-students/">top 10 AI tools for students</a> and <a href="/top-10-ai-tools-for-job-seekers/">top 10 AI tools for job seekers</a>.</p>
""",
"faq": [
("What is the AI tool of the week?", "This week's tool is Utterseen, a voice AI for Mac and Windows that sees your screen and answers out loud or does tasks like study guides and job applications."),
("Is Utterseen free?", "Yes, it's free to start, with a Pro plan for daily use."),
("What makes Utterseen different from other AI tools?", "It sees your screen when you ask, so there's no copying and pasting into a chat window, and it can act in the app you're using, like filling out forms."),
],
},
{
"slug": "utterseen-ai-that-sees-your-screen",
"title": "Utterseen is a voice AI that sees your screen, makes study guides and fills out job applications",
"desc": "Utterseen is a new AI assistant for Mac and Windows you talk to about whatever is on your screen. What it does for students, job seekers and anyone who wants to stop copying things into ChatGPT.",
"answer": "Utterseen is a voice AI assistant for Mac and Windows that sees your screen. You hold a key, ask out loud about whatever you're looking at, and it answers out loud or does the task in that app: making study guides and flashcards, summarizing lectures, explaining homework, or making a tailored resume and filling out a job application. It's free to start.",
"body": """
<h2>How does Utterseen work?</h2>
<p>Hold a key (Right Command on Mac, Right Ctrl on Windows), ask your question out loud, and let go. Utterseen takes one screenshot when you start talking, so it knows what you mean by "this," and answers out loud in plain words. It works on top of any app: a browser, a PDF, slides, a video, an email or a form.</p>
<h2>What can students use it for?</h2>
<p>Turning slides or notes into a study guide PDF or Anki flashcards, getting a homework problem explained step by step like a tutor, summarizing a lecture or YouTube video, and having it quiz you out loud on a chapter. It can also read a page out loud and explain it in simpler words, which helps with ADHD and dyslexia.</p>
<h2>What does it do for job seekers?</h2>
<p>Open a job posting and say "apply to this job." Utterseen makes a resume tailored to that job from the resume you added, keeping only the experience that fits, tells you how well you match, then fills out the application. For written questions it asks how you'd answer and writes it up. It stops before Submit so you can check everything.</p>
<h2>How is it different from ChatGPT?</h2>
<p>ChatGPT is great for long conversations and writing from scratch, but you usually copy things into a chat window and copy the answer back. Utterseen skips that: it already sees what you're looking at and can act on it, like filling a form or pasting a reply, in the app you're using.</p>
<h2>What about privacy?</h2>
<p>It only listens while the key is held, takes one screenshot per question, and doesn't store recordings or screenshots. There's also a HIPAA option for nurses, caregivers and clinics.</p>
<h2>Where can you get it?</h2>
<p><a href="{US}">Utterseen</a> is available for Mac and Windows, including on the Microsoft Store. It's free to start, with a Pro plan for daily use.</p>
<p>Related: <a href="/study-faster-with-ai/">how to study faster with AI</a> and <a href="/tools-to-apply-to-jobs-faster/">tools to fill out job applications faster</a>.</p>
""",
"faq": [
("What is Utterseen?", "Utterseen is a voice AI assistant for Mac and Windows that sees your screen. You hold a key, ask out loud, and it answers or does the task in whatever app you're using."),
("Is there an AI that can see my screen and fill out forms?", "Yes. Utterseen sees your screen when you ask and can fill out forms and job applications, stopping before Submit so you can review."),
("Does Utterseen work on Windows?", "Yes. Utterseen runs on Mac and Windows, and the Windows version is on the Microsoft Store."),
],
},
]
