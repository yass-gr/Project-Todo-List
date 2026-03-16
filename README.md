# Project Todo List

A simple and elegant web application for managing todos and notes, built with vanilla JavaScript and bundled with Webpack.

## Features

- **Dual tabs**: Switch between Todos and Notes with a single click
- **Task management**: Create lists with multiple tasks, mark tasks as complete
- **Notes**: Create and manage notes with titles and content
- **Search**: Search through your tasks and notes
- **Persistent storage**: Data is saved to localStorage
- **Modern UI**: Clean interface with Material Design icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yass-gr/Project-Todo-List.git
cd Project-Todo-List

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:8080` in your browser.

### Build

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Project Structure

```
├── src/
│   ├── components/     # UI components
│   ├── data/           # Storage and data management
│   ├── logic/          # Business logic for todos and notes
│   ├── index.js        # Main entry point
│   ├── index.html      # HTML template
│   └── styles.css      # Styles
├── webpack.config.js   # Webpack configuration
└── package.json
```

## Tech Stack

- Vanilla JavaScript (ES6+)
- Webpack 5
- Material Design Icons
- LocalStorage for persistence

## License

ISC