# Eternity - Last Epoch Stash Search Builder

A web application for building Last Epoch stash search strings with an intuitive user interface. Generate complex search expressions using macros, regex patterns, and logical operators to quickly find items in your stash.

## Features

- **Intuitive UI**: Build complex search strings without memorizing macro syntax
- **Macro System**: User-friendly inputs that translate to Last Epoch's macro syntax
- **Preset Templates**: Pre-configured searches for common item filtering scenarios
- **URL Sharing**: Share search configurations via URL for easy collaboration
- **Expression Logic**: Support for AND (&) and OR (|) operators between search terms

## Quick Start

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:4321/search` to start building search strings.

### Production Build

```bash
npm run build
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Tech Stack

- **Framework**: Astro 5
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Build**: Vite
- **Code Quality**: Prettier + Husky + lint-staged

## Usage

The application provides sections for different types of Last Epoch item filters:

- **Item Potential**: Set legendary potential requirements (e.g., LP3+)
- **Affix Tiers**: Filter by specific affix tier ranges
- **Item Types**: Search by item categories and types
- **Custom Expressions**: Build advanced search logic

Generated search strings can be copied and pasted directly into Last Epoch's stash search.

## Deployment

This project is configured for GitHub Pages deployment:

- **Site**: `https://checkmatez.github.io/eternity`
- **Auto-deploy**: Pushes to main branch trigger deployment
- **Base URL**: `/eternity` (configured in astro.config.mjs)

## Project Structure

```
src/
├── components/
│   ├── sections/          # Feature-specific UI sections
│   └── ui/               # Reusable UI components
├── data/
│   └── stash-macros.ts   # Macro definitions and presets
├── layouts/
│   └── Layout.astro      # Base page layout
├── pages/
│   ├── index.astro       # Redirects to /search
│   └── search.astro      # Main application page
├── types/
│   └── stash-search.ts   # TypeScript interfaces
└── utils/
    ├── search-parser.ts  # Search string parsing logic
    └── url-state.ts      # URL state synchronization
```

## License

MIT License - see LICENSE file for details.
