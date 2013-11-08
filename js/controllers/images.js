var $jq = jQuery.noConflict();

function imagesCtrl($scope, Instagram, $filter, $http, $modal, $log, Slideshow){

	$scope.pics = [];
	$scope.results = Slideshow.getAll();
	$scope.currentIndex = null;
	$scope.editor = false;
	$scope.tag = 'penndayinlife';
	$scope.currentElement = [];
	$scope.allpics = [];

	$scope.setImage = function(image) {
			$scope.edtior = false;
			var caption =  $filter('date')(image.caption.created_time * 1000, 'medium') + ' ' + image.caption.text + ' Photo by: ' + image.user.full_name;
			$scope.currentElement = {photoID:image.id, image:image.images.standard_resolution.url , thumb:image.images.thumbnail.url, title: caption, caption: caption, url:""};
			$scope.template = 'modal.html'
			$scope.open($scope.currentElement);//console.log($scope.currentElement);
	};

$scope.open = function (image) {
	$scope.image = image;
    var modalInstance = $modal.open({
      templateUrl: $scope.template,
      controller: 'ModalInstanceCtrl',
      resolve: {
        image: function () {
          return $scope.image;
        }
      }
    });

    modalInstance.result.then(function (image) {
      $scope.image = image;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.editImage = function(index) {
			$scope.currentElement = $scope.results[index];
			$scope.currentIndex = index;
			$scope.editor = true;
			$scope.template = 'editmodal.html'
			$scope.open($scope.currentElement);
	};

  $scope.addImage = function (currentElement) {
  	//console.log(currentElement);
   	$scope.results.push(currentElement);
    $scope.currentIndex = results.length;
	console.log($scope.currentIndex);
 	$scope.edtior = false;
  };

  $scope.removeImage = function (index) {
  	console.log(index);
  	$scope.results.splice(index, 1);
  	$scope.currentIndex = null;
  	$scope.currentElement = null;
  	$scope.edtior = false;
  }
	
 	$scope.getMoreImages = function(next_max_id) {
	 	Instagram.fetchPopular($scope.tag, next_max_id, function(data){
			$scope.pagination = data.pagination;
			$scope.pics = data.data;
			Instagram.fetchPopular($scope.tag, $scope.pagination.next_max_id, function(more){
				$scope.allpics = $jq.merge($scope.pics, more.data);	
				$scope.pagination = more.pagination;
			});
		});
 	}

  $scope.generate = function () {
  		$scope.message = Slideshow.getAll();
  		$scope.filename = 'writethis'
  		//console.log($scope.message);
		//alert(postData);
		$http.post('write-file.php', {'t': $scope.message}).success(function(response)
		{ 
			console.log('here');
		});

    };
	

  		
 

	Instagram.fetchPopular($scope.tag, '', function(data){
		$scope.pagination = data.pagination;
		$scope.pics = data.data;
		Instagram.fetchPopular($scope.tag, $scope.pagination.next_max_id, function(more){
			$scope.pics = $jq.merge($scope.pics, more.data);	
			$scope.pagination = more.pagination;
			Instagram.fetchPopular($scope.tag, $scope.pagination.next_max_id, function(more){
				$scope.pics = $jq.merge($scope.pics, more.data);	
				$scope.pagination = more.pagination;
				Instagram.fetchPopular($scope.tag, $scope.pagination.next_max_id, function(more){
					$scope.pics = $jq.merge($scope.pics, more.data);	
					$scope.pagination = more.pagination;
					Instagram.fetchPopular($scope.tag, $scope.pagination.next_max_id, function(more){
						$scope.allpics = $jq.merge($scope.pics, more.data);	
						$scope.pagination = more.pagination;
							Instagram.fetchPopular($scope.tag, $scope.pagination.next_max_id, function(more){
								$scope.allpics = $jq.merge($scope.pics, more.data);	
								$scope.pagination = more.pagination;
								Instagram.fetchPopular($scope.tag, $scope.pagination.next_max_id, function(more){
									$scope.allpics = $jq.merge($scope.pics, more.data);	
									$scope.pagination = more.pagination;
									Instagram.fetchPopular($scope.tag, $scope.pagination.next_max_id, function(more){
										$scope.allpics = $jq.merge($scope.pics, more.data);	
										$scope.pagination = more.pagination;
										Instagram.fetchPopular($scope.tag, $scope.pagination.next_max_id, function(more){
										$scope.allpics = $jq.merge($scope.pics, more.data);	
										$scope.pagination = more.pagination;
					});
					});
					});
					});
					});
				});
			});
		});
		
	});
	// Use the instagram service and fetch a list of the popular pics

}



angular.module('slide-agram').controller('ModalInstanceCtrl',function ($scope, $modalInstance, image, Slideshow) {

  $scope.image = image;
  $scope.ok = function () {
   	Slideshow.addItem($scope.image);
   	$modalInstance.dismiss();
  };

  $scope.remove = function () {
	Slideshow.removeItem($scope.image);
	$modalInstance.dismiss();
  };
 
  $scope.save = function () {
  	$modalInstance.dismiss();
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };



});
