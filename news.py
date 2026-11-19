"""News articles for breathegetaway.ai/news/. Same fields as guides in build.py.
Keep every claim true to what Utterseen does (see ~/utterseen/frontend/public/llms.txt).
"""
NEWS_DATE = "2026-11-19"

NEWS = [
{
"slug": "times-square-birthday-billboard-utterseen",
"title": "A 20-year-old founder put a birthday wish on a Times Square billboard to launch an AI app",
"desc": "The Utterseen billboard in Times Square has no logo, no features and no slogan, just a founder asking strangers to try an AI app for a birthday. What it says and what Utterseen is.",
"answer": "The Times Square billboard that reads \"hey i'm fay im 20, i turn 21 soon, for my birthday please try utterseen.com\" is a launch ad for Utterseen, a voice AI assistant for Mac and Windows that can see your screen. Its 20-year-old founder skipped the usual logo, features and slogan and asked for one birthday present instead.",
"body": """
<h2>What does the Times Square billboard say?</h2>
<p>Four lines of plain lowercase text on white panels: "hey i'm fay im 20 / i turn 21 soon / for my birthday please try / utterseen.com." No product shot, no logo, no feature list. In a square full of motion and celebrity ads, it reads more like a text message than a commercial, which is exactly why people notice it.</p>
<h2>Why a birthday instead of a normal ad?</h2>
<p>Asking strangers to download an app is awkward. Asking for one thing on your birthday is something everyone has done. The ad turns a product launch into a personal request, and it asks people to <em>try</em>, not buy, which fits: Utterseen has a free plan.</p>
<h2>Why are people arguing about it?</h2>
<p>Anti-ads split people. Critics say it's begging and tells you nothing about the product. Fans say it's honest, impossible to mistake for anything else, and does the one job a billboard can do: make you curious enough to type a web address. The debate has spilled onto Reddit, which is its own kind of reach.</p>
<h2>So what is Utterseen?</h2>
<p><a href="{US}">Utterseen</a> is a voice AI assistant for Mac and Windows that sees your screen. You hold one key, ask out loud, and hear the answer in whatever app you're using, with no chat window and no copying and pasting. Students use it to make study guides and flashcards from their slides and to get homework explained step by step. Job seekers say "apply to this job," and it makes a resume tailored to that job, fills out the application, and stops before Submit.</p>
<h2>Does the stunt work?</h2>
<p>A billboard can get someone to type a URL once. Whether they stay depends on the app. The bet behind this one is simple: an AI that answers about whatever is on your screen is easier to show than to describe, so the ad doesn't try to describe it at all.</p>
<p>More: <a href="/news/utterseen-ai-that-sees-your-screen/">what Utterseen does</a> and <a href="/tools-to-get-work-done-faster/">tools to get work done faster</a>.</p>
""",
"faq": [
("Who is behind the \"for my birthday please try\" billboard?", "It's from Fay, the 20-year-old founder of Utterseen, a voice AI assistant for Mac and Windows that sees your screen."),
("What is utterseen.com?", "Utterseen is a voice AI assistant for Mac and Windows. You hold a key and ask about anything on your screen, and it answers out loud or does the task, like making a study guide or filling out a job application."),
("Is Utterseen free?", "Utterseen is free to start, with a Pro plan for heavier use."),
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
<p>Related: <a href="/news/times-square-birthday-billboard-utterseen/">the Times Square birthday billboard</a>, <a href="/study-faster-with-ai/">how to study faster with AI</a> and <a href="/tools-to-apply-to-jobs-faster/">tools to fill out job applications faster</a>.</p>
""",
"faq": [
("What is Utterseen?", "Utterseen is a voice AI assistant for Mac and Windows that sees your screen. You hold a key, ask out loud, and it answers or does the task in whatever app you're using."),
("Is there an AI that can see my screen and fill out forms?", "Yes. Utterseen sees your screen when you ask and can fill out forms and job applications, stopping before Submit so you can review."),
("Does Utterseen work on Windows?", "Yes. Utterseen runs on Mac and Windows, and the Windows version is on the Microsoft Store."),
],
},
]
