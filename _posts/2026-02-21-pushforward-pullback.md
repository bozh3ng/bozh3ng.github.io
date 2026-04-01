---
layout: post
title: "Pushforward and Pullback"
date: 2026-02-21
description: "Pushforward and pullback in differential geometry and probability, with the duality between vectors and forms."
tags: [math, differential-geometry]
created_at: 2026-02-21
edited_at: 2026-03-31
---

We work in the context of differential geometry. Roughly speaking, pushforward and pullback describe how to transport geometric objects (vectors, functions, forms) between manifolds using smooth maps. Pushforward transports objects "forward" along a map, pullback brings them "back" against it.

# Pre: Vector

At the most basic level, a vector is an element of a vector space, a set in which we can add and scale elements. But this abstract definition doesn't tell us what a vector **looks like**. Most of the time, we think of vectors through concrete pictures that depend on context.

## Arrow

This is the most intuitive picture. A vector is an arrow with a direction and magnitude. In $\mathbb{R}^n$, the vector $(2,3)$ is an arrow pointing from the origin in the direction $(2,3)$ with length $\sqrt{13}$.

But this picture is not always available. Sometimes we need an intrinsic definition that does not depend on an ambient space. If an object (e.g., a manifold) is defined abstractly, without an ambient space, vectors (e.g., tangent vectors) should still exist. The arrow picture breaks down because there is no surrounding space for the arrows to point into.

## Equivalence class of curves

Technically speaking, a tangent vector at $p$ is an equivalence class of curves passing through $p$ with the same velocity. Two curves $\gamma_1, \gamma_2: \mathbb{R} \rightarrow M$ with $\gamma_1(0)=\gamma_2(0)=p$ represent the same tangent vector if, in any coordinate chart, they have the same derivative at $t=0$ :

$$
\left.\frac{d}{d t}\left(\phi \circ \gamma_1\right)\right|_{t=0}=\left.\frac{d}{d t}\left(\phi \circ \gamma_2\right)\right|_{t=0}
$$

The intuition: a direction at $p$ is determined by all the curves that "leave $p$ the same way." No single curve is the vector - the whole equivalence class is.

This definition is intrinsic and geometric, but algebraically awkward: defining addition and scalar multiplication of equivalence classes requires extra work.

## Derivation (function on functions)

We can also define a vector as a function. A tangent vector at $p$ is a linear $\operatorname{map} v: C^{\infty}(M) \rightarrow \mathbb{R}$ satisfying the Leibniz rule. As we will see, it acts on smooth functions by computing directional derivatives.

This definition is intrinsic and algebraically clean, but requires accepting a less intuitive idea: a vector eats functions and returns a scalar.

All three pictures are formally equivalent (we omit the proof).

# Pre: Tangent vector

We use the derivation picture to define tangent vectors.

**Definition**. Let $M$ be a smooth manifold and $C^{\infty}(M)$ the set of all smooth functions $M \rightarrow \mathbb{R}$. A tangent vector $v \in T_p M$ at a point $p$ is a linear map $v: C^{\infty}(M) \rightarrow \mathbb{R}$ that satisfies the Leibniz rule: for any $g, h \in C^{\infty}(M)$,

$$
v(g h)=v(g) \cdot h(p)+g(p) \cdot v(h) .
$$

(**Remark**: The Leibniz rule forces vector be the first derivative.)

Two things follow immediately:
1. A tangent vector is always anchored to a specific point $p$. The tangent space $T_p M$ is the collection of all tangent vectors at that point.
2. A tangent vector is a function - it takes a smooth function (with codomain $\mathbb{R}$) as input and returns a real number.

>How to think of a vector as a function that acts on functions?

Think of $g: M \rightarrow \mathbb{R}$ not as an abstract function but as a measurement on $M$, for instance, the temperature at each point on the Earth's surface. A tangent vector $v \in T_p M$ encodes a direction of motion at $p$. Then $v(g)$ answers the question: "if I start at $p$ and move in direction $v$, how fast does the temperature change?" The output is a single number: a rate of change.
In $v(g)$, the vector $v$ is not an arrow; it is an encoding of directional information. The direction is fully determined by knowing the rate of change of *every* smooth function along it.

>Why use this encoding?

We seek intrinsic definitions, i.e., definitions that depend only on the manifold itself, not on a choice of ambient space.

This reflects a deep idea: duality. There are often two complementary ways to describe the same object.
- Direct description (what it is): a vector is an "arrow" in space.
- Indirect description (how other objects interact with it): a vector is determined by the rates of change it assigns to all possible functions.

Neither description is more "real"; they carry the same information.

**Remark**: This duality is about **representation**, not the same duality between tangent vectors and forms.

**Example**. Consider a single point in $\mathbb{R}^2$, say $(3,2)$. There are two ways to characterize this point:
- Direct description: specify the point by its coordinates $(3,2)$.
- Indirect description: specify the point by how every linear functional acts on it. The functional $( 1,0 )$ returns 3. The functional $( 0,1 )$ returns 2. The functional $( 1,1 )$ returns 5. The collection of all these answers uniquely determines the point.

In category theory, this principle, that an object is determined by how all other objects map into (or out of) it, is formalized as the Yoneda lemma(check Yoneda Perspective).

>Why must $v$ eat functions with codomain $\mathbb{R}$ ?

The Leibniz rule $v(g h)=v(g) \cdot h(p)+g(p) \cdot v(h)$ uses multiplication and addition of real numbers. If $g$ mapped into an arbitrary manifold $N$ instead of $\mathbb{R}$, these operations would not be defined: you cannot multiply two points on a manifold.

>What if we have a smooth map $f: M \rightarrow N$ between manifolds and want to know "how tangent vectors on $M$ relate to tangent vectors on $N$"?

We cannot write $v(f)$, because $f$ is not real-valued. This is exactly where the pushforward comes in: instead of $v$ acting on $f$, we use $f$ to transport $v$ itself from $T_p M$ to $T_{f(p)} N$. As we will see, when $N=\mathbb{R}$, this reduces to the simple case of $v$ acting on a function: the pushforward $f_* v$ is a tangent vector in $T_{f(p)} \mathbb{R} \cong \mathbb{R}$, which is just the number $v(f)$.

# Pre: Differential

Some related What is dx?.

## Single-variable calculus

We have a (possibly nonlinear) function $f: \mathbb{R} \rightarrow \mathbb{R}$ and a point $p$.
Based on $f$ and $p$, we build a new, separate linear function called the differential at $p$ :

$$
\begin{aligned}
d f_p: \mathbb{R} &\rightarrow \mathbb{R} \\
h &\mapsto f^{\prime}(p) \cdot h
\end{aligned}
$$

Its input $h$ is a perturbation from $p$, its output $f^{\prime}(p) \cdot h$ is a perturbation from $f(p)$. The number $f^{\prime}(p)$ (called the derivative) defines the best linear approximation:

$$
f(p+h) \approx f(p)+f^{\prime}(p) \cdot h
$$

So the derivative $f^{\prime}(p)$ is a number, and the differential $d f_p$ is the linear map "multiply by that number." In single-variable calculus, they are the same thing.

## Multivariable calculus

Given $f: \mathbb{R}^m \rightarrow \mathbb{R}^n$, the derivative at $p$ is the Jacobian matrix $J_p$. The differential is the linear map:

$$
\begin{aligned}
d f_p: \mathbb{R}^m &\rightarrow \mathbb{R}^n \\
h &\mapsto J_p \cdot h
\end{aligned}
$$

A small perturbation $h$ near $p$ gets mapped to a small perturbation $J_p h$ near $f(p)$. Again, $J_p$ defines the best linear approximation:

$$
f(p+h) \approx f(p)+J_p \cdot h
$$

## Manifolds

In $\mathbb{R}^m$, we write $p+h$ since addition is defined. On a manifold, adding a vector to a point is not defined.

> How to apply a perturbation $h$ to a point $p$ on a manifold?

The tangent space $T_p M$ is exactly the space of infinitesimal displacements at $p$; it captures all directions we could move from $p$. So $T_p M$ replaces $\mathbb{R}^m$ as the domain of the differential, and $T_{f(p)} N$ replaces $\mathbb{R}^n$ as the codomain:

$$
d f_p: T_p M \rightarrow T_{f(p)} N
$$

But not just any linear map, the differential is the unique linear map satisfying the condition $\left(d f_p(v)\right)(g)=v(g \circ f)$, which is the intrinsic reformulation of "best linear approximation".

# Pushforward

## What is it?  - The Differential

**Definition**. Given a smooth map $f: M \rightarrow N$, the pushforward at a point $p \in M$ is a linear map between tangent spaces:

$$
f_*: T_p M \rightarrow T_{f(p)} N
$$

Not just any linear map, it is the unique linear map satisfying:

$$
\left(f_* v\right)(g)=v(g \circ f)
$$

for all $v \in T_p M$ and all smooth $g: N \rightarrow \mathbb{R}$.

Let's unpack all the objects in this equation:
- $f: M \rightarrow N$ is a smooth map between manifolds
- $v \in T_p M$ is a tangent vector at $p$
- $f_*: T_p M \rightarrow T_{f(p)} N$ is the pushforward
- $f_* v \in T_{f(p)} N$ is the pushed-forward tangent vector
- $g: N \rightarrow \mathbb{R}$ is a measurement on $N$
- $g \circ f: M \rightarrow \mathbb{R}$ is the composition $M \xrightarrow{f} N \xrightarrow{g} \mathbb{R}$

The left side asks: what is the rate of change of $g$ in the direction $f_* v$ on $N$ ? The right side answers: it equals the rate of change of $g \circ f$ in the direction $v$ on $M$.

Consequence: The pushforward is exactly the differential at $p$ :

$$
f_*=d f_p: T_p M \rightarrow T_{f(p)} N
$$

> Why are they the same?

They describe the same linear map from two perspectives:
- "Differential" emphasizes: it is the generalization of the derivative to manifolds - the best linear approximation of $f$ at $p$, acting on infinitesimal displacements.
- "Pushforward" emphasizes: it transports tangent vectors from $M$ to $N$ along $f$ - a vector at $p$ gets "pushed forward" to a vector at $f(p)$.

The "best linear approximation" has the same format as "pushforward": $\left(d f_p(v)\right)(g)=v(g \circ f)$.

**Example (Computation)**. Let $f: \mathbb{R} \rightarrow \mathbb{R}^2$ with $f(t)=\left(t^2, t^3\right)$. Let $v=\left.\frac{d}{d t}\right\|_{t=1}$ and $g(x, y)=x+y$.
- Directly (via the right side): $g \circ f(t)=t^2+t^3$, so $v(g \circ f)=\left.\frac{d}{d t}\left(t^2+t^3\right)\right\|_{t=1}=2+3=5$.
- Pushforward (via the left side): First compute $f_* v$. The Jacobian (which we will explain later) at $t=1$ is $\left.\left(2 t, 3 t^2\right)\right\|_{t=1}=(2,3)$, so $f_* v=2 \frac{\partial}{\partial x}+3 \frac{\partial}{\partial y}$ at the point $(1,1)$. Then $\left(f_* v\right)(g)=2 \frac{\partial}{\partial x}(x+y)+3 \frac{\partial}{\partial y}(x+y)=2+3=5$

**Example (Geometric)**. Let $f: \mathbb{R} \rightarrow \mathbb{R}^2$ with $f(t)=(\cos t, \sin t)$, parametrizing the unit circle. The pushforward of $\frac{d}{d t}$ at $t_0$ is:

$$
f_*\left(\frac{d}{d t}\right)=-\sin t_0 \frac{\partial}{\partial x}+\cos t_0 \frac{\partial}{\partial y}
$$

This is the velocity vector of the circle: the tangent vector gets pushed from $\mathbb{R}$ into $\mathbb{R}^2$.

**Example (Physical)**. Suppose $f: \mathbb{R} \rightarrow M$ is a hiking trail on the Earth's surface, parametrized by time $t$. At time $t_0$, our velocity is $\left.\frac{d}{d t}\right\|_{t_0}$, a tangent vector on $\mathbb{R}$.

The pushforward $f_*\left(\left.\frac{d}{d t}\right\|_{t_0}\right)$ is our velocity vector on the Earth's surface - it tells us which direction we're walking and how fast.

If $g: M \rightarrow \mathbb{R}$ is the temperature function, then:

$$
f_*\left(\frac{d}{d t}\right)(g)=\frac{d}{d t}(g \circ f)
$$

The left side says: push our velocity to the Earth, then measure the rate of temperature change in that direction. The right side says: just differentiate temperature-along-the-trail with respect to time.

## How to calculate it? - Jacobian

The pushforward $f_*: T_p M \rightarrow T_{f(p)} N$ is an abstract linear map between tangent spaces. To actually compute it, we need coordinates: a way to label points with numbers. Once we choose coordinates on both manifolds, this linear map is represented by the Jacobian matrix.

> Jacobian, differential, pushforward.

The Jacobian is just the best linear approximation of $f$ at $p$, expressed as a matrix. The pushforward (differential) is the same thing without committing to coordinates.
Broadly speaking: the pushforward is the coordinate-free concept; the Jacobian is its matrix representation in a particular coordinate system.

Suppose we have coordinates $\left(u^1, \ldots, u^m\right)$ on $M$. These coordinates give $T_p M$ a basis, the set of partial derivative operators:

$$
\left\lbrace\left.\frac{\partial}{\partial u^1}\right\|_p, \ldots,\left.\frac{\partial}{\partial u^m}\right\|_p\right\rbrace
$$

Each $\left.\frac{\partial}{\partial u^i}\right\|_p$ is itself a tangent vector, the one corresponding to "move in the $u^i$-direction only." Together they form a basis for $T_p M$. Any tangent vector $v \in T_p M$ can be written as:

$$
v=a^1 \frac{\partial}{\partial u^1}+\cdots+a^m \frac{\partial}{\partial u^m}
$$

The numbers $\left(a^1, \ldots, a^m\right)$ are the components of $v$ in these coordinates. Now $v$ looks like a familiar column vector. The components depend on the choice of coordinates: change coordinates and the components change, but $v$ itself stays the same.

Now suppose we also have coordinates $\left(y^1, \ldots, y^n\right)$ on $N$. The map $f: M \rightarrow N$, written in these coordinates, becomes:

$$
f\left(u^1, \ldots, u^m\right)=\left(f^1(u), \ldots, f^n(u)\right)
$$

Both $T_p M$ and $T_{f(p)} N$ now have bases. A linear map is completely determined by what it does to basis vectors, so it suffices to compute $f_*\left(\frac{\partial}{\partial u^i}\right)$ for each $i$. By the chain rule (we omit the process):

$$
f_*\left(\frac{\partial}{\partial u^i}\right)=\sum_j \frac{\partial f^j}{\partial u^i} \frac{\partial}{\partial y^j}
$$

The coefficient of $\frac{\partial}{\partial y^j}$ is $\frac{\partial f^j}{\partial u^i}$. Collecting all these coefficients gives the Jacobian matrix:

$$
J=\begin{pmatrix}
\frac{\partial f^1}{\partial u^1} & \cdots & \frac{\partial f^1}{\partial u^m} \\
\vdots & \ddots & \vdots \\
\frac{\partial f^n}{\partial u^1} & \cdots & \frac{\partial f^n}{\partial u^m}
\end{pmatrix}
$$

For a tangent vector $v=a^i \frac{\partial}{\partial u^i}$, the pushforward in components is:

$$
f_* v \longleftrightarrow J\begin{pmatrix}
a^1 \\
\vdots \\
a^m
\end{pmatrix}
$$

Analogize in linear algebra: a linear map $A: V \rightarrow W$ is abstract, but once we choose bases for $V$ and $W$ and express vectors as columns of components, $A$ is represented as a matrix.

**Example**. Let $f: \mathbb{R}^2 \rightarrow \mathbb{R}^3$ with $f(s, t)=\left(s^2, s t, t^3\right)$. The coordinates on $\mathbb{R}^2$ are $(s, t)$, giving the basis $\left\lbrace\frac{\partial}{\partial s}, \frac{\partial}{\partial t}\right\rbrace$ for $T_p \mathbb{R}^2$. The coordinates on $\mathbb{R}^3$ are ( $x, y, z$ ), giving the basis $\left\lbrace\frac{\partial}{\partial x}, \frac{\partial}{\partial y}, \frac{\partial}{\partial z}\right\rbrace$ for $T_{f(p)} \mathbb{R}^3$.

The Jacobian:

$$
J=\begin{pmatrix}
2 s & 0 \\
t & s \\
0 & 3 t^2
\end{pmatrix}
$$

At $p=(1,1)$, for the tangent vector $w=2 \frac{\partial}{\partial s}+3 \frac{\partial}{\partial t}$ :

$$
f_* w \longleftrightarrow\begin{pmatrix}
2 & 0 \\
1 & 1 \\
0 & 3
\end{pmatrix}\binom{2}{3}=\begin{pmatrix}
4 \\
5 \\
9
\end{pmatrix}
$$

So $f_* w=4 \frac{\partial}{\partial x}+5 \frac{\partial}{\partial y}+9 \frac{\partial}{\partial z}$, a tangent vector at $f(1,1)=(1,1,1)$ in $\mathbb{R}^3$.

# Pre: Form

A form can be understood as a measurement for vectors. It eats vectors and returns a real number.

## 0-form

A 0-form eats zero tangent vectors; it just returns a number at each point. This is simply a function:

$$
g: M \rightarrow \mathbb{R}
$$

## 1-form

A 1-form eats one tangent vector and returns a number:

$$
\omega_p: T_p M \rightarrow \mathbb{R}
$$

It is a linear map from the tangent space to $\mathbb{R}$. Given a direction, it returns a measurement of that direction.

On $\mathbb{R}^n$ with coordinates $\left(x^1, \ldots, x^n\right)$, the basis 1-forms are $\left\lbrace d x^1, \ldots, d x^n\right\rbrace$ .They are defined by basis tangent vectors:

$$
d x^i\left(\frac{\partial}{\partial x^j}\right)=\delta_j^i= \begin{cases}1 & \text { if } i=j \\ 0 & \text { if } i \neq j\end{cases}
$$

The 1-form $d x^i$ asks: "what is the $x^i$-component of the vector?"

A general 1-form is a linear combination:

$$
\omega=b_1 d x^1+\cdots+b_n d x^n
$$

And it acts on a tangent vector $v=a^1 \frac{\partial}{\partial x^1}+\cdots+a^n \frac{\partial}{\partial x^n}$ by:

$$
\omega(v)=\sum_i b_i a^i
$$

This is just a dot product between $\left(b_1, \ldots, b_n\right)$ and $\left(a^1, \ldots, a^n\right)^T$.

The simplest 1-form is differential. Given a function $g: M \rightarrow \mathbb{R}$, its differential $d g$ is a 1-form defined by:

$$
d g(v)=v(g)
$$

In coordinates:

$$
d g=\sum_i \frac{\partial g}{\partial x^i} d x^i
$$

For example, if $g(x, y)=x^2+y$, then $d g=2 x d x+d y$.

## 2-form

A 2-form eats two tangent vectors and returns a number:

$$
\omega_p: T_p M \times T_p M \rightarrow \mathbb{R}
$$

with two key properties:
1. Linear in each input
2. Antisymmetric: $\omega(v, w)=-\omega(w, v)$

A 1-form measures something along a line (one direction). A 2-form measures something across a surface (two directions). Specifically, it measures the oriented area of the parallelogram spanned by two tangent vectors.

We won't pursue this further here.

# Pullback

We introduce the pullback with 0-forms and 1-forms.
The pullback goes in the opposite direction of $f$. Given $f: M \rightarrow N$, the pullback $f^*$ transports forms from $N$ back to $M$.

## Pullback on 0-forms

The simplest case. A 0-form on $N$ is just a function $g: N \rightarrow \mathbb{R}$. The pullback is precomposition:

$$
f^* g=g \circ f: M \rightarrow \mathbb{R}
$$

If $g$ measures temperature on $N$, then $f^* g$ measures "the temperature at wherever $f$ sends you" on $M$.

**Example**. Let $f: \mathbb{R}^2 \rightarrow \mathbb{R}^3$ with $f(s, t)=\left(s^2, s t, t^3\right)$ and $g(x, y, z)=x+2 y+z$:

$$
f^* g=g \circ f(s, t)=s^2+2 s t+t^3
$$

## Pullback on 1-forms

Given $f: M \rightarrow N$, the pullback $f^*$ takes as input a 1-form on $N$ and produces a 1-form on $M$ :

$$
\begin{gathered}
f^*: \Omega^1(N) \rightarrow \Omega^1(M) \\
\omega \mapsto f^* \omega
\end{gathered}
$$

The 1-form $f^* \omega$ is defined by:

$$
\left(f^* \omega\right)_p(v)=\omega_{f(p)}\left(f_* v\right)
$$

Let's unpack this equation:
- $v \in T_p M$ is a tangent vector on $M$
- $f_* v \in T_{f(p)} N$ is its pushforward to $N$
- $\omega_{f(p)}$ is the 1-form $\omega$ evaluated at $f(p)$, which eats tangent vectors on $N$
- We feed $f_* v$ to $\omega_{f(p)}$ and get a real number
- This number becomes the output of $\left(f^* \omega\right)_p(v)$

In words: to evaluate the pulled-back form on a vector $v$ in $M$, push $v$ forward to $N$, then feed it to $\omega$ there.

Remark: The pullback does not have its own independent formula. It is defined entirely through the pushforward. The pullback is really just a wrapper: it takes $\omega$, combines it with $f_*$, and packages the result as a new 1-form on $M$.

**Example (Computation)**. Let $f: \mathbb{R}^2 \rightarrow \mathbb{R}^3$ with $f(s, t)=\left(s^2, s t, t^3\right)$.
Take the 1-form $\omega=x d y+z d x$ on $\mathbb{R}^3$.
To pull it back, we substitute:
- $x=s^2, y=s t, z=t^3$
- $d x=d\left(s^2\right)=2 s d s$
- $d y=d(s t)=t d s+s d t$

So:

$$
\begin{aligned}
f^* \omega & =s^2(t d s+s d t)+t^3(2 s d s) \\
& =\left(s^2 t+2 s t^3\right) d s+s^3 d t
\end{aligned}
$$

The result is a 1-form on $\mathbb{R}^2$, expressed in the coordinates $(s, t)$. The form $\omega$ lived on $\mathbb{R}^3$; the pullback $f^* \omega$ lives on $\mathbb{R}^2$.

There is a clear correspondence between pushforward and pullback:

|           | Pushforward                         | Pullback                                   |
| --------- | ----------------------------------- | ------------------------------------------ |
| Notation  | $f_*$                               | $f^*$                                      |
| Input     | tangent vector on $M$               | 1-form on $N$                              |
| Output    | tangent vector on $N$               | 1-form on $M$                              |
| Direction | $M\rightarrow N$                    | $N\rightarrow M$                           |
| Type      | $f_*: T_p M \rightarrow T_{f(p)} N$ | $f^*: \Omega^1(N) \rightarrow \Omega^1(M)$ |

> Why does a tangent vector correspond to a 1-form? Why does $T_p M$ correspond to $\Omega^1(N) ?$

Because they are **dual** to each other. A tangent vector is a direction; a 1-form is a measurement of a direction. They pair together to produce a number: $\omega(v) \in \mathbb{R}$.

The duality means two complementary descriptions of the same geometry, it forces:
- If a vector go forward ( $M \rightarrow N$ via $f_*$ )
- Then its form must come back ( $N \rightarrow M$ via $f^*$ )
- The pairing between them is preserved: computing on $M$ or on $N$ gives the same number.

Remark: This duality is about **complementarity**.

# Halftime break

>What is a vector?

In differential geometry, a vector at a point $p$ is a linear map $v$ : $C^{\infty}(M) \rightarrow \mathbb{R}$ satisfying the Leibniz rule. It encodes directional information: feed it a function, it returns the rate of change of that function in its direction.

>What is a tangent vector?

A tangent vector is a vector anchored to a specific point, an element $v \in T_p M$ of the tangent space at $p$.

>What is a form?

A $k$-form eats $k$ tangent vectors and returns a number. A 1 -form is dual to a tangent vector: tangent vectors are directions, forms are measurements of directions. Together they pair to produce a number: $\omega(v) \in \mathbb{R}$.

>What is the differential?

The differential of a smooth map $f: M \rightarrow N$ at a point $p$ is a linear map $d f_p: T_p M \rightarrow T_{f(p)} N$. It is the best linear approximation of $f$ at $p$, acting on infinitesimal displacements.

>What is the pushforward?

The pushforward $f_*: T_p M \rightarrow T_{f(p)} N$ is the same map as the differential. It satisfies $\left(f_* v\right)(g)=v(g \circ f)$. "Differential" emphasizes linear approximation; "pushforward" emphasizes transporting vectors from $M$ to $N$.

>What is the Jacobian?

The Jacobian is the matrix representation of the pushforward in a particular coordinate system. The pushforward is coordinate-free; the Jacobian is what you get when you choose coordinates.

>What is the pullback?

The pullback $f^*: \Omega^1(N) \rightarrow \Omega^1(M)$ is a map that transports forms from $N$ back to $M$, satisfying $\left(f^* \omega\right)_p(v)=\omega_{f(p)}\left(f_* v\right)$. It is dual to the pushforward: vectors go forward, forms come back, and the pairing between them is preserved.

# Continue: Probability space

Let's review some probability concepts before defining pushforward in this context.

**Definition**. A probability distribution $p$ on a space $X$ assigns a probability to subsets of $X$ :

$$
p: \text { subsets of } X \rightarrow[0,1]
$$

with $p(X)=1$ (total probability is 1 ).

**Example**. Let $X=\mathbb{R}$. The standard normal distribution $\mathcal{N}(0,1)$ assigns:

$$
p([a, b])=\int_a^b \frac{1}{\sqrt{2 \pi}} e^{-x^2 / 2} d x
$$

**Remark**: In the discrete case, we can also write $p(x)$ for individual points, and these are actual probabilities: $p(x) \in[0,1]$. In the continuous case, $p(x)$ is the density which can be greater than 1. But always $\int p(x) d x=1$.

**Definition**. The expectation of a function $g: X \rightarrow \mathbb{R}$ under a distribution $p$ is the weighted average of $g$, weighted by $p$ :

$$\mathbb{E}_p[g]=\int_X g(x) \cdot p(x) d x$$

We can think of this as two functions on the same set $X$ :
- $p$ assigns a weight to each point
- $g$ assigns a value to each point

The expectation $\mathbb{E}_p[g]$ is the weighted average of $g$ 's values, with the weights are $p(x)$.

## Pushforward is a distribution

Given:
- A probability distribution $p$ on a space $X$
- A measurable function $f: X \rightarrow Y$

We want to build a distribution on $Y$. But we have no direct knowledge about probabilities on $Y$. We only know:
1. A distribution on $Y$ must assign a probability to each subset $A \subseteq Y$
2. The only distribution we have is $p$, which measures subsets of $X$
3. The only connection between $X$ and $Y$ is $f$

So given a subset $A \subseteq Y$, we map it back to $X$ using preimage $f^{-1}(A)\subseteq X$. Thus we connect distributions in $X$ and $Y$. The distribution of $Y$ calculated in this way is denoted as $f_{\sharp} p$, called pushforward.

In mathematical language,

$$\left(f_{\sharp} p\right)(A)=p\left(f^{-1}(A)\right)$$

> We could put any distribution on $Y$. Why is the pushforward special?

Because it is the unique distribution that faithfully represents what actually happens when we apply $f$ to samples from $p$.
If we repeatedly sample $x$ from $p$, compute $f(x)$, and record the result, the histogram of results converges to $f_{\sharp} p$. No other distribution on $Y$ has this property. This is the only distribution that correctly describes "sample from $p$, then apply $f$."

>Why call $f_{\sharp} p$ "pushforward"?

Because we are "pushing" the distribution $p$ through the function $f$ from $X$ to $Y$. The result $f_{\sharp} p$ is a distribution on $Y$.

## Pullback in Expectation

In probability, the pullback is the same idea as the 0-form pullback. Given $f: X \rightarrow Y$ and a function $g: Y \rightarrow \mathbb{R}$ :

$$
f^* g=g \circ f: X \rightarrow \mathbb{R}
$$

If $g$ is an observable on $Y$, then $f^* g$ is the corresponding observable on $X$.

In probability, we can connect pushforward and pullback through expectation:

$$
\mathbb{E}_{f_{\sharp} p}[g]=\mathbb{E}_p[g \circ f]=\mathbb{E}_p\left[f^* g\right]
$$

The left side says: push the distribution to $Y$, then average $g$ there. The right side says: pull the function back to $X$, then average it under the original distribution.

This is the change of variables formula (also called the transfer theorem or image measure theorem). The weighted sum of $g$ in probability $f_{\sharp} p$ is the same as the weighted sum of $g \circ f$ in probability $p$.

If we think of the distribution $p$ not as a function on points but as a linear functional that eats functions and returns numbers:

$$
\begin{aligned}
& p: C(X) \rightarrow \mathbb{R} \\
& p(g)=\mathbb{E}_p[g]=\int g d p
\end{aligned}
$$

then $p$ is a measurement device for functions, just as a 1-form $\omega$ is a measurement device for vectors. The expectation equation

$$\mathbb{E}_{f_\sharp p}[g]=\mathbb{E}_p\left[f^* g\right]$$

becomes the probability version of the pairing preservation in differential geometry:

$$\omega\left(f_* v\right)=\left(f^* \omega\right)(v)$$

However, there is a subtle difference.
- In differential geometry we pushforward vector $v \rightarrow f_* v$, which is the thing being measured.
- In probability theory we pushforward distribution $p \rightarrow f_{\sharp} p$, which is the measurement device.

This is a genuine difference, not just notation. The fundamental difference is their categorial structure:
- A covariant functor sends $f: A \rightarrow B$ to a map $F(f): F(A) \rightarrow F(B)$
- A contravariant functor sends $f: A \rightarrow B$ to a map $F(f): F(B) \rightarrow F(A)$

Pushforward is always covariant. Pullback is always contravariant.
- In differential geometry: vectors are covariant (pushforward), forms are contravariant (pullback)
- In probability: distributions are covariant (pushforward), functions are contravariant (pullback). The functor $X \mapsto \text{Prob}(X)$ that sends $f: X \to Y$ to $f_\sharp: \text{Prob}(X) \to \text{Prob}(Y)$ is known as the probability monad.

The abstract structure is the same: a covariant functor paired with a contravariant functor, with the pairing preserved. But the roles are swapped: in differential geometry, the "measurement device" (1-form) is contravariant, so the "thing being measured" (vector) is covariant. In probability, the "measurement device" (distribution) is covariant, so the "thing being measured" (observable/function) is contravariant. The swap happens because distributions pair with functions the same way vectors pair with 1-forms -- but distributions live on the "vector side" of the duality.

# Others

Although I introduced these concepts procedurally. We want to linearize manifold -> vector -> we want to transform vector -> differential (pushforward) -> how to calculate -> Jacobian -> we want a measurement of vectors -> form -> we want to transform form -> pullback. But there is no logical chain starting from "simple" definitions and building to "advanced" ones. They are patterns that exist simultaneously across all of mathematics. We did not invent the pushforward because we needed a distribution on $Y$ or a map between tangent spaces. Everything has an appropriate structure; we just use different terms to describe this structure in different contexts.
