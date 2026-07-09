# PRD: Kopdes Intelligence

**Project:** Kopdes Intelligence (Smart Village Cooperative Module)  
**Vision:** Transform village cooperatives from mere administrative tools into data-driven, intelligent, and transparent economic engines for members[cite: 1, 4, 5].  
**Integration Strategy:** Seamless integration via **WebView** in the existing SIMKOPDES mobile app to reach millions of members, and a **Web-based Dashboard** for management decision-making[cite: 4, 5, 6].

---

## 1. Background & Problem
Village cooperatives often face classic operational challenges:
*   **Economic Paradox:** They control a real economic base but lose added value because business decisions rely only on assumptions/tradition[cite: 1, 4].
*   **Adoption Barriers:** Apps often fail to gain adoption because they are too complex for users with moderate digital literacy (the "Bu Sari" persona)[cite: 2, 4].
*   **Weak Transparency:** Difficulty for members to access financial reports and SHU (member profit share) erodes trust[cite: 4].
*   **Underutilized Data:** Existing data in SIMKOPDES has not been turned into strategic decisions[cite: 4, 5].

---

## 2. Target Users
*   **Cooperative Members:** Village residents using the Simkopdes Mobile app. They need ease of use, 24/7 access, and transparency[cite: 2, 4].
*   **Cooperative Management:** They need decision support tools to manage business units, financial reports, and inventory efficiently[cite: 2, 4].

---

## 3. Tech Stack & Integration
*   **Framework:** Next.js 14+ (App Router).
*   **Styling:** Tailwind CSS + Shadcn/ui.
*   **Database:** Supabase (as the real-time data source).
*   **AI Engine:** OpenAI API (for decision analysis & member education)[cite: 2].
*   **Integration:** WebView (as an embedded module) with a JavaScript Bridge for seamless authentication from the parent app[cite: 6].

---

## 4. Core Features (P0 - 48-Hour MVP)

### A. Member Module (WebView on Mobile)
*   **Seamless Auth:** Uses a JS Bridge to retrieve the token from the parent app; no re-login required[cite: 6].
*   **Quick Aspirations:** Mobile-first interface for residents to submit proposals or complaints[cite: 2, 6].
*   **Transparency Feed:** Timeline showing proposal status and management decisions transparently[cite: 4].

### B. Admin Dashboard (Web View)
*   **Economic Dashboard:** Real-time data visualization (Revenue, SHU, Cash) using simple charts[cite: 3, 4].
*   **AI Decision Engine:** Processes member aspirations and cooperative financial data using the OpenAI API to generate business recommendations (ROI Score, Risk Mitigation, Action Recommendations)[cite: 1, 2, 3].
*   **Workflow Action:** Interactive buttons for management to approve or reject AI recommendations that directly affect status in the member Transparency Feed[cite: 2].

---

## 5. AI Logic & Prompts
*   **Input Data:** `User Aspirations` + `Cooperative Cash Data` + `Transaction History`.
*   **Prompt Engineering:**
    > "You are a professional business consultant for village cooperatives. Analyze the provided aspiration and cooperative financial status. Provide a decision score (1-10), ROI projection, and a brief rationale in JSON format: `{ "score", "roi", "rationale", "decision" }`."[cite: 1, 3]

---

## 6. Success Metrics (Per Judging Criteria)
*   **Efficiency:** Reduce administrative time and decision-making processes[cite: 1, 6].
*   **Participation:** Increase the ratio of active members using the digital aspiration feature[cite: 4, 6].
*   **Transparency:** Improve member trust scores through the Transparency Feed[cite: 4, 6].
*   **Innovation:** Use AI to solve real cooperative problems, not just as a gimmick[cite: 2, 6].

---

## 7. Sprint Roadmap (48 Hours)
| Phase | Time | Activity Focus |
| :--- | :--- | :--- |
| **I** | 0-12h | Project setup, Supabase integration, and JavaScript Bridge for authentication integration[cite: 6]. |
| **II** | 12-24h | UI/UX coding (WebView for members & Dashboard for management)[cite: 6]. |
| **III** | 24-36h | OpenAI API prompt engineering and backend integration into the decision feature[cite: 2]. |
| **IV** | 36-48h | Demo finalization, bug fixing, `README.md` documentation, and pitch deck[cite: 6]. |

---

## 8. Notes for Cursor (Composer)
*   *Priority:* Focus on UI responsiveness for mid-range mobile devices in rural areas[cite: 2].
*   *Security:* Do not store user credentials locally; use tokens from the parent app (agnostic authentication)[cite: 5, 6].
*   *Simulation:* Use mock data for cooperative financial data if access to the real SIMKOPDES API is not yet available[cite: 5].
