---
layout: post
title: "Probability-0"
date: 2025-10-04
description: "Probability spaces, conditional probability, random variables, independence, and expectation from measure theory."
tags: [math, probability]
created_at: 2025-10-04
edited_at: 2026-03-31
---

# Three Layers of Probability: Formalism, Models, and Meaning

*A foundational note before any probabilistic method appears in this blog.*

## Why bother

Machine learning is built on probability. We write loss functions as expectations, treat datasets as samples from distributions, evaluate models by generalization error, and casually say things like "the probability that this image is a cat is $0.97$." The notation is so familiar that we rarely stop to ask what these probabilities *mean*, where they come from, or whether the meaning is even consistent across the different places we use them.

I think it is worth stopping. One way I have found useful for thinking about probability is to separate three layers: Kolmogorov's axioms (the formal layer), the choice of probability space modeling some real situation (the modeling layer), and the interpretation of what the numbers refer to (the interpretive layer). This is not the only way to organize the subject, but it is one that I find clarifying. The axioms are not in dispute. The modeling involves choices. The interpretation is genuinely philosophical and the right answer depends on what you are doing.

Before I discuss any probabilistic method on this blog, whether it is variational inference, score matching, Bayesian deep learning, or PAC bounds, I want to lay out these three layers cleanly. Not as a philosophy lecture, but as a habit of mind. When something feels confusing later, the confusion almost always lives at one of these layers, and naming the layer is half the work.

## Two puzzles to start

**Puzzle 1.** A commentator says, "if there is a nuclear war, $50\%$ of humanity will be eliminated." There is no ensemble of nuclear wars to count frequencies over. So what does the $50\%$ mean?

**Puzzle 2.** A fair die has probability $1/6$ of landing on each face. We say this confidently, but how do we know? We have not rolled the die infinitely many times. And classically the die is deterministic: given exact initial conditions, the outcome is fixed. So where does the $1/6$ come from?

These are not the same puzzle, but they have the same resolution. Both probabilities are claims about *information states*, not about the world directly. The dice case has a clean symmetry that makes everyone agree on the prior, so the epistemic character is hidden. The nuclear war case has no such symmetry, so the epistemic character is exposed. Same underlying logic.

## Layer 1: the formalism (Kolmogorov)

In 1933, Kolmogorov gave probability a measure-theoretic foundation. A **probability space** is a triple $(\Omega, \mathcal{F}, P)$ where:

1. $\Omega$ is the sample space, the set of possible outcomes.
2. $\mathcal{F}$ is a $\sigma$-algebra on $\Omega$, the events to which we can assign probabilities. It contains $\Omega$, is closed under complements, and is closed under countable unions.
3. $P : \mathcal{F} \to [0,1]$ is a measure satisfying:
   - **Non-negativity**: $P(A) \geq 0$ for all $A \in \mathcal{F}$.
   - **Normalization**: $P(\Omega) = 1$.
   - **Countable additivity**: for pairwise disjoint $A_1, A_2, \ldots \in \mathcal{F}$,

     $$P\left(\bigcup_{i=1}^\infty A_i\right) = \sum_{i=1}^\infty P(A_i).$$

That is the entire formal content. Every theorem of probability theory (the law of large numbers, the central limit theorem, conditional expectation, martingale convergence, ergodic theorems) is derived from these three axioms plus measure theory.

Crucially, the axioms say nothing about what $P$ *means*. They are syntax. They tell you the rules a probability assignment must obey to be internally consistent, but they do not tell you where the numbers come from or what they refer to in the world. This is the formal layer, and it is fully objective. Mathematicians do not disagree about it.

## Layer 2: modeling

To use probability for anything, you have to specify a probability space. What is $\Omega$? What is $\mathcal{F}$? What is $P$?

For a die, $\Omega = \lbrace1,2,3,4,5,6\rbrace$, $\mathcal{F} = 2^\Omega$, and $P(\lbrace i\rbrace) = 1/6$. For a neural network's predictive distribution, $\Omega$ is the output space, $\mathcal{F}$ is its Borel $\sigma$-algebra, and $P$ is a softmax over logits parametrized by weights. For a Bayesian posterior, $\Omega$ is the parameter space and $P$ is a measure built from prior times likelihood.

These specifications are not derived from the axioms. They are modeling choices. Each one involves a claim about the world: "this die is symmetric and fairly thrown," "this output distribution captures predictive uncertainty," "this prior captures my beliefs before seeing data." The axioms then constrain what follows from each choice, but the choice itself is justified by physics, symmetry, prior knowledge, or empirical fit, never by mathematics alone.

This layer is where most mistakes happen. Two examples:

- A frequentist computes a $p$-value assuming the null hypothesis defines the right probability space. If the null is misspecified, the $p$-value is meaningless, no matter how correctly the integral is evaluated.
- A Bayesian updates a posterior assuming the prior and likelihood capture the right model. If they do not, the posterior concentrates on the wrong place, no matter how exact the conjugacy.

The math inside the model is bulletproof. The map from world to model is not. This is true of every application of mathematics, and probability is not special in this respect, only in how often we forget it.

## Layer 3: interpretation

Once a model is fixed, what does $P(A) = 0.3$ actually *refer to*? Here are the main options:

**Frequentist.** Probability is long-run frequency. $P(A) = 0.3$ means that if you repeated the experiment many times, $A$ would occur about $30\%$ of the time. Natural for repeatable experiments. Awkward for one-shot events, since there is nothing to count.

**Subjective Bayesian.** Probability is degree of belief. $P(A) = 0.3$ means you would accept a bet on $A$ at three-to-seven odds. Two agents with different information can assign different probabilities and both are rational. The Dutch book argument and Cox's theorem show that any coherent system of beliefs must obey the Kolmogorov axioms.

**Objective Bayesian.** Probability is the uniquely rational belief given some information, usually fixed by symmetry or by maximum entropy. The dice $1/6$ is the canonical case: any reasonable agent given only the symmetry of the cube must assign $1/6$ to each face. Tries to keep the Bayesian view without making it personal.

**Propensity.** Probability is a physical tendency built into the system itself, not into our heads. The clearest example is quantum mechanics: the Born rule probabilities seem to be genuinely in the world. Radioactive decay rates are similar. Less natural for everyday cases.

In practice, most working scientists are pragmatic pluralists. We use frequentist tools when there is a clear repetition structure (manufacturing tolerances, particle physics cross sections), Bayesian tools when there is not (medical diagnosis on this patient, climate sensitivity, the nuclear war example), and propensity language for quantum systems. The Kolmogorov formalism is shared. The interpretation is chosen to fit the problem.

## The bridge: de Finetti's theorem

A natural worry is that the Bayesian and frequentist views talk past each other. They do not, and the reason is **de Finetti's representation theorem**.

If a sequence of events $X_1, X_2, \ldots$ is exchangeable, meaning your beliefs about it are invariant under permutation, then your subjective distribution can be written as a mixture of i.i.d. distributions:

$$
P(X_1, \ldots, X_n) = \int \prod_{i=1}^n p(X_i \mid \theta) \, \pi(\theta) \, d\theta.

$$

Frequencies emerge from beliefs as soon as you commit to the right symmetry. The frequentist's "true probability" $\theta$ becomes a latent variable; the Bayesian's prior $\pi(\theta)$ describes uncertainty over it. Long-run frequencies and degrees of belief become two ways of looking at the same mathematics.

This is the deepest reason the formalism is shared across interpretations. Kolmogorov's axioms are flexible enough to host both views, and exchangeability is the bridge between them.

## The three-layer picture, in one diagram

$$
\underbrace{\text{Kolmogorov axioms}}_{\text{syntax}} \;\longrightarrow\; \underbrace{(\Omega, \mathcal{F}, P)}_{\text{model of the world}} \;\longrightarrow\; \underbrace{\text{interpretation}}_{\text{what } P \text{ refers to}}

$$

Each layer has its own discipline. Mathematics polices the first. Empirical adequacy polices the second. Usefulness and philosophical care police the third.

When something feels confusing about probability in machine learning, ask which layer the confusion lives at. "Why does my loss not decrease" is a layer 2 question (model misspecification or optimization, not formalism). "What does it mean for my model to be $97\%$ confident on this image" is a layer 3 question (interpretation of softmax outputs, which is genuinely subtle and not settled). "Is my expectation well-defined" is a layer 1 question. Different layers, different tools.

## Why this matters for machine learning specifically

Machine learning sits awkwardly across all three layers, often without admitting it.

**Generalization theory** is mostly frequentist. PAC bounds, concentration inequalities, and the law of large numbers all assume there is a true data distribution and we are sampling i.i.d. from it. The frequentist machinery is doing real work here.

**Bayesian deep learning** is, obviously, Bayesian. Posterior over weights, predictive distribution, epistemic uncertainty. The interpretation of $P(w \mid \mathcal{D})$ is a degree of belief, not a frequency.

**Probabilistic models** (VAEs, diffusion, normalizing flows) often blur the layers. The latent variable model $p(x, z) = p(x \mid z) p(z)$ is a generative claim about the world, but the posterior $p(z \mid x)$ is usually treated Bayesianly. The training objective (ELBO) is derived as if the model is a true description, but in practice we know it is not, so the inferred posteriors are calibrated by empirical performance rather than philosophical commitment.

**Frequentist guarantees on Bayesian methods** (PAC-Bayes, posterior contraction theorems) explicitly use both interpretations at once: a Bayesian construction analyzed by frequentist criteria.

None of this is incoherent, but it is rarely made explicit. Keeping the three layers separate is what lets you reason clearly about, for example, whether a softmax output should be trusted as a probability of correctness (rarely, because the model is misspecified at layer 2), or whether a Bayesian neural network's uncertainty estimates are meaningful (depends on whether the prior is doing real work, a layer 2 question dressed up in layer 3 language).

## A working habit

For any probabilistic method I write about on this blog, I will try to be explicit about:

1. **The formalism.** What is the probability space? What measurability conditions matter?
2. **The model.** What real-world claim is being made by the choice of $\Omega$, $\mathcal{F}$, $P$? What gets ignored?
3. **The interpretation.** Are these probabilities frequencies, beliefs, propensities, or something else? What follows from the choice?

The reason is not pedantry. It is that the most interesting failures in probabilistic ML happen when one layer's success is mistakenly read as another layer's success. A model that fits the data well (layer 2 success) does not have correct uncertainties (layer 3 claim). An exact MCMC sampler (layer 1 success) does not justify the prior (layer 2 claim). A theorem with explicit constants (layer 1) does not mean the assumptions hold in your application (layer 2).

The mathematics is a tool. It is exact and trustworthy. The map from the world to the mathematics, and the meaning we assign to the mathematics on the way back, are where the real intellectual work lives.
