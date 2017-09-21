/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';
    angular.module('BlurAdmin.pages.dashboard').controller('DashboardPieChartCtrl', DashboardPieChartCtrl);
    /** @ngInject */
    function DashboardPieChartCtrl($scope, $timeout, $http, baConfig, baUtil, apiService) {
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        
        $scope.charts = [
            {
                color: pieColor, 
                description: 'Registered APIs', 
                icon: 'person'
            }, {
                color: pieColor, 
                description: 'Registered Apps', 
                icon: 'money'
            }, {
                color: pieColor, 
                description: 'Total Number of Users', 
                icon: 'face'
            }, {
                color: pieColor, 
                description: 'Total Number of Hits', 
                icon: 'refresh'
            }
        ];
        
        $scope.beautifyResponseTime = function(responseTime) {
            
            // console.log(responseTime);
            var timeDifferent = responseTime;
            var timeSec = "";

            // console.log(timeDifferent);
            var day = timeDifferent / (24 * 60 * 60 * 1000);
            var hour = timeDifferent / (60 * 60 * 1000);
            var min = timeDifferent / (60 * 1000);
            var sec = timeDifferent / (1000);

            if((day + "").includes(".")){
                day = (day + "").split(".")[0];
            }

            if((hour + "").includes(".")){
                hour = (hour + "").split(".")[0];
            }

            if((min + "").includes(".")){
                min = (min + "").split(".")[0];
            }

            if((sec + "").includes(".")){
                sec = (sec + "").split(".")[0];
            }

            if(day > 0){
                
                var hourRem = (timeDifferent % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000);

                if((hourRem + "").includes(".")){
                    hourRem = (hourRem + "").split(".")[0];
                }
                
                timeSec = day + ' D ' + hourRem + ' h';

            }else if(hour > 0){
                
                var minRem = (timeDifferent % (60 * 60 * 1000)) / (60 * 1000);

                if((minRem + "").includes(".")){
                    minRem = (minRem + "").split(".")[0];
                }
                
                timeSec = hour + ' h ' + minRem + ' m';

            }else if(min > 0){
                
                var secRem = (timeDifferent % (60 * 1000)) / (1000);

                if((secRem + "").includes(".")){
                    secRem = (secRem + "").split(".")[0];
                }
                
                timeSec = min + ' m ' + secRem + ' s';

            }else if(sec > 0){
                
                var miliRem = (timeDifferent % (1000)) / (1000);

                if((miliRem + "").includes(".")){
                    miliRem = (miliRem + "").split(".")[0];
                }
                
                timeSec = sec + ' s ' + miliRem + ' ms';

            }else{
                
                var miliRem = (timeDifferent % (1000)) / (1000);
                
                if((miliRem + "").includes(".")){
                    miliRem = (miliRem + "").split(".")[1];
                }
                
                timeSec = sec + ' s ' + miliRem + ' ms';

            }

            // console.log(timeSec);
            
            return timeSec;
        };
          
        $scope.beautifyGold = function(gold) {
            var gold = Math.round(gold);
            
            return gold;
        };
        
        $scope.getMostused = function(apis) {
            // console.log(apis);
            
            var noOfHits = 0;
            var index = 0;
            
            for(var j = 0; j < apis.length; j++){
              
                if((apis[j].noOfHits > noOfHits) && (apis[j].apiName != "Security")){
                    index = j;
                    noOfHits = apis[j].noOfHits;
                }

            }
                      
            return apis[index].apiName;
        };
        
        $scope.getImage = function(api) {
            
            return 'https://api.vp-fintech.com/registry/resource/_system/governance/apimgt/applicationdata/icons/admin/' + api.API_NAME + '/' + api.API_VERSION + '/icon';
        };
        
        // Table Data
        $scope.metricsTableData = [];
        
        // API calls to update upper 4 boxes ***********************
        apiService.getAPIDetails("getAPIDocument").then(function (response) {
            if (response) {
                console.log(response);
                $scope.charts[0].stats = response.response.registeredAPICount;
                $scope.charts[1].stats = response.response.registeredApplicationCount;
                $scope.charts[2].stats = response.response.usersCount;
                $scope.charts[3].stats = response.response.totalHitCount;
                
                $scope.metricsTableData = response.response.apiInformation;
                // console.log($scope.metricsTableData);
            }else {
                $scope.charts[0].stats = 0;
                $scope.charts[1].stats = 0;
                $scope.charts[2].stats = 0;
                $scope.charts[3].stats = 0;
                console.log("Something went wrong while processing your request. Please Contact Administrator.");
            }
        }, function (err) {
            console.log(err);
        });
        
        window.setInterval(function () {

            // API calls to update upper 4 boxes ***********************
            apiService.getAPIDetails("getAPIDocument").then(function (response) {
            if (response) {
                console.log(response);
                $scope.charts[0].stats = response.response.registeredAPICount;
                $scope.charts[1].stats = response.response.registeredApplicationCount;
                $scope.charts[2].stats = response.response.usersCount;
                $scope.charts[3].stats = response.response.totalHitCount;
                
                $scope.metricsTableData = [];
                
                $scope.metricsTableData = response.response.apiInformation;
                // console.log($scope.metricsTableData);
            }else {
                $scope.charts[0].stats = 0;
                $scope.charts[1].stats = 0;
                $scope.charts[2].stats = 0;
                $scope.charts[3].stats = 0;
                console.log("Something went wrong while processing your request. Please Contact Administrator.");
            }
        }, function (err) {
            console.log(err);
        });
            
        }, (3 * 60 * 1000));
        
    }
    
})();
