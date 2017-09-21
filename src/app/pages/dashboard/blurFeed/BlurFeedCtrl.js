/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';
    angular.module('BlurAdmin.pages.dashboard').controller('BlurFeedCtrl', BlurFeedCtrl);
    
    /** @ngInject */
    function BlurFeedCtrl($scope, $http) {
        $scope.feed = [
            {
                type: 'text-message'
                , author: 'Pubudu'
                , surname: 'Welagedara'
                , header: 'Published a new API'
                , text: 'Pubudu has published a new API (block chain)'
                , time: 'Today 11:55 am'
                , ago: '2 minutes ago'
                , expanded: false
      }, {
                type: 'text-message'
                , author: 'Dinuth'
                , surname: 'De Zoysa'
                , header: 'Updated an API'
                , text: 'Dinuth has just updated the Smart Bank API'
                , time: 'Today 11:53 am'
                , ago: '4 minutes ago'
                , expanded: false
      }, {
                type: 'text-message'
                , author: 'Nikethan'
                , surname: 'Selvanathan'
                , header: 'Subscribed to an API'
                , text: 'Nikethan has just subscribed to Node Red API from SkyWalker application'
                , time: 'Today 11:49 am'
                , ago: '8 minutes ago'
                , expanded: false
      }, {
                type: 'text-message'
                , author: 'Kavishka'
                , surname: 'Fernando'
                , header: 'Posted a new comment'
                , text: 'Kavishka just posted a comment about the OCR API'
                , time: 'Today 09:49 am'
                , ago: '2 hours ago'
                , expanded: false
      }, {
                type: 'text-message'
                , author: 'System'
                , surname: 'Admin'
                , header: 'Heart Beat Status Changed'
                , text: 'Smart Bank API has just become inactive '
                , time: 'Today 07:42 pm'
                , ago: '4 hours ago'
                , expanded: false
      }
    ];
        
        $scope.expandMessage = function (message) {
            message.expanded = !message.expanded;
        }
    }
})();