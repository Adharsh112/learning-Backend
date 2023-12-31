import mongoose , {Schema} from 'mongoose'

import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema({
    videoFile : {
        type : String ,// cloudinary rule
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    Title : {
        type : String ,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    view : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : true,
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

},{timestamps : true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)