app.controller('MenuController', ["$scope", "menuService", function ($scope, menuService) {
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.select = function (setTab) {
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

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.dishes= menuService.getDishes();
}]);

app.controller('DishDetailController', ["$scope", "menuService", function ($scope, menuService) {

    $scope.comment = {
        rating: 5,
        comment: "",
        author: "",
        date: ""
    };

    $scope.submitComment = function () {
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
    }
                                        
    $scope.dish= menuFactory.getDish(3);
}]);

app.controller('ContactController', ['$scope', function ($scope) {
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

app.controller('FeedbackController', ['$scope', function ($scope) {
    $scope.sendFeedback = function () {
        console.log($scope.feedback);
        if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {
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