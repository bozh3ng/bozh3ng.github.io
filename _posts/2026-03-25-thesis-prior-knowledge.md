---
layout: post
title: "Part 1 - Prior Knowledge"
date: 2026-03-25
description: "Prior knowledge in neural networks: every design choice encodes a structural assumption about the world."
tags: [math, machine-learning, thesis, deep-learning]
created_at: 2026-03-25
edited_at: 2026-03-31
---

(This is an unintentional pun)

---


# Prior knowledge - what we believe

The conversation around neural networks often starts with training. Loss functions, gradient descent, convergence: the machinery that turns data into predictions. But by the time training begins, the interesting decisions have already been made. How many layers, which activation, what regularization, what architecture at all. Every one of these choices encodes a belief about the problem, and every belief is a form of knowledge injected before the model has seen a single example.

What I mean *prior knowledge*  here not only in the Bayesian sense of a distribution over parameters, but in the broader one: any structural assumption about the world that gets baked into the model before data arrives. Prior knowledge is not what the model learns. It is what _humans directly teach the model_ by choosing its structure. A fully general network can in principle learn anything from data (UAT). But "can learn in principle" is not "will learn in practice." Prior knowledge tries to remove that burden: it gives the model something for free, so it doesn't waste capacity rediscovering what the designer already knew.

Technically, injecting prior knowledge constrains the model to a _subspace_ of the full function space. If the prior is correct, it contains the optimal solution. The model searches a smaller space and finds the answer faster, with less data and better generalization. The prior helps by _removing everything the model doesn't need_.

This is the mechanism by which human understanding is transferred into machine learning. The rest of this series — groups, manifolds, categories — is the formal language for describing _what_ is being transferred and _how_.

---

## No free lunch, again

The No Free Lunch theorem already tells us this: no learner beats any other across all possible problems. What makes a model work on a _particular_ problem is precisely the prior knowledge it carries: the assumptions that happen to match the "structure" of that problem.

What deserves more attention is that these assumptions are not vague. They have *mathematical content*. When a practitioner says "I chose ReLU because it works well," there is a formal claim buried in that sentence, about the geometry of the function class, the symmetry of the parameter space, the structure of learned representations. We can surface those claims. And when we do, a unified picture of neural network design starts to emerge: not as a bag of tricks, but as a systematic encoding of structural beliefs.

---

## What comes next

This article opens a four-part series that formalizes the perspective above, one mathematical lens at a time.

Part 2, on group structure: a deep linear network has a massive symmetry group. Nonlinear activations break it in specific, characterizable ways. Regularization narrows it further. We trace this symmetry reduction layer by layer, reading off each component's contribution to the model's prior knowledge.

Part 3, on path equivariance: classical equivariance (GNN) asks that a network commute with a fixed set of transformations. Path equivariance asks something richer. How should representations transform as we move *along paths on a manifold*? This shifts the question from "which transformations are irrelevant" to "how should the model's internal state evolve as it traverses the data space." Fiber bundle theory enters here and it connects surprisingly natural to neural network design.

Part 4, on category theory: we step back to the most abstract level. Category theory gives us a language for talking about *structure-preserving maps* in general without committing to a specific kind of structure. In this framework, equivariance becomes a special case of *naturality*, and the entire apparatus of groups, manifolds, and bundles can be organized into a single coherent picture.

---

## The punchline

The deep learning community has built up enormous practical intuition about what works. Behind every effective design choice sits a structural assumption that can be stated in precise mathematical terms. Stating it precisely is not an academic exercise. It tells us *why* things work, *when* they will break, and *how* to build models that carry exactly the prior knowledge a problem requires.

That is what this series is about.

---

*Articles based on the thesis "Exploring the Structure in Deep Networks: Group, Manifold and Category Theory" (Aalto University, 2025).*

*Next: Part 2, group structure in deep networks*
