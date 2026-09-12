# Writing and publishing

Run `npm run dev`, then open `http://127.0.0.1:3000/keystatic`.
The editor currently uses local files. No GitHub credentials are needed locally.

## Articles

1. Open **Articles**, choose **Add**, and write your title, description, and body.
2. Add tags, a category, and optionally upload a cover image.
3. Leave **Publication** as **Draft** while writing, then save.
4. To publish, choose **Published**, use today's date or an earlier date, and save.
5. Refresh `/blog`. The article is available at `/blog/<slug>`.

Switching back to Draft hides an entry again. Drafts are excluded from public
pages, navigation, search results, sitemap, RSS, and generated sharing images.
Future publication dates also stay hidden until that UTC date. Production pages
revalidate on requests every 60 seconds; this is not a precise scheduled-job service.

The public blog starts empty. Demo articles and temporary verification entries
were removed, so it shows only writing you publish.

## Series and chapters

1. Create a **Series** with its introduction, overview, audience, and resources.
2. Add its ordered **Curriculum parts**, such as Foundations and Practice.
3. Create entries in **Chapters** and select their Series.
4. **Part number** is the position in the series' parts list, starting at 1.
5. **Chapter order** is unique across that series. Gaps such as 10, 20, 30 are fine.
6. Publish both the series and each chapter you want readers to see.

The reader numbers published chapters automatically. Counts, reading times,
previous/next links, curriculum, and the continue-reading destination follow
published content. Empty parts and draft chapters are hidden. A published series
with no chapters has no broken continue-reading link.

Several series are supported. Featured series appear first. Existing cards,
reader layouts, typography, illustrations, tabs, and navigation styles are reused.

Keep slugs stable after publication. Keystatic references use slugs and do not
automatically follow a rename. Chapter slugs must be unique across the Chapters
collection. Keep part positions stable after assigning chapters to them.

## MDX and images

Articles and chapters are `.mdx` files with YAML frontmatter under `content/`.
Series metadata is YAML. You can edit either through Keystatic or in your editor.
Body uploads and cover images are stored under `public/images/blog/`.

The editor supports headings, lists, links, images, tables, quotes, and code fences.
Its component menu also includes **Tip / callout**, **Quote**, **Code with filename**,
These use the existing reader components.
Arbitrary JavaScript expressions and imports are disabled in MDX rendering;
registered components and literal text props are supported.

SEO fields are optional overrides. Otherwise titles, descriptions, sharing images,
canonical URLs, publication dates, and structured data are generated automatically.
`/sitemap.xml` and `/feed.xml` include published articles and chapters.

## Enable the online editor

The repository is `owaish3301/portfolio-new`, with production branch `master`.

1. In `.env.local`, add only this line to start the GitHub setup:

   ```dotenv
   NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=owaish3301/portfolio-new
   ```

2. Restart the dev server and open `/keystatic`. Follow **Log in with GitHub**
   and **Create GitHub App**, installing the app only on `portfolio-new`.
3. Keystatic generates `KEYSTATIC_GITHUB_CLIENT_ID`,
   `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, and
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. Keep those in ignored environment
   files; do not paste secret values into chat or commit them.
4. Connect `portfolio-new` to a hosting project that runs Next.js with Node.js.
   Use repository root as the project root and `master` as the production branch.
5. Add the four generated variables and `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`
   to the hosting environment, then deploy.
6. In the GitHub App settings, include the deployed callback URL
   `https://<your-deployed-domain>/api/keystatic/github/oauth/callback`.
7. Open `https://<your-deployed-domain>/keystatic` and sign in.

Saving in GitHub mode commits content to the selected GitHub branch. Select
`master` to publish to production. The hosting Git integration must automatically
rebuild on commits. Changes go live after that deployment succeeds. A save to a
different branch does not change production. Local filesystem saves require a
normal commit and push before the deployed site can see them.

Production disables the local filesystem editor and API when GitHub mode is
not configured. Public pages continue to work. The editor is marked noindex,
and the site's analytics scripts are not mounted on `/keystatic`.

GitHub App registration, hosting environment variables, and online publishing
still need to be completed in your accounts. No deployment or push was performed.

## Checks

Run `npm test`, `npm run lint`, and `npm run build`.
The tests cover draft visibility, updates/unpublishing, multiple series, chapter
ordering, MDX components, heading anchors, and SEO metadata using temporary files
outside your real content directory.
