var mongoose = require("mongoose"),
	ProjectSchema,
	Project,
	slug = require("slug");

slug.defaults.mode ='rfc3986';

slug.defaults.modes['rfc3986'] = {
    replacement: '-',      // replace spaces with replacement
    symbols: true,         // replace unicode symbols or not
    remove: null,          // (optional) regex to remove characters
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multi-characters
};

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
	user : {
		type : mongoose.Schema.ObjectId,
		required : true,
		ref : "User"
	}
});


ProjectSchema.pre("save", function(next){
	this._id = mongoose.Schema.ObjectId();

	this.apiKey = slug(generatedId);

	next();

});


ProjectSchema.statics.findAllProjectsOfUser = function(user, cb) {
	Project.find({user : user._id}, function(err, projects) {
		if(err) return cb(err);

		return cb(projects);
	});
};

ProjectSchema.statics.findByApiKey = function(apiKey, cb) {
	Project.findOne({apiKey : apiKey}, function(err, project) {
		if(err) return cb(err);

		return cb(project);
	});
};




Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;