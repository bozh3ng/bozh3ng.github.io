---
layout: post
title: "Yoneda Perspective"
date: 2026-03-25
description: "Understanding the Yoneda Lemma and its deep implications in category theory."
tags: [math]
created_at: 2026-03-25
edited_at: 2026-03-25
---

Recall Yoneda Lemma: For any functor $F: \mathbf{C} \rightarrow\mathbf{Set}$, whose domain $\mathbf{C}$ is locally small and any object $c \in \mathrm{C}$, there is a bijection  

$$  
\operatorname{Nat}(\mathbf{C}(c,-), F) \cong F c  
$$  

that associates a natural transformation $\alpha: \mathbf{C}(c,-) \Rightarrow F$ to the element $\alpha_c\left(1_c\right) \in F c$. Moreover, this correspondence is natural in both $c$ and $F$.

This equation contains more information than it first appears. Surprisingly, the content is quite intuitive.

# What it means? 

$F: \mathbf{C} \rightarrow\mathbf{Set}$ is **any** (covariant) functor on $\mathbf{C}$
$\mathbf C(c,-):\mathbf C\to\mathbf{Set}$ is the representable functor at $c\in \mathbf{C}$. It sends an object $x$ to the hom-set $\mathbf{C}(c, x)$ and an arrow $g$ : $x \rightarrow y$ to the post-composition map $g \circ-: \mathbf{C}(c, x) \rightarrow$ $\mathbf{C}(c, y)$
$\operatorname{Nat}(\mathbf{C}(c,-), F)$ is the set of natural transformations $\alpha$ : $\mathbf{C}(c,-) \Rightarrow F$, each element is a family of functions $\alpha_x: \mathbf{C}(c, x) \rightarrow F x$ that is natural in $x$.

Yoneda lemma says for every object $c\in \mathbf{C}$ and every functor $F: \mathbf{C} \rightarrow \mathbf{Set}$ , there is a **bijection** between $\operatorname{Nat}(\mathbf{C}(c,-), F)$ and $Fc\in \mathbf{Set}$. The natural transformation $\alpha \in \operatorname{Nat}(\mathbf{C}(c,-), F)$ is determined by $\alpha_c\left(1_c\right) \in F c$. 

It is worth noting that this bijection is not merely a set-level bijection but a **natural** one, meaning it preserves the one-to-one correspondence uniformly as the objects vary. This naturality is what allows the comparison between categories related to $\mathbf{C}$.


## Remark: Large and small
(We mean class-size and set-size)
$\mathbf{C}$ need not be small, just locally small, meaning $\mathbf{C}$ itself can be a proper class.
$F$, or $\mathbf{C}(c,-)$, collapses $\mathbf{C}$ to set-size $Fc\in\mathbf{Set}$, or $\mathbf{C}(c,x)\in\mathbf{Set}$. 

So $Fc$, or $\mathbf{C}(c,x)$ is small, but $F$ or  $\mathbf{C}(c,-)$ consists one set(and one function) for every object (and arrow) of $\mathbf{C}$, can be large. 

Yoneda says that when the domain functor is representable ($\mathbf{C}(c,-)$ in our case), a natural transformation is encoded by one single set element ($\alpha \longleftrightarrow \alpha_c\left(1_c\right) \in F c$ in our case), so the whole hom-object ( $\operatorname{Nat}(\mathbf{C}(c,-), F)$ in our case) is small (isomorphic to $Fc$ in our case).

$\operatorname{Nat}(\mathbf{C}(c,-), F)$ is set-size, but its member $\alpha$ is a class-size family $\lbrace\alpha_x\rbrace$. The gigantic family $\lbrace\alpha_x\rbrace$ is determined by a single set element  $\alpha_c\left(1_c\right)$. This is not just a technicality -- it is a remarkable compression: a family indexed by a proper class (all objects of $\mathbf{C}$) is completely encoded by one element of one set ($Fc$).

# A concrete example
Consider the category $\mathbf{FinSet}$ of finite sets. Let $c = \lbrace*\rbrace$ (a one-element set). The representable functor $\mathbf{FinSet}(\lbrace*\rbrace, -)$ sends a set $X$ to the set of functions $\lbrace*\rbrace \to X$, which is just $X$ itself. So $\mathbf{FinSet}(\lbrace*\rbrace, -) \cong \mathrm{Id}$ is the identity functor.

Now take any functor $F: \mathbf{FinSet} \to \mathbf{Set}$. The Yoneda Lemma says:

$$\operatorname{Nat}(\mathbf{FinSet}(\lbrace*\rbrace, -), F) \cong F(\lbrace*\rbrace)$$

A natural transformation from the identity functor to $F$ is completely determined by a single element of $F(\lbrace*\rbrace)$. "Probing with a point determines the natural transformation."


# Philosophy
An object is determined up to unique isomorphism by how all other objects map into (or out of) it.

An object is determined by its relationships to other objects.

Suppose we want to study an object $c \in \mathbf{C}$. For every object $c \in \mathbf{C}$ there are two functors built only from the hom-sets of $\mathbf{C}$ : covariant and contravariant. We now switch to the contravariant version, which embeds $\mathbf{C}$ into the presheaf category $[\mathbf{C}^{\mathrm{op}}, \mathbf{Set}]$ (the covariant version embeds into $[\mathbf{C}, \mathbf{Set}]$ and works analogously):

$$Y_c:=\mathbf{C}(-, c): \mathbf{C}^{\mathrm{op}} \longrightarrow\mathbf{Set}$$

means all arrows into $c$ in category $\mathbf{C}$

Recall Yoneda: 

$$
\operatorname{Nat}(\mathbf{C}(-,c), F) \cong F c
$$

We suppose $F=\mathbf{C}(-,d)$, so for any two objects $c, d \in \mathbf{C}$, we have a natural bijection:

$$
\operatorname{Nat}(Y c, Y d) \cong \mathbf{C}(c, d)
$$

where $Y c=\mathbf{C}(-, c)$ and $Y d=\mathbf{C}(-, d)$.

The LHS $\operatorname{Nat}$ gives a functor category : $[\mathbf{C}^{\mathrm{op}},\mathbf{Set}]$ , whose 

- Objects: functors $\mathbf{C}^{\mathrm{op}} \longrightarrow\mathbf{Set}$. $Yc,Yd$ in our case. 
- Nat between functors mentioned above. $\operatorname{Nat}(Y c, Y d)$ in our case

In $\mathbf{C}$ we have $f:c\longrightarrow d$
In $[\mathbf{C}^{\mathrm{op}},\mathbf{Set}]$ we have $Yf:Yc\longrightarrow Yd$
Bijection give us: $\boxed{f:c\longrightarrow d}\longleftrightarrow \boxed{Yf:Yc\longrightarrow Yd}$ 
Naturality gives us: $\boxed{f}\longleftrightarrow\boxed{Yf}$ , $\boxed{c}\longleftrightarrow\boxed{Yc}$, $\boxed{d}\longleftrightarrow\boxed{Yd}$
So we have a functor : 

$$Y:\mathbf{C}\longrightarrow[\mathbf{C}^{\mathrm{op}},\mathbf{Set}]$$

$$c\mapsto\mathbf{C}(-, c)$$

which is **full and faithful** (so it reflects isomorphisms: $Yc \cong Yd$ implies $c \cong d$)

- "Faithful: different arrows $f, g: c \rightarrow d$ give different natural transformations, so $Y$ never loses information about morphisms."
- "Full: every natural transformation $Y c \Rightarrow Y d$ comes from exactly one arrow $f: c \rightarrow d .^{\prime \prime}$

Suppose we want to study $c\in\mathbf{C}$, $Y$ embeds $\mathbf{C}$ inside the much larger category $[\mathbf{C}^{\mathrm{op}},\mathbf{Set}]$, maps $c$ to  $\mathbf{C}(-, c)$ which means all arrows into $c$ in category $\mathbf{C}$. Because $Y$ is full and faithful, studying all arrows into $c$ is equivalent to studying $c$ itself. 
Any object $c$ is determined by all its surroundings into (or out of) arrows.
