DemoSeesaw = function() {
	var space;
	function init(s) {
		space = s;
		var staticBody = new Body(Body.STATIC);
		staticBody.addShape(new ShapeBox(0, 0, 790, 10));
		staticBody.addShape(new ShapeBox(-400, 250, 10, 500));
		staticBody.addShape(new ShapeBox(400, 250, 10, 500));
		staticBody.resetMassData();
		space.addBody(staticBody);

		var body = new Body(Body.DYNAMIC, -150, 80);
		var shape = new ShapeBox(0, 0, 140, 80);
		shape.e = 0.1;
		shape.u = 1.0;
		shape.density = 0.6;
		body.addShape(shape);
		body.resetMassData();        
		space.addBody(body);

		var body = new Body(Body.DYNAMIC, 0, 140);
		var shape = new ShapeBox(0, 0, 600, 10);
		shape.e = 0.4;
		shape.u = 0.7;
		shape.density = 0.4;
		body.addShape(shape);
		body.resetMassData();
		space.addBody(body);

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j <= i; j++) {                
				var body = new Body(Body.DYNAMIC, (j - i * 0.5) * 44 - 150, 350 - i * 44);
				var shape = new ShapeBox(0, 0, 40, 40);
				shape.e = 0.3;
				shape.u = 0.8;
				shape.density = 0.3;
				body.addShape(shape);
				body.resetMassData();
				space.addBody(body);
			}
		}        

		var body = new Body(Body.DYNAMIC, 250, 1500);
		var shape = new ShapePoly([new vec2(-135, 35), new vec2(-150, 0), new vec2(-55, -25), new vec2(35, -35), new vec2(63, 0), new vec2(75, 35)]);
		shape.e = 0.4;
		shape.u = 1.0;
		shape.density = 1.0;
		body.addShape(shape);
		body.resetMassData();
		space.addBody(body);
		body.applyForce(new vec2(0, 100), new vec2(0, 100));
	}

	function runFrame() {
	}

	return {
		init: init,
		runFrame: runFrame
	};
}();