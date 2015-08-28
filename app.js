var c,
ct,
flag = false,
dragStartLocation,
snapshot,fillCircle;
	function RandomColor() {
					var hex = (Math.round(Math.random() * 0xffffff)).toString(16);
					while (hex.length < 6) hex = "0" + hex;
					return "#"+hex;
				}
	function getXY(e) {
			var x = e.clientX - c.getBoundingClientRect().left,
				y = e.clientY - c.getBoundingClientRect().top;

			return {x: x, y: y};
		}
	function takeSnapshot() {
			snapshot = ctx.getImageData(0, 0, c.width, c.height);
		}
	function restoreSnapshot() {
			ctx.putImageData(snapshot, 0, 0);
		}
	function drawCircle(position) {
			var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
			ctx.beginPath();
			ctx.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
			ctx.fillStyle = RandomColor();
			ctx.fill();
			ctx.lineWidth = 5;
			ctx.strokeStyle = '#003300';
			ctx.stroke();
			}
	function init() 
	{
			c = document.getElementById("canvas");
			ctx = c.getContext('2d');
			c.addEventListener('mousedown', function(e){
				flag = true;
				dragStartLocation = getXY(e);
				takeSnapshot();
			}, false);
			c.addEventListener('mousemove', function(e){
				var position;
				if (flag === true) {
				restoreSnapshot();
				position = getXY(e);
				fillCircle=drawCircle(position);
			}
			}, false);
			c.addEventListener('mouseup', function(e){
				flag = false;
				restoreSnapshot();
				var position = getXY(e);
				fillCircle=drawCircle(position);
			}, false);
			c.addEventListener('dblclick',clearCircle ,false);
	}		
	function resetCanvas()
	{
					ctx.clearRect(0,0,c.width,c.height);
	}

window.addEventListener('load', init, false);
