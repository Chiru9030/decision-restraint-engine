# Decision Restraint Engine

A proactive AI system designed not just to answer, but to pause, analyze risk, and potentially **refuse** action when necessary. It serves as a "Devil's Advocate" or "Safety Governor" for critical decision-making.

---

## 🚀 Novelty

In a world of "Yes-man" AI assistants that prioritize compliance and speed, the **Decision Restraint Engine** prioritizes **safety, reversibility, and regret minimization**.

- **Not a Recommender:** It does not simply suggest the "best" path.
- **Visibility of Uncertainty:** It explicitly exposes missing data and fragile assumptions.
- **Future Regret Simulation:** It anticipates how a decision might be regretted 6 months or 5 years from now.
- **Restraint as a Feature:** Its primary "action" is often to advise *against* acting until confidence thresholds are met.

## 🛠 Tech Stack

- **Language:** TypeScript
- **Framework:** Next.js 16 (App Router)
- **AI Core:** Google Gemini 2.5 Flash
- **Styling:** Tailwind CSS + Lucide React
- **Architecture:** Serverless Edge Functions

## 🏗 Architecture

The system follows a strict, unidirectional data flow designed for auditability:

1.  **Input Layer:** User submits a decision query via the Next.js frontend.
2.  **Orchestration Layer:** `api/decide/route.ts` captures the intent and constructs a structured prompt.
3.  **Cognitive Layer (Gemini 2.5):** The AI executes a 4-step chain-of-thought process:
    - *Step 1: Confidence & Sensitivity Analysis*
    - *Step 2: Future Regret Simulation*
    - *Step 3: Response Mode Selection (ANSWER / WARN / REFUSE)*
    - *Step 4: Explanation & Content Generation*
4.  **Presentation Layer:** The frontend parses the JSON response and renders the decision distinctively based on the outcome (Green/Answer, Amber/Warn, Red/Refuse).

## ⚡ Methodology: The Core Logic

The engine does not blindly process input. It enforces a strict logical sequence:

1.  **Confidence Check:**
    - Identifies all assumptions.
    - Performs a "Sensitivity Test" (e.g., "If assumption X is wrong, does the whole plan fail?").
    - If Confidence is LOW, it flags the decision as **FRAGILE**.

2.  **Regret Simulation:**
    - Simulates Best, Expected, and Worst-case scenarios.
    - Evaluates **Reversibility**: Can this decision be undone?
    - Irreversible decisions automatically escalate the risk level.

3.  **Restraint Logic:**
    - **ANSWER:** Only if Confidence is HIGH and Regret Risk is LOW.
    - **WARN:** If there are moderate risks or missing data.
    - **REFUSE:** If the decision is fragile, high-risk, or irreversibly dangerous.

## 🏁 Getting Started

Clone the repository and install dependencies:

```bash
npm install
```

Set up your environment variables:

```bash
# .env.local
GEMINI_API_KEY=your_api_key_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to verify the engine.
