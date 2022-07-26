import moment from "moment";

export function formatDate(date: Date | string) {
    return moment(date).format("MMMM Do YYYY, HH:mm:ss");
}

export function formatPrice(price: number) {
    const dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });
    return dollarUS.format(price);
}
