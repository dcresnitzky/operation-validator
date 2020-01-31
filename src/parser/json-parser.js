module.exports = class JsonParser {
    parse(stringData) {
        if (stringData) return JSON.parse(stringData);
    }
};
