'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('VoteConcertCtrl', function ($scope, $http, Spotify, ngAudio) {
  	//$scope.concerts = null;
	$scope.oneAtATime = true;
	$scope.status = {
	    isFirstOpen: true,
	    isFirstDisabled: false
	};

	$http({
			url: "scripts/data/concerts.json",
			method: "GET",
		}).then(function(response) {
			$scope.concerts = response.data;

			angular.forEach($scope.concerts, function(concert){
			  	Spotify.search(concert.name, 'artist').then(function (data) {
			  		console.log(data);
			  		concert.artistId = data.artists.items[0].id; 
			  		concert.url = data.artists.items[0].images[0].url; 

				  	Spotify.getArtistTopTracks(concert.artistId, 'AU', {"limit":1}).then(function (data) {
					  concert.track = ngAudio.load(data.tracks[0].preview_url);
					});

				});
			});
	});
	
	$scope.addLike = function(idConcert){

		console.log('dentro');

		angular.forEach($scope.concerts, function(concert){
			if(concert.id == idConcert){
				concert.likes++;
			}
		});
	};

	$scope.disLike = function(idConcert){
		angular.forEach($scope.concerts, function(concert){
			if(concert.id == idConcert){
				concert.likes--;
			}
		});
	};
	
	$scope.test = function(conciertos) {
		console.log(conciertos);
		console.log('fafa');
	}

	
});
