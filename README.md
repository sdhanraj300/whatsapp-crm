# WhatsApp CRM

A modern, full-stack CRM solution with WhatsApp integration, built with Next.js and MongoDB. This application provides businesses with tools to manage customer relationships, track interactions, and streamline communication through WhatsApp.

## ✨ Features

- **User Authentication**
  - Secure signup and login with NextAuth.js
  - Email/password and OAuth providers
  - Protected routes and API endpoints

- **Dashboard**
  - Overview of key metrics and statistics
  - Recent activities and notifications
  - Quick access to important functions

- **Customer Management**
  - Create and manage customer profiles
  - Track interactions and history
  - Categorize and tag customers

- **WhatsApp Integration**
  - Send and receive messages directly
  - Template message support
  - Message history and tracking

- **UI/UX**
  - Responsive design with mobile support
  - Dark/Light mode
  - Modern, accessible components with Radix UI
  - Smooth animations and transitions

## 🛠 Tech Stack

- **Frontend**
  - Next.js 14 with App Router
  - TypeScript
  - Tailwind CSS for styling
  - Radix UI for accessible components
  - React Hook Form for form handling

- **Backend**
  - Next.js API Routes
  - Prisma as ORM
  - MongoDB for database
  - NextAuth.js for authentication

- **Development Tools**
  - ESLint and Prettier for code quality
  - TypeScript for type safety
  - Environment variables for configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB Atlas account or local MongoDB instance
- WhatsApp Business API credentials (for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/whatsapp-crm.git
   cd whatsapp-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update the variables with your configuration:
     ```env
     DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/whatsapp-crm?retryWrites=true&w=majority"
     NEXTAUTH_SECRET="your-secret-key"
     NEXTAUTH_URL="http://localhost:3000"
     NODE_ENV="development"
     ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗 Project Structure

```
src/
├── app/                    # App router pages and API routes
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard pages
│   ├── login/              # Authentication pages
│   └── register/           # User registration
├── components/             # Reusable UI components
│   ├── dashboard/          # Dashboard specific components
│   └── ui/                 # UI components using Radix UI
├── lib/                    # Utility functions and configs
└── styles/                 # Global styles and themes
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```env
# MongoDB connection string
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/whatsapp-crm?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# For development
NODE_ENV="development"
```

### 4. Set up the database

Run the Prisma migration to set up the database schema:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Creating a Test User

1. Open the application in your browser
2. Click on "Register"
3. Fill in the registration form with your details
4. You'll be automatically logged in after registration

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | MongoDB connection string | Yes | - |
| `NEXTAUTH_SECRET` | Secret used for NextAuth.js | Yes | - |
| `NEXTAUTH_URL` | Base URL of your application | Yes | http://localhost:3000 |
| `NODE_ENV` | Application environment | No | development |

## Project Structure

```
whatsapp-crm/
├── app/                    # App router directory
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard pages (protected)
│   ├── login/             # Login page
│   ├── register/           # Registration page
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
├── lib/                    # Utility functions
├── prisma/                 # Prisma schema
├── public/                 # Static files
└── styles/                 # Global styles
```

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `prisma:generate` - Generate Prisma client
- `prisma:push` - Push schema to database

## Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import the repository into Vercel
3. Add your environment variables
4. Deploy!

### Docker

You can also deploy using Docker:

1. Build the Docker image:
   ```bash
   docker build -t whatsapp-crm .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 whatsapp-crm
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.
