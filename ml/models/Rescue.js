import mongoose from 'mongoose';
const { Schema } = mongoose;

const rescueSchema = new Schema({
    type: {
        type: String,
        required: [true, 'Rescue type is required'],
        trim: true
    },
    speed: {
        type: Number,
        required: [true, 'Speed is required'],
        min: [0, 'Speed cannot be negative'],
        // in km/hr
    },
    fieldofview: {
        type: Number,
        required: [true, 'Field of view is required'],
        min: [0, 'Field of view cannot be negative'],
        // in km
    },
    vertheight: {
        type: Number,
        required: [true, 'Vertical height is required'],
        min: [0, 'Vertical height cannot be negative'],
        // in km
    },
    flighttime: {
        type: Number,
        required: [true, 'Flight time is required'],
        min: [0, 'Flight time cannot be negative'],
        // in hr
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add any virtual properties or methods here if needed
rescueSchema.virtual('maxDistance').get(function() {
    return this.speed * this.flighttime;
});

const Rescue = mongoose.model('Rescue', rescueSchema);

export default Rescue;