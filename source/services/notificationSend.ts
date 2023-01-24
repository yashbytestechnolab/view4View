export const notificationSend = async (...payload: Array<string | any>) => {
    // payload[0] Token : payload[1] BodyMessage : payload[2] title we show 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "key=AAAAMqIv-wU:APA91bHGOHqFD_k_32Un7ki03LnaF8DAdeScbz9cJGd9uKS40w36e-8NZBVt7vRn1OzOwi-wgybgnfxDImfSQ0TQF6ucI6uBLNC26iDg-wFJkZOldv_pw1_SOTEEnLQ1axsVS_bSfG5j");

    let notificationData = JSON.stringify({
        to: payload[0],
        notification: {
            body: payload[1],
            OrganizationId: "2",
            content_available: true,
            priority: "high",
            title: payload[2]
        },
        data: {
            priority: "high",
            content_available: true,
            bodyText: payload[1],
        }
    })
    var requestOptions: object | any = {
        method: 'POST',
        headers: myHeaders,
        body: notificationData,
        redirect: 'follow'
    };
    return await
        fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
            .then(response => response.text())
            .then(result => console.log("result", result))
            .catch(error => console.log('error', error));
}