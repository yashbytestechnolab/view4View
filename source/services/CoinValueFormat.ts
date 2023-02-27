export const kFormatter = (num: number | any) => {
  const number = num?.toFixed()
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup?.slice()?.reverse().find(function (item) {
    return number >= item?.value;
  });  
  return item ? (number / item.value)?.toFixed(1).replace(rx, "$1") + item?.symbol : "0";
}