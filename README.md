# Schedule Tracker

A personal schedule and goal tracking app. Lets users plan daily/weekly tasks, track goals (e.g., fitness), and get email/SMS reminders.

## Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL with Sequelize
- **Cache & Queues:** Redis with BullMQ
- **Notifications:** AWS SES (email), Twilio or AWS SNS (SMS)
- **Hosting:** AWS (S3 + CloudFront, App Runner, RDS, ElastiCache)
- **CI/CD:** GitHub Actions

## Project Structure
schedule-tracker/
├── frontend/          # React app
├── backend/           # Express API
├── docker-compose.yml # Local Postgres + Redis
└── .github/workflows/ # CI/CD pipelines

## Status

🚧 Under active development.

## Local Development

### Prerequisites
- Docker Desktop running
- Node.js v20+

### First-time setup
1. Copy `.env.example` to `.env` and fill in values
2. Run `docker compose up -d` to start Postgres and Redis

### Daily workflow
- `docker compose up -d` to start services
- `docker compose down` to stop services
- `docker compose logs -f` to view logs