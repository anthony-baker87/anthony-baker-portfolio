export async function fetchGitHubRepos(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
