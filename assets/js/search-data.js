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
        },{id: "post-part-5-pen-holonomy-and-the-single-tangent-space-fallacy",
        
          title: "Part 5 - PEN, Holonomy, and the Single Tangent Space Fallacy",
        
        description: "Path equivariant networks via parallel transport, holonomy-controlled expressivity, and why the single tangent space approach fails on curved manifolds.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-pen-holonomy/";
          
        },
      },{id: "post-the-world-from-within-and-out",
        
          title: "The World From Within and Out",
        
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
      },{id: "post-from-likelihood-to-elbo",
        
          title: "From Likelihood to ELBO",
        
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
      },{id: "post-part-1-prior-knowledge",
        
          title: "Part 1 - Prior Knowledge",
        
        description: "Prior knowledge in neural networks: every design choice encodes a structural assumption about the world.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-prior-knowledge/";
          
        },
      },{id: "post-part-3-path-equivariance-from-groups-to-geometry",
        
          title: "Part 3 - Path Equivariance: From Groups to Geometry",
        
        description: "Generalizing group equivariance to path equivariance on manifolds, with fiber bundles and the content-pose decomposition.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-path-equivariance/";
          
        },
      },{id: "post-part-2-the-group-structure-of-neural-networks",
        
          title: "Part 2 - The Group Structure of Neural Networks",
        
        description: "How activation functions and regularization break the symmetry group of deep networks, traced from GL(n) through specific subgroups.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-group-structure/";
          
        },
      },{id: "post-parr-4-a-category-theory-perspective-on-neural-networks",
        
          title: "Parr 4 - A Category Theory Perspective on Neural Networks",
        
        description: "Equivariance is naturality: unifying groups, manifolds, and path equivariance through category theory.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/thesis-category-theory/";
          
        },
      },{id: "post-pushforward-and-pullback",
        
          title: "Pushforward and Pullback",
        
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
      },{id: "post-probability",
        
          title: "Probability",
        
        description: "Probability spaces, conditional probability, random variables, independence, and expectation from measure theory.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/probability/";
          
        },
      },{id: "post-principal-component-analysis",
        
          title: "Principal Component Analysis",
        
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
      },{id: "post-abstract-algebra",
        
          title: "Abstract Algebra",
        
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
