---
layout: post
title: "Independence in Bayesian Network Causal Diagrams"
date: 2026-03-26
description: "Independence and conditional independence in Bayesian networks, d-separation, and the collider effect."
tags: [math, probability, machine-learning]
created_at: 2026-03-26
edited_at: 2026-03-31
---

# 1. Bayesian Network

Bayesian Network(**BN**) is composed of Directed Acyclic Graph (**DAG**) and Conditional Probability Tables (**CPT**)

In the DAG, nodes represent events, and edges represent dependencies between nodes. Each event happens (or does not happen) with conditional probability $\mathbb{P}$, where the conditional probability is given by CPT.

> Why conditional probability in CPT?

Because in a Bayesian Network, events happen sequentially. The sequence of nodes implies the sequence of events. When building the BN, an event can be observed only after observing its parents (happening or not), which means every event probability (except the sources) in the CPT is a conditional probability. The CPT encodes prior conditional probabilities based on the DAG structure. After the BN is built, we can condition on observed evidence to update these probabilities.

One can think of CPT as prior knowledge; its probabilities may change as we acquire more observations. We write $P(AB)$ for the joint probability $P(A \cap B)$ throughout this article.



_Example_
A simple BN with DAG:

```
A --> B
```

and CPT:

| $P(A)$      | $P(B \mid A)$           |
| ----------- | ---------------------- |
| $P(\neg A)$ | $P(B \mid\neg A)$      |
|             | $P(\neg B \mid A)$     |
|             | $P(\neg B \mid\neg A)$ |


We can not get ${P}(B)$ directly from CPTs, but we can calculate it using Bayes' Rule and Law of total probability

$$\begin{aligned} P(B) & =\sum_i P\left(B A_i\right) \\ & =P(B \neg A)+P(B A) \\ & =P(B \mid \neg A) P(\neg A)+P(B \mid A) P(A)\end{aligned}$$

# 2. Independent or conditional independent?

Mathematically, two events $A, B$ are independent iff $P(A | B)=P(A)$. Intuitively speaking, independence means that the change of one event's probability doesn't affect another.

For example, originally we have $P(A)=0.5, P(B)=0.5$. Then something happened, $P(B)=0.9$. Because $A$ and $B$ are independent, $P(A)$ is not affected by the change of $P(B)$, still $P(A)=0.5$.
## Case 1

Given a BN with DAG:

```
A --> B
```

and CPT:

| $P(A)$      | $P(B \mid A)$           |
| ----------- | ---------------------- |
| $P(\neg A)$ | $P(B \mid\neg A)$      |
|             | $P(\neg B \mid A)$     |
|             | $P(\neg B \mid\neg A)$ |

> Are events $A$ and $B$ independent or not? Or, is $P(B)$ affected by the change of $P(A)$?

For $P(B)$, by Bayes' Rule and Law of total probability:

$$P(B)=P(B \mid \neg A) P(\neg A)+P(B \mid A) P(A)$$

We can find $P(B | \neg A)$ and $P(B | A)$ from CPT, but we need $P(A)$ to calculate $P(B)$, which means the change of $P(A)$ affects $P(B)$.

Similar argument for $P(A)$ as independence is symmetric.

So $A$ and $B$ are not independent.

## Case 2

Given a BN with DAG:

```
A --> B --> C
```

and CPT:


| $P(A)$      | $P(B \mid A)$           | $P(C \mid B)$          |
| ----------- | ----------------------- | ---------------------- |
| $P(\neg A)$ | $P(B \mid \neg A)$      | $P(C \mid \neg B)$     |
|             | $P(\neg B \mid A)$      | $P(\neg C \mid B)$     |
|             | $P(\neg B \mid \neg A)$ | $P(\neg C \mid\neg B)$ |

> Are $A$ and $C$ independent or not? Or, is $P(C)$ affected by the change of $P(A)$?

For $P(C)$, by Bayes' Rule and Law of total probability:

$$\begin{aligned} P(C) & =\sum_i P\left(C B_i\right) \\ & =P(C \neg B)+P(C B) \\ & =P(C \mid \neg B) P(\neg B)+P(C \mid B) P(B)\end{aligned}$$

But we don't know $P(B)$ yet. So using Bayes' Rule and Law of total probability again:

$$\begin{aligned} P(B) & =\sum_i P\left(B A_i\right) \\ & =P(B \neg A)+P(B A) \\ & =P(B \mid \neg A) P(\neg A)+P(B \mid A) P(A)\end{aligned}$$

The change of $P(A)$ leads to the change of $P(B)$ (because $A\ B$ are not independent), and thus leads to the change of $P(C)$ (because $B\ C$ are not independent).

So $A$ and $C$ are not independent.

> Are $A$ and $C$ independent or not given $B$? Or, is $P(C)$ affected by the change of $P(A)$ given $P(B)$?

We can think "Given $B$" as we _refresh_ the probability of $B$, which is different from the prior $P(B)$ calculated by CPT. Formally, we condition on $B$, replacing the prior $P(B)$ with the observed value. (Loosely speaking, $P(B)$ is "fixed" after given)
Now we can calculate $P(C)$ directly using

$$\begin{aligned} P(C) & =\sum_i P\left(C B_i\right) \\ & =P(C \neg B)+P(C B) \\ & =P(C \mid \neg B) P(\neg B)+P(C \mid B) P(B)\end{aligned}$$

where $P(B)$ and $P(\neg B)$ is given by assumption, $P(C|\neg B)$ and $P(C|B)$ can be found from CPT. So the change of $P(A)$ does not affect $P(C)$

So $A$ and $C$ independent given $B$. Formally we say $A$ and $C$ are _conditionally_ _independent_ given $B$

## Case 3

Given a BN with DAG:

```
A <-- B --> C
```

and CPT:

| $P(B)$      | $P(A \mid B)$           | $P(C \mid B)$           |
| ----------- | ----------------------- | ----------------------- |
| $P(\neg B)$ | $P(A \mid \neg B)$      | $P(C \mid \neg B)$      |
|             | $P(\neg A \mid B)$      | $P(\neg C \mid B)$      |
|             | $P(\neg A \mid \neg B)$ | $P(\neg C \mid \neg B)$ |

> Are $A$ and $C$ independent or not? Or, is $P(C)$ affected by the change of $P(A)$?

For $P(A)$, by Bayes' Rule and Law of total probability:

$$\begin{aligned} P(A) & =\sum_i P\left(A B_i\right) \\ & =P(A \neg B)+P(A B) \\ & =P(A \mid \neg B) P(\neg B)+P(A \mid B) P(B)\end{aligned}$$

For $P(C)$, by Bayes' Rule and Law of total probability:

$$\begin{aligned} P(C) & =\sum_i P\left(C B_i\right) \\ & =P(C \neg B)+P(C B) \\ & =P(C \mid \neg B) P(\neg B)+P(C \mid B) P(B)\end{aligned}$$

Observing $A$ updates our belief about $B$ (since $B$ is $A$'s parent, Bayes' rule lets us infer $B$ from $A$), which in turn updates our belief about $C$. So the change of $P(A)$ does affect $P(C)$

So $A$ and $C$ are not independent.

> Are **A** and **C** independent or not given **B**? Or, is **P(C)** affected by the change of **P(A)** given **P(B)**?

Now we know the ("fixed")value of $P(B)$. We can calculate $P(A)$ (or $P(C)$) using $P(B)$ without hesitation. Intuitively, the impact of $A$ on $C$ was "blocked" by a known $B$.

So, $A$ and $C$ are _conditionally_ _independent_ given $B$

## Case 4

Given a BN with DAG:
```
A --> B <-- C
```

and CPT:

| $P(A)$      | $P(C)$      | $P(B \mid A C)$              |
| ----------- | ----------- | ---------------------------- |
| $P(\neg A)$ | $P(\neg C)$ | $P(B \mid\neg A C)$          |
|             |             | $P(B \mid A\neg C)$          |
|             |             | $P(B \mid\neg A\neg C)$      |
|             |             | $P(\neg B \mid A C)$         |
|             |             | $P(\neg B \mid\neg A C)$     |
|             |             | $P(\neg B \mid A\neg C)$     |
|             |             | $P(\neg B \mid\neg A\neg C)$ |

> Are **A** and $C$ independent or not? Or, is $P(C)$ affected by the change of $P(A)$?

Intuitively, $A$ and $C$ are source nodes, meaning they are not directly affected by any other nodes; their occurrences have no conditions. Also, we can directly find $P(A)$ and $P(C)$ from the CPT. The change of probability of one does not affect the other.

How about I use the argument in the previous example: '$A$ and $B$ are not independent, $B$ and $C$ are not independent, so the change of $A$ affects $C$ '?

The change in $P(A)$ can indeed lead to a change in $P(B)$ . But we don't know how the change of $P(B)$ would affect $P(C)$. In the previous example, we have $P(C)=P(C|\neg B)P(\neg B)+P(C|B)P(B)$, where $P(C)$ can be _determined_ by $P(B)$ and CPT. But here, for $P(B)$, we have

$$\begin{aligned} P(B)= & \sum_i \sum_j P\left(B A_i C_j\right) \\ = & P(B A C)+P(B A \neg C)+P(B \neg A C)+P(B \neg A \neg C) \\ = & P(B \mid A C) P(A C)+P(B \mid A \neg C) P(A \neg C) \\ & +P(B \mid \neg A C) P(\neg A C)+P(B \mid \neg A \neg C) P(\neg A \neg C)\end{aligned}$$

$P(B)$ is _determined_ by CPT and the _joint probability distribution_ of $AC$, we can not calculate $P(B)$ simply by CPT and $P(A)$. Even if $P(A)$ changes, we don't know how it will affect $P(B)$, therefore, we don't know how it will affect $P(C)$.

So $A$ and $C$ are independent.

> Are $A$ and $C$ independent or not given $B$? Or, is $P(C)$ affected by the change of $P(A)$ given $P(B)$?

Now we know the value of $P(B)$ and it is "fixed". $P(B)$ depends on $A$ and $C$. If we change $P(A)$, $P(C)$ would also be changed because conditioning on $B = b$ induces a constraint: $P(A, C \mid B = b) \propto P(B = b \mid A, C) P(A) P(C)$, which couples $A$ and $C$ even though they were marginally independent.

This is the "explaining away" effect: if two independent causes both contribute to an observed effect, learning about one cause changes our belief about the other. For example, if a disease can be caused by either gene A or virus C, and we observe the disease (B), then learning the patient has gene A makes virus C less likely.

So $A$ and $C$ are not independent given $B$.

The node $B$ in structure $A\rightarrow B\leftarrow C$ is called a **collider**.

# 3. Summary

These case-by-case rules are formalized as **d-separation** (directional separation), the standard framework for reading off conditional independencies from a DAG.

$A\rightarrow B$ , $A$ and $B$ are not independent.

$A\rightarrow B \rightarrow C$, $A$ and $C$ are not independent. $A$ and $C$ are _conditionally_ _independent_ given $B$

$A\leftarrow B\rightarrow C$, $A$ and $C$ are not independent. $A$ and $C$ are _conditionally_ _independent_ given $B$

$A\rightarrow B \leftarrow C$, $A$ and $C$ are independent. $A$ and $C$ are not independent given $B$

The general rule: a path between two nodes is **blocked** (d-separated) if it contains either (1) a non-collider that is conditioned on, or (2) a collider that is _not_ conditioned on (and has no conditioned descendant). Two nodes are conditionally independent given a set of observed nodes if and only if every path between them is blocked.

