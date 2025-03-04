AI-Powered Job Match Dashboard

🚀 Description

The AI-Powered Job Match Dashboard is a web application that fetches tech job listings from an online API and matches them with a user's skills. The app calculates a match score based on required skills and highlights job opportunities accordingly. Built with Next.js, React, Tailwind CSS, and Zustand, this project demonstrates API integration, UI/UX best practices, and frontend development skills.

✨ Features

Fetches live job listings from an external tech jobs API

Matches job requirements with user skills and calculates match scores

Displays job details, including company, salary, and required skills

Highlights job match scores using color-coded indicators

Provides skill gap suggestions to improve job eligibility

Allows users to apply for jobs directly from the dashboard

🛠️ Installation Steps

Clone the repository

git clone https://github.com/best2025j/job-match.git
cd job-match

Install dependencies

npm install

Run the development server

npm run dev

Open http://localhost:3000 in your browser.

🚀 How to Deploy on Vercel

Install Vercel CLI (if not already installed)

npm install -g vercel

Login to Vercel

vercel login

Deploy the project

vercel

Follow the prompts to complete the deployment.

Get the Live URL
Vercel will provide a live link where the project is hosted.

🌐 API Integration Details

The project integrates with an external tech jobs API to fetch real-time job listings. The API is called in the Zustand store, and data is processed to calculate match scores based on user skills.

Method: GET

Response Format: JSON containing job title, company, location, salary, and required skills.

🌍 Live Demo

View the Live Project on Vercel

📌 Contributing

Feel free to fork this repository and submit pull requests for improvements!

📧 Contact

For any questions, reach out via [your email] or connect on [your social links].

