var faker = require('faker')

function generateEmployee () {
    const database = {
        employees: []
    };

    for (let i = 1; i <= 13; i++) {
        database.employees.push({
            id: i,
            name: faker.name.findName(),
            // jobtype: faker.name.jobTitle(),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            // imageUrl: faker.image.avatar()
        });
    }

    return database;
}

// If you want to use json-server, you need export, the function that generates fake data.
module.exports = generateEmployee
