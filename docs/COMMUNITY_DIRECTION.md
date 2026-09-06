# What kind of community are we building?

A working document for Hackers in the Loop · September 5, 2026

**My recommendation: build a focused open-source workshop for the systems beneath AI agents.** Use shared technical problems to bring people together, and make the knowledge from that work useful to the next person.

Keep **“Keep intelligence hackable.”** It is the strongest sentence in the identity. Follow it with a concrete explanation of what people do here. The community becomes credible when someone can arrive with a question, contribute something small, and find a reason to return.

This document offers choices and experiments. The proposed roles, schedules, targets, and shorter manifesto below are discussion material, not commitments the community has already made.

## Start with these five answers

Spend 20 minutes on these before editing another paragraph of the manifesto.

1. **Who are the first people you want to build with?** Describe three actual people or types of contributor, what they are working on, and what they cannot get elsewhere.
2. **What will they do together in the first month?** Name one shared problem and one artifact another person could use.
3. **What does “in the loop” let a person do?** Finish: “A person should always be able to understand [what], decide [what], and stop or change [what].”
4. **What are you willing to maintain?** Name the projects, documentation, and conversations you can sustain with the time you actually have.
5. **What should exist in six months because this community exists?** Describe something more concrete than a busy chat room.

**Your one-sentence answer:**

> Hackers in the Loop helps [people] work together on [shared problem] so that [outcome].

Suggested starting point:

> Hackers in the Loop brings people together to build and understand open agent infrastructure, so they can inspect how it works and stay in control of what it does.

## What the current material is already saying

The [brand strategy](../brand/strategy.md) gives the community a clear home: the machinery beneath agentic software. The [manifesto](../MANIFESTO.md) connects openness to human agency, composability, technical rigor, and mutual help. The workshop stamp and paper/carbon/signal palette support that position.

The website previously gave more space to declarations than to participation. Project cards ended in “coming soon,” and the invitation depended on a Discord link that was not configured. It also presented some project availability and upstream contribution claims without links to the work.

The revised site keeps the technical ambition while offering smaller entry points: a question behind each project, an experiment someone can try, a public repository to contribute to, and an honest description of the planned conversation space.

The [website repository](https://github.com/Hackers-in-the-Loop/website) is publicly accessible. The [organization page](https://github.com/Hackers-in-the-Loop) was checked on September 5, 2026; public locations for the other named project briefs were not confirmed in this review. That is a publishing gap to resolve, not evidence that the projects do not exist.

**The strategic question is where the first shared work will happen.** Design can make an invitation clearer; an available maintainer and a useful problem make it real.

## Choose the center of gravity

All three directions could fit the name. They create different obligations.

| Direction                       | People come for                                       | You must sustain                                                    | Main tradeoff                                                        |
| ------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Open workshop — recommended** | Collaborators, technical feedback, shared experiments | A few active problems, thoughtful replies, public artifacts         | Requires people to tend the work; a chat server alone will not do it |
| Project incubator               | A home for projects, maintenance help, releases       | Ownership decisions, project selection, review and release capacity | Can become a portfolio of the founder’s projects                     |
| Learning network                | Explanations, reading groups, help entering the field | Teaching, facilitation, accessible examples                         | Can drift toward discussion without maintained infrastructure        |

For the first 90 days, lead with the workshop. Let incubation and teaching emerge from work people actually return to. Revisit the decision when there is evidence that another center would serve contributors better.

**Choose:** [your answer]

**What will we deliberately postpone?** [your answer]

**What evidence would make us change direction?** [your answer]

### A narrow invitation with room to explore

Make the primary audience people building or investigating agent runtimes, execution boundaries, portable components, tool access, and observability. Welcome people learning these topics, including those who contribute through writing, testing, diagrams, or careful questions.

Keep kernels and hardware in the picture when the connection to agent systems is explicit. A useful rule is: **follow a problem across layers, and document why that layer matters.**

For an initial shared thread, I would explore **visible execution and scoped authority**. The Threaded and Credential Gateway briefs already connect there. This is a proposed focus, dependent on a maintainer being able to publish a runnable example; it is not a claim that either project is ready for outside contributors.

A possible first artifact: one small agent task with an inspectable trace, bounded mock credentials, an interruption point, and documented recovery behavior. If that is too much to maintain, start with an annotated trace and a design note.

## Make the manifesto earn its place

A manifesto should help someone predict your choices. For every principle, ask:

- What would we do differently because we believe this?
- What cost are we willing to accept?
- What example would show a newcomer that we mean it?
- What would contradict the principle in our own work?

The public manifesto now includes an “In practice” statement for each principle. Preserve that relationship between belief and observable behavior.

### Four tensions to resolve explicitly

**Human control and autonomy.** “In the loop” could sound like approval for every action. A stronger position is that people choose the scope of delegation, can inspect consequential actions, can revoke authority, and have a way to intervene or recover. Decide what must be visible before, during, and after execution. Some effects cannot be undone; the system should make those boundaries clear before acting.

**Open infrastructure and closed models.** Decide whether using a proprietary model is compatible with membership and project participation. My recommendation is yes: make the surrounding interfaces, authority boundaries, and replaceable components the focus. Describe provider dependencies honestly. Do not imply that an open wrapper makes a model or a whole system open.

**Technical depth and belonging.** “Serious questions” and “bring something worth building” can make people feel they must prove themselves before participating. Ask for context and care. Welcome an honest beginner’s question. Value review, explanation, maintenance, and reproductions alongside original code.

**Every layer and limited attention.** Curiosity can be broad while active commitments stay small. Keep an open bench for ideas, and name only a few maintained efforts. A research note should not look like a supported product.

### A shorter manifesto to react to

This is an alternative draft for discussion. The website retains the existing eight principles.

> Keep intelligence hackable.
>
> We build the systems between human intent and machine action. People should be able to inspect those systems, change them, and decide how much authority to give them.
>
> Show the mechanism. Publish useful code, explicit interfaces, and explanations that let someone else follow the work. Be clear about dependencies and limits.
>
> Keep people in control. Make consequential actions visible. Give people meaningful ways to set boundaries, intervene, and recover.
>
> Make the pieces replaceable. Build components that can be understood and used beyond a single provider or stack.
>
> Share what holds up. Pair claims with examples and measurements. Document failed experiments when they teach something useful.
>
> Help is part of the work. Questions, reviews, explanations, and maintenance build the commons alongside code. Make room for people learning a new layer.
>
> Bring something you want to understand. Leave something another person can use.

Read it aloud. Mark the sentence that sounds most like you, the one you would remove, and the one you would defend when it becomes inconvenient.

## Decide what membership and stewardship mean

Do not make “community” a substitute for clear ownership.

| Decision                                    | Suggested starting position                                                                  | Your answer   |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------- |
| What makes someone a participant?           | They engage with the work and treat others with care; no technical audition                  | [your answer] |
| Who decides a project’s direction?          | Named project maintainers, with consequential decisions recorded publicly                    | [your answer] |
| What earns the HITL endorsement?            | A clear relationship, public work, an identified steward, and an honest maintenance state    | [your answer] |
| Are founder-owned projects community-owned? | Describe the actual ownership of each project; participation does not imply shared ownership | [your answer] |
| Where do durable decisions live?            | In repositories or public notes; chat links are supporting context                           | [your answer] |
| Who handles conflict or harassment?         | Name a responsible steward and a private contact route before opening a busy public space    | [your answer] |
| Can companies participate?                  | Yes, with clear affiliations and contributions; sponsorship should have disclosed terms      | [your answer] |
| How are shared costs handled?               | State who pays, who controls accounts, and how any funding would be reported                 | [your answer] |

For now, a small, visible stewardship arrangement is easier to understand than an elaborate governance system. Name the person who can make each decision and explain how contributors can challenge or revisit it.

Before promoting open membership, write down the participation expectations, who handles reports, and how a steward can be reached. Treat this as practical care for the people who join.

## Design the first month around a return visit

A useful early community experience looks like this:

1. **First 15 minutes:** understand the purpose, find a live repository, and identify a manageable question or task.
2. **First contribution:** leave an example, issue, explanation, or small change in the right place.
3. **First response:** a maintainer acknowledges the work and gives a useful next step.
4. **First return:** the contributor sees what changed, helps someone else, or has a reason to continue their own thread.

Aim to acknowledge early contributions within two working days if someone can own that responsibility. Keep it an internal operating target until you know it is sustainable.

Start Discord with very few spaces: introductions, build logs, and help/review. Add specialized channels when existing conversations need them. Keep instructions, decisions, and reproducible artifacts in public repositories or notes.

A practical first invitation:

> We are working on [specific problem]. Here is a small example and the part we do not understand yet. If this interests you, try it, question it, or help us explain it. Here is where to leave what you find.

For the website repository, ask for website work. Do not send unrelated runtime questions into its issue tracker. Publish a suitable project or discussion location before inviting technical submissions at scale.

### A project should have a door

Before labeling a project ready for contributors, fill this in:

- **Problem:** what can someone do or understand better?
- **Source and license:** where is the code, and what are its stated terms?
- **State:** idea, experiment, usable, maintained, or archived; say what works.
- **Steward:** who reviews contributions and answers questions?
- **Smallest example:** a command or walkthrough someone can reproduce.
- **First contribution:** a bounded task, including what completion looks like.
- **Known limits:** what should someone avoid relying on?
- **Relationship to HITL:** owned, stewarded, contributed to, or simply used.

Do not call upstream tools “our stack” in a way that suggests ownership. Link to an upstream contribution when describing one.

## Run a 90-day experiment

These are proposed targets, not reported community activity.

| Period     | Focus                                         | Concrete output                                                                                                        | Accountable role                      |
| ---------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Days 1–14  | Make the invitation real                      | Choose one shared problem; publish its smallest example, steward, first task, and participation route                  | Founder plus project maintainer       |
| Days 15–45 | Build a habit of useful exchange              | Invite a small founding group; hold a fortnightly work/review session if someone can host it; publish notes after each | Community host plus participants      |
| Days 46–90 | Test whether work survives beyond the founder | Help a contributor lead a small task; improve onboarding from their experience; publish a retrospective                | Project maintainer plus a contributor |

A starting size of 8–12 interested people is a practical experiment, not a growth promise. If there is time for only one recurring activity, choose a small review session that produces a public note.

Choose a sustainable time budget first:

> We can commit [number] hours each week to hosting and replies, and [number] hours to maintaining shared work. The people responsible are [names].

### Measure what the community makes possible

At day 90, look for evidence such as:

- Three public examples or notes that another person has reproduced or used.
- Three contributors outside the founder’s existing project ownership making useful contributions.
- At least one technical discussion that becomes a merged improvement or documented decision.
- At least two people returning to help someone after their first contribution.
- A shared activity that can happen without the founder doing every part.

Use these as hypotheses to adjust. Keep a simple record of artifacts, contributors, return visits, and maintainer effort. Member counts and social impressions can provide context, but they do not establish whether the workshop is working.

If people read but do not contribute, make the first task smaller and the response path clearer. If everything relies on the founder, reduce active commitments and develop another steward. If one problem attracts sustained collaboration, give it more attention before expanding the scope.

## A decision record to keep using

Copy this whenever the community makes a consequential choice.

**Date / decision owner:** [your answer]

**Question:** [your answer]

**Decision:** [your answer]

**Why this choice:** [your answer]

**Alternatives and costs:** [your answer]

**Who is affected or disagrees:** [your answer]

**What we will publish or change:** [your answer]

**Evidence and date for revisiting:** [your answer]

For the next discussion, decide only three things: the first shared problem, the people responsible for tending it, and what a newcomer can do this week. Use what happens afterward to improve the manifesto.
