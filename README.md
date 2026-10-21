# ERDOGAN BOT

Starter project for a WhatsApp Cloud API webhook. It detects incoming webhook events that contain a shared contact and logs them.

## Important limitation

**This starter does not delete contact messages.** The ordinary WhatsApp Cloud API does not generally let a bot delete another participant's incoming message from a group. Group features are limited to eligible accounts and supported operations. Do not assume contact-message deletion works until Meta's current Groups API documentation and your account's access confirm it.

Official documentation:
- https://developers.facebook.com/docs/whatsapp/cloud-api/groups/
- https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/

## Run locally

1. Install Node.js 18 or newer.
2. Extract this folder.
3. Copy `.env.example` to `.env`.
4. Set `VERIFY_TOKEN` to a secret value.
5. Install dependencies with `npm install`.
6. Start with `npm start`.
7. Expose the server using an HTTPS hosting service/tunnel, then configure the callback URL as `https://YOUR-DOMAIN/webhook` in Meta Developers.
8. Subscribe the WhatsApp app to the relevant webhook fields supported for your account.

Never share your access token or commit the `.env` file to GitHub.

## What is included

- `server.js`: webhook verification and contact-share event detection.
- `.env.example`: configuration template.
- `package.json`: Node dependencies and start command.

This is a starter scaffold, not a deployed 24/7 bot. Hosting and Meta account configuration are still required.
