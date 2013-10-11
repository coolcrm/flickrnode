var async = require('async');
    var locals = {};
    async.series([
        //Load user to get userId first
        function(callback) {
            console.log('F1');
                callback();
        },
        //Load posts (won't be called before task 1's "task callback" has been called)
        function(callback) {
            console.log('F2');
                callback();
        }
    ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        //Here locals will be populated with 'user' and 'posts'
        //res.render('user-profile', locals);
    });

