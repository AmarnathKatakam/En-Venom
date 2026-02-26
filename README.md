# BlackRoth Beverages

Premium React + TypeScript storefront for BlackRoth Beverages.

Includes backend order-email support using Gmail SMTP.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Getting Started

```sh
npm install
npm run dev
```

To run frontend + backend together:

```sh
npm run dev:full
```

## Gmail SMTP Setup (Order Emails)

1. Copy `.env.example` to `.env`.
2. Set:
   - `GMAIL_USER` to your Gmail address.
   - `GMAIL_APP_PASSWORD` to a Gmail App Password (not your normal Gmail password).
   - `ORDER_RECEIVER_EMAIL` to the email where orders should be received.
3. Start the app with `npm run dev:full`.

Order form submissions from the modal are sent to `POST /api/orders`, and the backend emails the order details to `ORDER_RECEIVER_EMAIL`.

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run test` - run Vitest tests

## Project Structure

- `src/components` - UI and section components
- `src/pages` - route-level pages
- `src/layouts` - shared layout components
- `src/assets` - images and media
