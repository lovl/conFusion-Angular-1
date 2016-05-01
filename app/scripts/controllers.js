app.controller('MenuController', ["$scope", "menuService", function($scope, menuService) {
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2)
            $scope.filtText = "appetizer";
        else if (setTab === 3)
            $scope.filtText = "mains";
        else if (setTab === 4)
            $scope.filtText = "dessert";
        else
            $scope.filtText = "";
    };

    $scope.isSelected = function(checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.showMenu = false;
    $scope.message = "Loading ...";
    menuService.getDishes().query(
        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
}]);

app.controller('DishDetailController', ["$scope", "$stateParams", "menuService", function($scope, $stateParams, menuService) {

    $scope.comment = {
        rating: 5,
        comment: "",
        author: "",
        date: ""
    };

    $scope.submitComment = function() {
        $scope.comment.date = new Date().toISOString();
        console.log($scope.comment);
        $scope.dish.comments.push($scope.comment);
        $scope.commentForm.$setPristine();
        $scope.comment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
    };

    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.dish = menuService.getDishes().get({
            id: parseInt($stateParams.id, 10)
        })
        .$promise.then(
            function(response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
}]);

app.controller('ContactController', ['$scope', function($scope) {
    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
}]);

app.controller('FeedbackController', ['$scope', function($scope) {
    $scope.sendFeedback = function() {
        console.log($scope.feedback);
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        } else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";

            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
}]);

app.controller('IndexController', ['$scope', 'corporateService', 'menuService', function($scope, corporateService, menuService) {

    // leader
    $scope.showLeader = false;
    $scope.message = "Loading ...";
    $scope.leader = corporateService.getLeaders().get({
            id: 0
        })
        .$promise.then(
            function(response) {
                $scope.leader = response;
                $scope.showLeader = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    // dish
    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.dish = menuService.getDishes().get({
            id: 0
        })
        .$promise.then(
            function(response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    // promotion
    $scope.showPromotion = false;
    $scope.message = "Loading ...";
    $scope.promotion = menuService.getPromotion().get({
            id: 0
        })
        .$promise.then(
            function(response) {
                $scope.promotion = response;
                $scope.showPromotion = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
}]);

app.controller('AboutController', ['$scope', 'corporateService', function($scope, corporateService) {
    // leader
    $scope.showLeader = false;
    $scope.message = "Loading ...";
    corporateService.getLeaders().query(
        function(response) {
            $scope.leaders = response;
            $scope.showLeader = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
}]);
