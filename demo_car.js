DemoCar = function() {
	var space;
	function init(s) {
		space = s;
		var staticBody = new Body(Body.STATIC);
		staticBody.addShape(new ShapeBox(-400, 250, 10, 500));
		staticBody.addShape(new ShapeBox(400, 250, 10, 500));
		staticBody.addShape(new ShapePoly([new vec2(-400, 0), new vec2(-100, 0), new vec2(-100, 50), new vec2(-360, 190), new vec2(-400, 190)]));
		staticBody.addShape(new ShapePoly([new vec2(100, 0), new vec2(400, 0), new vec2(400, 190), new vec2(360, 190), new vec2(100, 50)]));
		staticBody.resetMassData();
		space.addBody(staticBody);

		// Bridge
		var body_prev;
		for (var i = 0; i < 10; i++) {
			var body = new Body(Body.DYNAMIC, -90 + i * 20, 45);
			var shape = new ShapeBox(0, 0, 22, 10);
			shape.e = 0.1;
			shape.u = 0.8;
			shape.density = 0.2;
			body.addShape(shape);
			body.resetMassData();
			space.addBody(body);

			if (i == 0) {
				var joint = new RevoluteJoint(staticBody, body, new vec2(-100, 45));
				joint.collideConnected = false;
				space.addJoint(joint);
			}
			else {
				var joint = new RevoluteJoint(body_prev, body, new vec2(-100 + i * 20, 45));
				joint.collideConnected = false;
				space.addJoint(joint);
			}

			body_prev = body;
		}

		var joint = new RevoluteJoint(body, staticBody, new vec2(100, 45));
		joint.collideConnected = false;
		space.addJoint(joint);

		// Car body        
		var body1 = new Body(Body.DYNAMIC, -340, 250);
		var shape = new ShapeBox(0, 10, 75, 20);
		shape.e = 0.5;
		shape.u = 1.0;
		shape.density = 0.06;
		body1.addShape(shape);
		shape = new ShapeBox(0, 30, 50, 20);
		shape.e = 0.5;
		shape.u = 1.0;
		shape.density = 0.001;
		body1.addShape(shape);
		body1.resetMassData();
		space.addBody(body1);

		// Wheel 1        
		var body2 = new Body(Body.DYNAMIC, -360, 245);
		var shape = new ShapeCircle(0, 0, 14);
		shape.e = 0.1;
		shape.u = 0.97;
		shape.density = 0.01;
		body2.addShape(shape);
		body2.resetMassData();
		space.addBody(body2);

		var joint = new DistanceJoint(body1, body2, new vec2(-360, 270), new vec2(-360, 245));
		joint.setSpringCoeffs(7, 0.7);
		joint.collideConnected = false;
		space.addJoint(joint);

		var joint = new LineJoint(body1, body2, new vec2(-360, 270), new vec2(-360, 245));
		joint.enableMotor(true);
		joint.setMotorSpeed(deg2rad(-1500));
		joint.setMaxMotorTorque(1400000);
		joint.collideConnected = false;
		space.addJoint(joint);

		// Wheel 2        
		var body3 = new Body(Body.DYNAMIC, -320, 245);
		var shape = new ShapeCircle(0, 0, 14);
		shape.e = 0.1;
		shape.u = 0.97;
		shape.density = 0.01;
		body3.addShape(shape);
		body3.resetMassData();
		space.addBody(body3);

		var joint = new DistanceJoint(body1, body3, new vec2(-320, 270), new vec2(-320, 245));
		joint.setSpringCoeffs(7, 0.7);
		joint.collideConnected = false;
		space.addJoint(joint);

		var joint = new LineJoint(body1, body3, new vec2(-320, 270), new vec2(-320, 245));
		//joint.enableMotor(true);        
		//joint.setMotorSpeed(deg2rad(-1200));
		//joint.setMaxMotorTorque(10000000);
		joint.collideConnected = false;
		space.addJoint(joint);

		// Both wheels constrained to be same rotation        
		//space.addJoint(new AngleJoint(body2, body3));
	}

	function runFrame() {
	}

	return {
		init: init,
		runFrame: runFrame
	};
}();