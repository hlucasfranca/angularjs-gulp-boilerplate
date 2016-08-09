(function () {
    'use strict';

    /** @namespace ng-starter */
    var ngStarter = angular.module('ng-starter', [
        'ng-starter.services',
        'ng-starter.main',
        'ng-starter.header',
        'ng-starter.footer',
        'ng-starter.sidemenu',
        'ng-starter.home',
        'ui.router'
    ]);

    ngStarter.config(config);

    config.$inject = ['$stateProvider', '$provide', '$logProvider', '$compileProvider'];

    /**
     * ng-starter application config.
     * @param {$stateProvider} $stateProvider
     * @param {$provide} $provide
     * @param {$logProvider} $logProvider
     * @param {$compileProvider} $compileProvider
     */
    function config($stateProvider, $provide, $logProvider, $compileProvider) {

        //Disable the log messages.
        $logProvider.debugEnabled(false);

        //Disable the debug info.
        $compileProvider.debugInfoEnabled(false);

        //Register the exception handler.
        $provide.decorator('$exceptionHandler', exceptionHandler);

        //Register the abstract states.
        registerStates($stateProvider);
    }

    registerStates.$inject = ['$stateProvider'];

    /**
     * Register the abstract application-wide states.
     * @param {$stateProvider} $stateProvider
     */
    function registerStates($stateProvider) {
        $stateProvider
            .state('ngstarter', {
                abstract: true,
                views: {
                    '': {
                        controller: 'MainController',
                        templateUrl: '/app/main/index.html',
                        controllerAs: 'vm'
                    },
                    'header@ngstarter': {
                        controller: 'HeaderController',
                        templateUrl: '/app/header/index.html',
                        controllerAs: 'vm'
                    },
                    'footer@ngstarter': {
                        controller: 'FooterController',
                        templateUrl: '/app/footer/index.html',
                        controllerAs: 'vm'
                    },
                    'sidemenu@ngstarter': {
                        controller: 'SideMenuController',
                        templateUrl: '/app/sidemenu/index.html',
                        controllerAs: 'vm'
                    }
                }
            });
    }

    exceptionHandler.$inject = ['exceptionService'];

    /**
     * Angular global exception handler.
     * @param {exceptionService} exceptionService
     */
    function exceptionHandler(exceptionService) {
        return function (exception, cause) {
            exceptionService.handle(exception, cause);
        };
    }
})();
