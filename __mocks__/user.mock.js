"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserMock = /** @class */ (function () {
    function UserMock(data) {
        this._id = data
            ? data._id
            : Math.random()
                .toString(36)
                .substring(7);
        this.firstName = data
            ? data.firstName
            : Math.random()
                .toString(36)
                .substring(7);
        this.lastName = data
            ? data.lastName
            : Math.random()
                .toString(36)
                .substring(7);
        this.email = data
            ? data.email
            : Math.random()
                .toString(36)
                .substring(7) + "@" + Math.random()
                .toString(36)
                .substring(7) + ".com";
        this.password = data ? data.password : Math.random().toString(8);
        this.points = data ? data.points : 0;
        this.avatar = data ? data.avatar : 'https://loremflickr.com/40/40/person';
        this.date = data ? data.date : new Date();
    }
    return UserMock;
}());
exports.default = UserMock;
