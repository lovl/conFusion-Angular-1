app.constant("baseURL", "http://localhost:3000/")

app.service('menuService', ['$resource', 'baseURL', function($resource, baseURL) {

    this.getDishes = function() {
        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getPromotion = function() {
        return $resource(baseURL + "promotions/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    };
}]);

app.service('corporateService', ['$resource', 'baseURL', function($resource, baseURL) {

    this.getLeaders = function() {
        return $resource(baseURL + "leadership/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    };
}]);
