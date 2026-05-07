// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-",
    title: "",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/index.html";
          },
        },{id: "nav-about",
          title: "about",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/about/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Curriculum Vitae.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-flappy",
          title: "flappy",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/flappy/";
          },
        },{id: "post-part2-5-asharpgeneralizationbound",
        
          title: "Part2.5-ASharpGeneralizationBound",
        
        description: "Orbit directions are trivially flat, inflating sharpness estimates. Quotient-space sharpness factors out reparametrization symmetry for tighter generalization bounds.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-sharp-generalization-bound/";
          
        },
      },{id: "post-part3-5-perecoveryproof",
        
          title: "Part3.5-PERecoveryProof",
        
        description: "A complete proof that classical group equivariance is recovered from path equivariance under the endpoint condition, establishing classical equivariant networks as a special case of the PEN framework.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-pe-recovery-proof/";
          
        },
      },{id: "post-pml-1-map-mle-kl",
        
          title: "PML-1 MAP MLE KL",
        
        description: "MAP vs MLE as point estimates, global parameters vs per-example latent variables, the ELBO, and why the two directions of KL divergence give fundamentally different approximations.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/pml-1/";
          
        },
      },{id: "post-part5-penholonomyandsingletangentfallacy",
        
          title: "Part5-PENHolonomyandSingleTangentFallacy",
        
        description: "Path equivariant networks via parallel transport, holonomy-controlled expressivity, and why the single tangent space approach fails on curved manifolds.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-pen-holonomy/";
          
        },
      },{id: "post-theworldfromwithinandwithout",
        
          title: "TheWorldFromWithinAndWithout",
        
        description: "Intrinsic and extrinsic perspectives in mathematics, physics, and philosophy.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/the-world-from-within-and-out/";
          
        },
      },{id: "post-semidefinite-programming-and-applications",
        
          title: "Semidefinite Programming and Applications",
        
        description: "SDP formulation, duality, and applications to Euclidean distance completion and sparse PCA.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/semidefinite-programming/";
          
        },
      },{id: "post-independence-in-bayesian-network-causal-diagrams",
        
          title: "Independence in Bayesian Network Causal Diagrams",
        
        description: "Independence and conditional independence in Bayesian networks, d-separation, and the collider effect.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/independence-bayesian-networks/";
          
        },
      },{id: "post-pml-2-from-likelihood-to-elbo",
        
          title: "PML-2 From Likelihood to ELBO",
        
        description: "The probabilistic ML pipeline: notation, likelihood, ELBO derivation, and the reparameterization trick for VAEs.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/from-likelihood-to-elbo/";
          
        },
      },{id: "post-from-distances-to-coordinates-euclidean",
        
          title: "From Distances to Coordinates (Euclidean)",
        
        description: "Recovering point coordinates from pairwise distances via Gram matrices and eigendecomposition.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/from-distances-to-coordinates/";
          
        },
      },{id: "post-yoneda-perspective",
        
          title: "Yoneda Perspective",
        
        description: "Understanding the Yoneda Lemma and its deep implications in category theory.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/yoneda-perspective/";
          
        },
      },{id: "post-part1-priorknowledge",
        
          title: "Part1-PriorKnowledge",
        
        description: "Prior knowledge in neural networks: every design choice encodes a structural assumption about the world.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-prior-knowledge/";
          
        },
      },{id: "post-part3-pathequivariance",
        
          title: "Part3-PathEquivariance",
        
        description: "Generalizing group equivariance to path equivariance on manifolds, with fiber bundles and the content-pose decomposition.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-path-equivariance/";
          
        },
      },{id: "post-part2-groupstructure",
        
          title: "Part2-GroupStructure",
        
        description: "How activation functions and regularization break the symmetry group of deep networks, traced from GL(n) through specific subgroups.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-group-structure/";
          
        },
      },{id: "post-part4-categorytheoryperspective",
        
          title: "Part4-CategoryTheoryPerspective",
        
        description: "Equivariance is naturality: unifying groups, manifolds, and path equivariance through category theory.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-category-theory/";
          
        },
      },{id: "post-pushforward-pullback",
        
          title: "Pushforward Pullback",
        
        description: "Pushforward and pullback in differential geometry and probability, with the duality between vectors and forms.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/pushforward-pullback/";
          
        },
      },{id: "post-what-is-dx",
        
          title: "What is dx?",
        
        description: "What dx means: from calculus infinitesimals to differential 1-forms on manifolds.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/what-is-dx/";
          
        },
      },{id: "post-category-product",
        
          title: "Category Product",
        
        description: "The categorical product via universal property, with arguments about arrow direction and coproducts.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/category-product/";
          
        },
      },{id: "post-product",
        
          title: "Product",
        
        description: "Products across mathematics: inner/outer/cross products, Kronecker, group products, tensor products, and their universal properties.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/product/";
          
        },
      },{id: "post-probability-0",
        
          title: "Probability-0",
        
        description: "Probability spaces, conditional probability, random variables, independence, and expectation from measure theory.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/probability/";
          
        },
      },{id: "post-pca",
        
          title: "PCA",
        
        description: "PCA as eigendecomposition of the covariance matrix, its SVD implementation, and why it works.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/pca/";
          
        },
      },{id: "post-paradox",
        
          title: "Paradox",
        
        description: "Birthday paradox, Monty Hall, Russell&#39;s paradox, and Banach-Tarski — with full probability spaces.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/paradox/";
          
        },
      },{id: "post-monoid",
        
          title: "Monoid",
        
        description: "Three equivalent descriptions of a monoid: set with operation, one-object category, and commutative diagrams.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/monoid/";
          
        },
      },{id: "post-group-ring-field",
        
          title: "Group Ring Field",
        
        description: "Groups, rings, fields, and ideals — with the Euclidean GCD algorithm as a use case.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/abstract-algebra/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%62%6F.%7A%68%65%6E%67.%32%30%32%30@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/bozh3ng", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
