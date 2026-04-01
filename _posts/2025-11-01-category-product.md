---
layout: post
title: "Category Product"
date: 2025-11-01
description: "The categorical product via universal property, with arguments about arrow direction and coproducts."
tags: [math, category-theory]
created_at: 2025-11-01
edited_at: 2026-03-31
---

**Definition**: Let $\mathcal{C}$ be a category and let $A,B$ be objects in $\mathcal{C}$ . A product of $A$ and $B$ is a triple $(P, \pi_1, \pi_2)$ where 
- $P$ is an object in $\mathcal{C}$, often denoted $A\times B$
- $\pi_1:P \rightarrow A$ and $\pi_2:P \rightarrow B$ are two morphisms (called projections) in $\mathcal{C}$
such that the following universal property holds:
For all objects $X$ in $\mathcal{C}$ and for all pairs of morphisms $f:X\rightarrow A$ and $g:X\rightarrow B$ , there exists a unique morphism $h: X \rightarrow P$ such that the diagram
![file-20251101200333551.png](/assets/img/blog/category-product/file-20251101200333551.png)
commutes

This definition is more informative than it looks. Here is my attempt at an explanation. 

Remark:  
1. Product does not in general exist.  
2. Strictly, the product is the triple $(A\times B, \pi_1, \pi_2)$, not just $A\times B$. We often write just $A\times B$ by abuse of notation.

The idea is we want to connect two objects $A$ and $B$, the compound is another object $A\times B$ (we assume the product exists in the category). We want $A\times B$  to be well-defined, which means given $A$ and $B$, there should be only one $A\times B$ (up to isomorphism).  

How do we characterize $A$ and $B$? By Yoneda, an object is determined by all morphisms into (or out of) it. So specifying "for all $X$ and all $f: X \to A$, $g: X \to B$" is the categorical way of pinning down $A$ and $B$ via their incoming arrows. A unique morphism $h: X \rightarrow P$ means no matter how we 'probe' $A$ and $B$, the factorization through $P$ is unique. (Note: the uniqueness of $h$ for each pair $(f,g)$ is different from the uniqueness of $P$ itself. That $P$ is unique up to isomorphism follows from a separate argument: any two products are canonically isomorphic via the universal property.)

In fact, the universal property says precisely that $\mathrm{Hom}(X, A \times B) \cong \mathrm{Hom}(X, A) \times \mathrm{Hom}(X, B)$, naturally in $X$. This is the Yoneda perspective made concrete: the product is the object that represents the functor $X \mapsto \mathrm{Hom}(X, A) \times \mathrm{Hom}(X, B)$.

Now we connect $A$ and $B$ uniquely, which is $P$, but what is the direction of the arrow between $A$ (or $B$ ) and $P$? One can argue that the direction $\pi_1:P \rightarrow A$ is given by definition, but this is not the only feasible definition. By duality, there exists a coproduct with reversed arrows: $\iota_1: A \to P$, $\iota_2: B \to P$. In $\mathbf{Set}$, the product is the Cartesian product while the coproduct is the disjoint union -- they are genuinely different constructions. In this case, we characterize $A$ and $B$ using their out-arrows, and $\iota_1:A \rightarrow P$ also needs to be reversed. Why does the projection direction depend on how we characterize objects? In other words, why this diagram 

![file-20251101203753170.png](/assets/img/blog/category-product/file-20251101203753170.png)
is not a correct definition? 

Argument 1: Assume that $P$ makes this diagram commute, then $P$ is the product we want. If we set $P$ as the initial object, the initial object has a unique morphism to every object, so this reversed diagram would be satisfied trivially. But this gives the wrong answer: in $\mathbf{Set}$, the product of two non-empty sets cannot be empty.  

Argument 2: $\pi_1$ and $f$ are not in general unique, so in this case
![file-20251101204803846.png](/assets/img/blog/category-product/file-20251101204803846.png)
By composition, there would exist a morphism $P\rightarrow X$, but it need not be unique, violating the universal property. So this candidate fails. 

In fact, the reversed-arrow diagram is precisely the definition of the coproduct. The question "why isn't this the product?" becomes "why aren't products and coproducts the same?" In general categories, they differ: in $\mathbf{Set}$, the product is the Cartesian product $A \times B$ while the coproduct is the disjoint union $A \sqcup B$. The two constructions coincide only in special settings (e.g., finite biproducts in $\mathbf{Ab}$).

