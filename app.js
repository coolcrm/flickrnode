//Oct 5 2013
var fs = require('fs');
var flickr = require('flickr-with-uploads');
var http = require('http');
var fullpath = '/home/vk/Загрузки/Fisher3.jpg';
extraslist = "tags='dog,cat'";

var api = flickr(
  '63b283b748057fcd5fdcd9d67a7dda75', // consumer_key
  '557b871d824b2c65c')/*   , // consumer_secret
  '3XF0pqP4daZf9oIlx-a7H1uMLeGrBidkJU', // oauth_token
  'KpslBxHoh4QYk6ad'); // oauth_token_secret

*/



function getfiles(){
var file;
var photourl = new Array();
var i = 1;
var request;
var filename;

// usually, the method name is precisely the name of the API method, as they are here:
    api({method: 'flickr.photos.getRecent', extras: extraslist}, function(err, response) {
	
	console.log('Total:', response.photos.total);      
	console.log('Response:', response.photos.photo[10].id);
	console.log('Response:', response.photos.photo[10].secret);
	console.log('Response:', response.photos.photo[10].server);
	console.log('Response:', response.photos.photo[10].farm);
	//var text = JSON.stringify(response);
	//console.log('Stringified:', text);
	//var obj=JSON.parse(response);
	//
	for (i=1; i<10;i++){
	console.log("i="+i);
		photourl [i] = construct_photo_url(response.photos.photo[i].farm, response.photos.photo[i].server, 		  response.photos.photo[i].id, response.photos.photo[i].secret);
	console.log(photourl[i]);
	} //End of for	
	
	i=1;
	for (var j in photourl){
	console.log('Next cycle');	
	//console.log("i="+i);
	filename= "./images/file"+i+".jpg";
	console.log(filename);
	//console.log('download_file_wget '+ photourl[i]);
	//console.log('i='+i);
	//download_file_wget(photourl[i]);
	
	file = fs.createWriteStream(filename);
	request = http.get(j, function(response) {
		response.pipe(file);
		file.on('finish', function() {
      		file.close();
      		});
		file.on('data', function() {
      		console.log(data);
      		});
	});	
	i++;
	} //End of for	


	//
	});//End of API Callback
	
	
	//
   

}//End of function



// Function to download file using wget
function download_file_wget(file_url) {

    // extract the file name
    var file_name = url.parse(file_url).pathname.split('/').pop();
    // compose the wget command
    var wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url;
    // excute wget using child_process' exec function

    var child = exec(wget, function(err, stdout, stderr) {
        if (err) throw err;
        else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
    });
};
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

// the upload method is special, but this library automatically handles the
// hostname change
/*
api({
  method: 'upload',
  title: 'My new pet??',
  description: "Don't tell Woo!",
  is_public: 0,
  is_friend: 1,
  is_family: 1,
  hidden: 2,
  photo: fs.createReadStream(fullpath)
}, function(err, response) {
  if (err) {
    console.error('Could not upload photo:', err);
  }
  else {
    var new_photo_id = response.photoid._content;
    // usually, the method name is precisely the name of the API method, as they are here:
    api({method: 'flickr.photos.getInfo', photo_id: new_photo_id}, function(err, response) {
      console.log('Full photo info:', response);
      api({method: 'flickr.photosets.addPhoto', photoset_id: 1272356126, photo_id: new_photo_id}, function(err, response) {
        console.log('Added photo to photoset:', response);
      });
    });
  }
});
*/
