# Digits recognizer

A university task to recognize mnist handwritten digits.

![Digits recognizer](https://user-images.githubusercontent.com/11046028/27687985-3a612cb4-5cd9-11e7-8af0-1f74e7bed528.png)
Click [here] to see the demo.
Be careful, all the training and recognition happens in the browser, so it loads ~20Mb of mnist data.

## How to run locally

1. Clone this repository.
    ```sh
    git clone https://github.com/aaneitchik/digits-recognizer.git
    ```
2. Install the [mnist] library with [bower]:
    ```sh
    bower i
    ```
3. Install other dependencies with [yarn]:
    ```sh
    yarn install
    ```
4. Run the project in dev mode:
    ```sh
    yarn start
    ```
    and open it on `localhost:3000`,
    or build your own version:
    ```sh
    yarn build
    ```
[//]: #
[bower]: <https://bower.io/>
[yarn]: <https://yarnpkg.com>
[mnist]: <https://github.com/cazala/mnist>
[here]: <https://aaneitchik.github.io/digits-recognizer>
