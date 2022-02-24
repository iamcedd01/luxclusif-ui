const extract = args => {
    let _errors;
    let { value, error = {} } = args;

    error = error || {};

    if (error.details) {
        _errors = {};
        console.log({ error });
        for (let e of error.details) {
            const [field] = e.path;
            const message = e.message;
            _errors[field] = message;
        }
    }

    return { value, error: _errors };
};

export default extract;
