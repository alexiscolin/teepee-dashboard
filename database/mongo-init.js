
db.createUser(
    {
        user: "user",
        pwd: "pswd",
        roles: [
            {
                role: "readWrite",
                db: "teepee"
            }
        ]
    }
);