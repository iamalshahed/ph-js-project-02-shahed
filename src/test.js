const createElements = (arr) => {
  const htmlElems = arr.map((elm) => `<span>${elm}</span>`);
  console.log(htmlElems.join(" "));
};

const myarr = ["ju", "kd", "jd"];
createElements(myarr);
