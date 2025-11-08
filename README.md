# Contentfry Starter Examples

This repository contains ready-to-run examples for integrating **Contentfry** into modern frontend frameworks.

Use these examples to:
- Build and customize social walls and feeds
- Explore integrations with frameworks like **Next.js** and **Vite**

---

## Quick Start

The fastest way to get started is using the `create-contentfry-starter` CLI tool:

```bash
npm create contentfry-starter@latest -- --example react-social-wall
```

Then navigate to your new project and start developing:

```bash
cd react-social-wall
npm run dev
```

---

## Live Demos

| Example                   | Framework     | Demo |
|--------------------------|---------------|------|
| Next Social Wall         | Next.js       | [next-social-wall.starter.contentfry.com](https://next-social-wall.starter.contentfry.com) |
| React Social Wall UI     | Vite + React  | [starter.contentfry.com/react-social-wall](https://starter.contentfry.com/react-social-wall) |

---

## Manual Installation

If you prefer to clone the repository:

```bash
git clone https://github.com/contentfry/contentfry-starter.git
cd contentfry-starter
npm install
```

Run a specific example:

```bash
# React Social Wall (Vite)
cd examples/react-social-wall
npm run dev

# Next Social Wall
cd apps/next-social-wall
npm run dev
```

Run all examples from the root:

```bash
npm run dev:all
```

---

## Project Structure

```
contentfry-starter/
├── apps/
│   └── next-social-wall/        # Next.js app example
├── examples/
│   └── react-social-wall/       # Vite + React app example
├── package.json                 # Monorepo configuration
├── pnpm-workspace.yaml          # Workspace setup
└── lerna.json                   # Lerna monorepo config
```

---

## Technologies Used

- Next.js – Server-rendered feed integration
- Vite – Fast build and development environment
- React – Component-based UI framework
- Tailwind CSS – Utility-first styling framework
- Contentfry API – Real-time content feeds

---

## Contributing

We welcome contributions. Feel free to submit new examples or improvements through a pull request.

---

## Resources

- [Contentfry Website](https://www.contentfry.com)
- [Developer Documentation](https://developer.contentfry.com)
- [Help Center](https://help.contentfry.com)

---

Contentfry GmbH — Zürich, Switzerland
