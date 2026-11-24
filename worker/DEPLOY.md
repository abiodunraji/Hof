# House of Faridah content Worker: how to put it live

This Worker is what makes the admin panel publish for real: the owner's changes to contact
details, links, texts and projects are saved here and every visitor sees them. Nothing here
has been run against Cloudflare yet: it was built and tested locally only (`npm test`,
`npm run dev`).

It does **not** take enquiries. The site's forms are the owner's own Tally forms, embedded on
the pages (see "Tally forms" below), so nothing a visitor types ever reaches this Worker.

Do the steps in order. Steps 2 to 5 create things on a Cloudflare account, so check
**whose account** is signed in first (step 2). Everything is on the free plan.

## 0. What you need

- A Cloudflare account (free). Use Biodun's own, never a client's.
- A GitHub login that can edit `abiodunraji/Hof` settings.
- The password the owner will use for `/.admin` (10+ characters), and the username.

## 1. Install

```
cd worker
npm ci
npm test            # 89 tests, local only
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

These three are the only secrets the Worker uses.

## 5. Deploy the Worker

```
npx wrangler deploy
```

It prints the address, like `https://hof-content.<account>.workers.dev`. Write it down.

## 6. Check it before pointing the site at it

```
curl https://hof-content.<account>.workers.dev/api/content
```

Expect JSON with `config` (the site's defaults, including `tallyInteriorsFormId`) and
`portfolio: null`. Then sign in from a terminal with the real username and password:

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
- Open the Interiors contact page: the owner's Tally form shows inside the page.

## Tally forms

- The Interiors contact page and the Interiors "Book a consultation" pop-up embed the owner's
  Tally form **Client Onboarding Form**, id `vGPYv8` (an Interiors intake). It is the default
  of the setting `tallyInteriorsFormId`.
- There is no Construction form yet. Until `tallyConstructionFormId` is set, the Construction
  contact page shows a "Call or email us to request a quote" card with the configured phone
  and email, and no form.
- The owner can change either id in the panel (Contact tab). Pasting the Tally share link
  (`https://tally.so/r/<id>`) or embed link is enough; the panel keeps only the id. The Worker
  accepts only 4 to 20 letters or digits, or empty.
- Submissions go straight to the owner's Tally account and email. This Worker never sees them.

## Limits to know

- KV is eventually consistent: a save can take up to about a minute to show everywhere.
- The wrong-login limit (5 per 15 minutes per connection) is best effort for the same reason.
- One owner login. A password change from the panel ends every older session.
- If the Worker is down or the address is wrong, the site falls back to its built-in content
  (exactly today's site), including the owner's Tally form.

## Rolling back

Delete the `VITE_API_BASE` variable and redeploy the site: it returns to the built-in
content. The Worker and its stored content are untouched.
