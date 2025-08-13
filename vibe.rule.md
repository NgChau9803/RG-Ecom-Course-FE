# Vibe Coding Style Guide

This document outlines the coding standards and best practices for the Vibe project. Adhering to these guidelines ensures consistency, readability, and maintainability of the codebase.

## 1. File and Directory Structure

- **`src/`**: Contains all the source code for the application.
  - **`components/`**: Reusable UI components.
    - Each component should be in its own file, e.g., `Button.tsx`.
    - Component file names should be in PascalCase.
    - Complex components can have their own directory, e.g., `CourseCard/`, containing `index.tsx`, `styles.css`, and any sub-components.
  - **`contexts/`**: React context providers.
    - Context file names should be in PascalCase and end with `Context`, e.g., `AppSettingsContext.tsx`.
  - **`hooks/`**: Custom React hooks.
    - Hook file names should start with `use`, e.g., `useCourses.ts`.
  - **`locales/`**: Language files for internationalization.
    - Files should be named after the language code, e.g., `en.json`.
  - **`pages/`**: Top-level page components that correspond to routes.
    - Page file names should be in PascalCase and end with `Page`, e.g., `CoursesPage.tsx`.
  - **`services/`**: Modules for interacting with external APIs.
    - Service file names should be in camelCase and end with `Service`, e.g., `geminiService.ts`.
  - **`types/`**: TypeScript type definitions.
    - A single `types.ts` file can be used for shared types, or a `types/` directory for more complex projects.

## 2. Component Design

- **Functional Components**: Use functional components with hooks over class components.
- **Props**:
    - Use TypeScript interfaces for prop types.
    - Interfaces should be named with a `Props` suffix, e.g., `CourseCardProps`.
    - Destructure props in the function signature.
- **State**:
    - Use the `useState` hook for simple component state.
    - Use the `useReducer` hook for complex state logic.
    - For global state, use React Context or a state management library like Zustand or Redux.

## 3. Styling

- **CSS Modules**: Use CSS Modules for component-level styling to avoid class name collisions.
- **Naming Conventions**: Use BEM (Block, Element, Modifier) naming conventions for CSS classes.
- **Global Styles**: Global styles should be defined in `index.css`.
- **Styled Components**: Alternatively, use a CSS-in-JS library like `styled-components` or `emotion` for more dynamic styling.

## 4. TypeScript

- **Strict Mode**: Enable strict mode in `tsconfig.json`.
- **Type Inference**: Use type inference where possible, but be explicit with function return types and complex objects.
- **`any`**: Avoid using the `any` type. Use `unknown` instead and perform type checking.

## 5. Best Practices

- **Imports**:
    - Organize imports in the following order: React, external libraries, internal components, and assets.
    - Use absolute paths for imports, configured in `tsconfig.json`.
- **Error Handling**:
    - Use error boundaries to catch rendering errors in component trees.
    - Use `try...catch` blocks for asynchronous operations.
- **Testing**:
    - Write unit tests for components, hooks, and services.
    - Use a testing library like React Testing Library and a test runner like Jest or Vitest.