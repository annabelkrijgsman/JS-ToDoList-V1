const connectionHandler = async (method, apiUrl, data) => {
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

const getListOfTasks = async () => {
    const apiUrl = 'http://localhost:3000/';
    return await connectionHandler('GET', apiUrl);
};

const postTaskItem = async (task) => {
    const apiUrl = 'http://localhost:3000/';
    const data = {
        description: task,
        done: false
    };
    return await connectionHandler('POST', apiUrl, data);
};

const deleteTaskItem = async (id) => {
    const apiUrl = 'http://localhost:3000/' + id;
    return await connectionHandler('DELETE', apiUrl);
};

const editCheckTask = async (id, value) => {
    const apiUrl = 'http://localhost:3000/' + id;
    const data = {
        done: value
    };
    return await connectionHandler('PUT', apiUrl, data);
};

const editSavedTask = async (id, task) => {
    const apiUrl = 'http://localhost:3000/' + id;
    const data = {
        description: task,
        done: false
    };
    return await connectionHandler('PUT', apiUrl, data);
};