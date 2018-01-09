angular.module("catalogoDiscos").controller("catalogoDiscosCtrl", function ($scope, $http) {
    $scope.discos = [];
    $scope.generos = [];
    function carregarDiscos() {
        let request = $http.get('http://localhost:3000/discos').then(function (successResponse) {
                $scope.discos = successResponse.data;
            },
            function (errorResponse) { 
                console.log(errorResponse);
            });
    };

    function carregarGeneros() {
        request = $http.get('http://localhost:3000/generos').then(function (successResponse) {
            $scope.generos = successResponse.data;
        },
        function (errorResponse) { 
            console.log(errorResponse);
        });
    };
    // $scope.adicionarContato = function (contato) {
    //     $scope.discos.push(angular.copy(disco));
    // };
    $scope.salvarDisco = function(disco) {
        console.log(disco);
        $http.post('http://localhost:3000/salvarDisco', disco).then(function (successResponse) {
            carregarDiscos();
            alert("Salvo com sucesso");
            $('#adicionarDiscoModal').modal('hide');
            $scope.disco = {};
        },
        function (errorResponse) { 
            console.log(errorResponse);
            alert("Erro ao salvar");
        });
    };

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

    carregarDiscos();
    carregarGeneros();
});