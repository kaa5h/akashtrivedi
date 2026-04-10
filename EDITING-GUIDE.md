# Portfolio Editing Guide

Everything you need to edit lives in **one file**:

```
src/app/page.jsx
```

Open it in any text editor (VS Code, TextEdit, etc). Look for the big comment blocks — they tell you exactly what to do.

---

## Quick Reference

### Add a Blog Post

1. Open `src/app/page.jsx`
2. Find the comment block `BLOG POSTS`
3. Copy an existing blog post block (everything between `{` and `},`)
4. Paste it right after the line `/* ADD NEW BLOG POST HERE (newest first) */`
5. Change the values:
   - Give it a new `id` (e.g. `"b6"`)
   - Update `ti` (title), `dt` (date), `tg` (tags), `rt` (read time), `bd` (body)
   - For paragraphs in the body, use `\n\n` to separate them

**Example:**
```js
{id:"b6",ti:"My New Blog Post Title",dt:"Apr 2025",tg:["Design","UX"],rt:"5 min",bd:"First paragraph here.\n\nSecond paragraph here."},
```

### Delete a Blog Post

Find the blog post in the `BL` list and delete the entire line from `{` to `},`.

### Edit a Blog Post

Find it in the `BL` list and change the text you want to update.

---

### Add a Project

1. Find the comment block `PROJECTS`
2. Copy an existing project block
3. Paste it before the line `/* ADD NEW PROJECT HERE */`
4. Update all the fields (see the comment block for what each field means)
5. Add an overview image to `public/projects/` (e.g. `my-project-overview.png`)
6. Set the `img` field to `"/projects/my-project-overview.png"`

**Example:**
```js
{ id:"newproj",img:"/projects/newproj-overview.png",n:"My New Project",co:"Company Name",tl2:"One-line subtitle",d:"Short description for the card.",ld:"Long description for the detail page.\n\nSecond paragraph.",t:["Product Design"],tools:["Figma"],y:"2025",r:"Designer",c:"#1a1a1a" },
```

### Delete a Project

Find it in the `P` list and delete the entire block from `{` to `},`.

---

### Add/Edit Experience (CV Page)

1. Find the comment block `EXPERIENCE (CV page)`
2. To add: copy a block and paste it in chronological order
3. To edit: change the text values directly

**Example:**
```js
{p:"01/2025 — Present",ti:"Senior Designer",co:"New Company",lo:"Berlin",d:"What you do there."},
```

---

### Add/Edit Education (CV Page)

1. Find the comment block `EDUCATION (CV page)`
2. Same pattern — copy, paste, edit

**Example:**
```js
{p:"2020 — 2022",ti:"M.A. Something",ins:"Some University",lo:"City",d:"Grade: 1.0"},
```

---

### Add/Edit Skills (CV Page)

1. Find the comment block `SKILLS (CV page)`
2. To add a skill to an existing category: add it inside the `items` list
3. To add a new category: copy a whole block

**Example — adding a skill:**
```js
{c:"Tools",items:["Figma","FigJam","Storybook","Framer","NEW TOOL"]},
```

---

### Edit Homepage Intro Tabs

1. Find the comment block `HOMEPAGE INTRO TABS`
2. Edit the `l` (tab label) and `t` (tab text)
3. **Special case:** The first tab's text is hardcoded in the HTML below. To edit it, search for `I'm <span className="hn"` in the file.

---

### Edit Footer Links

The footer appears on 4 pages. Search for `ft2` in the file — you'll find 4 instances. Update **all of them** to keep things consistent.

To add a new link, copy one of the `<a>` tags:
```html
<a className="ftl" href="https://your-link.com" target="_blank" rel="noopener noreferrer">Link Text</a>
```

---

### Change Your Email

Search for `akashtrivedi30@gmail.com` in the file and replace all instances.

---

### Edit Hero Grid Phrases

1. Find the comment block `HERO GRID PHRASES`
2. Only UPPERCASE letters work: A B C D E G H I J K L M N P R S T U V Y and SPACE
3. One line: `[["WORD"]],` — Two lines: `[["LINE ONE"],["LINE TWO"]],`

---

### Change Site Title (Browser Tab)

Edit `src/app/layout.jsx` — find the `metadata` line and change the `title` and `description`.

---

### Add Project Images

1. Put your image file in `public/projects/` (e.g. `my-project.png`)
2. Reference it as `"/projects/my-project.png"` in the project's `img` field

---

## Important Rules

- **Always keep the commas** — every block must end with `},`
- **Keep quotes around text** — all values need `"double quotes"`
- **Don't delete the square brackets** `[` and `]` that wrap each list
- **Save the file** and refresh your browser to see changes
- **Run the dev server** with `npm run dev` in terminal to preview locally

## Running the Site Locally

```bash
cd "portfolio 15"
npm run dev
```

Then open http://localhost:3000 in your browser.
