function Post () {
    this.id = '';
    this.title = '';
    this.desc = '';
    this.body = '';
    this.user = '';
    this.date = '';
    this.publish = '';
}

Post.prototype.getId = function() {
    return this.id;
};

Post.prototype.getTitle = function() {
    return this.title;
};

Post.prototype.getDescription = function() {
    return this.desc;
};

Post.prototype.getText = function() {
    return this.body;
};

Post.prototype.getUserName = function() {
    return this.user;
};

Post.prototype.getDate = function() {
    return this.date;
};

Post.prototype.isPublish = function() {
    return this.publish;
};