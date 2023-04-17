
export const users_get = (req, res) => {
    const query_params = req.query;
    res.json({method: 'get', by: 'sasdDev', query_params});
}

export const users_put = (req, res) => {
    const id = req.params.id;
    res.json({method: 'put', by: 'sasdDev', id});
}

export const users_post = (req, res) => {
    const body = req.body;
    res.json({method: 'post', by: 'sasdDev', body});
}

export const users_delete = (req, res) => {
    res.json({method: 'delete', by: 'sasdDev'});
}