module.exports.index = (req, res) => {
    req.flash('erros', 'Canadá');
    res.status(200).render('index', {title: 'Home | Página inicial'});
};