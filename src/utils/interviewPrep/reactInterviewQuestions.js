export const reactInterviewQuestions = [
  {
    id: "rendering",
    skill: "React Fundamentals",
    prompt:
      "A product card is wrapped in `React.memo` with a custom comparison function. The parent logs a new `price` value, but the card still shows the old price. What should you inspect next?",
    options: [
      "Whether the parent route file has a matching name",
      "Whether the CSS class is hiding the updated text node",
      "Whether the custom comparison ignores `price`",
      "Whether a cached route is showing older markup",
    ],
    answer: 2,
    explanation:
      "`React.memo` re-renders when props change unless a custom comparison incorrectly returns `true`. Make sure the comparison checks meaningful props like `price`.",
  },
  {
    id: "state-updates",
    skill: "State Management",
    prompt:
      "You call `setCount(count + 1)` three times in one click handler, but the count only increases by 1. Why?",
    options: [
      "The click event is attached to the wrong element",
      "React skips repeated updates in event handlers",
      "The setter only accepts one value per render",
      "Each call reads the same stale `count`",
    ],
    answer: 3,
    explanation:
      "React batches state updates. Use the functional form `setCount(prev => prev + 1)` when the next value depends on the previous value.",
  },
  {
    id: "use-effect-dependencies",
    skill: "Hooks",
    prompt:
      "A `useEffect` reads `userId` but the dependency array is empty. What issue can this cause?",
    options: [
      "The effect may run before the JSX is returned",
      "The effect may use an old `userId`",
      "The dependency array will be ignored by React",
      "The component will skip every state update",
    ],
    answer: 1,
    explanation:
      "If a value is used inside an effect, it usually belongs in the dependency array so the effect stays in sync with current props or state.",
  },
  {
    id: "controlled-input",
    skill: "Forms",
    prompt:
      "An input has a `value` prop but typing into it does nothing. What is most likely missing?",
    options: [
      "A stable `id` value for the input element",
      "A placeholder that matches the current value",
      "An `onChange` that updates state",
      "A wrapping form with a submit handler",
    ],
    answer: 2,
    explanation:
      "A controlled input needs its value stored in state and updated through `onChange`.",
  },
  {
    id: "list-keys",
    skill: "Rendering Lists",
    prompt:
      "Why should you avoid using array indexes as keys when rendering a sortable list?",
    options: [
      "Indexes make list rendering run asynchronously",
      "Indexes block props from reaching child components",
      "Indexes cannot be compared during reconciliation",
      "Indexes can follow the wrong item",
    ],
    answer: 3,
    explanation:
      "Keys help React identify items. If the order changes, index keys can cause UI bugs because the key no longer represents the same item.",
  },
  {
    id: "derived-state",
    skill: "State Management",
    prompt:
      "A component stores `filteredItems` in state even though it can be calculated from `items` and `searchTerm`. What is the better approach?",
    options: [
      "Calculate it during render",
      "Store the filtered result in localStorage",
      "Move the search behavior into a CSS selector",
      "Mutate the original `items` array directly",
    ],
    answer: 0,
    explanation:
      "Avoid unnecessary derived state. If a value can be calculated from existing props or state, calculate it directly or use `useMemo` when needed.",
  },
  {
    id: "use-memo",
    skill: "Performance",
    prompt: "When is `useMemo` most useful?",
    options: [
      "When a component needs private local state",
      "When CSS needs to be loaded before render",
      "For expensive calculations",
      "When an effect needs to run after mount",
    ],
    answer: 2,
    explanation:
      "`useMemo` caches the result of a calculation until its dependencies change. It is useful for expensive calculations, not every small value.",
  },
  {
    id: "use-callback",
    skill: "Performance",
    prompt: "Why might you wrap a function in `useCallback`?",
    options: [
      "To make the function run after browser paint",
      "To convert the function into async code",
      "To share the function across browser tabs",
      "To keep its reference stable",
    ],
    answer: 3,
    explanation:
      "`useCallback` helps preserve function identity between renders, which can matter when child components depend on referential equality.",
  },
  {
    id: "effect-cleanup",
    skill: "Hooks",
    prompt:
      "A component sets up a window resize listener inside `useEffect`. What should the effect return?",
    options: [
      "The latest measured browser window width",
      "A cleanup that removes the listener",
      "A new resize listener callback function",
      "The same dependency array value again",
    ],
    answer: 1,
    explanation:
      "Effects that subscribe to events should clean up after themselves to prevent memory leaks and duplicate listeners.",
  },
  {
    id: "lifting-state",
    skill: "Component Architecture",
    prompt:
      "Two sibling components need access to the same selected item state. What is the usual React solution?",
    options: [
      "Give both siblings separate local state",
      "Mirror the state in a CSS variable",
      "Move the state to their common parent",
      "Use two different keys for the siblings",
    ],
    answer: 2,
    explanation:
      "Shared state should usually live in the closest common parent so both children receive the same source of truth through props.",
  },
  {
    id: "props-vs-state",
    skill: "React Fundamentals",
    prompt: "What is the main difference between props and state?",
    options: [
      "Props are external; state is local",
      "Props update often; state never changes",
      "Props are for styling; state is for markup",
      "Props only work inside class components",
    ],
    answer: 0,
    explanation:
      "Props come from a parent component. State belongs to the component that owns and updates it.",
  },
  {
    id: "conditional-rendering",
    skill: "React Fundamentals",
    prompt:
      "A component should show a loading message while data is being fetched. What is the most common approach?",
    options: [
      "Put the fetch request in the JSX return",
      "Hide the entire app until refresh",
      "Render every possible state at once",
      "Render UI from loading state",
    ],
    answer: 3,
    explanation:
      "Loading, error, and success UI are usually handled with state and conditional rendering.",
  },
  {
    id: "async-fetching",
    skill: "Data Fetching",
    prompt: "Why should you usually handle errors when fetching data in React?",
    options: [
      "React requires every fetch to use `catch`",
      "Requests can fail and need fallback UI",
      "Error handling makes CSS modules compile",
      "Fetch returns placeholder data by default",
    ],
    answer: 1,
    explanation:
      "Real network requests can fail. Good UI handles loading, success, and error states clearly.",
  },
  {
    id: "strict-mode",
    skill: "React Fundamentals",
    prompt:
      "In development, a `useEffect` callback appears to run twice. What is one possible reason?",
    options: [
      "The component name is too short",
      "The dependency array is not supported",
      "Strict Mode checks `useEffect` setup and cleanup twice",
      "The browser is replaying click events",
    ],
    answer: 2,
    explanation:
      "React Strict Mode can intentionally run `useEffect` setup and cleanup twice in development to help reveal unsafe side effects.",
  },
  {
    id: "context-api",
    skill: "State Management",
    prompt: "When is React Context a good fit?",
    options: [
      "For every individual form field",
      "Only for component-level animations",
      "Only for replacing network requests",
      "For shared theme or auth data",
    ],
    answer: 3,
    explanation:
      "Context is useful for values needed by many components without manually passing props through every level.",
  },
  {
    id: "prop-drilling",
    skill: "Component Architecture",
    prompt: "What does prop drilling mean?",
    options: [
      "Passing unused props through layers",
      "Deleting props before rendering a child",
      "Reading props from a CSS module",
      "Passing a state value back to itself",
    ],
    answer: 0,
    explanation:
      "Prop drilling happens when intermediate components pass props only so deeper children can access them.",
  },
  {
    id: "custom-hooks",
    skill: "Hooks",
    prompt: "Why would you create a custom hook?",
    options: [
      "To avoid importing React components",
      "To make invalid HTML render safely",
      "To reuse stateful logic across components",
      "To replace every component with a function",
    ],
    answer: 2,
    explanation:
      "Custom hooks let you extract and reuse logic that uses React hooks, such as form handling, fetching, or toggles.",
  },
  {
    id: "component-composition",
    skill: "Component Architecture",
    prompt: "What is component composition in React?",
    options: [
      "Keeping all UI inside one component file",
      "Building UI from smaller components",
      "Moving component props into global variables",
      "Writing every style rule inside JavaScript",
    ],
    answer: 1,
    explanation:
      "Composition means creating larger interfaces by combining smaller focused components.",
  },
  {
    id: "accessibility-buttons",
    skill: "Accessibility",
    prompt:
      "For a clickable action that opens a modal, which element is usually best?",
    options: [
      "`div` with `role=\"button\"`",
      "`span` with `cursor: pointer`",
      "`a` without an `href` value",
      "`button` with a clear label",
    ],
    answer: 3,
    explanation:
      "A real button provides keyboard support and semantic meaning by default.",
  },
  {
    id: "performance-rerenders",
    skill: "Performance",
    prompt:
      "A child component re-renders every time the parent renders, even when its props look the same. What could be causing this?",
    options: [
      "New object/function references",
      "The child component has too much CSS",
      "React cannot render nested child elements",
      "The browser cache is disabled locally",
    ],
    answer: 0,
    explanation:
      "Objects, arrays, and functions are new references each render unless memoized or moved outside the component.",
  },
  {
    id: "lazy-loading",
    skill: "Performance",
    prompt:
      "When is `React.lazy` with `Suspense` a good fit for code splitting?",
    options: [
      "For loading a small shared button that appears above the fold on every route",
      "For delaying a component's CSS while keeping its JavaScript in the initial bundle",
      "For lazy-loading a heavy or rarely used component and showing fallback UI while it loads",
      "For memoizing an expensive calculation that runs during every render",
    ],
    answer: 2,
    explanation:
      "`React.lazy` lets a component load only when rendered, and `Suspense` provides the fallback UI while that component's chunk is loading.",
  },
  {
    id: "route-splitting",
    skill: "Performance",
    prompt:
      "What is the main goal of route-based code splitting?",
    options: [
      "Keep every route mounted in the DOM",
      "Load route code only when it is needed",
      "Share one state object across all pages",
      "Disable browser caching for navigation",
    ],
    answer: 1,
    explanation:
      "Route splitting avoids shipping the entire app on first load and lets each page load its own code when visited.",
  },
  {
    id: "asset-optimization",
    skill: "Performance",
    prompt:
      "Which change most directly improves image loading performance?",
    options: [
      "Use larger PNG files for all breakpoints",
      "Move image tags into a client component",
      "Compress and serve responsive sizes",
      "Store image URLs in React component state",
    ],
    answer: 2,
    explanation:
      "Compressed images, modern formats, and responsive sizes reduce bytes downloaded before JavaScript optimization matters.",
  },
  {
    id: "virtualization",
    skill: "Performance",
    prompt:
      "A page renders 1,000 rows and scrolling feels sluggish. What is a strong frontend fix?",
    options: [
      "Render the rows inside a larger wrapper",
      "Put each row into its own context provider",
      "Convert the list into one long string",
      "Virtualize only the visible rows",
    ],
    answer: 3,
    explanation:
      "List virtualization keeps the DOM small by rendering only the items visible near the viewport.",
  },
  {
    id: "measure-before-optimizing",
    skill: "Performance",
    prompt:
      "Before adding memoization across a slow React screen, what should you usually do first?",
    options: [
      "Profile to find the bottleneck",
      "Wrap every component in `memo` immediately",
      "Move all values into global state first",
      "Delete effects until the page feels faster",
    ],
    answer: 0,
    explanation:
      "Profiling with tools like React DevTools helps identify what is actually slow before adding complexity.",
  },
  {
    id: "redux-data-flow",
    skill: "State Management",
    prompt:
      "Which sequence best describes typical Redux data flow?",
    options: [
      "Component mutates store, reducer reads action",
      "Reducer dispatches action, store calls view",
      "View dispatches, reducer updates store",
      "Store edits component props, action reads DOM",
    ],
    answer: 2,
    explanation:
      "Redux uses a predictable flow: UI dispatches actions, reducers calculate the next state, and views read from the store.",
  },
  {
    id: "context-vs-redux",
    skill: "State Management",
    prompt:
      "When might Redux be a better fit than Context alone?",
    options: [
      "For a single checkbox inside one form",
      "For complex shared state updates",
      "For loading one CSS module globally",
      "For replacing all component props",
    ],
    answer: 1,
    explanation:
      "Redux can help when shared state has complex updates, debugging needs, middleware, or many coordinated consumers.",
  },
  {
    id: "promise-all",
    skill: "JavaScript Fundamentals",
    prompt:
      "What does `Promise.all()` do with multiple promises?",
    options: [
      "Runs promises one at a time in order",
      "Returns after the first promise settles",
      "Retries failed promises automatically",
      "Resolves when all promises resolve",
    ],
    answer: 3,
    explanation:
      "`Promise.all()` waits for every promise to resolve, or rejects when one promise rejects.",
  },
  {
    id: "debounce-vs-throttle",
    skill: "JavaScript Fundamentals",
    prompt:
      "What is the practical difference between debouncing and throttling?",
    options: [
      "Debounce waits; throttle limits rate",
      "Debounce runs faster; throttle skips React state",
      "Debounce is for CSS; throttle is for requests",
      "Debounce caches data; throttle deletes events",
    ],
    answer: 0,
    explanation:
      "Debouncing waits until activity pauses, while throttling allows execution at a controlled interval.",
  },
  {
    id: "closures",
    skill: "JavaScript Fundamentals",
    prompt:
      "What is a closure in JavaScript?",
    options: [
      "A block that prevents any async code",
      "A function that remembers outer scope",
      "A class method that cannot use `this`",
      "An object created only by React hook calls",
    ],
    answer: 1,
    explanation:
      "A closure lets a function remember variables from the scope where it was created.",
  },
  {
    id: "event-loop",
    skill: "JavaScript Fundamentals",
    prompt:
      "If `setTimeout(callback, 0)` is called, why does the callback not run immediately?",
    options: [
      "It waits for the call stack to clear",
      "The browser always delays it by one second",
      "The callback runs before current sync code",
      "The timeout is ignored inside components",
    ],
    answer: 0,
    explanation:
      "A zero-delay timeout still waits for the current call stack and queued work rules before its callback can run.",
  },
  {
    id: "ssr-vs-csr",
    skill: "Rendering",
    prompt:
      "What is a key difference between SSR and CSR?",
    options: [
      "SSR sends rendered HTML; CSR renders in browser",
      "SSR disables JavaScript; CSR disables HTML",
      "SSR only works with CSS; CSR only works with APIs",
      "SSR is for forms; CSR is only for images",
    ],
    answer: 0,
    explanation:
      "Server-side rendering sends HTML generated on the server, while client-side rendering builds much of the UI in the browser.",
  },
  {
    id: "html5-vs-html3",
    skill: "HTML & CSS",
    prompt:
      "Which feature is associated with HTML5 rather than older HTML versions?",
    options: [
      "Semantic elements like `section`",
      "Using tables to create the main page layout",
      "Requiring plugins for all video playback",
      "Removing support for form input fields",
    ],
    answer: 0,
    explanation:
      "HTML5 introduced richer semantic elements, native media support, and improved form features.",
  },
  {
    id: "flexbox-centering",
    skill: "HTML & CSS",
    prompt:
      "How can you center a block child horizontally and vertically inside a parent with Flexbox?",
    options: [
      "Set `display: flex` and `justify-content: center` on the parent",
      "Set `display: flex` and `align-items: center` on the parent",
      "Set the parent to `display: flex`, then use `justify-content: center` and `align-items: center`",
      "Set `margin: auto` on the child without changing the parent display",
    ],
    answer: 2,
    explanation:
      "A flex parent can center children horizontally and vertically with `justify-content: center` and `align-items: center`.",
  },
  {
    id: "event-bubbling-capturing",
    skill: "JavaScript Fundamentals",
    prompt:
      "What is the difference between event capturing and bubbling?",
    options: [
      "Capturing travels from the document/root down to the target; bubbling travels from the target back up to ancestors",
      "Capturing and bubbling both start at the clicked element, but capturing only runs for keyboard events",
      "Bubbling is the phase that runs before the event reaches the target element",
      "Bubbling automatically prevents the browser's default action unless you call `stopPropagation`",
    ],
    answer: 0,
    explanation:
      "Event propagation has phases. Capturing runs from outer ancestors toward the target, then bubbling runs from the target back up through ancestors. `stopPropagation()` stops propagation; `preventDefault()` stops default browser behavior.",
  },
  {
    id: "bundler-purpose",
    skill: "Build Tools",
    prompt:
      "What is one main job of a bundler like webpack or Vite?",
    options: [
      "Convert browser events into server logs",
      "Bundle and transform app assets",
      "Replace all runtime JavaScript with CSS",
      "Guarantee that code has no bugs",
    ],
    answer: 1,
    explanation:
      "Bundlers follow imports, transform code, and output browser-ready assets such as JavaScript, CSS, and HTML references.",
  },
  {
    id: "code-splitting",
    skill: "Build Tools",
    prompt:
      "What is code splitting meant to improve?",
    options: [
      "Loading only the chunks needed for the current route or interaction",
      "Making every route load the full app bundle",
      "Removing all CSS from the project",
      "Turning CommonJS into server-only code",
    ],
    answer: 0,
    explanation:
      "Code splitting breaks the app into chunks so users do not need to download everything on the first page load.",
  },
  {
    id: "tree-shaking",
    skill: "Build Tools",
    prompt:
      "Why do ES modules help tree shaking?",
    options: [
      "They hide imports from bundlers",
      "They make import/export structure statically analyzable",
      "They force all dependencies into one file",
      "They disable minification",
    ],
    answer: 1,
    explanation:
      "Static `import` and `export` syntax lets bundlers find unused code more reliably than dynamic CommonJS patterns.",
  },
  {
    id: "dependency-graph",
    skill: "Build Tools",
    prompt:
      "What is a dependency graph in a bundler?",
    options: [
      "A browser API for measuring CLS",
      "A map of files connected by imports",
      "A React hook for global state",
      "A list of deployed servers",
    ],
    answer: 1,
    explanation:
      "Bundlers build a graph from entry files through their imports so they know what needs to be included in output bundles.",
  },
  {
    id: "css-in-js-tradeoff",
    skill: "HTML & CSS",
    prompt:
      "CSS-in-JS means writing component styles inside JavaScript, such as styled-components or style objects. What is one common tradeoff?",
    options: [
      "Styles can use props and JavaScript values, but may not benefit from separate cached CSS files the same way",
      "Styles are always extracted into one global CSS file, so component props cannot influence them",
      "It automatically removes the need for naming conventions, design tokens, or responsive CSS",
      "It guarantees faster first paint because no styling work happens during JavaScript execution",
    ],
    answer: 0,
    explanation:
      "CSS-in-JS can make dynamic, component-scoped styling ergonomic. The tradeoff is that styles are often tied to JavaScript or generated markup instead of a separately cacheable CSS file.",
  },
  {
    id: "async-use-effect",
    skill: "Hooks",
    prompt:
      "Why should the function passed directly to `useEffect` not be `async`?",
    options: [
      "React will wait for the Promise before painting, which can freeze the UI",
      "`async` functions return promises, but effects should return cleanup functions or nothing",
      "Putting `async` on the effect callback removes the need for a dependency array",
      "An `async` effect callback makes the cleanup run before every state update instead of on dependency changes or unmount",
    ],
    answer: 1,
    explanation:
      "An effect callback can return a cleanup function. An async function returns a Promise, so define and call an async function inside the effect instead.",
  },
  {
    id: "effect-for-derived-state",
    skill: "Hooks",
    prompt:
      "Why is using `useEffect` to store a value that can be calculated from current props or state often a warning sign?",
    options: [
      "It can cause an extra render for data that could be calculated during render",
      "It guarantees the calculated value will update before the first render",
      "It is required whenever a calculation uses more than one state value",
      "It makes the derived value safer because React stores it separately from the source data",
    ],
    answer: 0,
    explanation:
      "If a value can be derived from current props or state, calculating it during render avoids synchronization bugs and extra renders.",
  },
  {
    id: "hooks-top-level",
    skill: "Hooks",
    prompt:
      "Why must React hooks be called at the top level of a component or custom hook?",
    options: [
      "So React can preserve hook order between renders",
      "So React can skip re-rendering the component whenever hook state changes",
      "So dependency arrays are checked before the component function runs",
      "So cleanup functions run immediately after each hook is declared",
    ],
    answer: 0,
    explanation:
      "React tracks hooks by call order. Conditional or nested hook calls can change that order and break state association.",
  },
  {
    id: "controlled-vs-uncontrolled",
    skill: "Forms",
    prompt:
      "What is a practical difference between controlled and uncontrolled inputs?",
    options: [
      "Controlled inputs store their value in React state; uncontrolled inputs can be read from refs",
      "Controlled inputs cannot use `onChange`",
      "Uncontrolled inputs are always inaccessible",
      "Controlled inputs never re-render",
    ],
    answer: 0,
    explanation:
      "Controlled fields are driven by React state. Uncontrolled fields keep the DOM as the source of truth and are often read via refs.",
  },
  {
    id: "fiber-purpose",
    skill: "React Fundamentals",
    prompt:
      "What does React Fiber help React do?",
    options: [
      "Store CSS in the DOM",
      "Prioritize and schedule rendering work",
      "Replace JavaScript promises",
      "Prevent every child render",
    ],
    answer: 1,
    explanation:
      "Fiber is React's internal architecture for organizing work, enabling scheduling and prioritization of updates.",
  },
  {
    id: "reconciliation",
    skill: "React Fundamentals",
    prompt:
      "What happens during React reconciliation?",
    options: [
      "React compares the new UI tree to the previous one and updates the DOM where needed",
      "React sends every state value to localStorage",
      "React turns CSS into JavaScript",
      "React skips render functions entirely",
    ],
    answer: 0,
    explanation:
      "After state changes, React renders a new tree, compares it with the previous tree, and commits necessary DOM changes.",
  },
  {
    id: "global-context-rerenders",
    skill: "State Management",
    prompt:
      "What is a common performance concern with putting too much state in React Context?",
    options: [
      "Consumers of the context may re-render when the context value changes",
      "Context values cannot be objects",
      "Context only works with class components",
      "Context disables memoization everywhere",
    ],
    answer: 0,
    explanation:
      "When a provider value changes, components consuming that context can re-render, so context should be scoped thoughtfully.",
  },
  {
    id: "essential-derived-state",
    skill: "State Management",
    prompt:
      "Which value is usually derived state rather than essential state?",
    options: [
      "The items in a shopping cart",
      "The total price calculated from cart items",
      "The currently authenticated user token",
      "The selected product id",
    ],
    answer: 1,
    explanation:
      "Totals can be calculated from cart items, so storing both can create synchronization bugs.",
  },
  {
    id: "testing-pyramid",
    skill: "Testing",
    prompt:
      "Why are only end-to-end tests usually not enough?",
    options: [
      "They never catch browser issues",
      "They can be slower and harder to debug than focused unit or integration tests",
      "They cannot click buttons",
      "They replace production monitoring",
    ],
    answer: 1,
    explanation:
      "E2E tests are valuable for critical flows, but smaller tests make failures faster to locate.",
  },
  {
    id: "integration-test-example",
    skill: "Testing",
    prompt:
      "Which is the best example of an integration test for a React app?",
    options: [
      "Testing that `sum(1, 2)` returns `3`",
      "Rendering a login form, submitting it, and checking that welcome text appears",
      "Manually clicking through the deployed billing flow",
      "Checking that a CSS file exists",
    ],
    answer: 1,
    explanation:
      "Integration tests verify multiple pieces working together, such as a component, user events, and resulting UI.",
  },
  {
    id: "code-coverage",
    skill: "Testing",
    prompt:
      "What does code coverage measure?",
    options: [
      "How much code executes while tests run",
      "How fast production servers respond",
      "How many users saw a feature",
      "How many bugs are impossible",
    ],
    answer: 0,
    explanation:
      "Coverage reports show which lines/branches/functions were exercised by tests, but high coverage does not guarantee correctness.",
  },
  {
    id: "fcp",
    skill: "Performance",
    prompt:
      "What can hurt First Contentful Paint?",
    options: [
      "Too much blocking JavaScript or CSS before first render",
      "Using semantic HTML",
      "Setting image width and height",
      "Serving assets from a CDN",
    ],
    answer: 0,
    explanation:
      "FCP can be delayed by render-blocking assets and large client-side JavaScript.",
  },
  {
    id: "cls",
    skill: "Performance",
    prompt:
      "What helps reduce Cumulative Layout Shift?",
    options: [
      "Leaving image dimensions unknown",
      "Specifying image dimensions and preloading important fonts",
      "Injecting random content during hydration",
      "Loading all CSS after user interaction",
    ],
    answer: 1,
    explanation:
      "Reserved space for media and stable font loading reduce unexpected layout movement.",
  },
  {
    id: "bundle-analyzer",
    skill: "Performance",
    prompt:
      "Why use a bundle analyzer?",
    options: [
      "To identify large dependencies and assets in your JavaScript bundle",
      "To encrypt API keys in client code",
      "To automatically write unit tests",
      "To prevent all runtime errors",
    ],
    answer: 0,
    explanation:
      "Bundle analyzers help reveal what contributes to bundle size so you can remove, split, or lazy-load expensive code.",
  },
  {
    id: "script-async-defer",
    skill: "Browser Fundamentals",
    prompt:
      "What is a difference between `async` and `defer` scripts?",
    options: [
      "`async` executes when ready; `defer` waits until HTML parsing is done",
      "`defer` blocks HTML parsing immediately",
      "`async` only works for CSS",
      "Both always execute before parsing starts",
    ],
    answer: 0,
    explanation:
      "Async scripts download without blocking but execute as soon as ready. Deferred scripts execute after the document is parsed.",
  },
  {
    id: "dynamic-import",
    skill: "Build Tools",
    prompt:
      "When is a dynamic import useful?",
    options: [
      "When you want to lazy-load code after a route or user action",
      "When you need tree shaking for every static import",
      "When you want to block rendering longer",
      "When you need to remove all dependencies",
    ],
    answer: 0,
    explanation:
      "`import()` can load code on demand, which is useful for route-level or interaction-driven code splitting.",
  },
  {
    id: "hydration-mismatch",
    skill: "Rendering",
    prompt:
      "What can cause a hydration mismatch?",
    options: [
      "Server and client rendering different markup for the same component",
      "Using CSS modules",
      "Passing props from a parent",
      "Using semantic HTML",
    ],
    answer: 0,
    explanation:
      "Hydration expects server-rendered HTML to match the client render. Random ids or client-only values in markup can cause mismatches.",
  },
  {
    id: "isr",
    skill: "Rendering",
    prompt:
      "What is Incremental Static Regeneration?",
    options: [
      "A way to rebuild static pages in the background after a revalidation period",
      "A browser-only replacement for SSR",
      "A CSS optimization for above-the-fold styles",
      "A React hook for reducing renders",
    ],
    answer: 0,
    explanation:
      "ISR keeps static delivery while allowing pages to refresh in the background on a schedule or trigger.",
  },
  {
    id: "cors",
    skill: "Browser Fundamentals",
    prompt:
      "What does CORS control?",
    options: [
      "Whether browsers allow a page to read responses from another origin",
      "Whether Node can make HTTP requests",
      "Whether CSS can use variables",
      "Whether a database accepts writes",
    ],
    answer: 0,
    explanation:
      "CORS is enforced by browsers. Servers declare which origins are allowed to read cross-origin responses.",
  },
  {
    id: "storage-choice",
    skill: "Browser Fundamentals",
    prompt:
      "Which storage choice is usually best for an auth token when security matters?",
    options: [
      "An HTTP-only cookie",
      "A global JavaScript variable",
      "localStorage",
      "sessionStorage with no expiration",
    ],
    answer: 0,
    explanation:
      "HTTP-only cookies are not readable by client-side JavaScript, which helps reduce token theft risk from XSS.",
  },
  {
    id: "local-vs-session-storage",
    skill: "Browser Fundamentals",
    prompt:
      "What is a key difference between localStorage and sessionStorage?",
    options: [
      "localStorage persists without a tab lifetime; sessionStorage is cleared when the tab session ends",
      "sessionStorage is sent with every HTTP request",
      "localStorage can only store numbers",
      "sessionStorage is shared across all browsers",
    ],
    answer: 0,
    explanation:
      "localStorage persists until cleared. sessionStorage is scoped to a tab/session.",
  },
  {
    id: "xss",
    skill: "Security",
    prompt:
      "What is an XSS attack?",
    options: [
      "A user injects JavaScript that later runs in another user's browser",
      "A server returns a 404 for a manifest file",
      "A bundle is split into too many chunks",
      "A component re-renders too often",
    ],
    answer: 0,
    explanation:
      "Cross-site scripting happens when untrusted content is executed as code. Sanitize input and avoid unsafe HTML rendering.",
  },
  {
    id: "client-private-keys",
    skill: "Security",
    prompt:
      "Why should private keys not be placed in client-side code?",
    options: [
      "Users can inspect downloaded JavaScript and extract them",
      "React deletes environment variables automatically",
      "Browsers cannot make authenticated requests",
      "Keys only work in CSS files",
    ],
    answer: 0,
    explanation:
      "Anything shipped to the browser can be viewed by users, so secrets belong on the server.",
  },
  {
    id: "semantic-accessibility",
    skill: "Accessibility",
    prompt:
      "What is usually the best first step for accessible markup?",
    options: [
      "Use semantic HTML elements before adding ARIA",
      "Use only divs with click handlers",
      "Hide all SVGs from screen readers",
      "Set tabindex on every element",
    ],
    answer: 0,
    explanation:
      "Native elements like `button`, `nav`, and `input` provide accessibility behavior before ARIA is needed.",
  },
  {
    id: "aria-live",
    skill: "Accessibility",
    prompt:
      "What is `aria-live=\"polite\"` used for?",
    options: [
      "Announcing dynamic updates without immediately interrupting the user",
      "Disabling keyboard navigation",
      "Making an element visually hidden",
      "Preventing layout shift",
    ],
    answer: 0,
    explanation:
      "Live regions let assistive technologies announce changes to content. `polite` waits for an appropriate moment.",
  },
  {
    id: "i18n-date-currency",
    skill: "Internationalization",
    prompt:
      "What helps format dates and currency for different locales?",
    options: [
      "The `Intl` JavaScript APIs",
      "Array indexes as keys",
      "A web worker",
      "The `delete` operator",
    ],
    answer: 0,
    explanation:
      "`Intl.DateTimeFormat` and `Intl.NumberFormat` handle locale-aware formatting for dates, numbers, and currencies.",
  },
  {
    id: "html-lang",
    skill: "Internationalization",
    prompt:
      "Why set the `lang` attribute on the `html` element?",
    options: [
      "It helps browsers and assistive tech know the page language",
      "It enables React state updates",
      "It prevents XSS automatically",
      "It turns LTR text into RTL text by itself",
    ],
    answer: 0,
    explanation:
      "The document language supports correct pronunciation, translation, spellchecking, and browser behavior.",
  },
  {
    id: "jwt-purpose",
    skill: "Authentication",
    prompt:
      "What is a common purpose of a JWT?",
    options: [
      "Representing claims about a user's identity or permissions",
      "Compressing images before upload",
      "Replacing all server-side authorization checks",
      "Running JavaScript in a worker",
    ],
    answer: 0,
    explanation:
      "JWTs can carry signed claims, but servers still need to validate them and enforce authorization.",
  },
  {
    id: "shadow-dom",
    skill: "Browser Fundamentals",
    prompt:
      "What does Shadow DOM primarily provide?",
    options: [
      "Encapsulation for markup and styles",
      "Automatic server rendering",
      "A replacement for Promises",
      "A new HTTP caching layer",
    ],
    answer: 0,
    explanation:
      "Shadow DOM scopes DOM and styles inside a component boundary, which can prevent accidental style leakage.",
  },
  {
    id: "let-const-var",
    skill: "JavaScript Fundamentals",
    prompt:
      "What is true about `var` compared with `let` and `const`?",
    options: [
      "`var` is function-scoped and hoisted as undefined",
      "`var` is block-scoped",
      "`const` variables can be reassigned",
      "`let` is always global",
    ],
    answer: 0,
    explanation:
      "`let` and `const` are block-scoped. `var` is function-scoped and declarations are hoisted with an initial value of undefined.",
  },
  {
    id: "strict-equality",
    skill: "JavaScript Fundamentals",
    prompt:
      "Why prefer `===` over `==` in JavaScript?",
    options: [
      "`===` avoids surprising type coercion",
      "`===` converts strings into numbers",
      "`==` is not valid JavaScript",
      "`===` makes objects immutable",
    ],
    answer: 0,
    explanation:
      "Loose equality coerces types, which can lead to surprises like `0 == false`.",
  },
  {
    id: "nan-equality",
    skill: "JavaScript Fundamentals",
    prompt:
      "Which statement about `NaN` is true?",
    options: [
      "`NaN === NaN` is false",
      "`NaN` is a string",
      "`NaN` can only appear in arrays",
      "`NaN == null` is true",
    ],
    answer: 0,
    explanation:
      "`NaN` is the one JavaScript value that is not equal to itself. Use `Number.isNaN()` to check it.",
  },
  {
    id: "arrow-this",
    skill: "JavaScript Fundamentals",
    prompt:
      "How do arrow functions handle `this`?",
    options: [
      "They use the `this` value from the surrounding scope",
      "They always bind `this` to the clicked element",
      "They create a new `this` for every call",
      "They make `this` undefined in all code",
    ],
    answer: 0,
    explanation:
      "Arrow functions do not define their own `this`; they close over the surrounding `this` value.",
  },
  {
    id: "map-vs-object",
    skill: "JavaScript Fundamentals",
    prompt:
      "When might `Map` be more convenient than a plain object?",
    options: [
      "When keys can be non-strings and insertion order matters",
      "When values must all be strings",
      "When you need automatic HTML escaping",
      "When you want to disable iteration",
    ],
    answer: 0,
    explanation:
      "`Map` supports keys of any type, preserves insertion order, and exposes `.size` directly.",
  },
  {
    id: "set-use-case",
    skill: "JavaScript Fundamentals",
    prompt:
      "What is a common use for `Set`?",
    options: [
      "Keeping a collection of unique values",
      "Sorting object keys automatically",
      "Making async code synchronous",
      "Replacing all arrays",
    ],
    answer: 0,
    explanation:
      "`Set` stores unique values and is often useful for deduping arrays.",
  },
  {
    id: "slice-mutability",
    skill: "JavaScript Fundamentals",
    prompt:
      "What does `slice()` do to an array?",
    options: [
      "Returns a shallow copy of a selected range without mutating the original",
      "Deletes matching values from the original",
      "Sorts the original array",
      "Converts the array into a Set",
    ],
    answer: 0,
    explanation:
      "`slice()` returns a copy of part or all of an array. It does not mutate the source array.",
  },
  {
    id: "service-vs-web-worker",
    skill: "Browser Fundamentals",
    prompt:
      "What is a practical difference between a Service Worker and a Web Worker?",
    options: [
      "Service Workers can handle caching/offline behavior; Web Workers run heavy computation off the main thread",
      "Web Workers can intercept network requests for offline caching",
      "Service Workers only run React components",
      "They are the same API with different names",
    ],
    answer: 0,
    explanation:
      "Service Workers sit between the app and network for caching/offline use. Web Workers run scripts in another thread.",
  },
  {
    id: "websocket",
    skill: "Browser Fundamentals",
    prompt:
      "When is a WebSocket a good fit?",
    options: [
      "Real-time bidirectional updates like chat",
      "Formatting currency values",
      "Static image optimization",
      "Replacing semantic HTML",
    ],
    answer: 0,
    explanation:
      "WebSockets keep a persistent connection open, making them useful for real-time communication.",
  },
  {
    id: "recursion-base-case",
    skill: "Data Structures & Algorithms",
    prompt:
      "Why does recursion need a base case?",
    options: [
      "To stop the function from calling itself forever",
      "To force the code onto the callback queue",
      "To make every function async",
      "To allocate more memory",
    ],
    answer: 0,
    explanation:
      "A base case ends recursive calls. Without one, recursion can overflow the call stack.",
  },
  {
    id: "queue-stack",
    skill: "Data Structures & Algorithms",
    prompt:
      "Which pairing is correct?",
    options: [
      "Queue: first in first out; Stack: last in first out",
      "Queue: last in first out; Stack: sorted order",
      "Queue: random access; Stack: object keys",
      "Queue: browser cache; Stack: CDN",
    ],
    answer: 0,
    explanation:
      "Queues process oldest items first. Stacks process newest items first, like a browser history stack.",
  },
  {
    id: "sliding-window-clue",
    skill: "Data Structures & Algorithms",
    prompt:
      "What kind of problem often suggests a sliding window approach?",
    options: [
      "Finding a best consecutive subarray or substring",
      "Rendering a React error boundary",
      "Checking CORS headers",
      "Formatting dates for a locale",
    ],
    answer: 0,
    explanation:
      "Sliding windows are useful when the problem asks about contiguous ranges, such as max sum subarrays or longest substrings.",
  },
  {
    id: "frequency-counter",
    skill: "Data Structures & Algorithms",
    prompt:
      "What is the frequency counter pattern useful for?",
    options: [
      "Counting occurrences to compare values, such as anagrams or duplicates",
      "Scheduling React renders",
      "Preventing hydration mismatches",
      "Loading route chunks",
    ],
    answer: 0,
    explanation:
      "A frequency counter uses an object or Map to count values efficiently, often avoiding nested loops.",
  },
  {
    id: "rest-put-patch",
    skill: "Backend Fundamentals",
    prompt:
      "What is a common distinction between PUT and PATCH?",
    options: [
      "PUT replaces a resource; PATCH partially updates it",
      "PATCH creates a resource; PUT deletes it",
      "PUT is only for authentication",
      "PATCH cannot include a body",
    ],
    answer: 0,
    explanation:
      "REST conventions often use PUT for full replacement and PATCH for partial updates.",
  },
  {
    id: "dependency-injection",
    skill: "Architecture",
    prompt:
      "Why use dependency injection?",
    options: [
      "To pass dependencies in from the outside, making code easier to test and swap",
      "To hide every function in global scope",
      "To make all functions pure automatically",
      "To avoid writing constructors",
    ],
    answer: 0,
    explanation:
      "Dependency injection avoids hard-coding dependencies inside a class or service, which improves testability and flexibility.",
  },
  {
    id: "singleton-pattern",
    skill: "Architecture",
    prompt:
      "What problem does a singleton often solve?",
    options: [
      "Ensuring one shared instance, such as a database connection",
      "Creating unlimited duplicate services",
      "Sorting object keys",
      "Running code on a Web Worker",
    ],
    answer: 0,
    explanation:
      "A singleton centralizes access to one instance when multiple instances would be wasteful or incorrect.",
  },
  {
    id: "event-delegation",
    skill: "Browser Fundamentals",
    prompt:
      "What is event delegation?",
    options: [
      "Attaching one listener to a parent and inspecting the event target",
      "Preventing every child from receiving events",
      "Moving events from bubbling to capturing only",
      "Creating a new listener for every child",
    ],
    answer: 0,
    explanation:
      "Event delegation uses propagation so a parent can handle events from many children efficiently.",
  },
];

const laterQuestionRevisions = {
  "controlled-vs-uncontrolled": {
    options: [
      "Controlled inputs always avoid re-renders while typing because the browser owns every value change",
      "Uncontrolled inputs cannot be validated until a form submit event reaches the server or API",
      "Controlled inputs use React state; uncontrolled inputs can be read with refs",
      "Controlled inputs require `defaultValue`; uncontrolled inputs require `value` and `onChange`",
    ],
    answer: 2,
  },
  "fiber-purpose": {
    options: [
      "Prioritize and schedule rendering work",
      "Store final DOM nodes in localStorage so updates can be restored after navigation",
      "Convert JSX into CSS rules before the browser paints the next frame",
      "Guarantee memoized children never render after their first successful render",
    ],
    answer: 0,
  },
  reconciliation: {
    options: [
      "React sends changed state values to every child through Context automatically on every render",
      "React compares the new UI tree with the previous one",
      "React compares CSS files and rewrites class names before render",
      "React skips component rendering and directly mutates props",
    ],
    answer: 1,
  },
  "global-context-rerenders": {
    options: [
      "Context values must be strings, so object state has to be serialized first",
      "Context updates are ignored unless every consumer is wrapped in `memo`",
      "Consumers may re-render when the provider value changes",
      "Context disables browser caching for every page that imports it",
    ],
    answer: 2,
  },
  "essential-derived-state": {
    options: [
      "The selected product id",
      "The items currently in the shopping cart",
      "The authenticated user object returned by the server",
      "The total price calculated from the cart items",
    ],
    answer: 3,
  },
  "testing-pyramid": {
    options: [
      "They replace the need for production monitoring once all flows pass",
      "They can be slower and harder to debug",
      "They cannot verify browser behavior because they do not run in a browser",
      "They only test isolated utility functions, not user flows",
    ],
    answer: 1,
  },
  "integration-test-example": {
    options: [
      "Render a login form, submit it, and check for welcome text",
      "Call `add(2, 2)` and assert that the utility returns `4` with no React involved",
      "Manually click through deployed checkout in production after each release",
      "Open a bundle report and identify which dependency contributes the most code",
    ],
    answer: 0,
  },
  "code-coverage": {
    options: [
      "How many bugs the test suite is guaranteed to catch before code reaches production",
      "How quickly tests run in CI compared with local development on a fresh install",
      "How much of the source code executes while the tests run",
      "How many real users are represented by analytics events during a release",
    ],
    answer: 2,
  },
  fcp: {
    options: [
      "Adding width and height to hero images so layout space is reserved before load",
      "Serving static assets from a nearby CDN to reduce network latency",
      "Using semantic tags like `main` and `section` to clarify document structure",
      "Large render-blocking CSS or JavaScript",
    ],
    answer: 3,
  },
  cls: {
    options: [
      "Reserve image space and load fonts predictably",
      "Adding more JavaScript after initial render so content arrives later in separate chunks",
      "Leaving ad, image, and iframe dimensions flexible until the browser discovers their size",
      "Removing server-rendered HTML so the client controls every layout decision",
    ],
    answer: 0,
  },
  "bundle-analyzer": {
    options: [
      "To confirm API keys are hidden inside minified JavaScript",
      "To find large dependencies and assets",
      "To generate accessibility labels for every component",
      "To determine whether a database query needs an index",
    ],
    answer: 1,
  },
  "script-async-defer": {
    options: [
      "`defer` executes as soon as it downloads, while `async` waits for the end of parsing",
      "Both attributes make scripts execute before any HTML is parsed",
      "`async` executes when ready; `defer` waits for parsing",
      "`async` is only for ES modules and `defer` is only for inline scripts",
    ],
    answer: 2,
  },
  "dynamic-import": {
    options: [
      "When a dependency should be included in every route's initial JavaScript bundle",
      "When an import must be fully static so the bundler can tree-shake unused exports",
      "When rendering should wait until all possible route components have loaded",
      "When code should load after a route change or action",
    ],
    answer: 3,
  },
  "hydration-mismatch": {
    options: [
      "Server and client render different markup",
      "A CSS module generates a locally scoped class name",
      "A parent component passes props to a client component",
      "A page uses semantic HTML elements instead of divs",
    ],
    answer: 0,
  },
  isr: {
    options: [
      "A client-side cache that stores every page in localStorage",
      "Static pages can regenerate after a revalidation period",
      "A React hook that memoizes expensive calculations between renders",
      "A CSS strategy for loading above-the-fold styles before the rest of the page",
    ],
    answer: 1,
  },
  cors: {
    options: [
      "Whether a backend is allowed to call another backend over HTTP",
      "Whether cookies are encrypted before being stored in the browser",
      "Whether a browser can read a cross-origin response",
      "Whether CSS modules can import variables from another file",
    ],
    answer: 2,
  },
  "storage-choice": {
    options: [
      "localStorage, because it persists after the browser closes and is easy to read",
      "sessionStorage, because it is automatically encrypted per tab",
      "A global JavaScript variable, because it disappears on refresh",
      "An HTTP-only cookie",
    ],
    answer: 3,
  },
  "local-vs-session-storage": {
    options: [
      "localStorage persists; sessionStorage ends with the tab/session",
      "sessionStorage is sent with every HTTP request, while localStorage stays client-only",
      "localStorage can only store numbers, while sessionStorage can store objects",
      "sessionStorage is shared between every tab on the device",
    ],
    answer: 0,
  },
  xss: {
    options: [
      "A deployment issue where old JavaScript chunks are cached after a release",
      "Injected content runs as JavaScript in a user's browser",
      "A CORS failure caused by a missing `Access-Control-Allow-Origin` header",
      "A layout shift caused by images loading without dimensions",
    ],
    answer: 1,
  },
  "client-private-keys": {
    options: [
      "React strips secrets from the bundle only when `NODE_ENV` is production",
      "Browsers cannot make authenticated requests with client-side code",
      "Users can inspect and copy browser code",
      "Private keys only work in Node if they are stored in CSS files",
    ],
    answer: 2,
  },
  "semantic-accessibility": {
    options: [
      "Use divs for every control, then add ARIA roles after the UI is complete",
      "Set `tabindex` on every visible element so keyboard users can reach everything",
      "Hide icons and labels from screen readers by default",
      "Start with native semantic elements",
    ],
    answer: 3,
  },
  "aria-live": {
    options: [
      "To announce dynamic updates politely",
      "To prevent a button from being reachable by keyboard",
      "To make an SVG behave like a decorative background image",
      "To reserve layout space before images load",
    ],
    answer: 0,
  },
  "i18n-date-currency": {
    options: [
      "CSS logical properties like `margin-inline`",
      "The `Intl` JavaScript APIs",
      "Array indexes, because they are stable across languages",
      "A web worker, because it automatically translates strings",
    ],
    answer: 1,
  },
  "html-lang": {
    options: [
      "It automatically mirrors all layout from left-to-right to right-to-left",
      "It prevents translation files from loading in the wrong route",
      "It identifies the document language",
      "It makes React choose the correct locale for state updates",
    ],
    answer: 2,
  },
  "jwt-purpose": {
    options: [
      "Compressing images before they are sent to a CDN",
      "Replacing authorization checks because signed tokens are always enough",
      "Running authentication logic in a Web Worker",
      "Carrying signed identity or permission claims",
    ],
    answer: 3,
  },
  "shadow-dom": {
    options: [
      "Encapsulating markup and styles",
      "Making server-rendered markup hydrate faster by default",
      "Replacing JavaScript Promises with browser-managed callbacks",
      "Creating a new HTTP cache layer for component assets",
    ],
    answer: 0,
  },
  "let-const-var": {
    options: [
      "`var` is block-scoped, while `let` is function-scoped",
      "`var` is function-scoped and hoisted as `undefined`",
      "`const` prevents object properties from changing",
      "`let` declarations are added to `window` in every module",
    ],
    answer: 1,
  },
  "strict-equality": {
    options: [
      "`===` converts both sides to strings before comparing",
      "`==` is invalid syntax in modern JavaScript modules",
      "`===` avoids loose type coercion",
      "`===` deeply compares arrays and objects by value",
    ],
    answer: 2,
  },
  "nan-equality": {
    options: [
      "`NaN` is equal to `null` with loose equality",
      "`NaN` is a string value returned by failed parsing",
      "`NaN` can only be produced by division",
      "`NaN === NaN` is false",
    ],
    answer: 3,
  },
  "arrow-this": {
    options: [
      "They use `this` from the surrounding scope",
      "They always bind `this` to the DOM element that fired the current event",
      "They create a fresh `this` value every time the function is called",
      "They make `this` equal to `undefined` even when called as an object method",
    ],
    answer: 0,
  },
  "map-vs-object": {
    options: [
      "When you want JSON serialization to happen automatically",
      "When non-string keys or `.size` are useful",
      "When every key must be sorted alphabetically by default",
      "When you need CSS class names to be scoped to a component",
    ],
    answer: 1,
  },
  "set-use-case": {
    options: [
      "Sorting object keys without calling `.sort()`",
      "Making asynchronous code run synchronously",
      "Keeping unique values",
      "Replacing arrays whenever order matters",
    ],
    answer: 2,
  },
  "slice-mutability": {
    options: [
      "It removes matching values from the source array",
      "It sorts the array in place and returns the same reference",
      "It converts the array to a Set before copying",
      "It returns a shallow copy of a selected range without mutating the source",
    ],
    answer: 3,
  },
  "service-vs-web-worker": {
    options: [
      "Service Workers run React components off the main thread; Web Workers cache network requests",
      "Service Workers handle caching/offline; Web Workers run computation off the main thread",
      "Web Workers can intercept all fetch requests for a site after installation",
      "They are the same browser API, but Service Worker is the newer name",
    ],
    answer: 1,
  },
  websocket: {
    options: [
      "Formatting currency values for multiple locales",
      "Serving responsive image sizes from a CDN",
      "Real-time bidirectional communication",
      "Replacing semantic HTML with custom elements",
    ],
    answer: 2,
  },
  "recursion-base-case": {
    options: [
      "To move recursive calls from the call stack to the callback queue automatically",
      "To make each recursive call wait for a Promise before continuing execution",
      "To allocate a separate memory heap for each nested function call",
      "To stop the function from calling itself forever",
    ],
    answer: 3,
  },
  "queue-stack": {
    options: [
      "Queue: first in first out; Stack: last in first out",
      "Queue: last in first out; Stack: first in first out",
      "Queue: sorted by priority automatically; Stack: sorted by key",
      "Queue: object key lookup; Stack: browser cache lookup",
    ],
    answer: 0,
  },
  "sliding-window-clue": {
    options: [
      "A problem asks you to compare every pair in a graph",
      "A problem asks for a best contiguous range",
      "A problem asks you to serialize an object to JSON",
      "A problem asks why an effect ran twice",
    ],
    answer: 1,
  },
  "frequency-counter": {
    options: [
      "Scheduling React state updates by priority",
      "Preventing server/client markup mismatch during hydration",
      "Counting occurrences with an object or Map",
      "Loading route chunks only when a page is visited",
    ],
    answer: 2,
  },
  "rest-put-patch": {
    options: [
      "PATCH replaces the entire resource, while PUT updates only one requested field",
      "PUT is only used for authentication, while PATCH is only used for deleting resources",
      "PATCH requests cannot include a request body because all data goes in the URL",
      "PUT commonly replaces a resource; PATCH commonly applies a partial update",
    ],
    answer: 3,
  },
  "dependency-injection": {
    options: [
      "Passing dependencies in from the outside",
      "Creating every dependency inside the function that uses it before each call",
      "Hiding all dependencies in global variables so tests can replace them later",
      "Using inheritance so a child class receives every service automatically",
    ],
    answer: 0,
  },
  "singleton-pattern": {
    options: [
      "Creating a new instance every time a function is called",
      "Reusing one shared instance",
      "Sorting services by the order they were imported",
      "Injecting dependencies into a class constructor",
    ],
    answer: 1,
  },
  "event-delegation": {
    options: [
      "Calling `stopPropagation()` on every child so parent handlers never run",
      "Moving all listeners from bubbling phase to capture phase",
      "One parent listener checks the event target",
      "Creating a separate event listener for each child to avoid checking the target",
    ],
    answer: 2,
  },
};

reactInterviewQuestions.forEach((question) => {
  const revision = laterQuestionRevisions[question.id];

  if (revision) {
    Object.assign(question, revision);
  }
});

const getQuestionSeed = (questionId) =>
  [...questionId].reduce((seed, character) => {
    return (seed * 31 + character.charCodeAt(0)) >>> 0;
  }, 17);

const getSeededRandom = (seed) => {
  let currentSeed = seed;

  return () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) >>> 0;
    return currentSeed / 2 ** 32;
  };
};

const shuffleDeterministically = (items, seed) => {
  const shuffled = [...items];
  const random = getSeededRandom(seed);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

const answerPositionPatterns = {
  2: [1, 0],
  3: [1, 2, 0],
  4: [2, 0, 3, 1],
};
const answerPositionCounts = {};

reactInterviewQuestions.forEach((question) => {
  const correctOption = question.options[question.answer];
  const optionCount = question.options.length;
  const seed = getQuestionSeed(question.id);
  const positionPattern =
    answerPositionPatterns[optionCount] ||
    Array.from({ length: optionCount }, (_, index) => index);
  const positionCount = answerPositionCounts[optionCount] || 0;
  const targetAnswerIndex =
    positionPattern[positionCount % positionPattern.length];
  const shuffledDistractors = shuffleDeterministically(
    question.options.filter((_, optionIndex) => optionIndex !== question.answer),
    seed,
  );
  const shuffledOptions = [];

  for (let optionIndex = 0; optionIndex < optionCount; optionIndex += 1) {
    shuffledOptions[optionIndex] =
      optionIndex === targetAnswerIndex
        ? correctOption
        : shuffledDistractors.shift();
  }

  question.options = shuffledOptions;
  question.answer = targetAnswerIndex;
  answerPositionCounts[optionCount] = positionCount + 1;
});
