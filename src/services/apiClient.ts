const TIMEOUT_MS = 30000;

function timeout(promise: Promise<Response>): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject('timeout');
    }, TIMEOUT_MS);
    promise.then(
      (res: Response) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err: Error) => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
}

export const apiClient = async (input: RequestInfo, init?: RequestInit) => {
  try {
    const response: Response = await timeout(fetch(input, init));
    // tslint:disable-next-line:no-magic-numbers
    if (response.status < 400) {
      return await response.json();
    } else {
      throw response.status;
    }
  } catch (err) {
    throw new Error(err);
  }
};
