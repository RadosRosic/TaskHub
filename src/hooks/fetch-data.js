const baseUrl = "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/";

const useFetch = () => {
  const makeRequest = async (requestConfig) => {
    try {
      const response = await fetch(baseUrl + requestConfig.path, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const setData = async (path, setter) => {
    const response = await makeRequest({ path });
    setter(response);
  };

  return { setData };
};

export default useFetch;
