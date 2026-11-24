# House of Faridah content Worker: how to put it live

This Worker is what makes the admin panel publish for real and what delivers the
contact / consultation forms. Nothing here has been run against Cloudflare yet:
it was built and tested locally only (`npm test`, `npm run dev`).

Do the steps in order. Steps 2 to 6 create things on a Cloudflare account, so check
**whose account** is signed in first (step 2). Everything is on the free plan.

## 0. What you need

- A Cloudflare account (free). Use Biodun's own, never a client's.
- A GitHub login that can edit `abiodunraji/Hof` settings.
- The password the owner will use for `/.admin` (10+ characters), and the username.
- For the enquiry emails: the owner's email address(es) that should receive them, and
  an email provider (see "Enquiry email" below). The Worker works without it: every
  enquiry is still stored and can be read in the panel's Enquiries tab.

## 1. Install

```
cd worker
npm ci
npm test            # 68+ tests, local only
npm run typecheck
```

## 2. Sign in and confirm the account

```
npx wrangler login
npx wrangler whoami      # read the account name and id it prints; stop if it is not the right one
```

## 3. Create the storage

```
npx wrangler kv namespace create CONTENT
```

Copy the `id` it prints into `worker/wrangler.jsonc` (replace `REPLACE_WITH_KV_NAMESPACE_ID`).

## 4. Set the secrets (each command asks for the value; nothing is written to a file)

```
npx wrangler secret put ADMIN_USERNAME            # for example: faridah
npm run hash-password                             # asks for the password, prints a hash
npx wrangler secret put ADMIN_PASSWORD_HASH       # paste that whole pbkdf2-sha256$... line
node scripts/hash-password.mjs --secret           # prints a random value
npx wrangler secret put SESSION_SECRET            # paste it (48+ characters)
```

Enquiry email (optional but this is what puts the form in her inbox):

```
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put ENQUIRY_TO                # one address, or several separated by commas
npx wrangler secret put ENQUIRY_FROM              # for example: House of Faridah <enquiries@houseoffaridah.com>
```

Do not set `RESEND_API_BASE`; it exists only so the tests can point at a fake provider.

## 5. Deploy the Worker

```
npx wrangler deploy
```

It prints the address, like `https://hof-content.<account>.workers.dev`. Write it down.

## 6. Check it before pointing the site at it

```
curl https://hof-content.<account>.workers.dev/api/content
```

Expect JSON with `config` (the site's defaults) and `portfolio: null`. Then, from a
terminal, sign in with the real username and password:

```
curl -X POST https://hof-content.<account>.workers.dev/api/login -H "Content-Type: application/json" -d "{\"username\":\"USER\",\"password\":\"PASSWORD\"}"
```

Expect a `token`. A wrong password must answer 401.

## 7. Point the site at the Worker

1. GitHub, repo `abiodunraji/Hof`, Settings, Secrets and variables, Actions, tab **Variables**,
   New repository variable: name `VITE_API_BASE`, value the Worker address from step 5
   (no trailing slash). It is public by design, so a variable is right, not a secret.
2. The workflow in this branch already passes `VITE_API_BASE` to the build and no longer
   needs `VITE_ADMIN_USERNAME` / `VITE_ADMIN_PASSWORD_HASH`. After the redeploy you can
   delete those two repository secrets (the login now lives on the Worker, not in the site).
3. Merge the pull request (it deploys the site), or run the deploy workflow on `main`.

## 8. Check the live site

- `https://houseoffaridah.com/.admin`: sign in. A wrong password must be refused.
- Change the Contact phone, press **Save Changes**. Open the site in a private window:
  the new phone shows within about 30 seconds.
- Send a test message from the contact page. It must appear under **Enquiries** in the
  panel, and (if email is set up) in the inbox.

## Enquiry email: the choices

The Worker calls an email provider's HTTP API from `worker/src/email.ts` (Resend today;
only that file changes for another provider).

- **Resend (free tier)**: needs the sender domain verified, which means adding the DNS
  records Resend shows at Namecheap, where the owners hold `houseoffaridah.com`. Gives mail
  that comes from `enquiries@houseoffaridah.com`. Until the domain is verified, Resend only
  delivers to the account holder's own address, so it cannot reach the owner.
- **No email at all**: leave the three email secrets unset. Enquiries are stored and listed in
  the panel; the owner has to open the panel to see them (which is why email is better).

## Limits to know

- KV is eventually consistent: a save can take up to about a minute to show everywhere.
- Rate limits (5 wrong logins per 15 minutes per connection, 5 enquiries per 10 minutes) are
  best effort for the same reason.
- One owner login. A password change from the panel ends every older session.
- If the Worker is down or the address is wrong, the site falls back to its built-in content
  (exactly today's site) and the forms show an error with the phone and email instead of a
  false "thank you".

## Rolling back

Delete the `VITE_API_BASE` variable and redeploy the site: it returns to the built-in
content and the forms show their error message. The Worker and its stored enquiries are
untouched.
