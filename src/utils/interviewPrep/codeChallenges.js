const matchesSetQueryFromInput = (code) =>
  /onChange=\{\(?\s*(\w+)\s*\)?\s*=>[\s\S]*setQuery\(\s*\1\.target\.value(?:\.toLowerCase\(\))?\s*\)/.test(
    code,
  );

const matchesLowercaseSearch = (code) =>
  /includes\(\s*query\.toLowerCase\(\)\s*\)/.test(code) ||
  (/setQuery\(\s*\w+\.target\.value\.toLowerCase\(\)\s*\)/.test(code) &&
    /\w+\.toLowerCase\(\)\.includes\(\s*query\s*\)/.test(code));

const filtersUsersByQuery = (code) =>
  /\.filter\(/.test(code) && /query/.test(code) && /\.includes\(/.test(code);

const appendsMessageImmutably = (code) =>
  /setMessages\(\s*\(?\s*(\w+)\s*\)?\s*=>\s*\[\s*\.\.\.\1\s*,/.test(code);

const clearsTextInput = (code) => /setText\(\s*(['"])\1\s*\)/.test(code);

const updatesCategoryFromInput = (code) =>
  /setCategory\(\s*\w+\.target\.value\s*\)/.test(code);

const filtersBySelectedCategory = (code) =>
  /\.filter\(/.test(code) &&
  /category/.test(code) &&
  /product\.category\s*={2,3}\s*category|category\s*={2,3}\s*product\.category/.test(
    code,
  );

const sortsByAscendingPrice = (code) =>
  /\.sort\(\s*\(?\s*(\w+)\s*,\s*(\w+)\s*\)?\s*=>\s*\1\.price\s*-\s*\2\.price/.test(
    code,
  );

const addsCartItemsImmutably = (code) =>
  /setCart\(\s*\(?\s*(\w+)\s*\)?\s*=>[\s\S]*\[\s*\.\.\.\1/.test(code);

const calculatesTotalWithReduce = (code) =>
  /\.reduce\(/.test(code) && /\.price/.test(code);

const usesFunctionalRowUpdate = (code) =>
  /setRows\(\s*\(?\s*\w+\s*\)?\s*=>/.test(code);

const findsMatchingRowId = (code) =>
  /\.id\s*={2,3}\s*id|id\s*={2,3}\s*\w+\.id/.test(code);

const updatesDynamicFieldImmutably = (code) =>
  /\{\s*\.\.\.\w+\s*,\s*\[\s*field\s*\]\s*:\s*value\s*\}/.test(code);

const updatesDateInputs = (code) =>
  /setStart\(\s*\w+\.target\.value\s*\)/.test(code) &&
  /setEnd\(\s*\w+\.target\.value\s*\)/.test(code);

const readsSelectedFile = (code) =>
  /\w+\.target\.files\[\s*0\s*\]|\.target\.files\.item\(\s*0\s*\)/.test(code);

const createsPreviewUrl = (code) => /URL\.createObjectURL\(\s*\w+/.test(code);

const updatesDocumentTheme = (code) =>
  /document\.(body|documentElement)\.(className|classList)/.test(code) &&
  /theme/.test(code);

const persistsTheme = (code) =>
  /localStorage\.setItem\(\s*['"]\w*theme\w*['"]\s*,\s*theme\s*\)/i.test(code);

const togglesThemeValue = (code) =>
  /setTheme\(/.test(code) && /light/.test(code) && /dark/.test(code);

const createsRef = (code) => /useRef\(/.test(code);

const createsIntersectionObserver = (code) =>
  /new\s+IntersectionObserver\(/.test(code);

const cleansUpObserver = (code) => /\w+\.disconnect\(\)/.test(code);

const rendersPagedItems = (code) =>
  /\.slice\(/.test(code) && /page/.test(code) && /\.map\(/.test(code);

const updatesEmailField = (code) =>
  /email\s*:\s*\w+\.target\.value/.test(code) ||
  /\[\s*['"]email['"]\s*\]\s*:\s*\w+\.target\.value/.test(code);

const rendersStatusValue = (code) =>
  /\{\s*app(?:\.status|\[['"]status['"]\])\s*\}/.test(code);

const rendersRegionValue = (code) =>
  /\{\s*app(?:\.region|\[['"]region['"]\])\s*\}/.test(code);

const addsLogsActionButton = (code) =>
  /<button[\s\S]*>[\s\S]*View\s+logs[\s\S]*<\/button>/i.test(code);

const usesStatusCardClass = (code) =>
  /className=\{?["'][^"']*status-card/.test(code);

const filtersActiveUsers = (code) =>
  /\.filter\(/.test(code) && /\.active\b/.test(code);

const mapsToUserNames = (code) => /\.map\(/.test(code) && /\.name\b/.test(code);

const sortsNamesAlphabetically = (code) => /\.sort\(/.test(code);

const rendersChipsFromNames = (code) => /names\.map\(\s*\(?\s*\w+/.test(code);

const togglesAccordionPanel = (code) =>
  /useState\(/.test(code) &&
  /set\w+\(/.test(code) &&
  /active|open|expanded/i.test(code);

const rendersAccordionButtons = (code) =>
  /\.map\(/.test(code) && /<button[\s\S]*onClick=/.test(code);

const conditionallyRendersAccordionContent = (code) =>
  /(?:openId|activeId|expandedId|openIndex|activeIndex|open|active|expanded)\s*(?:={2,3}|!==?)\s*(?:\w+\.(?:id|value)|index|i|['"`][^'"`]+['"`])[\s\S]{0,180}(?:&&|\?)[\s\S]{0,240}(?:\w+\.)?(?:answer|content|panel)/i.test(
    code,
  ) ||
  /(?:\w+\.(?:id|value)|index|i|['"`][^'"`]+['"`])\s*(?:={2,3}|!==?)\s*(?:openId|activeId|expandedId|openIndex|activeIndex|open|active|expanded)[\s\S]{0,180}(?:&&|\?)[\s\S]{0,240}(?:\w+\.)?(?:answer|content|panel)/i.test(
    code,
  ) ||
  /(?:&&|\?)[\s\S]{0,180}(?:\w+\.)?(?:answer|content|panel)[\s\S]{0,180}(?:openId|activeId|expandedId|openIndex|activeIndex|open|active|expanded)\s*(?:={2,3}|!==?)/i.test(
    code,
  );

const storesCarouselIndex = (code) =>
  /const\s*\[\s*(index|current|active|currentIndex|activeIndex)\s*,\s*set\w+\s*\]\s*=\s*useState/.test(
    code,
  );

const advancesCarousel = (code) =>
  /set\w+\(/.test(code) && /\+\s*1/.test(code) && /%|length/.test(code);

const reversesCarousel = (code) =>
  /set\w+\(/.test(code) && /-\s*1/.test(code) && /%|length/.test(code);

const rendersActiveSlide = (code) =>
  /\[\s*(index|current|active|currentIndex|activeIndex)\s*\]/.test(code);

const rendersStateBackedActiveSlide = (code) =>
  storesCarouselIndex(code) && rendersActiveSlide(code);

const fetchesJobStories = (code) =>
  /fetch\(\s*['"]https:\/\/hacker-news\.firebaseio\.com\/v0\/jobstories\.json['"]/.test(
    code,
  );

const fetchesJobDetails = (code) =>
  /fetch\([^)]*https:\/\/hacker-news\.firebaseio\.com\/v0\/item\/\$\{?\w+\}?\.json/.test(
    code,
  ) || /fetch\([^)]*\/v0\/item\/[^)]*\.json/.test(code);

const rendersJobCards = (code) =>
  /\.map\(/.test(code) &&
  /\.title/.test(code) &&
  /\.by/.test(code) &&
  (/\.(slice)\(\s*0\s*,\s*(visibleCount|limit|count|pageSize|6)\s*\)/.test(
    code,
  ) ||
    /(visibleJobs|displayedJobs|shownJobs|jobsToShow)\.map\(/.test(code));

const loadsMoreJobs = (code) => /set\w+\(/.test(code) && /\+\s*6/.test(code);

const storesActiveTab = (code) =>
  /const\s*\[\s*(activeTab|active|selected|selectedTab|currentTab)\s*,\s*set\w+\s*\]\s*=\s*useState/.test(
    code,
  );

const rendersTabButtons = (code) =>
  /\.map\(/.test(code) && /<button[\s\S]*onClick=/.test(code);

const rendersActiveTabPanel = (code) =>
  /\.find\(/.test(code) ||
  /\[\s*(activeTab|active|selected|selectedTab|currentTab)\s*\]/.test(code);

const highlightsActiveTab = (code) =>
  /className=/.test(code) && /active/i.test(code);

const highlightsStateBackedActiveTab = (code) =>
  storesActiveTab(code) && highlightsActiveTab(code);

const createsThrottleHandler = (code) =>
  /Date\.now\(\)|useRef\(|setTimeout\(/.test(code) &&
  /throttle|lastRun|lastCall/i.test(code);

const guardsThrottleTiming = (code) =>
  /Date\.now\(\)|setTimeout\(/.test(code) && />=|>|-/.test(code);

const updatesThrottledCount = (code) =>
  /setCount\(/.test(code) && /\+\s*1/.test(code);

const createsDebounceHandler = (code) =>
  /setTimeout\(/.test(code) && /clearTimeout\(/.test(code);

const storesDebouncedValue = (code) =>
  /const\s*\[\s*(debounced\w*|result|search|value)\s*,\s*set\w+\s*\]\s*=\s*useState/.test(
    code,
  );

const updatesDebouncedValue = (code) =>
  /setTimeout\([\s\S]*set\w+\(/.test(code);

const usesFunctionalCountUpdate = (code) =>
  /setCount\(\s*\(?\s*\w+\s*\)?\s*=>\s*\w+\s*\+\s*1\s*\)/.test(code);

const callsSetCountMultipleTimes = (code) =>
  (code.match(/setCount\(/g) || []).length >= 3;

const dedupesWithSet = (code) =>
  /new\s+Set\(/.test(code) &&
  (/\[\s*\.\.\./.test(code) || /Array\.from\(/.test(code));

const createsUniqueNumsFromSet = (code) =>
  /const\s+uniqueNums\s*=\s*(?:\[\s*\.\.\.\s*new\s+Set\(\s*nums\s*\)\s*\]|Array\.from\(\s*new\s+Set\(\s*nums\s*\)\s*\))/.test(
    code,
  );

const keepsNumsAsSourceArray = (code) =>
  /const\s+nums\s*=\s*\[[\s\S]*\]/.test(code) && createsUniqueNumsFromSet(code);

const rendersUniqueNums = (code) =>
  createsUniqueNumsFromSet(code) && /uniqueNums\.join/.test(code);

const sortsUsersByName = (code) =>
  /\.sort\(/.test(code) &&
  /\.name/.test(code) &&
  /localeCompare|>|</.test(code);

const rendersSortedUsers = (code) =>
  /(?:\[\s*\.\.\.\s*users\s*\]|users\.slice\(\))[\s\S]*\.sort\(/.test(code) &&
  /sortedUsers\.map\(/.test(code);

const usesStableSortedUserKeys = (code) =>
  rendersSortedUsers(code) && /key=\{\s*user\.id\s*\}/.test(code);

const memoizesWithClosure = (code) =>
  /(?:const|let)\s+(?:cache|memoCache|cachedResults|resultsCache)\s*=/.test(
    code,
  ) && /return\s+(?:function|\(?\s*\w*\s*\)?\s*=>)/.test(code);

const checksMemoCache = (code) => /\.has\(|\bin\b|cache\[[^\]]+\]/.test(code);

const storesMemoResult = (code) => /\.set\(|cache\[[^\]]+\]\s*=/.test(code);

const returnsCachedFunction = (code) =>
  memoizesWithClosure(code) &&
  /return\s*(function|\(?\s*\w*\s*\)?\s*=>)/.test(code);

const rotatesMatrixClockwise = (code) =>
  /\.map\(/.test(code) &&
  /row\[\s*\w+\s*\]/.test(code) &&
  /\.reverse\(\)/.test(code);

const mapsMatrixColumns = (code) =>
  /\.map\(/.test(code) && /row\[\s*\w+\s*\]/.test(code);

const rendersRotatedMatrix = (code) =>
  rotatesMatrixClockwise(code) && /rotated\.map/.test(code);

const sortsObjectByKeys = (code) =>
  /Object\.keys\(/.test(code) &&
  /\.sort\(\)/.test(code) &&
  /\.reduce\(|for\s*\(/.test(code);

const rendersSortedObjectEntries = (code) =>
  sortsObjectByKeys(code) && /Object\.entries\(\s*ordered\s*\)/.test(code);

const usesEventDelegation = (code) =>
  /onClick=\{/.test(code) && /\.target/.test(code);

const readsDelegatedId = (code) =>
  /dataset\.\w+|getAttribute\(\s*['"]data-/.test(code);

const storesSelectedFromDelegatedEvent = (code) =>
  /const\s*\[\s*selected\s*,\s*setSelected\s*\]\s*=\s*useState/.test(code) &&
  usesEventDelegation(code);

const updatesSelectedFromDelegatedEvent = (code) =>
  storesSelectedFromDelegatedEvent(code) && /setSelected\(/.test(code);

const incrementsSimpleCounter = (code) =>
  /setCount\([\s\S]*count\s*\+\s*1|setCount\(\s*\(?\s*\w+\s*\)?\s*=>\s*\w+\s*\+\s*1/.test(
    code,
  );

const rendersStateCount = (code) =>
  /const\s*\[\s*count\s*,\s*setCount\s*\]\s*=\s*useState/.test(code) &&
  /\{\s*count\s*\}/.test(code);

const storesTodoText = (code) =>
  /const\s*\[\s*(text|todo|newTodo|input)\s*,\s*set\w+\s*\]\s*=\s*useState/.test(
    code,
  );

const appendsTodoImmutably = (code) =>
  /setTodos\(\s*\(?\s*(\w+)\s*\)?\s*=>[\s\S]*\[\s*\.\.\.\1/.test(code);

const rendersTodosWithKeys = (code) =>
  /todos\.map\(/.test(code) && /key=\{/.test(code);

const rendersStateTodosWithKeys = (code) =>
  /const\s*\[\s*todos\s*,\s*setTodos\s*\]\s*=\s*useState/.test(code) &&
  rendersTodosWithKeys(code);

const removesTodoImmutably = (code) =>
  /setTodos\(\s*\(?\s*(\w+)\s*\)?\s*=>[\s\S]*\1\.filter\(/.test(code) &&
  /!==|!=/.test(code);

const declaresReusableButton = (code) =>
  /function\s+\w*Button\(|const\s+\w*Button\s*=/.test(code);

const passesButtonProps = (code) =>
  /\(\s*\{[^}]*children|label|text[\s\S]*onClick[\s\S]*\}\s*\)/.test(code) ||
  /\(\s*props\s*\)/.test(code);

const usesReusableButton = (code) => /<\w*Button[\s\S]*onClick=/.test(code);

const focusesInputRef = (code) => /\.current\.focus\(\)/.test(code);

const createsInputRef = (code) =>
  /const\s+inputRef\s*=\s*(?:React\.)?useRef\(/.test(code);

const attachesInputRef = (code) =>
  createsInputRef(code) &&
  /<input[\s\S]*ref=\{\s*inputRef\s*\}[\s\S]*\/?>/.test(code);

const fetchesJsonPlaceholderUsers = (code) =>
  /fetch\(\s*['"]https:\/\/jsonplaceholder\.typicode\.com\/users['"]/.test(
    code,
  );

const catchesFetchErrors = (code) =>
  /\.catch\(|try\s*\{[\s\S]*catch\s*\(/.test(code);

const displaysErrorMessage = (code) =>
  /error\s*&&|if\s*\(\s*error\s*\)|\?\s*<[^>]+>[\s\S]*error/.test(code);

const displaysStateErrorMessage = (code) =>
  /const\s*\[\s*error\s*,\s*setError\s*\]\s*=\s*useState/.test(code) &&
  displaysErrorMessage(code);

const createsReactContext = (code) => /createContext\(/.test(code);

const providesContextValue = (code) => /\.Provider[\s\S]*value=\{/.test(code);

const consumesContextValue = (code) => /useContext\(/.test(code);

const rendersChildWithProps = (code) =>
  /<\w+[\s\S]*(name|age|title|label)=/.test(code);

const destructuresProps = (code) =>
  /\(\s*\{[^}]+(?:name|age|title|label)[^}]*\}\s*\)/.test(code) ||
  /const\s*\{[^}]+(?:name|age|role|title|label)[^}]*\}\s*=\s*props/.test(code);

const returnsReactFragment = (code) =>
  /<>\s*[\s\S]*<\/>|<React\.Fragment[\s\S]*<\/React\.Fragment>/.test(code);

const rendersFragmentHeading = (code) =>
  returnsReactFragment(code) && /<h2|<h3/.test(code);

const rendersFragmentText = (code) =>
  returnsReactFragment(code) && /<p/.test(code);

const usesOptionalChaining = (code) => /\?\./.test(code);

const usesOptionalFallback = (code) =>
  usesOptionalChaining(code) && /\?\?|Unknown|N\/A|Not provided/.test(code);

const rendersDerivedCityValue = (code) =>
  /\{\s*city\s*\}/.test(code) &&
  /const\s+city\s*=\s*[^;]*\?\.[^;]*(?:\?\?|Unknown|N\/A|Not provided)/.test(
    code,
  );

const memoizesReactComponent = (code) => /React\.memo\(|\bmemo\(/.test(code);

const rendersMemoizedComponent = (code) => /<Memo\w+|<\w*Memo\w*/.test(code);

const passesCountToMemoizedComponent = (code) =>
  memoizesReactComponent(code) && /count=\{\s*count\s*\}/.test(code);

export const bookingDateDifferenceCheck = {
  id: "booking-calendar-date-difference",
  type: "runtime",
};

export const codeChallenges = [
  {
    id: "simple-counter",
    title: "Simple Counter",
    skill: "useState Basics",
    difficulty: "Easy",
    componentName: "SimpleCounter",
    instructions:
      "Build a counter that stores count in state and increments by one when the button is clicked.",
    starter: `function SimpleCounter() {
  // TODO: store count in state and increment it from the button.
  const count = 0;

  return (
    <section className="preview-card">
      <h2>Counter</h2>
      <strong>{count}</strong>
      <button type="button">Increment</button>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores count in state",
        check: "const [count, setCount] = useState",
      },
      { label: "Updates count from click", check: incrementsSimpleCounter },
      { label: "Renders current count", check: rendersStateCount },
      { label: "Uses a button handler", check: /<button[\s\S]*onClick=/ },
    ],
  },
  {
    id: "user-directory",
    title: "User Directory",
    skill: "API Fetching + Controlled Input",
    difficulty: "Medium",
    componentName: "UserDirectory",
    instructions:
      "Build a React component that renders a searchable user directory with controlled input state and a filtered list.",
    starter: `function UserDirectory() {
  // TODO: add query state and update it from the input.
  const query = "";
  const users = ["Anthony", "Maya", "Riley", "Jordan"];
  const visibleUsers = users;

  return (
    <section className="preview-card">
      <h2>User Directory</h2>
      <input aria-label="Search users" placeholder="Search users" />
      <ul>
        {visibleUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores query in state",
        check: "const [query, setQuery] = useState",
      },
      { label: "Updates query from input", check: matchesSetQueryFromInput },
      { label: "Filters users by query", check: filtersUsersByQuery },
      { label: "Matches lowercase search", check: matchesLowercaseSearch },
    ],
  },
  {
    id: "todo-list",
    title: "Todo List",
    skill: "Controlled Input + List State",
    difficulty: "Medium",
    componentName: "TodoList",
    instructions:
      "Build a dynamic todo list that stores todos in state, adds new items immutably, removes items, and renders the list.",
    starter: `function TodoList() {
  // TODO: store todos and input text in state.
  const todos = [];
  const text = "";

  const addTodo = () => {
    // TODO: add the current text as a new todo item.
  };

  const removeTodo = (id) => {
    // TODO: remove the matching todo item.
  };

  return (
    <section className="preview-card">
      <h2>Todos</h2>
      <input placeholder="New todo" />
      <button type="button">Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button type="button">Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores todos in state",
        check: "const [todos, setTodos] = useState",
      },
      { label: "Stores todo text in state", check: storesTodoText },
      { label: "Adds todos immutably", check: appendsTodoImmutably },
      { label: "Renders todos with keys", check: rendersStateTodosWithKeys },
      { label: "Removes todos immutably", check: removesTodoImmutably },
    ],
  },
  {
    id: "reusable-button",
    title: "Reusable Button",
    skill: "Component Props",
    difficulty: "Easy",
    componentName: "ReusableButtonDemo",
    instructions:
      "Build a reusable button component that accepts display content and an onClick handler through props.",
    starter: `function ReusableButtonDemo() {
  // TODO: create a Button component and reuse it for multiple actions.
  const count = 0;

  return (
    <section className="preview-card">
      <h2>Reusable Button</h2>
      <p>Count: {count}</p>
      <button type="button">Increment</button>
      <button type="button">Reset</button>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores count in state",
        check: "const [count, setCount] = useState",
      },
      { label: "Declares a reusable Button", check: declaresReusableButton },
      { label: "Accepts button props", check: passesButtonProps },
      { label: "Uses reusable buttons", check: usesReusableButton },
    ],
  },
  {
    id: "product-filter",
    title: "Product Filter",
    skill: "Derived State + Sorting",
    difficulty: "Medium",
    componentName: "ProductFilter",
    instructions:
      "Build a React component that filters products by category and sorts them by price from low to high.",
    starter: `function ProductFilter() {
  // TODO: track selected category in state.
  const category = "all";
  const products = [
    { id: 1, name: "Keyboard", category: "tools", price: 89 },
    { id: 2, name: "Notebook", category: "office", price: 12 },
    { id: 3, name: "Mouse", category: "tools", price: 35 }
  ];

  const filtered = products;

  return (
    <section className="preview-card">
      <h2>Product Filter</h2>
      <select defaultValue={category}>
        <option value="all">All</option>
        <option value="tools">Tools</option>
        <option value="office">Office</option>
      </select>
      {filtered.map((product) => (
        <p key={product.id}>{product.name} - {product.price}</p>
      ))}
    </section>
  );
}`,
    tests: [
      {
        label: "Stores category in state",
        check: "const [category, setCategory] = useState",
      },
      { label: "Updates selected category", check: updatesCategoryFromInput },
      {
        label: "Filters by selected category",
        check: filtersBySelectedCategory,
      },
      { label: "Sorts by ascending price", check: sortsByAscendingPrice },
    ],
  },
  {
    id: "add-to-cart",
    title: "Add to Cart",
    skill: "Immutable State Updates",
    difficulty: "Medium",
    componentName: "CartBuilder",
    instructions:
      "Build a React cart component that adds items, updates quantities immutably, and calculates the total.",
    starter: `function CartBuilder() {
  // TODO: store cart items in state and update immutably.
  const products = [
    { id: 1, name: "Hoodie", price: 48 },
    { id: 2, name: "Sticker", price: 4 }
  ];
  const cart = [];

  const addToCart = (product) => {
    // TODO: add or update product quantity.
  };

  const total = 0;

  return (
    <section className="preview-card">
      <h2>Cart</h2>
      {products.map((product) => (
        <button key={product.id}>
          Add {product.name}
        </button>
      ))}
      <p>Items: {cart.length}</p>
      <strong>Total: {total}</strong>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores cart in state",
        check: "const [cart, setCart] = useState",
      },
      {
        label: "Uses functional state update",
        check: /setCart\(\(?\s*(\w+)\s*\)?\s*=>/,
      },
      { label: "Adds items immutably", check: addsCartItemsImmutably },
      {
        label: "Calculates total with reduce",
        check: calculatesTotalWithReduce,
      },
    ],
  },
  {
    id: "editable-table",
    title: "Editable Table",
    skill: "Table Rendering + Controlled Input",
    difficulty: "Hard",
    componentName: "EditableTable",
    instructions:
      "Build a React editable table where changing an input updates one field immutably.",
    starter: `function EditableTable() {
  // TODO: move rows into state and update cells immutably.
  const rows = [
    { id: 1, name: "Launch page", owner: "Maya" },
    { id: 2, name: "Checkout", owner: "Anthony" }
  ];

  const handleChange = (id, field, value) => {
    // TODO: update the matching row.
  };

  return (
    <section className="preview-card">
      <h2>Editable Table</h2>
      <table>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <input defaultValue={row.name} />
              </td>
              <td>{row.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores rows in state",
        check: "const [rows, setRows] = useState",
      },
      { label: "Uses functional row update", check: usesFunctionalRowUpdate },
      { label: "Finds matching row id", check: findsMatchingRowId },
      {
        label: "Updates dynamic field immutably",
        check: updatesDynamicFieldImmutably,
      },
    ],
  },
  {
    id: "booking-calendar",
    title: "Booking Calendar",
    skill: "Date Handling + Conditional UI",
    difficulty: "Medium",
    componentName: "BookingCalendar",
    instructions:
      "Build a React component that tracks start/end dates and displays the selected number of days.",
    starter: `function BookingCalendar() {
  // TODO: track start/end dates in state and calculate the range.
  const start = "";
  const end = "";
  const days = 0;

  return (
    <section className="preview-card">
      <h2>Booking Calendar</h2>
      <input type="date" />
      <input type="date" />
      {days > 0 ? <strong>{days} days selected</strong> : <p>Select a range</p>}
    </section>
  );
}`,
    tests: [
      {
        label: "Stores start date in state",
        check: "const [start, setStart] = useState",
      },
      {
        label: "Stores end date in state",
        check: "const [end, setEnd] = useState",
      },
      {
        label: "Calculates date difference",
        check: bookingDateDifferenceCheck,
      },
      { label: "Updates date inputs", check: updatesDateInputs },
    ],
  },
  {
    id: "file-uploader",
    title: "File Uploader",
    skill: "File API + Preview State",
    difficulty: "Hard",
    componentName: "FileUploader",
    instructions:
      "Build a React file uploader that stores the selected file, progress, and preview URL.",
    starter: `function FileUploader() {
  // TODO: store file name, upload progress, and preview URL in state.
  const fileName = "";
  const progress = 0;
  const previewUrl = "";

  const handleUpload = (event) => {
    // TODO: read the selected file and create a preview URL.
  };

  return (
    <section className="preview-card">
      <h2>File Uploader</h2>
      <input type="file" />
      <progress value={progress} max="100" />
      <p>{fileName || "No file selected"}</p>
      {previewUrl && <small>Preview ready</small>}
    </section>
  );
}`,
    tests: [
      {
        label: "Stores selected file name",
        check: "const [fileName, setFileName] = useState",
      },
      { label: "Updates progress state", check: "setProgress" },
      { label: "Reads selected file", check: readsSelectedFile },
      { label: "Creates preview URL", check: createsPreviewUrl },
    ],
  },
  {
    id: "chat-ui",
    title: "Chat App UI",
    skill: "Array Rendering + Auto Scroll",
    difficulty: "Hard",
    componentName: "ChatApp",
    instructions:
      "Build a React chat UI with message state, a controlled input, and a send handler.",
    starter: `function ChatApp() {
  // TODO: store messages and input text in state.
  const messages = [
    { id: 1, author: "Maya", text: "Ready for standup?" }
  ];
  const text = "";

  const sendMessage = () => {
    // TODO: append a new message and clear the input.
  };

  return (
    <section className="preview-card">
      <h2>Chat</h2>
      <div className="message-list">
        {messages.map((message) => (
          <p key={message.id}><strong>{message.author}:</strong> {message.text}</p>
        ))}
      </div>
      <input placeholder="Type a message" />
      <button>Send</button>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores messages in state",
        check: "const [messages, setMessages] = useState",
      },
      {
        label: "Stores input text in state",
        check: "const [text, setText] = useState",
      },
      { label: "Appends message immutably", check: appendsMessageImmutably },
      { label: "Clears input after send", check: clearsTextInput },
    ],
  },
  {
    id: "theme-toggle",
    title: "Theme Toggle",
    skill: "DOM State + Persistence",
    difficulty: "Hard",
    componentName: "ThemeToggle",
    instructions:
      "Build a React theme toggle that stores theme state and persists it to localStorage.",
    starter: `function ThemeToggle() {
  // TODO: track theme in state and persist changes.
  const theme = "light";

  useEffect(() => {
    // TODO: update document class and localStorage.
  }, [theme]);

  return (
    <section className={"preview-card " + theme}>
      <h2>Theme Toggle</h2>
      <p>Current theme: {theme}</p>
      <button>
        Toggle theme
      </button>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores theme in state",
        check: "const [theme, setTheme] = useState",
      },
      { label: "Updates document class", check: updatesDocumentTheme },
      { label: "Persists to localStorage", check: persistsTheme },
      { label: "Toggles theme value", check: togglesThemeValue },
    ],
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll",
    skill: "Pagination + Intersection Observer",
    difficulty: "Hard",
    componentName: "InfiniteScrollList",
    instructions:
      "Build a React infinite-scroll list that renders a paged slice of items in a scrollable panel and observes the load-more target at the bottom.",
    starter: `function InfiniteScrollList() {
  // TODO: track page and observe the load-more target.
  const page = 1;
  const items = [
    "React", "Next.js", "Accessibility", "State", "Effects", "Refs",
    "Memoization", "Routing", "Forms", "Validation", "Testing", "Deploys",
    "Performance", "Animations", "APIs", "Caching", "Layouts", "Debugging"
  ];
  const visibleItems = items;
  const loadMoreRef = null;

  useEffect(() => {
    // TODO: create an IntersectionObserver and clean it up.
  }, []);

  return (
    <section className="preview-card">
      <h2>Infinite Scroll</h2>
      <div className="scroll-list">
        {visibleItems.map((item) => <p key={item}>{item}</p>)}
        <div ref={loadMoreRef}>Load page {page + 1}</div>
      </div>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores page in state",
        check: "const [page, setPage] = useState",
      },
      { label: "Creates load-more ref", check: createsRef },
      {
        label: "Creates observer instance",
        check: createsIntersectionObserver,
      },
      { label: "Renders paged items", check: rendersPagedItems },
      { label: "Cleans up observer", check: cleansUpObserver },
    ],
  },
  {
    id: "focus-input-ref",
    title: "Focus Input Ref",
    skill: "useRef + DOM Access",
    difficulty: "Easy",
    componentName: "FocusInputRef",
    instructions:
      "Build a component that stores an input ref and focuses the input when a button is clicked.",
    starter: `function FocusInputRef() {
  // TODO: create an input ref and focus it from the button.
  const inputRef = null;

  return (
    <section className="preview-card">
      <h2>Focus Input</h2>
      <input ref={inputRef} placeholder="Focus me" />
      <button type="button">Focus input</button>
    </section>
  );
}`,
    tests: [
      { label: "Creates input ref", check: createsInputRef },
      { label: "Attaches ref to input", check: attachesInputRef },
      { label: "Focuses the input", check: focusesInputRef },
      { label: "Uses a button handler", check: /<button[\s\S]*onClick=/ },
    ],
  },
  {
    id: "login-form",
    title: "Login Form",
    skill: "Validation + Error Handling",
    difficulty: "Medium",
    componentName: "LoginForm",
    instructions:
      "Build a React login form with controlled fields, validation, and error display.",
    starter: `function LoginForm() {
  // TODO: control form fields and validation state.
  const form = { email: "", password: "" };
  const error = "";

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: validate email and password.
  };

  return (
    <section className="preview-card">
      <h2>Login</h2>
      <form>
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        {error && <p className="error">{error}</p>}
        <button>Sign in</button>
      </form>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores form in state",
        check: "const [form, setForm] = useState",
      },
      {
        label: "Stores validation error",
        check: "const [error, setError] = useState",
      },
      { label: "Updates email field", check: updatesEmailField },
      { label: "Sets validation error", check: "setError(" },
    ],
  },
  {
    id: "api-error-handling",
    title: "API Error Handling",
    skill: "Fetch + Error State",
    difficulty: "Medium",
    componentName: "ApiErrorHandling",
    resources: [
      {
        label: "Fetches demo users",
        url: "https://jsonplaceholder.typicode.com/users",
        method: "GET",
        contentType: "json",
      },
    ],
    instructions:
      "Build a user fetcher that stores API data and shows an error message when the request fails.",
    starter: `function ApiErrorHandling() {
  // TODO: fetch users and store any request error.
  const users = [];
  const error = "";

  useEffect(() => {
    // TODO: fetch users and handle failures.
  }, []);

  return (
    <section className="preview-card">
      <h2>API Users</h2>
      {error && <p className="error">Error: {error}</p>}
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </section>
  );
}`,
    tests: [
      {
        label: "Stores users in state",
        check: "const [users, setUsers] = useState",
      },
      {
        label: "Stores error in state",
        check: "const [error, setError] = useState",
      },
      { label: "Fetches user data", check: fetchesJsonPlaceholderUsers },
      { label: "Handles fetch errors", check: catchesFetchErrors },
      { label: "Displays error message", check: displaysStateErrorMessage },
    ],
  },
  {
    id: "context-api",
    title: "Context API",
    skill: "Shared State",
    difficulty: "Medium",
    componentName: "ContextApiDemo",
    instructions:
      "Build a small Context API example that provides a user object and reads it in a child component.",
    starter: `function ContextApiDemo() {
  // TODO: create context, provide a user, and read it in a child.
  const user = { name: "Anthony", role: "Developer" };

  function ProfileSummary() {
    return <p>User name</p>;
  }

  return (
    <section className="preview-card">
      <h2>Context API</h2>
      <ProfileSummary />
    </section>
  );
}`,
    tests: [
      { label: "Creates context", check: createsReactContext },
      { label: "Provides context value", check: providesContextValue },
      { label: "Consumes context value", check: consumesContextValue },
      { label: "Renders user data", check: /\.name|\.role/ },
    ],
  },
  {
    id: "props-communication",
    title: "Props Communication",
    skill: "Parent to Child Props",
    difficulty: "Easy",
    componentName: "PropsCommunication",
    instructions:
      "Build a parent component that passes props to a child component and renders those values in the child.",
    starter: `function PropsCommunication() {
  // TODO: pass name and role from the parent to the child.
  function ProfileCard() {
    return <p>Profile details</p>;
  }

  return (
    <section className="preview-card">
      <h2>Props</h2>
      <ProfileCard />
    </section>
  );
}`,
    tests: [
      { label: "Renders child with props", check: rendersChildWithProps },
      { label: "Destructures child props", check: destructuresProps },
      { label: "Renders name prop", check: /\{\s*name\s*\}/ },
      {
        label: "Renders another prop",
        check: /\{\s*(age|role|title|label)\s*\}/,
      },
    ],
  },
  {
    id: "react-fragment",
    title: "React Fragment",
    skill: "JSX Structure",
    difficulty: "Easy",
    componentName: "FragmentDemo",
    instructions:
      "Build a component that replaces the preview-card section with a React Fragment, returning the heading and paragraph as sibling elements without adding an extra DOM node.",
    starter: `function FragmentDemo() {
  // TODO: replace the section wrapper with a Fragment.
  return (
    <section className="preview-card">
      <h2>Fragment</h2>
      <p>Description</p>
    </section>
  );
}`,
    tests: [
      { label: "Returns a Fragment", check: returnsReactFragment },
      { label: "Renders a heading", check: rendersFragmentHeading },
      { label: "Renders supporting text", check: rendersFragmentText },
      {
        label: "Avoids preview-card wrapper",
        check: (code) => !/className=["']preview-card["']/.test(code),
      },
    ],
  },
  {
    id: "optional-chaining",
    title: "Optional Chaining",
    skill: "Safe Property Access",
    difficulty: "Easy",
    componentName: "OptionalChainingDemo",
    instructions:
      "Build a component that safely reads nested user profile values with optional chaining and a fallback.",
    starter: `function OptionalChainingDemo() {
  // TODO: safely read the user's city from nested profile data.
  const user = {
    name: "Anthony",
    profile: null
  };
  const city = "Unknown";

  return (
    <section className="preview-card">
      <h2>Optional Chaining</h2>
      <p>City: {city}</p>
    </section>
  );
}`,
    tests: [
      { label: "Uses optional chaining", check: usesOptionalChaining },
      { label: "Reads nested profile data", check: /profile\?\.|user\?\./ },
      { label: "Provides a fallback", check: usesOptionalFallback },
      { label: "Renders city value", check: rendersDerivedCityValue },
    ],
  },
  {
    id: "react-memo",
    title: "React.memo",
    skill: "Render Optimization",
    difficulty: "Medium",
    componentName: "ReactMemoDemo",
    instructions:
      "Build a small React.memo example that memoizes a child component to avoid unnecessary re-renders.",
    starter: `function ReactMemoDemo() {
  // TODO: wrap the child display component in React.memo.
  const count = 0;

  function CountDisplay({ count }) {
    return <p>Count: {count}</p>;
  }

  return (
    <section className="preview-card">
      <h2>React.memo</h2>
      <CountDisplay count={count} />
      <button type="button">Increment</button>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores count in state",
        check: "const [count, setCount] = useState",
      },
      { label: "Uses React.memo", check: memoizesReactComponent },
      { label: "Renders memoized component", check: rendersMemoizedComponent },
      { label: "Passes count as prop", check: passesCountToMemoizedComponent },
    ],
  },
  {
    id: "accordion",
    title: "Accordion",
    skill: "Conditional Rendering + State",
    difficulty: "Medium",
    componentName: "AccordionFAQ",
    instructions:
      "Build an accordion that renders FAQ buttons and shows only the selected answer panel.",
    starter: `function AccordionFAQ() {
  // TODO: track the open item and toggle it from each button.
  const faqs = [
    { id: "shipping", question: "How fast is shipping?", answer: "Most orders ship in 2 business days." },
    { id: "returns", question: "Can I return an item?", answer: "Returns are accepted within 30 days." },
    { id: "support", question: "How do I contact support?", answer: "Email support@example.com." }
  ];
  const openId = "";

  return (
    <section className="preview-card">
      <h2>FAQ</h2>
      {faqs.map((faq) => (
        <div className="accordion-item" key={faq.id}>
          <button type="button">{faq.question}</button>
          <p>{faq.answer}</p>
        </div>
      ))}
    </section>
  );
}`,
    tests: [
      {
        label: "Stores open item in state",
        check:
          /const\s*\[\s*(openId|activeId|expandedId|activeIndex|openIndex)\s*,\s*set\w+\s*\]\s*=\s*useState/,
      },
      { label: "Renders accordion buttons", check: rendersAccordionButtons },
      { label: "Toggles selected panel", check: togglesAccordionPanel },
      {
        label: "Conditionally renders content",
        check: conditionallyRendersAccordionContent,
      },
    ],
  },
  {
    id: "carousel",
    title: "Carousel",
    skill: "Array Indexing + Navigation",
    difficulty: "Medium",
    componentName: "ImageCarouselChallenge",
    instructions:
      "Build a carousel with previous and next controls that wraps through a list of slides.",
    starter: `function ImageCarouselChallenge() {
  // TODO: track the active slide index and wire the Previous/Next buttons.
  const slides = [
    { id: 1, title: "Launch", description: "Ship the first version." },
    { id: 2, title: "Measure", description: "Review user feedback." },
    { id: 3, title: "Iterate", description: "Improve the experience." }
  ];
  const index = 0;
  const slide = slides[index];

  return (
    <section className="preview-card carousel">
      <h2>{slide.title}</h2>
      <p>{slide.description}</p>
      <div className="carousel-actions">
        <button type="button">Previous</button>
        <button type="button">Next</button>
      </div>
    </section>
  );
}`,
    tests: [
      { label: "Stores active slide index", check: storesCarouselIndex },
      { label: "Renders active slide", check: rendersStateBackedActiveSlide },
      { label: "Advances to next slide", check: advancesCarousel },
      { label: "Moves to previous slide", check: reversesCarousel },
    ],
  },
  {
    id: "job-board",
    title: "Job Board",
    skill: "Fetching + Pagination",
    difficulty: "Hard",
    componentName: "JobBoard",
    resources: [
      {
        label: "Fetches job posting IDs",
        url: "https://hacker-news.firebaseio.com/v0/jobstories.json",
        method: "GET",
        contentType: "json",
      },
      {
        label: "Fetches job posting details given its ID",
        url: "https://hacker-news.firebaseio.com/v0/item/{id}.json",
        method: "GET",
        contentType: "json",
      },
    ],
    instructions:
      "Build a Hacker News job board that fetches job IDs, fetches job details, renders 6 jobs, and loads 6 more at a time.",
    starter: `function JobBoard() {
  // TODO: fetch job IDs from Hacker News, then fetch visible job details.
  const jobs = [];
  const visibleCount = 6;

  return (
    <section className="preview-card job-board">
      <h2>Job Board</h2>
      <article className="job-card">
        <h3>Job Title</h3>
        <p>Company Name</p>
      </article>
      <button type="button">Load more</button>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores jobs in state",
        check: "const [jobs, setJobs] = useState",
      },
      { label: "Fetches job story IDs", check: fetchesJobStories },
      { label: "Fetches job details", check: fetchesJobDetails },
      { label: "Renders job cards", check: rendersJobCards },
      { label: "Loads 6 more jobs", check: loadsMoreJobs },
    ],
  },
  {
    id: "tabs",
    title: "Tabs",
    skill: "Component State + Conditional Panels",
    difficulty: "Medium",
    componentName: "ProfileTabs",
    instructions:
      "Build tabs that show one active panel at a time and update when a tab button is clicked.",
    starter: `function ProfileTabs() {
  // TODO: track the active tab and render only that tab's panel.
  const tabs = [
    { value: "overview", label: "Overview", panel: "Anthony builds front-end systems." },
    { value: "projects", label: "Projects", panel: "Portfolio, games, and internal tools." },
    { value: "contact", label: "Contact", panel: "Reach out by email." }
  ];
  const activeTab = "overview";

  return (
    <section className="preview-card tabs-demo">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button type="button" key={tab.value}>{tab.label}</button>
        ))}
      </div>
      <p>{tabs[0].panel}</p>
    </section>
  );
}`,
    tests: [
      { label: "Stores active tab in state", check: storesActiveTab },
      { label: "Renders tab buttons", check: rendersTabButtons },
      { label: "Shows active panel", check: rendersActiveTabPanel },
      { label: "Highlights active tab", check: highlightsStateBackedActiveTab },
    ],
  },
  {
    id: "throttle",
    title: "Throttle Clicks",
    skill: "Rate Limiting + Refs",
    difficulty: "Medium",
    componentName: "ThrottleCounter",
    instructions:
      "Build a throttled counter where rapid clicks can only increment once per delay window.",
    starter: `function ThrottleCounter() {
  // TODO: throttle clicks so the count updates at most once every 1000ms.
  const count = 0;

  const handleClick = () => {
    // TODO: ignore clicks that happen too soon.
  };

  return (
    <section className="preview-card">
      <h2>Throttle</h2>
      <strong>{count}</strong>
      <button type="button">Increment</button>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores count in state",
        check: "const [count, setCount] = useState",
      },
      { label: "Creates throttle guard", check: createsThrottleHandler },
      { label: "Checks elapsed time", check: guardsThrottleTiming },
      { label: "Updates count", check: updatesThrottledCount },
    ],
  },
  {
    id: "debounce",
    title: "Debounced Search",
    skill: "Timers + Controlled Input",
    difficulty: "Medium",
    componentName: "DebouncedSearch",
    instructions:
      "Build a debounced search preview that updates the displayed search value only after typing pauses.",
    starter: `function DebouncedSearch() {
  // TODO: store input text and a debounced value.
  const text = "";
  const debouncedText = "";

  return (
    <section className="preview-card">
      <h2>Debounced Search</h2>
      <input placeholder="Search" />
      <p>Searching for: {debouncedText || "Nothing yet"}</p>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores input text in state",
        check: "const [text, setText] = useState",
      },
      { label: "Stores debounced value", check: storesDebouncedValue },
      { label: "Creates debounce timer", check: createsDebounceHandler },
      { label: "Updates after delay", check: updatesDebouncedValue },
    ],
  },
  {
    id: "counter-batching",
    title: "Counter Batching",
    skill: "Functional State Updates",
    difficulty: "Easy",
    componentName: "BatchingCounter",
    instructions:
      "Build a counter where one click increments by 3 using functional setCount updates instead of stale state.",
    starter: `function BatchingCounter() {
  // TODO: make one click add 3, despite React batching state updates.
  const count = 0;

  const addThree = () => {
    // TODO: call setCount three times with functional updates.
  };

  return (
    <section className="preview-card">
      <h2>Counter</h2>
      <strong>{count}</strong>
      <button type="button">+3</button>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores count in state",
        check: "const [count, setCount] = useState",
      },
      {
        label: "Calls setCount three times",
        check: callsSetCountMultipleTimes,
      },
      { label: "Uses functional updates", check: usesFunctionalCountUpdate },
      { label: "Adds one each update", check: /\+\s*1/ },
    ],
  },
  {
    id: "dedupe-array",
    title: "Dedupe Array",
    skill: "JavaScript Data Structures",
    difficulty: "Easy",
    componentName: "DedupeArray",
    instructions:
      "Build a component that removes duplicate numbers from an array and renders the unique values.",
    starter: `function DedupeArray() {
  // TODO: remove duplicate values without mutating the original array.
  const nums = [1, 2, 2, 3, 4, 4, 5];
  const uniqueNums = nums;

  return (
    <section className="preview-card">
      <h2>Dedupe Array</h2>
      <p>{uniqueNums.join(", ")}</p>
    </section>
  );
}`,
    tests: [
      { label: "Uses Set for uniqueness", check: dedupesWithSet },
      { label: "Keeps original array intact", check: createsUniqueNumsFromSet },
      { label: "Renders unique values", check: rendersUniqueNums },
      { label: "Includes source array", check: keepsNumsAsSourceArray },
    ],
  },
  {
    id: "sort-users-by-name",
    title: "Sort Users by Name",
    skill: "Array Sorting",
    difficulty: "Easy",
    componentName: "SortedUsers",
    instructions:
      "Build a component that sorts users alphabetically by name without mutating the original array.",
    starter: `function SortedUsers() {
  // TODO: sort users by name without mutating the users array.
  const users = [
    { id: 3, name: "Alex" },
    { id: 2, name: "Mike" },
    { id: 1, name: "Sarah" }
  ];
  const sortedUsers = users;

  return (
    <section className="preview-card">
      <h2>Sorted Users</h2>
      {sortedUsers.map((user) => <p key={user.id}>{user.name}</p>)}
    </section>
  );
}`,
    tests: [
      {
        label: "Copies array before sorting",
        check: /\[\s*\.\.\.users\s*\]|users\.slice\(\)/,
      },
      { label: "Sorts by name", check: sortsUsersByName },
      { label: "Renders sorted users", check: rendersSortedUsers },
      { label: "Uses stable user keys", check: usesStableSortedUserKeys },
    ],
  },
  {
    id: "memoize-function",
    title: "Memoize Function",
    skill: "Closures + Caching",
    difficulty: "Hard",
    componentName: "MemoizeDemo",
    instructions:
      "Write a memoized multiply-by-two helper that stores cached results in a closure and renders repeated calls.",
    starter: `function MemoizeDemo() {
  // TODO: implement memoizeTimesTwo with a closure cache.
  const memoizeTimesTwo = () => {
    return (num) => num * 2;
  };

  const timesTwo = memoizeTimesTwo();
  const first = timesTwo(10);
  const second = timesTwo(10);

  return (
    <section className="preview-card">
      <h2>Memoize</h2>
      <p>{first} / {second}</p>
    </section>
  );
}`,
    tests: [
      { label: "Creates closure cache", check: memoizesWithClosure },
      { label: "Checks cache before calculating", check: checksMemoCache },
      { label: "Stores calculated result", check: storesMemoResult },
      { label: "Returns cached function", check: returnsCachedFunction },
    ],
  },
  {
    id: "rotate-matrix",
    title: "Rotate Matrix",
    skill: "Matrix Transformation",
    difficulty: "Hard",
    componentName: "MatrixRotator",
    instructions:
      "Build a component that rotates a square matrix 90 degrees clockwise and renders the rotated rows.",
    starter: `function MatrixRotator() {
  // TODO: rotate this matrix 90 degrees clockwise.
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  const rotated = matrix;

  return (
    <section className="preview-card">
      <h2>Rotate Matrix</h2>
      {rotated.map((row) => <p key={row.join("-")}>{row.join(" ")}</p>)}
    </section>
  );
}`,
    tests: [
      { label: "Maps matrix columns", check: mapsMatrixColumns },
      { label: "Reads row values by index", check: /row\[\s*\w+\s*\]/ },
      { label: "Reverses rows or columns", check: ".reverse()" },
      { label: "Renders rotated matrix", check: rendersRotatedMatrix },
    ],
  },
  {
    id: "sort-object-keys",
    title: "Sort Object Keys",
    skill: "Objects + Reduce",
    difficulty: "Medium",
    componentName: "SortedObjectKeys",
    instructions:
      "Build a component that creates a new object with keys sorted alphabetically and renders the key/value pairs.",
    starter: `function SortedObjectKeys() {
  // TODO: create a new object with alphabetically sorted keys.
  const unordered = {
    b: "foo",
    c: "bar",
    a: "baz"
  };
  const ordered = unordered;

  return (
    <section className="preview-card">
      <h2>Sorted Object</h2>
      {Object.entries(ordered).map(([key, value]) => (
        <p key={key}>{key}: {value}</p>
      ))}
    </section>
  );
}`,
    tests: [
      { label: "Reads object keys", check: "Object.keys(unordered)" },
      { label: "Sorts keys", check: sortsObjectByKeys },
      { label: "Builds new object", check: /\.reduce\(|for\s*\(/ },
      { label: "Renders ordered entries", check: rendersSortedObjectEntries },
    ],
  },
  {
    id: "event-delegation",
    title: "Event Delegation",
    skill: "DOM Events",
    difficulty: "Medium",
    componentName: "DelegatedMenu",
    instructions:
      "Build a menu that uses one parent click handler and reads the clicked item's data attribute.",
    starter: `function DelegatedMenu() {
  // TODO: use one parent click handler to select a menu item.
  const [selected, setSelected] = useState("");
  const items = ["Profile", "Billing", "Security"];

  const handleMenuClick = (event) => {
    // TODO: read the clicked item's data value.
  };

  return (
    <section className="preview-card">
      <h2>Delegated Menu</h2>
      <div className="chips">
        {items.map((item) => (
          <button data-item={item} key={item} type="button">{item}</button>
        ))}
      </div>
      <p>Selected: {selected || "None"}</p>
    </section>
  );
}`,
    tests: [
      {
        label: "Stores selected item",
        check: storesSelectedFromDelegatedEvent,
      },
      { label: "Attaches one parent handler", check: usesEventDelegation },
      { label: "Reads data attribute", check: readsDelegatedId },
      {
        label: "Updates selected item",
        check: updatesSelectedFromDelegatedEvent,
      },
    ],
  },
  {
    id: "status-card",
    title: "Build a Status Card",
    skill: "Component Composition",
    difficulty: "Easy",
    componentName: "StatusCard",
    instructions:
      "Build a React status card component. Render the status and region from the app object, add a non-functional button labeled View logs, and give the article a status-card class.",
    starter: `function StatusCard() {
  // TODO: render the status and region from app, add a "View logs" button,
  // and change the article class to include status-card.
  const app = {
    name: "Portfolio API",
    status: "Healthy",
    region: "us-west-2"
  };

  return (
    <article className="preview-card">
      <h2>{app.name}</h2>
      <p>TODO: status</p>
    </article>
  );
}`,
    tests: [
      { label: "Renders status value", check: rendersStatusValue },
      { label: "Renders region value", check: rendersRegionValue },
      { label: "Adds logs action button", check: addsLogsActionButton },
      { label: "Uses status-card class", check: usesStatusCardClass },
    ],
  },
  {
    id: "filter-list",
    title: "Filter Active Users",
    skill: "JavaScript Data Flow",
    difficulty: "Medium",
    componentName: "ActiveUserList",
    instructions:
      "Build a React component that renders active user names sorted alphabetically.",
    starter: `function ActiveUserList() {
  // TODO: filter active users and sort their names.
  const users = [
    { name: "Maya", active: true },
    { name: "Drew", active: false },
    { name: "Anthony", active: true },
    { name: "Riley", active: true }
  ];

  const names = ["TODO"];

  return (
    <section className="preview-card">
      <h2>Active Users</h2>
      <div className="chips">
        <span className="chip">{names[0]}</span>
      </div>
    </section>
  );
}`,
    tests: [
      { label: "Filters active users", check: filtersActiveUsers },
      { label: "Maps to user names", check: mapsToUserNames },
      { label: "Sorts names alphabetically", check: sortsNamesAlphabetically },
      { label: "Renders chips from names", check: rendersChipsFromNames },
    ],
  },
];

const previewStyles = `
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    font-family: Arial, sans-serif;
    color: #14213d;
    background: #edf6f9;
  }

  #root {
    height: 100%;
  }

  main {
    min-height: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    padding: 24px;
  }

  .preview-card {
    display: grid;
    gap: 12px;
    width: min(100%, 420px);
    max-height: 100%;
    overflow: auto;
    border: 1px solid #b8d8d8;
    border-radius: 8px;
    padding: 24px;
    background: white;
    box-shadow: 0 18px 40px rgba(20, 33, 61, 0.14);
  }

  .preview-card.dark {
    background: #14213d;
    color: white;
  }

  .preview-card h2 {
    margin: 0;
    color: #0f4c5c;
    font-size: 1.45rem;
    line-height: 1.2;
  }

  .preview-card.dark h2 {
    color: #67e8f9;
  }

  .preview-card p,
  .preview-card li {
    margin: 6px 0;
    line-height: 1.45;
  }

  .preview-card ul {
    margin: 4px 0 0;
    padding-left: 22px;
  }

  .preview-card li {
    align-items: center;
    column-gap: 10px;
    flex-wrap: wrap;
  }

  .preview-card li:has(button) {
    display: flex;
  }

  .preview-card input,
  .preview-card select {
    width: 100%;
    border: 1px solid #b8d8d8;
    border-radius: 6px;
    background: #ffffff;
    color: #14213d;
    font: inherit;
    min-height: 38px;
    padding: 9px 10px;
    outline: none;
  }

  .preview-card input:focus,
  .preview-card select:focus {
    border-color: #0f4c5c;
    box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
  }

  .preview-card input[type="file"] {
    padding: 7px;
  }

  .preview-card input[type="file"]::file-selector-button {
    border: 0;
    border-radius: 5px;
    background: #0f4c5c;
    color: white;
    cursor: pointer;
    font-weight: 700;
    margin-right: 10px;
    padding: 8px 10px;
  }

  .preview-card input[type="date"] {
    color-scheme: light;
  }

  .preview-card table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .preview-card td {
    border-bottom: 1px solid #dbeafe;
    padding: 8px 0;
    vertical-align: middle;
  }

  .preview-card td:first-child {
    padding-right: 12px;
    width: 70%;
  }

  .preview-card progress {
    width: 100%;
    height: 10px;
    accent-color: #0f4c5c;
  }

  .preview-card button,
  .chip {
    border: 0;
    border-radius: 6px;
    background: #0f4c5c;
    color: white;
    cursor: pointer;
    font: inherit;
    font-weight: 700;
    margin: 4px 4px 4px 0;
    padding: 9px 12px;
  }

  .preview-card button:hover {
    background: #0b3d4a;
  }

  .accordion-item {
    display: grid;
    gap: 8px;
    border-bottom: 1px solid #dbeafe;
    padding-bottom: 10px;
  }

  .accordion-item button {
    text-align: left;
  }

  .carousel-actions,
  .tab-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tabs-demo .active,
  .tab-list .active {
    background: #fbbf24;
    color: #14213d;
  }

  .job-board {
    width: min(100%, 520px);
  }

  .job-card {
    display: grid;
    gap: 6px;
    border: 1px solid #dbeafe;
    border-radius: 6px;
    padding: 12px;
    background: #f8fafc;
  }

  .job-card h3 {
    margin: 0;
    color: #0f4c5c;
    font-size: 1rem;
    line-height: 1.3;
  }

  .preview-card form {
    display: grid;
    gap: 10px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .message-list {
    max-height: 160px;
    overflow: auto;
  }

  .scroll-list {
    display: grid;
    gap: 10px;
    max-height: 210px;
    overflow: auto;
    padding-right: 8px;
  }

  .scroll-list p {
    border: 1px solid #dbeafe;
    border-radius: 6px;
    margin: 0;
    padding: 10px;
    background: #f8fafc;
  }

  .error {
    color: #be123c;
    font-weight: 700;
  }
`;

export const codeChallengePreviewCss = previewStyles.trim();

const reactHookNames = [
  "createContext",
  "useContext",
  "useEffect",
  "useMemo",
  "useRef",
  "useState",
];

function parseReactImports(code) {
  const importPattern =
    /^\s*import\s+([^\n;]+?)\s+from\s+["']react["'];?\s*$/gm;
  const importedHooks = new Set();
  let hasDefaultImport = false;
  let match;

  while ((match = importPattern.exec(code)) !== null) {
    const importClause = match[1].trim();
    const namedImportMatch = importClause.match(/\{([^}]+)\}/);

    hasDefaultImport =
      hasDefaultImport ||
      /^[A-Za-z_$][\w$]*/.test(importClause.replace(/\{[^}]+\}/, "").trim());

    if (namedImportMatch) {
      namedImportMatch[1]
        .split(",")
        .map((item) =>
          item
            .trim()
            .split(/\s+as\s+/)[0]
            .trim(),
        )
        .filter(Boolean)
        .forEach((hookName) => importedHooks.add(hookName));
    }
  }

  return { hasDefaultImport, importedHooks };
}

function stripReactImports(code) {
  return code
    .replace(/^\s*import\s+[^\n;]+?\s+from\s+["']react["'];?\s*$/gm, "")
    .trim();
}

function getMissingReactImports(code) {
  const codeWithoutImports = stripReactImports(code);
  const { importedHooks } = parseReactImports(code);

  return reactHookNames.filter(
    (hookName) =>
      new RegExp(`(^|[^\\w$])${hookName}\\s*\\(`).test(codeWithoutImports) &&
      !importedHooks.has(hookName),
  );
}

function buildReactImportPreamble(code) {
  const { hasDefaultImport, importedHooks } = parseReactImports(code);
  const namedHooks = reactHookNames.filter((hookName) =>
    importedHooks.has(hookName),
  );
  const lines = [];

  if (hasDefaultImport) {
    lines.push("const React = window.React;");
  }

  if (namedHooks.length > 0) {
    lines.push(`const { ${namedHooks.join(", ")} } = React;`);
  }

  return lines.join("\n");
}

function buildImportError(message) {
  return `document.getElementById("root").innerHTML =
    '<pre style="white-space:pre-wrap;color:#9f1239;background:#fff1f2;padding:16px;border-radius:8px;">' +
    ${JSON.stringify(message)} +
    '</pre>';`;
}

function getPreparedPreviewCode(code) {
  const missingImports = getMissingReactImports(code);

  if (missingImports.length > 0) {
    return {
      error: `Missing React import: add ${missingImports.join(", ")} to an import from "react" at the top of the editor.`,
      source: "",
    };
  }

  return {
    error: "",
    source: `${buildReactImportPreamble(code)}\n${stripReactImports(code)}`,
  };
}

export function buildCodePreview(code, challengeId) {
  const challenge = codeChallenges.find((item) => item.id === challengeId);
  const componentName = challenge?.componentName || "StatusCard";
  const preparedCode = getPreparedPreviewCode(code);

  return `<!doctype html>
    <html>
      <head>
        <style>${previewStyles}</style>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      </head>
      <body>
        <main id="root"></main>
        <script type="text/babel">
          const sendConsoleMessage = (level, args) => {
            window.parent.postMessage({
              source: "code-challenge-console",
              challengeId: ${JSON.stringify(challengeId)},
              level,
              args: args.map((item) => {
                if (typeof item === "string") {
                  return item;
                }

                try {
                  return JSON.stringify(item);
                } catch {
                  return String(item);
                }
              }),
            }, "*");
          };

          ["log", "info", "warn", "error"].forEach((level) => {
            const original = console[level].bind(console);
            console[level] = (...args) => {
              sendConsoleMessage(level, args);
              original(...args);
            };
          });

          ${
            preparedCode.error
              ? buildImportError(preparedCode.error)
              : `try {
                  ${preparedCode.source}
                  const root = ReactDOM.createRoot(document.getElementById("root"));
                  root.render(React.createElement(${componentName}));
                } catch (error) {
                  console.error(error.message);
                  document.getElementById("root").innerHTML =
                    '<pre style="white-space:pre-wrap;color:#9f1239;background:#fff1f2;padding:16px;border-radius:8px;">' +
                    error.message +
                    '</pre>';
                }`
          }
        </script>
      </body>
    </html>`;
}

export function buildRuntimeCheckPreview(code, challengeId, testId) {
  const challenge = codeChallenges.find((item) => item.id === challengeId);
  const componentName = challenge?.componentName || "StatusCard";
  const preparedCode = getPreparedPreviewCode(code);

  return `<!doctype html>
    <html>
      <head>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      </head>
      <body>
        <main id="root"></main>
        <script type="text/babel">
          const { useEffect, useMemo, useRef, useState } = React;

          const report = (passed, error = "") => {
            const result = {
              source: "code-challenge-runtime-check",
              challengeId: ${JSON.stringify(challengeId)},
              testId: ${JSON.stringify(testId)},
              code: ${JSON.stringify(code)},
              passed,
              error,
            };

            if (window.parent.__codeChallengeRuntimeCheck) {
              window.parent.__codeChallengeRuntimeCheck(result);
              return;
            }

            window.parent.postMessage(result, "*");
          };

          const updateDateInput = (input, value) => {
            const valueSetter = Object.getOwnPropertyDescriptor(
              HTMLInputElement.prototype,
              "value",
            ).set;

            valueSetter.call(input, value);
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
          };

          ${
            preparedCode.error
              ? `report(false, ${JSON.stringify(preparedCode.error)});`
              : `try {
                  ${preparedCode.source}
                  const root = ReactDOM.createRoot(document.getElementById("root"));
                  root.render(React.createElement(${componentName}));

                  setTimeout(() => {
                    try {
                      if (${JSON.stringify(testId)} !== "booking-calendar-date-difference") {
                        report(false, "Unknown runtime check.");
                        return;
                      }

                      const inputs = Array.from(
                        document.querySelectorAll('input[type="date"]'),
                      );

                      if (inputs.length < 2) {
                        report(false, "Expected two date inputs.");
                        return;
                      }

                      updateDateInput(inputs[0], "2026-05-16");
                      updateDateInput(inputs[1], "2026-05-23");

                      setTimeout(() => {
                        const text = document.getElementById("root").textContent;
                        report(text.toLowerCase().includes("7 days selected"), text);
                      }, 250);
                    } catch (error) {
                      report(false, error.message);
                    }
                  }, 250);
                } catch (error) {
                  report(false, error.message);
                }`
          }
        </script>
      </body>
    </html>`;
}
