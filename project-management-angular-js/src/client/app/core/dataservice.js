(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getProjects: getProjects,
            getProject: getProject,
            addProject:addProject,
            updateProject:updateProject,
            ready: ready
        };

        return service;

        function getProjects() {
            return $http.get('http://localhost:8000/api/projects/?format=json')
                .then(getProjectsComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                    $location.url('/');
                });
            function getProjectsComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getProject(project_id) {
            return $http.get('http://localhost:8000/api/projects/' + project_id + '/?format=json')
                .then(getProject)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                    $location.url('/');
                });
            function getProject(data, status, headers, config) {
                return data.data;
            }
        }

        function addProject(project) {
            var url = 'http://localhost:8000/api/projects/new';
            return $http.post(url, project)
                .then()
                .catch(function(message) {
                    exception.catcher('XHR Failed for addProject')(message);
                    $location.url('/');
                });
        }

        function updateProject(project) {
            console.log("Project id:" + project.id)
            var url = 'http://localhost:8000/api/projects/' + project.id + '/update';
            return $http.post(url, project)
                .then()
                .catch(function(message) {
                    exception.catcher('XHR Failed for addProject')(message);
                    $location.url('/');
                });
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }
            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();
            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }
    
    }
})();
