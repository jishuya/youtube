import axios from 'axios';

export default class Youtube {
    constructor() {
          this.httpClient = axios.create({
              baseURL: 'https://www.googleapis.com/youtube/v3',
              params: {
                  key: import.meta.env.VITE_YOUTUBE_API_KEY
              }
          });
    }

    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    async #searchByKeyword(keyword) {
        return this.httpClient
            .get('search', {params: {
                q: keyword,
                part: 'snippet',
                maxResults: 25,
                type: 'video'
            }})
            .then((res) => res.data.items)
            .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })))
    }

    async #mostPopular() {
        return axios.get('popular', {params: {
                chart: 'mostPopular',
                part: 'snippet',
                maxResults: 25,
            }
        })
            .then((res) => res.data.items ?? []);
    }
}