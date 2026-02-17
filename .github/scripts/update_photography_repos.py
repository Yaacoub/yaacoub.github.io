import json
import os
import sys
import urllib.request

ORG = "Yaacoub-Organisation"
REPO_PREFIX = "photography"
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUTPUT_PATH = os.path.join(REPO_ROOT, "_data", "photography_repos.yml")

def api_get_json(url, token):
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "photography-repos-updater",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request) as response:
        return json.loads(response.read().decode("utf-8"))

def fetch_org_repos(org, token):
    repos = []
    page = 1
    while True:
        url = f"https://api.github.com/orgs/{org}/repos?per_page=100&page={page}"
        batch = api_get_json(url, token)
        if not batch:
            break
        repos.extend(batch)
        page += 1
    return repos

def main():
    token = os.getenv("GITHUB_TOKEN", "").strip() or None
    repos = fetch_org_repos(ORG, token)

    items = []
    skipped = 0
    for repo in repos:
        repo_name = repo.get("name", "")
        if not repo_name.startswith(REPO_PREFIX):
            continue
        description = repo.get("description") or ""
        parts = [part.strip() for part in description.split(" | ") if part.strip()]
        if len(parts) < 2:
            skipped += 1
            continue
        items.append(
            {
                "name": parts[0],
                "date": parts[1],
                "url": repo.get("html_url", ""),
            }
        )

    items.sort(key=lambda item: (item["date"], item["name"]))

    with open(OUTPUT_PATH, "w", encoding="utf-8") as file:
        for index, item in enumerate(items, start=1):
            file.write(f"- id: {index}\n")
            file.write(f"  name: \"{item['name']}\"\n")
            file.write(f"  date: \"{item['date']}\"\n")
            file.write(f"  url: \"{item['url']}\"\n\n")

    print(f"Wrote {len(items)} items to {OUTPUT_PATH}.")
    if skipped:
        print(f"Skipped {skipped} repos without a date description.")

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:  # pragma: no cover
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)
