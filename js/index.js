$(function() {
				var $video = $('video');
				
				var video = $video.get(0);

				var $switch = $('.switch');
				
				var $total = $('.total');
				
				var $line = $('.line');
				
				var $current = $('.current');
				
				var $expand = $('.expand');
				
				var $bar = $('.bar');
				var formatTime = function(time) {
					/*00:00:00*/
					var h = Math.floor(time / 3600);
					var m = Math.floor(time % 3600 / 60);
					var s = Math.floor(time % 60);
					return(h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
				}
				
				video.oncanplay = function() {
					$video.show();
					
					var timeStr = formatTime(video.duration);
					
					$total.html(timeStr);
				}

				
				$switch.on('click', function() {
					if($switch.hasClass('fa-play')) {
						video.play();
						$(".player").show(1000);
						$switch.removeClass('fa-play').addClass('fa-pause');
					} else {
						video.pause();
						$(".player").hide(1000);
						$switch.removeClass('fa-pause').addClass('fa-play');
					}
				});
				
				var count = 0;
				$(".backward").click(function() {
					count--;
					var num1 = 1 + (count--) / 5
					video.playbackRate = num1;
				})
				$(".forward").click(function() {
					count++;
					var num2 = 1 + (count++) / 5
					video.playbackRate = num2;
				})
				
				video.ontimeupdate = function() {
					
					var p = video.currentTime / video.duration * 100 + '%';
					$line.css('width', p);
					
					$current.html(formatTime(video.currentTime));
				}
				
				$expand.on('click', function() {
					if($(this).hasClass('fa-arrows-alt')) {
						video.webkitRequestFullScreen();
						$(this).removeClass('fa-arrows-alt').addClass('fa-compress');
					} else {
						document.webkitCancelFullScreen();
						$(this).addClass('fa-arrows-alt').removeClass('fa-compress');
					}

				})
				
				video.onended = function() {
					video.currentTime = 0;
					$switch.removeClass('fa-pause').addClass('fa-play');
				}
				
				$bar.on('click', function(e) {
					
					var p = e.offsetX / $bar.width();
					var goTime = p * video.duration;
					video.currentTime = goTime;
				})
				$('.btnn').click(function() {
					$(this).toggleClass(function() {
						if($(this).hasClass('btnn')) {
							$(this).removeClass('btnn');
							return 'unlock';
						} else {
							$(this).removeClass('unlock');
							$(".controls").css("height","40px");
							return 'btnn';
						}
					})
				});
			});