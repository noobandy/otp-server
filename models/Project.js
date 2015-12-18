var mongoose = require("mongoose"),
	ProjectSchema,
	Project;

ProjectSchema = mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	apiKey : {
		//secret slug(_id)
		type : String,
		required : true
	},
	config : {
		type : Object
	},
	user : {
		type : mongoose.Schema.ObjectId,
		required : true,
		ref : "User"
	},
	deletedAt : {
		type : Date
	}
});

ProjectSchema.statics.findAllProjectsOfUser = function(user, cb) {
	Project.find({user : user._id, deletedAt : null}, function(err, projects) {
		if(err) return cb(err);

		return cb(null, projects);
	});
};

ProjectSchema.statics.findByApiKey = function(apiKey, cb) {
	Project.findOne({apiKey : apiKey, deletedAt : null}, function(err, project) {
		if(err) return cb(err);

		return cb(null, project);
	});
};

ProjectSchema.methods.delete = function(cb) {
	this.deletedAt = new Date();
	this.save(function(err,doc) {
		if(err) return cb(err);
		return cb(null, doc);
	});
}




Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;