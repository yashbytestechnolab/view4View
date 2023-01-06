export const lastSeen = (item: any) => {
    let d: any = new Date(item?.created?.seconds * 1000)
    let date2 = new Date(Date.now())
    let Difference_In_Time = d.getTime() - date2.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    let today = Difference_In_Days.toString().slice(0, 2)
    today = parseInt(today) == 0 ? "Today" : `${Difference_In_Days.toFixed()} day ago`
    return today
}