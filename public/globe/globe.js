shaderLink = new THREE.ShaderMaterial({
	extension: {
		derivatives: true, // set to use derivatives
		fragDepth: true, // set to use fragment depth values
		drawBuffers: true, // set to use draw buffers
		shaderTextureLOD: true // set to use shader texture LOD
	},
	side: THREE.DoubleSide,
	uniforms: {
		time: {
			value: 1.0
		},
		loop: {
			value: 50.0
		},
		color1: {
			value: 1.0
		},
		color2: {
			value: 0.6
		},
		color3: {
			value: 0.6
		},
		resolution: new THREE.Vector3()
	},
	vertexShader: ["varying vec2 vUv;",
		"void main() {",
		"vUv = uv;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join("\n"),
	fragmentShader: [
		"varying vec2 vUv;",
		"uniform float time;",
		"uniform float loop;",
		"uniform float color1;",
		"uniform float color2;",
		"uniform float color3;",
		"void main() {",
		"float dash = sin(vUv.x*loop + time);",
		"if(dash>0.0) discard;",
		"gl_FragColor = vec4(1, color1, color2, color3);",

		"}"
	].join("\n")
})

function PRingBufferGeometry(e, t, a, i, n, r) {
	THREE.BufferGeometry.call(this), this.type = "PRingBufferGeometry", this.parameters = {
		innerRadius: e,
		outerRadius: t,
		thetaSegments: a,
		phiSegments: i,
		thetaStart: n,
		thetaLength: r
	}, e = e || 20, t = t || 50, n = void 0 !== n ? n : 0, r = void 0 !== r ? r : 2 * Math.PI, a = void 0 !== a ? Math.max(3, a) : 8, i = void 0 !== i ? Math.max(1, i) : 1;
	var o, s, l, d = (a + 1) * (i + 1),
		u = a * i * 2 * 3,
		c = new THREE.BufferAttribute(new (u > 65535 ? Uint32Array : Uint16Array)(u), 1),
		h = new THREE.BufferAttribute(new Float32Array(3 * d), 3),
		f = new THREE.BufferAttribute(new Float32Array(3 * d), 3),
		p = new THREE.BufferAttribute(new Float32Array(2 * d), 2),
		m = 0,
		v = 0,
		E = e,
		w = (t - e) / i,
		g = new THREE.Vector3,
		T = new THREE.Vector2,
		x = 1 / i,
		R = 1 / a;
	for (s = 0; s <= i; s++) {
		for (l = 0; l <= a; l++) o = n + l / a * r, g.x = E * Math.cos(o), g.y = E * Math.sin(o), h.setXYZ(m, g.x, g.y, g.z), f.setXYZ(m, 0, 0, 1), T.x = l * R, T.y = s * x, p.setXY(m, T.x, T.y), m++;
		E += w
	}
	for (s = 0; s < i; s++) {
		var H = s * (a + 1);
		for (l = 0; l < a; l++) {
			o = l + H;
			var A = o,
				M = o + a + 1,
				b = o + a + 2,
				P = o + 1;
			c.setX(v, A), v++, c.setX(v, M), v++, c.setX(v, b), v++, c.setX(v, A), v++, c.setX(v, b), v++, c.setX(v, P), v++
		}
	}
	this.setIndex(c), this.addAttribute("position", h), this.addAttribute("normal", f), this.addAttribute("uv", p)
}

function Planet(e, t, a, i) {
	function n(e) {
		if (e.preventDefault(), e.touches) {
			var t = e.touches[0];
			y = t.clientX, S = t.clientY
		} else y = e.clientX * E, S = e.clientY * E;
		s(y, S), M = 0, mouse_is_down = !0
	}

	function r(e) {
		mouse_is_down = !1, h.state == h.IDLE && (M > 6 || isMobile.any && d())
	}

	function o(e) {
		if (e.preventDefault(), e.touches) {
			var t = e.touches[0];
			y = t.clientX, S = t.clientY
		} else y = e.clientX * E, S = e.clientY * E;
		s(y, S)
	}

	function s(e, t) {
		L = Math.abs(H.x - e), D = Math.abs(H.y - t), M += L * L + D * D, H.x = e, H.y = t, isMobile.any ? (A.x = 2 * (H.x / f.originalSize.width - .5), A.y = 2 * -(H.y / f.originalSize.height - .5)) : (A.x = 2 * (H.x / f.width - .5), A.y = 2 * -(H.y / f.height - .5))
	}

	function l() {
		if (h.state == h.IDLE) {
			var e, t;
			return P.setFromCamera(A, m), e = P.ray.intersectSphere(b), e && (t = h.getClosestLocation(e)), !(!t || t == h.location_current) && (u(t), !0)
		}
	}

	function d() {
		var e, t;
		P.setFromCamera(A, m), e = P.ray.intersectSphere(b), e && (t = h.getClosestLocation(e)), t ? u(t, !0) : h.deactivateHexagon()
	}

	function u(t, a) {
		if (!window.earthDemo || !window.earthDemo.running) {
			h.deactivateHexagon(), e.controls.autoRotate = !1, h.location_current = t, O = t, t.briefs = PlanetData.hasLocationAnyBriefs(O, !0), t.briefs_text = PlanetData.hasLocationAnyBriefTexts(O, !0), t.attack_list = PlanetData.getWorkList(O, !0), t.more = PlanetData.getMoreText(O, !0);
			var i = [t];
			if (kaspersky.getHexaspherePopup) {
				var n = function e() {
					h.deactivateHexagon(), o.off("mouseleave", e)
				},
					r = kaspersky.getHexaspherePopup(i, c, a);
				z = r.element, F = r.close;
				var o = $(z);
				o.on("mouseleave", n)
			}
			B.position.copy(t.position), e.controls.autoRotate = !1, t.light.visible = !1, h.commentToggle(!1)
		}
	}

	function c(t) {
		var a, i = t.desc[PlanetData.YEAR_ID];
		var ds = t;
		a = "brief" === i.type ? langUrl + i.brief_id : langUrl + "locations/" + PlanetData.YEAR_ID + "/" + t.location_id, h.state = h.ANIMATED,
		e.controls.detach(), f.style.cursor = "default", 
		h.deactivateHexagon(), 
		h.commentToggle(!1), 
		U.lookAt(t.position);
		var n = U.quaternion.clone();
		U.lookAt(e.camera.position);
		var r = U.quaternion.clone();
		U.updateMatrix();
		var o = e.camera.position.length();
		U.add(e.camera), e.camera.position.set(0, 0, o), e.camera.rotation.set(0, 0, 0), p.updateMatrixWorld(), U._anim_progress_ = 0, TweenLite.to(U, 1.5, {
			_anim_progress_: 1,
			ease: Sine.easeInOut,
			onUpdate: function () {
				THREE.Quaternion.slerp(r, n, U.quaternion, U._anim_progress_), U.updateMatrix()
			},
			onComplete: function () {
				TweenLite.to(e.camera.position, 1.2, {
					z: 1.15 * v,
					ease: Sine.easeIn,
					onComplete: function () { }
				}), 
				setTimeout(kaspersky.Transition.fadeIn, 400), 
				setTimeout(function () {
					redirect({lat: ds.planet_u, lon: ds.planet_v, ...ds})
					// kaspersky.navigateTo(a)
				}, 1000)
			}
		})
	}
	var h = ($(".debug"), window.PLANET = this);
	h.main = e;
	var f = e.renderer.domElement,
		p = h.scene = e.scene,
		m = e.camera,
		v = h.radius = 9,
		E = h.ratio = window.devicePixelRatio || 1;
	h.speedMultiple = 1;
	var w = this.container = new THREE.Object3D;
	p.add(w);
	var g = this.static_container = new THREE.Object3D;
	p.add(g), g.matrixAutoUpdate = !1;
	this.textureLoader = new THREE.TextureLoader;
	this.planet_color = 0x00d8ff, this.water_color = 0x00d8ff, h.LOADING = "loading", h.IDLE = "idle", h.ANIMATED = "animated", h.state = h.LOADING, h.data = t, t.countries_by_id = {};
	for (var T = 0; T < t.countries.length; T++) {
		var x = t.countries[T];
		t.countries_by_id[x.country_id] = x
	}
	t.locations_by_id = {};
	for (var T = 0; T < t.locations.length; T++) {
		var x = t.locations[T];
		t.locations_by_id[x.location_id] = x
	}
	this._PlanetCommentPopup = PlanetCommentPopup(this.main.$container), h.commentToggle = function (e) {
		h._PlanetCommentPopup && (e ? h._PlanetCommentPopup.showRandom() : h._PlanetCommentPopup.hide())
	}, h.locationsFullData = !1, this.getLocationBriefs = function (e, t) {
		var a = h.data.locations_by_id[e],
			n = a.brief_list;
		if (n) return void (!1 != !!n[PlanetData.YEAR_ID] && t(n[PlanetData.YEAR_ID].briefs));
		h.locationsFullData ? (n = a.brief_list = h.locationsFullData[e] || {}, !1 != !!n[PlanetData.YEAR_ID] && t(n[PlanetData.YEAR_ID].briefs)) : i()
			.done(function (i) {
				h.locationsFullData = i, n = a.brief_list = h.locationsFullData[e] || {}, !1 != !!n[PlanetData.YEAR_ID] && t(n[PlanetData.YEAR_ID].briefs)
			})
	}, this.drawPoints(1.1 * v), this.drawParticles(v),
		// this.drawBG()
		this.drawSputniks(), this.drawOrbitas(), this.planetLocations = new PlanetLocations(this), this.planetPointed = new PlanetPointed(this), this.planetContour = new PlanetContour(this);
	var R;
	this.update = function () {
		if (R = m.position.distanceToSquared(THREE.Vector3.ZERO) - 100, g.lookAt(m.getWorldPosition()), h.static_container.updateMatrix(), this.grid_shpere.rotation.y += 5e-4 * h.speedMultiple, this.orbits)
			for (var t = 0; t < this.orbits.length; t++) {
				var a = this.orbits[t];
				a.rotation.x += a._increment.x * h.speedMultiple, a.rotation.y += a._increment.y * h.speedMultiple, a.rotation.z += a._increment.z * h.speedMultiple
			}
		if (this.sputniks)
			for (var t = 0; t < this.sputniks.length; t++)
				if (!(this.frozen && this.frozen.indexOf("sputnik" + t) > -1)) {
					var i = this.sputniks[t];
					i.rotation.y += .002 * h.speedMultiple
				} if (this.particles && (this.particles.rotation.y += .001 * h.speedMultiple), this.planetPointed.update(), this.updateBg && this.updateBg(), z) {
					B.updateMatrix();
					var n = B.getWorldPosition(),
						r = n.clone()
							.project(m);
					r.x = (r.x + 1) / 2 * window.canvasWidth, r.y = -(r.y - 1) / 2 * (window.earthDemo && window.earthDemo.createMode ? document.documentElement.offsetHeight : window.innerHeight), z.style.transform = "translate(" + r.x + "px, " + r.y + "px)", this.isInFrontOfPlanet(B.position) || h.deactivateHexagon()
				}
		if (this._PlanetCommentPopup && this._PlanetCommentPopup.update(), this.state != this.IDLE || isMobile.any || l(), this.demoTargetLocation) {
			var o = new THREE.Vector3(0, 1, 1);
			this.demoTargetLocation.position.clone()
				.applyEuler(new THREE.Euler(0, e.camera.getWorldRotation()
					.y, 0, "XYZ"))
				.projectOnPlane(o)
				.x > Math.PI && (this.demoMoveToHexagon(this.demoTargetLocation, h.demoCallback), h.demoTargetLocation = null)
		}
	}, h.tile_current = null;
	var H = new THREE.Vector2(-2, -2),
		A = H.clone(),
		M = 0,
		b = new THREE.Sphere(h.container.position.clone(), v),
		P = new THREE.Raycaster;
	f.addEventListener("touchstart", n, !1), f.addEventListener("touchmove", o, !1), f.addEventListener("touchend", r, !1), f.addEventListener("mousedown", n, !1), f.addEventListener("mousemove", o, !1), f.addEventListener("mouseup", r, !1);
	var y, S, L, D, O = null,
		B = new THREE.Object3D;
	B.matrixAutoUpdate = !1, this.container.add(B);
	var F, z = null;
	this.deactivateHexagon = function () {
		O && ("function" == typeof F && F(), z = null, h.location_current = null, O.light.visible = !0, O = null, e.controls.autoRotate = !0, h.commentToggle(!0))
	};
	var U = new THREE.Object3D;
	U.up = new THREE.Vector3(0, 1, 0), e.scene.add(U), U.matrixAutoUpdate = !1, this.changeSpeed = function (t) {
		e.controls.autoRotateSpeed = -.002 * t, h.speedMultiple = t
	};
	var W = !0;
	this.demoStartLocation = function (e, t, a) {
		!1 === e && (e = 0);
		var i = Object.assign({}, h.planetLocations.current_locations[e]);
		a && W && (W = !1, i.position.x -= 2, i.position.y -= 1), this.changeSpeed(4), h.demoTargetLocation = i, h.demoCallback = t
	}, this.demoMoveToHexagon = function (t, a) {
		h.state = h.ANIMATED, e.controls.detach(), e.controls.autoRotate = !1, h.commentToggle(!1), U.lookAt(t.position);
		var i = U.quaternion.clone();
		t.position.clone();
		U.lookAt(e.camera.getWorldPosition()), U.setRotationFromEuler(e.camera.getWorldRotation());
		var n = U.quaternion.clone();
		e.camera.getWorldPosition()
			.clone()
			.applyEuler(e.camera.getWorldRotation());
		U.updateMatrix();
		var r = e.camera.position.length();
		U.add(e.camera), e.camera.position.set(0, 0, r), e.camera.rotation.set(0, 0, 0), p.updateMatrixWorld(), U._anim_progress_ = 0, TweenLite.to(U, 1.5, {
			_anim_progress_: 1,
			ease: Sine.easeInOut,
			onUpdate: function () {
				THREE.Quaternion.slerp(n, i, U.quaternion, U._anim_progress_), U.updateMatrix()
			},
			onComplete: function () {
				h.demoStartZ = e.camera.position.z, h.demoLocation = t, TweenLite.to(e.camera.position, 1.2, {
					z: 1.15 * v,
					ease: Sine.easeIn,
					onComplete: function () {
						a && a()
					}
				}), setTimeout(kaspersky.Transition.fadeIn, 400)
			}
		})
	}, this.demoMoveFromHexagon = function (t) {
		TweenLite.to(e.camera.position, 1.2, {
			z: h.demoStartZ,
			ease: Sine.easeOut,
			onComplete: function () {
				P.setFromCamera(A, m), e.controls.autoRotate = !0, e.controls.attach(), h.state = h.IDLE, t && t()
			}
		})
	}, this.stopSputnik = function (e) {
		h.frozen || (h.frozen = []), h.frozen.push("sputnik" + e)
	}, this.startSputnik = function () {
		h.frozen = []
	}, this.demoMoveToSputnik = function (t, a) {
		this.stopSputnik(t), h.state = h.ANIMATED, e.controls.detach(), e.controls.autoRotate = !1, h.commentToggle(!1), U.lookAt(window.PLANET.sputniks[t].children[0].getWorldPosition());
		var i = U.quaternion.clone();
		U.lookAt(e.camera.getWorldPosition()), U.setRotationFromEuler(e.camera.getWorldRotation());
		var n = U.quaternion.clone();
		U.updateMatrix();
		var r = e.camera.position.length();
		U.add(e.camera), e.camera.position.set(0, 0, r), e.camera.rotation.set(0, 0, 0), p.updateMatrixWorld(), U._anim_progress_ = 0, TweenLite.to(U, 5, {
			_anim_progress_: 1,
			ease: Sine.easeInOut,
			onUpdate: function () {
				THREE.Quaternion.slerp(n, i, U.quaternion, U._anim_progress_), U.updateMatrix()
			},
			onComplete: function () {
				h.demoStartZ = e.camera.position.z, h.demoLocation = location, TweenLite.to(e.camera.position, 1.2, {
					z: 1.4 * v,
					ease: Sine.easeIn,
					onComplete: function () {
						a && a()
					}
				}), setTimeout(kaspersky.Transition.fadeIn, 400)
			}
		})
	}, this.demoMoveFromSputnik = function (t) {
		TweenLite.to(e.camera.position, 1.2, {
			z: h.demoStartZ,
			ease: Sine.easeOut,
			onComplete: function () {
				P.setFromCamera(A, m), e.controls.autoRotate = !0, e.controls.attach(), h.state = h.IDLE, h.startSputnik(), t && t()
			}
		})
	}, this.stopEarth = function () {
		h.state = h.ANIMATED, e.controls.detach(), e.controls.autoRotate = !1, h.commentToggle(!1), setTimeout(kaspersky.Transition.fadeIn, 400)
	}, this.startEarth = function () {
		P.setFromCamera(A, m), e.controls.autoRotate = !0, e.controls.attach(), h.state = h.IDLE
	}, this.isInFrontOfPlanet = function (e) {
		return !(m.position.distanceToSquared(e) > R)
	}, this.googlePosToUV = function (e, t) {
		if (void 0 === e) {
			var a = "40.705565,-74.1180857".split(",");
			e = a[0], t = a[1]
		}
		var i = 1 - (parseFloat(e) + 90) / 180;
		(i += .014) > 1 && (i -= 1);
		var n = (parseFloat(t) + 180) / 360;
		return n -= .031, n < 0 && (n = 1 + n), {
			u: i,
			v: n
		}
	};
	var C = window.currentYear || PlanetData.year_ids[0];
	a(), e.animateOut(.05, function () {
		h.showYear(C, void 0, 6)
	})
}

// function Hexagon(e) {
// 	var t = new THREE.Color(0x00d8ff),
// 		a = (new THREE.Color(0x00d8ff), Utils.createHexagon(.5)),
// 		i = a.material;
// 	return i.transparent = !0, i.opacity = .4, i.blending = THREE.AdditiveBlending, i.depthWrite = !1, a._anim_progress = .001, a.scale.set(a._anim_progress, a._anim_progress, a._anim_progress), a.setToLocation = function (n) {
// 		a.location = n, a.position.copy(n.position), a.lookAt(new THREE.Vector3), i.color = t, e.add(a), a.matrixAutoUpdate = !0, TweenLite.killTweensOf(a), TweenLite.to(a, .2, {
// 			_anim_progress: .8,
// 			onUpdate: function () {
// 				a.scale.set(a._anim_progress, a._anim_progress, a._anim_progress)
// 			},
// 			onComplete: function () {
// 				a.matrixAutoUpdate = !1
// 			}
// 		})
// 	}, a.hide = function (t) {
// 		a.matrixAutoUpdate = !0, TweenLite.killTweensOf(a), TweenLite.to(a, 1, {
// 			_anim_progress: .001,
// 			onUpdate: function () {
// 				a.scale.set(a._anim_progress, a._anim_progress, a._anim_progress)
// 			},
// 			onComplete: function () {
// 				e.remove(a), t.push(a), a.matrixAutoUpdate = !1
// 			}
// 		})
// 	}, a
// }

function PlanetLocations(e) {
	function t(e, t) {
		var a = 0;
		e.opacity = 0, TweenLite.killTweensOf(e), TweenLite.to(e, .3, {
			delay: t - .3,
			ease: Sine.easeOut,
			onUpdate: function () {
				a += 1, e.opacity = Math.round(a % 2) * d
			},
			onComplete: function () {
				e.opacity = d
			}
		})
	}

	function a(t, a) {
		var i = 0;
		TweenLite.killTweensOf(t), TweenLite.to(t, .3, {
			ease: Sine.easeInOut,
			onUpdate: function () {
				i += 1, t.opacity = Math.round(i % 2) * d
			},
			onComplete: function () {
				e.container.remove(o)
			}
		})
	}

	function i(t, a, type) {
		let logic = a === type.secure ? w : a === type.attention ? T : a === type.redcode ? sol : ""
		var i = 2 * Math.random() + 1,
			n = new THREE.PlaneBufferGeometry(.3, i, 1),
			r = new THREE.Mesh(n, logic),
			o = new THREE.Matrix4;
		o.makeRotationX(Math.PI / 2), o.setPosition(new THREE.Vector3(0, 0, -i / 2)), n.applyMatrix(o);
		var s = r.clone();
		return r.add(s), s.rotation.z = Math.PI / 2, s.matrixAutoUpdate = !1, s.updateMatrix(), r.position.copy(t), r.lookAt(e.container.position), r.matrixAutoUpdate = !1, r.updateMatrix(), r
	}

	function n(e, t) {
		var a = w.map.offset;
		TweenLite.to(a, e, {
			delay: t,
			y: 0,
			ease: Sine.easeInOut
		})
	}

	function r(e) {
		var t = w.map.offset;
		TweenLite.to(t, e, {
			y: -1,
			ease: Sine.easeInOut
		})
	}
	var o, s = e.data,
		l = s.locations;

	this.current_locations;

	for (var d = .8,
		u = new THREE.MeshBasicMaterial({
			transparent: !0,
			opacity: 0,
			color: new THREE.Color(16768512),
			blending: THREE.AdditiveBlending,
			side: THREE.DoubleSide,
			depthWrite: !1
		}),
		is = new THREE.MeshBasicMaterial({
			transparent: !0,
			opacity: 0,
			color: new THREE.Color(15866512),
			blending: THREE.AdditiveBlending,
			side: THREE.DoubleSide,
			depthWrite: !1
		}),
		c = new THREE.MeshBasicMaterial({
			transparent: !0,
			opacity: 0,
			color: new THREE.Color(0x00d8ff),
			blending: THREE.AdditiveBlending,
			side: THREE.DoubleSide,
			depthWrite: !1
		}), h = [], f = 0; f < l.length; f++) h.push(l[f].preview);

	var p = Utils.createHexagon(.10, !1, void 0),
		m = Utils.createHexagon(.2, !1, void 0, .02);

	p.add(m);

	var v = 1.005 * e.radius,
		E = new THREE.Vector3;

	this.init = function (t) {
		var a = new THREE.Object3D;

		a.matrixAutoUpdate = !1;
		for (var n = a._locations = [], r = 0; r < l.length; r++) {
			var o = l[r];
			n.push(o)
		}

		let data = []

		for (var d, h = new THREE.Geometry, f = new THREE.Geometry, qol = new THREE.Geometry, r = 0; r < n.length; r++) {
			var o = n[r];
			let type = {
				secure: "secure",
				attention: "attention",
				redcode: "redcode",
			}
			if (!1 != !!o.desc[t]) {
				var w = o.desc[t];
				if (w.briefs) {
					o.country = s.countries_by_id[o.country_id];
					var g = e.googlePosToUV(o.planet_u, o.planet_v);
					Utils.setFromSpherical(v, g.v, g.u, p.position),
						data.push({
							coordinates: p.position.clone(),
							other: o.other
						})
					p.lookAt(E),
						p.updateMatrix(),
						p.updateMatrixWorld(),
						d = w.typeAttack === type.secure ? f : w.typeAttack === type.attention ? h : w.typeAttack === type.redcode ? qol : "",
						d.merge(p.geometry, p.matrixWorld),
						d.merge(m.geometry, m.matrixWorld),
						o.position = p.position.clone(),
						o.light = i(p.position, w.typeAttack, type),
						a.add(o.light)
				}
			}
		}

		let lat = currentCoordinate.lat
		let lng = currentCoordinate.lng

		var ds = e.googlePosToUV(lat, lng);

		let coordinate = Utils.setFromSpherical(v, ds.v, ds.u, p.position)
		data.map((d,k )=> {
			Utils.arcLink({
				fnc: a,
				cor1: coordinate,
				cor2: {
					...d.coordinates
				},
				radius: e.radius,
				material: shaderLink,
				key: k + 1,
			})
		})


		var T = new THREE.Mesh(h, u);
		a.add(T);
		var Tq = new THREE.Mesh(qol, is);
		a.add(Tq);
		var x = new THREE.Mesh(f, c);
		return a.add(x), a
	}, this.show = function (a, i) {
		var r = PlanetData.desc[a];
		r.locations_container || (r.locations_container = this.init(a)), o = r.locations_container, this.current_locations = o._locations, e.container.add(o),
			t(u, i),
			t(is, i),
			t(c, i),
			n(i / 2, i / 2)
	}, this.hide = function (e) {
		a(u, e),
			a(is, e),
			a(c, e), r(e / 2)
	};
	var w = new THREE.MeshBasicMaterial({
		transparent: !0,
		opacity: .9,
		blending: THREE.AdditiveBlending,
		side: THREE.DoubleSide,
		depthWrite: !1,
		fog: !0
	}),
		g = w;
	g.map = e.textureLoader.load(PlanetData.textures_path + "lightray.png"),
		g.map.wrapT = THREE.ClampToEdgeWrapping;
	var T = w.clone();
	T.map = e.textureLoader.load(PlanetData.textures_path + "lightray_yellow.png")
	var sol = w.clone();
	sol.map = e.textureLoader.load(PlanetData.textures_path + "lightray_red.png")
}

function PlanetPointed(e) {
	var t = e.textureLoader.load(PlanetData.textures_path + "dot.png");
	t.generateMipalphaMaps = !1, t.magFilter = THREE.LinearFilter, t.minFilter = THREE.LinearFilter;
	for (var a = [], i = 0; i < 2; i++) {
		var n = new THREE.PointsMaterial({
			size: .15 / e.ratio
		});
		n.color = new THREE.Color(0x00d8ff), n.map = t, n.depthWrite = !1, n.transparent = !0, n.opacity = 0, n.blending = THREE.AdditiveBlending;
		var r = i / 2;
		n.t_ = r * Math.PI * 2, n.speed_ = .04, n.min_ = .2 * Math.random() + .5, n.delta_ = .1 * Math.random() + .1, n.opacity_coef_ = 1, a.push(n)
	}
	var o, s;
	this.init = function (t) {
		var i = new THREE.Object3D;
		i.matrixAutoUpdate = !1;
		for (var n = [], r = 0; r < 2; r++) n[r] = {
			positions: []
		};
		spherical = new THREE.Spherical, spherical.radius = e.radius;
		for (var o = new THREE.Vector3, l = PlanetData.desc[t].earth_image, d = 0; d < 250; d++)
			for (var u = 250 * (1 - Math.sin(d / 250 * Math.PI)) / 250 + .5, c = 0; c < 250; c += u) {
				var h = c / 250,
					f = d / 250,
					p = l.isLandByUV(h, f);
				if (p) {
					var m = n[Math.floor(2 * Math.random())];
					spherical.theta = h * Math.PI * 2 - Math.PI / 2, spherical.phi = f * Math.PI, o.setFromSpherical(spherical), m.positions.push(o.x), m.positions.push(o.y), m.positions.push(o.z)
				}
			}
		for (var r = 0; r < n.length; r++) {
			for (var m = n[r], v = new THREE.BufferGeometry, E = new Float32Array(m.positions.length), w = 0; w < m.positions.length; w++) E[w] = m.positions[w];
			v.addAttribute("position", new THREE.BufferAttribute(E, 3)), v.computeBoundingSphere(), m.material = a[r];
			var g = m.mesh = new THREE.Points(v, m.material);
			g.matrixAutoUpdate = !1, i.add(g)
		}
		e.radius;
		s = new THREE.MeshBasicMaterial({
			transparent: !0,
			opacity: 0,
			color: new THREE.Color(0x00d8ff),
			blending: THREE.AdditiveBlending,
			depthWrite: !1
		});
		for (var T, x, R, H, A = Utils.createHexagon(.12, !1, s, .025), M = new THREE.Geometry, b = .01, P = (Math.PI, !1), y = .5 - Math.PI; y < -.6; y += .04) {
			R = .5 * Math.cos(y) + .5, P = !P, b = Math.abs(.01 / Math.sin(R * Math.PI)), T = Math.floor(1 / b);
			for (var S = 0; S < T; S++) x = .5 + (T / 2 - S - (P ? .5 : 0)) * b, H = R, Math.random() > .25 || l.isLandByUV(x, H) || l.isLandByUV(x - .02, H) || l.isLandByUV(x + .02, H) || l.isLandByUV(x, H - .02) || l.isLandByUV(x, H + .02) || (Utils.setFromSpherical(e.radius * (.97 - .01 * Math.random()), x, H, A.position), A.lookAt(THREE.Vector3.ZERO), A.updateMatrix(), A.updateMatrixWorld(), M.merge(A.geometry, A.matrixWorld))
		}
		var L = new THREE.Mesh(M, s);
		return L.matrixAutoUpdate = !1, i.add(L), i
	}, this.update = function () {
		for (var e = 0; e < a.length; e++) {
			var t = a[e];
			t.t_ += t.speed_, t.opacity = (Math.sin(t.t_) * t.delta_ + t.min_) * t.opacity_coef_
		}
	}, this.show = function (t, i) {
		var n = PlanetData.desc[t];
		n.pointed_sphere || (n.pointed_sphere = this.init(t)), o = n.pointed_sphere, e.container.add(o);
		for (var r = 0; r < a.length; r++) {
			var l = a[r];
			TweenLite.killTweensOf(l), TweenLite.to(l, i, {
				opacity_coef_: 1,
				ease: Sine.easeInOut,
				onComplete: function () { }
			})
		}
		TweenLite.killTweensOf(s), TweenLite.to(s, i, {
			opacity: .4,
			ease: Sine.easeInOut
		})
	}, this.hide = function (t) {
		for (var i = 0; i < a.length; i++) {
			var n = a[i];
			TweenLite.killTweensOf(n), TweenLite.to(n, t, {
				opacity_coef_: 0,
				ease: Sine.easeInOut,
				onComplete: function () {
					e.container.remove(o)
				}
			})
		}
		TweenLite.killTweensOf(s), TweenLite.to(s, t, {
			opacity: 0,
			ease: Sine.easeInOut
		})
	}
}

function PlanetCommentPopup(e) {
	var t, a = !1,
		i = window.PLANET,
		n = $("<div class='planet-comment-line'>")
			.appendTo(e)
			.hide(),
		r = $("<div class='planet-comment'>")
			.appendTo(e)
			.hide(),
		o = $("<div class='planet-comment-text'>")
			.appendTo(r),
		s = i.main.camera,
		l = new THREE.Object3D;
	i.container.add(l), this.show = function (e, s, d, u) {
		if ((!window.earthDemo || !window.earthDemo.running) && e) {
			if (i.state != i.IDLE) return void setTimeout(show.bind(this, e.name, s, d, u), 2e3);
			n.show(), o.text(e.name), o.attr("href", e.id), o.on("click", function () {
				location.href = $(this)
					.attr("href")
			}), r.stop()
				.show(200), a = !0, l.position.copy(s), d && (clearTimeout(t), t = setTimeout(function () {
					hide(u)
				}, d))
		}
	}, this.hide = function (e) {
		clearTimeout(t), r.stop()
			.hide(200, function () {
				n.hide(), a = !1, e && e()
			})
	};
	var d;
	return this.showRandom = function () {
		var e, t = i.planetLocations.current_locations;
		if (clearTimeout(d), !t) return void (d = setTimeout(this.showRandom, 100));
		for (var a = 0; t.length > 0 && a < 10 && (e = t[~~(Math.random() * t.length)], !(e.position && PlanetData.hasLocationAnyBriefs(e, !0) && i.isInFrontOfPlanet(e.position))); a++) e = null;
		if (!e) return void (d = setTimeout(this.showRandom, 200));
		i.getLocationBriefs(e.location_id, function (t) {
			if (t && t.length) {
				var a = t[~~(Math.random() * t.length)];
				show(a, e.position, 3e3, showRandom)
			} else d = setTimeout(this.showRandom, 100)
		})
	}, this.update = function () {
		if (a) {
			var e = l.getWorldPosition(),
				t = e.clone()
					.project(s);
			t.x = (t.x + 1) / 2 * window.canvasWidth, t.y = -(t.y - 1) / 2 * window.innerHeight;
			var o = e.clone()
				.multiplyScalar(1.1)
				.project(s);
			o.x = (o.x + 1) / 2 * window.canvasWidth, o.y = -(o.y - 1) / 2 * window.innerHeight, r.css({
				transform: "translate(" + o.x + "px, " + o.y + "px)",
				height: "auto",
				width: "auto"
			});
			var d = t.x - o.x,
				u = t.y - o.y,
				c = Math.sqrt(d * d + u * u) + 1,
				h = Math.atan2(u + 1, d);
			n.css({
				transform: "translate(" + o.x + "px, " + o.y + "px) rotate(" + h + "rad)",
				width: c + "px"
			}), i.isInFrontOfPlanet(e) || showRandom()
		}
	}, this
}

function ProjectiveImage(e, t) {
	var a, i = document.createElement("img");
	i.src = e, i.onload = function () {
		var e = document.createElement("canvas");
		a = e.getContext("2d"), e.width = i.width, e.height = i.height, a.drawImage(i, 0, 0, i.width, i.height), t && t()
	};
	var n = null;
	this.isLand = function (e, t) {
		var r = parseInt(i.width * (t + 180) / 360),
			o = parseInt(i.height * (e + 90) / 180);
		return null == n && (n = a.getImageData(0, 0, i.width, i.height)), 0 === n.data[4 * (o * n.width + r)]
	}, this.isLandByUV = function (e, t) {
		null == n && (n = a.getImageData(0, 0, i.width, i.height));
		var r = parseInt(i.width * e),
			o = parseInt(i.height * t);
		return 0 === n.data[4 * (o * n.width + r)]
	}, this.getUV = function (e, t) {
		return {
			x: (t + 180) / 360,
			y: (e + 90) / 180
		}
	}, this.getUVOfPI = function (e, t) {
		return {
			x: (t + Math.PI) / Utils.PI2,
			y: (e + Utils.PIh) / Math.PI
		}
	}
} ! function (e) {
	var t = /iPhone/i,
		a = /iPod/i,
		i = /iPad/i,
		n = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
		r = /Android/i,
		o = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
		s = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
		l = /IEMobile/i,
		d = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
		u = /BlackBerry/i,
		c = /BB10/i,
		h = /Opera Mini/i,
		f = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
		p = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
		m = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
		v = function (e, t) {
			return e.test(t)
		},
		E = function (e) {
			var E = e || navigator.userAgent,
				w = E.split("[FBAN");
			return void 0 !== w[1] && (E = w[0]), w = E.split("Twitter"), void 0 !== w[1] && (E = w[0]), this.apple = {
				phone: v(t, E),
				ipod: v(a, E),
				tablet: !v(t, E) && v(i, E),
				device: v(t, E) || v(a, E) || v(i, E)
			}, this.amazon = {
				phone: v(o, E),
				tablet: !v(o, E) && v(s, E),
				device: v(o, E) || v(s, E)
			}, this.android = {
				phone: v(o, E) || v(n, E),
				tablet: !v(o, E) && !v(n, E) && (v(s, E) || v(r, E)),
				device: v(o, E) || v(s, E) || v(n, E) || v(r, E)
			}, this.windows = {
				phone: v(l, E),
				tablet: v(d, E),
				device: v(l, E) || v(d, E)
			}, this.other = {
				blackberry: v(u, E),
				blackberry10: v(c, E),
				opera: v(h, E),
				firefox: v(p, E),
				chrome: v(f, E),
				device: v(u, E) || v(c, E) || v(h, E) || v(p, E) || v(f, E)
			}, this.seven_inch = v(m, E), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window ? this : void 0
		},
		w = function () {
			var e = new E;
			return e.Class = E, e
		};
	"undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = E : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = w() : "function" == typeof define && define.amd ? define("isMobile", [], e.isMobile = w()) : e.isMobile = w()
}(this), PRingBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype), PRingBufferGeometry.prototype.constructor = PRingBufferGeometry, THREE.PRingBufferGeometry = PRingBufferGeometry, THREE.CopyShader = {
	uniforms: {
		tDiffuse: {
			value: null
		},
		opacity: {
			value: 1
		}
	},
	vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
	fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "gl_FragColor = opacity * texel;", "}"].join("\n")
}, THREE.RGBShiftShader = {
	uniforms: {
		tDiffuse: {
			value: null
		},
		amount: {
			value: .005
		},
		angle: {
			value: 0
		}
	},
	vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
	fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float amount;", "uniform float angle;", "varying vec2 vUv;", "void main() {", "vec2 offset = amount * vec2( vUv.x - .5, vUv.y - .5 );", "vec4 cr = texture2D(tDiffuse, vUv + offset);", "vec4 cga = texture2D(tDiffuse, vUv);", "vec4 cb = texture2D(tDiffuse, vUv - offset);", "gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);", "}"].join("\n")
}, THREE.AlphaColorShader = {
	uniforms: {
		color: {
			value: new THREE.Color(0x00d8ff)
		},
		fogType: {
			value: 1
		},
		fogNear: {
			value: 10
		},
		fogFar: {
			value: 30
		}
	},
	vertexShader: ["attribute float alpha;", "varying float vAlpha;", "void main() {", "vAlpha = alpha;", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "gl_PointSize = 4.0;", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
	fragmentShader: ["uniform vec3 color;", "uniform int fogType;", "uniform float fogNear;", "uniform float fogFar;", "varying float vAlpha;", "void main() {", "vec3 fogColor = vec3(0,0,0);", "gl_FragColor = vec4( color, vAlpha * ( gl_FragCoord.z ) );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n"),
	transparent: !0
}, THREE.VerticalTiltShiftShader = {
	uniforms: {
		tDiffuse: {
			value: null
		},
		v: {
			value: 1 / 512
		},
		r: {
			value: .35
		}
	},
	vertexShader: ["\t\tvarying vec2 vUv;\t\t\t\tvoid main() {\t\t\t\t\t\tvUv = uv;\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\t\t\t\t\t}"].join("\n"),
	fragmentShader: ["uniform sampler2D tDiffuse;\t\tuniform float v;\t\tuniform float r;\t\t\t\tvarying vec2 vUv;\t\t\t\tvoid main() {\t\t\t\t\t\tvec4 sum = vec4( 0.0 );\t\t\t\t\t\tfloat vv = v * abs( vUv.y - 0.5 ) * 1.5;\t\t\t\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051;\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918;\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245;\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531;\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531;\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245;\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918;\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051;\t\t\t\t\t\tgl_FragColor = sum;\t\t\t\t\t}"].join("\n")
}, THREE.FXAAShader = {
	uniforms: {
		tDiffuse: {
			value: null
		},
		resolution: {
			value: new THREE.Vector2(1 / 1024, 1 / 512)
		}
	},
	vertexShader: ["void main() {", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
	fragmentShader: ["uniform sampler2D tDiffuse;",
		"uniform vec2 resolution;", "#define FXAA_REDUCE_MIN   (1.0/128.0)", "#define FXAA_REDUCE_MUL   (1.0/8.0)", "#define FXAA_SPAN_MAX     8.0", "void main() {", "vec3 rgbNW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * resolution ).xyz;", "vec3 rgbNE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * resolution ).xyz;", "vec3 rgbSW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * resolution ).xyz;", "vec3 rgbSE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * resolution ).xyz;", "vec4 rgbaM  = texture2D( tDiffuse,  gl_FragCoord.xy  * resolution );", "vec3 rgbM  = rgbaM.xyz;", "vec3 luma = vec3( 0.299, 0.587, 0.114 );", "float lumaNW = dot( rgbNW, luma );", "float lumaNE = dot( rgbNE, luma );", "float lumaSW = dot( rgbSW, luma );", "float lumaSE = dot( rgbSE, luma );", "float lumaM  = dot( rgbM,  luma );", "float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );", "float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );", "vec2 dir;", "dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));", "dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));", "float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );", "float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );", "dir = min( vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),", "max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),", "dir * rcpDirMin)) * resolution;", "vec4 rgbA = (1.0/2.0) * (", "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (1.0/3.0 - 0.5)) +", "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (2.0/3.0 - 0.5)));", "vec4 rgbB = rgbA * (1.0/2.0) + (1.0/4.0) * (", "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (0.0/3.0 - 0.5)) +", "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (3.0/3.0 - 0.5)));", "float lumaB = dot(rgbB, vec4(luma, 0.0));", "if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) ) {", "gl_FragColor = rgbA;", "} else {", "gl_FragColor = rgbB;", "}", "}"].join("\n")
}, THREE.EffectComposer = function (e, t) {
	if (this.renderer = e, void 0 === t) {
		var a = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			stencilBuffer: !1
		},
			i = e.getSize();
		t = new THREE.WebGLRenderTarget(i.width, i.height, a)
	}
	this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.passes = [], void 0 === THREE.CopyShader && console.error("THREE.EffectComposer relies on THREE.CopyShader"), this.copyPass = new THREE.ShaderPass(THREE.CopyShader)
}, Object.assign(THREE.EffectComposer.prototype, {
	swapBuffers: function () {
		var e = this.readBuffer;
		this.readBuffer = this.writeBuffer, this.writeBuffer = e
	},
	addPass: function (e) {
		this.passes.push(e);
		var t = this.renderer.getSize();
		e.setSize(t.width, t.height)
	},
	insertPass: function (e, t) {
		this.passes.splice(t, 0, e)
	},
	render: function (e) {
		var t, a, i = !1,
			n = this.passes.length;
		for (a = 0; a < n; a++)
			if (t = this.passes[a], !1 !== t.enabled) {
				if (t.render(this.renderer, this.writeBuffer, this.readBuffer, e, i), t.needsSwap) {
					if (i) {
						var r = this.renderer.context;
						r.stencilFunc(r.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), r.stencilFunc(r.EQUAL, 1, 4294967295)
					}
					this.swapBuffers()
				}
				void 0 !== THREE.MaskPass && (t instanceof THREE.MaskPass ? i = !0 : t instanceof THREE.ClearMaskPass && (i = !1))
			}
	},
	reset: function (e) {
		if (void 0 === e) {
			var t = this.renderer.getSize();
			e = this.renderTarget1.clone(), e.setSize(t.width, t.height)
		}
		this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2
	},
	setSize: function (e, t) {
		this.renderTarget1.setSize(e, t), this.renderTarget2.setSize(e, t);
		for (var a = 0; a < this.passes.length; a++) this.passes[a].setSize(e, t)
	}
}), THREE.Pass = function () {
	this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1
}, Object.assign(THREE.Pass.prototype, {
	setSize: function (e, t) { },
	render: function (e, t, a, i, n) {
		console.error("THREE.Pass: .render() must be implemented in derived pass.")
	}
}), THREE.RenderPass = function (e, t, a, i, n) {
	THREE.Pass.call(this), this.scene = e, this.camera = t, this.overrideMaterial = a, this.clearColor = i, this.clearAlpha = void 0 !== n ? n : 0, this.clear = !0, this.needsSwap = !1
}, THREE.RenderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
	constructor: THREE.RenderPass,
	render: function (e, t, a, i, n) {

		var r = e.autoClear;
		e.autoClear = !1, this.scene.overrideMaterial = this.overrideMaterial;
		var o, s;
		this.clearColor && (o = e.getClearColor()
			.getHex(), s = e.getClearAlpha(),
			e.setClearColor(this.clearColor, this.clearAlpha)),
			e.render(this.scene, this.camera, this.renderToScreen ? null : a, this.clear),
			this.clearColor && e.setClearColor(o, s),
			this.scene.overrideMaterial = null, e.autoClear = r
	}
}), THREE.MaskPass = function (e, t) {
	THREE.Pass.call(this), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1
}, THREE.MaskPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
	constructor: THREE.MaskPass,
	render: function (e, t, a, i, n) {
		var r = e.context,
			o = e.state;
		o.buffers.color.setMask(!1), o.buffers.depth.setMask(!1), o.buffers.color.setLocked(!0), o.buffers.depth.setLocked(!0);
		var s, l;
		this.inverse ? (s = 0, l = 1) : (s = 1, l = 0), o.buffers.stencil.setTest(!0), o.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE), o.buffers.stencil.setFunc(r.ALWAYS, s, 4294967295), o.buffers.stencil.setClear(l), e.render(this.scene, this.camera, a, this.clear), e.render(this.scene, this.camera, t, this.clear), o.buffers.color.setLocked(!1), o.buffers.depth.setLocked(!1), o.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295), o.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP)
	}
}), THREE.ClearMaskPass = function () {
	THREE.Pass.call(this), this.needsSwap = !1
}, THREE.ClearMaskPass.prototype = Object.create(THREE.Pass.prototype), Object.assign(THREE.ClearMaskPass.prototype, {
	render: function (e, t, a, i, n) {
		e.state.buffers.stencil.setTest(!1)
	}
}), THREE.ShaderPass = function (e, t) {
	THREE.Pass.call(this), this.textureID = void 0 !== t ? t : "tDiffuse", e instanceof THREE.ShaderMaterial ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = THREE.UniformsUtils.clone(e.uniforms), this.material = new THREE.ShaderMaterial({
		defines: e.defines || {},
		uniforms: this.uniforms,
		vertexShader: e.vertexShader,
		fragmentShader: e.fragmentShader
	})), this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), this.scene = new THREE.Scene, this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null), this.scene.add(this.quad)
}, THREE.ShaderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
	constructor: THREE.ShaderPass,
	render: function (e, t, a, i, n) {
		this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = a.texture), this.quad.material = this.material, this.renderToScreen ? e.render(this.scene, this.camera) : e.render(this.scene, this.camera, t, this.clear)
	}
}),
	THREE.SMAAPass = function (e, t) {
		THREE.Pass.call(this), this.edgesRT = new THREE.WebGLRenderTarget(e, t, {
			depthBuffer: !1,
			stencilBuffer: !1,
			generateMipmaps: !1,
			minFilter: THREE.LinearFilter,
			format: THREE.RGBFormat
		}), this.weightsRT = new THREE.WebGLRenderTarget(e, t, {
			depthBuffer: !1,
			stencilBuffer: !1,
			generateMipmaps: !1,
			minFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat
		});
		var a = new Image;
		a.src = this.getAreaTexture(), this.areaTexture = new THREE.Texture, this.areaTexture.image = a, this.areaTexture.format = THREE.RGBFormat, this.areaTexture.minFilter = THREE.LinearFilter, this.areaTexture.generateMipmaps = !1, this.areaTexture.needsUpdate = !0, this.areaTexture.flipY = !1;
		var i = new Image;
		i.src = this.getSearchTexture(), this.searchTexture = new THREE.Texture, this.searchTexture.image = i, this.searchTexture.magFilter = THREE.NearestFilter, this.searchTexture.minFilter = THREE.NearestFilter, this.searchTexture.generateMipmaps = !1, this.searchTexture.needsUpdate = !0, this.searchTexture.flipY = !1, void 0 === THREE.SMAAShader && console.error("THREE.SMAAPass relies on THREE.SMAAShader"), this.uniformsEdges = THREE.UniformsUtils.clone(THREE.SMAAShader[0].uniforms), this.uniformsEdges.resolution.value.set(1 / e, 1 / t), this.materialEdges = new THREE.ShaderMaterial({
			defines: THREE.SMAAShader[0].defines,
			uniforms: this.uniformsEdges,
			vertexShader: THREE.SMAAShader[0].vertexShader,
			fragmentShader: THREE.SMAAShader[0].fragmentShader
		}), this.uniformsWeights = THREE.UniformsUtils.clone(THREE.SMAAShader[1].uniforms), this.uniformsWeights.resolution.value.set(1 / e, 1 / t), this.uniformsWeights.tDiffuse.value = this.edgesRT.texture, this.uniformsWeights.tArea.value = this.areaTexture, this.uniformsWeights.tSearch.value = this.searchTexture, this.materialWeights = new THREE.ShaderMaterial({
			defines: THREE.SMAAShader[1].defines,
			uniforms: this.uniformsWeights,
			vertexShader: THREE.SMAAShader[1].vertexShader,
			fragmentShader: THREE.SMAAShader[1].fragmentShader
		}), this.uniformsBlend = THREE.UniformsUtils.clone(THREE.SMAAShader[2].uniforms), this.uniformsBlend.resolution.value.set(1 / e, 1 / t), this.uniformsBlend.tDiffuse.value = this.weightsRT.texture, this.materialBlend = new THREE.ShaderMaterial({
			uniforms: this.uniformsBlend,
			vertexShader: THREE.SMAAShader[2].vertexShader,
			fragmentShader: THREE.SMAAShader[2].fragmentShader
		}), this.needsSwap = !1, this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), this.scene = new THREE.Scene, this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null), this.scene.add(this.quad)
	}, THREE.SMAAPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
		constructor: THREE.SMAAPass,
		render: function (e, t, a, i, n) {
			this.uniformsEdges.tDiffuse.value = a.texture, this.quad.material = this.materialEdges, e.render(this.scene, this.camera, this.edgesRT, this.clear), this.quad.material = this.materialWeights, e.render(this.scene, this.camera, this.weightsRT, this.clear), this.uniformsBlend.tColor.value = a.texture, this.quad.material = this.materialBlend, this.renderToScreen ? e.render(this.scene, this.camera) : e.render(this.scene, this.camera, t, this.clear)
		},
		setSize: function (e, t) {
			this.edgesRT.setSize(e, t), this.weightsRT.setSize(e, t), this.materialEdges.uniforms.resolution.value.set(1 / e, 1 / t), this.materialWeights.uniforms.resolution.value.set(1 / e, 1 / t), this.materialBlend.uniforms.resolution.value.set(1 / e, 1 / t)
		},
		getAreaTexture: function () {
			return "data:image/png;base64,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"
		},
		getSearchTexture: function () {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="
		}
	}), THREE.FilmPass = function (e, t, a, i) {
		THREE.Pass.call(this), void 0 === THREE.FilmShader && console.error("THREE.FilmPass relies on THREE.FilmShader");
		var n = THREE.FilmShader;
		this.uniforms = THREE.UniformsUtils.clone(n.uniforms), this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: n.vertexShader,
			fragmentShader: n.fragmentShader
		}), void 0 !== i && (this.uniforms.grayscale.value = i), void 0 !== e && (this.uniforms.nIntensity.value = e), void 0 !== t && (this.uniforms.sIntensity.value = t), void 0 !== a && (this.uniforms.sCount.value = a), this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), this.scene = new THREE.Scene, this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null), this.scene.add(this.quad)
	}, THREE.FilmPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
		constructor: THREE.FilmPass,
		render: function (e, t, a, i, n) {
			this.uniforms.tDiffuse.value = a.texture, this.uniforms.time.value += i, this.quad.material = this.material, this.renderToScreen ? e.render(this.scene, this.camera) : e.render(this.scene, this.camera, t, this.clear)
		}
	}), THREE.POrbitControls = function (e, t) {
		function a(e, t, a) {
			v.x = e, v.y = t, v.delta_x = a ? 0 : v.x - v.prev_x, v.delta_y = a ? 0 : v.y - v.prev_y, v.prev_x = v.x, v.prev_y = v.y, h && (m.phi -= .002 * v.delta_y, m.theta -= .002 * v.delta_x, m.makeSafe())
		}

		function i(e) {
			!1 !== c.enabled && (e.preventDefault(), h = !0, a(e.clientX, e.clientY, !0))
		}

		function n(e) {
			!1 !== c.enabled && a(e.clientX, e.clientY)
		}

		function r(e) {
			!1 !== c.enabled && (e.preventDefault(), h = !1)
		}

		function o(e) {
			!1 !== c.enabled && !1 !== c.enableZoom && (e.preventDefault(), e.stopPropagation(), e.deltaY < 0 ? s(-c.zoomSpeed) : e.deltaY > 0 && s(c.zoomSpeed))
		}

		function s(e) {
			m.radius += e, m.radius = Math.max(c.minDistance, Math.min(c.maxDistance, m.radius))
		}

		function l(e) {
			if (!1 !== c.enabled) {
				var t = e.touches;
				switch (t.length) {
					case 1:
						h = !0, a(t[0].pageX, t[0].pageY, !0);
						break;
					case 2:
						if (!1 === c.enableZoom) return;
						var i = t[0].pageX - t[1].pageX,
							n = t[0].pageY - t[1].pageY,
							r = Math.sqrt(i * i + n * n);
						E.set(0, r)
				}
			}
		}

		function d(e) {
			if (!1 !== c.enabled) {
				e.preventDefault(), e.stopPropagation();
				var t = e.touches;
				switch (t.length) {
					case 1:
						a(t[0].pageX, t[0].pageY);
						break;
					case 2:
						if (!1 === c.enableZoom) return;
						var i = t[0].pageX - t[1].pageX,
							n = t[0].pageY - t[1].pageY,
							r = Math.sqrt(i * i + n * n);
						w.set(0, r), g.subVectors(w, E), g.y > 0 ? s(-c.zoomSpeed) : g.y < 0 && s(c.zoomSpeed), E.copy(w)
				}
			}
		}

		function u(e) {
			!1 !== c.enabled && (h = !1)
		}
		var c = this,
			h = !1,
			f = new THREE.Vector3,
			p = new THREE.Spherical,
			m = new THREE.Spherical;
		c.enabled = !0, c.enableDamping = !0, c.dampingFactor = .063, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableZoom = !0, this.zoomSpeed = 1, this.zoomFactor = .063, this.minDistance = 0, this.maxDistance = 1 / 0;
		var v = {
			x: 0,
			y: 0,
			prev_x: 0,
			prev_y: 0,
			delta_x: 0,
			delta_y: 0
		},
			E = new THREE.Vector2,
			w = new THREE.Vector2,
			g = new THREE.Vector2;
		c.attach = function () {
			t.addEventListener("mousedown", i, !1), t.addEventListener("mousemove", n, !1), t.addEventListener("mouseup", r, !1), t.addEventListener("touchstart", l, !1), t.addEventListener("touchend", u, !1), t.addEventListener("touchmove", d, !1), window.addEventListener("mouseout", r, !1), t.addEventListener("wheel", o, !1), m.setFromVector3(e.position), p.setFromVector3(e.position)
		}, c.detach = function () {
			t.removeEventListener("mousedown", i), t.removeEventListener("mousemove", n), t.removeEventListener("mouseup", r), t.removeEventListener("touchstart", l), t.removeEventListener("touchend", u), t.removeEventListener("touchmove", d), window.removeEventListener("mouseout", r), t.removeEventListener("wheel", o)
		}, c.update = function () {
			p.radius += (m.radius - p.radius) * c.zoomFactor, m.theta = Math.max(c.minAzimuthAngle, Math.min(c.maxAzimuthAngle, m.theta)), m.phi = Math.max(c.minPolarAngle, Math.min(c.maxPolarAngle, m.phi)), !h && c.autoRotate && (m.theta += c.autoRotateSpeed, m.makeSafe()), c.enableDamping ? (p.phi += (m.phi - p.phi) * c.dampingFactor, p.theta += (m.theta - p.theta) * c.dampingFactor, p.makeSafe()) : (p.radius = m.radius, p.phi = m.phi, p.theta = m.theta), e.position.setFromSpherical(p), e.lookAt(f)
		}, c.attach()
	}, THREE.XRayMaterial = function (e) {
		var t = {
			uTex: {
				type: "t",
				value: e.map || new THREE.Texture
			},
			offsetRepeat: {
				value: new THREE.Vector4(0, 0, 1, 1)
			},
			alphaProportion: {
				type: "1f",
				value: e.alphaProportion || .5
			},
			diffuse: {
				value: e.color || new THREE.Color(0x00d8ff)
			},
			opacity: {
				value: e.opacity || 1
			},
			gridOffset: {
				value: 0
			}
		};
		return setInterval(function () {
			t.gridOffset.value += e.gridOffsetSpeed || 1
		}, 40), new THREE.ShaderMaterial({
			uniforms: t,
			vertexShader: "\t\t\tvarying float _alpha;\t\t\tvarying vec2 vUv;\t\t\tuniform vec4 offsetRepeat;\t\t\tuniform float alphaProportion;\t\t\t\t\t    void main() {\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\t\t\t\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\t\t\t\t\t\t\t\tvec4 worldPosition = modelMatrix * vec4( vec3( position ), 1.0 );\t\t\t\tvec3 cameraToVertex = normalize( cameraPosition - worldPosition.xyz);\t\t\t\t_alpha = 1.0 - max( 0.0, dot( normal, cameraToVertex ) );\t\t\t\t_alpha = max( 0.0, (_alpha - alphaProportion) / (1.0 - alphaProportion) );\t\t    }",
			fragmentShader: "uniform sampler2D uTex;\t  \t\tuniform vec3 diffuse;\t  \t\tuniform float opacity;\t  \t\tuniform float gridOffset;\t  \t\t\t\t\tvarying float _alpha;\t\t\tvarying vec2 vUv;\t  \t\t\t  \t\tvoid main() {\t\t\t\tvec4 texColor = texture2D( uTex, vUv );\t\t\t\tfloat _a = _alpha * opacity;\t\t\t\tif( _a <= 0.0 ) discard;\t\t\t\t_a = _a * ( sin( vUv.y * 2000.0 + gridOffset ) * .5 + .5 );\t\t\t\tgl_FragColor = vec4( texColor.rgb * diffuse, _a );\t\t\t\t\t\t}",
			transparent: !0,
			blending: THREE.AdditiveBlending,
			depthTest: !1
		})
	},
	function (e) {
		function t() {
			var e = window.innerWidth,
				t = window.innerHeight;

			window.earthDemo && window.earthDemo.createMode && (e = !(document.documentElement.offsetWidth > 1e3) || window.earthDemo && window.earthDemo.running ? document.documentElement.offsetWidth : document.documentElement.offsetWidth - 302, t = document.documentElement.offsetHeight), window.canvasWidth = e, l.domElement.originalSize = {
				width: e,
				height: t
			}, u.aspect = e / t, u.updateProjectionMatrix(), l.setPixelRatio(window.earthDemo && window.earthDemo.running ? 1 : o), l.setSize(e, t), c && (c.setSize(e, t), f.uniforms.resolution.value.set(1 / e, 1 / t), p.uniforms.v.value = 1 / t)
		}

		function a() {
			if (shaderLink.uniforms?.time) {
				shaderLink.uniforms.time.value += 0.1
			}
			T || (E.state != E.ANIMATED && v.update(), E.update(), c ? c.render() : l.render(s, u), m && m.update(l), g = window.requestAnimationFrame(a))
		}

		function i() {
			isMobile.any || ($(l.domElement)
				.remove(), l = n.renderer = new THREE.WebGLRenderer({
					preserveDrawingBuffer: !0,
					powerPreference: "high-performance",
					alpha: true
				}), l.autoClearColor = new THREE.Color(0, 0, 0, 0), l.setPixelRatio(1), r.append(l.domElement), l.domElement.addEventListener("webglcontextlost", function () {
					isMobile.any || (x = !0, T || i())
				}), c = new THREE.EffectComposer(l), h = new THREE.RenderPass(s, u), c.addPass(h), h = new THREE.ShaderPass(THREE.RGBShiftShader), h.uniforms.amount.value = .0025, c.addPass(h), f = h = new THREE.ShaderPass(THREE.FXAAShader), c.addPass(h), p = h = new THREE.ShaderPass(THREE.VerticalTiltShiftShader), h.uniforms.r.value = .35, h.renderToScreen = !0, c.addPass(h), window.resizeEarth(), c ? c.render() : l.render(s, u))
		}
		var n = this,
			r = n.$container = $(".main-container");
		if (!Detector.webgl) return void r.hide();
		var o = void 0 !== window.devicePixelRatio ? window.devicePixelRatio : 1,
			s = n.scene = new THREE.Scene;
		s.fog = new THREE.Fog(0, 100, 100);
		var l = n.renderer = new THREE.WebGLRenderer({
			preserveDrawingBuffer: !0,
			powerPreference: "high-performance",
			alpha: true
		});
		l.autoClearColor = new THREE.Color(0, 0, 0, 0), l.setPixelRatio(o);
		var d = l.domElement;

		r.append(d);
		var u = n.camera = new THREE.PerspectiveCamera(60, window.earthDemo && window.earthDemo.createMode ? document.documentElement.offsetWidth / document.documentElement.offsetHeight : window.innerWidth / window.innerHeight, .1, 700);
		u.position.set(-16, 16, 0), u.lookAt(new THREE.Vector3(0, 0, 0));
		var c;
		if (!isMobile.any) {
			var h;
			c = new THREE.EffectComposer(l), h = new THREE.RenderPass(s, u), c.addPass(h), h = new THREE.ShaderPass(THREE.RGBShiftShader), h.uniforms.amount.value = .0025, c.addPass(h);
			var f = h = new THREE.ShaderPass(THREE.FXAAShader);
			c.addPass(h);
			var p = h = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
			h.uniforms.r.value = .35, h.renderToScreen = !0, c.addPass(h)
		}
		var m;
		window.addEventListener("resize", t, !1), t(), window.resizeEarth = t;
		var v = n.controls = new THREE.POrbitControls(u, l.domElement);
		v.minPolarAngle = .15 * Math.PI, v.maxPolarAngle = .85 * Math.PI, v.enableDamping = !0, v.dampingFactor = .063, v.autoRotate = !0, v.autoRotateSpeed = -.006, v.enableZoom = false, v.minDistance = 15, v.maxDistance = 25, v.zoomSpeed = .5, v.zoomFactor = .8;
		var E, w = e.ready.addWait();
		e.planetMain = function (e, t) {
			e()
				.then(function (e) {
					setTimeout(function () {
						E = new Planet(n, e, function () {
							w.resolve(), w = void 0
						}, t), a()
					}, 500)
				})
				.fail(function () {
					console.log("error")
				})
				.always(function () { })
		}, $(document)
			.trigger("panetMainLoaded");
		var g, T = !1,
			x = !1;
		l.domElement.addEventListener("webglcontextlost", function () {
			isMobile.any || (x = !0, T || i())
		}), r.on("animate:start", function () {
			T = !1, isMobile.any ? ($(l.domElement)
				.remove(), l = n.renderer = new THREE.WebGLRenderer({
					preserveDrawingBuffer: !0,
					powerPreference: "high-performance"
				}), l.autoClearColor = new THREE.Color(0, 0, 0, 0), l.setPixelRatio(1), r.append(l.domElement), l.domElement.addEventListener("webglcontextlost", function () {
					isMobile.any || (x = !0, T || i())
				}), window.resizeEarth(), c ? c.render() : l.render(s, u)) : x ? (x = !1, i()) : l.setPixelRatio(1), a()
		}), r.on("animate:stop", function () {
			T = !0, l.setPixelRatio(1), window.cancelAnimationFrame(g), l.clear(!0, !0, !0), l.dispose(), isMobile.any && (window.navigator.userAgent.indexOf("MSIE ") > 0 || window.navigator.userAgent.match(/Trident.*rv\:11\./) || l.context.isContextLost() || l.forceContextLoss())
		}), this.animateIn = function (e, t) {
			e = e || 3, TweenLite.to(v, e, {
				autoRotateSpeed: -.002,
				ease: Sine.easeOut
			}), u.updateProjectionMatrix(), 
				TweenLite.to(u, e, {
				fov: animateZoomIn,
				ease: Sine.easeInOut,
				onUpdate: function () {
					u.updateProjectionMatrix()
				},
				onComplete: function () {
					t && t()
				}
			})
		}, this.animateOut = function (e, t) {
			e = e || 2, TweenLite.to(u, e, {
				fov: animateZoomOut,
				ease: Sine.easeInOut,
				onUpdate: function () {
					u.updateProjectionMatrix()
				},
				onComplete: function () {
					t && t()
				}
			})
		}
	}(kaspersky = kaspersky || {});
var kaspersky;
Planet.prototype.getClosestLocation = function (e) {
	for (var t, a = isMobile.any ? .15 : .04, i = this.planetLocations.current_locations, n = 0; n < i.length; n++) {
		var r = i[n];
		if (r.position && PlanetData.hasLocationAnyBriefs(r, !0)) {
			var o = e.distanceToSquared(r.position);
			if (o < a) {
				a = o, t = r;
				break
			}
		}
	}
	return t
}, Planet.prototype.getAnyClosestLocation = function (e, t) {
	for (var a, i = 1e4, n = this.planetLocations.current_locations, r = 0; r < n.length; r++) {
		var o = n[r];
		if (!t || ! function (e) {
			for (var a = 0; a < t.length; a++)
				if (t[a] == e) return !0;
			return !1
		}(o)) {
			var s = e.distanceToSquared(o.position);
			s < i && (i = s, a = o)
		}
	}
	return a
}, Planet.prototype.drawPoints = function (e) {
	this.grid_shpere = new THREE.Object3D;
	var t = new THREE.SphereGeometry(1.1 * e, 66, 44),
		a = new THREE.XRayMaterial({
			map: this.textureLoader.load(PlanetData.textures_path + "clouds.jpg"),
			alphaProportion: .5,
			color: new THREE.Color(0x00d8ff),
			opacity: 1,
			gridOffsetSpeed: .6
		}),
		i = new THREE.Mesh(t, a);
	i.matrixAutoUpdate = !1, this.container.add(i);
	for (var n = 3 * t.vertices.length, r = new Float32Array(n), o = new Float32Array(n), s = new Float32Array(n), l = new THREE.Color(0x00d8ff), d = 0; d < t.vertices.length; d++) {
		var u = t.vertices[d],
			c = 3 * d;
		r[c] = u.x, r[c + 1] = u.y, r[c + 2] = u.z, o[c] = l.r, o[c + 1] = l.g, o[c + 2] = l.b, s[Math.floor(c / 3)] = .3 * Math.random() + .5
	}
	var h = new THREE.BufferGeometry;
	h.addAttribute("position", new THREE.BufferAttribute(r, 3)), h.addAttribute("color", new THREE.BufferAttribute(o, 3)), h.addAttribute("alpha", new THREE.BufferAttribute(s, 1)), h.computeBoundingSphere();
	var f = new THREE.ShaderMaterial(THREE.AlphaColorShader);
	f.depthWrite = !1, f.uniforms.fogNear.value = 10, f.uniforms.fogFar.value = 20;
	var p = new THREE.Points(h, f);
	p.matrixAutoUpdate = !1, this.grid_shpere.add(p)
},
	Planet.prototype.drawParticles = function (e) {
		for (var t = new Float32Array(1800), a = new THREE.Color(0x00d8ff), i = new THREE.Spherical, n = new THREE.Vector3, r = 0; r < 600; r++) {
			var o = 3 * r;
			i.radius = e * (1 + .6 * Math.random()), i.theta = 8 * Math.random(), i.phi = .3 + 2.2 * Math.random(), n.setFromSpherical(i), t[o] = n.x, t[o + 1] = n.y, t[o + 2] = n.z
		}
		var s = new THREE.BufferGeometry;
		s.addAttribute("position", new THREE.BufferAttribute(t, 3)), s.computeBoundingSphere();
		var l = new THREE.PointsMaterial;
		l.size = .1 / this.ratio, l.color = a, l.transparent = !0, l.opacity = .6, l.blending = THREE.AdditiveBlending, l.depthWrite = !1;
		var d = new THREE.Points(s, l);
		d.matrixAutoUpdate = !1, this.particles = new THREE.Object3D, this.scene.add(this.particles), this.particles.add(d)
	},

	Planet.prototype.drawRing = function (e, t, a, i, n) {
		var r = new THREE.RingGeometry(t, t + a, 64, 1),
			o = new THREE.Matrix4;
		n ? o.setPosition(new THREE.Vector3(0, 0, .29 * t)) : o.makeRotationX(Math.PI / 2), r.applyMatrix(o);
		var s = new THREE.MeshBasicMaterial({
			color: this.planet_color,
			side: THREE.DoubleSide
		});
		s.transparent = !0, s.opacity = .2 * Math.random() + .1, s.blending = THREE.AdditiveBlending, s.depthWrite = !1;
		var l = new THREE.Mesh(r, s);
		return l.rotation.set(i.x, i.y, i.z), l.position.set(e.x, e.y, e.z), this.container.add(l), l
	},
	Planet.prototype.drawOrbitas = function () {
		this.orbits = [];
		for (var e = 0; e < this.radius; e += 3) {
			var t = new THREE.Vector3(0, e, 0),
				a = Math.cos(t.y / this.radius);
			a += Math.random() > .8 ? .7 * Math.random() : .2 * Math.random();
			var i = new THREE.Vector3(Math.random() * Math.PI, 0, Math.random() * Math.PI);
			t.y = 0;
			var n = this.drawRing(t, 1.1 * this.radius, .05 * Math.random() + .02, i),
				r = Utils.getRandSides(.002),
				o = Utils.getRandSides(.002),
				s = Utils.getRandSides(.002);
			n._increment = new THREE.Vector3(r, o, s), this.orbits.push(n)
		}
	},

	Planet.prototype.drawBG = function () {
		function e(e, a, s, l, c, h) {
			a = a / i * r, s = s / n * o;
			var f = new THREE.PlaneGeometry(a, s, 1),
				p = t(e);
			p.opacity = 1, p.anim_offset = h || 0, u.push(p);
			var m = new THREE.Mesh(f, p);
			m.position.x = -r / 2 + a / 2 + l / i * r, m.position.y = o / 2 - s / 2 - c / n * o, m.position.z = .01, m.matrixAutoUpdate = !1, m.updateMatrix(), d.add(m)
		}

		function t(e, t) {
			var i = new THREE.MeshBasicMaterial;
			return i.fog = !0, i.transparent = !0, i.opacity = 0, i.blending = THREE.AdditiveBlending, i.depthWrite = !1, i.map = a.textureLoader.load(PlanetData.textures_path + e, t), i.map.generateMipalphaMaps = !1, i.map.magFilter = THREE.LinearFilter, i.map.minFilter = THREE.LinearFilter, i
		}
		var a = this,
			i = 2560,
			n = 1440,
			r = i / 500 * this.radius,
			o = n / 500 * this.radius,
			s = new THREE.PlaneGeometry(r, o, 1);
		l = t("bg.png", function () {
			TweenLite.to(l, 3, {
				opacity: 1,
				ease: Sine.easeInOut
			})
		}),
			d = this.bg = new THREE.Mesh(s, l);
		d.matrixAutoUpdate = !1, this.static_container.add(d);
		var u = [];
		e("bg_fragment_left.jpg", 933, 1011, 219, 0, 0), e("bg_fragment_left_1.jpg", 933, 1011, 219, 0, Math.PI), e("bg_fragment_right.jpg", 1074, 1133, 1516, 8, Math.PI / 3), e("bg_fragment_right_1.jpg", 1074, 1133, 1516, 8, Math.PI / 3 + Math.PI), this.updateBg = function (e) {
			for (var t = 0; t < u.length; t++) {
				var a = u[t];
				a.anim_offset += .03, a.opacity = .4 * Math.sin(a.anim_offset) + .2
			}
		}
	}, Planet.prototype.drawSputniks = function () {
		this.sputniks = [];
		this.addSputnik("station_b.js", 1.2 * this.radius, this.container, new THREE.Vector3(-.5, 0, 0)), this.addSputnik("station_c.js", 1.25 * this.radius, this.container, new THREE.Vector3(.6, 3, -1.2))
	}, Planet.prototype.addSputnik = function (e, t, a, i) {
		var n = this,
			r = new THREE.JSONLoader,
			o = n.drawRing(new THREE.Vector3, t, .05, new THREE.Vector3);
		o.material.opacity = .3, r.load(PlanetData.textures_path + e, function (e, a) {
			var i = new THREE.MeshBasicMaterial({
				color: n.planet_color
			});
			i.wireframe = !0;
			var r = new THREE.Mesh(e, i);
			r.position.x = -t, r.rotation.x = .5, r.scale.set(.03, .03, .03), r.matrixAutoUpdate = !1, r.updateMatrix(), o.add(r)
		}), n.sputniks.push(o);
		var s = new THREE.Object3D;
		return n.container.add(s), s.add(o), s.rotation.x = i.x, s.rotation.y = i.y, s.rotation.z = i.z, s.matrixAutoUpdate = !1, s.updateMatrix(), o
	}, PlanetContour = function (e) {
		function t(t) {
			var a = e.textureLoader.load(t);
			return a.generateMipalphaMaps = !1, a.magFilter = THREE.LinearFilter, a.minFilter = THREE.LinearFilter, a
		}

		function a(e, t) {
			e.visible = !0;
			var a = e.material;
			a.opacity = 0, TweenLite.killTweensOf(a), TweenLite.to(a, t, {
				opacity: n,
				ease: Sine.easeInOut
			})
		}

		function i(e, t) {
			var a = e.material;
			TweenLite.killTweensOf(a), TweenLite.to(a, t, {
				opacity: 0,
				ease: Sine.easeInOut,
				onComplete: function () { }
			})
		}
		var n = .8,
			r = new THREE.SphereGeometry(.995 * e.radius, 32, 32, 0, Math.PI),
			o = new THREE.MeshBasicMaterial;
		o.color = new THREE.Color(0x00d8ff), o.fog = !1, o.transparent = !0, o.blending = THREE.AdditiveBlending, o.depthWrite = !1;
		var s = new THREE.Mesh(r, o);
		s.visible = !1, s.matrixAutoUpdate = !1, s.updateMatrix(), e.container.add(s), s.matrixAutoUpdate = !1;
		var l = o.clone(),
			d = s.clone();
		d.material = l, e.container.add(d), d.rotation.y = Math.PI, d.updateMatrix(), this.show = function (e, i) {
			var n = PlanetData.desc[e];
			if (!n.contour_texture) {
				var r = n.contour_url;
				n.contour_texture = [t(r[0]), t(r[1])]
			}
			o.map = n.contour_texture[0], o.map.generateMipalphaMaps = !1, o.map.magFilter = THREE.LinearFilter, o.map.minFilter = THREE.LinearFilter, o.needsUpdate = !0, l.map = n.contour_texture[1], l.map.generateMipalphaMaps = !1, l.map.magFilter = THREE.LinearFilter, l.map.minFilter = THREE.LinearFilter, l.needsUpdate = !0, a(s, i), a(d, i)
		}, this.hide = function (e) {
			i(s, e), i(d, e)
		}
	};
var PlanetData = function () {
	var e = this;
	this.textures_path = "../assets_globe/earth/", this.YEAR = null, this.YEAR_ID = null, this.desc = {
		attack: {
			earth_url: this.textures_path + "earth_1.png",
			contour_url: [this.textures_path + "contour1_1.png", this.textures_path + "contour2_1.png"],
			min_locations: 100
		},
	
	}, this.year_ids = [];
	for (var t in this.desc) this.year_ids.push(t);
	return this.hasLocationAnyBriefs = function (t, a) {
		if (!0 === a && t.desc[e.YEAR_ID]) return t.desc[e.YEAR_ID].briefs;
		if (void 0 !== a && t.desc[a]) return t.desc[a].briefs;
		for (var i in t.desc) {
			var n = t.desc[i].briefs;
			if (n) return n
		}
		return 0
	}, this.hasLocationAnyBriefTexts = function (t, a) {
		if (!0 === a) return t.desc[e.YEAR_ID]?.briefs_text;
		if (void 0 !== a) return t.desc[a]?.briefs_text;
		for (var i in t.desc) {
			if (t.desc[i].briefs) return t.desc[i]?.briefs_text
		}
		return 0
	}, this.getWorkList = function (t, a) {
		return 1 == a ? t.desc[e.YEAR_ID]?.attack_list : void 0 !== a ? t.desc[a]?.attack_list : 0
	}, this.getMoreText = function (t, a) {
		return 1 == a ? t?.desc[e.YEAR_ID]?.more_btn : void 0 !== a ? t?.desc[a]?.more_btn : 0
	}, this
}();
Planet.prototype.showYear = function (e, t) {
	function a() {
		var a = 2.25;
		i.main.animateIn(a, function () {
			i.state = i.IDLE, i.commentToggle(!0), $(".timeline")
				.css("pointer-events", "auto")
		}), a = a / 3 * 2, i.planetLocations.show(e, a), i.planetPointed.show(e, a), i.planetContour.show(e, a), t && t(), i._PlanetCommentPopup && i._PlanetCommentPopup.showRandom()
	}
	var i = this;
	if (PlanetData.YEAR_ID) return void this.hidePlanet(e, t);
	PlanetData.YEAR_ID = e, PlanetData.YEAR = PlanetData.desc[e], PlanetData.YEAR.earth_image ? a() : PlanetData.YEAR.earth_image = this.projectiveImage = new ProjectiveImage(PlanetData.YEAR.earth_url, a), $(".timeline")
		.css("pointer-events", "none")
}, Planet.prototype.hidePlanet = function (e, t, a) {
	this.state = this.ANIMATED;
	var i = this;
	this.deactivateHexagon(), $(".timeline")
		.css("pointer-events", "none"), i.commentToggle(!1), void 0 === a && (a = 1.5), this.main.animateOut(a, function () {
			PlanetData.YEAR_ID = void 0, i.showYear(e, t)
		}), i.planetLocations.hide(a / 2), i.planetPointed.hide(a / 2), i.planetContour.hide(a / 2), this._PlanetCommentPopup && this._PlanetCommentPopup.hide()
}, THREE.Text = function (e) {
	function t() {
		a.font_height = a.font_propotion * d.canvas_vis_height, n.font = a.fontStyle + " " + a.font_height + "px " + a.font, n.fillStyle = a.fillStyle, n.textBaseline = "middle"
	}
	var a = this;
	a.offset_x = e.offset_x || 0, a.border_x = e.border_x || 0, a.offset_y = e.offset_y || 0, a.font = e.font || "Arial", a.font_propotion = e.font_propotion || 20, a.fillStyle = e.fillStyle || "rgba(255,0,0, 0.95)", a.fontStyle = e.fontStyle || "";
	var i = a.canvas = document.createElement("canvas"),
		n = a.context = i.getContext("2d");
	e.debug && (document.body.appendChild(i), i.style.position = "absolute", i.style.top = 0, i.style.left = 0);
	var r = new THREE.Texture(i);
	r.needsUpdate = !0, r.generateMipmaps = !1, r.magFilter = THREE.LinearFilter, r.minFilter = THREE.LinearFilter, r.wrapS = THREE.ClampToEdgeWrapping, r.needsUpdate = !0;
	var o = new THREE.MeshBasicMaterial({
		map: r
	});
	o.transparent = e.transparent || !1, o.side = void 0 == e.side ? THREE.DoubleSide : e.side, o.depthWrite = !1;
	var s = new THREE.PlaneGeometry(1, 1),
		l = new THREE.Matrix4;
	l.setPosition(new THREE.Vector3(.5, .5, 0)), s.applyMatrix(l);
	var d = a.mesh = new THREE.Mesh(s, o);
	return d.matrixAutoUpdate = !1, d.visible = !1, d.setSize = function (e, t) {
		d.width = e, d.height = t;
		var a = d.canvas_vis_width = Math.floor(100 * e),
			n = d.canvas_vis_height = Math.floor(100 * t),
			o = Utils.nearestPow2(a),
			s = Utils.nearestPow2(n);
		i.width = o, i.height = s, r.repeat.x = d.pow_coef_x = a / o, r.repeat.y = d.pow_coef_y = n / s, r.offset.y = 1 - r.repeat.y, d.scale.set(e, t, 1), d.updateMatrix()
	}, d.setWidth = function (i) {
		var r;
		return "string" == typeof i ? (t(), r = (n.measureText(i)
			.width + a.offset_x + a.border_x) / 100) : r = i, d.setSize(r, e.height), r
	}, d.setText = function (e, o) {
		d.setWidth(o || e), n.clearRect(0, 0, i.width, i.height), d.prefill && d.prefill.apply(a), t(), n.fillText(e, a.offset_x, d.canvas_vis_height / 2), r.needsUpdate = !0
	}, d.show = function (e) {
		d.scale.x = .001, d.matrixAutoUpdate = !0, TweenLite.killTweensOf(d.scale), TweenLite.to(d.scale, .2, {
			delay: e,
			x: Math.floor(d.width),
			ease: Sine.easeOut,
			onStart: function () {
				d.visible = !0
			},
			onComplete: function () {
				d.updateMatrix(), d.matrixAutoUpdate = !1
			}
		})
	}, d.hide = function (e) {
		d.visible && (d.scale.x = 0, d.matrixAutoUpdate = !0, TweenLite.killTweensOf(d.scale), TweenLite.to(d.scale, .2, {
			delay: e,
			x: .001,
			ease: Sine.easeIn,
			onComplete: function () {
				d.visible = !1, d.updateMatrix(), d.matrixAutoUpdate = !1
			}
		}))
	}, d
};
var Utils = new function () {
	this.getHalfPoint = function (e, t) {
		var e = new THREE.Vector3(e.x, e.y, e.z),
			t = new THREE.Vector3(t.x, t.y, t.z);
		return t.sub(e)
			.divideScalar(2)
			.add(e)
	}, this.getRandSides = function (e) {
		return Math.random() * e * 2 - e
	}, this.PIh = Math.PI / 2, this.PI2 = 2 * Math.PI, THREE.Vector3.ZERO = new THREE.Vector3, this.createHexagon = function (e, t, a, i) {
		var n = i ? new THREE.RingGeometry(e, e + i, 32, 1) : new THREE.CircleGeometry(e, 32);
		if (t) {
			var r = new THREE.Matrix4;
			r.identity()
				.makeRotationX(Math.PI / 2), n.applyMatrix(r), r.identity()
					.makeRotationY(Utils.PI2 / 6 / 2), n.applyMatrix(r)
		}
		if (!a) var a = new THREE.MeshBasicMaterial({
			color: 0x00d8ff
		});
		a.side = THREE.BackSide;
		var o = new THREE.Mesh(n, a);
		return o.matrixAutoUpdate = !1, o
	}, this.orientHexagon = function (e, t, a) {
		e.position.copy(t.centerPoint), e.up.set(10 * t.centerPoint.x, 10 * t.centerPoint.y, 10 * t.centerPoint.z), a && e.lookAt(t.boundary[0])
	}, this.nearestPow2 = function (e) {
		return Math.pow(2, Math.ceil(Math.log(e) / Math.log(2)))
	}, this.setFromSpherical = function (e, t, a, i) {
		var n = new THREE.Spherical;
		return n.radius = e, n.theta = t * Math.PI * 2 - Math.PI / 2, n.phi = a * Math.PI, i || (i = new THREE.Vector3), i.setFromSpherical(n), i
	}
};
Utils.arcLink = function (data) {

	// let mesh = new THREE.Mesh(
	// 	new THREE.SphereBufferGeometry(0.1, 20, 20),
	// 	new THREE.MeshBasicMaterial({ color: 0Xff0000 })
	// )

	// mesh.position.set(coordinate.x, coordinate.y, coordinate.z)
	// s.add(mesh)

	let v1 = new THREE.Vector3(data.cor1.x, data.cor1.y, data.cor1.z)
	let v2 = new THREE.Vector3(data.cor2.x, data.cor2.y, data.cor2.z)
	let point = []
	for (let index = 0; index < 30; index++) {
		let p = new THREE.Vector3()
			.lerpVectors(v1, v2, index / 30)
		p.normalize()
		p.multiplyScalar(data.radius)
		point.push(p)
	}

	var spline = new THREE.CatmullRomCurve3(point);

	const material = data.material;

	const geometry = new THREE.TubeGeometry(spline, 20, 0.02, 10, false);

	const mesh = new THREE.Mesh(geometry, material);
	data.fnc.add(mesh)


},
	Utils.getEventCursorPosition = function (e, t) {
		var a, i = e.originalEvent.touches;
		return a = i ? i.length ? i[0] : e.originalEvent.changedTouches[0] : e, t ? (t.x = a.clientX, void (t.y = a.clientY)) : {
			x: a.clientX,
			y: a.clientY
		}
	}, Utils.getEventCursorPositionOrientation = function (e, t) {
		Util.getEventCursorPosition(e, t), t.x = t.x / window.innerWidth * 2 - 1, t.y = -t.y / window.innerHeight * 2 + 1
	}, Utils.get2dPosition = function (e, t, a) {
		var i = e.clone()
			.project(t);
		return i.x = (i.x + 1) / 2 * a.innerWidth, i.y = -(i.y - 1) / 2 * a.innerHeight, i
	}, Utils.drawFunction = function (e, t, a, i, n) {
		console.log("===================================="), e = void 0 == e ? -Math.PI : e, t = void 0 == t ? Math.PI : t, i = void 0 == i ? .1 : i, n = void 0 == n ? 30 : n, a = void 0 == a ? function (e) {
			return Math.cos(e)
		} : a;
		for (var r = 0, o = e; o < t; o += i) {
			for (var s = "", l = 0; l < 2 * n; l++) s += l == n ? ":" : "-";
			var d = a(o),
				u = Math.round(d * n) + n;
			s = s.substr(0, u) + "*" + s.substr(u + 1), console.log(r + " |" + s, u), r++, r >= 10 && (r = 0)
		}
		console.log("====================================")
	};
