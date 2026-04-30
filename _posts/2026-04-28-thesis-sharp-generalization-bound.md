---
layout: post
title: "Part2.5-ASharpGeneralizationBound"
date: 2026-04-28
description: "Orbit directions are trivially flat, inflating sharpness estimates. Quotient-space sharpness factors out reparametrization symmetry for tighter generalization bounds."
tags: [math, machine-learning, thesis, deep-learning]
created_at: 2026-04-28
edited_at: 2026-04-28
---

# A preliminary idea

As argued in [Part 2: The Group Structure of Neural Networks]({% post_url 2026-03-25-thesis-group-structure %}), valid gradient descent should cross the orbit, because within an orbit all weights are functionally equivalent, this is the reparametrization symmetry of neural networks. In standard training this is trivial: since the objective is to minimize loss, and the loss is constant along orbits, the gradient is automatically orthogonal to orbit directions. No special machinery is needed.

However, this symmetry structure becomes consequential when measuring generalization. Sharpness-Aware Minimization (SAM) (Foret et al., 2021) characterizes generalization by perturbing parameters within an $\epsilon$-ball and measuring the worst-case loss increase. The intuition is that flat minima where the loss is insensitive to perturbation are associated with better generalization (Hochreiter & Schmidhuber, 1997; Keskar et al., 2017).

The problem is that orbit directions are trivially flat: perturbing along an orbit never increases the loss. When we measure sharpness over an $\epsilon$-ball in parameter space, these orbit directions consume volume in the perturbation ball while contributing nothing to the worst-case loss increase. 

This has two consequences. First, sharpness measurements are biased low: the landscape appears flatter than it actually is, because the orbit-flat directions pull down the average curvature. Second, sharpness measurements become incomparable across models with similar functional capacity but different widths. A wider network with a larger symmetry group therefore has more trivially flat directions, making its sharpness artificially lower regardless of the actual functional geometry of the loss landscape. This complicates the use of sharpness as a proxy for generalization in neural architecture comparison (Dinh et al., 2017).

To address this, we define sharpness on the quotient manifold $\mathcal{M}=\Theta / G$, restricting perturbations to directions that change the network function. 

Compared with full-space sharpness:

$$
S_{\text {full }}^\epsilon(\theta)=\max _{\delta \in \mathbb{R}^d,\|\delta\| \leq \epsilon}[L(\theta+\delta)-L(\theta)]
$$

we define quotient sharpness:

$$
S_{\text {quot }}^\epsilon(\theta)=\max _{\delta \in \mathcal{H}_\theta,\|\delta\| \leq \epsilon}[L(\theta+\delta)-L(\theta)]
$$

Here $\mathcal{H}_\theta$ is the orthogonal complement of the orbit tangent space at $\theta$. By confining the perturbation ball to functionally distinct directions, the resulting sharpness measure captures genuine sensitivity of the network function to parameter changes, without the confound of reparametrization symmetry.


# Reference

- Foret, P., Kleiner, A., Mobahi, H., & Neyshabur, B. (2021). Sharpness-Aware Minimization for Efficiently Improving Generalization. _ICLR 2021_.
- Hochreiter, S. & Schmidhuber, J. (1997). Flat Minima. _Neural Computation_, 9(1), 1–42.
- Keskar, N. S., Mudigere, D., Nocedal, J., Smelyanskiy, M., & Tang, P. T. P. (2017). On Large-Batch Training for Deep Learning: Generalization Gap and Sharp Minima. _ICLR 2017_.
- Dinh, L., Pascanu, R., Bengio, S., & Bengio, Y. (2017). Sharp Minima Can Generalize for Deep Nets. _ICML 2017_.
