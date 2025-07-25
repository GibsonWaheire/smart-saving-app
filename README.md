# Smart Goal Planner

A modern web app for managing and tracking your financial savings goals. Create, update, delete, and track progress for multiple goals, make deposits, and visualize your savings journey with a beautiful dashboard.

## Features

- **Multiple Savings Goals (CRUD):**
  - Add new financial goals (name, target amount, category, deadline).
  - Edit/update existing goals (all fields editable).
  - Delete goals you no longer need.
- **Progress Tracking:**
  - Visual progress bar and percentage for each goal.
  - Shows total saved, remaining amount, and completion status.
- **Make Deposits:**
  - Add deposits to any goal (cannot exceed target or deposit to completed goals).
  - Progress updates instantly across the app.
- **Dashboard Overview:**
  - See total number of goals, total money saved, completed goals, and average progress.
  - Recent activity grid with progress circles for each goal.
- **Deadlines & Warnings:**
  - See how much time is left for each goal.
  - If a deadline is within 30 days and the goal is not complete, a warning is shown.
  - If the deadline has passed and the goal is not complete, it is marked as Overdue.
- **Responsive & Modern UI:**
  - Consistent color palette and design.
  - Floating alerts for success and error messages.
  - Mobile-friendly layout.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Supabase](https://supabase.com) account (free)
- [Netlify](https://netlify.com) account (free)

### Installation

#### Option 1: Deploy to Netlify (Recommended)
1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)
2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your repository and deploy
3. **Set up Supabase:**
   - Follow the instructions in [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
   - Install the Supabase extension in Netlify
   - Create your database schema

#### Option 2: Local Development
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd smart_goal_planner
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file with your Supabase credentials
   - See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for details
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. Open your browser and go to [http://localhost:5173](http://localhost:5173)

## Usage
- **Add Goal:** Go to the Add Goal tab, fill in the details, and submit.
- **Edit/Delete Goal:** Use the All Goals tab (or add edit buttons as needed) to update or remove goals.
- **Make Deposit:** Go to Make Deposit, select a goal, enter an amount, and submit. Alerts will guide you if the deposit is invalid.
- **Dashboard:** See your overall progress, recent activity, and warnings for deadlines.

## Technologies Used
- **React** (Vite)
- **Supabase** (database and backend)
- **Netlify** (hosting and deployment)
- **CSS** (custom, responsive, modern)

## Folder Structure
- `src/components/` — All React components (Dashboard, GoalForm, DepositForm, GoalList, etc.)
- `src/lib/` — Supabase client configuration
- `src/services/` — Database service layer
- `supabase-schema.sql` — Database schema for Supabase
- `SUPABASE_SETUP.md` — Detailed setup instructions
- `public/` — Static assets

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)