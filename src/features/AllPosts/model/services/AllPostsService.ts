import axios from 'axios';

export interface ItemData {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: 'story' | 'job';
  url: string;
}

export class AllPosts {
  public lastItems: number[] = [];

  public stories: ItemData[] = [];

  async getLastItems() {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
    this.lastItems = response.data;
  }

  async getLastStories() {
    this.stories = [];
    await Promise.all(
      this.lastItems.map(async (id, i) => {
        if (i >= 100) return;
        const response = await axios.get<ItemData>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (response.data?.type === 'story') this.stories.push(response.data);
      }),
    );
    return this.stories.sort((s1, s2) => s2.time - s1.time);
  }
}
