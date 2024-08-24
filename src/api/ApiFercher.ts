// Example from the book, looks useful!
export interface SeedAPI {
  '/seeds': string[];
  '/seed/apple': string;
  '/seed/strawberry': string;
}

// this is only to make sure the path exists
declare class ApiFetcher<API> {
  fetch<Path extends keyof API>(path: Path): Promise<API[Path]>;
}

const getBerry = async () => {
  const fetcher = new ApiFetcher<SeedAPI>();
  const berry = await fetcher.fetch('/seed/strawberry');

  return berry;
};
