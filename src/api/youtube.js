export default class Youtube {
    constructor(apiClient) {
          this.apiClient = apiClient;
    }

    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    async #searchByKeyword(keyword) {
        return this.apiClient
        .search({params: {
                q: keyword,
                part: 'snippet',
                maxResults: 25,
                type: 'video'
            }})
            .then((res) => res.data.items)
            .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })))
    }

    async #mostPopular() {
        return this.apiClient
        .videos('popular', {params: {
                chart: 'mostPopular',
                part: 'snippet',
                maxResults: 25,
            }
        })
            .then((res) => res.data.items ?? []);
    }
}