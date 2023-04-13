class Feeds {
    api;

    constructor(api) {
        this.api = api;
    }

    async getFeeds() {
        const res = await this.api.get("/feeds");
        return res.data;
    }

    async getFeedById(feedId) {
        const res = await this.api.get(`/feeds/${feedId}/data`);
        return res.data;
    }

    async createData(feedId, value) {
        const res = await this.api.post(`/feeds/${feedId}/data`, {
            value,
        });
        return res.data;
    }

    async getLastData(feedId) {
        const res = await this.api.get(`/feeds/${feedId}/data/last`);
        return res.data;
    }
}

export default Feeds;
