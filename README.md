# Product Hunt Clone

A simplified clone of Product Hunt with core features including project submissions, upvoting, and commenting functionality. This project is built with Next.js, React, and Tailwind CSS.

![Product Hunt Clone Screenshot](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-21%20at%208.31.37%E2%80%AFAM-9RpMaEwGu96O11gY2BcpcEUgb7S5jB.png)

## Features

- Browse products with upvote counts and comments
- Submit new products with name, description, and URL
- Upvote products
- Comment on products
- View product details
- Monthly organization of products

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or later)
- npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to get the application running on your local machine:

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/yourusername/product-hunt-clone.git
cd product-hunt-clone
\`\`\`

### 2. Install dependencies

Using npm:

\`\`\`bash
npm install
\`\`\`

Or using Yarn:

\`\`\`bash
yarn install
\`\`\`

### 3. Run the development server

Using npm:

\`\`\`bash
npm run dev
\`\`\`

Or using Yarn:

\`\`\`bash
yarn dev
\`\`\`

### 4. Open the application

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

\`\`\`
product-hunt-clone/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── products/         # Product detail pages
├── components/           # React components
│   ├── product-card.tsx  # Product card component
│   ├── comment-section.tsx # Comments component
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utility functions and data
│   └── comments.ts       # Comments data and functions
├── public/               # Static assets
└── README.md             # Project documentation
\`\`\`

## How It Works

### Core Functionality

1. **Product Listing**: The home page displays a list of products with their upvote counts and comment numbers.

2. **Product Submission**: Users can submit new products by clicking the "Submit Product" button and filling out the form.

3. **Upvoting**: Users can upvote products by clicking the upvote button on each product card.

4. **Commenting**: Users can add comments to products on the product detail page.

5. **Product Details**: Clicking on a product card takes users to a detailed view with more information and comments.

### Data Management

In this demo version, all data is stored in memory using React state. In a production application, you would connect to a database to persist data between sessions.

## Building for Production

To build the application for production:

Using npm:

\`\`\`bash
npm run build
\`\`\`

Or using Yarn:

\`\`\`bash
yarn build
\`\`\`

To start the production server:

Using npm:

\`\`\`bash
npm start
\`\`\`

Or using Yarn:

\`\`\`bash
yarn start
\`\`\`

## Deploying to Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project into Vercel
3. Vercel will detect that you're using Next.js and set up the build configuration for you
4. Your application will be deployed automatically

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [date-fns](https://date-fns.org/) - Date utility library
- [Lucide React](https://lucide.dev/) - Icon library

## Future Enhancements

- User authentication
- Product categories
- Search functionality
- Persistent storage with a database
- Product images
- User profiles

## Customization

### Adding a Database

To add a database to this project, you could:

1. Set up a database (MongoDB, PostgreSQL, etc.)
2. Create API routes in the `app/api` directory
3. Replace the in-memory data storage with database calls

### Adding Authentication

To add authentication:

1. Install an authentication library like NextAuth.js
2. Set up authentication providers
3. Create login/signup pages
4. Add protected routes

## Troubleshooting

### Common Issues

- **Module not found errors**: Make sure you've installed all dependencies with `npm install` or `yarn install`
- **TypeScript errors**: Check that your TypeScript version is compatible with the project
- **Styling issues**: Ensure Tailwind CSS is properly configured

## License

This project is licensed under the MIT License - see the LICENSE file for details.
