(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('Projects', Project);

    /* @ngInject */
    function Project(dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.projects = [];
        vm.title = 'Projects';

        activate();
        //When page loaded/activated call ge getProjects function.    
        function activate() {
            return getProjects().then(function() {
                logger.info('Activated Projects View');
            });
        }

        function getProjects() {
            // call data service get projects.
            // data service is located at app/core/dataservice.js
            return dataservice.getProjects().then(function(data) {
                // When request is success assign list/array to controller projects variable.
                // The projects will then available to the view.
                vm.projects = data;
                return vm.projects;
            });
        }
    }
})();
