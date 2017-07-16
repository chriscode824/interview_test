(function() {
    'use strict';

    angular
        .module('app.projects')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/projects',
                config: {
                    templateUrl: 'app/projects/projects.html',
                    controller: 'Projects',
                    controllerAs: 'vm',
                    title: 'projects',
                }
            },
            {
                url: '/projects/new',
                config: {
                    templateUrl: 'app/projects/project.html',
                    controller: 'ProjectController',
                    controllerAs: 'vm',
                    title: 'projects',
                }
            },
            {
                url: '/projects/edit/',
                config: {
                    templateUrl: 'app/projects/project.html',
                    controller: 'ProjectController',
                    controllerAs: 'vm',
                    title: 'projects',
                }
            },
            {
                url: '/projects/detail/',
                config: {
                    templateUrl: 'app/projects/project-detail.html',
                    controller: 'ProjectDetailController',
                    controllerAs: 'vm',
                    title: 'project detail',
                }
            },
        ];
    }
})();
