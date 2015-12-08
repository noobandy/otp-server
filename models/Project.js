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
	}
});

ProjectSchema.statics.findAllProjectsOfUser = function(user, cb) {
	Project.find({user : user._id}, function(err, projects) {
		if(err) return cb(err);

		return cb(null, projects);
	});
};

ProjectSchema.statics.findByApiKey = function(apiKey, cb) {
	Project.findOne({apiKey : apiKey}, function(err, project) {
		if(err) return cb(err);

		return cb(null, project);
	});
};




Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;