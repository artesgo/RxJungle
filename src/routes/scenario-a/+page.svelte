<script lang='ts'>
	import Button from '$lib/components/cta/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import { last, first, debug } from '$lib/operators';
	import { filterArray } from '$lib/operators/array/filter';
	import type { Product } from '$lib/products/product';
  import { products } from '$lib/products/products-mock';
  import { BehaviorSubject, Observable } from 'rxjs';
  let products$ = new BehaviorSubject<Product[]>(products);
  let _products$ = products$ as Observable<Product[]>;

  function emit() {
    products$.next(products);
  }

  function reset() {
    _products$ = products$.asObservable();
  }

  function applyLast() {
    _products$ = _products$.pipe(
      last(),
    )
  }

  function applyFirst() {
    _products$ = _products$.pipe(
      first(),
    )
  }

  function applyFilter() {
    _products$ = _products$.pipe(
      filterArray((item) => {
        if (prop && value) {
          return (item as Product)[prop].toString() === value
        }
        return true;
      })
    )
  }

  function applyDebug() {
    _products$ = _products$.pipe(
      debug('Debug:'),
    )
  }

  let prop: keyof Product;
  let value: string;
</script>

<h1>First Task</h1>

<p>The first task is to get the observable and print it out</p>

<p>Open the developer console and view debug events</p>

{#await $_products$}
  Getting Products
{:then products}
  {#each products as product}
    <div>
      {product?.name}
    </div>
  {/each}
{:catch}
  Oopies
{/await}

<div class="mt-1">
  <h2>Array Operations</h2>
  <Button style="primary" width="inline" on:click={applyLast}>Apply Last Operator</Button>
  <Button style="primary" width="inline" on:click={applyFirst}>Apply First Operator</Button>
  <hr />
  <Input
    bind:value={prop}
    id={'filter'}
    name={'filter'}
    label={'Filter Prop'}
    placeholder={'Filter by...'}
    type={'text'}
  />
  <Input
    bind:value={value}
    id={'value'}
    name={'filter-value'}
    label={'Filter Value'}
    placeholder={'Filtered value...'}
    type={'text'}
  />
  <Button style="primary" width="inline" on:click={applyFilter}>Apply Filter Operator</Button>
  <hr />

</div>

<div class="mt-1">
  <h2>Transform Operations</h2>
</div>

<div class='mt-1'>
  <Button style="primary" width="inline" on:click={applyDebug}>Apply Debug Operator</Button>
</div>

<div class="mt-1">
  <h2>Stream Operations</h2>
  <Button style="primary" width="inline" on:click={reset}>Reset Streams</Button>
  <Button style="primary" width="inline" on:click={emit}>Re-emit Streams</Button>
</div>