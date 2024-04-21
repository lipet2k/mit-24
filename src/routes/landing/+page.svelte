<!-- <script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let container;

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			60,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setClearColor(0x000000, 0);
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		// Cube geometry
		const geometry = new THREE.BoxGeometry(2, 2, 2); // Creates a cube
		const material = new THREE.MeshPhongMaterial({ color: 0x33ff66 }); // Using MeshPhongMaterial
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		// Lighting
		const pointLight = new THREE.PointLight(0xffffff, 100, 100); // High intensity, wide decay
		pointLight.position.set(5, 5, 5);
		scene.add(pointLight);

		const ambientLight = new THREE.AmbientLight(0xff3399, 5); // Moderate intensity
		scene.add(ambientLight);

		// Camera position
		camera.position.z = 4;

		// Animation function
		const animate = function () {
			requestAnimationFrame(animate);

			// Rotation
			cube.rotation.x += 0.001;
			cube.rotation.y += 0.001;

			renderer.render(scene, camera);
		};

		// Start animation
		animate();

		// Handle resizing
		const onResize = () => {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		};
		window.addEventListener('resize', onResize);

		return () => {
			container.removeChild(renderer.domElement);
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<div bind:this={container} />

<style>
	/* Container for the 3D canvas */
	div {
		width: 20%;
		height: 50vh;
		margin: auto;
		position: relative;
		top: 50%;
		display: block;
	}

	body {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50vh;
		margin: 0;
	}
</style> -->

<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let container;

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setClearColor(0x000000, 0);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		const outlineGeometry = new THREE.BoxGeometry(1.1, 1.1, 1.1);
		const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
		const outlineCube = new THREE.Mesh(outlineGeometry, outlineMaterial);
		outlineCube.position.z = -0.1;
		scene.add(outlineCube);

		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x33ff66 });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		camera.position.z = 1.5;

		const animate = function () {
			requestAnimationFrame(animate);
			cube.rotation.x += 0.001;
			cube.rotation.y += 0.002;
			outlineCube.rotation.x += 0.001;
			outlineCube.rotation.y += 0.002;
			renderer.render(scene, camera);
		};

		animate();

		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});
	});
</script>

<div bind:this={container} />

<style>
	div {
		width: 100%;
		height: 100vh;
		display: block;
		overflow: hidden;
	}
</style>
