<script>
	import Navbar from '$components/Navbar/Navbar.svelte';
	import '../app.css';
	import { ToastContainer, FlatToast } from 'svelte-toasts';
</script>


<Navbar/>
<ToastContainer placement="top-right" let:data>
	<FlatToast {data}/>
</ToastContainer>
<slot/>

