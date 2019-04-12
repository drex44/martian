# Contributing

## Ways to contribute

- Solve issues
- Suggest a feature
- Submit new issues
- Have fun!

## Tools & Technology used

- ElectronJS
- React
- Bulma
- ws

## Steps to run the application!

1. Fork the repo
2. Clone the repo locally

   ```bash
   git clone https://github.com/drex44/martian.git
   ```

3. Go to the directory and install dependencies

   ```bash
   cd martian
   yarn
   # or
   npm install
   ```

4. Run the application locally

   ```bash
   yarn dev
   # or
   npm run dev
   ```

## DevTools

Toggle DevTools:

- OSX: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

## Packaging

Modify [electron-builder.yml](./electron-builder.yml) to edit package info.

For a full list of options see: https://github.com/electron-userland/electron-builder/wiki/Options.

Create a package for OSX, Windows and Linux

```bash
npm run pack
```

Or target a specific platform

```bash
npm run pack:mac
npm run pack:win
npm run pack:linux
```

## Tests

```bash
npm run test
```

## App created using below boilerplate

- [electron-react-redux-boilerplate](https://github.com/jschr/electron-react-redux-boilerplate)

## How the PR process works :building_construction:

:white_check_mark:
Check for open issues

:white_check_mark:
Fork the repo

:white_check_mark:
Make some edits on your own copy that fixes the issues.

:white_check_mark:
Create a **new branch and then commit**.

:white_check_mark:
Create a pull request that will be merged to the main repo.
(**Remember to mention what you're fixing**)

:white_check_mark:Your code will be reviewed and approved.

:white_check_mark:If you have questions on any issue, kindly use the comment.

:white_check_mark: **Don't forget to comment on the issue, you're working on. otherwise there will be two PRs for the same issue!**
