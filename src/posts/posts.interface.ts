export interface IPost {
    createdAt: Date;
    name:      string;
    comment:   string;
    id:        string;
}

export interface IPostsSummaryItem {
  name: string;
  count: number;
}

export interface IPostsSummary {
  total: number;
  byUser: IPostsSummaryItem[];
}

export interface IGetPostsResult {
  posts: IPost[];
  summary: IPostsSummary;
}

export interface IPostsCount {
  name: string;
  postCount: number;
}
