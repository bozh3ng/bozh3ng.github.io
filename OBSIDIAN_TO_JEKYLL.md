# Obsidian → Jekyll (al-folio) Conversion Guide

## Display Math: `$` → `$$`

Obsidian uses single `$...$` on its own line for display math. Jekyll/Kramdown requires `$$...$$` with **blank lines** before and after.

**Obsidian:**
```
Some text
$
x^2 + y^2 = 1
$
More text
```

**Jekyll:**
```
Some text

$$
x^2 + y^2 = 1
$$

More text
```

Inline math `$...$` stays the same.

## Curly Braces in Math: `\left\{` → `\lbrace`

Kramdown interprets `\{` as a special attribute syntax. Replace all `\left\{` and `\right\}` in math with `\lbrace` and `\rbrace`.

**Obsidian:**
```
$\left\{x \in \mathbb{R}^n : x > 0\right\}$
```

**Jekyll:**
```
$\lbrace x \in \mathbb{R}^n : x > 0 \rbrace$
```

This applies to both inline and display math. Also replace standalone `\{` and `\}` inside math with `\lbrace` / `\rbrace`.

## Blank Lines Between Paragraphs

Obsidian renders paragraphs even without blank lines between them. Jekyll/Kramdown does not — consecutive lines without a blank line are merged into one paragraph.

**Always add a blank line** between:
- Paragraphs
- Before and after display math (`$$`)
- Before and after images
- Before and after blockquotes (`>`)
- Before and after lists
- Before and after code blocks
- Before and after horizontal rules (`---`)

## Matrices: `\left(\begin{array}` → `\begin{pmatrix}`

The `\left(\begin{array}...\end{array}\right)` pattern can cause delimiter errors. Use `\begin{pmatrix}` or `\begin{bmatrix}` instead.

**Obsidian:**
```
$$\left(\begin{array}{cc} a & b \\ c & d \end{array}\right)$$
```

**Jekyll:**
```
$$\begin{pmatrix} a & b \\ c & d \end{pmatrix}$$
```

Use `pmatrix` for `()`, `bmatrix` for `[]`.

## Absolute Values and Norms

`\left|...\right|` can conflict with Kramdown table syntax. Use `\lvert...\rvert` for absolute value and `\lVert...\rVert` for norms.

## Pipe `|` in Math Inside Tables

If you have inline math containing `|` inside a Markdown table, Kramdown will break. Escape it as `\mid` or `\vert`.

## Frontmatter

Every post needs YAML frontmatter:

```yaml
---
layout: post
title: "Your Title"
date: 2026-01-01
description: "Short description for the blog list."
tags: [math, topic]
---
```

## Images

Obsidian uses `![[image.png]]`. Jekyll uses standard Markdown:

```
![alt text](/assets/img/blog/your-post/image.png)
```

Put images in `assets/img/blog/your-post/`.

## Internal Links

Obsidian uses `[[Other Note]]`. Jekyll uses standard links:

```
[Other Note](/blog/2026/other-note/)
```

## Quick Checklist

- [ ] Frontmatter added with layout, title, date, description, tags
- [ ] All display math uses `$$` on own lines with blank lines around them
- [ ] All `\{` and `\}` in math replaced with `\lbrace` / `\rbrace`
- [ ] All `\left(\begin{array}` replaced with `\begin{pmatrix}` or `\begin{bmatrix}`
- [ ] Blank lines between every paragraph
- [ ] Blank lines before/after display math, images, blockquotes, lists, code blocks
- [ ] `![[...]]` image syntax converted to `![](...)` with correct paths
- [ ] `[[...]]` wiki-links converted to standard Markdown links
- [ ] `\left|` / `\right|` replaced with `\lvert` / `\rvert`
