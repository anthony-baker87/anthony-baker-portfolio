const definesGraphqlQuery = (code) =>
  /const\s+\w*query\w*\s*=\s*`[\s\S]*(query|mutation)[\s\S]*`/i.test(
    code,
  );

const includesViewerFields = (code) =>
  /\bviewer\b/.test(code) && /\bid\b/.test(code) && /\bname\b/.test(code);

const usesGraphqlVariables = (code) =>
  /\$\w+/.test(code) &&
  /variables\s*:\s*\{[\s\S]*\w+/.test(code);

const rendersGraphqlResult = (code) =>
  /\.map\(/.test(code) || /\{\s*\w+(?:\.\w+)+\s*\}/.test(code);

const buildsMutation = (code) =>
  /mutation\s+\w*/.test(code) && /create\w+|add\w+|update\w+/.test(code);

const usesInputVariable = (code) =>
  /\$input/.test(code) && /input\s*:\s*\$input/.test(code);

const readsCreatedTaskFields = (code) => /id/.test(code) && /title/.test(code);

const readsNestedEdges = (code) =>
  /\.edges\.map\(/.test(code) || /\.nodes\.map\(/.test(code);

const includesPageInfo = (code) =>
  /pageInfo/.test(code) && /hasNextPage/.test(code) && /endCursor/.test(code);

const normalizesGraphqlErrors = (code) =>
  /errors/.test(code) && /\.map\(/.test(code) && /\.message/.test(code);

export const graphQLCodeChallenges = [
  {
    id: "graphql-viewer-query",
    title: "Viewer Query",
    skill: "GraphQL Queries",
    difficulty: "Easy",
    componentName: "GraphqlViewerQuery",
    instructions:
      "Build a GraphQL viewer query string, mock a response, and render the selected fields.",
    starter: `function GraphqlViewerQuery() {
  // TODO: write a query that asks for viewer id and name.
  const viewerQuery = "";
  const data = {
    viewer: { id: "user_1", name: "Anthony" }
  };

  return (
    <section className="preview-card">
      <h2>Viewer Query</h2>
      <p>TODO: render viewer name.</p>
    </section>
  );
}`,
    tests: [
      { label: "Defines GraphQL query", check: definesGraphqlQuery },
      { label: "Requests viewer fields", check: includesViewerFields },
      { label: "Keeps mock data", check: /viewer\s*:\s*\{/ },
      { label: "Renders query result", check: rendersGraphqlResult },
    ],
  },
  {
    id: "graphql-query-variables",
    title: "Query Variables",
    skill: "GraphQL Variables",
    difficulty: "Medium",
    componentName: "GraphqlQueryVariables",
    instructions:
      "Create a parameterized user query and a request body that sends variables separately from the query.",
    starter: `function GraphqlQueryVariables() {
  // TODO: define a query with a variable and send variables in the body.
  const userId = "user_1";
  const userQuery = "";
  const requestBody = {};

  return (
    <section className="preview-card">
      <h2>Query Variables</h2>
      <p>{JSON.stringify(requestBody)}</p>
    </section>
  );
}`,
    tests: [
      { label: "Defines GraphQL query", check: definesGraphqlQuery },
      { label: "Uses query variable", check: /\$id|\$userId/ },
      { label: "Sends variables object", check: usesGraphqlVariables },
      { label: "Includes query in body", check: /query\s*:\s*\w*query\w*/i },
    ],
  },
  {
    id: "graphql-create-mutation",
    title: "Create Mutation",
    skill: "GraphQL Mutations",
    difficulty: "Medium",
    componentName: "GraphqlCreateMutation",
    instructions:
      "Build a createTask mutation with an input variable and render the optimistic task title.",
    starter: `function GraphqlCreateMutation() {
  // TODO: write a mutation that accepts an input variable.
  const input = { title: "Review schema" };
  const mutation = "";

  return (
    <section className="preview-card">
      <h2>Create Mutation</h2>
      <p>TODO: render input title.</p>
    </section>
  );
}`,
    tests: [
      { label: "Defines mutation", check: buildsMutation },
      { label: "Uses input variable", check: usesInputVariable },
      { label: "Reads created fields", check: readsCreatedTaskFields },
      { label: "Renders mutation data", check: rendersGraphqlResult },
    ],
  },
  {
    id: "graphql-connection-list",
    title: "Connection List",
    skill: "GraphQL Pagination",
    difficulty: "Hard",
    componentName: "GraphqlConnectionList",
    instructions:
      "Render a GraphQL connection response by reading edges or nodes and exposing pageInfo.",
    starter: `function GraphqlConnectionList() {
  // TODO: render nodes from this connection and show pagination state.
  const data = {
    projects: {
      edges: [
        { node: { id: "p1", name: "Portfolio" } },
        { node: { id: "p2", name: "Interview Prep" } }
      ],
      pageInfo: { hasNextPage: true, endCursor: "cursor_2" }
    }
  };

  return (
    <section className="preview-card">
      <h2>Projects</h2>
      <p>TODO: render projects.</p>
    </section>
  );
}`,
    tests: [
      { label: "Reads edge or node list", check: readsNestedEdges },
      { label: "Uses stable keys", check: /key=\{\s*\w+\.id\s*\}/ },
      { label: "Includes pageInfo", check: includesPageInfo },
      { label: "Renders project names", check: /\.name/ },
    ],
  },
  {
    id: "graphql-error-state",
    title: "Error State",
    skill: "GraphQL Errors",
    difficulty: "Hard",
    componentName: "GraphqlErrorState",
    instructions:
      "Normalize a GraphQL errors array into readable messages and render them in the preview.",
    starter: `function GraphqlErrorState() {
  // TODO: turn GraphQL errors into displayable messages.
  const response = {
    data: null,
    errors: [
      { message: "Not authorized", path: ["viewer"] },
      { message: "Rate limit exceeded", path: ["projects"] }
    ]
  };
  const messages = [];

  return (
    <section className="preview-card">
      <h2>GraphQL Errors</h2>
      <p>TODO: render error messages.</p>
    </section>
  );
}`,
    tests: [
      { label: "Reads errors array", check: /response\.errors|errors/ },
      { label: "Normalizes messages", check: normalizesGraphqlErrors },
      { label: "Renders messages", check: /messages\.map\(/ },
      { label: "Uses stable message keys", check: /key=\{/ },
    ],
  },
];
