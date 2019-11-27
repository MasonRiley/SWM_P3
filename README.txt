**Notes: 
--Dockerfile_order is actually just a Dockerfile in the order directory, and the same for Dockerfile_monitor

--I'm certain I messed up the MVC architecture, but I wanted to separate responsibilities
and attempted to do so following MVC, as you'll see in the file structure below.

--JS File Structure
Root:
	Monitor:
		index.js
		routes.js
		controllers:
			logController.js
	Order:
		index.js
		routes.js
		models:
			menuModel.js
		views:
			menuView.js
		controllers:
			logController.js
			menuController.js
		