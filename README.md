# Team Halakh Family

A web-based application for simple income and expense tracking, aimed at
self-employed people and small businesses, with core features suitable
for personal finance management.

## Project status

Early development. The initial Next.js application and local CouchDB
environment are set up. The MVP data model and desktop user flows are
being prepared for review.

The features below are planned and are not all implemented yet.

## MVP scope

- Track income and expenses.
- Organise transactions into categories.
- Manage cash and bank accounts.
- View transactions and basic financial summaries.
- Prepare the data model for future users and data separation.

The initial interface will focus on desktop use. Registration and login
are deferred, while the data model will account for future multi-user
support and data separation. Mobile layouts may be added later.

Complex accounting and tax features are outside the MVP scope.

## Technology stack

- Frontend: Next.js, React and TypeScript.
- Styling and UI: Tailwind CSS and shadcn/ui (Base UI, Nova preset).
- Main backend: TypeScript (planned).
- Database: Apache CouchDB 3.4.2.
- Development tools: pnpm and Docker Compose.

## Requirements

- Node.js 22 or 24 LTS.
- pnpm 10.34.6.
- Docker Desktop with Docker Compose.

## Getting started

Run all commands from the repository root.

### 1. Install dependencies

```bash
pnpm install --frozen-lockfile
```

### 2. Start CouchDB

Make sure Docker Desktop is running, then start the services:

```bash
docker compose up -d
```

Check the container status and initialization results:

```bash
docker compose ps -a
docker compose logs couchdb-init
```

The initialization service is configured to create the CouchDB system
databases, the application database `erp_db_test` and the
`type-createdAt-index` index. Check the log responses to confirm that
initialization succeeded.

Open the CouchDB web interface at
http://localhost:5984/_utils/ and sign in using the development credentials
configured in `docker-compose.yml`.

> Local development only. Port 5984 is published on the host without a
> loopback-only restriction. Do not expose CouchDB to untrusted networks.
> Persistent storage is not explicitly configured in the Compose file;
> use disposable test data and do not share credentials.

### 3. Start the application

```bash
pnpm dev
```

Open http://localhost:3000 or the address shown in the terminal.

To stop the database services without removing their containers:

```bash
docker compose stop
```

## Checks

```bash
pnpm lint
pnpm build
```

To preview the production build locally:

```bash
pnpm start
```

## Data model

See [the proposed MVP data model](docs/mvp-data-model.json) for document
structures, required and optional fields, relationships and examples.

The proposal is subject to review. It is not a database import file or an
executable validation schema.

## Project structure

- `app/` — pages, layouts and global styles.
- `components/ui/` — UI components.
- `lib/` — shared utilities.
- `docs/` — data model and project documentation.
- `docker-compose.yml` — local CouchDB environment.
- `.vscode/extensions.json` — recommended editor extensions.
