# Project Structure

This document outlines the folder structure of the NestJS backend application.

## Directory Structure

```
src/
├── core/                    # Core NestJS artifacts
│   ├── filters/            # Global exception filters for consistent error handling
│   ├── guards/             # Global guards for authentication and authorization
│   ├── interceptors/       # Global interceptors for cross-cutting concerns (logging, transformation, etc.)
│   ├── pipes/              # Global pipes for validation and transformation
│   └── decorators/         # Custom decorators
├── shared/                  # Shared utilities and services
│   ├── services/           # Shared business services used across modules
│   ├── utils/              # Utility functions and helpers
│   └── types/              # Shared types and interfaces
├── app.module.ts           # Root application module
├── app.controller.ts       # Root application controller
├── app.service.ts          # Root application service
└── main.ts                 # Application entry point
```

## Feature Modules

When creating new feature modules, use the following structure:

```
src/
└── [feature]/              # Feature modules (e.g., users, orders, products)
    ├── [feature].module.ts
    ├── [feature].controller.ts
    ├── [feature].service.ts
    ├── dto/                # Data Transfer Objects
    │   ├── create-[feature].dto.ts
    │   ├── update-[feature].dto.ts
    │   └── [feature]-response.dto.ts
    └── entities/           # Database entities (if applicable)
```

## Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:

- `@/*` - Maps to `src/*`
- `@/core/*` - Maps to `src/core/*`
- `@/shared/*` - Maps to `src/shared/*`

Example usage:
```typescript
import { SomeGuard } from '@/core/guards';
import { SomeService } from '@/shared/services';
import { SomeType } from '@/shared/types';
```

## Index Files

Each directory contains an `index.ts` file for clean exports. This allows importing from the directory path rather than specific files.
