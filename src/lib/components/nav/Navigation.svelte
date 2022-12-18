<script>
	import Link from "./Link.svelte";
	// import Button from "../cta/Button.svelte";
	// import { theme } from "$lib/store/theme";
</script>

<header>
  <nav>
    <Link href="/">Home</Link>
    <Link prefetch={true} href="/scenario-a">Scenario A</Link>
    <Link prefetch={true} href="/scenario-b">Scenario B</Link>
  </nav>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    height: 40px;
  }

  nav {
    margin: 10px;
    display: flex;
    height: 30px;
    align-items: center;
  }
</style>