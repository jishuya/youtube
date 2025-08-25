export default class Youtube {
    constructor(apiClient) {
          this.apiClient = apiClient;
    }

    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    async channelImageURL(id) {
        return this.apiClient
        .channels({params: {
                part: 'snippet',
                id
            }})
            .then((res) => res.data.items[0].snippet.thumbnails.default.url);
    }

    async relatedVideos(id) {
        return this.apiClient
        .search({params: {
                part: 'snippet',
                maxResults: 25,
                relatedToVideoId: id,
                type: 'video',
            }})
            .then((res)=> res.data.items.map((item) => ({ ...item, id: item.id.videoId })))
    }

    async #searchByKeyword(keyword) {
        return this.apiClient
        .search({params: {
                q: keyword,
                part: 'snippet',
                maxResults: 25,
                type: 'video'
            }})
            .then((res)=> res.data.items.map((item) => ({ ...item, id: item.id.videoId })))
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