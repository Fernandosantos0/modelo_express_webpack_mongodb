exports.middlewareSession = (req, res, next) => {
    res.locals.errors = req.flash('erros');

    next();
};

exports.csurfError = (err, req, res, next) => {
    if(err) res.status(404).render('404', {title: 'Error 404'});
    next();
};

exports.csrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};