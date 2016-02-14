var modulo = angular.module('LogServiceMdl',[]);

modulo.service('LogService',['$filter','$q', function($filter, $q) {
	this.mensagens='';
	
	this.registra = function(str) {
		var dataStr = $filter('date')(new Date(),'HH:mm:ss');
		this.mensagens = this.mensagens.concat(dataStr + ' - ').concat(str +'\n');
	}
	
	this.getMensagens = function () {
		return this.mensagens;
	}
	
	this.limpaLog = function() {
		this.mensagens = '';
	}
	
}]);