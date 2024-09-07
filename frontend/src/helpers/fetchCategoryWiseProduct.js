import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
      method: SummaryApi.categoryWiseProduct.method,
      headers: {
        "content-type": "application/json",
      },
      // Only include body if the method is not GET
      body: SummaryApi.categoryWiseProduct.method !== 'GET'
        ? JSON.stringify({ category })
        : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.error("Error fetching category-wise product:", error);
    throw error;
  }
};

export default fetchCategoryWiseProduct;
