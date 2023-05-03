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

    async getChartData(feedId, start, end) {
        try {
            const res = await this.api.get(
                `/feeds/${feedId}/data/chart?field=avg&start_time=${start}&end_time=${end}&resolution=120`,
            );
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getGroupFeed(groupId) {
        try {
            const res = await this.api.get(`/groups/${groupId}/feeds`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default Feeds;
