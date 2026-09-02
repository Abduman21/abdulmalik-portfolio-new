# Portfolio Project

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest with React Testing Library
- **Icons**: Lucide React

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

1. Clone the repository
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/           # Portfolio data (projects, skills, etc.)
├── lib/            # Utility functions
├── test/           # Test setup and utilities
└── types/          # TypeScript type definitions
```

## Customization

### Portfolio Data

Edit your portfolio information in `src/data/portfolio-data.ts`:
- Projects
- Skills
- Experience
- Services
- Testimonials

### Styling

The project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.ts`.

### Components

Add or modify components in the `src/components/` directory. The project uses Shadcn/ui components as a base.

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Static Hosting

You can deploy the built files to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
