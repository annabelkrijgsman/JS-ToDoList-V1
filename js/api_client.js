const getListItems = async () => {
    const apiUrl = 'http://localhost:3000/';
    return await getData('GET', apiUrl);
};

const getData = async (method, apiUrl) => {
    try {
        const res = await fetch(apiUrl, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const response = await getResponseJson(res);
        return response;
    } catch (err) {
        return err;
    }
};

const getResponseJson = async (res) => {
    return res.json();
};