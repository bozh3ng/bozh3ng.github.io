---
layout: post
title: "Parr 4 - A Category Theory Perspective on Neural Networks"
date: 2026-03-25
description: "Equivariance is naturality: unifying groups, manifolds, and path equivariance through category theory."
tags: [math, machine-learning, thesis, deep-learning, category-theory]
created_at: 2026-03-25
edited_at: 2026-03-31
---

# A category theory perspective: what models really are

*Part 4 of 5, following [Part 1: Prior Knowledge]({% post_url 2026-03-25-thesis-prior-knowledge %}), [Part 2 - The Group Structure of Neural Networks]({% post_url 2026-03-25-thesis-group-structure %}), [Part 3 - Path Equivariance: From Groups to Geometry]({% post_url 2026-03-25-thesis-path-equivariance %})*

---

## A parable about maps

Imagine two cartographers, each tasked with mapping the same mountain range. Cartographer A produces a topographic map: contour lines, elevation, slope. Cartographer B produces a road map: highways, intersections, distances between towns. Both maps represent the same territory, but they preserve different structure. The topographic map preserves elevation relationships; the road map preserves connectivity and distance along roads. Neither is "wrong." Each is faithful to a specific *kind* of structure in the original terrain.

Now imagine a third person, not a cartographer but a philosopher of cartography, who asks: "What does it mean to make a map? What does *any* map preserve, regardless of whether it's topographic or road-based? Is there a language for talking about 'structure preservation' itself, without committing to which structure?"

That philosopher is doing (a portion of) category theory.

This final article steps back from the specific mathematics of groups and manifolds to ask a more basic question: *what is a model?* Not "what is *this* model" but "what does it mean for *any* model to be faithful to the structure of its domain?" The answer turns out to unify everything we have discussed (symmetry, equivariance, path equivariance, composition) into a single framework where the central concept is almost embarrassingly simple: a good model is one that preserves structure of observed data, and the mathematical word for "structure-preserving map" is *natural transformation*.

---

## The question behind the question

Throughout this series, we have seen the same idea in different guises.

In Part 2 (group structure): a network layer $F$ should commute with symmetry actions, $F(g \cdot x) = \rho(g) \cdot F(x)$. The layer should preserve the group structure of the data.

In Part 3 (path equivariance): a network should transport representations coherently along paths, $F(\gamma(t)) = a_\gamma(t) \cdot F(\gamma(0))$. The layer should preserve the geometric structure of the data manifold.

These look like different conditions, but they share a common shape: *apply the structural change, then the map* should equal *apply the map, then the structural change*. Commuting squares. The conditions differ only in *what kind of structure* is being preserved: a group action, a path transport, a topological invariant.

Category theory is the mathematics that captures this commonality. It says: forget the specific kind of structure. Ask only: what are the objects, what are the structure-preserving maps between them, and what does it mean for a map to be "natural," to commute with all the structural maps at once?

---

## The language: objects, arrows, functors, naturality

Let me give the minimum vocabulary needed, stripped of formalism.

A *category* is a world of things (objects) and relationships between them (morphisms/arrows). The category of vector spaces has vector spaces as objects and linear maps as arrows. The category of topological spaces has spaces as objects and continuous maps as arrows. The category of smooth manifolds has manifolds as objects and smooth maps as arrows. What makes each category different is not the objects themselves but *what counts as a valid arrow*, what structure the arrows preserve.

A *functor* is a map between categories that preserves the arrow structure. It sends objects to objects and arrows to arrows, such that composition and identity are respected. In our context: a dataset with a $G$-symmetry is a functor from the one-object category $\mathbf{B}G$ (whose arrows are the group elements) into the category of topological spaces. The functor sends the single object to the data space $X$ and sends each group element $g$ to the map $g \cdot -$ on $X$. This is a compact way of saying "$X$ is a space with a $G$-action," but the categorical language bundles the space and the action into a single object (the functor), which turns out to be exactly the right packaging.

A *natural transformation* is a map between functors that commutes with all the structural arrows. If $F$ and $E$ are two functors from $\mathbf{B}G$ to some category (two $G$-spaces), a natural transformation $\alpha: F \Rightarrow E$ is a map $\alpha: F(*) \to E(*)$ such that for every $g$:

$$\alpha \circ F(g) = E(g) \circ \alpha$$

Read this out loud: "apply the symmetry then the map" equals "apply the map then the symmetry." This is the equivariance condition. It was always a naturality condition. We just didn't have the language to see it.

---

## Equivariance *is* naturality

This is the central observation, and it deserves to be stated plainly.

When a practitioner builds a G-CNN and imposes $F(g \cdot x) = \rho(g) \cdot F(x)$, they are not inventing a special constraint for neural networks. They are requiring that their network layer be a natural transformation between functors. The commuting square, the diagram that says "act then map equals map then act," is the *same* diagram in category theory and in equivariant deep learning. The conditions are identical. The vocabulary is different.

Why does this matter? Because category theory comes with a toolkit that was developed over decades for reasoning about natural transformations, and that toolkit now applies directly to neural networks.

*Composition is free.* If layer $\alpha: F \Rightarrow E$ is a natural transformation and layer $\beta: E \Rightarrow H$ is a natural transformation, then $\beta \circ \alpha: F \Rightarrow H$ is automatically a natural transformation. In plain language: stacking equivariant layers gives an equivariant network. This is obvious when we say it in ML terms, but the categorical proof is *one line*; it follows from the universal properties of natural transformations. The correctness of deep equivariant architectures is a consequence of how arrows compose in functor categories.

*Invariant pooling is a limit.* When a network pools over group orbits (summing or averaging over all rotations of a feature, for instance) it is computing a *categorical limit* in the functor category. The universal property of limits guarantees that the result is invariant, and that any other invariant map factors through it. This gives a principled justification for why sum-pooling over orbits (as in DeepSets) is the "right" way to achieve invariance: it is the universal one.


---

## What models really are

Let me push the philosophical point further, because I think it reveals something about deep learning that the purely technical perspective misses.

A child learning to recognize cats does not memorize pixel arrays. They extract an abstract concept, "cat-ness," that generalizes to cats never seen before. What makes this possible is that the child's internal representation *preserves the relevant structure* of the visual world while *discarding the irrelevant*. The cat is the same cat whether seen from the left or the right, in sunlight or shadow, large or small in the visual field. The child's model is invariant to pose, illumination, and scale, but sensitive to the features that distinguish cats from dogs.

A neural network, at its best, does the same thing. A CNN's translation equivariance means it doesn't care *where* in the image a feature appears; it preserves spatial relationships while discarding absolute position. A group-equivariant network's symmetry means it doesn't care *which orientation* the object is in; it preserves identity while discarding pose.

Category theory gives this the sharpest possible formulation: *a model is a functor, and a good model is one whose layers are natural transformations.* The functor maps from the structured world of data (with its symmetries, paths, and geometric constraints) to the structured world of representations (with its own symmetries and constraints). Naturality, the commuting square condition, is what ensures the map is *faithful* to the structure. Not faithful to the raw data (that would be memorization) but faithful to the *relationships* in the data (that is generalization).

This is why the categorical perspective matters beyond its technical utility. It tells us what we are doing when we design a neural network: we are choosing which structure to preserve and which to discard, and the architecture is the formal expression of that choice. The functor is the map. The natural transformation is the constraint that makes it honest.

---

## Unifying the series

The four articles in this series can now be seen as four views of the same subject.

*Part 1 (prior knowledge)* asked: what does a neural network assume before training? Every design choice (architecture, activation, regularization) is prior knowledge. Category theory says: prior knowledge is the choice of source and target categories and the structure-preserving conditions imposed on the functor.

*Part 2 (group structure)* formalized one kind of structure: algebraic symmetry. The symmetry group of a network, and how it reduces from $\mathrm{GL}(n)$ through activation and regularization, describes which algebraic structure the model preserves. Category theory says: this is the choice of the indexing category $\mathbf{B}G$ and the study of the functor category $[\mathbf{B}G, \mathbf{C}]$.

*Part 3 (path equivariance)* generalized from algebraic to geometric structure: paths on manifolds, fiber bundles, content-pose decomposition. Category theory says: this is the enrichment of the indexing category from a group (discrete arrows) to a path category (continuous arrows), and the naturality condition generalizes equivariance to path-equivariance.

*Part 4 (this article)* steps back and sees them all as instances of one idea: models are functors, good layers are natural transformations, and the entire design of a neural network is a choice of *which structure to preserve*.

The fact that group equivariance, path equivariance, and compositional structure all reduce to the same categorical concept (naturality) is not a coincidence. It reflects something deep about what learning is. Learning is not curve fitting. Learning is the discovery of structure-preserving maps from the world to a representation. Category theory is the mathematics of such maps.

---

## Coda: the shape of constraints

Let me close with the idea that started this series.

Prior knowledge is not what the model learns from data. It is what humans *teach* the model by choosing its structure. A fully general network can learn anything in theory; prior knowledge means it doesn't have to. By constraining the model to a subspace of function space (the subspace of translation-equivariant functions, or rotation-equivariant functions, or path-smooth functions) we give it a smaller world to search. If our knowledge is correct, the optimal solution lives in that subspace, and the model finds it faster, with less data, and with better generalization. Prior knowledge doesn't add to the model; it removes everything the model doesn't need.

Every model is a hypothesis. Every design choice is prior knowledge. Every prior encodes a structural assumption. What category theory adds is the recognition that these structural assumptions have a *shape*: the shape of the indexing category, the shape of the commuting diagram, the shape of the functor.

When we choose a group $G$ and build a G-CNN, the shape is $\mathbf{B}G$, a single object with $G$'s worth of self-loops. When we choose path equivariance on a manifold, the shape is richer, a category of paths with composition by concatenation. When we compose equivariant layers into a deep network, the composition is functorial: structure preservation propagates through depth.

The shape of constraints is what separates a model that memorizes from a model that understands. Category theory doesn't tell us *which* shape is right for a given problem; that is the domain expert's job, the human knowledge that no amount of data can replace. But it tells us that once we've chosen the shape, the rest (the equivariance conditions, the composition rules, the invariance guarantees) follows by naturality.

And naturality is just a commuting square: act then map equals map then act. Everything else is commentary.

---

*This concludes the four-part series based on the thesis "Exploring the Structure in Deep Networks: Group, Manifold and Category Theory" (Aalto University, 2025).*
