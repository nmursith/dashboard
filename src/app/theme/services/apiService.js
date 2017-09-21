
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .service('apiService', apiService);

  /** @ngInject */
  function apiService($q, $http, baConfig) {
      
      var apiBase = "http://portal.vp-fintech.com:10010/";
      
      var getAPIDetails = function (module) {
          
          var deferred = $q.defer();

          $http.get(apiBase + module, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
              
              deferred.resolve(response);

          }).catch(function (data, status, headers, config) {
              deferred.reject(data.statusText);
          });

          return deferred.promise;
      };

    return {
        getAPIDetails : getAPIDetails
    };
      
  }

})();
