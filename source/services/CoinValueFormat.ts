export const kFormatter = (value) => {
    let newValue = value;
    if (value >= 1000) {
      let suffixes = ["", "K", "M", "B", "T"];
      let suffixNum = Math.floor(("" + value).length / 3);
      let shortValue: string = '';
      for (let precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
        let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
        if (dotLessShortValue.length <= 2) { break; }
      }
      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }