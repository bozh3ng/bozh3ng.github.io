---
layout: post
title: "Semidefinite Programming and Applications"
date: 2026-03-26
description: "SDP formulation, duality, and applications to Euclidean distance completion and sparse PCA."
tags: [math, optimization]
created_at: 2026-03-26
edited_at: 2026-03-31
---

# Convex
Definition: A set $S \subseteq \mathbb{R}^n$ is **convex** if for every pair of points $x_1$ and $x_2$ in $S$, the entire line segment between them also lies in $S$. Formally,

$$
x_1, x_2 \in S \quad \Longrightarrow \quad \lambda x_1+(1-\lambda) x_2 \in S \quad \text { for all } \lambda \in[0,1]
$$

The intersection of convex sets is convex.

Given a convex set $S$, a point $x \in S$ is called an **extreme point** if the only way it can appear as a convex combination

$$
x=\lambda x_1+(1-\lambda) x_2 \quad \text { with } x_1, x_2 \in S \text { and } \lambda \in(0,1)
$$

is if $x_1=x_2=x$. In other words, $x$ cannot be represented as a "nontrivial" mixture of two distinct points in $S$.
Intuition: any point in a convex set can be represented as a point on a line segment, the extreme point can only be represented as its own segment

## Examples 
For any non-zero $a \in \mathbb{R}^n$ and $b \in \mathbb{R}$, the set
- $\lbrace x \in \mathbb{R}^n: a^T x \leq 0 \rbrace$ is a **linear halfspace**
- $\lbrace x \in \mathbb{R}^n: a^T x \leq b \rbrace$ is an **affine halfspace**.
All these sets are convex.
If $n \geq 2$, then they have no extreme points.

The **nonnegative orthant** $\mathbb{R}_{+}^n:=\lbrace x \in \mathbb{R}^n: x_i \geq 0 \text{ for } i=1, \ldots, n \rbrace$ is a convex cone.

The sublevel set $\lbrace x : x^T A x + b^T x + c \leq 0 \rbrace$, where $A \succeq 0$, is convex.

A set $S \subseteq \mathbb{R}^n$ is a **cone** if $\lambda \geq 0, x \in S$ implies $\lambda x \in S$.
Not all cones are convex sets 

The set $S_{+}^n$ (PSD) matrices is a convex cone.

# Linear programming (LP)
**Linear programming** (LP) is a special kind of convex optimization. It optimizes a linear function over $\mathbb{R}_{+}^n$ (the nonnegative orthant) subject to linear constraints.
The set of all points that satisfy the constraints of an optimization problem is called a **feasible region**.
If the feasible region is non-empty, then the LP is called **feasible**.

## Primal LP formulation

$$
\begin{array}{ll}
\text { minimize } & c^T x\quad \text{(objective function)} \\
\text { subject to } & \lbrace x \in \mathbb{R}^n: A x=b, x \geq 0 \rbrace \quad \text{(feasible region)}
\end{array}
$$

where $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m$ and $x \in \mathbb{R}^n$ is the variable over which the optimization is performed.

## Dual LP formulation

$$
\begin{array}{ll}
\text { minimize } & b^T y \\
\text { subject to } & A^T y \leq c
\end{array}
$$

where $c \in \mathbb{R}^n, A \in \mathbb{R}^{m \times n}, b \in \mathbb{R}^m$ and $y \in \mathbb{R}^m$ is the variable over which the optimization is performed.
(This can be derived via Lagrange multipliers.) 

## Weak duality
For any feasible $x$ in the primal and feasible $y$ in the dual, compare their objective:

$$c^T x \geq b^T y$$

Intuition: the dual objective gives a lower bound 
Short proof: $b^T y=y^T b=y^T(A x)=\left(A^T y\right)^T x \leq c^T x$

## Strong duality
If both primal and dual problems are **feasible**, means 
- the primal set $\lbrace x \mid A x=b, x \geq 0 \rbrace$ is non-empty
- the dual set $\lbrace y \mid A^T y \leq c \rbrace$ is non-empty. 
Then they achieve exactly the same optimal value.
REMARK: Every linear program (that is feasible and bounded) is strong duality

# Semidefinite programming (SDP)
SDP generalizes LP by replacing the nonnegative orthant $\mathbb{R}_+^n$ with the cone of positive semidefinite matrices $S_+^n$.

**Semidefinite programming** (SDP) is a special kind of convex optimization problem with nice properties.
It optimizes a linear function over $S_{+}^n$  subject to linear constraints.

We consider $S^n$ with the **trace inner product**

$$\langle X, Y\rangle:=\operatorname{Tr}(X Y)=\sum_{i, j=1}^n X_{i j} Y_{i j}$$

## Primal SDP formulation
A semidefinite program (SDP) in its standard (primal) form typically looks like:

$$
\begin{array}{ll}
\text { minimize } & \langle C, X\rangle \\
\text { subject to } & X \in S^n:\left\langle A_i, X\right\rangle=b_i,i=1, \ldots, m, X \succeq 0
\end{array}
$$

where $C, A_i \in S^n, b_i \in \mathbb{R}$ and $X \in S^n$ is the variable over which the optimization is performed.

Or equivalently (the first form using the trace inner product is standard in optimization theory; the second using a linear matrix inequality is common in control theory):

$$
\begin{array}{ll}
\text { minimize } & c^T x \\
\text { subject to } & F(x):=F_0+\sum_{i=1}^m x_i F_i \succeq 0
\end{array}
$$

where
- $x \in \mathbb{R}^m$ is the variable,
- $c \in \mathbb{R}^m$ is a given cost vector,
- $F_0, F_1, \ldots, F_m$ are symmetric matrices (of the same dimension $n \times n$ ),
- $F(x) \succeq 0$ 

Example:

$$
\begin{array}{ll}
\text { minimize } & 2 x_{11}+2 x_{12} \\
\text { subject to } & x_{11}+x_{22}=1,\\ 
& \begin{pmatrix} x_{11} & x_{12} \\ x_{12} & x_{22} \end{pmatrix} \succeq 0 
\end{array}
$$

## Dual SDP formulation

$$
\begin{array}{ll}
\text { maximize } & b^T y \\
\text { subject to } & \sum_{i=1}^m A_i y_i \preceq C
\end{array}
$$

where $C, A_i \in S^n, b_i \in \mathbb{R}$ and $y \in \mathbb{R}^m$ is the variable over which the optimization is performed.

Example:

$$
\begin{array}{ll}
\text { maximize } & y \\
\text { subject to } & \begin{pmatrix} 2-y & 1 \\ 1 & -y \end{pmatrix} \succeq 0
\end{array}
$$

## Weak duality

$$\langle C, X\rangle-b^T y=\langle C, X\rangle-\sum_{i=1}^m y_i\left\langle A_i, X\right\rangle=\left\langle C-\sum_{i=1}^m A_i y_i, X\right\rangle \geq 0$$

The primal objective evaluated at any feasible matrix $X$ is greater than the dual objective evaluated at any feasible vector $y$.
The primal objective evaluated at any feasible matrix $X$ gives an *upper bound* for the optimum of $b^T y$ of the dual problem.
The dual objective evaluated at any feasible vector $y$ gives a *lower bound* for the optimum of $\langle C, X\rangle$ of the primal problem.

## Strong duality
A primal SDP formulation is called **strictly feasible** if there exists $X>0$ that satisfies the linear constraints.
A dual SDP formulation is called **strictly feasible** if there exists $y$ such such that $C-\sum_i A_i y_i>0$.
If both the primal and dual problems are strictly feasible, then their optimal solutions are equal. 

# Application
## Euclidean distance problem
From Distances to Coordinates(Euclidean)
Recall the Euclidean distance matrix completion problem. If $D^{(2)}$ misses some data, we cannot use cMDS to find the points.
We can write the entries of a squared distance matrix in terms of Gram matrix:

$$
D_{i j}^{(2)}=G_{i i}+G_{j j}-2 G_{i j}
$$

The existence of a point configuration in dimension $d$ is equivalent that the Gram matrix $G$ is of rank at most $d$.

So the problem becomes

$$
\begin{array}{ll}
\text { find } & \quad G \in S_{+}^n \\
\text { subject to } & G_{i i}+G_{j j}-2 G_{i j}=D_{i j}^{(2)}\\ 
& \sum_{i, j} G_{i j}=0 \\
& \operatorname{rank}(G)=d
\end{array}
$$

### SDP relaxation
The rank condition is not a linear constraint. We need to relax it:

$$
\begin{array}{ll}
\text { find } & \quad G \in S_{+}^n \\
\text { subject to } & G_{i i}+G_{j j}-2 G_{i j}=D_{i j}^{(2)}\\ 
& \sum_{i, j} G_{i j}=0 
\end{array}
$$

This relaxation allows the points to embed in $\mathbb{R}^k$ for some $k > d$.

One can apply cMDS to the solution obtained by the SDP relaxation to obtain a solution in $\mathbb{R}^d$. However, the previous SDP does not try to find a solution of low rank.

### Rank minimization heuristics
Flatten the graph associated with a partial Euclidean distance matrix by pulling the vertices of the graph as far from each other as possible.
Formally, we want to maximize 

$$\sum_{i, j=1}^n\left\|x_i-x_j\right\|$$

And we can prove that 

$$\sum_{i, j=1}^n\left\|x_i-x_j\right\|=2 n \operatorname{Tr}(G)$$

REMARK: Often minimize rank $(G)$ is replaced by minimize $\operatorname{Tr}(G)$, which is called the **nuclear norm heuristic**.
Geometric interpretation of minimizing $\operatorname{Tr}(G)$ is bringing vertices as close together as possible. Conversely, maximizing $\operatorname{Tr}(G)$ pushes points apart, favoring higher embedding dimension.

So now we obtain the following SDP:

$$
\begin{array}{ll}
\text { maximize } & \operatorname{Tr}(G) \\
\text { subject to } & G_{i i}+G_{j j}-2 G_{i j}=D_{i j}^{(2)}\\ 
& \sum_{i, j} G_{i j}=0 \\
& G \succeq 0
\end{array}
$$

### Nearest Euclidean distance matrix problem(EDM)
A quadratic SDP approach to find the nearest EDM is

$$
\begin{array}{ll}
\text { minimize } & \sum_{(i, j)}\left(G_{i i}+G_{j j}-2 G_{i j}-D_{i j}\right)^2 \\
\text { subject to } & \sum_{i, j} G_{i j}=0 \\
& G \succeq 0
\end{array}
$$

## PCA
Recall PCA
Consider an $n \times p$ centered data matrix $X$, where rows of $X$ contain results for different repeats of the experiment and columns of $X$ record different features.

The **covariance matrix** is 

$$\operatorname{Var}(X)=\frac{1}{n} \sum_{i=1}^n x_i^2=\frac{1}{n} X^T X$$

which is a $p\times p$ matrix

Let $\Sigma \in S_{+}^n$ be a covariance matrix. **Variance** in the direction of a unit vector $u \in \mathbb{R}^n$ is $u^T \Sigma u$.

First **principal component** is the direction that explains the most variance.
The principal components are *normalized eigenvectors* of data's covariance matrix or equivalently the *right singular vectors* of $X$.

PCA in a SDP view:
- Principal components are *linear combinations* of all variables
- We are trying to *maximize the variance* by a particular linear combination of the input variables (a direction) while constraining the number of nonzero coefficients in this combination.

Let $\Sigma \in S_{+}^n$ be a covariance matrix. We want to maximise the variance in the direction of the vector $x \in \mathbb{R}^n$.
So we have a SDP:

$$
\begin{array}{ll}
\text { maximize } & x^T \Sigma x \\
\text { subject to } & \|x\|_2=1 \\
& \operatorname{Card}(x) \leq k
\end{array}
$$

($\operatorname{Card}(x)$ denotes the number of non-zero entries of $x$)

But this optimization problem is hard because of the cardinality constraint.
Consider $X=x x^T$ :
- $X \succeq 0$
- $\operatorname{Rank}(X)=1$
- $\|x\|_2=1 \Leftrightarrow \operatorname{Tr}(X)=1$
- $\operatorname{Card}(x) \leq k \Leftrightarrow \operatorname{Card}(X) \leq k^2$
- $x^T \Sigma x=\operatorname{Tr}(\Sigma X)$

So we have an equivalent formulation:

$$
\begin{array}{ll}
\text { maximize } & \operatorname{Tr}(\Sigma X) \\
\text { subject to } & \operatorname{Tr}(X)=1 \\
& \operatorname{Card}(X) \leq k^2 \\
& \operatorname{Rank}(X)=1 \\
& X \succeq 0
\end{array}
$$

Now the convex objective $x^T \Sigma x$ becomes linear objective $\operatorname{Tr}(\Sigma X)$
Nonconvex constraint $\|x\|_2=1$ becomes linear constraint $\operatorname{Tr}(X)=1$
But problem is still nonconvex. We need to relax the rank and cardinality constraints

### Semidefinite relaxation
$X=x x^T$ and $\operatorname{Tr}(X)=1 \Rightarrow\|X\|_F=1$
$x \in \mathbb{R}^n, \operatorname{Card}(x)=k \Rightarrow\|x\|_1 \leq \sqrt{k}\|x\|_2$
$\operatorname{Card}(X) \leq k^2 \Rightarrow \mathbf{1}^T|X| \mathbf{1} \leq k\|X\|_F=k$

This is the matrix analogue of the $\ell_1$ relaxation of the $\ell_0$ constraint in compressed sensing: just as $\|x\|_1 \leq \sqrt{k}\|x\|_2$ holds when $\operatorname{Card}(x) \leq k$ (reverse Cauchy-Schwarz for sparse vectors), the constraint $\mathbf{1}^T|X|\mathbf{1} \leq k$ is a convex surrogate for the combinatorial cardinality bound.

Relaxed SDP for PCA:

$$
\begin{array}{ll}
\text { maximize } & \operatorname{Tr}(\Sigma X) \\
\text { subject to } & \operatorname{Tr}(X)=1 \\
& \mathbf{1}^T|X| \mathbf{1} \leq k \\
& X \succeq 0
\end{array}
$$

The optimal value to SDP will be an upper bound on the optimal value of the variational problem.
Let $X_1$ be the solution to SDP and $x_1$ the dominant eigenvector.
Since we replaced $\operatorname{Card}(X) \leq k^2$ by the relaxed constraint $\mathbf{1}^T|X| \mathbf{1} \leq k$, then we might not have $\operatorname{Card}\left(X_1\right) \leq k^2$ and $\operatorname{Card}\left(x_1\right) \leq k$.
If  $\operatorname{Card}\left(x_1\right) \geq k$, we can just use "simple thresholding" to set small entries to 0 

Iteration (deflation):
- $\Sigma_1=\Sigma$ to find $x_1$
- $\Sigma_2=\Sigma_1-\left(x_1^T \Sigma_1 x_1\right) x_1 x_1^T$ to find $x_2$
- ...

This deflation removes the variance explained by $x_1$, so the next SDP finds the direction of maximum remaining variance.
We can add orthogonality constraints $x_i^T x_j=0$ for $i \neq j$ to the optimization problem for all the previously found sparse principal components $x_1, \ldots, x_k$.
