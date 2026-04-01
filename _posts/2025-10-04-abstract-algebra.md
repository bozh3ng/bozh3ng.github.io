---
layout: post
title: "Abstract Algebra"
date: 2025-10-04
description: "Groups, rings, fields, and ideals — with the Euclidean GCD algorithm as a use case."
tags: [math, algebra]
created_at: 2025-10-04
edited_at: 2026-03-31
---

We prioritize intuition over full generality; see any standard algebra textbook (e.g., Dummit & Foote) for the complete axiomatics.

Assuming we have defined the equal notation ‘=’.

# 1. Definition

A group $\langle G, *\rangle$ is a set $G$ with a binary operation $*$, and satisfies  
- Closed  
- Associative: $(a * b) * \mathrm{c}=a *(b * c)$  
- Identity element: $e * x=x * \mathrm{e}=x$  
- Inverse element: for every $a \in G$, there exists $a^{-1} \in G$ such that $a * a^{-1} = a^{-1} * a = e$

Why closure?  
Because a binary operation is closed by definition, we have the closure property naturally when we work with a binary operation.

Why associative?  
Associativity means that when composing three elements, the grouping doesn't matter -- only the sequence does. For example, subtraction fails this: $(a-b)-c \neq a-(b-c)$.

Why identity element?  
The identity element provides a neutral element under the operation: applying it changes nothing. It serves as the "do nothing" element of the group.

Why inverse element?  
The inverse guarantees that every transformation in the group can be undone. Given any $a$, we can always recover $e$ via $a * a^{-1} = e$. Note that the inverse is defined after the identity element.

A group $G$ is **abelian** if its binary operation is commutative, i.e. $(a * b)=(b * a)$.

# Rings and Fields

A **ring** is an abelian group $\langle{R},+\rangle$ combined with a new binary operation $\cdot$, denoted as $\langle{R},+, \cdot\rangle$. The new operation $\cdot$ needs to satisfy  
- Associative  
- Left distributive $a \cdot(b+c)=(a \cdot b)+(a \cdot c)$ and right distributive $(\mathrm{a}+b) \cdot \mathrm{c}=(a \cdot c)+(b \cdot c)$

The new operation doesn't need to be as strict as the group operation, but still needs to have some properties. It is closed by definition (as a binary operation), and associativity is explicitly required as a ring axiom. Distributive makes sure the two operations are neither the same nor totally unrelated; they can interact with each other. The key point of $a \cdot(b+c)$ is not that $\cdot$ acts on element $(b+c)$, but how it acts with the operation +. Note that $\cdot$ is introduced after the abelian group $\langle{R},+\rangle$; it has to adapt to the world where + already exists, they are not equal.

We can make the new operation more strict, in $\langle\mathrm{R},+, \cdot\rangle$, consider the new operation $\langle{R}, \cdot\rangle$ :  
If it is commutative: **commutative ring**  
If it has identity element: **ring with unity**  
We denote the identity in $\langle{R}, \cdot\rangle$ as $1$, which is also called **unity**. The identity in $\langle R,+\rangle$ as $0$. Note that $0 \neq 1$; if $0 = 1$, then for any $a \in R$, we would have $a = a \cdot 1 = a \cdot 0 = 0$, so the ring collapses to the trivial zero ring $\{0\}$. If $\langle\mathrm{R}, \cdot\rangle$ has inverse element for some $u \in {R}, u$ is called **unit**.  
If every element under $\langle R, \cdot\rangle$ has inverse element, except for $0$, then $\langle R,+, \cdot\rangle$ is a **division ring** (or **skew field**).

Why except $0$ (why we can't divide by zero in a ring perspective)?  
Consider $\forall a \in \mathrm{R}$  
By distributive of ring: $a \cdot 0+a \cdot 0=a \cdot(0+0)$  
By the definition of $0: a \cdot(0+0)=a \cdot 0$  
So: $a \cdot 0+a \cdot 0=a \cdot 0$  
By the definition of $0: a \cdot 0=0$  
That is, $a \cdot 0 = 0$ for all $a \in R$.  
To find the inverse element of $0$ under $\langle R, \cdot\rangle$, we need an element such that $x \cdot 0=0=1$, but $0 \neq 1$. So $0$ doesn't have an inverse under $\langle R, \cdot\rangle$.  
More precisely, the identity element for the first operation of a ring doesn't have an inverse element corresponding to the second operation of this ring.

A **field** is a commutative division ring. Or we can define it from sets:  
A **field** is a set with two operations, denote as $\langle\mathrm{R},+, \cdot \rangle$, which satisfied  
- $\langle R,+\rangle$ is an abelian group, with identity $0$  
- $\langle\mathrm{R} \backslash 0, \cdot\rangle$ is an abelian group, with identity $1$  
-  $\cdot$ and + satisfy left distributive $a \cdot(b+c)=(a \cdot b)+(a \cdot c)$ and right distributive $(a+b) \cdot c=(a \cdot c)+(b \cdot c)$  
For example, Real numbers under addition and multiplication are a field.

If $a$ and $b$ are two not $0$ elements of a ring R such that $a \cdot b=0$, then $a$ and $b$ are **0-divisors**  
For example: Two nonzero matrices $\mathbf{A}$ and $\mathbf{B}$ such that $\mathbf{AB}=\mathbf{0}$

Not all rings have 0-divisors  
An integral domain $D$ is a commutative ring with $0 \neq 1$ and containing no 0-divisors  
Loosely speaking, in an integral domain, if we want to get $0$ by $\cdot$, we must use $0$  
For example: Integer numbers under addition and multiplication are an integral domain.

**Ideal** is an abelian subgroup $I$ of ring $\langle\mathrm{R},+, \cdot\rangle$ under operation + . As for operation $\cdot$, it needs to satisfy:  
$\forall {r} \in {R}, \forall a \in {I}, {r} \cdot a \in {I}$ (left ideal), $a \cdot {r} \in {I}$ (right ideal)  
For example: Every integer $n$ generates an ideal $n\mathbb{Z}$ in the integer ring. Intuitively thinking, the entire ring R can be "contracted" to the ideal I. The ideal is generated by some elements in its ring using the second ring operation.  
Geometrically, ideals correspond to sets of polynomial equations whose solutions define geometric objects (e.g., points, curves, or surfaces). This correspondence is made precise by the Hilbert Nullstellensatz. For example: The ideal $\left(x^2+y^2-1\right)$ in $\mathbb{R}[x, y]$ corresponds to the unit circle in $\mathbb{R}^2$.

If an ideal is generated by a single element from $R$, the ideal is called **principal ideal**  
For example, Every ideal in an integer ring is a principal ideal.

An integral domain $D$ is a **principal ideal domain** (abbreviated PID) if every ideal in $D$ is a principal ideal.  
For example, The integer ring is a PID  

These algebraic structures are not just abstract -- they explain why classical algorithms work.

# 2. Use Case

Consider the Euclidean GCD algorithm:

```
EUCLIEAN(a,b)
1. A <- a and B <- b
2. while B >= 1 do
3.     R <- A (mod B)
4.     A <- B, B <- R
5. return A
```

Intuition: GCD is always a divisor of $(A \bmod B)$, this is the key property of Euclidean GCD algorithm, by iteration, we can 'purify' GCD from $(A \bmod B)$

But why does it work? Why is the final result A?

Definition: The Greatest Common Divisor (GCD) of two integers $a$ and $b$ is the largest integer $d$ such that $d \mid a$ and $d \mid b$.  
Intuitively, the GCD is the largest number that divides both $a$ and $b$ evenly.

Initially, we are given two integers $a$ and $b$, which generate the ideal $(a, b)=a \mathbb{Z}+b \mathbb{Z}$. This ideal contains all integers of the form $a x+b y$, where $\mathrm{x}, \mathrm{y} \in \mathbb{Z}$.

For simplicity and WLOG, we assume $a \geq b \geq 0$

$\langle\mathbb{Z},+, \times\rangle$ is an integral domain. The ideal of $\mathbb{Z}$ generated by two integers $a$ and $b$ is:

$$(a, b)=\lbrace x a+y b \mid x, y \in \mathbb{Z} \rbrace$$

The $\operatorname{GCD}(\mathrm{a}, \mathrm{b})$ is precisely a generator of this ideal. It's the smallest positive integer that can be expressed as a linear combination $\mathrm{ax}+\mathrm{by}$. If $b=0$, $\operatorname{GCD}(a, b)=a$ (assuming $a > 0$; by convention $\gcd(0,0) = 0$).

We also know that every ideal is PID in $\mathbb{Z}$, which means $(a, b)$ can also be generated by one integer. So every pair of integers has a GCD.

$\langle\mathbb{Z},+, \times\rangle$ is also a Euclidean Domain, which means for any two integers a and b (with $b \neq 0$ ), there exist unique integers $q$ (the quotient) and $r$ (the remainder) such that:

$$  
a=b q+r, \quad \text { with } 0 \leq r<|b|  
$$

  
So ${r}={a}-{bq}$ is a linear combination of $a$ and $b$ . What we want is their smallest linear combination. We know ${r}<|{b}|$, so we've taken a step closer.

Because $r$ is a linear combination of $a$ and $b$, and the ideal generated by two integers consists of all their linear combinations, we have $(a, b) = (b, r)$. To see this: $r = a - bq \in (a, b)$ and $a = bq + r \in (b, r)$, so $(a, b) \subseteq (b, r)$ and $(b, r) \subseteq (a, b)$. Since $a \geq b > r \geq 0$, the sequence strictly decreases, and $r$ will eventually become 0.

When ${r}=0$, the other integer is the GCD we want.

This ideal-theoretic viewpoint also gives us Bezout's identity: since $\gcd(a,b)$ generates the ideal $(a,b)$, there exist integers $x, y$ such that $\gcd(a,b) = ax + by$. The extended Euclidean algorithm computes these coefficients explicitly.

