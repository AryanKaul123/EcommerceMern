import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
      method: SummaryApi.categoryWiseProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: SummaryApi.categoryWiseProduct.method !== 'GET'
        ? JSON.stringify({ category })
        : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response body is empty
    const textResponse = await response.text();
    const dataResponse = textResponse ? JSON.parse(textResponse) : null;

    return dataResponse;
  } catch (error) {
    console.error("Error fetching category-wise product:", error);
    throw error;
  }
};


export default fetchCategoryWiseProduct;
