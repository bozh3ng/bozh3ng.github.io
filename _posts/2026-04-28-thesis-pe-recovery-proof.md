---
layout: post
title: "Part3.5-PERecoveryProof"
date: 2026-04-28
description: "A complete proof that classical group equivariance is recovered from path equivariance under the endpoint condition, establishing classical equivariant networks as a special case of the PEN framework."
tags: [math, machine-learning, thesis, deep-learning, differential-geometry]
created_at: 2026-04-28
edited_at: 2026-04-28
---

## Context

Classical group-equivariant neural networks enforce pointwise constraints $F(g \cdot x) = \rho(g) \cdot F(x)$, requiring that inputs related by a group element $g$ produce outputs related by the same symmetry. This formulation treats data as isolated points connected by group actions.

In our thesis, we introduce **Path Equivariant Networks (PENs)**, which replace pointwise constraints with pathwise constraints: as data traverses continuous paths on a manifold, network outputs must transform coherently via transport maps. The central theoretical result, presented below, shows that classical group equivariance is recovered from path equivariance under a natural condition on path endpoints: establishing that classical equivariant networks are a special case of the PEN framework.

We present here the complete chain of definitions and proofs leading to this recovery theorem. All notation is defined within this document.

---

## Outline of the Argument

The logical chain proceeds as follows:

1. **Define path equivariance (PE).** Given a path system $\mathcal{P}$ on input space $X$ and a Lie group $A$ acting on output space $Z$, a map $F: X \to Z$ is PE if traversing any path $\gamma \in \mathcal{P}$ in $X$ induces a continuous transport $a_\gamma: [0,1] \to A$ satisfying $F(\gamma(t)) = a_\gamma(t) \cdot F(\gamma(0))$. *(Definition 2.5)*

2. **Introduce the endpoint condition.** If two paths in $G$ share the same endpoints, their transports agree at $t=1$. This allows us to define a map $\rho: G^0 \to A$ by $\rho(g) := a_\gamma(1)$, independent of path choice. *(Definitions 3.1–3.2)*

3. **Prove $\rho$ is a group homomorphism.** The path $e \to g_1 g_2$ decomposes as $e \xrightarrow{\gamma_2} g_2 \xrightarrow{\gamma_1 \cdot g_2} g_1 g_2$, and the transport along this concatenation factors as $\rho(g_1) \cdot \rho(g_2)$. *(Proposition 4.1)*

4. **Recover classical equivariance.** For any $g \in G^0$ and $x \in X$, choose a path $\gamma$ from $e$ to $g$, evaluate PE at $t = 1$, and apply the endpoint condition to get $F(g \cdot x) = \rho(g) \cdot F(x)$. *(Theorem 4.2)*

The key insight: classical equivariance relates *isolated pairs of points* $(x, g \cdot x)$. Path equivariance relates *continuous families of points* along paths. The endpoint condition collapses path-dependent transport to a point-dependent map $\rho$, recovering the classical setting. Geometrically, the endpoint condition is equivalent to trivial holonomy (a flat connection), and relaxing it yields strictly more general equivariance notions.

---

## 1. Preliminaries

**Definition 1.1** (Lie Group). A Lie group $G$ is a smooth manifold that is also a group, with smooth multiplication $m: G \times G \to G$ and inversion $i: G \to G$.

**Definition 1.2** (Identity Component). The identity component $G^0$ of a Lie group $G$ is the connected component containing the identity element $e$. Since $G$ is a Lie group (hence a topological manifold), $G^0$ is path-connected: for any $g \in G^0$, there exists a continuous path $\gamma: [0,1] \to G$ with $\gamma(0) = e$ and $\gamma(1) = g$.

**Definition 1.3** (Group Action). An action of a Lie group $G$ on a space $X$ is a continuous map $\rho: G \times X \to X$ satisfying $e \cdot x = x$ and $(g_1 g_2) \cdot x = g_1 \cdot (g_2 \cdot x)$ for all $g_1, g_2 \in G$, $x \in X$. We write $G \curvearrowright X$.

---

## 2. Path Systems and Path Equivariance

**Definition 2.1** (Path Reparametrization and Concatenation). If $\gamma: [0,1] \to X$ is a path and $\phi: [0,1] \to [0,1]$ is continuous with $\phi(0) = 0$, $\phi(1) = 1$, the reparametrized path is $\gamma \circ \phi$.

If $\gamma_1, \gamma_2$ are paths with $\gamma_1(1) = \gamma_2(0)$, their concatenation is:

$$(\gamma_1 \| \gamma_2)(t) = \begin{cases} \gamma_1(2t) & t \in [0, 1/2] \\ \gamma_2(2t - 1) & t \in [1/2, 1] \end{cases}$$

**Definition 2.2** (Path System). A path system on a topological space $X$ is a non-empty family of continuous paths $\gamma: [0,1] \to X$ that is closed under reparametrization and concatenation.

**Definition 2.3** (Group Path System). Let $G \curvearrowright X$. The group path system is:

$$\mathcal{P} = \lbrace\gamma_X: [0,1] \to X \mid \gamma_X(t) = \gamma_G(t) \cdot x \text{ for some } x \in X,\; \gamma_G: [0,1] \to G \text{ continuous},\; \gamma_G(0) = e\rbrace.$$

**Proposition 2.4.** *The group path system $\mathcal{P}$ is a path system.*

*Proof.* We verify closure under reparametrization and concatenation.

**Reparametrization.** Let $\gamma_X(t) = \gamma_G(t) \cdot x \in \mathcal{P}$ and let $\phi: [0,1] \to [0,1]$ be continuous with $\phi(0) = 0$, $\phi(1) = 1$. Define $\tilde{\gamma}_G(t) := \gamma_G(\phi(t))$. Then $\tilde{\gamma}_G$ is continuous, $\tilde{\gamma}_G(0) = \gamma_G(\phi(0)) = \gamma_G(0) = e$, and

$$(\gamma_X \circ \phi)(t) = \gamma_G(\phi(t)) \cdot x = \tilde{\gamma}_G(t) \cdot x \in \mathcal{P}.$$

**Concatenation.** Let $\gamma_{X,1}(t) = \gamma_{G,1}(t) \cdot x_1$ and $\gamma_{X,2}(t) = \gamma_{G,2}(t) \cdot x_2$ be in $\mathcal{P}$ with $\gamma_{X,1}(1) = \gamma_{X,2}(0)$. The matching condition gives $\gamma_{G,1}(1) \cdot x_1 = e \cdot x_2 = x_2$, so $x_2 = \gamma_{G,1}(1) \cdot x_1$. The concatenation is:

$$(\gamma_{X,1} \| \gamma_{X,2})(t) = \begin{cases} \gamma_{G,1}(2t) \cdot x_1 & t \in [0, 1/2] \\ \gamma_{G,2}(2t-1) \cdot \gamma_{G,1}(1) \cdot x_1 & t \in [1/2, 1] \end{cases}$$

Define the concatenated group path:

$$\tilde{\gamma}_G(t) = \begin{cases} \gamma_{G,1}(2t) & t \in [0, 1/2] \\ \gamma_{G,2}(2t-1) \cdot \gamma_{G,1}(1) & t \in [1/2, 1] \end{cases}$$

We verify: $\tilde{\gamma}_G(0) = \gamma_{G,1}(0) = e$; and continuity at $t = 1/2$ holds because

$$\lim_{t \to 1/2^+} \tilde{\gamma}_G(t) = \gamma_{G,2}(0) \cdot \gamma_{G,1}(1) = e \cdot \gamma_{G,1}(1) = \gamma_{G,1}(1) = \lim_{t \to 1/2^-} \tilde{\gamma}_G(t).$$

Therefore $(\gamma_{X,1} \| \gamma_{X,2})(t) = \tilde{\gamma}_G(t) \cdot x_1 \in \mathcal{P}$. $\square$

**Definition 2.5** (Path Equivariance). Let $G \curvearrowright X$, let $A$ be a Lie group acting on a manifold $Z$, and let $\mathcal{P}$ be a path system on $X$. A continuous map $F: X \to Z$ is **path equivariant** with respect to $\mathcal{P}$ if for every $\gamma \in \mathcal{P}$, there exists a continuous transport $a_\gamma: [0,1] \to A$ with $a_\gamma(0) = e_A$ such that

$$F(\gamma(t)) = a_\gamma(t) \cdot F(\gamma(0)) \quad \forall t \in [0,1].$$

We further assume the transport is **base-point independent**: for a group path $\gamma_G: [0,1] \to G$, the transport $a_{\gamma_G}$ depends only on $\gamma_G$, not on the choice of $x \in X$.

---

## 3. The Endpoint Condition and the Endpoint Map

**Definition 3.1** (Endpoint Condition). A path-equivariant map $F$ satisfies the endpoint condition if, for all group paths $\gamma_1, \gamma_2: [0,1] \to G^0$ with $\gamma_1(0) = \gamma_2(0) = e$ and $\gamma_1(1) = \gamma_2(1) = g$, the induced transports agree at $t = 1$:

$$a_{\gamma_1}(1) = a_{\gamma_2}(1).$$

**Definition 3.2** (Endpoint Map). Under the endpoint condition, define $\rho: G^0 \to A$ by

$$\rho(g) := a_\gamma(1),$$

where $\gamma$ is any continuous path in $G^0$ from $e$ to $g$. Since $G^0$ is path-connected, such a path exists for every $g \in G^0$, and the endpoint condition guarantees that $\rho$ is independent of the choice of path.

---

## 4. Main Results

**Proposition 4.1.** *The endpoint map $\rho: G^0 \to A$ is a group homomorphism.*

*Proof.* We verify three properties.

**(i) Identity.** Take the constant path $\gamma(t) = e$ for all $t$. Then $F(\gamma(t) \cdot x) = F(e \cdot x) = F(x)$ for all $t$, so the transport $a_\gamma(t) = e_A$ for all $t$ satisfies the path equivariance condition. Therefore $\rho(e) = a_\gamma(1) = e_A$.

**(ii) Multiplicativity.** Let $g_1, g_2 \in G^0$. Choose paths $\gamma_1: [0,1] \to G^0$ from $e$ to $g_1$ and $\gamma_2: [0,1] \to G^0$ from $e$ to $g_2$, with corresponding transports $a_{\gamma_1}$ and $a_{\gamma_2}$.

We construct a path from $e$ to $g_1 g_2$ in two stages. First traverse $\gamma_2$ (going $e \to g_2$), then apply the "shifted" path $g_2 \mapsto g_1 g_2$ corresponding to $\gamma_1$. Formally, define:

$$\tilde{\gamma}(t) = \begin{cases} \gamma_2(2t) & t \in [0, 1/2] \\ \gamma_1(2t-1) \cdot g_2 & t \in [1/2, 1] \end{cases}$$

This is continuous (at $t = 1/2$: $\gamma_1(0) \cdot g_2 = e \cdot g_2 = g_2 = \gamma_2(1)$), starts at $\tilde{\gamma}(0) = e$, and ends at $\tilde{\gamma}(1) = g_1 \cdot g_2$.

Now consider the induced paths in $X$. For any $x \in X$, the path $\tilde{\gamma}(t) \cdot x$ consists of two segments:

- **First segment** ($t \in [0, 1/2]$): the path $\gamma_2(2t) \cdot x$ starting at $x$. By path equivariance: $F(\gamma_2(2t) \cdot x) = a_{\gamma_2}(2t) \cdot F(x)$. At $t = 1/2$, this gives $F(g_2 \cdot x) = a_{\gamma_2}(1) \cdot F(x) = \rho(g_2) \cdot F(x)$.

- **Second segment** ($t \in [1/2, 1]$): the path $\gamma_1(2t-1) \cdot (g_2 \cdot x)$ starting at $g_2 \cdot x$. By path equivariance with base-point independence: $F(\gamma_1(2t-1) \cdot (g_2 \cdot x)) = a_{\gamma_1}(2t-1) \cdot F(g_2 \cdot x)$. At $t = 1$, this gives $F(g_1 g_2 \cdot x) = a_{\gamma_1}(1) \cdot F(g_2 \cdot x) = \rho(g_1) \cdot F(g_2 \cdot x)$.

Combining both segments:

$$F(g_1 g_2 \cdot x) = \rho(g_1) \cdot F(g_2 \cdot x) = \rho(g_1) \cdot \rho(g_2) \cdot F(x).$$

On the other hand, by definition of the endpoint map applied to the path $\tilde{\gamma}$ from $e$ to $g_1 g_2$:

$$F(g_1 g_2 \cdot x) = \rho(g_1 g_2) \cdot F(x).$$

Since this holds for all $x \in X$ and all $F(x) \in Z$, we conclude $\rho(g_1 g_2) = \rho(g_1) \cdot \rho(g_2)$.

**(iii) Inverses.** Let $g \in G^0$ and let $\gamma: [0,1] \to G^0$ be a path from $e$ to $g$. Define the reversed group path $\bar{\gamma}(t) := \gamma(1-t) \cdot \gamma(1)^{-1}$, which satisfies $\bar{\gamma}(0) = \gamma(1) \cdot \gamma(1)^{-1} = e$ and $\bar{\gamma}(1) = \gamma(0) \cdot g^{-1} = g^{-1}$.

Consider the concatenation $\gamma \| \bar{\gamma}$, which is a path from $e$ to $e$ (a closed loop). The endpoint condition applied to the constant path $c(t) = e$ and the loop $\gamma \| \bar{\gamma}$ gives:

$$a_{\gamma \| \bar{\gamma}}(1) = \rho(e) = e_A.$$

By the composition of transports along the concatenation:

$$a_{\gamma \| \bar{\gamma}}(1) = a_{\bar{\gamma}}(1) \cdot a_\gamma(1) = \rho(g^{-1}) \cdot \rho(g).$$

Therefore $\rho(g^{-1}) \cdot \rho(g) = e_A$, which gives $\rho(g^{-1}) = \rho(g)^{-1}$.

This completes the proof that $\rho$ is a group homomorphism. $\square$

---

**Theorem 4.2** (Recovery of Classical Group Equivariance). *Let $G \curvearrowright X$ and $A \curvearrowright Z$. Let $F: X \to Z$ be path equivariant with respect to the group path system $\mathcal{P}$ with base-point independent transport, and assume the endpoint condition holds. Then:*

$$F(g \cdot x) = \rho(g) \cdot F(x) \quad \forall g \in G^0,\; x \in X,$$

*where $\rho: G^0 \to A$ is the endpoint map, which is a continuous group homomorphism by Proposition 4.1. This is the classical group equivariance law on $G^0$.*

*Proof.* Fix $g \in G^0$ and $x \in X$. Since $G^0$ is path-connected, there exists a continuous path $\gamma: [0,1] \to G^0$ with $\gamma(0) = e$ and $\gamma(1) = g$.

Consider the group path in $X$:

$$\gamma_X(t) := \gamma(t) \cdot x.$$

This satisfies $\gamma_X(0) = e \cdot x = x$ and $\gamma_X(1) = g \cdot x$, and belongs to the group path system $\mathcal{P}$.

Since $F$ is path equivariant, there exists a continuous transport $a_\gamma: [0,1] \to A$ with $a_\gamma(0) = e_A$ such that:

$$F(\gamma_X(t)) = a_\gamma(t) \cdot F(\gamma_X(0)) = a_\gamma(t) \cdot F(x) \quad \forall t \in [0,1].$$

Evaluating at $t = 1$:

$$F(g \cdot x) = F(\gamma_X(1)) = a_\gamma(1) \cdot F(x).$$

By the endpoint condition and the definition of $\rho$ (Definition 3.2):

$$a_\gamma(1) = \rho(g).$$

Therefore:

$$F(g \cdot x) = \rho(g) \cdot F(x).$$

Since $g \in G^0$ and $x \in X$ were arbitrary, this establishes the classical equivariance law on the identity component $G^0$. $\square$

---

## 5. Discussion

The recovery theorem establishes a precise hierarchy of equivariance conditions:

- **Path equivariance** (Definition 2.5) is the most general: the transport $a_\gamma$ may depend on the entire path $\gamma$, not just its endpoints.
- **Classical group equivariance** $F(g \cdot x) = \rho(g) \cdot F(x)$ is recovered when the endpoint condition holds: the transport depends only on the endpoint $g = \gamma(1)$, not on the path taken.

The endpoint condition has a natural geometric interpretation. Given two paths $\gamma_1, \gamma_2$ from $e$ to $g$, the concatenation $\gamma_1 \| \gamma_2^{-1}$ is a closed loop at $e$. The endpoint condition requires $a_{\gamma_1}(1) = a_{\gamma_2}(1)$, i.e., the transport around any closed loop is trivial. In the language of differential geometry, this corresponds to **trivial holonomy**, or equivalently, a **flat connection** on the associated principal bundle.

This perspective suggests an intermediate notion, **homotopy equivariance**, where the transport depends only on the homotopy class of the path. Homotopic paths induce the same transport, but non-homotopic paths to the same endpoint may differ. When $G^0$ is simply connected, every two paths with the same endpoints are homotopic, and homotopy equivariance coincides with the endpoint condition. When $G^0$ has non-trivial fundamental group $\pi_1(G^0, e)$, the holonomy around topologically distinct loops may be non-trivial, yielding a strictly intermediate framework.

---

*Source: Chapter 4 of "Exploring the Structure in Deep Networks: Group, Manifold and Category Theory," M.Sc. Thesis, Aalto University, December 2025.*
