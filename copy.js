$(document).ready(function(){
	var imageLink;
	var width;
	var height;
	var title;
	var totalViews;
	var totalSubscribers;
	var totalVideos;
	var channelId;
	var url;

	$("form").submit(function(){

		//fetch the value that is entered into input field 
		channelId=$("#search").val();
		//we will make the request to the youtube api
		//api key: AIzaSyBBeHM3546JghXqisrgurz3eFx03Ue6N-A

		//make a request
		url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Userid}&key=AIzaSyDU5QwdF880P2U1b8ivU5E3pYbm-VPm1d8";
		//url=https://www.googleapis.com/youtube/v3/channels?part=statistics&id=channelId&key=AIzaSyBBeHM3546JghXqisrgurz3eFx03Ue6N-A

		$.get(url,function(data){
			fetchData(data);

			bindData(imageLink,width,height,title,totalSubscribers,totalViews,totalVideos);

		});

		//automaticlly fetch the resoponse for us
					setInterval(function(){

					url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Userid}&key=AIzaSyDU5QwdF880P2U1b8ivU5E3pYbm-VPm1d8";

					$.get(url,function(data){
						console.log(data);
						updateSubscribers(data);

					});
		},0);

		return false;


	});
	function fetchData(){
		imageLink=data.items[0].snippet.thumbnails.medium.url;
		width=data.items[0].snippet.thumbnails.medium.url.width;
		height=data.items[0].snippet.thumbnails.medium.url.height;

		title = data.items[0].snippet.title;

		totalSubscribers = data.items[0].statistics.subscriberCount;
		totalViews = data.items[0].statistics.viewCount;
		totalVideos=data.items[0].statistics.videoCount;
	
	}

	function bindData(imageLink,width,height,title,totalSubscribers,totalViews,totalVideos){
		$("#thumbnail").attr("src",imageLink);
		$("#thumbnail").attr("width",width);
		$("thumbnail").attr("height",height);
		$("#title").html(title);
		$("#subscribers").html("<h5>subscribers</h5>" +totalSubscribers);
		$("#totalViews").html("<h5>TotalViews<h5>" +totalViews);
		$("#totalVideos").html("<h5>TotalVideos<h5>" +totalVideos);		
	}

	function updateSubscribers(data){
		$("#subscribers").html("<h5>Subscribers</h5>" + data.items[0].statistics.subscriberCount);
	}

});
