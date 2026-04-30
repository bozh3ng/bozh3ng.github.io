---
layout: post
title: "TheWorldFromWithinAndWithout"
date: 2026-03-31
description: "Intrinsic and extrinsic perspectives in mathematics, physics, and philosophy."
tags: [math, differential-geometry, philosophy]
created_at: 2026-03-31
edited_at: 2026-03-31
---

*Brief introduction to intrinsic and extrinsic perspectives*

---

## Prologue: What defines a person?
This article originated from a conversation I had with a friend: How should we treat human rights? In philosophy, Kant argued that rational human beings should be treated as an end in themselves, not as a means to something else: a person has inherent dignity. Marx saw it differently: a human being is a socially constructed, creative species-being (Gattungswesen) whose nature is defined by productive labor and social relations. The self is constituted by its surroundings, by its embedding in a social world.

Even though it is controversial, if we let our analogy run wild, there are mathematically two ways of understanding the same object: *intrinsic* and *extrinsic*. At least in mathematics, neither is more correct than the other; they are just different representations of the same reality. 

What follows is a tour of this idea. I start from a confusion I had when I was a child.


## Sailing around the world

In 1522, the remnants of Magellan's expedition completed the first circumnavigation of the globe. They had demonstrated that the Earth is not "flat" (technically closed in at least one direction) — you can go all the way around.

![file-20260409162156959.svg](/assets/img/blog/the-world-from-within-and-out/file-20260409162156959.svg)

But this doesn't prove the Earth is a sphere! How do we know we're not living on a donut? The easiest (maybe not) way to determine this is to take a picture from space. But obviously people had already determined the shape of the Earth before that. If not by circumnavigation, then how?

Unfortunately, the answer to this question is not as easy as it looks, and we are not prepared to discuss it here.

But it's definitely doable, even though we don't introduce how yet. Taking a picture from space and traveling on the surface of the Earth are equivalent ways to know our Earth, corresponding to extrinsic and intrinsic. They both have the full ability to describe an object (not necessarily geometric).  

## Intrinsic and Extrinsic

Extrinsic lives with ambient space. "Ambient" just means "surrounding." An ambient space is just a larger space that an object fits in. For example we put a sphere in a 3D Euclidean space so we can parameterize it. The extrinsic view needs ambient space, contingent on the choice of ambient space. 

But one fact we must accept: an object exists by itself, ambient space is not necessary for the existence of an object. A sphere is always a sphere whether we put it in 3D Euclidean space, or a distorted high-dimensional space, or no space at all. This is the view of intrinsic. 

Roughly, intrinsic properties are determined by the object itself. Extrinsic describes the relationship between the object and its ambient. 

## Two pictures of gravity

In this section we briefly introduce Einstein's general relativity and Newton's perspective (not Newton's law) to explain gravity. The distinction between intrinsic and extrinsic is not just a mathematical curiosity. It sits at the center of one of the great transitions in physics: from Newton's picture of gravity to Einstein's.

In Newton's picture, space and time are a fixed, flat stage, an absolute backdrop against which physics unfolds. Space is Euclidean, time flows uniformly, and neither is affected by what happens within them. A planet moves through this stage, and gravity is a *force* that reaches across it and pulls objects off their natural straight-line paths. This is, at its heart, an *extrinsic* viewpoint: everything is observed against a fixed ambient background, and gravity is a deviation from flatness.

Einstein replaced this entirely with an *intrinsic* picture. In general relativity, there is no fixed stage. Space and time are not a passive backdrop but a dynamic, curved entity, *spacetime*, shaped by the distribution of mass and energy through the Einstein field equations. A planet does not sit *in* spacetime the way a ball sits in a box. The planet and the spacetime around it form one geometric structure.

In this picture, gravity is not a force. Objects in free fall, including light, follow geodesics: the straightest possible paths through curved spacetime. Light curving near a star is not being "pulled" off a straight line. It is traveling as straight as it possibly can. The apparent bending is an artifact of projecting a curved geometry onto flat expectations. There is a famous quote by John Archibald Wheeler "Matter tells spacetime how to curve, spacetime tells matter how to move."

![file-20260409162156961.png](/assets/img/blog/the-world-from-within-and-out/file-20260409162156961.png)


## Two pictures of kernel 

In machine learning, given two points $x, y$, a kernel $k(x, y)$ measures how correlated the function values $f(x)$ and $f(y)$ are. If $k(x, y)$ is large, knowing $f(x)$ tells us a lot about $f(y)$. If $k(x, y)$ is near zero, $f(x)$ and $f(y)$ are roughly independent.

In the Gaussian Process context, a kernel must be a covariance function, which is equivalent to saying a kernel must be symmetric positive semi-definite (PSD). Choosing a kernel is choosing what kind of distribution we assume before seeing data. For example, the squared exponential (SE) kernel assumes that nearby points are highly correlated and the correlation decays smoothly like a Gaussian bell curve. A widely-used SE kernel formula is

$$
k(x, y)=\sigma^2 \exp \left(-\frac{\|x-y\|^2}{2 \ell^2}\right)
$$

where $\sigma^2$ controls how much $f$ varies overall, and $\ell$ controls how quickly the correlation decays with distance. They are hyperparameters. 

But what does $\|x-y\|^2$ mean? It is the squared Euclidean distance.

So when we write this formula, we implicitly use the flat Euclidean metric as the measure of similarity. 

But recall what a kernel means: it measures how correlated $f(x)$ and $f(y)$ are. It says nothing about distance or space. Naturally, we can try to use kernels on other spaces, for example on a Riemannian manifold, by replacing the Euclidean distance with the geodesic distance:

$$
\sigma^2 \exp \left(-\frac{d_{\mathcal{M}}(x, y)^2}{2 \ell^2}\right)
$$


This immediately leads to a problem: the resulting function is not necessarily PSD, which means it is not a valid kernel (Feragen et al., 2015). The PSD-ness of the Euclidean SE kernel relies on a special algebraic property of Euclidean distance. In other words, the Euclidean SE kernel is an extrinsic formula that breaks when we try to make it intrinsic by naively swapping in the manifold's own distance.

There is an alternative definition. The Euclidean SE kernel can also be characterized as

$$
k_{\infty, \kappa, \sigma^2}(x, y)=\operatorname{cov}(f(x), f(y))
$$

where $f$ is the Gaussian process satisfying the SPDE

$$
\exp \left(-\frac{\kappa^2}{4} \Delta\right) f=\mathcal{W}
$$

Here $\Delta$ is the Laplacian, $\mathcal{W}$ is Gaussian white noise, and $\exp \left(-\frac{\kappa^2}{4} \Delta\right)$ is the (rescaled) heat semigroup. The length-scale parameter $\kappa$ controls how far correlations spread.

Every ingredient in this equation is intrinsic. The Laplace-Beltrami operator $\Delta$ is constructed from the metric tensor alone. White noise $\mathcal{W}$ requires only a measure on the space (the Riemannian volume form). No ambient space is needed. This means the equation can be written on any Riemannian manifold by simply by replacing $\Delta$ with the LaplaceBeltrami operator of that manifold, and the resulting kernel is guaranteed to be PSD (Borovitskiy et al., 2020).

Intuitively, the extrinsic view asks "how far apart are these two points?" while the intrinsic view asks "what does smoothing look like on this space?". On $\mathbb{R}^n$, the intrinsic and extrinsic definitions give exactly the same kernel, but on curved spaces, only the intrinsic one survives.

## Reference

- **Feragen, A., Lauze, F., and Hauberg, S.** (2015). Geodesic exponential kernels: When curvature and linearity conflict. _Conference on Computer Vision and Pattern Recognition (CVPR)_.
- **Borovitskiy, V., Terenin, A., Mostowsky, P., and Deisenroth, M. P.** (2020). Matérn Gaussian processes on Riemannian manifolds. _Advances in Neural Information Processing Systems (NeurIPS)_.
