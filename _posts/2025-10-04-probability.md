---
layout: post
title: "Probability"
date: 2025-10-04
description: "Probability spaces, conditional probability, random variables, independence, and expectation from measure theory."
tags: [math, probability]
created_at: 2025-10-04
edited_at: 2026-03-31
---

# 1. Confusion

**Statement**: Toss a coin, the probability of getting a head is 0.5.

There are (at least) two common interpretations of this statement: frequentist and Bayesian.

In the Frequentist interpretation, probability is defined as the long-run tests and observations. So, if we believe the statement, and we toss the coin 100 times, we will get about 50 heads, maybe 53 maybe 45, but around 50. If we toss the coin many many times , let's say A times, we will observe exactly A/2 heads.

While a Bayesian would say, "We don't know the probability at the beginning; we guess one (as a prior)." Let's (tentatively) believe the probability of getting a head is 1; it doesn't matter whether the belief is right or wrong. Then we update it with more tests. We toss it again, we observe a tail, then the probability can not be 1, we update our belief (as posterior). We toss it again, we update, we toss again... If we toss and update many many times, the belief (as the result of Bayes' theorem) is 0.5

They both intuitively make sense, but again, what does it mean for something to happen with a given probability? If I were told I have a 0.4 probability of passing an exam and can attend it only once, then either I pass it or I don't. What does it mean that I can pass it with probability 0.4? There is no such thing as 0.4 of a diploma. I will take the exam anyway, and I either pass or fail, what is the difference to me between 0.9 and 0.1 probability of passing?

# 2. (Discrete) Probability

**Definition**: A finite probability space ($\Omega$ , $\mathbb{P}$) is a finite set $\Omega$  and its (probability) measure P which satisfies
- $\mathbb{P}(\Omega)=1$
- $\forall A\subseteq \Omega,\mathbb{P}(A)\geq0$

Technically speaking, a probability space is a triple $(\Omega,\mathcal{A}, \mathbb{P})$; we omit the sigma-algebra to avoid further confusion.

Loosely speaking, probability is a function that maps events (subsets of $\Omega$) to real numbers in $[0, 1]$.

Toss a coin, the probability of getting a head is 0.5, which means: We construct a set with all the cases of tossing a coin. One case is that we get a head. The probability we are discussing is a function that maps the event "head case" to the real number 0.5.

I can pass an exam with probability 0.4; that is, there exists a function that maps the event "I pass the exam" to the real number 0.4. The probability 0.4 quantifies my uncertainty before the exam. After the exam, the outcome is determined -- but the probability was still meaningful as a guide for decision-making (e.g., how much to study).

# 3. Conditional Probability

Recall probability space $(\Omega, \mathbb{P})$

We often want to update probabilities given new information. If we learn that event $B$ has occurred, how should we reassign probabilities to other events? This leads to the definition of conditional probability.

Given a subset $B\subset\Omega$  with $\mathbb{P}(B)\geq0$, We define a new measure $\mathbb{P}^B:B\rightarrow[0,1]$ by

$$
\mathbb{P}^B(\lbrace\omega\rbrace)=\frac{\mathbb{P}(\lbrace\omega\rbrace)}{\mathbb{P}(B)} \quad \text { for } \omega \in B
$$

$\omega$ is a singleton in $B$, so each $\omega$ is disjoint with each other and $\bigcup\omega=B$

To prove $\mathbb{P}^B$  is a probability measure, we need to show $\mathbb{P}^B(B)=1$, but $\mathbb{P}^B(B)$ has not been computed yet, since $\mathbb{P}^B$ is defined only for singletons so far

By the definition of $\mathbb{P}^B$:

$$
\sum_{\omega \in B} \mathbb{P}^B(\lbrace\omega\rbrace)=\sum_{\omega \in B} \frac{\mathbb{P}(\lbrace\omega\rbrace)}{\mathbb{P}(B)}=\frac{\sum_{\omega \in B} \mathbb{P}(\lbrace\omega\rbrace)}{\mathbb{P}(B)}
$$

By the property of measure, for disjoint subsets

$$
\mu(\bigcup \omega)=\sum \mu(\omega)
$$

$$
\sum_{\omega \in B} \mathbb{P}(\lbrace\omega\rbrace)=\mathbb{P}(\bigcup\lbrace\omega\rbrace)=\mathbb{P}(B)
$$

$$
\sum_{\omega \in B} \mathbb{P}^B(\lbrace\omega\rbrace)=\frac{\mathbb{P}(B)}{\mathbb{P}(B)}=1=\mathbb{P}^B(B)
$$

So $\mathbb{P}^B$ is a probability measure defined on $B$. $(B,\mathbb{P}^B)$ is a probability space.

By the countable subadditivity for disjoint subsets. For any event $A\subset B$ , we have:

$$
\mathbb{P}^B(A)=\sum_{\omega \in A} \mathbb{P}^B(\lbrace\omega\rbrace)=\frac{\sum_{\omega \in A} \mathbb{P}(\lbrace\omega\rbrace)}{\mathbb{P}(B)}=\frac{\mathbb{P}(A)}{\mathbb{P}(B)}
$$

If $A\subset\Omega$ but $A\nsubseteq B$  , we have $A\cap B\subset B$ . So

$$
\mathbb{P}^B(A)=\frac{\mathbb{P}(A \cap B)}{\mathbb{P}(B)}
$$

Usually we denote $\mathbb{P}^B(A)$  as $\mathbb{P}(A\mid B)$ , and call it conditional probability.

Note: $\mathbb{P}(A \mid B) = \mathbb{P}(A \cap B) / \mathbb{P}(B)$ is the definition of conditional probability. Bayes' theorem is a consequence: $\mathbb{P}(A \mid B) = \mathbb{P}(B \mid A) \mathbb{P}(A) / \mathbb{P}(B)$, obtained by noting that $\mathbb{P}(A \cap B) = \mathbb{P}(B \mid A) \mathbb{P}(A)$.

# 4. Random Variable

A **random variable (RV)** is neither random nor a variable. A random variable is a function $X:\Omega\rightarrow\mathbb{R}$ . (We assume the codomain as real number for simplicity, but it can be any measurable set)

For random variable $X$, when we write "$X=k$", it means the set  $\lbrace\omega\in\Omega:X(\omega)=k\rbrace$

In this way, the notation $\mathbb{P}(X=k)$ means mapping the "$X=k$" set to real number from 0 to 1

## 4.1 Independent and uncorrelated

$X$ and $Y$ are **independent** RVs if for all measurable sets $A, B$:

$$
P(X \in A, Y \in B)=P(X \in A) \cdot P(Y \in B)
$$

Intuitively, independence means that knowing the value of one random variable gives no information about the other. Their behaviors are entirely unlinked.

For multiple RVs, $X_1\dots X_n$ . We say that they are **pairwise independent** if every pair $X_i$ and $X_j$ are independent for all i≠j. Pairwise independence is a relatively weak form of independence.

These RVs, $X_1\dots X_n$  are said to be **(fully) independent** if, for every subset $I\in[n]$ , we have

$$
\mathbb{P}\left[\bigcap_{i \in I} X_i\right]=\prod_{i \in I} \mathbb{P}\left[X_i\right]
$$

Note: Independence is expensive. For $n$ (different) nontrivial and independent binary events, the size of sample space $\lvert\Omega\rvert\geq2^n$. More generally, if each RV takes $k$ values, we need $\lvert\Omega\rvert \geq k^n$.

Two random variables $X$ and $Y$ are **uncorrelated** if their covariance is zero:

$$
\begin{gathered}
\operatorname{Cov}(X, Y)=\mathbb{E}[(X-\mathbb{E}[X])(Y-\mathbb{E}[Y])]=\mathbb{E}[XY]-\mathbb{E}[X] \mathbb{E}[Y]=0 \\
\mathbb{E}[X Y]=\mathbb{E}[X] \mathbb{E}[Y]
\end{gathered}
$$

Intuitively, uncorrelated random variables have no linear relationship between them.

Independence guarantees that $X$ and $Y$ are uncorrelated. But uncorrelated does not necessarily imply independence. RVs can be uncorrelated but non-linearly dependent.

A classic example: let $X \sim \text{Uniform}(-1, 1)$ and $Y = X^2$. Then $\text{Cov}(X, Y) = \mathbb{E}[X^3] - \mathbb{E}[X]\mathbb{E}[X^2] = 0$ (by symmetry), so $X$ and $Y$ are uncorrelated. But $Y$ is completely determined by $X$ -- they are maximally dependent.

## 4.2 Geometric explanation

Random variables are functions defined on the sample space Ω, they satisfy the axioms of a vector space. So the set of RVs forms a vector space ( Hilbert space L2(Ω) , technically)

For simplicity and WLOG, we 'shift' RVs by $X^\prime=X-\mathbb{E}[X]$ , $Y^\prime=Y-\mathbb{E}[Y]$ . Shift doesn't affect the properties of vectors. In this case, $\mathbb{E}(X)=\mathbb{E}(Y)=0$

The expectation corresponds to the inner product in $L^2$

$$
\langle X, Y\rangle=\mathbb{E}[X Y]
$$

The $L^2$-norm of $X$ is

$$
\|X\|=\sqrt{\mathbb{E}\left[X^2\right]}
$$

The variance of $X$ is its squared $L^2$-norm:

$$
\operatorname{Var}(X)=\mathbb{E}\left[(X-\mathbb{E}[X])^2\right]=\mathbb{E}\left[\left(X^{\prime}\right)^2\right]=\left\|X^{\prime}\right\|^2
$$

In this geometric picture, uncorrelated means orthogonal in $L^2$: $\langle X', Y' \rangle = \text{Cov}(X,Y) = 0$. Independence is a strictly stronger condition -- it means the joint distribution factors, not just that the inner product vanishes. Orthogonality is a statement about one number (the inner product); independence is a statement about the entire joint distribution.

# 5. Expectation

First recall **probability space** is a triple $(\Omega, \mathcal{F}, \mathbb{P})$ , where $\mathcal{F}$ is a sigma-algebra, the **probability** $\mathbb{P}$ is a function $\mathbb{P}:\mathcal{F}\rightarrow[0,1]$ that satisfies non-negativity, normalization, countable additivity.

For a continuous random variable $X$ , the **Probability Density Function** (PDF) $f(x)$ is a function such that:

$$
\mathbb{P}(a \leq X \leq b)=\int_a^b f(x) d x
$$

Or

$$
\mathbb{P}(A)=\int_A f(x) d x \quad \text { for all sets } A
$$

Note that $f(x)$ is not $P(X=x)$. Rather, $f(x)dx$ represents the infinitesimal probability that X falls in a tiny interval around $x$.

For any measurable function $g$, the **expectation** of function $g$ in probability $P$ is defined as

$$
\mathbb{E}[g(X)]:=\int g(x) d P(x)
$$

There is a bit confusing notation: $\mathbb{P}(x)$ is not a function of single point $x$, $\mathbb{P}(\cdot)$ is a measure acts on sets, not points:
- $\mathbb{P}(\lbrace x\rbrace)$ is the probability of the singleton set $\lbrace x\rbrace$
- $\mathbb{P}([a,b])$ is probability that X falls in $[a,b]$
- $\mathbb{P}(A)$ is the probability of event A

So in $\mathbb{P}(x)$, the $x$ is a notation of sets, $\mathbb{P}$ is a measure that assigns probabilities to sets.

Another slightly confusing notation: What does $d\mathbb{P}(x)$ mean?

$d\mathbb{P}(x)$ is a notation Lebesgue integration, means an infinitesimal "probability element." We can analogy it to the common $dx$ in Riemann integral which represents an infinitesimal "length element."

So in $d\mathbb{P}(x)$, the $x$ is not the input parameter for $\mathbb{P}$, it indicates the variable of integration.

A more explicit notation is:

$$
\int g \, d\mathbb{P}\quad \text { or }\quad \int g(x) \, \mathbb{P}(d x)
$$

In $\int g(x) \, \mathbb{P}(d x)$, the $x$ in $\mathbb{P}(dx)$ represents a single point in the sample space (e.g., a real number in $\mathbb{R}$).

Back to

$$
\mathbb{E}[g(X)]:=\int g(x) \, d\mathbb{P}(x)
$$

If $\mathbb{P}$ has density $f$, which means there exists a $f$ such that

$$
\mathbb{P}(A)=\int_A f(x) \, d x \quad \text { for all sets } A
$$

Then:

$$\int g(x) \, d\mathbb{P}(x)=\int g(x) f(x) \, d x$$

Note: In $\int g(x) \, d\mathbb{P}(x)$, the first $x$ in $g(x)$ means a single point, but the second $x$ in $\mathbb{P}(x)$ means a set, because $\mathbb{P}$ is a probability measure. In $\int g(x) f(x) \, d x$, all the $x$ means a single point.

## Expectation is integration

The connection emerges: expectation is integration against a probability measure. If $X \sim P$ (meaning $X$ is distributed according to $P$ ), then by definition:

$$
\mathbb{E}_{X \sim \mathbb{P}}[g(X)] {:=} \int g(x) \, d\mathbb{P}(x)
$$

If $f$ is a density for probability measure $\mathbb{P}$ , then for any measurable $g$ :

$$
\int g(x) f(x) \, d x=\int g(x) \, \mathbb{P}(d x)=\mathbb{E}_{X \sim \mathbb{P}}[g(X)]
$$

This is a common trick to study intractable integral using probability tools, especially Monte Carlo. (See PML - From Likelihood to ELBO ELBO)

Nice! Then how do we know $f$ is a density?

A function $\mathrm{f}: \mathbb{R} \rightarrow \mathbb{R}$ is a valid probability density if and only if:
1. Non-negativity:

$$
f(x) \geq 0 \quad \text { for all } x
$$

2. Normalization:

$$
\int_{-\infty}^{\infty} f(x) d x=1
$$

3. Measurability: this condition almost always satisfied.

One caveat: All the statements need $g(x)$ to be bounded or well-behaved so $\mathbb{E}[\lvert g(X)\rvert]<\infty$.

Another caveat: Density and probability are not one-to-one correspondence: Discrete distributions have no density with respect to Lebesgue measure (they do have densities with respect to counting measure); when a density exists, it's unique to probability only "almost everywhere."

## What is distribution?

Roughly it means probability of random variable $X$. The distribution of a random variable $X$ is the probability measure $P_X$ on the target space defined by:

$$
P_X(A)=P(X \in A)
$$

It tells us how probability is "distributed" across possible values of $X$.

The distribution $P_X$ is a pushforward of the original measure $P$ through the function $X$: it "pushes" the probability from the abstract sample space $\Omega$ to the concrete value space $\mathbb{R}$. This pushforward perspective becomes central in probabilistic machine learning (see the PML article for how it connects to generative models and latent variables).
