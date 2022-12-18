<script lang="ts">
	export let style: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let type: 'submit' | 'button' = 'button';
	export let width: 'inline' | 'block' = 'block';
	export let formaction = '';
	export let borderless = false;
	$: classes = `${style} ${width} ${borderless ? 'borderless' : ''}`;
</script>

<button
  on:click
  on:focus
  on:blur
  on:mouseover
  on:mouseout
  {type}
	{formaction}
  class={classes}>
  <slot />
</button>

<style lang="scss">
	button {
		background: none;
		padding: 0 10px;
		cursor: pointer;
		white-space: nowrap;

		color: var(--fg);
		background-color: var(--light-bg);
		transition: var(--animLength);
		height: var(--controlHeight);
		margin-bottom: var(--unit);

		&.primary {
			border: 1px solid var(--bg);
		}
		&.secondary {
			background-color: var(--bg);
			border: 1px solid var(--light-fg);
		}
		&.block {
			display: block;
			width: 100%;
		}
		&.borderless {
			border: none;
		}
	}
</style>
