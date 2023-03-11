import axios from 'axios';

export interface ItemData {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: 'story' | 'job' | 'comment';
  url: string;
  kids?: number[]
  text?: string;
}

export class PostService {
  private post: ItemData | undefined;

  constructor(public postId: number) {
    this.getPost();
  }

  async getPost() {
    const response = await axios.get<ItemData>(`https://hacker-news.firebaseio.com/v0/item/${this.postId}.json`);
    this.post = response.data;
    return this.post;
  }

  static async getComments(commentsId: number[]) {
    const comments: ItemData[] = [];
    await Promise.all(
      commentsId.map(async (id) => {
        const response = await axios.get<ItemData>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (response.data?.type === 'comment') comments.push(response.data);
      }),
    );
    return comments.sort((c1, c2) => c2.time - c1.time);
  }
}
