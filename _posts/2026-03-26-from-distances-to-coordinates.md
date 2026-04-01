---
layout: post
title: "From Distances to Coordinates (Euclidean)"
date: 2026-03-26
description: "Recovering point coordinates from pairwise distances via Gram matrices and eigendecomposition."
tags: [math, linear-algebra]
created_at: 2026-03-26
edited_at: 2026-03-31
---

# Matrix as a Linear Transformation

We first review the geometry of linear maps via SVD, then recall PSD matrices, and finally apply both to the Euclidean distance problem.

A real matrix
$$
M \in \mathbb{R}^{d \times n}
$$
encodes a linear map
$$
T_M: \mathbb{R}^n \longrightarrow \mathbb{R}^d, \quad x \mapsto M x .
$$

The map can collapse dimensions.
The rank $r=\operatorname{rank}(M)$ is the number of linearly independent columns (or rows).
- Column space (image) $\mathcal{C}(M)=\lbrace M x \mid x \in \mathbb{R}^n \rbrace \subseteq \mathbb{R}^d$ is an $r$-dimensional subspace.
- Null space (kernel) $\mathcal{N}(M)=\lbrace x \in \mathbb{R}^n \mid M x=0 \rbrace$ has dimension $(n-r)$.

So although inputs live in $n$ dimensions, only an $r$-dimensional slice survives after the transformation.

If we perform SVD on $M$:
$$
M=U \Sigma V^T
$$

SVD decomposes any linear map into three steps: rotate, stretch, rotate. Specifically:

$V^T$ (or equivalently, $V$ ) is an **orthogonal matrix** $\left(V^T V=I\right)$ with shape $n\times n$,  it represents 
- pure rotation ($\det=1$, $SO$ group), 
- or an improper rotation, i.e., rotation composed with reflection ($\det=-1$)

$V^Tx$: rotate $x$ 

$\Sigma$ is a descending **singular values diagonal matrix** ( $\sigma_1 \geq \sigma_2 \geq \ldots$ ). It has same rank $r$, means *stretch* along the principal axes.
- Components aligned with the singular directions are stretched or compressed by $\sigma_i$.
- Components orthogonal to these directions are completely eliminated (mapped to zero).

$\Sigma V^Tx$: stretch $V^Tx$ along $r$ dimensions, and possibly reduce dimensions(project from $\mathbb{R}^n$ to $\mathbb{R}^d$) 

$U$: another **orthogonal matrix**, but in $\mathbb{R}^d$ 

An eigenvector of a matrix $A$ is a special vector that remains in the same direction (or is reversed) when transformed by $A$:
$$
A \mathbf{v}=\lambda \mathbf{v}
$$
Geometrically, eigenvectors are the directions that survive a linear transformation unchanged (up to scaling); the eigenvalue $\lambda$ tells you the scaling factor.
A zero eigenvalue $\lambda$ and its eigenvector $v$ means the matrix maps direction $v$ to zero.  

# Positive Semidefinite (PSD) Matrices ($S_{+}^n$)
The following statements are equivalent:
- The matrix $A \in S^n$ is positive semidefinite $(A \succeq 0)$.
- For all $x \in \mathbb{R}^n, x^T A x \geq 0$.
- All eigenvalues of $A$ are nonnegative.
- All $2^{n-1}$ principal minors of $A$ are nonnegative.
- There exists a factorization $A=B^T B$.

Remark: The second condition ($x^TAx \geq 0$ for all $x$) is generally impractical to check directly; the eigenvalue or factorization conditions are used in practice.

# Euclidean distance problem
Consider $n$ points, each in dimension $d$: 
$$x_1, \ldots, x_n \in \mathbb{R}^d$$
Can a set of points be identified uniquely from all the *pairwise distances* between them?
Yes, and these points are equivalent up to rigid transformations

## Gram matrix
For a data matrix $X\in \mathbb{R}^{d \times n}$, 
$$\tilde{G}:=X^TX\in\mathbb{R}^{n\times n}$$
Thus $\operatorname{rank}(\tilde{G})=\operatorname{rank}\left(X^T X\right)=\operatorname{rank}(X)=d$

Remark: The entries of the Gram matrix are inner products: $\tilde{G}_{ij} = \langle x_i, x_j \rangle$. This makes the PSD property immediate -- Gram matrices are always PSD by construction ($x^T \tilde{G} x = x^T X^T X x = \|Xx\|^2 \geq 0$).

In practice, we often observe pairwise distances rather than coordinates. Given $D^{(2)} \in \mathbb{R}^{n \times n}$ as the pointwise squared distance matrix, $D^{(2)}$ is symmetric (i.e., $D^{(2)} \in S^n$), but not necessarily PSD.

## Geometric centering matrix
$$
J=I_n-\frac{1}{n} \mathbb{1}\mathbb{1}^T
$$
where $I_n$ is the $n \times n$ identity matrix and $\mathbb{1}$ is the vector of ones.

Remark: $\operatorname{rank}(J)=n-1$. Multiplying by $J$ centers the data (subtracts the mean).

According to classical multidimensional scaling (cMDS), the Gram matrix can be recovered from squared distances via double centering (see e.g., Borg & Groenen, *Modern Multidimensional Scaling*, Ch. 12):
$$\tilde{G}=-\frac{1}{2} J D^{(2)} J$$

The key idea: expanding $D^{(2)}_{ij} = \|x_i - x_j\|^2 = \|x_i\|^2 - 2\langle x_i, x_j \rangle + \|x_j\|^2$ and applying the centering matrix $J$ eliminates the squared-norm terms, leaving only the inner products $\tilde{G}_{ij} = \langle x_i, x_j \rangle$.

Recall gram matrix is defined as $\tilde{G}:=X^TX\in\mathbb{R}^{n\times n}$, so our goal is to find a $\hat{X}$ has structure  $\tilde{G}=\hat{X}^T \hat{X}$.  In this case, $\hat{X}$ is a rigid transformation of the original points 

Compute the eigendecomposition 
$$\tilde{G}=Q \Lambda Q^{-1}$$
Because $\tilde{G}$ is PSD, its eigenvalues are nonnegative.
$$\lambda_1 \geq \lambda_2 \geq \ldots \geq \lambda_d > 0 = \lambda_{d+1} = \cdots = \lambda_n$$

Recall Gram matrix $\tilde{G}$ has rank $d$ , so we have $\lambda_1$ to $\lambda_d$ 

Define the $n \times d$ matrix of the first $d$ eigenvectors $Q_d$ and the square root diagonal matrix:
$$\Lambda_d^{1 / 2}:=\operatorname{diag}\left(\sqrt{\lambda_1}, \ldots, \sqrt{\lambda_d}\right) \in \mathbb{R}^{d \times d}$$
We can write the Gram matrix as 
$$\tilde{G}=Q \Lambda Q^T=\left(Q \Lambda^{1 / 2}\right)\left(\Lambda^{1 / 2} Q^T\right)$$
So
$$\hat{X}=Q_d \Lambda_d^{1 / 2}$$

Each row of $\hat{X}$ gives the coordinates of a point in $\mathbb{R}^d$, recovered from distances alone. The reconstruction is unique up to rigid transformations (rotations and reflections), which is the best we can hope for -- distances are invariant under such transformations.

This technique underlies applications in molecular distance geometry (reconstructing protein structures from NMR data), sensor network localization, and dimensionality reduction via MDS.
