# Contentfry Social Wall – Next.js Integration Example

This example demonstrates how to integrate a Contentfry social wall feed into a Next.js 15 application. It uses modern tools to render a responsive, real-time feed of social media content.

## Features

- Real-time feed rendering from the Contentfry Feed API
- Responsive design with Tailwind CSS
- Accessible UI components built with Radix UI
- Built with Next.js 15 and Turbopack
- Written in TypeScript

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
/
├── app/                  # App Router pages and layout
├── components/           # Reusable UI components
├── lib/                  # API helpers and feed handling
├── styles/               # Tailwind CSS configuration and global styles
└── next.config.js        # Next.js configuration
```

## Deployment

This app can be deployed to Vercel or any platform that supports Next.js. Update the feed URL in your code before deploying.
