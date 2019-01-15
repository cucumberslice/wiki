const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
})

db.authenticate().then(() => {
  console.log("connected to the database");
});


// function generateSlug(title) {
//     // Removes all non-alphanumeric characters from title
//     // And make whitespace underscore
//     return title.replace(/\s+/g, '_').replace(/\W/g, '');
// }


const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
});

Page.beforeValidate(page => {
//   console.log("what is", page);
    if (!page.slug) {
        page.slug = page.title.replace(/\s/g, "_").replace(/\W/g, "").toLowerCase();
    }
});



const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
       
            isEmail: true
    
    }
})

//This adds methods to 'Page', such as '.setAuthor'. It also creates a foreign key attribute on the Page table pointing ot the User table
Page.belongsTo(User, { as: 'author' });



module.exports = {
    db,
    User,
    Page
}