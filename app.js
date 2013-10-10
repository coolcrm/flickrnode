//Oct 5 2013
var fs = require('fs');
var async = require('async');
var flickr = require('flickr-with-uploads');
var http = require('http');
var fullpath = '/home/vk/Загрузки/Fisher3.jpg';
extraslist = "tags='dog,cat'";
var file;
var photourl = new Array();
var i = 1;
var request;
var filename;


var api = flickr(
  '63b283b748057fcd5fdcd9d67a7dda75', // consumer_key
  '557b871d824b2c65c')/*   , // consumer_secret
  '3XF0pqP4daZf9oIlx-a7H1uMLeGrBidkJU', // oauth_token
  'KpslBxHoh4QYk6ad'); // oauth_token_secret

*/



function getfiles(){
async.series([
    function (){
// usually, the method name is precisely the name of the API method, as they are here:
    api({method: 'flickr.photos.getRecent', extras: extraslist}, function(err, response) {
	
	console.log('Total:', response.photos.total);      
	console.log('Response:', response.photos.photo[10].id);
	console.log('Response:', response.photos.photo[10].secret);
	console.log('Response:', response.photos.photo[10].server);
	console.log('Response:', response.photos.photo[10].farm);

	for (i=1; i<10;i++){
	console.log("i="+i);
		photourl [i] = construct_photo_url(response.photos.photo[i].farm, response.photos.photo[i].server, response.photos.photo[i].id, response.photos.photo[i].secret);
	console.log(photourl[i]);
	} //End of for	
	
	
	//for (i=1;i<100;i++){
	

	console.log('Next cycle');	
	//console.log("i="+i);
	var i=1;
	filename= "./images/file"+i+".jpg";
	console.log(filename);
	
	require('async').eachLimit(photourl, 5, function(url, next){
	  download(url, "./images/file"+(i++)+".jpg", next);
		}, function(){
		   console.log('finished');
		})
	download(photourl[i], filename,{});

	
	//} //End of for	

});//End of API Callback

},
    function() {
	// body...
	var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      //cb();
    });
  });
}
}]);
}//End of function getfiles




//We create photo URL
//Using this article
//https://secure.flickr.com/services/api/misc.urls.html
//And this format
//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
function construct_photo_url(farm, server, id, secret){
var url="http://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_b.jpg"
return url;

}

//Do the job
 getfiles();

