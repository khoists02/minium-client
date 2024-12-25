import axios from "axios";

class GroupPromise {
  private executing = false;

  private promise: Promise<unknown> | undefined;

  execute(url: string): Promise<unknown> | undefined {
    if (this.executing) {
      return this.promise;
    }
    this.executing = true;
    this.promise = new Promise((resolve, reject) => {
      axios
        .post(url)
        .then((result) => {
          this.executing = false;
          resolve(result);
        })
        .catch((error) => {
          this.executing = false;
          reject(error);
        });
    });

    return this.promise;
  }
}

export default new GroupPromise();