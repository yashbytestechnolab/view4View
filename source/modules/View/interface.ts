export interface updatCampaignData {
    id: string | number|undefined,
    remaining_view: string | number,
    consumed_view: string | number,
    expected_view: string | number,
    videoData: Array<object> | any,
    isBytesVideoLoading: boolean,
    getAppendUserId: Array<string> | any,
    addFiled: boolean;
    upload_by: string | number;
}