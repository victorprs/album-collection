angular.module("catalogoDiscos").controller("catalogoDiscosCtrl", function ($scope, $http) {
    $scope.discos = [];
    let request = $http.get('http://localhost:3000/discos').then(function (successResponse) {
            $scope.discos = successResponse.data;
        },
        function (errorResponse) { 
            console.log(errorResponse);
        });
    // $scope.adicionarContato = function (contato) {
    //     $scope.discos.push(angular.copy(disco));
    // };
    $scope.isDiscosSelecionados = function() {
        return $scope.discos.some(function (disco) {
            return disco.selecionado;
        });
    };
    $scope.apagarDiscos = function () {
        $scope.discos = $scope.discos.filter(function (disco) {
            return !disco.selecionado;
        });
    };
});