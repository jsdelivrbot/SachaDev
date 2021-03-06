/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
           
            .state('loginPage', {
				 //parent: 'secure',
		        url: '/loginPage',
		        templateUrl: 'views/loginPage.html',
		        controller: 'loginCtrl'
		    })
		    
		    .state('projects', {
		    	url: '/projects',
		        templateUrl: 'views/masterdata/projectdata.html',
		        controller: 'TechMDataCtrl'
		    })
		    
		    .state('ge', {
		    	url: '/ge',
		        templateUrl: 'views/masterdata/gedata.html',
		        controller: 'TechMDataCtrl'
		    })
		    
		    .state('apps', {
		    	url: '/apps',
		        templateUrl: 'views/masterdata/appdata.html',
		        controller: 'TechMDataCtrl'
		    })
		    
		   .state('techm', {
            url: '/techm',
            templateUrl: 'views/masterdata/techmdata.html',
            controller: 'TechMDataCtrl'
           
        })
        .state('dbAdmin', {
            url: '/dbAdmin',
            templateUrl: 'views/masterdata/techmdata.html',
            controller: 'TechMDataCtrl'
           
        });


       $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            //document.querySelector('px-app-nav').markSelected('/billing');
           // $("px-app-nav").hide();
            $state.go('techm');
        });
       
      /* $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/blankpage');
            $state.go('blankpage');
        });
       */
        

    }]);
});
