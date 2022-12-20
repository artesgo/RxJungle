<script lang='ts'>
	import Button from '$lib/components/cta/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import { arrayLast, arrayFirst, debug } from '$lib/operators';
	import { arrayFilter } from '$lib/operators/array/filter';
	import { arrayMap } from '$lib/operators/array/map';
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
      arrayLast(),
    )
  }

  function applyFirst() {
    _products$ = _products$.pipe(
      arrayFirst(),
    )
  }

  function applyFilter() {
    _products$ = _products$.pipe(
      arrayFilter((item) => {
        if (prop && value) {
          return item[prop].toString() === value
        }
        return true;
      })
    )
  }

  function applyMap() {
    _products$ = _products$.pipe(
      arrayMap((item) => {
        return {
          ...item,
          name: item[transform].replace(term, '')
        };
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
  let transform: keyof Omit<Product, 'price' | 'rating'>;
  let term: string;
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
  <Input
    bind:value={transform}
    id={'transform'}
    name={'transform'}
    label={'String.replace(term, "")'}
    placeholder={'Property to replace...'}
    type={'text'}
  />
  <Input
    bind:value={term}
    id={'term'}
    name={'term-value'}
    label={'Replace Term'}
    placeholder={'Replace value...'}
    type={'text'}
  />
  <Button style="primary" width="inline" on:click={applyMap}>Apply Map Operator</Button>
  <hr />
</div>

<div class='mt-1'>
  <Button style="primary" width="inline" on:click={applyDebug}>Apply Debug Operator</Button>
</div>

<div class="mt-1">
  <h2>Stream Operations</h2>
  <Button style="primary" width="inline" on:click={reset}>Reset Streams</Button>
  <Button style="primary" width="inline" on:click={emit}>Re-emit Streams</Button>
</div>