# Sentence Construction Tool

An interactive web application for practicing sentence construction through fill-in-the-blank exercises.

## Features

- Interactive sentence completion exercises
- 30-second timer for each question
- Word selection and placement system
- Score tracking and feedback
- Responsive design

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the JSON server:
   ```bash
   npm run server
   ```
4. In a new terminal, start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Deploy the project:
   ```bash
   vercel
   ```
4. Follow the prompts to complete the deployment

## Technologies Used

- React
- Vite
- Tailwind CSS
- Radix UI Components
- JSON Server

## Project Structure

- `src/components/` - React components
- `src/App.jsx` - Main application component
- `src/index.css` - Global styles and Tailwind configuration
- `db.json` - Question data
- `vercel.json` - Vercel deployment configuration

## How to Play

1. Each question presents a sentence with blank spaces
2. Select words from the options to fill in the blanks
3. Complete the sentence within 30 seconds
4. Submit your answer to move to the next question
5. View your final score and feedback at the end

## Contributing

Feel free to submit issues and enhancement requests!
