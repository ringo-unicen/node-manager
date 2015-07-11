var dockerHost = process.env.DOCKER_HOST || 'localhost';
var dockerPort = process.env.DOCKER_PORT || 4243;
exports.dockerConfig = {
    host: dockerHost,
    port: dockerPort
};

if (process.env.LOCAL_DOCKER) {
    exports.dockerConfig.socketPath = '/var/run/docker.sock';
    delete exports.dockerConfig.host;
    delete exports.dockerConfig.port;
}


exports.apiConfig = {
    host: process.env.API_HOST || 'localhost',
    port: process.env.API_PORT || 3000
};

