# QA Automation Platform - Frontend

AI-powered test automation platform built with Next.js 14, React 19, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Diagrams:** React Flow (@xyflow/react)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── dashboard/    # Dashboard page
│   │   ├── projects/     # Test projects pages
│   │   ├── requirements/ # Requirements pages
│   │   ├── test-cases/   # Test cases pages
│   │   ├── scripts/      # Automation scripts pages
│   │   ├── executions/   # Execution monitoring pages
│   │   └── settings/     # Settings pages
│   ├── components/       # Reusable components
│   │   ├── ui/          # Base UI components
│   │   ├── charts/      # Chart components
│   │   ├── flows/       # Flow diagram components
│   │   └── layouts/     # Layout components
│   └── lib/             # Utilities and types
│       ├── utils.ts     # Utility functions
│       ├── types.ts     # TypeScript types
│       └── constants.ts # Constants and theme colors
├── public/              # Static assets
└── package.json
```

## Key Features

- **Dashboard** - Real-time metrics and activity monitoring
- **Test Projects** - Project management and organization
- **Requirements** - AI-powered requirement analysis and ingestion
- **Test Cases** - Automated test case generation and review
- **Automation Scripts** - Playwright script generation with validation
- **Executions** - Live test execution monitoring
- **Traceability** - Full requirement-to-execution traceability

## Design System

The platform uses a consistent design system with:
- **Color Tokens** - Semantic color variables for theming
- **Component Library** - Reusable, accessible components
- **Dark Mode** - Built-in dark mode support
- **Responsive Design** - Mobile-first responsive layouts

## Development Guidelines

1. Use TypeScript for all new files
2. Follow the established folder structure
3. Use Tailwind CSS utility classes for styling
4. Leverage the `cn()` utility for conditional classes
5. Keep components modular and reusable
6. Use proper TypeScript types from `lib/types.ts`

## Next Steps

- Build out individual page components
- Implement data fetching and API integration
- Add authentication and authorization
- Create reusable UI component library
- Implement charts and visualizations
- Add form validation and error handling

