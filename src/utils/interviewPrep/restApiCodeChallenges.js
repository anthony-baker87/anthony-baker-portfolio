const definesEndpoint = (code) =>
  /const\s+\w*url\w*\s*=\s*["'](?:\/api\/|https?:\/\/)/i.test(code);

const usesFetch = (code) => /fetch\(/.test(code);

const usesGetRequest = (code) =>
  /fetch\(\s*\w*url\w*\s*\)/i.test(code) || /method\s*:\s*["']GET["']/i.test(code);

const parsesJson = (code) => /\.json\(\)/.test(code);

const rendersResponseData = (code) =>
  /\.map\(/.test(code) || /\{\s*\w+(?:\.\w+)+\s*\}/.test(code);

const buildsPostRequest = (code) =>
  /method\s*:\s*["']POST["']/i.test(code) &&
  /headers\s*:\s*\{[\s\S]*Content-Type[\s\S]*application\/json/i.test(code);

const stringifiesBody = (code) => /body\s*:\s*JSON\.stringify\(/.test(code);

const handlesResponseStatus = (code) =>
  /\.ok/.test(code) || /\.status/.test(code);

const catchesRequestError = (code) =>
  /\.catch\(/.test(code) || /try\s*\{[\s\S]*\}\s*catch/.test(code);

const usesQueryParams = (code) =>
  /URLSearchParams/.test(code) || /\?[\w-]+=/.test(code);

const includesAbortCleanup = (code) =>
  /AbortController/.test(code) &&
  /signal/.test(code) &&
  /\.abort\(\)/.test(code);

export const restApiCodeChallenges = [
  {
    id: "rest-get-users",
    title: "GET Users",
    skill: "REST Fetching",
    difficulty: "Easy",
    componentName: "RestGetUsers",
    instructions:
      "Define a REST users endpoint, fetch data from it, and render the mocked response list.",
    starter: `function RestGetUsers() {
  // TODO: define the endpoint and render user names from the response.
  const usersUrl = "";
  const users = [
    { id: 1, name: "Anthony" },
    { id: 2, name: "Maya" }
  ];

  return (
    <section className="preview-card">
      <h2>GET Users</h2>
      <p>TODO: render users.</p>
    </section>
  );
}`,
    tests: [
      { label: "Defines REST endpoint", check: definesEndpoint },
      { label: "Uses fetch", check: usesFetch },
      { label: "Uses GET request", check: usesGetRequest },
      { label: "Renders response data", check: rendersResponseData },
    ],
  },
  {
    id: "rest-post-json",
    title: "POST JSON",
    skill: "REST Mutations",
    difficulty: "Medium",
    componentName: "RestPostJson",
    instructions:
      "Build a POST request config that sends JSON with the correct method, headers, and body.",
    starter: `function RestPostJson() {
  // TODO: build a POST request that sends this payload as JSON.
  const tasksUrl = "/api/tasks";
  const payload = { title: "Review REST basics" };
  const requestOptions = {};

  return (
    <section className="preview-card">
      <h2>POST JSON</h2>
      <p>{JSON.stringify(requestOptions)}</p>
    </section>
  );
}`,
    tests: [
      { label: "Defines REST endpoint", check: definesEndpoint },
      { label: "Uses POST method", check: buildsPostRequest },
      { label: "Stringifies JSON body", check: stringifiesBody },
      { label: "Includes payload data", check: /payload|title/ },
    ],
  },
  {
    id: "rest-query-params",
    title: "Query Params",
    skill: "REST URLs",
    difficulty: "Medium",
    componentName: "RestQueryParams",
    instructions:
      "Create a filtered REST URL with query parameters and render the final URL.",
    starter: `function RestQueryParams() {
  // TODO: build a URL like /api/projects?status=active&page=2.
  const filters = { status: "active", page: 2 };
  const projectsUrl = "/api/projects";
  const filteredUrl = projectsUrl;

  return (
    <section className="preview-card">
      <h2>Query Params</h2>
      <p>{filteredUrl}</p>
    </section>
  );
}`,
    tests: [
      { label: "Starts from REST endpoint", check: /\/api\/projects/ },
      { label: "Uses query parameters", check: usesQueryParams },
      { label: "Includes status filter", check: /status/ },
      { label: "Includes page filter", check: /page/ },
    ],
  },
  {
    id: "rest-error-handling",
    title: "Error Handling",
    skill: "REST Errors",
    difficulty: "Hard",
    componentName: "RestErrorHandling",
    instructions:
      "Handle failed REST responses by checking status and rendering a readable error message.",
    starter: `function RestErrorHandling() {
  // TODO: turn a failed REST response into a user-facing error.
  const response = { ok: false, status: 404, statusText: "Not Found" };
  const errorMessage = "";

  return (
    <section className="preview-card">
      <h2>Error Handling</h2>
      <p>{errorMessage || "No error yet"}</p>
    </section>
  );
}`,
    tests: [
      { label: "Checks response status", check: handlesResponseStatus },
      { label: "Creates error message", check: /errorMessage|setError|Error/ },
      { label: "Handles request failure", check: catchesRequestError },
      { label: "Renders error state", check: /errorMessage|error/ },
    ],
  },
  {
    id: "rest-abort-request",
    title: "Abort Request",
    skill: "REST Effects",
    difficulty: "Hard",
    componentName: "RestAbortRequest",
    instructions:
      "Use an AbortController in an effect so an in-flight REST request is cleaned up on unmount.",
    starter: `function RestAbortRequest() {
  // TODO: fetch with an AbortController and abort during cleanup.
  const usersUrl = "/api/users";
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    // TODO: start request and return cleanup.
  }, []);

  return (
    <section className="preview-card">
      <h2>Abort Request</h2>
      <p>Status: {status}</p>
    </section>
  );
}`,
    tests: [
      { label: "Uses effect for request", check: /useEffect\(/ },
      { label: "Uses AbortController", check: includesAbortCleanup },
      { label: "Passes signal to fetch", check: /fetch\([\s\S]*signal/ },
      { label: "Parses JSON response", check: parsesJson },
    ],
  },
];
