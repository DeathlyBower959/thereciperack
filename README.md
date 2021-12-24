# The Recipe Rack
[![GitHub Stars](https://img.shields.io/github/stars/DeathlyBower959/thereciperack.svg)](https://github.com/DeathlyBower959/thereciperack/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/DeathlyBower959/thereciperack.svg)](https://github.com/DeathlyBower959/thereciperack/issues) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://thereciperack.ml)

This website is used to manage your own cookbooks, and organize the, instead of having tons of papers and cookbooks lying around!


## Inspiration
I began learning react because it seemed popular, and I wanted to get into functional web design. I began following tutorials on how to make projects, and other small things. They all worked out, but I realized that I was stuck in tutorial hell, and that I needed to find a project to work on, by myself. 

I didn't want to make a pointless project, I wanted to make one that would be useful, and wouldn't just sit on my computer. It took me a bit, but I came up with this idea when I was helping her cook, and she was fluttering between multiple cookbooks to find what she needed. So I asked, "Hey, should I try and make a website, that manages all these recipes for you? Because you keep struggling to find what you want." She said it would be a great idea, so i got to work. 

Since this was my first real React project, Stack Overflow, YouTube, and Google were really my best friends. I figured out how to use React to make the client side, and then learned the basics of `axios`, `express`, and `mongooose`. This was nice to work on as I really got to *think* about the code, instead of just writing down code from videos. 

## Installation

- Clone this repository somewhere on your computer
- Edit the `template.env` and change `MONGO_URI` to your MongoDB URI (PORT is optional, default is `5000`)
- Rename the `template.env` to `.env`
- All done!

## Usage

Run `npm installAll` in the root directory to initialize all required dependencies.

#### Development
If you are developing the website, then use these to start the development server.
```
Terminal 1:
  $ cd client
  $ npm start
```

```
Terminal 2:
  $ cd server
  $ npm run dev
```

#### Publishing
If you want to publish the client to the web, then follow the steps below.
1. Create a new GitHub repository, and mark it as public
2. Open a new terminal located in the client folder
3. Run these commands 
	1. `git init`
	2. `git add .`
	3. `git commit -m "First Commit"`
	4. `git branch -M main`
	5. `git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git` (Or copy from repo landing page)
	6. `git push -u origin main`
4. Open the `package.json` in the client folder
5. At the top of the `package.json`, change `homepage` to the websites link. (Make sure it has `http://` and the extension after)
6. 
  - Custom Domain: Change `thereciperack.ml` on line 30 to your own custom domain and do `npm run deploy`.
  - Normal Domain: `npm run regDeploy`
8. Give it a few minutes, and check your website to see if it has deployed.

## Technologies
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Boostrap](https://react-bootstrap.github.io/)

## Contributing
Pull requests are welcome, and greatly appreciated. If you want to make a major change, please open an issue first to discuss what you would like to change.

## License
> You can check out the full license [here]((https://choosealicense.com/licenses/mit/))

This project is licensed under the terms of the MIT license.
