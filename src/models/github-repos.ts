export interface Repo {
  name: string;
  description: string;
  pushed_at: Date;
  html_url: string;
  full_name: string;
}

export interface RepoWithCommit extends Repo {
  commits?: number;
}
