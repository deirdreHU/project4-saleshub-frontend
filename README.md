# SalesHub

## Application Description
SalesHub, is contact management APP, is how you look after all of the contact data in your business, including contacts' details, communication preferences, sales history, and customer interactions with your company.
It enables every team in your organization to have the information they need to stay productive and have the context they need to deliver personalized interactions.

It's a business software, which aims to supercharge your sales process and eliminates friction by bringing all your tools and data together on one easy-to-use.
It allows businesses to manage, communicate and track leads. It helps a business Sales team to interact with clients without spending valuable time and resources inputting data or writing the same email every time.

## Links
- [Application link](https://xd.adobe.com/view/2b4de637-6ae1-4eb5-8c56-a4cba80d3082-7e1e/) <br>
- [Wireframe](https://saleshub-project4.netlify.app)
- [User Story](https://www.canva.com/design/DAFQ_bmFwUk/ClikrWo7Vv2-eqxIn6PW7Q/edit?utm_content=DAFQ_bmFwUk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [Routes](https://docs.google.com/presentation/d/1LKxnozLnVPQl8vAcNq8roWpRK6xN7jpIIAGCpo5uqUo/edit?usp=sharing)


## Database/Storage
* **ElephantSQL** is a PostgreSQL database hosting service.will manage administrative tasks of PostgreSQL, such as installation, upgrades to latest stable version and backup handling. It is also integrated to several cloud application platforms.


## Approaches Taken
* Set up database in elephantSql using the Sequelize in the backend
* Set up a basic MVC structure with basic CRUD routes, and implement it in Sequelize
* Built authentication page
* Lnked the app to heroku
* Follow the wireframe and user stories


## Difficulties faced
1. I don't know how to link data using sequalize and sql together and am completely lost on how to write MVC after linking the data
2. When working on front-end, how do I link the summary of the data. E.g. dropdown menu should display the specific category of data of this specific user - how do I retrieve and display these?
3. Display of data and how the filters should work
4. Try to understand and use the method of Redux

## Additional Features were under Considerations
1. Creation of pipeline to allow users to easily view and manage all deals
2. A system to manage staff and company, as there is currently an obvious loophole where all users have all rights and access where they can view each other's data freely which is wrong
3. Some communication functions that allows user to email or chat with customers where all records are saved for future references
