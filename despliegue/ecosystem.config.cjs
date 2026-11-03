const path = require("path");

module.exports = {
    apps: [
        {
            name: "clinica-backend",
            script: "dist/main.js",
            cwd: path.join(__dirname, "..", "backend"),
            env: {
                NODE_ENV: "production",
                PORT: 3100
            }
        }
    ]
};
