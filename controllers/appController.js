
exports.homePage = (req, res, next) => {
    result = " ";
    res.render('index', { title: 'Anti-Plagiarism System', result });
};

exports.homePageResult = (req, res, next) => {
    result = " ";
    res.render('index', { title: 'Anti-Plagiarism System', result });
};