export interface YT {
    views: string | number;
    timeSecond: string | number,
    key?: string
}

export interface campaign {
    expectedView?: string | number;
    timeRequire?: string | number
}

export interface createCampaignRequest {
    addVideoUrl: string,
    splitUrl: string | any,
    timeSecond: number | string, views: number | string, totalCost: number | string,
    title: string,
    token: string,
    thumbnail_url: string
}