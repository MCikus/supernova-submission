# UFO App on IC

## 1 Runtime environment

runtime dependencies:

- Ubuntu 20\*/MacOS
- [Internet Computer SDK](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove)
- [nvm](https://github.com/nvm-sh/nvm)
- node v18.3.0
- yarn (package manager)
- [direnv](https://direnv.net/)

## 2 Usage

### 2.1 Running project in local environment

For local development the (1) internet computer backend and the (1) vite.js dev server has to be running

#### 2.1.1 Starting & Stopping local dev environment

**start**

```shell
yarn backend:up
yarn dev
```

**stop**

- kill vite.js dev server `[ctrl] + [c]`
- stop internet computer backend & cleanup

  ```shell
  yarn backend:up
  yarn dev
  ```

<!-- ## 3 Code Quality tools @todo -->
