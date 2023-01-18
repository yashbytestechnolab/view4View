export function referral_coupon_genrator(props: string) {
    var coupon: string = "";
    for (var i = 0; i < props.length; i++) {
        coupon += props.charAt(Math.floor(Math.random() * props.length));
    }
    return coupon;
}
