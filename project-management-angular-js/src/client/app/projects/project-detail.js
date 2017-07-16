(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectDetailController', ProjectDetailController);

    /* @ngInject */
    function ProjectDetailController(dataservice, logger, routehelper,  $routeParams) {
        /*jshint validthis: true */
        var vm = this;
        vm.projects = [];
        vm.project = null;
        vm.title = 'Project Detail';
        vm.editing = false;

        vm.id = null;
        vm.active_start_date = '';
        vm.active_end_date = '';
        vm.client_name = '';
        vm.description = '';
        vm.git_url = '';
        vm.testing_url = '';
        vm.production_url = '';
        vm.saveProject = saveProject;
        vm.libraries = []

        activate();
        function activate() {
            logger.info('Activated Project Detail View');
            vm.id = $routeParams.id;
            if (vm.id) {
              vm.editing = true;
              editProject(vm.id);
            }
            logger.info('Activated Project Detail View with ID: '+ vm.id);
        }

        function saveProject() {
            if ( vm.editing ) {
              var project = getProject();
              dataservice.updateProject(project).then(function() {
                logger.info('Project Updated!');
              });
            }
            else {
              var project = getProject();
              dataservice.addProject(project).then(function() {
              logger.info('Project Added!');
              });
            }
            routehelper.redirect('/projects');
        }

        function displayProject() {
          vm.active_start_date = vm.project.active_start_date;
          vm.active_end_date = vm.project.active_end_date;
          vm.client_name = vm.project.client_name;
          vm.description = vm.project.description;
          vm.git_url = vm.project.git_url;
          vm.testing_url = vm.project.testing_url;
          vm.production_url = vm.project.production_url;
          vm.libraries = vm.project.libraries;
        }

        function editProject(project_id) {
            return dataservice.getProject(project_id).then(function(data) {
              vm.project= data;
              displayProject();
            });
        }
		
        function getProject() {
          var project = {
            id:vm.id,
            active_start_date: vm.active_start_date,
            active_end_date: vm.active_end_date,
            client_name: vm.client_name,
            description: vm.description,
            git_url: vm.git_url,
            testing_url: vm.testing_url,
            production_url: vm.production_url,
          }
          return project;
            }
        }
})();
